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
echo -e "\n export PATH=$PATH:/usr/local/go/bin" >>  ~/.bashrc
source ~/.bashrc
```

### "gimme" の方法

```bash
curl -sL -o /usr/local/bin/gimme https://raw.githubusercontent.com/travis-ci/gimme/master/gimme
chmod +x /usr/local/bin/gimme

gimme 1.10.2
```

`~/.bashrc`もしくは`~/.zshrc`に以下を追加しよう:

```bash
unset GOOS;
unset GOARCH;
export GOROOT='/home/ubuntu/.gimme/versions/go1.10.2.linux.amd64';
export PATH="/home/ubuntu/.gimme/versions/go1.10.2.linux.amd64/bin:${PATH}";
go version >&2;

export GIMME_ENV="/home/ubuntu/.gimme/envs/go1.10.2.env"
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

2 つ目のコンソールを開こう。

このようにして秘密鍵を生成し、アカウントを作成する。そしてバリューを設定し、そのバリューをブロックチェーンから読み取る。

Blueprint contract のソースは[こちら](https://github.com/loomnetwork/weave-blueprint)を参照

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint create-acct -k priv_key
./blueprint set -v 1 -k priv_key
./blueprint get
```