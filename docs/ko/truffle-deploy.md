---
id: truffle-deploy
title: Truffle DAppChain 예제
sidebar_label: Truffle 배포
---
![http://truffleframework.com](/developers/img/truffle.jpg)

Loom DAppChain과 상호작용하는 간단한 Truffle 예제, 이 예제는 [loom-truffle-provider](https://github.com/loomnetwork/loom-truffle-provider)를 사용합니다 (더 자세한 사항은 LoomTruffleProvider 레파지토리를 확인해 보세요)

## 요구사항

```bash
Node >= 8
```

## 설치

Truffle DAppChain 예제를 다운로드 받기 위해서는 Git 또는 Unbox를 사용하는 방법이 있습니다

### Git을 통한 방법

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

```bash
cd truffle-dappchain-example

yarn install
# 또는
npm install
```

### Unbox를 통한 방법

```bash
# 설치되지 않았다면 Truffle 설치
npm install -g truffle

mkdir truffle-dappchain-example
cd truffle-dappchain-example

truffle unbox loomnetwork/truffle-dappchain-example
```

## DappChain을 시작하세요

```bash
# Download
wget https://downloads.loomx.io/loom/osx/stable/loom
chmod +x loom

# Run
./loom init
./loom run
```

## Truffle 배포

```bash
# 두번째 터미널에서

# Migrations.sol and SimpleStore.sol을 배포하세요
yarn deploy

# /test 디렉토리에서 테스트를 수행하기
yarn test
```

> 컨트랙트를 올바르게 재배포 하기 위한 "yarn deploy:reset" 커맨드가 있습니다
> 
> Truffle 커맨드인 "yarn truffle"를 바로 호출하는 방법도 가능합니다
> 
> 특정 예제를 위해서 build 디렉토리를 versioning 하지는 않습니다, 비록 versioning을 추천하더라도요, .gitignore 을 수정함으로써 이런 제약사항을 제거할 수 있습니다.

## 현재 제약사항

* 스마트 컨트랙트에 선언된 이벤트들은 `SimpleStore.sol` 컨트랙트 내에서 `NewValueSet(uint _value)`와 같은 named parameter를 가집니다. 물론 이것은 이벤트를 다루는데 도움이 됩니다

## Loom Network

<https://loomx.io>

## License

BSD 3-Clause License