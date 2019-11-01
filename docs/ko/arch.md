---
id: arch
title: Architecture of a DAppChain
---

Loom SDK는 플러그인 형태의 블록체인 개발 키트 입니다. 컨센서스와 컨트랙트 레이어에서 모두 플러그인 가능합니다.

## 컨센서스

Loom SDK는 P2P 레이어 (BFT 시스템) 및 Loom 컨센서스 (DPoS), 이렇게 두 개의 컨센서스 레이어를 가집니다.

### P2P 레이어

Loom 백엔드는 Tendermint와 같은 다른 BPFT 엔진을 지원합니다. 향후에 PoA 체인을 위한 Raft도 지원할 것입니다.

### DPoS 레이어

Loom 컨센서스 레이어는 Loom DPoS 또는 체인별 설정이 가능한 PoS/DPoS 컨트랙트를 지원합니다. Casper가 사용 가능하게 되면, 이에 대한 지원도 추가할 것입니다.

![](/developers/img/loom-sdk-arch-overview.jpg)

## 스마트 컨트랙트

Go, 솔리디티 또는 GRPC를 지원하는 모든 언어로 작성된 스마트 컨트랙트를 허용합니다.

Smart contracts can be embedded into the chain, like DPoS, Coin or EthereumVM.

They can also be made as external processes, that the blockchain communicates to via GRPC.

![](/developers/img/loom-sdk-arch-contracts.jpg)

## 이더리움 통합

The SDK integrates into the Ethereum Backend with the following pieces:

### 전송 게이트웨이

![](/developers/img/loom-sdk-arch-plasma.jpg)

### Transfer gateway allows for the following:

* Transfering Assets to a DappChain
* Transfering Assets to Ethereum
* Mirroring(Pegging) Assets on a Dappchain
* ERC-20 Tokens
* ERC-721 Tokens
* Ether

### Plasma Cash Contract supports

* ERC-721 Tokens
* ERC-20 Tokens (July)
* Ether (July)

## 블록체인 서비스

SDK includes a number of high-level blockchain services:

* Signing / Auth / Nonce Middleware
* Built-in Coin
* Indexing
* Websockets and eventing
* Solidity + Ethereum Virtual Machine
* Support for game engines like Unity
* Transfer Gateway integration
* Plasma integration
* Cron (coming soon)
* Rate limiting (early phases)
* Hard fork Manager (coming July)