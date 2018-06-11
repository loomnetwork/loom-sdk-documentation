---
id: cocos-sdk-quickstart
title: Cocos Creator的Loom SDK
sidebar_label: Cocos SDK快速开始
---
## 内容：

- 中文 
 - [环境依赖](#prerequisites)
 - [Loom Cocos SDK](#loom-cocos-sdk)
 - [打包并生成LoomJS SDK](#generate-loomjs-sdk)
 - [安装Loom](#install-loom)
 - [安装Cocos Creator](#install-cocos-creator)
 - [Creator Game 内集成调用](#integrate-to-creator-game)
 - [示例](#sample)
 - [说明](#notice)

## 环境依赖

1. Python 2.7
2. Git
3. [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm)
4. [Loom](https://loomx.io/), [安装步骤](https://loomx.io/developers/docs/en/prereqs.html)
5. [Cocos Creator](http://www.cocos.com/creator)
6. [Cocos Loom SDK 代码库](https://github.com/loomnetwork/cocos-sdk/)

## Loom Cocos SDK

Loom 全局结构

![](/developers/img/Loom-Cocos-SDK.png)

Loom Cocos SDK软件结构

![](/developers/img/loom-cocos-sdk-struct.png)

由图可见，`Loom-Cocos-SDK` 与`loom-js`使用相同的API, 相同的 protobuf 文件, 基本类似的合约写法。

`Loom Cocos SDK`是基于 [Loom-JS](https://github.com/loomnetwork/loom-js/)而移植到`Cocos Creator`上.

### 打包并生成 Loom Cocos SDK

- `git clone https://github.com/loomnetwork/cocos-sdk.git`
- `cd cocos-sdk`
- `git submodule update --init`，更新 git 子工程
- `./tools/genCocoSDK.py`

`./tools/genCocoSDK.py`会在工程根目录下生成的`loom-cocos-sdk`目录, 这就是 `Loom SDK for Cocos Creator`上的适配包

## 安装Loom

    wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-128/loom
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
    

运行区块链：

    # unable to start http server: listen tcp 127.0.0.1:9092: bind: address already in use
    pkill blueprint # kill server first
    ../../loom run
    

更多详情介绍请参见[Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html)。

## 安装Cocos Creator

![](http://www.cocos2d-x.org/s/images/creator_192.png)

Cocos Creator是以内容创作为核心的游戏开发工具，在Cocos2d-x基础上实现了彻底脚本化、组件化和数据驱动等特点。

Cocos Creator基于开源框架Cocos2d-x，实现了一体化、可扩展、可自定义工作流的编辑器，并在Cocos系列产品中第一次引入了组件化编程思想和数据驱动的架构设计。 通过JavaScript, 你可以短时间内编写组件脚本。 编辑器和引擎扩展也是用 JavaScript 构建的, 所以你就可以用一个编程语言来制作游戏和细化工具了。

这极大地简化了Cocos2d-x开发工作流中的场景编辑、UI设计、资源管理、游戏调试和预览、多平台发布等工作。 是使用Cocos2d-x进行团队协作开发的最佳选择。

you can download `Cocos Creator` from [here](http://www.cocos.com/creator) , and install.

## Integrate to Creator Game

1. copy the generated `Loom Cocos SDK` to your project's `asset/script` directory, and rename it to `loom`
2. write your own `proto` file as requirements of your game e.g. `sample/loomDemoForCreator` use [setscore.proto](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore.proto), and related [setscore_pb.js](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore_pb.js)
3. write yur own contract as requirements of your game, and serailezse your data with `setscore_pb.js`, and send to Loom Blockchain, take a look at [SimpleContract](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/SimpleContract.js)

![](/developers/img/script_loom_folder.png)

1. invoke api of your contract at suitable position.
2. Run

## Sample:

there have two `Sample` project: * `loomDemoForCreator` simplely use loom sdk * `dark-slash` use loom sdk in a real game

Test Steps

- update git submodule, run command `git submodule update --init`, if you have done this, skip this.
- generate and pack `Loom Cocos SDK`, run command `./tools/genCocoSDK.py`
- sync `Loom Cocos SDK` to `sample/loomDemoForCreator` and `sample/dark-slash`, run command `./tools/syncLoomJSToSample.py`
- entry directory `blueprint/build`, run `Loom Block Chain` services, run command `../../loom run`, if you have done this, skip this.
- open `sample/loomDemoForCreator` or `sample/dark-slash` with `Cocos Creator` and run

## Notice

- `Loom Block Chain` configuration, Contract's usage, take a look at [this](https://loomx.io/developers/docs/en/prereqs.html)
- Sample `dark-slash` come from `Cocos Creator` [Tutorial Project](https://github.com/cocos-creator/tutorial-dark-slash)