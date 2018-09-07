---
id: arch
title: DAppChain 아키텍처
---
Loom SDK는 pluggable 블록체인 개발 키트 입니다. 컨센서스와 컨트랙트 레이어에서 모두 pluggable 합니다.

## 컨센서스

Loom SDK는 두개의 컨센서스 레이어를 가집니다. 하나는 P2P 레이어입니다.

Loom 백엔드는 Tendermint같이 다른 BPFT 엔진을 지원합니다. 향후에 PoA 체인을 위한 Raft도 지원할 것입니다.

Loom Consensus layer support Loom DPoS or a configurable PoS/DPoS contract per Chain. Once Casper becomes available we will add support for this

![](/developers/img/loom-sdk-arch-overview.jpg)

## Smart contracts

It allows smart contracts written in Go, Solidity or any language supporting GRPC.

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
* Plasma integration
* Cron (coming soon)
* Rate limiting (early phases)
* Hard fork Manager (coming July)