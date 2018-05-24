---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---
![Header](/developers/img/etherboy.jpg) EtherboyはUnityで構築されたマルチプラットフォームの2Dゲームで、DAppチェーン上で稼働し、また[Loom Unity SDK](unity-sdk.md)を使用してGo言語で書かれたスマートコントラクトと対話する。

## ゲームコントロール

### WebGLキーバインディング

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

## Development

Currently you need to be on MacOS or Linux to spin up a Loom DAppChain, but if you're on Windows 10 you can run Ubuntu in the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (other distros may work but docs are written for Ubuntu). Please ensure you have the [MacOS prerequisites](prereqs.md) or [Ubuntu prerequisites](prereqs-ubuntu.md) sorted out before proceeding any further.

### Download Loom DAppChain

**MacOS**

```bash
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-132/loom
chmod +x loom
```

**Linux**

```bash
curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-132/loom
chmod +x loom
```

### Deploy Etherboy contract

Fetch the smart contract code from Github with SSH

```bash
git clone git@github.com:loomnetwork/etherboy-core.git \
          ebgopath/src/github.com/loomnetwork/etherboy-core
```

OR with HTTPS

```bash
git clone https://github.com/loomnetwork/etherboy-core.git \
          ebgopath/src/github.com/loomnetwork/etherboy-core
```

Build and deploy the contract

```bash
export LOOM_EXE=`pwd`/loom
export GOPATH=`pwd`/ebgopath
cd $GOPATH/src/github.com/loomnetwork/etherboy-core
make deps
make
cd run
$LOOM_EXE init
cp ../genesis.json genesis.json
$LOOM_EXE run
```

Assuming everything went without a hitch so far you now have a local Loom DAppChain running the Etherboy smart contract!

### Tweak Unity project

TBD

## A peek at the source code?

The code for the [Etherboy game](https://github.com/loomnetwork/Etherboy) and the [Etherboy smart contract](https://github.com/loomnetwork/etherboy-core) is on Github for your perusal.