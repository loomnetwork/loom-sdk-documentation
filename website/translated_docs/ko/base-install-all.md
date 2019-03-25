---
id: basic-install-all
title: Loom SDK 설치하기
sidebar_label: Loom SDK 설치하기
---
# Loom 설치 및 설정하기

현재 Windows에서 Loom을 사용하는 유일한 방법은 [Linux를 위한 Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10)을 사용하는 것입니다.

Once you install that you can continue on below.

## loom 다운로드

다음 스크립트는 현재 디렉토리에 loom의 스테이블 버전을 자동으로 다운로드 하는데 사용될 수 있습니다:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 설치하기

```bash
./loom init
```

## 블록체인을 실행하기

Run from within the directory created in the installation step.

```bash
./loom run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](join-testnet.html)

## To get started on Golang Contracts

See our [Golang Contracts](prereqs-all.html)