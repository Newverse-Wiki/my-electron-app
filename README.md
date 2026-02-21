# my-electron-app

基于 [Electron](https://www.electronjs.org/) 官方教程搭建的示例应用，演示主进程与渲染进程通信、预加载脚本、自动更新等核心概念。

## 功能特性

- Electron 基础窗口与页面加载
- 主进程与渲染进程通过 IPC 通信（`ping` / `pong`）
- 预加载脚本（`contextBridge`）安全暴露 Node 环境信息
- 渲染进程显示 Chrome、Node.js、Electron 版本信息
- 自动更新：通过 [update-electron-app](https://github.com/electron/update-electron-app) 从 GitHub Releases 检测并应用新版本

## 环境要求

- Node.js 16+
- npm 或 yarn

## 安装

```bash
npm install
```

## 开发

```bash
npm start
```

以开发模式启动应用（由 Electron Forge 管理）。

## 打包

```bash
# 打包应用
npm run package

# 生成可分发的安装包
npm run make
```

支持的平台：

- **macOS**：Squirrel、ZIP
- **Windows**：Squirrel
- **Linux**：deb、rpm

## 发布到 GitHub

将构建产物发布到 [GitHub Releases](https://github.com/Newverse-Wiki/my-electron-app/releases)：

```bash
npm run publish
```

**前置条件**：在 `.env` 中配置 `GITHUB_TOKEN`（需 `repo` 权限的 [Personal Access Token](https://github.com/settings/tokens)）：

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

发布后 Release 为草稿状态，需在 GitHub 上手动点击「Publish release」后，用户端的自动更新才会检测到新版本。

## 项目结构

```
my-electron-app/
├── main.js         # 主进程入口（含自动更新）
├── preload.js      # 预加载脚本（桥接主进程与渲染进程）
├── renderer.js     # 渲染进程逻辑
├── index.html      # 渲染页面
├── forge.config.js # Electron Forge 打包与发布配置
├── .env            # 环境变量（GITHUB_TOKEN，不提交）
└── package.json
```

## 技术说明

- **主进程**（`main.js`）：创建窗口、注册 IPC 处理器、调用 `updateElectronApp()` 启用自动更新
- **预加载脚本**（`preload.js`）：通过 `contextBridge.exposeInMainWorld` 暴露 `versions` API，遵循上下文隔离
- **渲染进程**（`renderer.js`）：调用 `versions.ping()` 与主进程通信，显示环境版本

## 许可证

MIT
