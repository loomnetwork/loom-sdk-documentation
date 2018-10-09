---
id: phaser-sdk-demo-web3-websocket
title: Javascript WebSocket과 Web3 데모
sidebar_label: JS WebSocket + EVM Web3 데모
---
[Phaser](http://phaser.io)와 [Loom.js](https://github.com/loomnetwork/loom-js)를 사용해서 Loom DappChain과 상호작용하는 간단한 HTML5 + WebSocket을 보여주는 기본적인 예제입니다. 이번에 Web3와 Loom Provider를 사용하여 Ethereum 개발자를 위한 완벽한 경험을 만들어 냈습니다.

![](/developers/img/websocket_evm.gif)

## Game instructions

검정색 캔버스에 컬러 타일을 생성하기 위해서 마우스 커서를 클릭하세요, 각 플레이어는 캔버스 내에서 서로다른 색깔을 가지며 모든 플레이어에게 공유됩니다

## 개발하기

### 1.) 여러분만의 DappChain을 실행하세요

여러분만의 DappChain을 실행하는 방법에 대한 더 자세한 사항은 [Loom SDK 문서](https://loomx.io/developers/docs/en/prereqs.html)를 참조하세요.

### 2.) 예제 프로젝트 (Tiles Chain EVM) 를 다운로드 받으세요

```bash
git clone https://github.com/loomnetwork/tiles-chain-evm
```

### 3.) DappChain을 시작하세요

```bash
cd tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/stable/loom
chmod +x loom

# 설정
./loom init
cp genesis.example.json genesis.json

# 실행
./loom run
```

### 4.) Web server를 시작하세요

```bash
# On second terminal
cd tiles-chain-evm/webclient

# Install
yarn

# Start the demo
yarn start
```

### 5.) 실행하기

Tiles-Chain 웹 인터페이스는 `http://localhost:9000`에서 확인할 수 있습니다