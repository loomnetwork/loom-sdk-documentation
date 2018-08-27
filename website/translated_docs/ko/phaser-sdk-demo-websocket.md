---
id: phaser-sdk-demo-websocket
title: Javascript WebSockets Demo
sidebar_label: Phaser + Websockets Demo
---
A basic example showcasing a simple HTML5 + WebSockets interacting with a Loom DappChain, using [Phaser](http://phaser.io) and [Loom.js](https://github.com/loomnetwork/loom-js). Source is on [Github Websocket Demo](https://github.com/loomnetwork/tiles-chain)

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

## Game instructions

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players

## Development

### 1.) Download the example project (Tiles Chain)

```bash
git clone https://github.com/loomnetwork/tiles-chain
```

### 2.) Start the DappChain

```bash
cd tiles-chain
mkdir tmpgopath
export GOPATH=`pwd`/tmpgopath

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# Compile
export GOPATH=$GOPATH:`pwd`
make deps
make

# Configure
cd build
../loom init
cp ../genesis.example.json genesis.json

# Run
../loom run
```

### 3.) Start the web server

```bash
cd tiles-chain/webclient

# Install
yarn

# Compile protobuf
yarn run proto

# Start the demo
yarn start

```

### 5.) Running

The Tiles-Chain web interface will be available on `http://localhost:9000`
