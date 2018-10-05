---
id: prereqs-all
title: 前提条件(ALL)
sidebar_label: Go Loom SDKのインストール
---
## Installing and setting up Loom

## Use your package manager to install curl

OSX:

```bash
brew install curl
```

Ubuntu / Windows Subsystem for Linux:

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

Linux / Windows Subsystem for Linux:

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

Linux / Windows Subsystem for Linux:

```bash
curl -sL -o protoc-3.5.1-linux-x86_64.zip https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip
unzip protoc-3.5.1-linux-x86_64.zip
sudo unzip protoc-3.5.1-linux-x86_64.zip -d /usr/local
sudo chmod +x /usr/local/bin/protoc
```

## Download loom

The following script can be used to automatically download the stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## Installation

Run these in the same directory as the previous step.

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