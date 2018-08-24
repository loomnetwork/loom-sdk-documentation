---
id: basic-install-linux
title: インストール (Linux)
sidebar_label: インストール (Linux)
---
LinuxでのLoomのインストールとセットアップ

## インストール

```bash
wget https://private.delegatecall.com/loom/linux/build-375/loom
chmod +x loom

./loom init
```

## ブロックチェーンの起動

    ./loom run
    

## Solidity + Truffleでスタートするには

[TruffleとSolidity](truffle-deploy.html)のチュートリアルを参照すること。

## Golangコントラクトでスタートするには

[Golangコントラクト](prereqs.html)を参照すること。

## プロダクションクラスタのセットアップ

*Linuxはプロダクションクラスタ向けに唯一サポートされたOSであることに注目。

[プロダクションクラスタ](multi-node-deployment.html)にてドキュメンテーションを参照すること。