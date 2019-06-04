---
id: web3js-loom-provider-truffle
title: Web3, LoomProvider and Truffle
sidebar_label: Web3, LoomProvider and Truffle
---

## Overview

The [loom-js](https://github.com/loomnetwork/loom-js) library comes with the `LoomProvider` which makes it possible to connect with `Web3.js` as a provider. This way, Ethereum developers can deploy, send transactions to smart contracts, and listen for smart contracts events running on Loom DAppChains. Also, it is possible to use [Truffle Framework](http://truffleframework.com/) to manage tests, deployments and solidity smart contracts. For further details check out [EVM page](evm).

### Web3

As the official documentation for `Web3.js` states:

> `Web3.js` is a collection of libraries which allow you to interact with a local or remote ethereum node, using an HTTP or IPC connection.

For the Loom DAppChains, the communication happens using `WebSockets` instead `HTTP` or `IPC`. However, in-depth knowledge isn't required since `Web3.js` abstracts that part.

### LoomProvider

A `Provider` is a bridge that connects the `Web3.js` API to an Ethereum node. So, in order to make `Web3.js` calls compatible with Loom DAppChain, you should use the `LoomProvider`

Combining `Web3.js` and `LoomProvider` is a good option to interact with smart contracts deployed on Loom DAppChain because `Web3.js` abstracts the construction of API calls.

## Deploying with Truffle

### Download and Install

First, you'll need to install `Truffle`:

```bash
# Currently supported version
npm install -g truffle
```

Once `Truffle` is installed, let's create a directory and initialize a project:

```bash
# Create directory and access
mkdir simple-store
cd simple-store

# Initialize a project from zero with truffle
truffle init
```

The new directory structure will look like this:

```
.
├── contracts
│   └── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
├── test
├── truffle-config.js
└── truffle.js
```

### Adding contract and migration

In the `contracts` directory, we're going to add the famous `SimpleStore.sol`, a smart contract which has:

 - a `set` function that takes a parameter called `_value` and changes the state by saving it to the blockchain. Then, it fires an event called `NewValueSet`.
 - a `get` function that lets you read the `value` variable.

```
pragma solidity ^0.4.22;

contract SimpleStore {
  uint value;

  event NewValueSet(uint _value);

  function set(uint _value) public {
    value = _value;
    emit NewValueSet(value);
  }

  function get() public view returns (uint) {
    return value;
  }
}
```

Next, let's add a migration, `Truffle` works with the concept of migrations, which makes it useful to track changes and updates. In the `migrations` directory, create a new file called `2_simple_store.js` and paste the following content into it:

```Javascript
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

> We've already built a complete example of how to integrate with Truffle. You can check it out [here](https://github.com/loomnetwork/truffle-dappchain-example).

### Download and configure Loom Truffle Provider

The last cog to be added is the `Loom Truffle Provider`. This plugin basically connects `Truffle` with the Loom DAppChain. Let's install it by running:

```bash
npm install loom-truffle-provider --save
#or
yarn add loom-truffle-provider
```

Now, let's edit the file `truffle.js` to add the necessary configuration:

```javascript
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

module.exports = {
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}
```

> Don't forget to generate your keys by running `loom genkey -a public_key -k private_key`.

### Running Truffle deploy command

Now we're ready to deploy our smart contract:

```bash
truffle deploy --network loom_dapp_chain
```

> We're assuming loom is already running on your computer. If not, follow [this tutorial](basic-install-all.html).

> If you already deployed and want to reset the deployment, you can run the command `truffle deploy --reset --network loom_dapp_chain`

### Adding more accounts

In order to access the `accounts` with `LoomTruffleProvider`, you should do something like this:

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)
```

To add more accouns, just call `createExtraAccounts`:

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
loomTruffleProvider.createExtraAccounts(10)
```

## Configuring and running Web3.js + LoomProvider

### Download and Install

Install `Web3.js`latest version using `npm`:

```bash
npm install web3 --save
# or
yarn add web3
```

Install `loom-js` which includes `LoomProvider`:

```bash
npm install loom-js --save
# or
yarn add loom-js
```

### Adding to project and configuring

To add `Web3.js` to a Node.js project is fairly simple:

```Javascript
// Node.JS 8 or greater
const Web3 = require('web3')

// Webpack with ES2016 support
import Web3 from 'web3'
```

> If you're using webpack, the process should be similar.

The next step is to configure the `LoomProvider`:

```Javascript
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString()

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey))

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const contractAddress = '0x...'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
```

### Running Web3 contract instance

Now, we can call `set` and `get` functions like this:

```Javascript
// Set the value 47
const tx = await contract.methods.set(47).send()

// Get the value 47
const value = await contract.methods.get().call()
```

Also, we can listen to events::

```Javascript
contract.events.NewValueSet({}, (err, event) => {
  if (err) {
    return console.error(err)
  }

  console.log('New value set', event.returnValues._value)
})
```
