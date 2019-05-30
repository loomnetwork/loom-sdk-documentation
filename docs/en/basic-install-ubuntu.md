---
id: basic-install-linux
title: Installation (Linux)
sidebar_label: Installation (Linux)
---

# Installing and setting up Loom on Linux

## Download loom

The following script automatically downloads the latest stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## Initialize

To initialize loom, type:

```bash
./loom init
```

## Run Blockchain

Run the following command from within the directory created in the installation step:

```bash
./loom run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](truffle-deploy.html)


## To get started on Golang Contracts

See our [Golang Contracts](prereqs.html)

## Setup a production cluster

Note that Linux is only supported OS for Production clusters.

See docs on [Production clusters](multi-node-deployment.html)
