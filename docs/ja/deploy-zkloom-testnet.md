---
id: deploy-zkloom-testnet
title: Deploying to zkLoom Testnet
sidebar_label: Deploy to zkLoom Testnet
---

## Overview

If you have previous experience deploying contracts using **Hardhat** then you'll find deploying to Loom Network’s zkLoom Sepolia Testnet quite straightforward.

The zkLoom Sepolia Testnet is a zkRollup that operates a bit differently from an Ethereum Testnet, but thanks to a few Hardhat plugins built by zkSync,
building, testing, and deploying smart contracts to the zkLoom Sepolia Testnet should be as easy as working with an Ethereum-like Testnet.

In this particular example we'll show you how to compile and deploy a simple Solidity smart contract to the zkLoom Sepolia Testnet.

## Requirements

Make sure the following requirements are met before proceeding to the next section.

- NodeJS `v18.20.0`, we recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to make it easier to switch between NodeJS versions.
- yarn `v1.22.19`, if you don't have it installed already the easiest way to do so is probably via `npm i -g yarn`, then just run `yarn set version 1.22.19`

Newer versions of NodeJS and Yarn may also work.

## Install project dependencies

First, clone the [zkLoom examples](https://github.com/loomnetwork/zkloom-examples) repository using your favorite Git client.

Once you've cloned the repository open the checkout directory in a terminal, and run the following commands:

```bash
cd 01-testnet-deploy
yarn install
```

## Compile the Solidity contract

We'll be deploying the `SimpleStore.sol` contract that you can find in the `contracts` directory.

```bash
yarn hardhat compile
```

The first time you compile the contract you should see output similar to this:
```
zksolc version 1.4.0 successfully downloaded
...
Compiling 1 Solidity file
--> contracts/SimpleStore.sol

Successfully compiled 1 Solidity file
```

You'll notice that the `artifacts-zk` and `cache-zk` directories have been created during the compilation step,
they'll be used again during deployment.

## Set the private key for deployment

Before you can deploy the Solidity contract you just compiled you'll need to generate a private key.
You'll need a standard hex encoded ECDSA key, same kind of key you'd use for signing any Ethereum transactions.
If you have Metamask you can use it to create a new account and export the private key.
Once you have the private key set it in the `WALLET_PRIVATE_KEY` env var.
```bash
export WALLET_PRIVATE_KEY=0x...
```

## Fund the deployer account

The account associated with the private key you use for the contract deployment needs to have some testnet `ETH`
to pay for the deployment transaction.

You can get testnet `ETH` by popping into the [Loom Network - Developer Chat](https://t.me/loomnetworkdev)
on Telegram and asking for some, just mention your account address and we'll send some your way ASAP.

Soon we'll launch a bridge that will allow you to deposit ETH from Sepolia to the zkLoom Sepolia Testnet.

## Deploy the contract to zkLoom Sepolia Testnet

Contracts can be deployed to the zkLoom Sepolia Testnet using the `hardhat deploy-zksync` command:

```bash
yarn hardhat deploy-zksync --script deploy-simple-store.ts
```

If all goes well you should see output similar to this:
```
Deploying SimpleStore using account 0xe706e60ab5Dc512C36A4646D719b889F398cbBcB
Contract deployment fee estimate: 0.00012952175 ETH
SimpleStore was deployed at 0xfb6c71bDFaddC830443b0c5157782Cae4E6a426f
```

And that's a wrap! Now that you understand how to deploy a Solidity contract to the zkLoom Sepolia Testnet
the next step is to interact with it. We'll cover that in the next example... coming soon!