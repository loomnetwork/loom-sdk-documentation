---
id: arch
title: DAppChain架构
---
Loom SDK是一个可插入的Blockchain开发工具。可以在共识层和合约层插入。

## 共识

Loom SDK有两层共识，一个在P2P层。

Loom Backend支持不同的BPFT引擎，如Tendermint，未来我们还将为PoA链支持Raft。

Loom共识层支持Loom DPoS或是每条链的可配置PoS/DPoS合约。一旦Casper可以使用，我们将增加对此的支持。

![](/developers/img/loom-sdk-arch-overview.jpg)

## 智能合约

它将允许使用Go,Solidity或者任何支持GRPC的语言编写智能合约。

智能合约可以被编写入链中，如DPoS,Coin和EtherumVM.

它们也可以作为外部进程，即区块链通过GRPC进行通信。

![](/developers/img/loom-sdk-arch-contracts.jpg)

## 以太坊集成

SDK通过以下几部分集成到以太坊后端

### 转移网关

![](/developers/img/loom-sdk-arch-plasma.jpg)

### 转移官网允许实现以下功能：

* 把资产转移到Dapp链
* 把资产转移到以太坊
* 在Dapp链上镜像（追溯）资产
* ERC-20 代币
* ERC-721 代币
* 以太 

### Plama Cash合约支持：

* ERC-721 代币
* ERC-20 代币（7月）
* 以太（7月）

## 区块链服务

SDK包含了一些高层的区块链服务：

* 登录 / 授权 / Nonce 中间件
* 内建币
* 索引
* Websockets 和事件
* Solidity + 以太坊虚拟机
* 支持游戏引擎，如Cocos，Unity以及Phaser
* 转移网关集成
* Plasma集成
* Cron（即将到来）
* 限速（早起阶段）
* Hard fork Manager (coming July)