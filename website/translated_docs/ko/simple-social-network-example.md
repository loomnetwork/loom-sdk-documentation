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

Indexer는 스마트 컨트랙트로부터 모든 이벤트를 수신하고 메시지큐 및 빠른 데이터베이스 (Redis + ElasticSearch) 에 내장된 캐시 계층에 제공하는 서비스입니다. 이 서비스에 축적된 데이터는 `http://localhost:8081/posts`와 `http://localhost:8081/comments`에서 제공됩니다

Node8에서 가장 잘 동작합니다

    brew install node@8
    

```bash
# 두번째 터미널에서
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) Web server를 시작하세요

Web server는 사용자가 Loom DAppChain의 스마트 컨트랙트와 상호작용하도록 해주는 프론트엔드를 제공합니다.

```bash
# 세번째 터미널에서
cd solidity-social-example/webclient

# 설치하기
yarn

# 데모를 시작하기
yarn start

```

### 5.) 실행하기

브라우저에서 `http://localhost:8080`을 열고 간단한 소셜 네트워크를 사용해보세요.