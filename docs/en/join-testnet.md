---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

## Who Should Read This Document

This doc is for developers, and it aims to show how they can join the Loom Testnet and deploy their smart contracts. If you are looking for information on how to run nodes or to become a validator, please checkout our [Validator Guide](validator.html).

## Overview

Deploying to Loom PlasmaChain is no different from deploying to the Ethereum main net, or to Rinkeby. If you know how to do one, you also know how to do the other.

We at Loom are using Truffle to build, test, and deploy our smart contracts. To make our life easier, we developed something called a provider that lets Truffle deploy to Loom PlasmaChain just like it deploys to Ethereum.

Without delving too much into details, the provider works like a bridge that makes Web3.js calls compatible with Loom PlasmaChain.

This document shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with Loom PlasmaChain.

## Requirements

Make sure the following requirements are met and then follow the steps in the next section:

```text
Node >= 8
yarn or npm
```

## Setting Things Up

First, let's clone the [Truffle DAppChainExample](https://github.com/loomnetwork/truffle-dappchain-example/) repository. Open a terminal, `cd` into the directory where you store your projects, and run the following command:

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

Next, `cd` into `truffle-dappchain-example`:

```bash
cd truffle-dappchain-example
```

and run:

```bash
yarn install
```

## Run against Loom Testnet

### Generate the Loom private key

The following command will download the `loom` binary and generate the private key for you:

```bash
yarn gen:extdev-key
```

> The Loom private key will be saved into a file called `extdev_private_key`.


### Deploy to extdev_plasma_us1

As an example, we will deploy and run our application against `extdev_plasma_us1`.

Run the following command:

```bash
yarn deploy:extdev
```

>The above command will **compile and then deploy** our smart contract to `extdev_plasma_us1`


## Testing

Run this command below to send transactions to the smart contract deployed to `extdev_plasma_us1`:


```test
yarn test:extdev
```

If everything looks good, let's spin up a web server and interact with our smart contract.

## Start the Web Interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

> The web interface is available on http://localhost:8080.


## Run Against Local Loom Chain

The following command will download the loom binary and generate a new private key:

```bash
yarn gen:loom-key
```

> The Loom private key will be saved into a file called `loom_private_key`.

### Spin up Loom Chain

In a new terminal, run:

```bash
yarn loom:init
```

and then:

```bash
yarn loom:run
```

### Deploy the Smart Contract

To deploy, run the following command:

```bash
yarn deploy
```

### Testing

You can test the smart contract using:

```bash
yarn test
```

### Web interface

We're ready to start the web server. In a new terminal, type:

```bash
yarn serve
```

## Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also, is possible to call truffle directly with `yarn truffle`.

3. We're not versioning the build directory for this particular example, although is recommended to do so. The limitation can be removed by editing the `.gitignore` file.