---
id: prereqs-ubuntu
title: 필수요소 (Ubuntu)
sidebar_label: 설치하기 (Ubuntu)
---
Ubuntu에서 Loom 설치 및 설정하기

## Ubuntu 패키지

```bash
sudo apt -y install curl unzip make git
```

## Golang

### 공식 방법

```bash
curl -O https://dl.google.com/go/go1.10.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.2.linux-amd64.tar.gz
```

bash를 기준으로 한 설명이며, zsh를 사용한다면 `~/.zshrc`:

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

## 설치하기

```bash
curl -OL https://private.delegatecall.com/loom/linux/build-404/loom
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

## Blockchain 실행하기

```bash
../../loom run
```

## 트랜잭션 보내기

두 번째 콘솔을 여세요

이렇게 하면 프라이빗 키가 만들어집니다. 계정을 만들고, 값을 저장한 후 블록체인으로부터 값을 읽어옵니다.

여기서 [blueprint 컨트랙트](https://github.com/loomnetwork/weave-blueprint)의 소스를 볼 수 있습니다.

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```
