---
id: intro-loom-sdk
title: What is Loom Network?
sidebar_label: Intro Loom SDK
---

![What is Loom Network?](/developers/img/what-is-loom.png)

Loom Network is building a fundamental infrastructure platform to help Ethereum scale. It allows developers to run large-scale applications and is the first Ethereum scaling solution to be live in production.

In short, you can think of Loom Network as EOS on top of Ethereum.

# What is the Loom SDK?

Our core product is an SDK that allows developers to quickly build their own blockchains without having to understand blockchain infrastructure. Think of it like a “build your own blockchain” generator.

## What is PlasmaChain?

So, the Loom SDK allows for developers to spin up an unlimited number of sidechains to scale their dapps as needed — a crucial piece in our long-term vision of blockchain scalability, and one that is now being used by multiple games and dapps in production.

But PlasmaChain will be the central hub that all these chains connect to as their bridge to Ethereum, for interchain communication with other major blockchains (such as Cosmos, EOS, and Tron), and as a shared liquidity pool for tokenized assets.

Thus, our company’s primary objectives over the next year are all related to growing PlasmaChain to become the “universal Layer 2” for high performance dapps.

In the next chapter, you will learn how to deploy your first app to Loom PlasmaChain. Let's get started!

## Deploying Your First App

Deploying to Loom PlasmaChain is no different from deploying to the Ethereum main net, or to Rinkeby. If you know how to do one, you also know how to do the other.

We at Loom are using Truffle to build, test, and deploy our smart contracts. To make our life easier, we developed something called a provider that lets Truffle deploy to Loom PlasmaChain just like it deploys to Ethereum.

Without delving too much into details, the provider works like a bridge that makes Web3.js calls compatible with Loom PlasmaChain.

This chapter shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with Loom PlasmaChain.

### Requirements

Make sure the following requirements are met and then follow the steps in the next section:

```text
Node >= 8
yarn or npm
```

### Install

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

### Run against Loom Testnet

#### Generate the Loom private key

The following command will download the `loom` binary and generate the private key for you:

```bash
yarn gen:extdev-key
```

> The Loom private key will be saved into a file called `extdev_private_key`.

#### Deploy to extdev_plasma_us1

As an example, we will deploy and run our application against `extdev_plasma_us1`.

Run the following command:

```bash
yarn deploy:extdev
```

> The above command will **compile and then deploy** our smart contract to `extdev_plasma_us1`

#### Test

Run this command below to send transactions to the smart contract deployed to `extdev_plasma_us1`:

```test
yarn test:extdev
```

If everything looks good, let's spin up a web server and interact with our smart contract.

#### Start the web interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

> The web interface is available on http://localhost:8080.

### Run against local Loom chain

First, you have to generate a private key using:

```bash
yarn gen:loom-key
```

#### Spin up Loom Chain

In a new terminal, run:

```bash
yarn loom-init
```

#### Deploy the smart contract

To deploy, run the following command:

```bash
yarn deploy
```

You will see something like this:

```text
Starting migrations...
======================
> Network name:    'loom_dapp_chain'
> Network id:      13654820909954
> Block gas limit: 0
```

Copy the `Network id` paste it into a text file. We'll use it later.

#### Test

    yarn test
    

### Web interface

Open the `src/contract.js` file in your text editor of choice and go to line 87.

Now, say your `Network id` is `13654820909954`. Replace

```javascript
return Promise.resolve('default')
```

with

```javascript
return Promise.resolve('13654820909954')
```

We're ready to start the web server. In a new terminal, run:

```bash
yarn serve
```

### Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also, is possible to call truffle directly with `yarn truffle`.

3. We're not versioning the build directory for this particular example, although is recommended to do so. The limitation can be removed by editing the `.gitignore` file.