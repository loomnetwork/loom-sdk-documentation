---
id: loom-js-loom-provider-web3
title: Loom.js + Web3.js
sidebar_label: Loom.js + Web3.js
---

# Overview

The `loom-js` comes with the `LoomProvider` which makes possible to connect with `Web3.js` as a provider allowing Ethereum developers to deploy and call smart contracts running inside the Loom DAppChains.

To get started install `loom-js` from NPM:

```shell
yarn add loom-js
# or if you prefer...
npm install loom-js
```

# Setting the Web3 provider

First let's connect with the DAppChain and obtain the function `getContract` as shown on [Loom.js quickstart](loom-js-quickstart), the main difference is that now we'll interact with the smart contract [evmproxy][] smart contract from Loom SDK or you can direct deploy on DAppChain by using the commands for deploy as shown on [EVM page](evm) which will not require any Go code. And the next step is instantiate of the `LoomProvider`:

```js
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

const web3 = new Web3(new LoomProvider(getContract(privateKey, publicKey)))
```

# Instantiate the contract

## The SimpleContract

Let's say that we have a Solidity contract, which is already compiled and deployed on Loom DAppChain

```
pragma solidity ^0.4.18;

contract SimpleStore {
  function set(uint _value) public {
    value = _value;
  }

  function get() public constant returns (uint) {
    return value;
  }

  uint value;
}
```

After compiled the contract will generate the follwing ABI Interface:

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
}]
```

Instantiate the contract from Loom DAppChain looks similar from instantiate from Ethereum Node, the main diferences are the `contract address` and the `from address` should be `0x0000000000000000000000000000000000000000`, or Web3 will raise an error at moment of instantiation, although in our case the function `getContract` already did the necessary steps, so let's satisfy the Web3 requirements to avoid errors.


```js
const contract = new web3.eth.Contract(ABI, '0x0000000000000000000000000000000000000000', {from: '0x0000000000000000000000000000000000000000'})
```

# Transactions and Calls

After the instantiation of the `Web3 Contract` we can use the contract methods for transactions (`send`) and calls (`call`) like so:

```js
(async function () {
  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be [47]
})()
```

## Putting it all together

Now that we have all the pieces in place make sure that you have the DAppChain running and then
run the following code, you should see `Value: hello!` printed to the console.

```js
(async function () {
  const privateKey = CryptoUtils.generatePrivateKey()
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const web3 = new Web3(new LoomProvider(getContract(privateKey, publicKey)))

  const contract = new web3.eth.Contract(ABI, '0x0000000000000000000000000000000000000000', {from: '0x0000000000000000000000000000000000000000'})

  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be [47]
  console.log(result[0])
})()
```

[evmproxy]: https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/evmproxy/contract/evmproxy.go
