---
id: 릴리즈 노트
title: 릴리즈 노트
sidebar_label: 릴리즈 노트
---

## 개요

릴리즈 노트는 역순으로 구성되어 있습니다.

## Loom 2.0 릴리즈 빌드 1085 - 5월 31일

We have been focusing on mainnet builds so this has a large backlog of features for third party chains.

Major update, major updates for Performance, Caching and DPoS. It is recommended to upgrade your testnets immediately.

* DposV3 live to see features - [DPosV3 Medium Post](https://medium.com/loom-network/plasmachain-upgrade-whats-new-in-dpos-v3-66798adda108)
* New EVM Database store - To enable Set Appstore to Version: 3
* Core database performance updates
* New configs for Leveldb, `DBBackendConfig -> CacheSizeMegs` see our [config page](loom-yaml.html) for details
* Universal transaction signing, Eth, Tron, more details - [Universal signing medium](https://medium.com/loom-network/universal-transaction-signing-seamless-layer-2-dapp-scaling-for-ethereum-b63a733fc65c)
* More Web3 Json RPC Comptability, Blockexplorers such as Blockscout can index Loom
* Feature Flags, ability to enable disable chain features with soft or hard forks. Light form of governance
* More Metrics around Leveldb
* Windows native build support - `make loom-windows`
* CachingStore updates see our - [config page](loom-yaml.html) for details

## Loom 2.0 릴리즈 빌드 789 - 2월 12일

Major update, major updates for Performance, Caching and DPoS. It is recommended to upgrade your testnets immediately.

* DPosV2 now supports Delegates staking and full reward cycle
* Nonce incrementing mid block, loom-js and unity-sdk updated to support
* Work has started on DPoSV3 to have shorter reward cycles and other improvements
* Karma updates
* CheckTx preformance boosts
* Updated P2P protocol 
* Go contracts now support event indexing - [Go Events Docs](go-events.html)
* EVM Queries has improved caching layer
* Bug for EVM contracts writting more then 11,800 keys is fixed
* Support for non ETH block chains via TG has started
* More metrics exposed
* YubiHSM Fixes
* Many new config options - [Loom Yaml Configs](loom-yaml.html)

## Loom 2.0 초기 릴리즈 빌드 651 - 12월 14일

* Loom SDK 2.0
* P2P 프로토콜 업데이트
* Blockexplorer는 현재 EVM을 지원합니다
* Loom 네이티브 토큰은 온체인 스테이킹을 지원합니다
* 프로토콜에서 위임 보상을 지원
* GetEvmBlockByNumber/Hash 버그픽스
* Go 컨트랙트의 Range function Prefix 버그픽스
* HSM 로컬 키 서명 - [HSM 문서](hsm.html)
* 향상된 네트워크 관리를 포함한 Unity SDK 업데이트 

Note Loom SDK 2.0 is not protocol compatible with 1.0 chains. If you have a production chain using 1.0 please contact support@loomx.io for migration help.

## 릴리즈 575 - 11월 16일

* Yubico 디바이스를 위한 HSM 버그 픽스 - [HSM 문서](hsm.html)
* HSM은 현재 요청시 새로운 개인키를 발급할 수 있습니다

## 릴리즈 575 - 11월 13일

* HSM support for Yubico Devices - [HSM Docs](hsm.html)
* DPoS Version2 beta - for Plasmachain external validators
* Plasma cash massive improvements, see [Plasma Cli](https://github.com/loomnetwork/plasma-cli)
* Pruning for the Datastore, if chain gets to large, see [Config](loom-yaml.html)
* New EVM receipts data store, see [Config](loom-yaml.html)

## Release 478 - Oct 8th

* Updated Transfer Gateway utilities
* Transfer Gateway [tutorial plasma testnet](extdev-transfer-gateway.html)

## Release 458 - Sept 27th

**It is recommended that all users move up to this release**

* Plasmachain Testnets available for Devs - [Docs](testnet-plasma.html)
* Karma Faucet for Testnets - [Faucet](http://faucet.dappchains.com)
* Karma contracts (Sybil resistance) Loom SDK - [Karma](karma.html)
* Massive performance increasements for high load environments
* Initial info about running a Validator - [Validator](validator.html)

## Release 404 - Aug 24th

** Features

* ERC20 support upgraded in TransferGateway
* Example ERC20 in Gateway - [Example](https://github.com/loomnetwork/token-gateway-example)
* Loom SDK Doc site in [Korean](https://loomx.io/developers/ko/)
* EVM now has limited support for Payable functions, more coming next week 
* Loom-JS updates for ERC20/ETH transfers with TransferGateway. 
* Loom-JS integration to DPoS contracts 
* Experimental Support for [Plasma Debits](https://github.com/loomnetwork/plasma-cash/pull/115)

** Breaking changes

* Deprecrating QueryServerHost, and consolidating all functions to the RPCServer.
* New Config option: RPCBindAddress: "tcp://0.0.0.0:46658"
* Upgrades of PBFT engine, this may cause incompatibility issues on upgrades, please try in staging environments 

## Release 375 - Aug 10th

*NOTE* This is a feature test release, with minor compatibility changes, please verify in staging environements before upgrading your production environment.

* Fixes for Eventing on EVM Contracts
* Beta release of the [Transfer Gateway](transfer-gateway.html)
* [Demo of Transfer Gateway](https://github.com/loomnetwork/cards-gateway-example)
* Memory leak fixes
* Minor api breakages, please upgrade go-loom/loom-js. Unity updates coming soon
* Go-loom is upgraded for api breakages
* loom-js is upgraded for this release. 

## Release 330 - July 30th

* Fix for consensus problems on EVM 
* Updates for Zombiechain TestNet
* Added more telemetry to measure performance
* Range queries on Go Contracts
* Added ChainID to loom.yaml

* [EVM indexed filter](https://loomx.io/developers/en/web3js-event-filters.html)

* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 288 - July 17th

* [EVM indexed filter](https://loomx.io/developers/en/web3js-event-filters.html)
* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 276 - July 13th

* [New Block Explorer](block-explorer-tutorial.html)
* Multinode EVM fixes 
* Loom-JS updates for Plasma cash
* Zombiechain testnet fixes
* DPoS Updates

## Release 209 - June 20th

Major release

* Plasma Cash initial integration - Demos coming next week
* Multinode fixes and performance increases
* Ansible updates for multinode
* Querying / Filtering on EVM supports more types 
* Unity SDK updates for EVM 
* Loom-JS updates for EVM

## Release 186 - June 19th

* [EVM Unity Example app](https://loomx.io/developers/en/unity-sample-tiles-chain-evm.html)
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

## 릴리즈 155 - 6월 6일

* [Cocos SDK is Live](cocos-sdk-quickstart.html)
* [Truffle Support available](truffle-deploy.html)
* Static calls to EVM now allow caller
* EVM Fixes for a lot of scenarios 

## 릴리즈 143 - 6월 1일

* [BluePrint 도커 이미지 사용이 가능합니다](docker-blueprint.html)
* [일본 해커톤 결과](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [몇 가지 Loom SDK 프로젝트를 위한 도커 이미지](https://hub.docker.com/r/loomnetwork/)
* Evm TX Reciepts 수정 

## 릴리즈 137 - 5월 30일

* Go Client가 EVM 컨트랙트에 접근 가능합니다
* EVM을 위한 수많은 버그 수정
* [소셜 네트워크 예제 앱 - 솔리디티](simple-social-network-example.html)

## 릴리즈 136 - 5월 28일

* 초기 솔리디티 알파 테스트 빌드, 이제 솔리디티 컨트랙트를 배포할 수 있습니다
* 솔리디티를 위한 Websocket 이벤트 지원 
* [솔리디티 이벤트 관련 예제 프로젝트](phaser-sdk-demo-web3-websocket.html)
* [멀티노드 배포 가이드](multi-node-deployment.html)

## 릴리즈 133 - 5월 24일

* [Etherboy 데모 릴리즈](https://loomx.io/developers/en/etherboy-game.html)
* [일본어 문서 릴리즈](https://loomx.io/developers/ja)
* [문서 사이트](https://loomx.io/developers/ko/)를 위한 홈페이지 업데이트 

## 릴리즈 132 - 5월 23일

* Websocket 성능 개선
* 새로운 Websocket 데모 앱 - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain) 

## 릴리즈 129 - 5월 22일

* 이벤트를 위한 Websocket 지원
* 솔리디티 컨트랙트를 위한 인덱싱 레이어 업데이트
* Phaser 게임 데모 - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## 릴리즈 128 - 5월 21일

* Etherboy와 관련된 수많은 버그 수정

## 릴리즈 128 - 5월 19일

* Stable 베타 릴리즈
* 로깅이 기본적으로 여러 파일에 되도록 업데이트 
* 모든 RPC를 단일 인터페이스로 이동
* 외부 프로세스 인터페이스 업데이트