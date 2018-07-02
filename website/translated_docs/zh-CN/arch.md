---
id: arch
title: DAppChain架构
---
Loom SDK是一个可插入的Blockchain开发工具。可以在共识层和合同层插入。

## Consensus

Loom SDK有两层共识，一个在P2P层。

Loom Backend支持不同的BPFT引擎，如Tendermint，未来我们还将为PoA链支持Raft。

Loom共识层支持Loom DPoS或是每条链的可配置PoS/DPoS合约。一旦Casper可以使用，我们将增加对此的支持。

![](/developers/img/loom-sdk-arch-overview.jpg)

## 智能合约

它将允许使用Go,Solidity或者任何支持GRPC的语言编写智能合约。

智能合约可以被编写入链中，如DPoS,Coin和EtherumVM.

它们也可以作为外部过程，即区块链通过GRPC进行通信。

![](/developers/img/loom-sdk-arch-contracts.jpg)

## 以太坊整合

SDK集成到以太坊后端，其中有一下几部分：

### 传输网关

![](/developers/img/loom-sdk-arch-plasma.jpg)

### 传输官网允许实现一下功能：

* 把资产转移到Dapp链
* 把资产转移到以太坊
* Dapp链上镜像（钉住）资产
* ERC-20 Tokens
* ERC-721 Tokens
* 以太 

### Plama Cash合约支持如下：

* ERC-721 Tokens
* ERC-20 Tokens（7月）
* 以太（7月）

## 区块链服务

SDK包含了一些高水平的区块链服务，如下：

* Signing / Auth / Nonce Middleware
* Builtin Coin
* Indexing
* Websockets and eventing
* Solidity + Ethereum Virtual Machine
* Support for game engines like Cocos, Unity, and Phaser
* Transfer Gateway integration
* Plasma integration (coming late June)
* Cron (coming soon)
* Rate limiting (early phases)
* Hard fork Manager (coming July)