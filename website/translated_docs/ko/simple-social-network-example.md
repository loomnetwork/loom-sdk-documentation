---
id: simple-social-network-example
title: 간단한 소셜 네트워크 예제
sidebar_label: 간단한 소셜 네트워크 예제
---
이번 예제는 `Web3`와 [Loom.js](https://github.com/loomnetwork/loom-js)를 이용해서 Loom DAppChain 위에서 소셜 네트워크를 만들어 봅니다. 이번 소셜 네트워크 예제에서 사용자는 포스팅을 하고 포스팅에 댓글을 남길 수 있습니다. 소스코드는 [Github](https://github.com/loomnetwork/solidity-social-example)에서 확인 가능합니다.

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> 이 예제에 사용된 스마트 컨트랙트는 Solidity 버전 0.4.24로 컴파일 되었습니다 (SimpleSocialNetwork.sol)

## 개발하기

### 1.) 여러분만의 DappChain을 실행하세요

[필수요소](https://loomx.io/developers/docs/en/prereqs.html)에서 설명한 Golang이 잘 설치되었는지 확인하세요.

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# 설정하기
./loom init
cp genesis.example.json genesis.json

# 구동하기
./loom run
```

### 2.) ElasticSearch와 Redis를 시작하세요

> 정상적인 실행과 어플리케이션과의 상호작용을 위해서 두 서비스가 반드시 요구됩니다

```bash
# macOS
brew tap homebrew/services
brew install elasticsearch
brew install redis

# macOS 서비스 시작하기
brew services start elasticsearch
brew services start redis
```

### 3.) Indexer 시작하기

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch). The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

Note this works best on Node8

    brew install node@8
    

```bash
# On second terminal
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) Start the web server

The webserver will serve the frontend which allows users to interact with the smart contracts on the Loom DappChain.

```bash
# On third terminal
cd solidity-social-example/webclient

# Install
yarn

# Start the demo
yarn start

```

### 5.) Running

Open `http://localhost:8080` in your web browser to use the Simple Social Network.