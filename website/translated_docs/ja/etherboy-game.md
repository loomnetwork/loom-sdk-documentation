---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---
![Header](/developers/img/ebw_splash.jpg) EtherboyはUnityで構築されたマルチプラットフォームの2Dゲームで、DAppチェーン上で稼働し、また[Loom Unity SDK](unity-sdk.md)を使用してGo言語で書かれたスマートコントラクトと対話する。

## ゲームコントロール

### Desktop / WebGL

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

Currently you need to be on MacOS or Linux to spin up a Loom DAppChain, but if you're on Windows 10 you can run Ubuntu in the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (other distros may work but docs are written for Ubuntu).

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

### Deploy Etherboy contract (OSX / Linux)

Fetch the smart contract code from Github

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

Build and deploy the contract

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

Assuming everything went without a hitch so far you now have a local Loom DAppChain running the Etherboy smart contract!

![Animation](/developers/img/etherboy-clip.gif)

### Build the Unity project

Clone the Unity project for the [Etherboy game](https://github.com/loomnetwork/Etherboy) from Github and modify

- Unityでプロジェクトを開く
- `File`->`Build Settings`を選択
- プラットフォームリストから`Web GL`もしくは`PC, Mac & Linux Standalone`のどちらかを選択
- 可能であれば`Switch Platform`をクリック
- `Build`をクリックし、ビルド出力ディレクトリを選択

> WebGLのゲーム全体の構築は、完了までおよそ30分ほど必要だ。

### Run the game

#### Desktop

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

### Optional configuration

If you configure your local DAppChain to run on another host or port you'll need to update the following section of `Assets/WebGLTemplates/Loom/settings.js` before doing a **WebGL** build, or you can edit `settings.js` inside the build output directory after the build:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

For a desktop build you'll need to edit `Assets/Resources/env_config.json` to change the default DAppChain host & port:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```