---
id: prereqs-all
title: 环境依赖（所有平台）
sidebar_label: 安装 Go Loom SDK
---
## 安装和设置 Loom

## 使用你的软件包管理器来安装 curl

OSX:

```bash
brew install curl
```

适用于 Linux 的 Ubuntu/Windows 子系统:

```bash
sudo apt install curl
```

## Golang

OSX:

```bash
curl -sL -o go1.10.2.darwin-amd64.tar.gz https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
```

适用于 Linux 的 Linux/Windows 子系统:

```bash
curl -sL -o go1.10.2.linux-amd64.tar.gz https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz
sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
```

## Protobuf

https://github.com/google/protobuf/releases/

OSX:

```bash
curl -sL -o protoc-3.5.1-osx-x86_64.zip https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip
unzip protoc-3.5.1-osx-x86_64.zip
sudo unzip protoc-3.5.1-osx-x86_64.zip -d /usr/local
sudo chmod +x /usr/local/bin/protoc
```

适用于 Linux 的 Linux/Windows 子系统:

```bash
curl -sL -o protoc-3.5.1-linux-x86_64.zip https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip
unzip protoc-3.5.1-linux-x86_64.zip
sudo unzip protoc-3.5.1-linux-x86_64.zip -d /usr/local
sudo chmod +x /usr/local/bin/protoc
```

## 下载 loom

以下脚本可用于自动将稳定版的loom下载到当前目录：

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 安装

在与上一步相同的目录中运行这些。

```bash
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

## Run Blockchain

```bash
../../loom run
```

## Send transactions

Open a second console

This will generate a private key. Create an account. Then set a value, and then read the value from the blockchain.

You can read the source of the [blueprint contract here](https://github.com/loomnetwork/weave-blueprint)

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```