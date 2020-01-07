---
id: basic-install-osx
title: 前提条件(OSX)
sidebar_label: インストール (OSX)
---
OSXでのLoomのインストールとセットアップ

## インストール

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | bash
chmod +x loom

./loom init
```

## ブロックチェーンの起動

    ./loom run


## Solidity + Truffleでスタートするには

[TruffleとSolidity](truffle-deploy.html)のチュートリアルを参照すること。

## Golangコントラクトでスタートするには

[Golangコントラクト](prereqs.html)を参照すること。
