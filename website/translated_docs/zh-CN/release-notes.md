---
id: release-notes
title: 发布日志
sidebar_label: 发布日志
---
## 概述

发布日志（最新的在顶部）

## 第478次更新 - 10月8日

* 更新了转移网关实用程序
* Plasma测试网的[转移网关教程](extdev-transfer-gateway.html)

## 第458次更新 - 9月27日

**建议所有用户升级到此版本**

* 开发人员现已可用公共Plasmachain测试网 - [文档](testnet-plasma.html)
* 测试网的Karma Faucet - [Faucet](http://faucet.dappchains.com)
* Karma合约（Sybil抵抗）Loom SDK - [Karma](karma.html)
* 高负载环境下的大量性能提升
* 运行验证者的初始信息 - [验证者](validator.html)

## 第404次更新 - 8月24日

** 功能

* 在转移网关中升级 ERC20 支持
* 网关中的 ERC20 示例 - [示例](https://github.com/loomnetwork/token-gateway-example)
* Loom SDK 文档网站 [ 韩文版 ](https://loomx.io/developers/ko/)
* EVM 目前对 Payable 功能的支持有限，下周会有更多支持 
* 使用转移网关转移 ERC20 / ETH 的 Loom-JS 更新 
* Loom-JS 与 DPoS 合约的集成 
* [Plasma Debits](https://github.com/loomnetwork/plasma-cash/pull/115) 的实验支持

** 重大变化

* 弃用 QueryServerHost，并将所有功能合并到 RPCServer
* 新配置选项： RPCBindAddress: "tcp://0.0.0.0:46658"
* 升级 PBFT 引擎，这可能会导致升级时出现不兼容问题，请在测试环境中尝试 

## 第375次更新 - 8月10日

*注意* 这是一个功能测试版本，有兼容性的小更改，升级你的生产环境之前请在测试环境中进行验证。

* 修复EVM合约的事件
* [转移网关](transfer-gateway.html) 的Beta版本
* [转移网关演示](https://github.com/loomnetwork/cards-gateway-example)
* 内存泄漏修复
* Api 的些许不兼容，请升级 go-loom / loom-js。 Unity 即将推出更新
* Go-loom 已针对 api 不兼容升级
* loom-js 已针对此版本升级 

## 第303次更新 - 7月30日

* 修复了 EVM 的共识问题 
* 更新了僵尸链测试网
* 增加了更多遥测来衡量性能
* Go合约的范围查询
* 为 loom.yaml 添加了 ChainID

* [EVM 索引过滤器](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVM 过滤器池修复和事件系统
* 升级了 Loom-JS EVM 索引过滤器
* 修复了 Loom-JS EVM 通过哈希获取块的方法

## 第288次更新 - 7月17日

* [EVM 索引过滤器](https://loomx.io/developers/docs/en/web3js-event-filters.html)
* EVM过滤器池修复和事件系统
* 升级了 Loom-JS EVM 索引过滤器
* 修复了 Loom-JS EVM 通过哈希获取块的方法

## 第276次更新-7月13日

* [新区块浏览器](block-explorer-tutorial.html)
* 多节点 EVM 修复 
* Loom-JS 对 Plasma cash 更新
* 僵尸链测试网修复
* DPoS 更新

## Release 209 - June 20th

Major release

* Plasma Cash initial integration - Demos coming next week
* Multinode fixes and performance increases
* Ansible updates for multinode
* Querying / Filtering on EVM supports more types 
* Unity SDK updates for EVM 
* Loom-JS updates for EVM

## Release 186 - June 19th

* [EVM Unity Example app](https://loomx.io/developers/docs/en/unity-sample-tiles-chain-evm.html)
* Unity SDK support for Solidity Apps
* Many fixes for Filtering/Querying Ethereum Events

## Release 163 - June 11th

* Support for latest Build of Truffle
* [Updated truffle example](https://github.com/loomnetwork/loom-truffle-provider)
* Initial Implementation of Sybil resistance framework
* Websocket events now support topics 
* Loom-JS 1.8.0 Release with updated websocket topic support

## Release 161 - June 7th

* Tons of Truffle Fixes
* Tons of web3.js fixes for Loom-Js provider

## Release 155 - June 6th

* [Cocos SDK is Live](cocos-sdk-quickstart.html)
* [Truffle Support available](truffle-deploy.html)
* Static calls to EVM now allow caller
* EVM Fixes for a lot of scenarios 

## Release 143 - June 1st

* [BluePrint Docker Images Available](docker-blueprint.html)
* [Japanese Hackathon Results](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [Docker Images for some of Loom SDK Projects](https://hub.docker.com/r/loomnetwork/)
* Evm TX Reciepts fixes 

## Release 137 - May 30th

* Go Clients can Access EVM Contracts
* Numerous bug fixes for EVM
* [Social Network Example App - Solidity](simple-social-network-example.html)

## Release 136 - May 28th

* Initial Solidity Alpha test build, you can now deploy solidity contracts
* Websocket eventing support for solidity 
* [Example Project for solidity Events](phaser-sdk-demo-web3-websocket.html)
* [Multinode deployment guide](multi-node-deployment.html)

## Release 133 - May 24th

* [Etherboy Demo released](https://loomx.io/developers/docs/en/etherboy-game.html)
* [Japanese Docs released](https://loomx.io/developers/ja)
* Updated Homepage for [docs site](https://loomx.io/developers/en/) 

## Release 132 - May 23rd

* Websocket performance fixes
* New Websocket Demo App - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain) 

## Release 129 - May 22rd

* Websocket support for eventing
* Updates to indexing layer for solidty contracts
* Phaser Game Dame - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## Release 128 - May 21th

* Lots of bug fixes for Etherboy

## Release 128 - May 19th

* Stable Beta Release
* Updating logging to default to multiple files 
* Moving all RPC to a single interface
* Updated External Process interface