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

Smart contracts can be embedded into the chain, like DPoS, Coin or EthereumVM.

They can also be made as external processes, that the blockchain communicates to via GRPC.

![](/developers/img/loom-sdk-arch-contracts.jpg)

## Ethereum Integration

The SDK integrates into the Ethereum Backend with following pieces:

### Transfer Gateway

![](/developers/img/loom-sdk-arch-plasma.jpg)

### Transfer gateway allows for the following

* Transfering Assets to a DappChain
* Transfering Assets to Ethereum
* Mirroring(Pegging) Assets on a Dappchain
* ERC-20 Tokens
* ERC-721 Tokens
* Ether 

### Plama Cash Contract supports

* ERC-721 Tokens
* ERC-20 Tokens (July)
* Ether (July)

## Blockchain services

SDK includes a number of high level blockchain services

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