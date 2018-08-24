---
id: phaser-sdk-demo-web3-websocket
title: Javascript WebSockets and Web3 Demo
sidebar_label: JS WebSockets + EVM Web3 Demo
---

A basic example showcasing a simple HTML5 + WebSockets interacting with a Loom DappChain, using [Phaser](http://phaser.io) and [Loom.js](https://github.com/loomnetwork/loom-js), this time using Web3 and Loom Provider to create a seamless experience for Ethereum Developers

![](/developers/img/websocket_evm.gif)


Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players

Development
----

### 1.) Run your own DappChain

Please consult the [Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

### 2.) Download the example project (Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/tiles-chain-evm
```

### 3.) Start the DappChain

```bash
cd tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4.) Start the web server

```bash
# On second terminal
cd tiles-chain-evm/webclient

# Install
yarn

# Start the demo
yarn start
```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`
