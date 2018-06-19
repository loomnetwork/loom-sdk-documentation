---
id: arch
title: DAppチェーンのアーキテクチャ
---
Loom SDKはプラグ可能なブロックチェーン開発キットであり、コンセンサス及びコントラクトレイヤーでプラグ可能となっている。

## コンセンサス

Loom SDKには、２つのコンセンサスレイヤーがあり、その１つはP2Pレイヤーだ。

LoomのバックエンドはTendermintのような異なるPBFTエンジンをサポートしている。将来はPoAチェーンにRaftのサポートを予定している。

Loomのコンセンサスレイヤーは、Loom DPoSもしくはチェーンごとに設定可能なPoS/DPoSコントラクトをサポートしている。Casperが利用可能になれば、このサポートも追加していく。

![](/developers/img/loom-sdk-arch-overview.jpg)

## スマートコントラクト

It allows smart contracts written in Go, Solidity or any language supporting GRPC.

Smart contracts can be embedded into the chain, like DPoS, Coin or EthereumVM.

They can also be made as external processes, that the blockchain communicates to via GRPC.

![](/developers/img/loom-sdk-arch-contracts.jpg)

## イーサリアムとの統合

SDKは以下の部分でイーサリアムのバックエンドと統合している:

### トランスファーゲートウェイ

![](/developers/img/loom-sdk-arch-plasma.jpg)

### トランスファーゲートウェイで以下が可能

* DAppチェーンへのアセットの移転
* イーサリアムへのアセットの移転
* DAppチェーンへのアセットのミラーリング(ペギング)
* ERC-20トークン
* ERC-721トークン
* Ether 

### Plama Cashコントラクトがサポート

* ERC-721トークン
* ERC-20トークン(７月)
* Ether (７月)

## ブロックチェーンのサービス

SDKはたくさんのハイレベルなブロックチェーンサービスを含んでいる。

* 署名 / 認証 / ノンスミドルウェア
* ビルトインコイン
* インデックス
* Websocketsとイベント
* Solidity + イーサリアム仮想マシン
* CocosやUnity、Phaserといったゲームエンジンのサポート
* トランスファーゲートウェイの統合
* Plasmaの統合 (６月下旬)
* Cron (じきにサポート)
* レートの制限 (初期フェーズ)
* ハードフォークマネージャー(７月)