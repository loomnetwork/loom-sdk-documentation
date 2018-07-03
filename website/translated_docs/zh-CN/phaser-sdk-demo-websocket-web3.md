---
id: phaser-sdk-demo-web3-websocket
title: Javascript WebSockets 和 Web3 演示
sidebar_label: JS WebSockets + EVM Web3 演示
---
一个基本示例，使用 [Phaser](http://phaser.io) 和 [Loom.js](https://github.com/loomnetwork/loom-js) 进行 HTML5 + WebSockets 与 Loom Dapp链 的简单交互，这一次使用 Web3 和 Loom Provider 为以太坊开发人员创建无缝体验

![](/developers/img/websocket_evm.gif)

## 游戏说明

使用鼠标光标单击黑色画布区域以创建彩色图块，每个新玩家将在画布上有不同的颜色，并在所有玩家之间共享。

## 开发

### 1.) 运行你自己的 Dapp 链

有关运行Dapp链的更多说明，请参阅[Loom SDK 文档](https://loomx.io/developers/docs/en/prereqs.html)。

### 2.) 下载示例项目 (Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/tiles-chain-evm
```

### 3.) 启动 Dapp 链

```bash
cd tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4.) Start the web server

```bash
# On second terminal
cd tiles-chain-evm/webclient

# Install
yarn

# Start the demo
yarn start
```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`