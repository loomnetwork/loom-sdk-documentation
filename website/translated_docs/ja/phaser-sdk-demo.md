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
wget https://private.delegatecall.com/loom/osx/build-133/loom
chmod +x loom

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.delegatecall.com/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./loom init
```

Replace genesis.json with:

```json
{
  "contracts": [
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "BluePrint",
      "location": "blueprint:0.0.1",
      "init": {
      }
    }
  ]
}
```

Run Blockchain

    ./loom run
    

Please consult the [Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

2.) Start the dev server

Run dev server

    #Get Source
    git clone https://github.com/loomnetwork/phaser-sdk-demo.git
    
    cd phaser-sdk-demo
    
    # Install
    yarn
    
    # Compile protobuff
    yarn run proto
    
    # Start the dev server
    yarn run dev