---
id: prereqs
title: 环境依赖 (OSX)
sidebar_label: 安装 (OSX)
---
在 OSX 上安装和设置 Loom

## wget

```bash
brew install wget
```

## Golang

```bash
wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
mkdir ~/gopath
export GOPATH=~/gopath
*Add GOPATH to your bashrc  or zshrc
```

或从 `brew` 安装 Golang

```bash
brew install go
```

## Protobuf

https://github.com/google/protobuf/releases/

```bash
wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip
unzip protoc-3.5.1-osx-x86_64.zip
sudo unzip protoc-3.5.1-osx-x86_64.zip -d /usr/local
sudo chmod +X /usr/local/bin/protoc
export GOPATH=~/gopath
go get -u github.com/golang/protobuf/protoc-gen-go
```

## Dep

```bash
$ brew install dep
$ brew upgrade dep
```

## 安装

```bash
wget https://private.delegatecall.com/loom/osx/build-209/loom
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

## 运行区块链：

    ../../loom run
    

## 发送事务

打开第二个控制台   
  
这将生成私钥。 创建一个帐户。 然后设置一个值，接着从区块链中读取值。

你可以在这里读取 [blueprint 合约](https://github.com/loomnetwork/weave-blueprint) 源代码

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```