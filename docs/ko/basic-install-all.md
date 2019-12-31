---
id: basic-install-all
title: Loom SDK 설치하기
sidebar_label: Loom SDK 설치하기
---
# Loom 설치 및 설정하기

현재 Windows에서 Loom을 사용하는 유일한 방법은 [Linux를 위한 Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10)을 사용하는 것입니다.

일단 설치하면 아래를 계속 진행할 수 있습니다.

## loom 다운로드

다음 스크립트는 현재 디렉토리에 loom의 스테이블 버전을 자동으로 다운로드 하는데 사용될 수 있습니다:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | bash
```

## 설치하기

```bash
./loom init
```

## 블록체인을 실행하기

설치 단계에서 만든 디렉토리 내에서 실행 합니다.

```bash
./loom run
```

## Solidity + Truffle 시작하기

[Truffle과 Solidity](join-testnet.html)에 관한 튜토리얼을 보세요

## Golang 컨트랙트 시작하기

[Golang 컨트랙트](prereqs-all.html)를 확인해보세요
