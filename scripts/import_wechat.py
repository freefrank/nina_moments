#!/usr/bin/env python3
"""从微信朋友圈导出包（HTML 版）导入新内容。

导出包结构:
    <export>/Information_file/Assets/moments.js   # JSONP: callback({"moments":[...]})
    <export>/Information_file/Moments/photos/...  # 照片
    <export>/Information_file/Moments/others/...  # 其他媒体（音乐/视频等）

注意: 大导出会分卷（.part0/.part1/...），每卷的 moments.js 可能在卷边界处被截断。
本脚本可接收多个导出目录，会合并全部分卷后统一解析。

用法:
    python3 scripts/import_wechat.py --media-dir ../nina_moments_media \
        import/WeChat-xxx.part0 [import/WeChat-xxx.part1 ...] [--dry-run]

行为:
  - 按 create_time 生成 content/posts/<年>/<月>/<日期>-post[-N].md（与现有命名一致）
  - 已存在同一时间戳的帖子则跳过（增量导入）
  - 照片复制到媒体仓库的 Moments/ 下（已存在则跳过）
"""
import argparse
import json
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
POSTS_DIR = REPO / "content" / "posts"

RE_TS = re.compile(r"^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$")


def yaml_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def load_moments(export_dirs):
    """读取并合并各分卷的 moments.js，容忍卷间截断。"""
    blobs = []
    for d in export_dirs:
        f = Path(d) / "Information_file" / "Assets" / "moments.js"
        if not f.exists():
            sys.exit(f"找不到 {f}")
        raw = f.read_text(encoding="utf-8")
        raw = raw[raw.index("(") + 1:]
        if raw.rstrip().endswith(")"):
            raw = raw.rstrip()[:-1]
        blobs.append(raw)

    merged = "".join(blobs)
    try:
        data = json.loads(merged)
    except json.JSONDecodeError as e:
        # 分卷不全时，尽力解析到最后一个完整的 moment
        salvaged, pos = salvage_moments(merged)
        print(f"警告: 数据在偏移 {e.pos} 处不完整（分卷缺失？），"
              f"已抢救出 {len(salvaged)} 条完整记录", file=sys.stderr)
        return salvaged
    return data["moments"]


def salvage_moments(raw):
    """从 '{"moments":[' 开始逐条解码，直到遇到不完整的记录。"""
    start = raw.index('"moments":')
    start = raw.index("[", start) + 1
    dec = json.JSONDecoder()
    moments, pos = [], start
    while True:
        while pos < len(raw) and raw[pos] in ", \n\t":
            pos += 1
        if pos >= len(raw) or raw[pos] != "{":
            break
        try:
            obj, end = dec.raw_decode(raw, pos)
        except json.JSONDecodeError:
            break
        moments.append(obj)
        pos = end
    return moments, pos


def existing_timestamps():
    """扫描现有帖子的 title（即时间戳），用于增量去重。"""
    seen = set()
    for f in POSTS_DIR.rglob("*.md"):
        head = f.read_text(encoding="utf-8")[:200]
        m = re.search(r'title:\s*"([^"]+)"', head)
        if m:
            seen.add(m.group(1))
    return seen


def next_filename(day_dir: Path, date_str: str):
    base = day_dir / f"{date_str}-post.md"
    if not base.exists():
        return base
    n = 1
    while (day_dir / f"{date_str}-post-{n}.md").exists():
        n += 1
    return day_dir / f"{date_str}-post-{n}.md"


def build_post(m):
    ts = m["create_time"]
    mt = RE_TS.match(ts)
    if not mt:
        return None, f"无法解析时间: {ts}"
    year, month, day = mt.group(1), mt.group(2), mt.group(3)
    date_str = f"{year}-{month}-{day}"
    date_iso = f"{date_str}T{mt.group(4)}:{mt.group(5)}:{mt.group(6)}+08:00"

    content = (m.get("content") or "").strip()
    images, link = [], {}
    for md in m.get("medias") or []:
        mtype = md.get("type")
        path = (md.get("content") or "").strip()
        if mtype == "2" and path:  # 照片
            images.append("/" + path)
        elif mtype in ("3", "4") and path:  # 链接/音乐等附带缩略图
            images.append("/" + path)
            if md.get("title") and not link.get("title"):
                link["title"] = md["title"]
            if md.get("description") and not link.get("source"):
                link["source"] = md["description"]
    if m.get("contenturl"):
        link["url"] = m["contenturl"]
    if m.get("appname") and not link.get("source"):
        link["source"] = m["appname"]

    plain = re.sub(r"\s+", " ", content).strip()
    summary = plain[:150] if plain else (link.get("title") or ts)

    out = ["---"]
    out.append(f"title: {yaml_str(ts)}")
    out.append(f"date: {date_iso}")
    out.append("draft: false")
    out.append(f'categories: ["moments", {yaml_str(year)}, {yaml_str(f"{year}-{month}")}]')
    out.append('tags: ["朋友圈", "生活记录"]')
    out.append(f"summary: {yaml_str(summary)}")
    if images:
        out.append("images:")
        for img in images:
            out.append(f"  - {yaml_str(img)}")
    if link:
        out.append("link:")
        for k in ("url", "title", "source"):
            if k in link:
                out.append(f"  {k}: {yaml_str(link[k])}")
    out.append("---")
    body = "\n".join(out)
    if content:
        body += "\n\n" + content + "\n"
    else:
        body += "\n"
    return (year, month, date_str, date_iso, body, images), None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("exports", nargs="+", help="导出目录（可多个分卷）")
    ap.add_argument("--media-dir", required=True, help="媒体仓库路径")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    media_root = Path(args.media_dir)
    moments = load_moments(args.exports)
    print(f"导出数据共 {len(moments)} 条")

    seen = existing_timestamps()
    print(f"站点现有帖子 {len(seen)} 篇")

    stats = defaultdict(int)
    # 导出按新→旧排列；按旧→新写入使同日多帖的 -N 后缀与时间顺序一致
    for m in reversed(moments):
        built, err = build_post(m)
        if err:
            print("跳过:", err, file=sys.stderr)
            stats["errors"] += 1
            continue
        year, month, date_str, date_iso, body, images = built
        if m["create_time"] in seen:
            stats["skipped"] += 1
            continue

        # 复制媒体
        for img in images:
            rel = img.lstrip("/")
            for src_dir in args.exports:
                src = Path(src_dir) / "Information_file" / rel
                if src.exists():
                    dst = media_root / rel
                    if not dst.exists() and not args.dry_run:
                        dst.parent.mkdir(parents=True, exist_ok=True)
                        shutil.copy2(src, dst)
                    stats["media"] += 1
                    break
            else:
                print(f"警告: 找不到媒体 {rel}", file=sys.stderr)
                stats["media_missing"] += 1

        day_dir = POSTS_DIR / year / month
        path = next_filename(day_dir, date_str)
        if not args.dry_run:
            day_dir.mkdir(parents=True, exist_ok=True)
            path.write_text(body, encoding="utf-8")
        seen.add(m["create_time"])
        stats["imported"] += 1

    print(f"导入 {stats['imported']} 篇，跳过已存在 {stats['skipped']} 篇，"
          f"复制媒体 {stats['media']} 个，缺失媒体 {stats['media_missing']}，"
          f"错误 {stats['errors']}")


if __name__ == "__main__":
    main()
