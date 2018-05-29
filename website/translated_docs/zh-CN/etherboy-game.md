---
id: etherboy-game
title: Etherboy游戏
sidebar_label: Etherboy游戏
---
![Header](/developers/img/ebw_splash.jpg) Etherboy是一个基于Unity的多平台2D游戏，使用 [Loom Unity SDK](unity-sdk.md)与一个用Golang写的智能合约交互并运行在Loom DApp链上。

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

1. Install Golang by following the steps in [MacOS prerequisites](prereqs.md) (if you haven't done so already).
2. Download Loom DAppChain binary 
        bash
        wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-133/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. Install Golang by follwing the steps in [Ubuntu prerequisites](prereqs-ubuntu.md) (if you haven't done so already).
2. Download Loom DAppChain binary 
        bash
        curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-133/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Deploy Etherboy contract (OSX / Linux)

Fetch the smart contract code from Github

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

Build and deploy the contract

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

Assuming everything went without a hitch so far you now have a local Loom DAppChain running the Etherboy smart contract!

![Animation](/developers/img/etherboy-clip.gif)

### Build the Unity project

Clone the Unity project for the [Etherboy game](https://github.com/loomnetwork/Etherboy) from Github and modify

- Open the project in Unity
- Select `File`->`Build Settings`
- Select either `Web GL` or `PC, Mac & Linux Standalone` from the platform list
- Press `Switch Platform` if it's enabled
- Press `Build`, select the build output directory

> WebGL builds of the full game take around 30 minutes to complete.

### Run the game

#### Desktop

Just launch the binary generated in the build output directory. If you have issues logging in please ensure nothing is running on port `9998`.

#### WebGL

Run an http server to serve the build output directory at `localhost:8090`, and open `localhost:8090` in your web browser.

If you don't know how to set up a local http server follow the steps below.

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### Optional configuration

If you configure your local DAppChain to run on another host or port you'll need to update the following section of `Assets/WebGLTemplates/Loom/settings.js` before doing a **WebGL** build, or you can edit `settings.js` inside the build output directory after the build:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

For a desktop build you'll need to edit `Assets/Resources/env_config.json` to change the default DAppChain host & port:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```