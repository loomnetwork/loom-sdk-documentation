---
id: release-notes
title: リリースノート
sidebar_label: リリースノート
---
## 概要

新着順。

## リリース 404 - 8月24日

** 機能

* TransferGatewayのERC20サポートをアップグレード
* ゲートウェイのERC20サンプル - [サンプル](https://github.com/loomnetwork/cards-gateway-example)
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

* [新たなBlock Explorer](block-explorer-tutorial.html)
* マルチノードEVMを修正 
* Plasma Cash向けにLoom-JSをアップデート
* ZombieChainテストネットの修正
* DPoSのアップデート

## リリース 209 - 6月28日

メジャーリリース

* Plasma Cash 初期インテグレーション - 次週デモを発表
* マルチノード修正、パフォーマンス向上 
* マルチノード向けのAnsible更新
* EVM上のクエリ/フィルタがより多くの型をサポート 
* EVM向けのUnity SDK更新 
* EVM向けのLoom-JS更新

## リリース 186 - 6月19日

* [EVM Unityサンプルアプリ](https://loomx.io/developers/docs/en/unity-sample-tiles-chain-evm.html)
* Unity SDKのSolidityアプリ向けサポート
* イーサリアム・イベントのフィルター/クエリ機能を大幅に修正

## リリース 163 - 6月11日

* Truffleの最新ビルドをサポート
* [Truffleサンプルをアップデート](https://github.com/loomnetwork/loom-truffle-provider)
* シビル攻撃耐性フレームワークの初期実装
* Websocketイベントのトピックサポート 
* Loom-JS 1.8.0リリースで、websocketトピックをサポートするようアップデート

## リリース 161 - 6月7日

* Truffleサポートを修正
* Loom-Jsプロバイダのためのweb3.jsを修正

## リリース 155 - 6月6日

* [Cocos SDKをリリース](cocos-sdk-quickstart.html)
* [Truffleのサポートが利用可能に](truffle-deploy.html)
* EVMへの静的コールで呼び出し元を許可
* 多くのシナリオ用のEVMを修正 

## リリース 143 - 6月1日

* [BluePrint Dockerイメージが利用可能](docker-blueprint.html)
* [東京ハッカソンのレポート](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [Loom SDKプロジェクト用のDockerイメージ](https://hub.docker.com/r/loomnetwork/)
* Evmトランザクションレシートの修正 

## リリース 137 - 5月30日

* GoクライアントがEVMコントラクトへアクセス可能に
* EVMのバグを多数修正
* [ソーシャルネットワークのサンプルアプリ- Solidity](simple-social-network-example.html)

## リリース 136 - 5月28日

* 初期Solidityアルファ版テストビルド。Solidityコントラクトがデプロイ可能に。
* Splidityでのイベントサポート 
* [Solidityイベントのサンプルプロジェクト](phaser-sdk-demo-web3-websocket.html)
* [マルチノードデプロイメントガイド](multi-node-deployment.html)

## リリース 133 - 5月24日

* [Etherboyのデモをリリース](https://loomx.io/developers/docs/en/etherboy-game.html)
* [日本語ドキュメンテーションをリリース](https://loomx.io/developers/ja)
* [ドキュメンテーションサイト](https://loomx.io/developers/en/)をアップデート 

## リリース 132 - 5月23日

* Websocketのパフォーマンスを修正
* 新しいWebsocketのデモアプリ - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain) 

## リリース 129 - 5月22日

* イベントでのWebsocketサポート
* Solidityコントラクト用インデックスレイヤーをアップデート 
* Phaserゲームデモ - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## リリース 128 - 5月21日

* Etherboyのバグを修正

## リリース 128 - 5月19日

* 安定したベータ版をリリース
* ロギングをデフォルトで複数ファイルでできるようアップデート 
* 全RPCを一つのインターフェースへ移動
* 外部プロセスインターフェースのアップデート