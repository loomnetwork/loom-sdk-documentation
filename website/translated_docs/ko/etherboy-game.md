---
id: etherboy-game
title: Etherboy 게임
sidebar_label: Etherboy 게임
---
![Header](/developers/img/ebw_splash.jpg) Etherboy는 Unity로 만들어진 멀티플랫폼 2D 게임입니다, [Loom Unity SDK](unity-sdk.html)를 사용하여 Golang으로 작성되고 Loom DAppChain에서 구동되는 스마트 컨트랙트와 상호작용합니다.

## 게인 컨트롤

### 데스크탑 / WebGL

- **UP**: 문 들어가기, 로프 위로 이동
- **DOWN**: 로프 아래로 이동
- **E**: NPC와 대화하기, 잠자기, 객체와 상호작용하기
- **SPACE** / **RIGHT-CLICK**: 점프
- **LEFT-CLICK**: 공격하기 (무기가 장착되어 있을때)

## 지원 플랫폼

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## 개발하기

현재 MacOS 또는 Linux에서 Loom DAppChain을 구동해야합니다, 그러나 Windows 10 을 사용중이라면, [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 로 Ubuntu를 실행시킬 수 있습니다 (다른 배포판은 아마 동작할 것이지만 문서는 Ubuntu를 위해 작성되었습니다).

### MacOS

1. [MacOS 필수요소](prereqs.html) 단계에 따라 Golang을 설치하세요 (만약 아직 설치하지 않으셨다면).
2. Loom DAppChain 바이너리를 다운로드 하세요 
        bash
        wget https://private.delegatecall.com/loom/osx/stable/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. [Ubuntu 필수요소](prereqs-ubuntu.html) 단계에 따라 Golang을 설치하세요 (만약 아직 설치하지 않으셨다면).
2. Loom DAppChain 바이너리를 다운로드 하세요 
        bash
        curl -OL https://private.delegatecall.com/loom/linux/stable/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Etherboy 컨트랙트 배포하기 (OSX / Linux)

Github에서 스마트 컨트랙트를 가져오세요

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

컨트랙트를 빌드 및 배포하세요

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

지금까지 모든것이 순조롭다면 여러분은 Etherboy 스마트 컨트랙트가 돌아가고 있는 로컬 Loom DAppChain 가지게 된 것입니다!

![Animation](/developers/img/etherboy-clip.gif)

### Unity 프로젝트 빌드하기

Github에서 Unity 프로젝트인 [Etherboy 게임](https://github.com/loomnetwork/Etherboy)을 clone하고 수정해보세요

- Unity에서 프로젝트를 여세요
- `File`->`Build Settings`을 선택하세요
- 플랫폼 리스트에서 `Web GL` 혹은 `PC, Mac & Linux Standalone`을 선택하세요
- `Switch Platform`을 누르세요 만약 활성화 도어 있다면
- `Build`를 누르고, build output 디렉토리를 선택하세요

> WebGL 빌드는 전체 게임 빌드를 완료하는데 약 30분 정도 소요됩니다.

### 게임 실행하기

#### 데스크탑

Build output 디텍토리에 생성된 바이너를 실행시키세요. 로그인 문제가 있다면`9998` 포트에 아무것도 실행되지 않고 있는지 확인하세요.

#### WebGL

Build output 디렉토리에서 `localhost:8090`를 제공하는 http server를 실행하고, 브라우저에서 `localhost:8090`를 여세요.

로컬 http server 설정방법을 모르면 아래를 따라해 보세요.

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### 추가 구성

만약에 로컬 DAppChain을 다른 host와 port에서 구동하고 싶다면, **WebGL** 빌드전에 `Assets/WebGLTemplates/Loom/settings.js`를 업데이트 하는게 필요하건, 빌드 이후에 build output 디렉토리내의 `settings.js`파일을 편집할수 있습니다:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

데스크탑 빌드를 위해서 DAppChain host와 port를 변경하고 싶다면 `Assets/Resources/env_config.json`를 업데이트 하세요:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```