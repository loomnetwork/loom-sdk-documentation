---
id: release-notes
title: 릴리즈 노트
sidebar_label: 릴리즈 노트
---
## 개요

릴리즈 노트는 역순으로 구성되어 있습니다.

## 릴리즈 478 - 10월 8일

* Transfer Gateway 활용 예제 업데이트
* Transfer Gateway [플라즈마 테스트넷 튜토리얼](extdev-transfer-gateway.html)

## 릴리즈 458 - 9월 27일

**It is recommended that all users move up to this release**

* Plasmachain Testnets available for Devs - [Docs](testnet-plasma.html)
* Karma Faucet for Testnets - [Faucet](http://faucet.dappchains.com)
* Karma contracts (Sybil resistance) Loom SDK - [Karma](karma.html)
* Massive performance increasements for high load environments
* Initial info about running a Validator - [Validator](validator.html)

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
* 새로운 설정 옵션: RPCBindAddress: "tcp://0.0.0.0:46658"
* PBFT 엔진의 업그레이드. 이로 인해 업그레이드 시 호환성 문제가 발생할 수 있습니다. 스테이징 환경에서 시도하세요! 

## 릴리즈 375 - 8월 10일

*주의* 이것은 마이너 호환성 변경사항을 포함한 기능 테스트 릴리즈입니다, 여러분의 프로덕션 환경을 업그레이드 하기 앞서 임시 환경에서 확인을 부탁드립니다.

* EVM 컨트랙트의 이벤트와 관련된 수정
* [Transfer Gateway](transfer-gateway.html)의 베타 릴리즈
* [Transfer Gateway의 데모](https://github.com/loomnetwork/cards-gateway-example)
* 메모리 누수 수정
* 마이너 Api 충돌문제, go-loom/loom-js을 업그레이드 하세요. Unity는 곧 업데이트 예정입니다
* Go-loom은 API 충돌문제가 업그레이드 되었습니다
* loom-js는 이번 릴리즈로 업그레이드 되었습니다. 

## 릴리즈 330 - 7월 30일

* EVM 컨센서스 문제 수정 
* Zombiechain 테스트넷을 위한 업데이트
* 성능 측정을 위한 더 많은 원격 측정 기능 추가
* Go 컨트랙트를 위한 range query
* loom.yaml에 ChainID가 추가

* [EVM indexed 필터](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVM 필터 pool 수정 및 이벤트 시스템
* indexed 필터를 위한 Loom-JS EVM 업데이트
* 해시값으로 블록을 가져오기 위한 Loom-JS EVM 수정

## 릴리즈 288 - 7월 17일

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

## Release 129 - May 22rd

* Websocket support for eventing
* Updates to indexing layer for solidty contracts
* Phaser Game Dame - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## Release 128 - May 21th

* Lots of bug fixes for Etherboy

## Release 128 - May 19th

* Stable Beta Release
* Updating logging to default to multiple files 
* Moving all RPC to a single interface
* Updated External Process interface