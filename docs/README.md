# GitHub Pages 部署说明

## 自动部署

本网站使用 GitHub Pages 自动部署。每次推送到 `main` 分支时，`docs/` 目录中的内容会自动发布到：

**https://xindoo.github.io/ai-novel-lab**

## 本地测试

可以在本地直接打开 `docs/index.html` 文件进行预览：

```bash
# 使用 Python 启动本地服务器
cd docs
python -m http.server 8000

# 访问 http://localhost:8000
```

或者使用 VS Code 的 Live Server 扩展打开 `docs/index.html`。

## 网站功能

- ✅ 50 章完整小说内容
- ✅ 经典中文网文风格设计
- ✅ 深色/浅色模式切换
- ✅ 字体大小调节（小/中/大/特大）
- ✅ 阅读进度自动保存
- ✅ 移动端优化
- ✅ 键盘导航（← → 切换章节）
- ✅ 章节目录快速跳转

## 文件结构

```
docs/
└── index.html    # 单页应用，包含所有样式和脚本
```

## 技术栈

- 纯 HTML + CSS + JavaScript（无框架依赖）
- 经典中文网文配色方案
- localStorage 持久化存储
- 响应式设计（移动优先）

## 自定义配置

如需修改网站标题、配色等，编辑 `docs/index.html` 文件中的：

- `<title>` - 网站标题
- `:root` CSS 变量 - 配色方案
- `chapters` 数组 - 章节列表

## 注意事项

1. 确保 `chapter/` 目录中的小说文件与 `index.html` 中的章节列表匹配
2. 所有章节文件必须使用 UTF-8 编码
3. 图片等静态资源需要放在 `docs/` 目录下才能正确访问
