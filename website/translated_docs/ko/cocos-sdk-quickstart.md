---
id: cocos-sdk-quickstart
title: Cocos Creator용 Loom SDK
sidebar_label: Cocos SDK 퀵스타트
---
## 목차:

- Korean 
 - [필수요소](#prerequisites)
 - [Loom Cocos SDK](#loom-cocos-sdk)
 - [Cocos SDK 생성하기](#generate-cocos-sdk)
 - [Loom 설치하기](#install-loom)
 - [Cocos Creator 설치하기](#install-cocos-creator)
 - [Creator Game로 통합하기](#integrate-to-creator-game)
 - [예제](#sample)
 - [유의사항](#notice)

## 필수요소

1. Python 2.7
2. Git
3. [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm)
4. [Loom](https://loomx.io/), [설치순서](https://loomx.io/developers/docs/en/prereqs.html)
5. [Cocos Creator](http://www.cocos.com/creator)
6. [Cocos Loom SDK 저장소](https://github.com/loomnetwork/cocos-sdk/)

## Loom Cocos SDK

Loom 전체 구조 다이어그램

![](/developers/img/Loom-Cocos-SDK.png)

Loom Cocos SDK 구조 다이어그램

![](/developers/img/loom-cocos-sdk-struct.png)

`Loom-Cocos-SDK`는 `loom-js`와 동일한 api, 동일한 protobuf, 비슷한 컨트랙트를 가지고 있습니다.

`Loom Cocos SDK`은 [Loom-JS](https://github.com/loomnetwork/loom-js/)를 기반으로 하며, `Cocos Creator`에 포팅됩니다.

### Cocos SDK 생성하기

- `git clone https://github.com/loomnetwork/cocos-sdk.git`
- `cd cocos-sdk`
- `git submodule update --init`, git submodule을 업데이트
- `./tools/genCocoSDK.py`

`Cocos Creator용 Loom SDK`는 `loom-cocos-sdk` 디렉토리입니다. 이것은 `./tools/genCocoSDK.py` 커맨드로 생성됩니다.

## Loom 설치하기

    wget https://private.delegatecall.com/loom/osx/build-404/loom
    chmod +x loom
    
    mkdir tmpgopath
    export GOPATH=`pwd`/tmpgopath
    ./loom spin weave-blueprint
    cd blueprint
    export GOPATH=$GOPATH:`pwd`
    make deps
    make
    cd build
    
    ../../loom init
    cp ../genesis.example.json genesis.json
    

블록체인 실행하기:

    # unable to start http server: listen tcp 127.0.0.1:9092: bind: address already in use
    pkill blueprint # kill server first
    ../../loom run
    

여러분만의 DappChain을 실행하는 방법에 대한 더 자세한 사항은 [Loom SDK 문서](https://loomx.io/developers/docs/en/prereqs.html)를 참고하세요.

## Cocos Creator 설치하기

![](http://www.cocos2d-x.org/s/images/creator_192.png)

Cocos Creator은 게임 개발 툴 및 워크플로우를 위한 완벽한 패키지입니다. 게임 엔진 (Cocos2d-x 기반), 리소스 관리, scene 편집, 게임 프리뷰, 디버그, 멀티 플랫폼 퍼블리싱 등을 포함하고 있습니다.

우리는 Cocos2d-x 계열에 entity-component structure 및 data-driven workflow를 최초로 도입하였습니다. JavaScript로, 여러분은 즉시 여러분만의 컴포넌트 스크립트를 만들 수 있습니다. 에디터와 엔진 확장 프로그램도 역시 JavaScript로 만들어져 여러분은 단일 프로그래밍 언어로 게임을 만들고 툴을 개선할 수 있습니다.

Cocos Creator는 UI 시스템 및 애니메이션 편집기와 같은 혁신적이고 사용하기 쉬운 툴셋을 제공합니다. 이 툴셋은 open editor extension system 덕분에 지속적이고 빠르게 확산될 것입니다.

[여기](http://www.cocos.com/creator)에서 `Cocos Creator`를 다운로드하고 설치할 수 있습니다.

## Creator Game에 통합하기

1. 생성된 `Loom Cocos SDK`를 자신의 프로젝트의 `asset/script` 디렉토리에 복사하고, 이름을 `loom`으로 변경하세요.
2. 여러분의 게임 요구사항에 맞는 `proto` 파일을 작성하세요. 예를 들면, `sample/loomDemoForCreator`는 [setscore.proto](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore.proto)을 사용하고 있고, [setscore_pb.js](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore_pb.js)과 관련이 있지요.
3. 여러분의 게임 요구사항에 맞는 컨트랙트를 작성하세요. 그리고 `setscore_pb.js`로 데이터를 직렬화하고, Loom Blockchain에 보내세요. [SimpleContract](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/SimpleContract.js)를 살펴보세요.

![](/developers/img/script_loom_folder.png)

1. 적당한 위치에서 여러분의 컨트랙트 API를 호출하세요.
2. 실행하세요

## 예제:

두 개의 `Sample` 프로젝트가 있습니다:

- `loomDemoForCreator` 는 단순히 look sdk를 사용합니다.
- `dark-slash`는 실제 게임에서 loom sdk를 사용합니다.

테스트 절차

- git submodule을 업데이트하기 위해, `git submodule update --init` 명령어를 실행하세요. 이미 이것을 수행했다면, 건너뛰세요.
- `Loom Cocos SDK`를 생성 및 패키징하기 위해, `./tools/genCocoSDK.py` 명령어를 실행하세요.
- `Loom Cocos SDK`를 `sample/loomDemoForCreator`와 `sample/dark-slash`에 동기화하기 위해, `./tools/syncLoomJSToSample.py` 명령어를 실행하세요.
- `blueprint/build` 디렉토리에서 `Loom Block Chain` 서비스를 실행하기 위해, `../../loom run`을 실행하세요. 이미 수행했다면, 건너뛰세요.
- `Cocos Creator`로 `sample/loomDemoForCreator` 혹은 `sample/dark-slash`을 열고 실행하세요

## 유의사항

- `Loom Block Chain` 설정, 컨트랙트 사용에 관한 것은, [여기를](https://loomx.io/developers/docs/en/prereqs.html) 살펴보세요.
- `dark-slash` 예제는 `Cocos Creator` [튜토리얼 프로젝트](https://github.com/cocos-creator/tutorial-dark-slash)를 참고하였습니다.