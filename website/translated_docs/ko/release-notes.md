---
id: release-notes
title: 릴리즈 노트
sidebar_label: 릴리즈 노트
---
## 개요

릴리즈 노트는 역순으로 구성되어 있습니다.

## Loom 2.0 Release Build 789 - Feb 12th

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

## Loom 2.0 Initial Release Build 651 - Dec 14th

* Loom SDK 2.0
* Updated P2P Protocols
* Blockexplorer now supports EVM
* Loom Native token support for on chain Staking
* Support For delegation rewards in protocol
* Fixes for GetEvmBlockByNumber/Hash
* Range function Prefix fixes for Go Contracts
* HSM local key signing - [HSM Docs](hsm.html)
* Unity SDK Updated with better network management 

Note Loom SDK 2.0 is not protocol compatible with 1.0 chains. If you have a production chain using 1.0 please contact support@loomx.io for migration help.

## Release 575 - Nov 16th

* HSM Bug fixes for Yubico Devices - [HSM Docs](hsm.html)
* HSM now can create new private keys on demand

## Release 575 - Nov 13th

* HSM support for Yubico Devices - [HSM Docs](hsm.html)
* DPoS Version2 beta - for Plasmachain external validators
* Plasma cash massive improvements, see [Plasma Cli](https://github.com/loomnetwork/plasma-cli)
* Pruning for the Datastore, if chain gets to large, see [Config](loom-yaml.html)
* New EVM receipts data store, see [Config](loom-yaml.html)

## 릴리즈 478 - 10월 8일

* Transfer Gateway 활용 예제 업데이트
* Transfer Gateway [플라즈마 테스트넷 튜토리얼](extdev-transfer-gateway.html)

## 릴리즈 458 - 9월 27일

**모든 사용자에게 이 릴리즈로 업데이트하는 것을 추천합니다.**

* 개발자들을 위한 Plasmachain 테스트넷이 사용 가능합니다 - [Plasmachain 테스트넷 문서](testnet-plasma.html)
* 테스트넷을 위한 카르마 Faucet - [Faucet](http://faucet.dappchains.com)
* Loom SDK 카르마 컨트랙트(Sybil 저항) - [카르마](karma.html)
* 작업량이 많은 환경을 위한 대규모 성능 향상
* 검증자 노드 운영에 대한 초기 정보 - [검증자](validator.html)

## 릴리즈 404 - 8월 24일

** 기능

* TransferGateway의 ERC20 지원 업그레이드
* Gateway ERC20 예제 - [예제](https://github.com/loomnetwork/token-gateway-example)
* Loom SDK Doc 사이트 [한글화](https://loomx.io/developers/ko/)
* EVM이 이제 Payable 함수에 대해 제한적으로 지원합니다. 다음 주에 더 업데이트됩니다. 
* TransferGateway를 통한 ERC20/ETH 전송용 Loom-JS 업데이트 
* DPoS 컨트랙트로 Loom-JS 통합 
* [Plasma Debits](https://github.com/loomnetwork/plasma-cash/pull/115)에 대한 실험적 지원

** 주목해야 할 수정 사항

* QueryServerHost를 Deprecate 합니다. RPCServer로 모든 기능을 통합합니다.
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

* [EVM indexed filter](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 288 - July 17th

* [EVM indexed filter](https://loomx.io/developers/docs/en/web3js-event-filters.html)
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

## 릴리즈 129 - 5월 22일

* 이벤트를 위한 Websocket 지원
* Solidity 컨트랙트를 위한 indexing 레이어 업데이트
* Phaser 게임 데모 - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## 릴리즈 128 - 5월 21일

* Etherboy와 관련된 수많은 버그 수정

## 릴리즈 128 - 5월 19일

* Stable 베타 릴리즈
* 로깅이 기본적으로 여러 파일에 되도록 업데이트 
* 모든 RPC를 단일 인터페이스로 이동
* 외부 프로세스 인터페이스 업데이트