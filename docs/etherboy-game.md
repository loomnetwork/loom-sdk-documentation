---
id: etherboy-game
title: Etherboy Game
sidebar_label: Etherboy Game
---

![Header](/developers/img/ebw_splash.jpg)
Etherboy is a multi-platform 2D game built in Unity, using the [Loom Unity SDK][] to interact with a
smart contract written in Golang and running on a Loom DAppChain.

## Game Controls

### WebGL Key Bindings

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

Currently you need to be on MacOS or Linux to spin up a Loom DAppChain, but if you're on Windows 10
you can run Ubuntu in the [Windows Subsystem for Linux][] (other distros may work but docs are
written for Ubuntu). Please ensure you have the [MacOS prerequisites][] or [Ubuntu prerequisites][]
sorted out before proceeding any further.

### Download Loom DAppChain

For Linux [start here](prereqs-ubuntu.html) first


### Deploy Etherboy contract  (OSX)

Fetch the smart contract code from Github with SSH
```bash
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-132/loom
chmod +x loom
export LOOM_BIN=`pwd`/loom
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

Assuming everything went without a hitch so far you now have a local Loom DAppChain running the
Etherboy smart contract!

![Animation](/developers/img/etherboy-clip.gif)


### Build Unity project

Clone the Unity project for the [Etherboy game][] from Github and modify 

- Open the project in Unity
- Select `File`->`Build Settings`
- Select either `Web GL` or `PC, Mac & Linux Standalone` from the platform list
- Press `Switch Platform` if it's enabled
- Press `Build`, select the build output directory

> WebGL builds of the full game take around 30 minutes to complete.

If you configure your local DAppChain to run on another host or port you'll need to update the
following section of `Assets/WebGLTemplates/Loom/settings.js` before doing a **WebGL** build, or
you can edit `settings.js` inside the build output directory after the build:

```js
  dappchain: {
    writeUrl: 'http://localhost:46658/rpc',
    readUrl: 'http://localhost:46658/query'
  }
```

For a desktop build you'll need to edit `Assets/Resources/env_config.json` to change the default
DAppChain host & port:

```json
{
    "write_host": "http://localhost:46658/rpc",
    "read_host": "http://localhost:46658/query"
}
```

[MacOS prerequisites]: prereqs.md
[Ubuntu prerequisites]: prereqs-ubuntu.md
[Windows Subsystem for Linux]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[Loom Unity SDK]: unity-sdk.md
[Etherboy game]: https://github.com/loomnetwork/Etherboy
[Etherboy smart contract]: https://github.com/loomnetwork/etherboy-core