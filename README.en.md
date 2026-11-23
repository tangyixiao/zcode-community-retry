# ZCode recovery preview

Community Retry adds a slash command for manually continuing an interrupted task in its original chat. Retry Keeper adds recovery guidance after a tool reports a transient network error. Model transport failures require another user turn. Neither plugin automatically replays a request or changes plugin settings.

In ZCode Desktop 3.19.1 on Windows, open a workspace. Download the marketplace ZIP from the prerelease, extract it to a permanent directory and add its `marketplace.json` as a local marketplace. Install and enable `zcode-retry-preview`. Search for `retry_resume` in the slash menu of the interrupted chat. Optionally install `zcode-retry-keeper-preview`, enable Hooks in ZCode and start a new session. Keeper requires Node.js on PATH. To remove the preview, uninstall Keeper, then Retry, and remove the preview marketplace. The stable plugins use separate IDs.

[中文说明](README.md) · [ZCode plugin documentation](https://zcode.z.ai/en/docs/plugin) · [AGPL-3.0](LICENSE)
