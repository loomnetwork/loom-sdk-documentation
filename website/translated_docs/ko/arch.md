---
id: arch
title: DAppChain 아키텍처
---
Loom SDK는 pluggable 블록체인 개발 키트 입니다. 컨센서스와 컨트랙트 레이어에서 모두 pluggable 합니다.

## 합의

Loom SDK는 두 개의 합의 레이어를 가집니다. 하나는 P2P 레이어에 있습니다.

Loom 백엔드는 Tendermint와 같은 다른 BPFT 엔진을 지원합니다. 향후에 PoA 체인을 위한 Raft도 지원할 것입니다.

Loom 합의 레이어는 Loom DPoS 또는 체인별 설정이 가능한 PoS/DPoS 컨트랙트를 지원합니다. Casper가 사용 가능하게 되면, 이에 대한 지원도 추가할 것입니다.

![](/developers/img/loom-sdk-arch-overview.jpg)

## 스마트 컨트랙트

Go, 솔리디티 또는 GRPC를 지원하는 모든 언어로 작성된 스마트 컨트랙트를 허용합니다.

스마트 컨트랙트는 DPoS, 코인 또는 EthereumVM과 같이 체인 내부에 포함될 수 있습니다.

외부 프로세스로 만드는 것 또한 가능하며, 이는 GRPC를 통해 블록체인과 통신합니다.

![](/developers/img/loom-sdk-arch-contracts.jpg)

## 이더리움 통합

SDK는 다음 부분들과 함께 이더리움 백엔드에 통합됩니다:

### 전송 게이트웨이

![](/developers/img/loom-sdk-arch-plasma.jpg)

### 전송 게이트웨이는 다음을 허용합니다:

* DappChain으로 자산 전송
* 이더리움으로 자산 전송
* DappChain에 있는 asset을 미러링(Pegging)
* ERC-20 토큰
* ERC-721 토큰
* Ether 

### 플라즈마 캐시 컨트랙트는 아래를 지원합니다

* ERC-721 토큰
* ERC-20 토큰 (7월)
* Ether (7월)

## 블록체인 서비스

SDK 수많은 고수준 블록체인 서비스를 포함하고 있습니다

* Signing / Auth / Nonce 미들웨어
* 내장 코인
* Indexing
* Websocket과 이벤트
* Solidity + Ethereum 가상머신
* Cocos, Unity와 Phaser 같은 게임 엔진 지원
* Transfer Gateway 통합
* 플라즈마 통합
* Cron (예정)
* Rate limiting (초기 단계)
* Hard fork Manager (6월중)