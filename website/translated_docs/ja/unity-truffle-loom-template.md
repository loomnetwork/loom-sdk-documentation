---
id: unity-truffle-loom-template
title: Unity + Truffle + Loomテンプレート
sidebar_label: Unity + Truffle + Loomテンプレート
---
# 概要

Unityクライアントを使用したLoom DAppチェーンのためのテンプレートで、以下を含む:

- Template [`Blueprint` Solidity contract](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol) implementing a basic string-to-string map. Perfect as a starting point.
- Pre-configured Truffle project that automatically extracts ABIs and binaries of compiled contracts into corresponding folders.
- Pre-configured optimally setup Unity project with `Blueprint` contract test scene, and an already included Loom SDK.

# テンプレートの構造

```shell
├── DAppChain/
│   ├── build/ # Loomバイナリとアプリ/ブロックチェーンの状態をここに保存
│   │   ├── contracts/ # コンパイルされたcontracts .bin はここに来る
│   │   └── ...
│   ├── start-chain.sh # Loom DAppチェーンをスタート
│   ├── reset-and-start-chain.sh ## Resets app/blockchain state and starts the Loom DAppChain
│   ├── genesis.json # Change this file when changing/adding contracts
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unity client project
    ├── Assets/
    │   ├── Contracts/ # Contract ABIs will go here
    │   └── ...
    └── ...
```

* * *

## Getting the Template

First, you need to install Truffle, if it isn't installed already:

```shell
npm install -g truffle
```

After that, you can download the template itself:

```shell
git clone https://github.com/loomnetwork/loom-unity-project-template.git
```

Feel free to rename the `loom-unity-project-template` folder right away according to the name of your project.

## Truffleプロジェクトの構築

```shell
# Truffleプロジェクトを構築する。　これはUnityクライアントへABIファイルを、
# さらにDAppChain/build/ディレクトリにコンパイル済みコントラクトを抽出する

cd Truffle
truffle build
```

## DAppチェーンの実行

```shell
# Loom DAppChainをスタートする。Loomバイナリは自動的にダウンロードされる

cd DAppChain
./start-chain.sh
```

## Unityクライアントの実行

`UnityClient`に置かれたUnityプロジェクトを開こう。`Blueprint/BlueprintTest`シーンを開き、それを実行/構築する。

# Workflow

1. Make changes to the contracts.
2. Build the Truffle project using `truffle build`.
3. Start the Loom DAppChain using `DAppChain/start-chain.sh`.
4. Make changes to the Unity client project.