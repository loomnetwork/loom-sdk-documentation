---
id: basic-install-windows
title: インストール (Windows)
sidebar_label: インストール (Windows)
---
WindowsでのLoomのインストールとセットアップ

現在LoomをWindowsで使うには、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)を使用するのが唯一の方法である。

これをインストールしたら、 下記の通りLinuxインストール手順を実行しよう。

## インストール

```bash
wget https://downloads.loomx.io/loom/linux/stable/loom
chmod +x loom

./loom init
```

## ブロックチェーンの起動

    ./loom run
    

## Solidity + Truffleでスタートするには

[TruffleとSolidity](truffle-deploy.html)のチュートリアルを参照すること。

## Golangコントラクトでスタートするには

[Golangコントラクト](prereqs.html)を参照すること。