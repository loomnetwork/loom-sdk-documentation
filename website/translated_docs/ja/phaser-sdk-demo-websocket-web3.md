---
id: phaser-sdk-demo-web3-websocket
title: Javascript WebSocketsとWeb3のデモ
sidebar_label: JS Websocket + EVM Web3 デモ
---
[Phaser](http://phaser.io)と[Loom.js](https://github.com/loomnetwork/loom-js)を使用した、Loom DAppチェーンと対話するシンプルなHTML 5+ Websocketのゲーム基本サンプルだ。今回はWeb3とLoomプロバイダを使用して、イーサリアム開発者にとってのシームレスなUXとしている。

![](/developers/img/websocket_evm.gif)

## ゲームの説明

マウスカーソルを使って黒いキャンバス領域をクリックし、色のついたタイルを作る。新しいプレイヤーはキャンバス上でそれぞれ異なる色を持つち、キャンバスは全てのプレイヤーから共有される。

## 開発

### 1.) 自分のDAppチェーンを起動しよう

自分のDAppチェーン起動についてのさらなる説明は、[Loom SDKドキュメンテーション](https://loomx.io/developers/docs/en/prereqs.html)を参照すること。

### 2.) サンプルプロジェクトのダウンロード(Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/tiles-chain-evm
```

### 3.) DAppチェーンのスタート

```bash
cd tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/stable/loom
chmod +x loom

# 設定
./loom init
cp genesis.example.json genesis.json

# 起動
./loom run
```

### 4.) webサーバーのスタート

```bash
# ２つ目のターミナルにて
cd tiles-chain-evm/webclient

# インストール
yarn

# デモのスタート
yarn start
```

### 5.) 起動

Tiles-Chainウェブインターフェースは今後`http://localhost:9000`で利用可能となる。