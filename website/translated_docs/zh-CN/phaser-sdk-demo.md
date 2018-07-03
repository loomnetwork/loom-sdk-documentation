---
id: phaser-sdk-demo
title: Phaser SDK 演示
sidebar_label: Phaser SDK 演示
---
![Game screenshot](/developers/img/screenshot.png)

一个简单的示例， 展示了一个简单的HTML5游戏和Loom Dapp链交互，使用 [Phaser](http://phaser.io) 和 [Loom.js](https://github.com/loomnetwork/loom-js)。 源代码可在 [Github](https://github.com/loomnetwork/phaser-sdk-demo) 找到。

## Game instructions

Use the arrow keys to move around, jump by pressing the up arrow. For each passing row of blocks, 1 point is awarded. Collect bonus stars to increase your score further.

## Development

1.) Run your own DappChain

Install Loom

```bash
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.delegatecall.com/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./loom init
cp ../genesis.example.json genesis.json
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