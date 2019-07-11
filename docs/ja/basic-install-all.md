---
id: basic-install-all
title: Loom SDKのインストール
sidebar_label: Loom SDKのインストール
---

# Loomのインストールとセットアップ

現在LoomをWindowsで使うには、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)を使用するのが唯一の方法である。

これをインストールしたら、 下記の通り実行しよう。

## Loomをダウンロード

次のスクリプトは、現在のディレクトリへ自動的にLoomの安定的なバージョンをダウンロードする：

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 初期化

Loomを初期化するには、以下のようにタイプしよう:

```bash
./loom init
```

## ブロックチェーンの起動

インストール手順で作成したディレクトリ内から以下のコマンドで実行する：

```bash
./loom run
```