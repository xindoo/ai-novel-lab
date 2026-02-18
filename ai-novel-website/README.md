# 大厂重生：我用代码征服世界 - 官方网站

这是一个为小说《大厂重生：我用代码征服世界》构建的现代化在线阅读平台。

## 🚀 功能特性

### 核心功能
- ✅ **章节阅读** - 支持 50 章小说阅读，包含特殊编号（如 15.5, 16.5 等）
- ✅ **主题切换** - 默认光/夜间模式，支持系统偏好检测
- ✅ **字体调节** - 小/中/大/特大四种字体尺寸
- ✅ **进度追踪** - 自动保存每章阅读进度，支持断点续读
- ✅ **响应式设计** - 完美支持手机、平板、桌面端
- ✅ **目录导航** - 分页显示所有章节，支持上一页/下一页

### 技术特色
- **Vite + React** - 快速开发和构建
- **Tailwind CSS** - 自定义中国风主题色系
- **React Router** - 流畅的页面导航
- **Remark** - Markdown 章节解析
- **LocalStorage** - 本地数据持久化

## 🎨 设计主题

### 默认光模式（浅色）
- 背景：米白色宣纸色调 (#FDFBF7)
- 文字：浓墨/淡墨/灰墨三色层次
- 强调色：朱砂红 (#B83B3B)

### 夜间模式（深色）
- 背景：深灰色调 (#1A1A1C)
- 文字：月白/银灰/铅灰三色层次
- 强调色：暗朱红 (#C94848)

## 📁 项目结构

```
ai-novel-website/
├── src/
│   ├── components/          # React 组件
│   │   ├── layout/         # 布局组件 (Header, Footer, ReaderLayout)
│   │   ├── navigation/     # 导航组件 (ChapterList, ChapterNav)
│   │   ├── reader/         # 阅读器组件 (ChapterContent, ReadingSettings, ProgressBar)
│   │   └── ui/             # UI 组件 (ThemeToggle, MobileMenu, LoadingSkeleton)
│   ├── hooks/              # 自定义 Hooks
│   │   ├── useTheme.js     # 主题管理
│   │   ├── useFontSize.js  # 字体大小管理
│   │   └── useReadingProgress.js  # 阅读进度管理
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── Reader.jsx      # 阅读器页面
│   │   └── ChapterList.jsx # 目录页面
│   ├── utils/              # 工具函数
│   │   ├── storage.js      # LocalStorage 封装
│   │   └── chapterParser.js # 章节数据解析
│   ├── data/               # 数据文件 (自动生成)
│   │   ├── chapters.json   # 章节列表
│   │   └── novel-info.json # 小说信息
│   ├── styles/             # 样式文件
│   │   ├── themes.css      # 主题变量
│   │   └── typography.css  # 排版样式
│   ├── App.jsx             # 应用入口
│   ├── main.jsx            # React 入口
│   └── index.css           # 全局样式
├── scripts/
│   └── generate-chapter-data.js  # 章节数据生成脚本
├── chapter/                # 章节文件（符号链接）
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 部署配置
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ 开发指南

### 环境要求
- Node.js >= 20.19
- npm >= 10

### 安装依赖
```bash
cd ai-novel-website
npm install
```

### 本地开发
```bash
# 生成章节数据
node scripts/generate-chapter-data.js

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000/ai-novel-website/

### 构建生产版本
```bash
npm run build
```

构建产物在 `dist/` 目录

### 预览生产版本
```bash
npm run preview
```

## 📖 章节格式

章节文件位于 `chapter/` 目录，命名格式：`XXX_章节名.md`

示例：
```markdown
## 第 1 章 死亡回档

这里是正文内容...
```

## 🚀 部署

### GitHub Pages 自动部署

项目配置了 GitHub Actions，推送到 `main` 分支时自动部署：

1. 推送代码到 main 分支
2. GitHub Actions 自动构建
3. 部署到 GitHub Pages

访问地址：https://xindoo.github.io/ai-novel-website/

### 手动部署

```bash
# 构建
npm run build

# 将 dist/ 目录内容部署到 Web 服务器
```

## 📊 性能指标

- ✅ 初始加载 < 2s
- ✅ 构建产物 ~400KB (gzip 后 ~126KB)
- ✅ 支持 50 章小说
- ✅ 移动端完美适配

## 🎯 最佳实践

### 中文字体优化
- 使用 Noto Sans SC / Noto Serif SC
- 基础字号 >= 18px
- 行高 1.75
- 字间距 0.02em

### 无障碍设计
- 所有交互元素支持键盘导航
- 颜色对比度符合 WCAG AA 标准
- 语义化 HTML 标签

### 性能优化
- 按需加载章节内容
- LocalStorage 缓存阅读进度
- CSS 变量实现主题切换

## 📝 更新日志

### v1.0.0 (2026-02-18)
- ✅ 初始版本发布
- ✅ 50 章小说阅读支持
- ✅ 完整主题系统
- ✅ 移动端适配
- ✅ GitHub Pages 自动部署

## 📄 许可证

MIT License

## 🔗 相关链接

- [GitHub 仓库](https://github.com/xindoo/ai-novel-lab)
- [小说大纲](../章节大纲.md)
- [AI Agent 指南](../AGENTS.md)

---

**AI Novel Lab** - 用代码征服世界，一字一章。
