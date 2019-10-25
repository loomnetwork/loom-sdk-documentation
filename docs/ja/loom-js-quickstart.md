---
id: loom-js-quickstart
title: NodeJS & Browser Quick Start
sidebar_label: NodeJS & Browser Quick Start
---

## Overview

The [Loom-js](https://github.com/loomnetwork/loom-js) library contains everything you need to build web apps and NodeJS services that interact with your smart contracts running on Loom.

You can install `loom-js` by running the following command:

```bash
yarn add loom-js
# or if you prefer...
npm install loom-js
```

## Sample Code

In this tutorial, we're reproducing a few snippets from the [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) repository. Make sure to check out the full source code once you finish this tutorial.

## Initializing the Application

To interact with the smart contract deployed to Loom, we define a class called [Contract](https://github.com/loomnetwork/truffle-dappchain-example/blob/14d8d8bfd955512d80cce4cbe7714738a81dedb2/src/contract.js#L8). Let's look at what's inside.

First, we create a `client` that will help our application "talk" to Loom:

```js
_createClient() {
  this.privateKey = CryptoUtils.generatePrivateKey()
  this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
  let writeUrl = 'ws://127.0.0.1:46658/websocket'
  let readUrl = 'ws://127.0.0.1:46658/queryws'
  let networkId = 'default'
  if (process.env.NETWORK == 'extdev') {
    writeUrl = 'ws://extdev-plasma-us1.dappchains.com:80/websocket'
    readUrl = 'ws://extdev-plasma-us1.dappchains.com:80/queryws'
    networkId = 'extdev-plasma-us1'
  }

  this.client = new Client(networkId, writeUrl, readUrl)

  this.client.on('error', msg => {
    console.error('Error on connect to client', msg)
    console.warn('Please verify if loom command is running')
  })
}
```

Next, we want to retrieve the user's address:

```js
_createCurrentUserAddress() {
  this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString()
}
```

And instantiate `LoomProvider`:

```js
_createWebInstance() {
  this.web3 = new Web3(new LoomProvider(this.client, this.privateKey))
}
```

At this point, we are ready to create an instance of the smart contract and start listening to events:

```js
async _createContractInstance() {
  const networkId = await this._getCurrentNetwork()
  this.currentNetwork = SimpleStore.networks[networkId]
  if (!this.currentNetwork) {
    throw Error('Contract not deployed on DAppChain')
  }

  const ABI = SimpleStore.abi
  this.simpleStoreInstance = new this.web3.eth.Contract(ABI, this.currentNetwork.address, {
    from: this.currentUserAddress
  })

  this.simpleStoreInstance.events.NewValueSet({ filter: { _value: 10 }}, (err, event) => {
    if (err) console.error('Error on event', err)
    else {
      if (this.onEvent) {
        this.onEvent(event.returnValues)
      }
    }
  })

  this.simpleStoreInstance.events.NewValueSetAgain({ filter: { _value: 47 }}, (err, event) => {
    if (err) console.error('Error on event', err)
    else {
      setTimeout(() => alert("Loooomy help me :)"))
      if (this.onEvent) {
        this.onEvent(event.returnValues)
      }
    }
  })
}

addEventListener(fn) {
  this.onEvent = fn
}
```

## Writing data to Loom

Here's how you can write data to Loom and mutate the state of your smart contract:

```js
async setValue(value) {
  // Just a small test with Loomy
  if (value == 47) {
    return await this.simpleStoreInstance.methods.setAgain(value).send({
      from: this.currentUserAddress
    })
  }

  return await this.simpleStoreInstance.methods.set(value).send({
    from: this.currentUserAddress
  })
}
```

## Reading data from Loom

Reading data from Loom is as simple as:

```js
async getValue() {
  return await this.simpleStoreInstance.methods.get().call({
    from: this.currentUserAddress
  })
}
```