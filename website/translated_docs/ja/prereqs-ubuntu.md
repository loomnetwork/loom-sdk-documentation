---
id: prereqs-ubuntu
title: 前提条件 (Ubuntu)
sidebar_label: インストール (Ubuntu)
---
UbuntuでのLoomのインストールとセットアップ

## Ubuntuパッケージ

```bash
sudo apt -y install curl unzip make git
```

## Golang

### 正式な方法

```bash
curl -O https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz
```

Assuming you are on bash, if zsh do to `~/.zshrc`:

```bash
echo -e "\n export PATH=\$PATH:/usr/local/go/bin" >>  ~/.bashrc
source ~/.bashrc
```

## Protobuf

https://github.com/google/protobuf/releases/

```bash
export PROTOBUF_VERSION=3.5.1
curl -OL https://github.com/google/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip
sudo unzip protoc-${PROTOBUF_VERSION}-linux-x86_64.zip -d /usr/local
sudo chmod +x /usr/local/bin/protoc
```

## インストール

```bash
curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-139/loom
chmod +x loom

mkdir ~/gopath
export GOPATH=`pwd`/tmpgopath
./loom spin weave-blueprint
cd blueprint
export GOPATH=$GOPATH:`pwd`
make deps
make
cd build

../../loom init
cp ../genesis.example.json genesis.json
```

## ブロックチェーンの起動

```bash
../../loom run
```

## トランザクションの送信

Open a second console

This will generate a private key. Create an account. Then set a value, and then read the value from the blockchain.

You can read the source of the [blueprint contract here](https://github.com/loomnetwork/weave-blueprint)

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint create-acct -k priv_key
./blueprint set -v 1 -k priv_key
./blueprint get
```