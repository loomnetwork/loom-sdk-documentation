---
id: basic-install-all
title: Loom SDKのインストール
sidebar_label: Loom SDKのインストール
---
# Loomのインストールとセットアップ

現在LoomをWindowsで使うには、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)を使用するのが唯一の方法である。

これをインストールしたら、 下記の通り実行しよう。

## Loomをダウンロード

The following script can be used to automatically download the stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## インストール

```bash
./loom init
```

## ブロックチェーンの起動

Run from within the directory created in the installation step.

```bash
./loom run
```

## Solidity + Truffleでスタートするには

[TruffleとSolidity](join-testnet.html)のチュートリアルを参照すること。

## Golangコントラクトでスタートするには

[Golangコントラクト](prereqs-all.html)を参照すること。