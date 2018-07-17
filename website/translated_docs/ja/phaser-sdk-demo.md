---
id: phaser-sdk-demo
title: Phaser SDKのデモ
sidebar_label: Phaser SDKのデモ
---
![Game screenshot](/developers/img/screenshot.png)

[Phaser](http://phaser.io)と[Loom.js](https://github.com/loomnetwork/loom-js)を使用した、Loom DAppチェーンと対話するシンプルなHTML 5ゲームの基本サンプルだ。 ソースコードは[Github](https://github.com/loomnetwork/phaser-sdk-demo)で利用可能。

## ゲームの説明

矢印キーを使って移動し、上の矢印キーを押してジャンプする。 ブロックの列をパスするごとに１ポイントが与えられる。さらにスコアを増やすには、ボーナスの星を集める。

## 開発

1.) 自分のDAppチェーンを起動しよう

Loomをインストール

```bash
wget https://private.delegatecall.com/loom/osx/build-285/loom
chmod +x loom

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.delegatecall.com/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./loom init
cp ../genesis.example.json genesis.json
```

ブロックチェーンの起動

    ./loom run
    

自分のDAppチェーン起動についてのさらなる説明は、[Loom SDKドキュメンテーション](https://loomx.io/developers/docs/en/prereqs.html)を参照すること。

2.) 開発サーバーのスタート

開発サーバーの起動

    #ソースを取得
    git clone https://github.com/loomnetwork/phaser-sdk-demo.git
    
    cd phaser-sdk-demo
    
    # インストール
    yarn
    
    # protobuffのコンパイル
    yarn run proto
    
    # 開発サーバーの起動
    yarn run dev