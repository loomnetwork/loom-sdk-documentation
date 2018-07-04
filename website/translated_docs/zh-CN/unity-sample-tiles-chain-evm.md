---
id: unity-sample-tiles-chain-evm
title: 图块EVM示例
sidebar_label: 图块EVM示例
---
使用 [Loom Unity SDK](https://github.com/loomnetwork/unity3d-sdk) 展示简单Unity游戏与基于EVM的Loom Dapp链交互的基本示例

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## 游戏说明

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players.

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
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4. Build the Unity client

打开位于 `unityclient` 文件夹中的Unity项目。打开 `LoomTilesChainEvm` 场景并构建它。