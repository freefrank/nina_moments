# 我的朋友圈时光机

这是一个使用Hugo构建的静态网站，用于展示整理后的社交媒体内容。

## 🚀 部署说明

### 自动部署
推送到main分支将自动触发GitHub Actions部署到GitHub Pages。

### 本地开发
```bash
# 克隆仓库
git clone <your-repo-url>
cd <repo-name>

# 初始化子模块
git submodule update --init --recursive

# 启动开发服务器
hugo server -D
```

## 📁 目录结构

```
hugo-site/
├── content/
│   ├── posts/           # 文章内容
│   │   ├── 2024/
│   │   │   ├── 01/
│   │   │   └── 02/
│   │   └── ...
│   ├── _index.md        # 首页
│   ├── search.md        # 搜索页面
│   └── archives.md      # 归档页面
├── static/              # 静态资源
│   ├── link_content/    # 链接内容
│   └── Moments/         # 图片等媒体文件
├── themes/PaperMod/     # 主题
└── hugo.yaml           # Hugo配置
```

## 🎨 主题

使用 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主题，特点：
- 响应式设计
- 暗色/亮色主题切换
- 搜索功能
- 归档页面
- SEO优化

## 📊 内容统计

- **总文章数**: 5000+
- **时间跨度**: 2012-2024+
- **包含**: 文字、图片、链接内容
- **分类**: 按年月自动分类

## 🔧 更新内容

要添加新内容：
1. 运行转换脚本: `node convert-to-hugo.js`
2. 提交并推送到main分支
3. GitHub Actions将自动部署

## 📝 许可

个人项目，仅用于内容归档展示。