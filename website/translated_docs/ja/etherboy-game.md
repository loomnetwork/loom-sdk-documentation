---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---
![Header](/developers/img/ebw_splash.jpg) Etherboy is a multi-platform 2D game built in Unity, using the [Loom Unity SDK](unity-sdk.html) to interact with a smart contract written in Golang and running on a Loom DAppChain.

## ゲームコントロール

### デスクトップ / WebGL

- ** ↑ **: ドアから入る、ロープをよじ登る
- ** ↓ **: ロープを下る
- **E**: NPCに話しかける、ベッドで寝る、オブジェクトとのやり取り
- **スペース** / **右クリック**: ジャンプ
- **左クリック**: 攻撃 (武器が装備されたとき)

## 対応プラットフォーム

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## 開発

現在Loom DAppチェーンを稼働させるには、MacOSもしくはLinux上で行わなければならない。だがもしWindows 10をお使いであれば、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)内でUbuntuを実行可能だ (その他のディストリビューションも動くかもしれないが、ドキュメンテーションはUbuntu向けに書かれている)。

### MacOS

1. Install Golang by following the steps in [MacOS prerequisites](prereqs.html) (if you haven't done so already).
2. Loom DAppチェーンのバイナリをダウンロード 
        bash
        wget https://private.delegatecall.com/loom/osx/build-276/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. Install Golang by follwing the steps in [Ubuntu prerequisites](prereqs-ubuntu.html) (if you haven't done so already).
2. Loom DAppチェーンのバイナリをダウンロード 
        bash
        curl -OL https://private.delegatecall.com/loom/linux/build-276/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Etherboyのコントラクトのデプロイ(OSX / Linux)

Githubからスマートコントラクトのコードをフェッチする。

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

全てここまで問題なく進んだら、Etherboyのスマートコントラクトを実行する、ローカルLoom DAppチェーンの出来上がりだ。

![Animation](/developers/img/etherboy-clip.gif)

### Unityプロジェクトの構築

[Etherboyゲーム](https://github.com/loomnetwork/Etherboy)のUnityプロジェクトをGithubからクローンして修正しよう。

- Unityでプロジェクトを開く
- `File`->`Build Settings`を選択
- プラットフォームリストから`Web GL`もしくは`PC, Mac & Linux Standalone`のどちらかを選択
- 可能であれば`Switch Platform`をクリック
- `Build`をクリックし、ビルド出力ディレクトリを選択

> WebGLのゲーム全体の構築は、完了までおよそ30分ほど必要だ。

### ゲームの実行

#### デスクトップ

ビルド出力ディレクトリ内に生成されたバイナリをローンチするだけでよい。もしログインで問題があれば、ポート`9998`で何も実行されていないことを確認しよう。

#### WebGL

`localhost:8090`でビルド出力ディレクトリのためのhttpサーバーを実行し、ウェブブラウザで`localhost:8090`を開こう。

もしローカルのhttpサーバーのセットアップ方法がわからなければ、次の手順通りにやってみよう。

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### オプション設定

もしローカルDAppチェーンを設定して別のホストやポートで実行したい場合、**WebGL**の構築を行う前に`Assets/WebGLTemplates/Loom/settings.js`をアップデートするか、もしくは構築後にビルド出力ディレクトリ内の`settings.js`を編集してもよい:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

デスクトップの構築をするには、`Assets/Resources/env_config.json`を編集して、デフォルトのDAppチェーンのホストおよびポートを変更する必要がある:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```