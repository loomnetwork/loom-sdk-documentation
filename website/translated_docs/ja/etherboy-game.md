---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---
![Header](/developers/img/ebw_splash.jpg) EtherboyはUnityで構築されたマルチプラットフォームの2Dゲームで、DAppチェーン上で稼働し、また[Loom Unity SDK](unity-sdk.md)を使用してGo言語で書かれたスマートコントラクトと対話する。

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

1. Install Golang by following the steps in [MacOS prerequisites](prereqs.md) (if you haven't done so already).
2. Download Loom DAppChain binary 
        bash
        wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-132/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. Install Golang by follwing the steps in [Ubuntu prerequisites](prereqs-ubuntu.md) (if you haven't done so already).
2. Download Loom DAppChain binary 
        bash
        curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-132/loom
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

Just launch the binary generated in the build output directory. If you have issues logging in please ensure nothing is running on port `9998`.

#### WebGL

Run an http server to serve the build output directory at `localhost:8090`, and open `localhost:8090` in your web browser.

If you don't know how to set up a local http server follow the steps below.

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