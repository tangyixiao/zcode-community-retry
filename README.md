# ZCode 会话恢复预览版

Community Retry 提供手动接续命令，Retry Keeper 在工具报告连接重置、超时或 HTTP 502/503/504 等临时故障时给模型一条恢复提示。适用于希望保留同一段对话、核对已有进度再继续的用户。主模型请求失败时，需要用户在聊天里主动发起下一轮。

## 在 Windows ZCode 3.19.1 中安装

1. 从本仓库的预发布页下载市场 ZIP，解压到准备长期保留的目录。
2. 在已打开的工作区进入插件市场，选择添加本地市场，选择解压目录中的 `marketplace.json`。预览市场名为 `tangyixiao-zcode-recovery-preview`。
3. 安装并启用 `zcode-retry-preview`。如需工具故障提示，再安装 `zcode-retry-keeper-preview`，并在设置中启用 Hooks。Keeper 需要可由 PATH 启动的 Node.js。
4. 打开需要接续的聊天，在斜杠菜单搜索 `retry_resume`。Keeper 的 Hook 在新会话启用，工具失败时按需提供提示。

两个预览插件使用独立 ID，可与稳定版并存。要移除预览版，先卸载 Keeper，再卸载 Retry 并移除预览市场。自动重试次数、间隔设置及强制恢复开关属于稳定版。

[English guide](README.en.md) · [ZCode 插件文档](https://zcode.z.ai/cn/docs/plugin) · [AGPL-3.0](LICENSE)
