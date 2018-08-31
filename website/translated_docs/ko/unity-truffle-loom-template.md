---
id: unity-truffle-loom-template
title: Unity + Truffle + Loom 템플릿
sidebar_label: Unity + Truffle + Loom 템플릿
---
# 개요

Unity client가 포함된 Loom DAppChain을 위한 템플릿. **다음을 포함합니다:**

- [`Blueprint` Solidity 컨트랙트](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol) 템플릿. 기본적인 string-to-string map을 구현합니다. 입문하기에 완벽합니다.
- ABI와 컴파일된 컨트랙트가 대응되는 폴더로 추출되어 있는 Pre-configured Truffle 프로젝트.
- 바로 사용 가능한 Unity Project, Loom SDK의 `Blueprint` 컨트랙트를 사용합니다

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

Feel free to rename the `loom-unity-project-template` folder right away according to the name of your project.

## Building the Truffle Project

```shell
# Build the Truffle project. This will extract the ABI files to the Unity client,
# and compiled contracts to the DAppChain/build/ directory

cd Truffle
truffle build
```

## Running the DAppChain

```shell
# Start the Loom DAppChain. Loom binary will be downloaded automatically

cd DAppChain
./start-chain.sh
```

## Running the Unity client

Open the Unity project located in `UnityClient`. Open the `Blueprint/BlueprintTest` scene and run/build it.

# Workflow

1. Make changes to the contracts.
2. Build the Truffle project using `truffle build`.
3. Start the Loom DAppChain using `DAppChain/start-chain.sh`.
4. Make changes to the Unity client project.