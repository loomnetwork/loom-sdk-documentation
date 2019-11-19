---
id: deploy-loom-testnet
title: Deploy to Loom Testnet
sidebar_label: Deploy to Loom Testnet
---

## Who Should Read This Document

This doc is for developers, and it aims to show how they can join the Loom Testnet and deploy their smart contracts. If you are looking for information on how to run nodes or to become a validator, please checkout our [Validator Guide](validator.html).

## Overview

Deploying to Basechain is no different from deploying to Ethereum mainnet, or to Rinkeby. If you know how to do one, you also know how to do the other.

Loom Network uses Truffle to build, test, and deploy our smart contracts. To make our life easier, we developed something called a provider that lets Truffle deploy to Basechain just like it deploys to Ethereum.

Without delving too much into details, the provider works like a bridge that makes Web3.js calls compatible with Basechain.

This document shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with Basechain.

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


### Deploy to the Loom Testnet

As an example, we will deploy and run our application against Loom Testnet.

Run the following command:

```bash
yarn deploy:extdev
```

>The above command will **compile and then deploy** our smart contract to the Loom Testnet.


## Testing

Run this command below to send transactions to the smart contract deployed to Loom Testnet:


```test
yarn test:extdev
```

If everything looks good, let's spin up a web server and interact with our smart contract.

## Start the Web Interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

The web interface is available on http://localhost:8080.

## Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also, is possible to call truffle directly with `yarn truffle`.

3. We're not versioning the build directory for this particular example, although is recommended to do so. The limitation can be removed by editing the `.gitignore` file.

