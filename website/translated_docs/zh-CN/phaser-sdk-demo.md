---
id: phaser-sdk-demo
title: Phaser SDK 演示
sidebar_label: Phaser SDK 演示
---
![Game screenshot](/developers/img/screenshot.png)

一个简单的示例， 展示了一个简单的HTML5游戏和Loom Dapp链交互，使用 [Phaser](http://phaser.io) 和 [Loom.js](https://github.com/loomnetwork/loom-js)。 源代码可在 [Github](https://github.com/loomnetwork/phaser-sdk-demo) 找到。

## 游戏说明

使用箭头键移动，按向上箭头跳转。 每通过一排砖块，奖励1分。 收集奖金星星以进一步提高你的分数。

## 开发

1.) 运行你自己的 Dapp 链

安装Loom

```bash
wget https://private.delegatecall.com/loom/osx/build-276/loom
chmod +x loom

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.delegatecall.com/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./loom init
cp ../genesis.example.json genesis.json
```

运行区块链

    ./loom run
    

有关运行Dapp链的更多说明，请参阅[Loom SDK 文档](https://loomx.io/developers/docs/en/prereqs.html)。

2.) 启动 dev 服务器

运行 dev 服务器

    # 获取源代码
    git clone https://github.com/loomnetwork/phaser-sdk-demo.git
    
    cd phaser-sdk-demo
    
    # 安装
    yarn
    
    # 编译 protobuf
    yarn run proto
    
    # 启动 dev 服务器
    yarn run dev