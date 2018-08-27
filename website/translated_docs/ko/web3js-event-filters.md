---
id: web3js-event-filters
title: Web3 event filters
sidebar_label: Web3 event filters
---

## Overview

The [Web3.js](https://github.com/ethereum/web3.js) library allows developers to easily listen for events from the [EVM](evm.html) 
contained on Loom DAppChain. Also is possible to create filter for indexed values.

## Filtering 

Let's create a filter to get latest block created on Loom DAppChain and continuously print the block hash on console

```js
const {
  Client, CryptoUtils, LoomProvider
} = require('loom-js')
const Web3 = require('web3')

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46657/websocket',
  'ws://127.0.0.1:9999/queryws',
);

// Create private key for first account
const privateKey = CryptoUtils.generatePrivateKey()

// Instantiate web3 client using LoomProvider as provider
const web3 = new Web3(new LoomProvider(client, privateKey));

// Create filter to get the latest block
const filter = web3.eth.filter('latest');

// Watch filter will return the hash of the latest block continuously 
filter.watch(function (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log('Block hash', result)
```

## Filtering by indexed values

Another great feature is filtering by `indexed` values, which can be used to trigger event handlers when a specific `indexed` value is emitted.

For the following contract:

```solidity
pragma solidity ^0.4.22;

contract SimpleStore {
  uint value;

  constructor() {
      value = 10;
  }

  event NewValueSet(uint indexed _value);

  function set(uint _value) public {
    value = _value;
    emit NewValueSet(value);
  }
}
```

It's possible to setup an event handler for the `NewValueSet` event that's only triggered when the `value` emitted is `10`, and it won't be triggered if the contract emits any other value.

```js
// Generate public and private keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46657/websocket',
  'ws://127.0.0.1:9999/queryws',
)

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString()

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey))

// ABI for the contract
const ABI = [
  {
    constant: false,
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'set',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: '_value', type: 'uint256' }],
    name: 'NewValueSet',
    type: 'event'
  }
]

// Address of the contract deployed
const contractAddress = '0x...'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})

// Subscribe for listen the event NewValueSet
contract.events.NewValueSet({ filter: { _value: 10 } }, (err: Error, event: any) => {
  if (err) t.error(err)
  else {
    // Print on terminal only when value set is equal to 10
    console.log('The value set is 10')
  }
})
```








