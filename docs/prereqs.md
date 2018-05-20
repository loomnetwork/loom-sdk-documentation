---
id: prereqs
title: Prerequisites (OSX)
sidebar_label: Installation (OSX)
---
Installing and setting up Loom on OSX

Wget

```brew install wget```

Golang


```
wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
mkdir ~/gopath
export GOPATH=~/gopath
*Add GOPATH to your bashrc  or zshrc
```


Protobufs https://github.com/google/protobuf/releases/tag/v3.5.1

```
wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip
unzip protoc-3.5.1-osx-x86_64.zip
sudo unzip protoc-3.5.1-osx-x86_64.zip -d /usr/local
sudo chmod +X /usr/local/bin/protoc
export GOPATH=~/gopath
go get -u github.com/golang/protobuf/protoc-gen-go
```


## Installation

```
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-116/loom
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

```
cd blueprint/build
./blueprint genkey
./blueprint create-acct
./blueprint set -v 1
./blueprint get
```
