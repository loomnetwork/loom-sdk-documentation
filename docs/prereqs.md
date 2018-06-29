---
id: prereqs
title: Prerequisites (OSX)
sidebar_label: Installation (OSX)
---
Installing and setting up Loom on OSX

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

or install Golang from `brew`

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


## Installation

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

## Run Blockchain
```
../../loom run
```

## Send transactions

Open a second console
<br/>
<br/>
This will generate a private key. Create an account. Then set a value, and then read the value from the blockchain.

You can read the source of the <a href="https://github.com/loomnetwork/weave-blueprint">blueprint contract here</a>

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```
