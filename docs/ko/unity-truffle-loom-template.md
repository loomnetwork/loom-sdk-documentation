---
id: unity-truffle-loom-template
title: Unity + Truffle + Loom 템플릿
sidebar_label: Unity + Truffle + Loom 템플릿
---
# 개요

A template for a Loom DAppChain with a Unity client. Contains:

- [`Blueprint` Solidity 컨트랙트](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol) 템플릿. 기본적인 string-to-string map을 구현합니다. 입문하기에 완벽합니다.
- ABI와 컴파일된 컨트랙트가 대응되는 폴더로 추출되어 있는 Pre-configured Truffle 프로젝트.
- Pre-configured optimally setup Unity project with `Blueprint` contract test scene, and an already included Loom SDK.

# 템플릿 구조

```shell
├── DAppChain/
│   ├── build/ # Loom 바이너리와 app/blockchain 스테이트 데이터가 여기에 저장된다
│   │   ├── contracts/ # 컴파일된 컨트랙트인 .bin 이 여기에 위치한다
│   │   └── ...
│   ├── start-chain.sh # Loom DAppChain을 시작한다
│   ├── reset-and-start-chain.sh ## app/blockchain 스테이트를 초기화하고 Loom DAppChain 시작한다
│   ├── genesis.json # 컨트랙트를 변경/추가할때 이 파일을 수정하세요
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unity client 프로젝트
    ├── Assets/
    │   ├── Contracts/ # 컨트랙트 ABI가 여기에 위치합니다
    │   └── ...
    └── ...
```

* * *

## 템플릿 가져오기

먼저, Truffle을 설치해야 하고, 설치되어 있지 않다면:

```shell
npm install -g truffle
```

다음으로는, 템플릿을 다운로드 받을 수 있습니다:

```shell
git clone https://github.com/loomnetwork/loom-unity-project-template.git
```

여러분의 프로젝트 이름에 맞게 `loom-unity-project-template` 폴더의 이름을 바꾸는데 주저하지 마세요.

## Truffle 프로젝트 빌드하기

```shell
# Truffle 프로젝트를 빌드합니다. 이것은 ABI 파일을 Unity client에 추출할 것입니다,
# 그리고 컴파일된 컨트랙트는 DAppChain/build/ 디렉토리로 보냅니다

cd Truffle
truffle build
```

## DAppChain 실행하기

```shell
# Loom DAppChain을 시작하세요. Loom 바이너리가 자동으로 다운로드 될 것입니다

cd DAppChain
./start-chain.sh
```

## Unity client 실행하기

`UnityClient` 폴더에 있는 Unity project를 여세요. `Blueprint/BlueprintTest` scene을 열고 실행/빌드하세요.

# 작업순서

1. 컨트랙트를 수정하세요.
2. `truffle build`로 Truffle 프로젝트를 빌드하세요.
3. `DAppChain/start-chain.sh`로 Loom DAppChain을 시작하세요.
4. Unity client 프로젝트를 수정하세요.