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
 - [주의](#notice)

## 필수요소

1. Python 2.7
2. Git
3. [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm)
4. [Loom](https://loomx.io/), [설치순서](https://loomx.io/developers/docs/en/prereqs.html)
5. [Cocos Creator](http://www.cocos.com/creator)
6. [Cocos Loom SDK 레파지토리](https://github.com/loomnetwork/cocos-sdk/)

## Loom Cocos SDK

Loom 전체구조 다이어그램

![](/developers/img/Loom-Cocos-SDK.png)

Loom Cocos SDK 구조 다이어그램

![](/developers/img/loom-cocos-sdk-struct.png)

`Loom-Cocos-SDK`은 `loom-js`와 동일한 api, 동일한 protobuf, 비스한 컨트랙트를 가지고 있습니다.

`Loom Cocos SDK`은 [Loom-JS](https://github.com/loomnetwork/loom-js/)를 기반으로 하며 , `Cocos Creator`에 포팅됩니다.

### Cocos SDK 생성하기

- `git clone https://github.com/loomnetwork/cocos-sdk.git`
- `cd cocos-sdk`
- `git submodule update --init`, git submodule을 업데이트
- `./tools/genCocoSDK.py`

`Cocos Creator용 Loom SDK`는 `loom-cocos-sdk` 디렉토리입니다. 이것은 `./tools/genCocoSDK.py`커맨드로 생성됩니다.

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
    

여러분만의 DappChain을 실행하는 방법에 대한 더 자세한 사항은 [Loom SDK 문서](https://loomx.io/developers/docs/en/prereqs.html)를 참조하세요.

## Cocos Creator 설치하기

![](http://www.cocos2d-x.org/s/images/creator_192.png)

Cocos Creator은 게임 개발 툴 및 워크플로우를 위한 완벽한 패키지입니다, 게임 엔진 (Cocos2d-x 기반의), 리소스 관리, scene 편집, 게임 프리뷰, 디버그, 멀티 플랫폼 퍼블리싱 등을 포함하고 있습니다.

우리는 Cocos2d-x 계열에 entity-component structure 및 data-driven workflow를 최초로 도입하였습니다. JavaScript로, 여러분은 즉시 여러분만의 컴포넌트를 스크립팅 할 수 있습니다. 에디터와 엔진 extension도 역시 JavaScript 로 만들어져서 여러분은 단일 프로그래밍 언어로 게임을 만들고 툴을 개선할 수 있습니다.

Cocos Creator는 UI 시스템 및 애니메이션 편집기와 같은 혁신적이고 사용하기 쉬운 툴셋을 제공합니다. 이 툴셋은 open editor extension system 덕분에 지속적이고 빠르게 확산 될 것입니다.

[여기](http://www.cocos.com/creator)에서 `Cocos Creator`를 다운로드 받아서, 설치하세요.

## Creator Game에 통합하기

1. 생성된 `Loom Cocos SDK`를 자신의 프로젝트의 `asset/script` 디렉토리에 복사하고, 이름을 `loom`으로 변경하세요
2. 자신의 게임의 요구사항으로 사용될 `proto` 파일을 작성하세요 예를 들면, `sample/loomDemoForCreator`는 [setscore.proto](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore.proto)을 사용하고 있고, [setscore_pb.js](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/assets/protobuff/setscore_pb.js)과 관련이 있지요
3. write yur own contract as requirements of your game, and serailezse your data with `setscore_pb.js`, and send to Loom Blockchain, take a look at [SimpleContract](https://github.com/loomnetwork/phaser-sdk-demo/blob/master/src/SimpleContract.js)

![](/developers/img/script_loom_folder.png)

1. invoke api of your contract at suitable position.
2. Run

## Sample:

There are two `Sample` projects:

- `loomDemoForCreator` simplely use loom sdk
- `dark-slash` use loom sdk in a real game

Test Steps

- update git submodule, run command `git submodule update --init`, if you have done this, skip this.
- generate and pack `Loom Cocos SDK`, run command `./tools/genCocoSDK.py`
- sync `Loom Cocos SDK` to `sample/loomDemoForCreator` and `sample/dark-slash`, run command `./tools/syncLoomJSToSample.py`
- entry directory `blueprint/build`, run `Loom Block Chain` services, run command `../../loom run`, if you have done this, skip this.
- open `sample/loomDemoForCreator` or `sample/dark-slash` with `Cocos Creator` and run

## Notice

- `Loom Block Chain` configuration, Contract's usage, take a look at [this](https://loomx.io/developers/docs/en/prereqs.html)
- Sample `dark-slash` come from `Cocos Creator` [Tutorial Project](https://github.com/cocos-creator/tutorial-dark-slash)