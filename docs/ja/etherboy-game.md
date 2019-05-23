---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---

![Header](/developers/img/ebw_splash.jpg) Etherboy は Unity で構築されたマルチプラットフォームの 2D ゲームで、DApp チェーン上で稼働し、また[Loom Unity SDK](unity-sdk-plugin.html)を使用して Go 言語で書かれたスマートコントラクトと対話する。

## ゲームコントロール

### デスクトップ / WebGL

- ** ↑ **: ドアから入る、ロープをよじ登る
- ** ↓ **: ロープを下る
- **E**: NPC に話しかける、ベッドで寝る、オブジェクトとのやり取り
- **スペース** / **右クリック**: ジャンプ
- **左クリック**: 攻撃 (武器が装備されたとき)

## 対応プラットフォーム

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## 開発

現在 Loom DApp チェーンを稼働させるには、MacOS もしくは Linux 上で行わなければならない。だがもし Windows 10 をお使いであれば、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)内で Ubuntu を実行可能だ (その他のディストリビューションも動くかもしれないが、ドキュメンテーションは Ubuntu 向けに書かれている)。

### MacOS

1. [MacOS の前提条件](prereqs.html)にある手順通りに Golang をインストールしよう(もしまだインストールしていなければ)。
2. Loom DApp チェーンのバイナリをダウンロード
   bash
   wget https://private.delegatecall.com/loom/osx/stable/loom
   chmod +x loom
   export LOOM_BIN=`pwd`/loom

### Linux

1. [Ubuntu の前提条件](prereqs-ubuntu.html)にある手順通りに Golang をインストールしよう(もしまだインストールしていなければ)。
2. Loom DApp チェーンのバイナリをダウンロード
   bash
   curl -OL https://private.delegatecall.com/loom/linux/stable/loom
   chmod +x loom
   export LOOM_BIN=`pwd`/loom

### Etherboy のコントラクトのデプロイ(OSX / Linux)

Github からスマートコントラクトのコードをフェッチする。

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

コントラクトの構築およびデプロイ

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

全てここまで問題なく進んだら、Etherboy のスマートコントラクトを実行する、ローカル Loom DApp チェーンの出来上がりだ。

![Animation](/developers/img/etherboy-clip.gif)

### Unity プロジェクトの構築

[Etherboy ゲーム](https://github.com/loomnetwork/Etherboy)の Unity プロジェクトを Github からクローンして修正しよう。

- Unity でプロジェクトを開く
- `File`->`Build Settings`を選択
- プラットフォームリストから`Web GL`もしくは`PC, Mac & Linux Standalone`のどちらかを選択
- 可能であれば`Switch Platform`をクリック
- `Build`をクリックし、ビルド出力ディレクトリを選択

> WebGL のゲーム全体の構築は、完了までおよそ 30 分ほど必要だ。

### ゲームの実行

#### デスクトップ

ビルド出力ディレクトリ内に生成されたバイナリをローンチするだけでよい。もしログインで問題があれば、ポート`9998`で何も実行されていないことを確認しよう。

#### WebGL

`localhost:8090`でビルド出力ディレクトリのための http サーバーを実行し、ウェブブラウザで`localhost:8090`を開こう。

もしローカルの http サーバーのセットアップ方法がわからなければ、次の手順通りにやってみよう。

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### オプション設定

もしローカル DApp チェーンを設定して別のホストやポートで実行したい場合、**WebGL**の構築を行う前に`Assets/WebGLTemplates/Loom/settings.js`をアップデートするか、もしくは構築後にビルド出力ディレクトリ内の`settings.js`を編集してもよい:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

デスクトップの構築をするには、`Assets/Resources/env_config.json`を編集して、デフォルトの DApp チェーンのホストおよびポートを変更する必要がある:

```json
{
  "write_host": "http://localhost:46658/rpc",
  "read_host": "http://localhost:46658/query"
}
```
