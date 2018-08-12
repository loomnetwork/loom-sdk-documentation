---
id: unity-sample-tiles-chain-evm
title: TilesのEVMサンプル
sidebar_label: TilesのEVMサンプル
---
[Loom Unity SDK](https://github.com/loomnetwork/unity3d-sdk)を使用した、EVMベースのLoom DAppチェーンと対話するシンプルなUnityゲームの基本サンプルだ。 動画の方がよければ、 [こちらの動画](/developers/img/tiles-evm-walkthrough.mov)でこのドキュメンテーションを解説している。

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## ゲームの説明

マウスカーソルを使って黒いキャンバス領域をクリックし、色のついたタイルを作る。新しいプレイヤーはキャンバス上でそれぞれ異なる色を持つち、キャンバスは全てのプレイヤーから共有される。

## 開発

### 1. 自分のDAppチェーンを起動しよう

自分のDAppチェーン起動についてのさらなる説明は、[Loom SDKドキュメンテーション](https://loomx.io/developers/docs/en/prereqs.html)を参照すること。

### 2. サンプルプロジェクトのダウンロード(Unity Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/unity-tiles-chain-evm
```

### 3. DAppチェーンのスタート

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

### 4. Unityクライアントの構築

`unityclient`フォルダ内にあるUnityプロジェクトを開き、`LoomTilesChainEvm` シーンを開いてビルドしよう。