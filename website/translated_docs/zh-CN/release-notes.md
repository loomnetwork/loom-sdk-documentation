---
id: release-notes
title: 发布日志
sidebar_label: 发布日志
---
## 概述

发布日志（最新的在顶部）

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

* [EVM索引过滤器](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVM过滤器池修复和事件系统
* 针对索引过滤器的 Loom-JS EVM 更新
* 修复了 Loom-JS EVM 通过哈希获取块的方法

## 第288次更新 - 7月17日

* [EVM 索引过滤器](https://loomx.io/developers/docs/en/web3js-event-filters.html)
* EVM 过滤器池修复和事件系统
* 升级了 Loom-JS EVM 索引过滤器
* 修复了 Loom-JS EVM 通过哈希获取块的方法

## 第276次更新 - 7月13日

* [新区块浏览器](block-explorer-tutorial.html)
* 多节点 EVM 修复 
* Loom-JS 对 Plasma cash 更新
* 僵尸链测试网修复
* DPoS 更新

## 209版发布 - 6月20日

主要发布

* Plasma Cash初始整合 - 下周即将推出演示
* 多节点修复和性能提高
* 多节点的 Ansible 更新
* EVM上的查询/过滤支持更多类型 
* 针对 EVM 的 SDK 更新 
* 针对 EVM 的 Loom-JS 更新

## 186版发布 - 6月19日

* [EVM Unity 示例应用程序](https://loomx.io/developers/docs/en/unity-sample-tiles-chain-evm.html)
* 对 Solidity 应用的 Unity SDK 支持
* 对过滤/查询以太坊事件的诸多修复

## 第163次更新 - 6月11日

* 对 Truffle 最新构建的支持
* [更新的 Truffle 示例](https://github.com/loomnetwork/loom-truffle-provider)
* Sybil 抵抗框架的初步实现
* Websocket 事件现支持主题 
* Loom-JS 1.8.0版本，带有更新的 websocket 主题支持

## 第161次更新 - 6月7日

* 大量 Truffle 修复
* 对 Loom-Js provider 的大量 web3.js 修复

## 第155次更新 - 6月6日

* [Cocos SDK 上线](cocos-sdk-quickstart.html)
* [提供 Truffle 支持](truffle-deploy.html)
* 现允许调用者静态调用EVM
* 对很多场景的 EVM 修复 

## 第143次更新 - 6月1日

* [BluePrint Docker 图像可用](docker-blueprint.html)
* [日本黑客松成果](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [一些 Loom SDK 项目的 Docker 图像](https://hub.docker.com/r/loomnetwork/)
* Evm TX Reciepts 修复 

## 第137次更新 - 5月30日

* Go 客户端可以访问 EVM 合约
* 对 EVM 的大量 bug 修复
* [社交网络示例应用程序 - Solidity](simple-social-network-example.html)

## 第136次更新 - 5月28日

* 初始 Solidity Alpha 测试构建，你现在可以部署 Solidity 合约
* 对 Solidity 的 Websocket 事件支持 
* [对 Solidity 事件的示例项目](phaser-sdk-demo-web3-websocket.html)
* [多节点部署指南](multi-node-deployment.html)

## 第133次更新 - 5月24日

* [Etherboy 演示发布](https://loomx.io/developers/docs/en/etherboy-game.html)
* [日语版文档发布](https://loomx.io/developers/ja)
* 更新了 [文档网站](https://loomx.io/developers/en/) 的主页 

## 第132次更新 - 5月23日

* Websocket 性能修复
* 新的 Websocket 演示应用程序 - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain) 

## 第129次更新 - 5月22日

* 对事件的 Websocket 支持
* 对 Solidty 合约的索引层更新
* Phaser Game Dame - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## 第128次更新 - 5月21日

* 对 Etherboy 的大量 bug 修复

## 第128次更新 - 5月19日

* 稳定版 Beta 发布
* Updating logging to default to multiple files 
* Moving all RPC to a single interface
* Updated External Process interface