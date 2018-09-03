---
id: phaser-sdk-demo-websocket
title: Javascript WebSocket 데모
sidebar_label: Phaser + Websocket 데모
---
[Phaser](http://phaser.io)와 [Loom.js](https://github.com/loomnetwork/loom-js)를 사용해서 Loom DappChain과 상호작용하는 간단한 HTML5 + WebSocket을 보여주는 기본적인 예제입니다. 소스는 [Github Websocket 데모](https://github.com/loomnetwork/tiles-chain)에 있습니다

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## 게임 방법

검정색 캔버스에 컬러 타일을 생성하기 위해서 마우스 커서를 클릭하세요, 각 플레이어는 캔버스 내에서 서로다른 색깔을 가지며 모든 플레이어에게 공유됩니다

## 개발하기

### 1.) 예제 프로젝트 (Tiles Chain) 를 다운로드 받으세요

```bash
git clone https://github.com/loomnetwork/tiles-chain
```

### 2.) DappChain을 시작하세요

```bash
cd tiles-chain
mkdir tmpgopath
export GOPATH=`pwd`/tmpgopath

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# Compile
export GOPATH=$GOPATH:`pwd`
make deps
make

# Configure
cd build
../loom init
cp ../genesis.example.json genesis.json

# Run
../loom run
```

### 3.) Web server를 시작하세요

```bash
cd tiles-chain/webclient

# 설치하기
yarn

# protobuf 컴파일하기
yarn run proto

# 데모를 시작하기
yarn start

```

### 5.) 실행하기

Tiles-Chain 웹 인터페이스는 `http://localhost:9000`에서 확인할 수 있습니다