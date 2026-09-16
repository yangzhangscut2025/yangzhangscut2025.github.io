# AGENT.md — Kyra 个人主页项目

## 项目概述

Kyra 的个人主页 / 在线简历网站，托管于 GitHub Pages（yangzhangscut2025.github.io）。  
作者为华南理工大学工业工程与管理硕士在读生，主攻运筹优化与数据分析。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | 纯静态 HTML（无构建工具，仅 Tailwind CSS 需一次性构建） |
| UI | Tailwind CSS v3.4（**预构建静态产物** `assets/css/tailwind.min.css`，非 CDN）+ 自定义 CSS 变量 |
| 字体 | Inter + Noto Sans SC（Google Fonts） |
| 图标 | Emoji / Font Awesome（仅简历页） |
| 响应式 | Tailwind 响应式断点 + 少量自定义 media query |
| 多语言 | 自研 i18n 模块（中/英切换，localStorage 持久化） |
| 主题 | 双配色（绿紫/蓝黄）+ 深色/浅色模式，localStorage 持久化 |
| 部署 | GitHub Pages 静态部署 |

> **Tailwind 构建**：早期通过 Play CDN（`cdn.tailwindcss.com`）在浏览器端实时生成 CSS（~120 KB JS）。现已改为预构建产物：HTML 中不再有任何 Tailwind `<script>`，只引用 `assets/css/tailwind.min.css`（19 KB，gzip 后 4.4 KB）。
> 修改任意 class 后需重新构建：
> ```bash
> npx tailwindcss@3.4.17 -c tailwind.config.js \
>   -i assets/css/tailwind.src.css -o assets/css/tailwind.min.css --minify
> ```

## 目录结构

```
/
├── index.html              # 首页（Hero + 精选作品）
├── agent.md                # 本文件 — 项目说明
├── favicon.svg             # 站点图标（全站引用）
├── tailwind.config.js      # Tailwind 构建配置（content 扫描范围 + 主题扩展）
├── style.css               # 仅 resume 页使用（独立样式）
├── about/
│   └── index.html          # 关于我（经历时间线 + 爱好画廊）
├── resume/
│   └── index.html          # 在线简历（独立布局，非 Tailwind）
├── works/
│   ├── index.html          # 作品集列表页
│   ├── 薪酬合规审阅工具/    # 作品详情页（含图片）
│   ├── 合同校对工具/        # 作品详情页（含图片）
│   ├── ai保险助手/          # 作品详情页（含图片）
│   ├── 五山校区餐饮分析/    # 作品详情页 + Folium 地图
│   ├── Excel报表/           # 作品（PDF 展示）
│   ├── 消消乐/              # 作品封面图
│   └── 五子棋/              # 作品封面图
├── blog/
│   ├── index.html          # 博客列表（分类筛选）
│   └── posts/              # 博客文章（每篇一个子目录 + index.html）
├── contact/
│   └── index.html          # 联系页（Email + GitHub）
├── Vibecoding/             # 独立 Demo 页面（消消乐、五子棋、日程计划、报价器）
├── videos/                 # 演示视频（mp4）
├── assets/
│   ├── css/base.css        # CSS 变量 + 全局样式 + 暗色模式 + 导航底色 + 滚动动画
│   ├── css/tailwind.min.css# Tailwind 预构建产物（勿手改，改 tailwind.src.css 后重建）
│   ├── css/tailwind.src.css# Tailwind 构建入口
│   ├── js/theme.js         # 主题系统（双配色 + 深色/浅色）
│   ├── js/i18n.js          # 国际化系统（中/英字典 + 切换）
│   ├── js/shared.js        # 通用脚本（渲染导航/页脚、菜单、滚动、懒加载、入场动画）
│   └── images/
│       ├── avatar.webp     # 头像
│       └── hobby/          # 爱好图片（book/ craft/ mountain/ nature/ skate）
└── 地图可视化/             # 独立 IPython notebook + 页面
```

## 页面功能清单

### 导航栏（所有页面共用）
- **由 `shared.js` 的 `renderNav()` 统一渲染**，页面内只保留 `<div id="navbar"></div>` 占位符
- 固定顶部 + 毛玻璃效果（`backdrop-blur-md` + `.nav-bg` 半透明底色）
- 当前页高亮（通过 `data-page` + `data-nav` 匹配）
- 响应式：桌面端行内链接 → 移动端汉堡菜单
- 右上角：语言切换（中/EN）、深色模式切换、配色切换（绿紫/蓝黄）

### 页脚（所有页面共用）
- 由 `shared.js` 的 `renderFooter()` 统一渲染，页面内只保留 `<div id="footer"></div>` 占位符
- 自动填充当前年份 + GitHub / 邮箱链接，文案支持 i18n（`footer.rights`）

### 首页（`index.html`）
- Hero 区：头像、姓名、角色标签、一句话简介、CTA 按钮
- 精选作品区：3 个作品卡片（网格布局）

### 关于我（`about/index.html`）
- 经历：垂直时间线（教育 + 实习）
- 爱好：5 个分类的横向滚动画廊（带左右箭头 + 鼠标拖拽）

