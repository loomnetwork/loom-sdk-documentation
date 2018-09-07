---
id: arch
title: DAppChain 아키텍처
---
Loom SDK는 pluggable 블록체인 개발 키트 입니다. 컨센서스와 컨트랙트 레이어에서 모두 pluggable 합니다.

## 컨센서스

Loom SDK는 두개의 컨센서스 레이어를 가집니다. 하나는 P2P 레이어입니다.

Loom 백엔드는 Tendermint같이 다른 BPFT 엔진을 지원합니다. 향후에 PoA 체인을 위한 Raft도 지원할 것입니다.

Loom 컨센서스 레이어는 체인마다 Loom DPoS 또는 설정가능한 PoS/DPoS 컨트랙트를 지원합니다. Casper가 사용가능하게 되면 우리는 이것에 대한 지원을 추가할 것입니다

![](/developers/img/loom-sdk-arch-overview.jpg)

## 스마트 컨트랙트

Go, Solidity 또는 GRPC를 지원하는 어떤 언어로 작성된 스마트 컨트랙트가 허용됩니다.

스마트 컨트랙트는 DPoS, 체인 또는 EthereumVM과 같이 체인내부에 포함될 수 있습니다.

외부 프로세스로 만드는 것도 가능하고, 이는 GRPC를 통해서 통신하게 됩니다.

![](/developers/img/loom-sdk-arch-contracts.jpg)

## Ethereum 통합

The SDK 다음 부분과 함께 Ethereum 백엔드로 통합됩니다:

### Transfer Gateway

![](/developers/img/loom-sdk-arch-plasma.jpg)

### Transfer gateway 다음을 허용합니다

* Asset을 DappChain에 보내기
* Assets을 Ethereum에 보내기
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