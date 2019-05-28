---
id: basic-install-all
title: Installation Loom SDK
sidebar_label: Installation Loom SDK
---

# Installing and setting up Loom

Currently the only way to use Loom on windows is to use the   [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Once you install that you can continue on below.

## Download loom

The following script can be used to automatically download the stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## Installation

```bash
./loom init
```

## Run Blockchain

Run from within the directory created in the installation step.

```bash
./loom run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](join-testnet.html)

## To get started with Golang Contracts

See our [Golang Contracts](prereqs-all.html)


## To get started with universal transaction signing

Loom Mainnet has the ability to verify and accept transactions signed by native Ethereum wallets. In a nutshell, users can simply use their MetaMask account or any other native Ethereum wallet — further blending the line between Layer 1 and Layer 2.


### Demo Project

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).
