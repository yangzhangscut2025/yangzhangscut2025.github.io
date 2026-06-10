# Kyra · 个人网站

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?logo=github)](https://yangzhangscut2025.github.io)

华南理工大学工业工程与管理硕士，运筹优化与数据分析方向。记录学习笔记，沉淀项目实践。

## 🏗 技术栈

| 层级 | 技术 |
|------|------|
| 样式 | Tailwind CSS (Play CDN) + 自定义 CSS 变量 |
| 主题 | 双配色（绿紫 / 蓝黄）+ 亮暗模式 + 中英双语 |
| 交互 | 原生 JavaScript（主题引擎 / i18n / 导航 / 懒加载）|
| 博客 | Hugo 静态站点生成器 + KaTeX 数学公式 |
| 字体 | Inter（英文）+ Noto Sans SC（中文） |
| 部署 | GitHub Pages |

## 📂 项目结构

```
yangzhangscut2025.github.io/
├── index.html                  # 首页：双栏布局（头像 + 简介）
├── 404.html                    # 自定义 404 兜底页
├── .gitignore                  # 排除 Hugo 源文件
│
├── about/
│   └── index.html              # 关于我：时间轴 + 爱好卡片
├── resume/
│   └── index.html              # 简历：极简商务风，A4 打印优化
├── works/
│   ├── index.html              # 作品集：卡片网格
│   └── 地图生产调度/
│       └── index.html          # 项目详情页
├── blog/
│   ├── index.html              # 博客首页：分类目录 + 文章列表
│   └── posts/
│       └── gurobi-intro/
│           └── index.html      # Hugo 生成的文章示例
├── contact/
│   └── index.html              # 联系我：极简居中
│
├── assets/
│   ├── css/base.css            # CSS 变量：主题色 / 暗色模式 / 全局重置
│   ├── js/theme.js             # 主题切换引擎（localStorage 持久化）
│   ├── js/i18n.js              # 中英双语字典 + 切换逻辑
│   └── js/shared.js            # 导航高亮 / 汉堡菜单 / 回顶 / 懒加载
│
├── style.css                   # 简历页专属样式（保留）
├── Vibecoding/                 # 趣味小游戏
│   ├── 消消乐.html
│   ├── ai五子棋.html
│   └── 六月计划表.html
├── videos/                     # 项目演示视频
└── salesdata.pdf               # Excel 报表作品
```

## ✨ 功能特性

| 特性 | 说明 |
|------|------|
| 🎨 双主题配色 | 绿紫 / 蓝黄一键切换，localStorage 记忆 |
| 🌙 暗色模式 | 全站支持，localStorage 记忆 |
| 🌐 中英双语 | 全站所有页面统一字典驱动切换 |
| 📱 响应式 | PC / 平板 / 手机自适应，移动端汉堡菜单 |
| 🖨️ A4 打印 | 简历页 `@media print` 自动隐藏 UI 元素 |
| 📝 Hugo 博客 | `.md` 写文章，自动生成页面，KaTeX 公式渲染 |
| 🔝 回到顶部 | 滚动 > 300px 右下角浮现 |
| 🖼️ 图片懒加载 | IntersectionObserver + 原生 loading |
| 🔗 外链安全 | 所有外链 `target="_blank" rel="noopener"` |
| ♿ 无障碍 | `aria-label` / `role` / 语义化 HTML |

## 🚀 本地预览

```bash
git clone https://github.com/yangzhangscut2025/yangzhangscut2025.github.io.git
cd yangzhangscut2025.github.io

# 任意静态服务器即可
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 📝 写博客

博客文章用 Hugo 管理，`.md` 源文件在本地 `hugo-blog/` 目录（不提交到仓库）。

```bash
# 1. 创建新文章
#    hugo-blog/content/posts/文章名/index.md

# 2. 编译
cd hugo-blog && hugo

# 3. 将生成的 HTML 复制到主仓库
cp -r public/blog/posts/文章名 ../yangzhangscut2025.github.io/blog/posts/

# 4. 更新 blog/index.html 列表页链接
```

文章 Markdown 支持：标题 / 列表 / 代码块 / 表格 / 图片 / KaTeX 数学公式（`$$...$$`）。

## 📄 部署

- **仓库**: [yangzhangscut2025/yangzhangscut2025.github.io](https://github.com/yangzhangscut2025/yangzhangscut2025.github.io)
- **站点**: [https://yangzhangscut2025.github.io](https://yangzhangscut2025.github.io)

推送 `main` 分支后 GitHub Pages 自动部署。

## 📧 联系方式

- **邮箱**: zy13819041939@qq.com
- **GitHub**: [@yangzhangscut2025](https://github.com/yangzhangscut2025)

---

<p align="center">
  <sub>Tailwind CSS · Vanilla JS · Hugo · GitHub Pages</sub>
</p>
