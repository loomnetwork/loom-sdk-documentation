---
id: unity-sample-tiles-chain-evm
title: Tiles EVM Example
sidebar_label: Tiles EVM Example
---

A basic example showcasing a simple Unity game interacting with an EVM-based Loom DappChain, using [Loom Unity SDK](https://github.com/loomnetwork/unity3d-sdk).
Prefer video? Here's a walkthrough of this documentation [Video](/developers/img/tiles-evm-walkthrough.mov)

![](https://camo.githubusercontent.com/9d49b0ce78d692e69d1dd571bc8d1aafe5b806a8/68747470733a2f2f647a776f6e73656d72697368372e636c6f756466726f6e742e6e65742f6974656d732f315232363044327030713370304d33693232304a2f53637265656e2532305265636f7264696e67253230323031382d30352d3232253230617425323031302e3233253230414d2e6769663f763d3961353539316139)

Game instructions
----

Use the mouse cursor to click on the black canvas area to create colored tiles, each new player will have a different color on the canvas which is shared amongst all players.

Development
----

### 1. Run your own DappChain

Please consult the [Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

### 2. Download the example project (Unity Tiles Chain EVM)

```bash
git clone https://github.com/loomnetwork/unity-tiles-chain-evm
```

### 3. Start the DappChain

```bash
cd unity-tiles-chain-evm

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-375/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 4. Build the Unity client
Open the Unity project located in `unityclient` folder. Open the `LoomTilesChainEvm` scene and build it.