### 简历（`resume/index.html`）
- 独立布局（非 Tailwind，使用 Font Awesome 图标）
- 左侧栏：联系方式、技能标签、荣誉奖项、语言证书
- 右侧区：教育背景、项目经历、实习经历、个人优势
- 支持打印/保存 PDF（`window.print()`）

### 作品集（`works/index.html`）
- 卡片网格展示所有项目
- 每张卡片：封面图、标题、描述、标签、技术栈、操作按钮（详情/Demo）

### 博客（`blog/index.html`）
- 左侧分类筛选侧边栏（AI学习、运筹优化、数学建模等）
- 右侧文章列表（标题、摘要、日期、阅读时间、分类标签）
- 分类切换通过 JS 过滤 `data-category`

### 联系我（`contact/index.html`）
- Email 和 GitHub 链接卡片

## 关键设计模式

### CSS 变量系统
- `--primary` / `--secondary` / `--bg` / `--card` / `--text` 等
- 通过 `[data-theme]` 和 `[data-mode]` 切换
- 浅色/深色模式 + 绿紫/蓝黄共 4 种组合

### i18n 系统（`i18n.js`）
- 通过 `data-i18n` 属性标记可翻译元素
- 中英双语字典，localStorage 持久化
- 切换时触发 `langchange` 自定义事件

### 主题系统（`theme.js`）
- `data-theme` + `data-mode` 控制 HTML 属性
- localStorage 持久化（`site-theme`、`site-mode`）
- 暴露 `window.Theme` API

### 通用脚本（`shared.js`）
- `renderNav()` — 渲染全站导航栏（含桌面/移动双份链接）
- `renderFooter()` — 渲染全站页脚
- 导航高亮
- 汉堡菜单
- 主题选项弹窗
- 回到顶部按钮（滚动 > 300px 显示）
- 图片懒加载（`loading=lazy` 原生 + IntersectionObserver 回退）
- 外部链接自动 `target=_blank`
- `initReveal()` — 滚动入场动画（仅对首屏外的卡片生效，避免闪烁；尊重 `prefers-reduced-motion`）

`boot()` 执行顺序很关键：先 `renderNav()` / `renderFooter()` 插入 DOM，再绑定事件与 i18n / 主题同步，否则监听器绑不到元素。

## 已完成优化

| 项目 | 说明 |
|------|------|
| 导航栏统一 | 32 页重复的 `<nav>` 收敛为 `renderNav()`，页面只留 `<div id="navbar"></div>` |
| 页脚统一 | 新增 `renderFooter()`，自动年份 + i18n |
| 图片优化 | 54 张 JPG/PNG → WebP，14.03 MB → 2.67 MB（↓81%）；为 21 张图补 `width`/`height` 防 CLS |
| Tailwind 瘦身 | Play CDN（~120 KB JS）→ 预构建 `tailwind.min.css`（19 KB / gzip 4.4 KB） |
| 滚动动画 | `main` 入场淡入 + 卡片 IntersectionObserver 逐项浮现，支持 reduced-motion |
| favicon | 新增 `favicon.svg`，消除全站 `/favicon.ico` 404 |
| 修复 i18n | `i18n.js` 字典缺少闭合 `};`，导致整个模块解析失败、中英切换全站失效 |
| 修复导航底色 | `bg-[var(--bg)]/90` 在 Tailwind v3 对 arbitrary `var()` 无法应用透明度修饰符，实际未生成任何样式；改为 `base.css` 中的 `.nav-bg`（`color-mix`） |
| 修复导航翻译 | 导航链接补上 `data-i18n="nav.*"`，英语模式下导航不再停留在中文 |
| 修复画廊 404 | 爱好画廊硬编码每目录取 5 张，但 mountain/skate/book 不足 5 张；改为按目录真实数量渲染 |

## 优化方向（后续可做）

1. **字体**：Google Fonts 是当前最大的网络开销（首页约 1.13 MB / 14 个请求，主要是 Noto Sans SC 的 CJK 子集），可考虑自托管子集化或对中文回退到系统字体
2. **SEO**：可增加更多结构化数据（JSON-LD）
3. **可访问性**：完善 `aria-*` 标签，支持键盘导航
4. **内容**：博客文章可考虑使用 Markdown 源文件 + 构建生成 HTML
5. **作品详情页**：部分作品详情页只展示图片，可丰富内容结构
6. **`prose` 类**：`blog/posts/ai-assisted-dev-reflection` 等页使用了 `prose prose-slate`，但 Play CDN 未加载 `@tailwindcss/typography`，一直是无效果类（现由 `[&_h2]:` 等任意变体提供样式）。若要启用需在 `tailwind.config.js` 加插件

## 本 Agent 的职责

作为本项目的 AI 编码助手，我负责：
- 理解项目架构和设计意图
- 保持代码风格一致（纯静态、自定义 CSS 变量 + Tailwind 预构建产物）
- 在优化时遵循现有设计模式（i18n、主题系统、通用脚本）
- 所有的导航、主题、多语言功能保持跨页面一致
- 维护 GitHub Pages 兼容性（纯静态、相对路径）
- 修改 class 后同步重建 `assets/css/tailwind.min.css`，否则新样式不会生效