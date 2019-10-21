---
id: updradable-smart-contracts-with-openzeppelin-sdk
title: Upgradable Smart Contracts with OpenZeppelin SDK
sidebar_label: Upgradable Smart Contracts with OpenZeppelin SDK
---

## Purpose

This guide will walk you through the process of deploying an [upgradable smart contract](https://docs.openzeppelin.com/sdk/2.5/writing-contracts) using the [OpenZeppelin SDK](https://docs.openzeppelin.com/sdk/).

## Prerequisites

- Node.js 10 or higher (recommended v10.15.3). You can download the installer from [this page](https://nodejs.org/en/download/)

- Yarn. Follow [these instructions](https://yarnpkg.com/lang/en/docs/install/) to install Yarn on your computer.

## Setting Things Up

The first step is to install the `OpenZeppelin SDK`. In a terminal window, move into the directory where you want to save the new project, and enter the following commands:

```bash
mkdir upgradable-contracts && cd upgradable-contracts

# Setting up the packages
yarn add -D @openzeppelin/cli@2.5.3 js-sha256 loom-js@dev loom-truffle-provider@dev

# Intialize OpenZeppelin SDK
yarn openzeppelin init upgradable-contracts 1.0.0
```

> Note: We're using the developer versions of `loom-js` and `loom-truffle-provider`.

The above command creates a bunch of directories and files. For the scope of this tutorial we'll be using:

* The `networks.js`file which stores the deployment configuration. If you're familiar with Truffle, this file is similar to the `truffle-config.js` file.
* The `contracts` directory where we'll place our smart contracts.

## Configuring LoomTruffleProvider

Now, let's configure OpenZeppelin to use `loom-truffle-provider` and deploy to Loom Testnet (`extdev`). Replace the content of the `networks.js` file with the following snippet:

```js
const LoomTruffleProvider = require('loom-truffle-provider')
const { sha256 } = require('js-sha256')
const { CryptoUtils } = require('loom-js')
function getLoomProviderWithMnemonic (seed, chainId, writeUrl, readUrl) {
 const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)))
 const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed)
 return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64)
}
module.exports = {
 networks: {
 extdev: {
 provider: function() {
 const chainId = 'extdev-plasma-us1'
 const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
 const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/eth'
 const seed = 'gravity top burden flip student usage spell purchase hundred improve check genre'
 const loomTruffleProvider = getLoomProviderWithMnemonic(seed, chainId, writeUrl, readUrl)
 // Quick implementation for web3_clientVersion
 loomTruffleProvider.getProviderEngine().addCustomMethod('web3_clientVersion', () => {
 return 'loom-js'
 })
 return loomTruffleProvider
 },
 networkId: '*',
 },
 },
}
```

## Your First Contract

> Note: The next sections are using almost the same steps as the OpenZeppelin tutorial on working with upgradable contracts. However, to make this tutorial easier to follow, we'll also present these steps here.

In the `contracts` directory, let's create a file called `Counter.sol` with the following content:

```solidity
pragma solidity ^0.5.0;

contract Counter {
 uint256 public value;

 function increase() public {
 value++;
 }
}
```

Now let's deploy our smart contract and call the `increase` function by running the `yarn openzeppelin create` command and passing the following arguments:

* The name of the smart contract (`Counter`)
* the `--network` flag with the name of the network we want to deploy our smart contract to (`extdev`)
* the `--init` flag with the name of the function we want to call once the contracts gets deployed (`increase`)

```bash
yarn openzeppelin create Counter --network extdev --init increase
```


```
✓ Setting everything up to create contract instances
✓ Instance created at 0x879d15B21DE431E9520D6880E46Df374F7abB2a3
0x879d15B21DE431E9520D6880E46Df374F7abB2a3
✨ Done in 360.73s.
```

> The `--init` flag is very useful because you can't use constructors with the OpenZeppelin SDK. For more details, please refer to the [OpenZeppelin SDK Upgrades Pattern]https://docs.openzeppelin.com/sdk/2.5/pattern#the-constructor-caveat) page.


### Send-TX and Call

Now that our contract is deployed, let's send a transaction by running the `yarn openzeppelin send-tx` and passing it the following flags:

* `--network` with the name of the network we deployed our smart contract to (`extdev`).
* `--to` with the address of the `Counter` smart contract. In our example the address is `0x879d15B21DE431E9520D6880E46Df374F7abB2a3` but yours will be different.

* `--method` with the name of the method we want to call (`increase`)

Example:

```
yarn openzeppelin send-tx --network development --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method increase
```

```
yarn run v1.13.0
warning package.json: No license field
$ /Users/andrei/upgradable-contracts/node_modules/.bin/openzeppelin send-tx --network development --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method increase
✓ Transaction successful. Transaction hash: 0x32bea9c1f7d6fa8c522273bcae593c9ed1d072f93a256ba2a39a73b47b6203dd
✨ Done in 9.11s.
```

Now, let's call the `value` method:

```
yarn openzeppelin call --network extdev --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method value
```

You should see something like the following printed out to the console:

```
yarn run v1.13.0
warning package.json: No license field
$ /Users/andrei/upgradable-contracts/node_modules/.bin/openzeppelin call --network extdev --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method value
✓ Method 'value' returned: 2
2
✨ Done in 3.11s.
```

### Upgrading Your Contract

Next, let's upgrade the `Counter` smart contract. The `increase` function will now take the `amount` we want to increase the counter with as an argument.

Replace the content of the `contracts/Counter.sol` file with the following code:

```solidity
pragma solidity ^0.5.0;

contract Counter {
 uint256 public value;

 function increase(uint256 amount) public {
 value += amount;
 }
}
```

Next, let's run the `upgrade` command like this:

```bash
# Upgrading the contract Counter
yarn openzeppelin upgrade Counter --network extdev
```

```
✓ Compiled contracts with solc 0.5.12 (commit.7709ece9)
✓ Contract Counter deployed
All contracts have been deployed
? Do you want to call a function on the instance after upgrading it? No
✓ Instance upgraded at 0x879d15B21DE431E9520D6880E46Df374F7abB2a3. Transaction receipt: 0xbd665a22e6191664bad1dc8ab39db6d18c9abec3ba19139b1ee02c769b8f3bd3
✓ Instance at 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 upgraded
✨ Done in 66.80s.
```

> The above command will prompt you to call a function. Just answer `No` when prompted. We'll do this in the next step.

Great! The `Counter` contract is updated, and the address is the same. Let's now run the `send-tx` and `call` function again to make sure the upgrade was successful.

```bash
yarn openzeppelin send-tx --network extdev --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method increase
```

At this point, you will be prompted to input the amount you want to increase the counter with:

```
? amount (uint256):
```

Just type `10` and then press `Enter`.

> Note that we've just called `send-tx` with the same `--to` address and the SDK automatically ran the updated function that takes the `amount` as a parameter.

At this point, the value stored on the blockchain should be `12`. Let's check with:

```bash
yarn openzeppelin call --network extdev --to 0x879d15B21DE431E9520D6880E46Df374F7abB2a3 --method value
```

This will print something similar to the following:

```bash
✓ Method 'value' returned: 12
12
✨ Done in 7.36s.
```

Cool! The result equals `12`, so it worked as expected.

> Note: It is essential to have a good understanding of how upgradable smart contracts work. This, however, is not in the scope of this tutorial so we encourage you to check the OpenZeppelin SDK [official documentation](https://docs.openzeppelin.com/sdk/) to further your knowledge.
