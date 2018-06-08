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

２つの`Sample`プロジェクトがある: * `loomDemoForCreator`はLoom SDKをシンプルに使用している。 * `dark-slash`はLoom SDKを実際のゲームにて使用している。

テストの手順

- コマンド`git submodule update --init`を実行し、gitのサブモジュールを更新しよう。もしすでに終わっていればこの手順はスキップしよう。
- `Loom Cocos SDK`を生成し圧縮しよう。コマンド`./tools/genCocoSDK.py`を実行しよう。
- `Loom Cocos SDK`を、`sample/loomDemoForCreator`及び`sample/dark-slash`と同期させて、コマンド`./tools/syncLoomJSToSample.py`を実行しよう。
- ディレクトリ`blueprint/build`へ入り、`Loom Block Chain`サービスを実行する。コマンド`../../loom run`を実行しよう。もしすでに終わっていれば、この手順はスキップしよう。
- `Cocos Creator`を使って`sample/loomDemoForCreator`または`sample/dark-slash`を開き、実行しよう。

## 注意点

- `Loom Block Chain`の設定、Contractの使用については、[こちら](https://loomx.io/developers/docs/en/prereqs.html)を参照。
- Sample `dark-slash` come from `Cocos Creator` [Tutorial Project](https://github.com/cocos-creator/tutorial-dark-slash)