---
id: unity-sample-tiles-chain-evm
title: 图块EVM示例
sidebar_label: 图块EVM示例
---
通过[Loom Unity SDK](https://github.com/loomnetwork/unity3d-sdk) 展示简单的Unity游戏与基于EVM的Loom Dapp链交互的基本示例。 比较喜欢看视频？ 下面是本文档的演示 [视频](/developers/img/tiles-evm-walkthrough.mov)

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## 游戏说明

使用鼠标光标单击黑色画布区域以创建彩色图块，每个新玩家将在画布上有不同的颜色，并在所有玩家之间共享。

## 开发

### 1. 运行您自己的 Dapp链

有关运行Dapp链的更多说明，请参阅[Loom SDK 文档](https://loomx.io/developers/docs/en/prereqs.html)。

### 2. 下载示例项目 (Unity Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/unity-tiles-chain-evm
```

### 3. 启动 Dapp链

```bash
cd unity-tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-375/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4. 建立Unity客户端

打开位于 `unityclient` 文件夹中的Unity项目。打开 `LoomTilesChainEvm` 场景并构建它。