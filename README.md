# 我的朋友圈时光机

使用 Hugo 构建的静态网站，用于展示整理后的朋友圈内容归档。个人项目，仅用于内容归档展示。

线上地址: https://nina.zkx.ca （GitHub Pages，push 到 master 自动部署）

## 仓库结构

- 本仓库：内容（`content/posts/`）、模板（`layouts/`）、样式脚本（`static/`）、工具（`scripts/`）
- [nina_moments_media](https://github.com/freefrank/nina_moments_media)：照片和链接存档（约 4.5GB），
  以 submodule 挂载于 `media/`，经 hugo.yaml 的 module mounts 合并进 `static/`

## 内容格式

每条朋友圈一个 Markdown 文件（`content/posts/<年>/<月>/<日期>-post[-N].md`），
图片列表和分享链接信息存放在 front matter 的 `images` / `link` 字段中，正文只有文字。
模板直接读取这些字段渲染缩略图、九宫格和链接卡片。

## 本地开发

```bash
git clone --recurse-submodules https://github.com/freefrank/nina_moments.git
cd nina_moments
hugo server
```

只改内容/模板可以不拉媒体 submodule（clone 时省略 `--recurse-submodules`），
但执行 `hugo` 构建需要 `media/` 已初始化：`git submodule update --init media`。

## 导入新的微信导出

微信朋友圈导出包（HTML 版，可能分卷 .part0/.part1/...）放入任意目录后：

```bash
python3 scripts/import_wechat.py --media-dir <媒体仓库路径> <导出目录1> [导出目录2 ...]
```

按时间戳增量导入（已存在的帖子自动跳过），照片会复制进媒体仓库，
之后分别提交两个仓库并推送（媒体仓库单次 push 不要超过 2GB）。

## scripts/

- `import_wechat.py` — 从微信导出包导入新帖子（见上）
- `migrate_frontmatter.py` — 一次性迁移脚本：把旧格式（图片/链接混在正文中）
  转换为 front matter 结构化格式，已于 2026-07 执行完毕，留作参考
