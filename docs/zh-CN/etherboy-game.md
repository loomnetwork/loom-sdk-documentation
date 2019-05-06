---
id: etherboy-game
title: Etherboy游戏
sidebar_label: Etherboy游戏
---
![页眉](/developers/img/ebw_splash.jpg) Etherboy是一个基于Unity的多平台2D游戏，使用 [Loom Unity SDK](unity-sdk.html)与一个用Golang写的智能合约交互并运行在Loom DApp链上。

## 游戏控制

### 台式机 / WebGL

- **UP**：进门、爬绳
- **DOWN**：从绳索下来
- **E**：与NPC交谈、在床上睡觉、与物品交互
- **空间** / **右键单击**: 跳
- **左键单击**: 攻击 (当装备了武器时)

## 支持的平台

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows/Mac/Linux

## 开发

目前你需要在MacOS或Linux上启动Loom DApp链，但是如果你在用Windows 10，你可以运行在[Linux的Windows子系统](https://docs.microsoft.com/en-us/windows/wsl/install-win10)中的Ubuntu（其他发行版本可能也可以，但是文档是写给Ubuntu的）。

### MacOS

1. 按照 [MacOS 环境依赖](prereqs.html) 中的步骤安装 Golang (如果你尚未完成此操作)。
2. 下载Loom DApp链二进制 
        bash
        wget https://private.delegatecall.com/loom/osx/stable/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. 按照 [Ubuntu 环境依赖](prereqs-ubuntu.html) 中的步骤安装 Golang (如果你尚未完成此操作)。
2. 下载Loom DApp链二进制 
        bash
        curl -OL https://private.delegatecall.com/loom/linux/stable/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### 部署 Etherboy 合同 (OSX/Linux)

从 Github 获取智能合约代码

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

构建和部署合约

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

假设一切到目前为止都很顺利，那么你现在有一个本地Loom DApp链在运行着Etherboy智能合约啦!

![动画](/developers/img/etherboy-clip.gif)

### 构建Unity项目

从Github克隆 [Etherboy 游戏](https://github.com/loomnetwork/Etherboy) 的Unity项目并修改

- 在Unity中打开项目
- 选择 `File`->`Build Settings`
- 从平台列表中选择 `Web GL` 或 `PC, Mac & Linux Standalone`
- 如果启用了`Switch Platform` 请点击
- 点击 `Build`, 选择生成输出目录

> WebGL 完整游戏的生成需要大约30分钟完成。

### 运行游戏

#### 桌面

启动在生成输出目录中生成的二进制文件。如果你在登录时有问题, 请确保在端口 `9998` 上没有运行任何内容。

#### WebGL

运行一个http服务器来为在`localhost:8090`的生成输出目录提供服务，并在你的网络浏览器中打开`localhost:8090`。

如果你不知道如何设置本地http服务器, 请按照以下步骤执行。

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### 可选配置

如果你将本地DApp链配置为在其他主机或端口上运行，则需要在做**WebGL** 生成之前，更新以下`Assets/WebGLTemplates/Loom/settings.js` 的部分，或者你可以在生成之后编辑在生成输出目录中的`settings.js` ：

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

对于桌面生成，你需要编辑`Assets/Resources/env_config.json` 来更改默认的DApp链托管&端口：

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```