---
id: zkloom-js-quickstart
title: zkLoom Quick Start
sidebar_label: zkLoom Quick Start
---

## Overview

This tutorial starts from where we left off in the [Deploy to zkLoom Testnet](deploy-zkloom-testnet.html) tutorial, so if you haven't completed that tutorial yet please do so now.

You should already be familiar with setting up a development environment for writing and deploying smart contracts to the zkLoom Sepolia Testnet.

Now, lets take a look at how you can read data from a smart contract, and write to it from a Javascript frontend. 

## Setup

We're going to skip any setup related to a specific web framework and let you pick your favorite one, it should be trivial to adapt the following code to React, Vue, Angular, Svelte, etc.

In addition to the dependencies you may need to install for your web framework of choice you'll also need to install `ethers` and `zksync-ethers`:

```bash
# if you use NPM...
npm install ethers@^6.9.2 zksync-ethers@^6.0.0
# or, if you use Yarn...
yarn add ethers@^6.9.2 zksync-ethers@^6.0.0
```

After compiling the contract in the previous tutorial, you should locate `01-testnet-deploy/artifacts-zk/contracts/SimpleStore.sol/SimpleStore.json`
and copy it to your current project, where you copy it to doesn't particularly matter, but in this tutorial we'll assume you've copied it to
`artifacts-zk/contracts/SimpleStore.sol/SimpleStore.json`.

## Creating a `Contract` instance

At this point, we are ready to create a `Contract` instance that's bound to our previously deployed `SimpleStore` smart contract:

```js
import { Contract, BrowserProvider } from "zksync-ethers";
import { ethers } from "ethers";

import * as SimpleStoreArtifact from "./artifacts-zk/contracts/SimpleStore.sol/SimpleStore.json";

// the previously deployed contract's address
const SIMPLESTORE_CONTRACT_ADDRESS = "";
let provider = null;
let simpleStore = null;

async init() {
  // we'll be using the MetaMask wallet to sign transactions
  provider = new BrowserProvider((window as any).ethereum, "any");
  const signer = await provider.getSigner();
  simpleStore = new Contract(
    SIMPLESTORE_CONTRACT_ADDRESS,
    SimpleStoreArtifact.abi,
    signer
  );
}
```

The only thing left to do is to set the `SIMPLESTORE_CONTRACT_ADDRESS` in the code snippet above to the address of the previously deployed contract, it should be prefixed by `0x`, e.g. `0xfb6c71bDFaddC830443b0c5157782Cae4E6a426f`. If you don't recall the address of the contract you deployed in the first tutorial you can go back and re-run the `yarn hardhat deploy-zksync --script deploy-simple-store.ts` to redeploy it.

## Writing data to a smart contract

Here's how you can write data to the on-chain state of a smart contract deployed on zkLoom:

```js
// value is expected to be a string
async setValue(value) {
  try {
    // submit a tx to zkLoom
    const txHandle = await simpleStore.setValue(value);
    // wait for the tx to be committed
    await txHandle.wait();
  } catch (e) {
    console.error(e);
  }
}
```

## Reading data from a smart contract

Reading data from a smart contract deployed on zkLoom is as simple as:

```js
// the returned value will be a string
async getValue() {
  return await simpleStore.getValue()
}
```

## Estimating transaction fees

No one likes paying transaction fees, but they are an unfortunate necessity due to the cost of distributed compute and storage. When building dapps we think it's important to make it clear to users how much they should expect to pay for each interaction with a smart contract as soon as possible, preferrably before redirecting them to their wallet of choice.

Here's an example of estimating the transaction fee of changing the value stored in the `SimpleStore` contract:
```js
// value is expected to be a string
async getFee(value) {
  const feeInGas = await simpleStore.setValue.estimateGas(value);
  const gasPrice = await provider.getGasPrice();
  // convert the fee to a human-readable format
  // e.g. 123000000000000000 wei -> 0.123 ETH
  return ethers.utils.formatUnits(feeInGas * gasPrice, 18);
}
```

## Wrapping up

At this point you should be quite comfortable writing, deploying, and interacting with Solidity smart contracts on the zkLoom Sepolia Testnet.
If you have any prior experience with deploying Solidity smart contracts to Ethereum then you can probably see that interacting with the zkLoom Sepolia testnet is very similar.

In the next tutorial we'll be covering a unique feature of zkLoom that allows users to pay transaction fees in different tokens!
