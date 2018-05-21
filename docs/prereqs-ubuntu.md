---
id: prereqs-ubuntu
title: Prerequisites (Ubuntu)
sidebar_label: Installation (Ubuntu)
---
Installing and setting up Loom on Ubuntu

## Ubuntu Packages

```bash
sudo apt -y install curl unzip make git
```

## Golang

### The official way

```bash
curl -O https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz
```

Add the following to your `~/.bashrc` or `~/.zshrc`:

```bash
export PATH=$PATH:/usr/local/go/bin
```

### The "gimme" way

```bash
curl -sL -o /usr/local/bin/gimme https://raw.githubusercontent.com/travis-ci/gimme/master/gimme
chmod +x /usr/local/bin/gimme

gimme 1.10.2
```

Add the following to your `~/.bashrc` or `~/.zshrc`:

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
```


## Installation

```bash
curl -OL https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-127/loom
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
./blueprint create-acct -k priv_key
./blueprint set -v 1 -k priv_key
./blueprint get
```
