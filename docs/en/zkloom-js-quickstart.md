---
id: zkloom-js-quickstart
title: zkLoom Quick Start
sidebar_label: zkLoom Quick Start
---

## Overview

This tutorial starts from where we left off in the [Deploy to zkLoom Testnet](deploy-zkloom-testnet.html) tutorial, so if you haven't completed that tutorial yet please do so now.

You should already be familiar with setting up a development environment for writing and deploying smart contracts to the zkLoom Testnet.

Now, lets take a look at how you can read and write data to a smart contract from a Javascript frontend. 

## Setup

We're going to skip any setup related to a specific web framework and let you pick your favorite one, it should be trivial to adapt the following code to React, Vue, Angular, Svelte, etc.

In addition to the dependencies you may need to install for your web framework of choice you'll also need to install `ethers` and `zksync-web3`:

```bash
# if you use NPM...
npm install ethers@^5.7.2 zksync-web3
# or, if you use Yarn...
yarn add ethers@^5.7.2 zksync-web3
```

Next, you'll need to copy the `SimpleStore` contract ABI from the `01-testnet-deploy/artifacts-zk/contracts/SimpleStore.sol/SimpleStore.json` file you should have left over from the first tutorial to a new `abi.json` file in your new project directory. The contents of the `abi.json` should look similar to this:

```json
[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "ValueChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

## Creating a `Contract` instance

At this point, we are ready to create a Web3 `Contract` instance that's bound to our previously deployed `SimpleStore` smart contract:

```js
import { Contract, Web3Provider, Provider } from "zksync-web3";

// the previously deployed contract's address
const SIMPLESTORE_CONTRACT_ADDRESS = "";
const SIMPLESTORE_CONTRACT_ABI = require("./abi.json");

init() {
    this.provider = new Provider('http://zkloom-t1.dappchains.com:2052');
    // we'll be using the MetaMask wallet to sign transactions
    this.signer = (new Web3Provider(window.ethereum)).getSigner();
    this.contract = new Contract(
        SIMPLESTORE_CONTRACT_ADDRESS,
        SIMPLESTORE_CONTRACT_ABI,
        this.signer
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
    const txHandle = await this.simpleStore.setValue(value);
    // wait for the tx to be committed
    await txHandle.wait();
  } catch (e) {
    console.error(e);
  }
}
```

> NOTE: If you're using *MetaMask* to interact with zkLoom you may occasionaly encounter a `wallet_requestPermissions` error. In that case you should reload the page and look out for a permission request popup from MetaMask.

## Reading data from a smart contract

Reading data from a smart contract deployed on zkLoom is as simple as:

```js
// the returned value will be a string
async getValue() {
  return await this.simpleStore.getValue()
}
```

## Estimating transaction fees

No one likes paying transaction fees, but they are an unfortunate necessity due to the cost of distributed compute and storage. When building dapps we think it's important to make it clear to users how much they should expect to pay for each interaction with a smart contract as soon as possible, preferrably before redirecting them to their wallet of choice.

Here's an example of estimating the transaction fee of changing the value stored in the `SimpleStore` contract:
```js
import { ethers } from "ethers";

// value is expected to be a string
async getFee(value) {
  const feeInGas = await this.simpleStore.estimateGas.setValue(value);
  const gasPrice = await this.provider.getGasPrice();
  // convert the fee to a human-readable format
  // e.g. 500000000000000000 wei of ETH -> 0.5 ETH
  return ethers.utils.formatUnits(feeInGas.mul(gasPrice), 18);
}
```

## Wrapping up

At this point you should be quite comfortable writing, deploying, and interacting with Solidity smart contracts on the zkLoom testnet. If you have any prior experience with deploying Solidity smart contracts to Ethereum then you can probably see that interacting with the zkLoom testnet is very similar.

In the next tutorial we'll be covering a unique feature of zkLoom that allows users to pay transaction fees in different tokens!
