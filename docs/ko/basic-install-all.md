---
id: basic-install-all
title: 로컬 Loom 체인 셋업
sidebar_label: 로컬 Loom 체인 셋업
---

## 목적

이 문서는 여러분에게 로컬 Loom 체인을 셋업하는 과정을 안내하기 위한 문서입니다. 이 과정은 ***Loom 테스트넷 또는 Loom 메인넷에 배포할 때는 필요하지 않은 과정입니다.*** 하지만, 이 문서를 필요로 하는 사용자들을 위해 이 과정을 추가했습니다. 예를 들어, 여러분이 오랜 시간동안 오프라인 상태라고 가정해봅시다. 그 기간동안 개발 작업을 하는 것은 어떠신가요? 그래서, 이렇게 오프라인으로 작업하려는 분들을 위해, 이 문서에서 필요한 세부 정보를 제공할 것입니다.

# Loom 설치 및 설정하기

현재 Windows에서 Loom을 사용하는 유일한 방법은 [Linux를 위한 Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10)을 사용하는 것입니다.

설치가 완료되면, 아래 내용대로 설치 단계를 계속 진행할 수 있습니다.

## loom 다운로드

다음 스크립트는 현재 디렉토리에 스테이블 버전의 loom을 자동으로 다운로드합니다:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 초기화

loom을 초기화하려면, 다음을 입력하세요:

```bash
./loom init
```

## 블록체인 실행

설치 단계에서 만든 디렉토리 내에서 다음 명령을 실행하세요:

```bash
./loom run
```