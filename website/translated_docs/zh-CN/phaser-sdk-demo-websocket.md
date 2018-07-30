---
id: phaser-sdk-demo-websocket
title: Javascript WebSockets 演示
sidebar_label: Phaser + Websockets 演示
---
一个简单的示例， 展示了一个简单的 HTML5 + WebSockets 和Loom Dapp链交互，使用 [Phaser](http://phaser.io) 和 [Loom.js](https://github.com/loomnetwork/loom-js)。 源代码位于 [Github Websocket 演示](https://github.com/loomnetwork/tiles-chain)

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## 游戏说明

使用鼠标光标单击黑色画布区域以创建彩色图块，每个新玩家将在画布上有不同的颜色，并在所有玩家之间共享。

## 开发

### 1.) 下载示例项目 (Tiles Chain)

```bash
git clone https://github.com/loomnetwork/tiles-chain
```

### 2.) 启动 Dapp链

```bash
cd tiles-chain
mkdir tmpgopath
export GOPATH=`pwd`/tmpgopath

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-330/loom
chmod +x loom

# Compile
export GOPATH=$GOPATH:`pwd`
make deps
make

# Configure
cd build
../loom init
cp ../genesis.example.json genesis.json

# Run
../loom run
```

### 3.) 启动 web 服务器

```bash
# 安装
yarn

# 编译 protobuf
yarn run proto

# 启动演示
yarn start

```

### 5.) 运行

Tiles-Chain web 界面将在 `http://localhost:9000` 上提供