---
id: etherboy-game
title: Etherboy 게임
sidebar_label: Etherboy 게임
---
![Header](/developers/img/ebw_splash.jpg) Etherboy는 Unity로 만들어진 멀티플랫폼 2D 게임입니다, [Loom Unity SDK](unity-sdk.html)를 사용하여 Golang으로 작성되고 Loom DAppChain에서 구동되는 스마트 컨트랙트와 상호작용합니다.

## Game Controls

### Desktop / WebGL

- **UP**: enter doors, go up ropes
- **DOWN**: go down ropes
- **E**: talk to NPCs, sleep in bed, interact with objects
- **SPACE** / **RIGHT-CLICK**: jump
- **LEFT-CLICK**: attack (when weapon is equipped)

## Supported Platforms

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## Development

Currently you need to be on MacOS or Linux to spin up a Loom DAppChain, but if you're on Windows 10 you can run Ubuntu in the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (other distros may work but docs are written for Ubuntu).

### MacOS

1. Install Golang by following the steps in [MacOS prerequisites](prereqs.html) (if you haven't done so already).
2. Download Loom DAppChain binary 
        bash
        wget https://private.delegatecall.com/loom/osx/build-404/loom
        chmod +x loom
        export LOOM_BIN=`pwd`/loom

### Linux

1. Install Golang by follwing the steps in [Ubuntu prerequisites](prereqs-ubuntu.html) (if you haven't done so already).
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