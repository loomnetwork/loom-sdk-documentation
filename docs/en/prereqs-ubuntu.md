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

Assuming you are on bash, if zsh do to `~/.zshrc`:

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

## Installation

```bash
curl -OL https://private.delegatecall.com/loom/linux/stable/loom
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

## Run Blockchain

```bash
../../loom run
```

## Send transactions

Open a second console and run the following commands:

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
```

This will generate a private key and create an account.

Next, let's set a value:

```bash
./blueprint call set -v 1 -p priv_key
```

and read it:

```bash
./blueprint call get
```

You can read the source of the <a href="https://github.com/loomnetwork/weave-blueprint">blueprint contract here</a>
