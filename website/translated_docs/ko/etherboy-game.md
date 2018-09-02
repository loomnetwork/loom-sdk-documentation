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
2. Download Loom DAppChain binary 
        bash
        curl -OL https://private.delegatecall.com/loom/linux/build-404/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Deploy Etherboy contract (OSX / Linux)

Fetch the smart contract code from Github

```bash
export GOPATH=`pwd`/ebgopath
mkdir -p ebgopath/src/github.com/loomnetwork
cd ebgopath/src/github.com/loomnetwork
git clone https://github.com/loomnetwork/etherboy-core.git etherboy-core
```

Build and deploy the contract

```bash
cd etherboy-core
make deps
make
cd run
$LOOM_BIN init
cp ../genesis.json genesis.json
$LOOM_BIN run
```

Assuming everything went without a hitch so far you now have a local Loom DAppChain running the Etherboy smart contract!

![Animation](/developers/img/etherboy-clip.gif)

### Build the Unity project

Clone the Unity project for the [Etherboy game](https://github.com/loomnetwork/Etherboy) from Github and modify

- Open the project in Unity
- Select `File`->`Build Settings`
- Select either `Web GL` or `PC, Mac & Linux Standalone` from the platform list
- Press `Switch Platform` if it's enabled
- Press `Build`, select the build output directory

> WebGL builds of the full game take around 30 minutes to complete.

### Run the game

#### Desktop

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