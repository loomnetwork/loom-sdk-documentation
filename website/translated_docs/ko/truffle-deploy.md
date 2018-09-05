---
id: truffle-deploy
title: Truffle DAppChain 예제
sidebar_label: Truffle 배포
---
![http://truffleframework.com](/developers/img/truffle.jpg)

Simple example of Truffle interacting with Loom DAppChain, this example uses [loom-truffle-provider](https://github.com/loomnetwork/loom-truffle-provider) (check LoomTruffleProvider repository for more details)

## 요구사항

```bash
Node >= 8
```

## 설치

In order to download the Truffle DAppChain Example there're two methods Git or Unbox

### Git method

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

```bash
cd truffle-dappchain-example

yarn install
# 또는
npm install
```

### Unbox method

```bash
# 설치되지 않았다면 Truffle 설치
npm install -g truffle

mkdir truffle-dappchain-example
cd truffle-dappchain-example

truffle unbox loomnetwork/truffle-dappchain-example
```

## DappChain을 시작하세요

```bash
# 다운로드
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# 실행
./loom init
./loom run
```

## Truffle 배포

```bash
# On second terminal

# Deploy Migrations.sol and SimpleStore.sol
yarn deploy

# Running test on directory /test
yarn test
```

> In order to correctly redeploy the contracts there's a command "yarn deploy:reset"
> 
> Also is possible to call truffle command directly by call "yarn truffle"
> 
> We're not versioning the build directory for this particular example, although is recommended to versioning, the limitation can be removed by editing .gitignore

## Current limitations

* Events declared on smart contracts should have an named parameter like `NewValueSet(uint _value)` in the contract `SimpleStore.sol`. Also it helps to dealing with events

## Loom Network

<https://loomx.io>

## License

BSD 3-Clause License