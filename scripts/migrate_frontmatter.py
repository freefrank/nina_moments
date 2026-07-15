#!/usr/bin/env python3
"""把 content/posts 下旧格式 Markdown 的图片和链接信息迁移到 front matter。

旧格式：正文中混有 ![Media N](...) 图片行和 "## 相关链接" 小节。
新格式：front matter 含 images / link 结构化字段，正文只保留文字。

用法:
    python3 scripts/migrate_frontmatter.py --dry-run   # 只统计和报告异常
    python3 scripts/migrate_frontmatter.py             # 实际改写
"""
import argparse
import json
import re
import sys
from pathlib import Path

POSTS_DIR = Path(__file__).resolve().parent.parent / "content" / "posts"

RE_FRONT = re.compile(r"\A---\n(.*?)\n---\n?", re.DOTALL)
RE_IMAGE_LINE = re.compile(r"^!\[([^\]]*)\]\(([^)]+)\)\s*$")
RE_TITLE_TS = re.compile(r"^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$")
# 链接小节字段: **字段名:** 值
RE_LINK_FIELD = re.compile(r"^\*\*(.+?):\*\*\s*(.*)$")
RE_MD_LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")

LINK_FIELD_MAP = {
    "原始链接": "url",
    "链接标题": "title",
    "来源": "source",
    "本地链接": "local",
    "链接摘要": "summary",
    "包含图片": "image_count",
}


def yaml_str(s: str) -> str:
    """用 JSON 编码字符串——JSON 字符串是合法的 YAML 标量。"""
    return json.dumps(s, ensure_ascii=False)


def parse_front(text: str):
    m = RE_FRONT.match(text)
    if not m:
        return None, text
    fields = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, _, v = line.partition(":")
            fields[k.strip()] = v.strip()
    return fields, text[m.end():]


RE_JUNK = re.compile(r"var PAGE_MID|\{--weui|font-family:|@media\b")


def clean_summary(value: str) -> str:
    """剔除旧抓取工具混入的 CSS/脚本垃圾，压缩空白并截断。"""
    m = RE_JUNK.search(value)
    if m:
        value = value[: m.start()]
    value = re.sub(r"\s+", " ", value).strip()
    return value[:500]


def parse_body(body: str, warn):
    """返回 (纯文字正文, images 列表, link 字典)。"""
    images = []
    link = {}
    text_lines = []
    in_link_section = False
    last_key = None

    for line in body.splitlines():
        stripped = line.strip()
        if stripped == "## 相关链接":
            in_link_section = True
            continue
        m = RE_IMAGE_LINE.match(stripped)
        if m:
            images.append(m.group(2))
            continue
        if in_link_section:
            if not stripped:
                continue
            fm = RE_LINK_FIELD.match(stripped)
            if fm:
                name, value = fm.group(1), fm.group(2)
                key = LINK_FIELD_MAP.get(name)
                if key is None:
                    warn(f"未知链接字段: {name}")
                    last_key = None
                    continue
                if key == "local":
                    ml = RE_MD_LINK.search(value)
                    value = ml.group(1) if ml else value
                elif key == "image_count":
                    mn = re.search(r"\d+", value)
                    value = int(mn.group()) if mn else value
                link[key] = value
                last_key = key
            elif last_key in ("summary", "title"):
                # 多行字段值的续行（旧抓取数据），并入上一字段
                link[last_key] = f"{link[last_key]} {stripped}"
            else:
                warn(f"链接小节中无法识别的行: {stripped[:60]}")
            continue
        text_lines.append(line)

    if "summary" in link:
        link["summary"] = clean_summary(str(link["summary"]))
        if not link["summary"]:
            del link["summary"]

    text = "\n".join(text_lines).strip("\n")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text, images, link


def build_front(title, date, categories, tags, summary, images, link):
    out = ["---"]
    out.append(f"title: {yaml_str(title)}")
    out.append(f"date: {date}")
    out.append("draft: false")
    out.append(f"categories: [{', '.join(yaml_str(c) for c in categories)}]")
    out.append(f"tags: [{', '.join(yaml_str(t) for t in tags)}]")
    out.append(f"summary: {yaml_str(summary)}")
    if images:
        out.append("images:")
        for img in images:
            out.append(f"  - {yaml_str(img)}")
    if link:
        out.append("link:")
        for k in ("url", "title", "source", "local", "summary", "image_count"):
            if k in link:
                v = link[k]
                out.append(f"  {k}: {v if isinstance(v, int) else yaml_str(v)}")
    out.append("---")
    return "\n".join(out)


def parse_list_field(raw: str):
    """解析旧 front matter 中的 ["a","b"] 形式列表。"""
    try:
        return json.loads(raw)
    except Exception:
        return [x.strip().strip('"') for x in raw.strip("[]").split(",") if x.strip()]


def migrate_file(path: Path, dry: bool, report):
    text = path.read_text(encoding="utf-8")
    fields, body = parse_front(text)
    if fields is None:
        report["errors"].append(f"{path}: 没有 front matter")
        return

    warns = []
    warn = lambda msg: warns.append(f"{path}: {msg}")
    body_text, images, link = parse_body(body, warn)
    report["warnings"].extend(warns)

    title = fields.get("title", "").strip('"')
    # 用标题里的真实时间戳修正 date（旧转换器把时间统一写成了 10:00:00）
    mt = RE_TITLE_TS.match(title)
    if mt:
        date = f"{mt.group(1)}T{mt.group(2)}+08:00"
    else:
        date = fields.get("date", "")
        report["odd_titles"].append(str(path))

    categories = parse_list_field(fields.get("categories", "[]"))
    tags = parse_list_field(fields.get("tags", "[]"))

    plain = re.sub(r"\s+", " ", body_text).strip()
    summary = plain[:150] if plain else (link.get("title") or title)

    new_text = build_front(title, date, categories, tags, summary, images, link)
    new_text += "\n\n" + body_text + "\n" if body_text else "\n"

    report["images"] += len(images)
    if link:
        report["links"] += 1
    if not images and not link and not body_text:
        report["empty"].append(str(path))

    if not dry:
        path.write_text(new_text, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="只处理前 N 个文件（调试用）")
    args = ap.parse_args()

    files = sorted(POSTS_DIR.rglob("*.md"))
    if args.limit:
        files = files[: args.limit]

    report = {"errors": [], "warnings": [], "odd_titles": [], "empty": [],
              "images": 0, "links": 0}
    for f in files:
        migrate_file(f, args.dry_run, report)

    print(f"处理文件: {len(files)}")
    print(f"图片总数: {report['images']}  含链接帖: {report['links']}")
    print(f"空内容帖: {len(report['empty'])}  标题非时间戳: {len(report['odd_titles'])}")
    for key in ("errors", "warnings"):
        items = report[key]
        print(f"{key}: {len(items)}")
        for it in items[:20]:
            print("  ", it)
        if len(items) > 20:
            print(f"   ... 共 {len(items)} 条")
    if report["odd_titles"][:5]:
        print("标题异常示例:", report["odd_titles"][:5])
    return 1 if report["errors"] else 0


if __name__ == "__main__":
    sys.exit(main())
