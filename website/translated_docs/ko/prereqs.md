---
id: prereqs
title: Prerequisites (OSX)
sidebar_label: Installation (OSX)
---
OSX에 Loom을 설치 및 세팅하기

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

혹은 `brew`를 통해서 Golang을 설치하세요

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


## 설치하기

```bash
wget https://private.delegatecall.com/loom/osx/build-404/loom
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

## 블록체인을 실행하기
```
../../loom run
```

## 트랜젝션을 전송하기

두번째 콘솔을 여세요
<br/>
<br/>
이것은 프라이빗 키를 생성할 것입니다. 계정도 생성합니다. 그리고 값을 저장하고 블록체인으로 부터 값을 읽어옵니다.

여기 <a href="https://github.com/loomnetwork/weave-blueprint">블루프린트 컨트랙트</a>의 소스를 볼 수 있습니다.

```bash
cd blueprint/build
../../loom genkey -k priv_key -a pub_key
./blueprint call create-acct -p priv_key
./blueprint call set -v 1 -p priv_key
./blueprint call get
```
