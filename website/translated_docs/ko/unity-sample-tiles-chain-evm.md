---
id: unity-sample-tiles-chain-evm
title: Tiles EVM 예제
sidebar_label: Tiles EVM 예제
---
[Loom Unity SDK](https://github.com/loomnetwork/unity3d-sdk)를 사용하여 EVM기반의 Loom DappChain과 상호작용하는 간단한 Unity game을 보여주는 기본적인 예제입니다. 비디오를 선호하세요? 여기 이 문서에 관한 둘러보기 동영상이 있습니다 [비디오](/developers/img/tiles-evm-walkthrough.mov)

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## 게임 방법

검정색 캔버스에 컬러 타일을 생성하기 위해서 마우스 커서를 클릭하세요, 각 플레이어는 캔버스 내에서 서로다른 색깔을 가지며 모든 플레이어에게 공유됩니다.

## 개발하기

### 1. 자신만의 DappChain을 구동하세요

여러분만의 DappChain을 실행하는 방법에 대한 더 자세한 사항은 [Loom SDK 문서](https://loomx.io/developers/docs/en/prereqs.html)를 참조하세요.

### 2. 예제 프로젝트 (Unity Tiles Chain EVM) 를 다운로드 받으세요

```bash
git clone https://github.com/loomnetwork/unity-tiles-chain-evm
```

### 3. DappChain을 시작하세요

```bash
cd unity-tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/stable/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4. Unity client를 빌드하기

`unityclient` 폴더에 있는 Unity project를 여세요. `LoomTilesChainEvm` scene을 열고 빌드하세요.