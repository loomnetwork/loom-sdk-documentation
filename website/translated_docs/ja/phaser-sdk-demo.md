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

    wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-132/loom
    chmod +x loom
    
    mkdir tmpgopath
    export GOPATH=`pwd`/tmpgopath
    ./loom spin weave-blueprint
    cd blueprint
    export GOPATH=$GOPATH:`pwd`
    make deps
    make
    cd build
    
    ../../loom init
    cp ../genesis.example.json genesis.json
    
    

ブロックチェーンの起動

    ../../loom run
    

自分のDAppチェーン起動についてのさらなる説明は、[Loom SDKドキュメンテーション](https://loomx.io/developers/docs/en/prereqs.html)を参照すること。

2.) 開発サーバーのスタート

開発サーバーの起動

    #ソースを入手
    git clone git@github.com:loomnetwork/phaser-sdk-demo.git
    
    cd phaser-sdk-demo
    
    # インストール
    yarn
    
    # protobuffのコンパイル
    yarn run proto
    
    # 開発サーバーの起動
    yarn run dev
    
    

## Loom Network

<https://loomx.io>

## ライセンス

MIT