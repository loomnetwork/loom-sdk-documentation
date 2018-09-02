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
        wget https://private.delegatecall.com/loom/osx/build-404/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. [Ubuntu 필수요소](prereqs-ubuntu.html) 단계에 따라 Golang을 설치하세요 (만약 아직 설치하지 않으셨다면).
2. Loom DAppChain 바이너리를 다운로드 하세요 
        bash
        curl -OL https://private.delegatecall.com/loom/linux/build-404/loom
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

Just launch the binary generated in the build output directory. If you have issues logging in please ensure nothing is running on port `9998`.

#### WebGL

Run an http server to serve the build output directory at `localhost:8090`, and open `localhost:8090` in your web browser.

If you don't know how to set up a local http server follow the steps below.

```bash
brew install node
npm install http-server -g
cd path/to/webgl-build-dir
http-server -a localhost -p 8090
```

### Optional configuration

If you configure your local DAppChain to run on another host or port you'll need to update the following section of `Assets/WebGLTemplates/Loom/settings.js` before doing a **WebGL** build, or you can edit `settings.js` inside the build output directory after the build:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

For a desktop build you'll need to edit `Assets/Resources/env_config.json` to change the default DAppChain host & port:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```