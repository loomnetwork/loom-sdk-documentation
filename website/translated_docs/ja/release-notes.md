---
id: release-notes
title: リリースノート
sidebar_label: リリースノート
---
## 概要

新着順。

## リリース 478 - 10月8日

* トランスファーゲートウェイのユーティリティ更新
* トランスファーゲートウェイ [plasmaテストネットチュートリアル](extdev-transfer-gateway.html)

## リリース 458 - 9月27日

**全ユーザーにこのリリースを削除することをお勧めする。**

* Plasmachainテストネットが開発者向けに利用可能 - [Docs](testnet-plasma.html)
* テストネット用Karma Faucet - [Faucet](http://faucet.dappchains.com)
* Karmaコントラクト (シビル耐性) Loom SDK - [Karma](karma.html)
* 高負荷環境での大幅なパフォーマンスの向上
* バリデーター運営についてのイニシャル情報 - [Validator](validator.html)

## リリース 404 - 8月24日

** 機能

* TransferGatewayのERC20サポートをアップグレード
* ゲートウェイのERC20サンプル - [サンプル](https://github.com/loomnetwork/token-gateway-example)
* Loom SDK [韓国語](https://loomx.io/developers/ko/)ドキュメンテーションサイト
* 現在EVMはPayable関数を限定サポート。さらなるサポートは来週登場。 
* TransferGatewayを使用したERC20/ETHトランスファー向けに、Loom-JSをアップデート 
* DPoSコントラクトへLoom-JSを統合 
* [Plasma Debits](https://github.com/loomnetwork/plasma-cash/pull/115)の実験的サポート

** 互換性を崩す変更

* QueryServerHostを廃止し、全関数をRPCサーバーへとコンソリデート。
* 新たなConfigオプション: RPCBindAddress: "tcp://0.0.0.0:46658"
* PBFTエンジンのアップグレード。アップグレードで非互換性の問題が起こる可能性があるため、ステージング環境にて試すこと。 

## リリース 375 - 8月10日

*注意* これは機能テストのためのリリースで、マイナーな互換性の変更を伴っている。運用環境をアップグレードする前に、ステージング環境にて検証を行うこと。

* EVMコントラクトのイベント処理の修正
* [トランスファゲートウェイ](transfer-gateway.html)のベータ版リリース
* [トランスファーゲートウェイのデモ](https://github.com/loomnetwork/cards-gateway-example)
* メモリーリークの修正
* APIの破損がわずかにあるので、go-loom/loom-jsのアップグレードが必要。Unityのアップグレードももうすぐリリース。
* API破損のため、Go-loomをアップデート
* このリリースのためにloom-jsをアップグレード 

## リリース 330 -7月30日

* EVMでのコンセンサスの問題を修正 
* Zombieチェーンテストネットを更新
* パフォーマンス測定のためテレメトリをさらに追加
* Goコントラクトの範囲クエリ
* loom.yamlにChainIDを追加

* [EVMインデックスフィルター](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVMフィルタープールの修正とイベントシステム
* インデックスフィルタ向けにLoom-JS EVMをアップデート
* ハッシュでブロックを取得できるよう、Loom-JS EVMを修正

## リリース 288 -7月17日

* [EVMインデックスフィルター](https://loomx.io/developers/docs/en/web3js-event-filters.html)
* EVMフィルタープールの修正とイベントシステム
* インデックスフィルタ向けにLoom-JS EVMをアップデート
* ハッシュでブロックを取得できるよう、Loom-JS EVMを修正

## リリース 276 -7月13日

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