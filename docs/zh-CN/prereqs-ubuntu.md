---
id: prereqs-ubuntu
title: 环境依赖 (Ubuntu)
sidebar_label: 安装 (Ubuntu)
---
在 Ubuntu 上安装和设置 Loom

## Ubuntu 包

```bash
sudo apt -y install curl unzip make git
```

## Golang

### 官方途径

```bash
curl -O https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz
```

假设你使用 bash，如果 zsh 执行 `~/.zshrc`：

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

## 安装

```bash
curl -OL https://downloads.loomx.io/loom/linux/stable/loom
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

## 运行区块链：

```bash
../../loom run
```

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