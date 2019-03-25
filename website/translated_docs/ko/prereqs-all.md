---
id: prereqs-all
title: 필수요소 (모두)
sidebar_label: Go Loom SDK 설치하기
---
## Loom 설치 및 설정하기

## curl을 설치하기 위해서 패키지 매니저를 사용하기

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

## Loom 다운로드

다음 스크립트는 현재 디렉토리에 loom의 스테이블 버전을 자동으로 다운로드 하는데 사용될 수 있습니다:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 설치하기

이전 단계와 동일한 디렉터리에서 이것을 실행합니다.

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

## 블록체인 실행하기

```bash
../../loom run
```

## 트랜잭션 전송하기

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