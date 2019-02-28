---
id: unity-truffle-loom-template
title: Unity + Truffle + Loomテンプレート
sidebar_label: Unity + Truffle + Loomテンプレート
---
# 概要

A template for a Loom DAppChain with a Unity client. Contains:

- 基本的なも文字列→文字列のMapを実装した[`Blueprint` Solidityコントラクト](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol)テンプレート。 初めて使用するのに最適だ。
- 構成済みのTruffleプロジェクト。コンパイル済みコントラクトのABIとバイナリを対応フォルダに自動抽出する。
- Pre-configured optimally setup Unity project with `Blueprint` contract test scene, and an already included Loom SDK.

# テンプレートの構造

```shell
├── DAppChain/
│   ├── build/ # Loomバイナリとアプリ/ブロックチェーンの状態をここに保存
│   │   ├── contracts/ # コンパイルされたcontracts .bin はここに来る
│   │   └── ...
│   ├── start-chain.sh # Loom DAppチェーンをスタート
│   ├── reset-and-start-chain.sh ## アプリ/ブロックチェーンの状態をリセットし、Loom DAppチェーンをスタート
│   ├── genesis.json # コントラクト変更/追加時にこのファイルを変更
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unityクライアントプロジェクト
    ├── Assets/
    │   ├── Contracts/ # コントラクトのABIはここへ来る
    │   └── ...
    └── ...
```

* * *

## テンプレートの取得

Truffleをインストールしていなければ、まずはインストールが必要だ:

```shell
npm install -g truffle
```

その後テンプレート本体がダウンロード可能になる:

```shell
git clone https://github.com/loomnetwork/loom-unity-project-template.git
```

Feel free to rename the `loom-unity-project-template`フォルダは、あなたのプロジェクト名に合わせてすぐに好きな名前に変更して大丈夫だ。

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

`UnityClient`に置かれたUnityプロジェクトを開こう。`Blueprint/BlueprintTest`シーンを開き、それを実行/ビルドする。

# ワークフロー

1. コントラクトを変更
2. `truffle build` を用いてTruffleプロジェクトをビルド
3. `DAppChain/start-chain.sh`を使用してLoom DAppチェーンをスタート
4. Unityクライアントプロジェクトを変更