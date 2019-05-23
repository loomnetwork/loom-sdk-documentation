---
id: loom-js-loom-provider-web3
title: Loom.js + Web3.js
sidebar_label: Loom.js + Web3.js
---

# Overview

[Loom-js](https://github.com/loomnetwork/loom-js) comes with the `LoomProvider` which makes possible to connect with `web3.js` as a provider. This allows Ethereum developers to deploy and send transactions to smart contracts, listen for smart contracts events running inside the Loom DAppChains. For further details check out [EVM page](evm).

To get started install `loom-js`, run the following command:

```bash
yarn add loom-js
# or if you prefer...
npm install loom-js
```

# Instantiate the contract

## The SimpleContract

Let's say that we have a Solidity contract, which is already compiled and deployed on Loom DAppChain:

```solidity
pragma solidity ^0.4.22;

contract SimpleStore {
  uint value;

  event NewValueSet(uint);

  function set(uint _value) public {
    value = _value;
    emit NewValueSet(value);
  }

  function get() public view returns (uint) {
    return value;
  }
}
```

The Solidity compiler will generate the following ABI Interface:

```js
const ABI = [{
  "constant": false,
  "inputs": [{
    "name": "_value",
    "type": "uint256"
  }],
  "name": "set",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "get",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "",
    "type": "uint256"
  }],
  "name": "NewValueSet",
  "type": "event"
}]
```

Now, let's see how we can initialize the `loom-js` client:

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// This function will initialize and return the client
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws',
  )

  return client
}

// Setting up keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Client ready
const client = getClient(privateKey, publicKey)
```

Next, with the client ready, the next step is to instantiate `web3` as follows:

```js
const web3 = new Web3(new LoomProvider(client, privateKey))
```

We're now ready to instantiate the contract:

```js
// Getting our address based on public key
const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

// Get the contract address (we don't need to know the address just the name specified in genesis.json
const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

// Translate loom address to hexa to be compatible with Web3
const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

// Instantiate the contract
const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})
```

 Great! We’ve instantiated our Solidity contract. Next, we're going to show you how to make transactions and calls.

# Transactions and Calls

At this point, we can make transactions (by calling `send`) and calls (by calling `call`) like so:

```js
(async function () {
  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be 47
})()
```

# Events

It is possible to add event listeners to the contract, although there's no support for filters yet:

```js
(async function () {
  // Listen for new value set
  contract.events.NewValueSet({}, (err, newValueSet) {
    if (err) {
      console.error('error', err)
      return
    }

    console.log('New value set', newValueSet.returnValues)
  })
})()
```

## Putting it all together

Now that we have all the pieces in place, spin up a DAppChain and run the following snippet:

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider
} from '../loom.umd'

import Web3 from 'web3'

// This function will initialize and return the client
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws',
  )

  return client
}

// Setting up keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Client ready
const client = getClient(privateKey, publicKey)

// Setting the web3
const web3 = new Web3(new LoomProvider(client, privateKey))

;(async () => {
  // Set the contract ABI
  const ABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

  // Getting our address based on public key
  const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

  // Get the contract address (we don't need to know the address just the name specified in genesis.json
  const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

  // Translate loom address to hexa to be compatible with Web3
  const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

  // Instantiate the contract
  const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})

  // Listen for new value set
  contract.events.NewValueSet({}, (err, newValueSet) {
    if (err) {
      console.error('error', err)
      return
    }

    console.log('New value set', newValueSet.returnValues)
  })

  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be 47
})()

```

If all goes well, `Value: hello!` should get printed out to the console.
