---
id: cocos-sdk-quickstart
title: Cocos Creator用Loom SDK
sidebar_label: Cocos SDKクイックスタート
---
## コンテンツ:

- 日本語 
 - [前提条件](#prerequisites)
 - [Loom Cocos SDK](#loom-cocos-sdk)
 - [LoomJS SDKの生成](#generate-loomjs-sdk)
 - [Loomのインストール](#install-loom)
 - [Cocos Creatorのインストール](#install-cocos-creator)
 - [Creator Gameとの統合](#integrate-to-creator-game)
 - [サンプル](#sample)
 - [注意点](#notice)

## 前提条件

1. Python 2.7
2. Git
3. [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm)
4. [Loom](https://loomx.io/), [インストールの手順](https://loomx.io/developers/docs/en/prereqs.html)
5. [Cocos Creator](http://www.cocos.com/creator)
6. [Cocos Loom SDK リポジトリ](https://github.com/loomnetwork/cocos-sdk/)

## Loom Cocos SDK

Loomグローバル構成ダイアグラム

![](/developers/img/Loom-Cocos-SDK.png)

Loom Cocos SDK構成ダイアグラム

![](/developers/img/loom-cocos-sdk-struct.png)

`Loom-Cocos-SDK`には、`loom-js`と同一のAPIとprotobuf、さらに同様のコントラクトがある。

`Loom Cocos SDK`は[Loom-JS](https://github.com/loomnetwork/loom-js/)をベースとしていて、これを`Cocos Creator`にプロットしている。

### LoomJS SDKの生成

- `git clone https://github.com/loomnetwork/cocos-sdk.git`
- `cd cocos-sdk`
- `git submodule update --init`　gitのサブモジュールを更新
- `./tools/genCocoSDK.py`

`Loom SDK for Cocos Creator`は、コマンド`./tools/genCocoSDK.py`によって生成されたディレクトリ`loom-cocos-sdk`内にある。

## Loomをインストール

    wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-128/loom
    chmod +x loom
    
    mkdir tmpgopath
    export GOPATH=`pwd`/tmpgopath
    ./loom spin weave-blueprint
    cd blueprint
    export GOPATH=$GOPATH:`pwd`
    make deps
    make
    cd build
    
    ../../loom init
    cp ../genesis.example.json genesis.json
    

ブロックチェーンの起動:

    # httpサーバーを起動不可にする: listen tcp 127.0.0.1:9092: bind: address already in use
    pkill blueprint  # まずサーバーをkillする
    ../../loom run
    

自分のDAppチェーン起動についてのさらなる説明は、[Loom SDKドキュメンテーション](https://loomx.io/developers/docs/en/prereqs.html)を参照すること。

## Cocos Creatorのインストール

![](http://www.cocos2d-x.org/s/images/creator_192.png)

Cocos Creatorはゲーム開発ツール及びワークフローの完全パッケージで、(Cocos2d-xがベースの)ゲームエンジン、リソース管理、シーン編集、ゲームプレビュー、デバッグが含まれている。また１つのプロジェクトを複数プラットフォームに公開する。

我々は初めて、エンティティコンポーネントの構造とデータドリブンなワークフローをCocos2d-xファミリーに導入した。 JavaScriptを使って、あなたのコンポーネントをすぐにスクリプティングすることが可能だ。 そのエディタ及びエンジン拡張機能も同じくJavaScriptで作成されているので、１つのプログラミング言語でゲームの作成とツールの改良を行うことができる。

Cocos Creatorは、UIシステムやアニメーションエディタといった革新的で使いやすいツールセットを提供する。 オープンなエディタ拡張システムのおかげで、このツールセットは常にそして迅速に拡大し続ける。

`Cocos Creator`は[ここ](http://www.cocos.com/creator)からダウンロードしてインストールできる。

## Creator Gameとの統合

1. 生成された`Loom Cocos SDK`を、あなたのプロジェクトの`asset/script`ディレクトリにコピーしよう。そして名前を`loom`に変更しよう。
2. あなたのゲームの要件として、独自の`proto`ファイルを書こう。 例として`sample/loomDemoForCreator`は[setscore.proto](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore.proto)と関連する [setscore_pb.js](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore_pb.js)を使用している。
3. あなたのゲームの要件として独自のコントラクトを書こう。そしてデータを`setscore_pb.js`を使ってデータをシリアライズし、Loomブロックチェーンに送信しよう。[SimpleContract](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/SimpleContract.js)を参照すること。

![](/developers/img/script_loom_folder.png)

1. 適切な場所であなたのコントラクトのAPIを呼び出す。
2. 実行する。

## サンプル:

there have two `Sample` project: * `loomDemoForCreator` simplely use loom sdk * `dark-slash` use loom sdk in a real game

Test Steps

- update git submodule, run command `git submodule update --init`, if you have done this, skip this.
- generate and pack `Loom Cocos SDK`, run command `./tools/genCocoSDK.py`
- sync `Loom Cocos SDK` to `sample/loomDemoForCreator` and `sample/dark-slash`, run command `./tools/syncLoomJSToSample.py`
- entry directory `blueprint/build`, run `Loom Block Chain` services, run command `../../loom run`, if you have done this, skip this.
- open `sample/loomDemoForCreator` or `sample/dark-slash` with `Cocos Creator` and run

## Notice

- `Loom Block Chain` configuration, Contract's usage, take a look at [this](https://loomx.io/developers/docs/en/prereqs.html)
- Sample `dark-slash` come from `Cocos Creator` [Tutorial Project](https://github.com/cocos-creator/tutorial-dark-slash)