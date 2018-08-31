---
id: phaser-sdk-demo
title: Phaser SDK 데모
sidebar_label: Phaser SDK 데모
---
![Game screenshot](/developers/img/screenshot.png)

[Phaser](http://phaser.io)와 [Loom.js](https://github.com/loomnetwork/loom-js)를 사용해서 Loom DappChain과 상호작용하는 간단한 HTML5 게임을 보여주는 기본적인 예제입니다. 소스코드는 [Github](https://github.com/loomnetwork/phaser-sdk-demo)에서 확인 가능합니다

## 게임 방법

Use the arrow keys to move around, jump by pressing the up arrow. For each passing row of blocks, 1 point is awarded. Collect bonus stars to increase your score further.

## 개발하기

1.) Run your own DappChain

Install Loom

```bash
wget https://private.delegatecall.com/loom/osx/build-404/loom
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