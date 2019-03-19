---
id: basic-install-all
title: Installation Loom SDK
sidebar_label: Installation Loom SDK
---
# Installing and setting up Loom

현재 Windows에서 Loom을 사용하는 유일한 방법은 [Linux를 위한 Windows Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10)을 사용하는 것입니다.

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

## To get started on Golang Contracts

See our [Golang Contracts](prereqs-all.html)