---
id: loom-js-openzeppelin-sdk
title: Loom.js + OpenZeppelin SDK
sidebar_label: Loom.js + OpenZeppelin SDK
---

# Overview

The `LoomProvider` now has initial support to [OpenZeppelin SDK](https://docs.openzeppelin.com/sdk/2.5), also supporting [Upgradeable Contracts](https://docs.openzeppelin.com/sdk/2.5/writing-contracts), deployed on `Loomchain` (this requires the latest version of Loomchain)

> Note: Is required to test with builds greater than 1313, to check your loomchain build you can always use the command `loom env`

# Setup

## Installing OpenZeppelin SDK and LoomTruffleProvider

The first step is to install the `OpenZeppelin SDK,` first let's create a directory for the project and install the necessary packages:

```bash
mkdir my-project
cd my-project

# Setting up the packages
yarn add -D @openzeppelin/cli@2.5.3 js-sha256 loom-js@dev loom-truffle-provider@dev

# Intialize OpenZeppelin SDK
yarn openzeppelin init my-project 1.0.0
```

> Note: Here we're using the developer versions of loom-js and loom-truffle-provider

## Setting Up LoomTruffleProvider

The next step is to configure the `networks.js` file, and it should be something like that after a fresh install:

```js
module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
  },
};
```

Let's replace with:

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
    development: {
      provider: function() {
        const chainId = 'default'
        const writeUrl = 'http://127.0.0.1:46658/rpc'
        const readUrl = 'http://127.0.0.1:46658/eth'
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

> Note: The rest of this tutorial is almost identical to the OpenZeppelin tutorial; however, we're going to reproduce the same approach here

Let's create the `Counter.sol` contract on directory `contracts` and run the command to deploy it on `Loomchain`; it should deploy the contract on `Loomchain`.

```solidity
pragma solidity ^0.5.0;

contract Counter {
  uint256 public value;

  function increase() public {
    value++;
  }
}
```

```bash
# Let's deploy on Loomchain
yarn openzeppelin create
✓ Compiled contracts with solc 0.5.12 (commit.7709ece9)
? Pick a contract to instantiate Counter
? Pick a network development
✓ Added contract Counter
✓ Contract Counter deployed
All contracts have been deployed
? Do you want to call a function on the instance after creating it? Yes
? Select which function increase()
✓ Setting everything up to create contract instances
✓ Instance created at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139
```

### Send-TX and Call

Now we're going to call function on the `Counter` contract.

```bash
# Send a transaction to the contract Counter
yarn openzeppelin send-tx
? Pick a network development
? Pick an instance Counter at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139
? Select which function increase()
✓ Transaction successful. Transaction hash: 0x3fc115008028a93438495f0a89eed0e4a24ff8c14d3c4a81e7dad58ca1a6c61b
```

```bash
# Calling the functin value on contract Counter
yarn openzeppelin call
? Pick a network development
? Pick an instance Counter at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139
? Select which function value()
✓ Method 'value()' returned: 2
2
```

### Upgrading Your Contract

Next, we're going to upgrade the `Counter` contract; it now should be like

```solidity
pragma solidity ^0.5.0;

contract Counter {
  uint256 public value;

  function increase(uint256 amount) public {
    value += amount;
  }
}
```

And call the comoamnd `upgrade` on `OpenZeppelin SDK`

```bash
# Upgrading the contract Counter
yarn openzeppelin upgrade
? Pick a network development
✓ Compiled contracts with solc 0.5.12 (commit.7709ece9)
✓ Contract Counter deployed
 All contracts have been deployed
? Which instances would you like to upgrade? All instances
✓ Instance upgraded at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139. Transaction receipt: 0x531f51faa5692952076f2ba7d630fc5176d9060ffadbf851558f9a6891f2fbdd                                 ✓ Instance at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139 upgraded
```

Great! the contract `Counter` is updated, and the address stays the same, now let's call `send-tx` and `call` again in order to confirm the upgrade

```bash
# Send a transaction to the contract Counter
yarn openzeppelin send-tx
? Pick a network development
? Pick an instance Counter at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139
? Select which function increase(amount: uint256)
? amount (uint256): 10
✓ Transaction successful. Transaction hash: 0x0c1c4d0edd33628a778185c290957273620a5f2756f8aea339e80d45612d1794
```

And now let's check the value on the contract

```bash
# Calling the functin value on contract Counter
yarn openzeppelin call
? Pick a network development
? Pick an instance Counter at 0x1A3d94d6c0174d2f810BcE314a4cE516d640E139
? Select which function value()
✓ Method 'value()' returned: 12
12
```

Cool! The value is `12`, so it worked as expected.

> Note: Is essential to have a good understanding of the nuances of an Upgradable Contract on using OpenZeppelin SDK, weren't to go deeper here, so we encourage you to check the OpenZeppelin SDK for further details
