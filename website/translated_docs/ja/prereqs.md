---
id: prereqs
title: 前提条件(OSX)
sidebar_label: インストール (OSX)
---
OSXでのLoomのインストールとセットアップ

Wget

    brew install wget

Golang

```bash
wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
mkdir ~/gopath
export GOPATH=~/gopath
*Add GOPATH to your bashrc  or zshrc
```

もしくはGolangを`brew`からインストール

```bash
brew install go
```

Protobufs https://github.com/google/protobuf/releases/tag/v3.5.1

```bash
wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip
unzip protoc-3.5.1-osx-x86_64.zip
sudo unzip protoc-3.5.1-osx-x86_64.zip -d /usr/local
sudo chmod +X /usr/local/bin/protoc
export GOPATH=~/gopath
go get -u github.com/golang/protobuf/protoc-gen-go
```

## インストール

```bash
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-132/loom
chmod +x loom

mkdir tmpgopath
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

    ../../loom run
    

## トランザクションの送信

2 番目のコンソール画面を開こう。   
  
このようにして秘密鍵を生成し、アカウントを作成する。そしてバリューを設定し、そのバリューをブロックチェーンから読み取る。

Blueprint contract のソースは[こちら](https://github.com/loomnetwork/weave-blueprint)を参照

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint create-acct -k priv_key
./blueprint set -v 1 -k priv_key
./blueprint get
```