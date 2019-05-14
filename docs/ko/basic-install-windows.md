---
id: basic-install-windows
title: 설치하기 (Windows)
sidebar_label: 설치하기 (Windows)
---
Windows에서 Loom 설치 및 설정하기

현재 Windows에서 Loom을 사용하는 유일한 방법은 [Linux를 위한 Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10)을 사용하는 것입니다.

설치가 완료되면 아래 내용대로 Linux 설치 단계를 진행할 수 있습니다.

## 설치하기

```bash
wget https://private.delegatecall.com/loom/linux/stable/loom
chmod +x loom

./loom init
```

## 블록체인 실행하기

    ./loom run
    

## Solidity + Truffle 시작하기

[Truffle과 Solidity](truffle-deploy.html)에 관한 튜토리얼을 보세요

## Golang 컨트랙트 시작하기

[Golang 컨트랙트](prereqs.html)를 보세요