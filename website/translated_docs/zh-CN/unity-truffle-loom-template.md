---
id: unity-truffle-loom-template
title: Unity + Truffle + Loom Template
sidebar_label: Unity + Truffle + Loom Template
---
# 概览

A template for a Loom DAppChain with a Unity client. **Contains:**

- Template [`Blueprint` Solidity contract](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol) implementing a basic string-to-string map. Perfect as a starting point.
- Pre-configured Truffle project that automatically extracts ABIs and binaries of compiled contracts into corresponding folders.
- Ready to use Unity Project, that uses the `Blueprint` Contract from the Loom SDK

# Template Structure

```shell
├── DAppChain/
│   ├── build/ # Loom binary and app/blockchain state data will be stored here
│   │   ├── contracts/ # Compiled contracts .bin will go here
│   │   └── ...
│   ├── start-chain.sh # Starts the Loom DAppChain
│   ├── reset-and-start-chain.sh ## Resets app/blockchain state and starts the Loom DAppChain
│   ├── genesis.json # Change this file when changing/adding contracts
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unity client project
    ├── Assets/
    │   ├── Contracts/ # Contract ABIs will go here
    │   └── ...
    └── ...
```

* * *

## Getting the Template

First, you need to install Truffle, if it isn't installed already:

```shell
npm install -g truffle
```

After that, you can download the template itself:

```shell
git clone https://github.com/loomnetwork/loom-unity-project-template.git
```

Feel free to rename the `loom-unity-project-template` folder right away according to the name of your project.

## Building the Truffle Project

```shell
# Build the Truffle project. This will extract the ABI files to the Unity client,
# and compiled contracts to the DAppChain/build/ directory

cd Truffle
truffle build
```

## Running the DAppChain

```shell
# Start the Loom DAppChain. Loom binary will be downloaded automatically

cd DAppChain
./start-chain.sh
```

## Running the Unity client

Open the Unity project located in `UnityClient`. Open the `Blueprint/BlueprintTest` scene and run/build it.

# Workflow

1. Make changes to the contracts.
2. Build the Truffle project using `truffle build`.
3. Start the Loom DAppChain using `DAppChain/start-chain.sh`.
4. Make changes to the Unity client project.