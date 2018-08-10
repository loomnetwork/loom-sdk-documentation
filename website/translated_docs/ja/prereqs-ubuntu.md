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

ここではbashをお使いであると想定しているが、もしzshであれば `~/.zshrc`:

```bash
echo -e "\nexport PATH=\$PATH:/usr/local/go/bin:~/gopath/bin" >>  ~/.bashrc
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

## Dep

```bash
mkdir -p ~/gopath/bin
export GOPATH=~/gopath
curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
```

## インストール

```bash
curl -OL https://private.delegatecall.com/loom/linux/build-330/loom
chmod +x loom

export GOPATH=~/gopath
export PATH=$GOPATH/bin:$PATH
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

2 つ目のコンソールを開こう。

このようにして秘密鍵を生成し、アカウントを作成する。そしてバリューを設定し、そのバリューをブロックチェーンから読み取る。

Blueprint contract のソースは[こちら](https://github.com/loomnetwork/weave-blueprint)を参照

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```