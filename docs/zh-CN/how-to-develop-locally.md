---
id: how-to-develop-locally
title: How to Develop Locally
sidebar_label: Develop Locally
---

## Introduction

This document shows you how to develop and test your smart contracts locally against Ganache and Loom.

## Develop Locally Against Ganache

### Install Truffle

First, let's make sure that our environment is properly set up before we get the ball rolling. Start by installing Truffle and making it available globally:

```bash
npm install truffle -g
```

Installing Truffle takes a bit of time. Once the process is finished, you should see something similar to the following:

```text
+ truffle@5.0.19
added 91 packages from 305 contributors in 22.95s
```

### Initialize our Project

Now that we've installed Truffle, it is time to initialize our new project. Fire up a new terminal window, create a directory called `develop-locally`, and `cd` into it.

Next, you can initialize the project by executing the following command:

```bash
truffle init
```

You should see something like the following printed out to the console:

```text
✔ Preparing to download
✔ Downloading
✔ Cleaning up temporary files
✔ Setting up box

Unbox successful. Sweet!

Commands:

  Compile:        truffle compile
  Migrate:        truffle migrate
  Test contracts: truffle test
```

Note that `truffle init` creates a bunch of folders and config files:

    ├── contracts
        ├── Migrations.sol
    ├── migrations
        ├── 1_initial_migration.js
    └── test
    truffle-config.js
    truffle.js
    

### Compile the `SimpleStore` Smart Contract

For the scope of this tutorial, we're going to use the famous `SimpleStore.sol` which has:

- a `set` function that takes a parameter called `_value` and changes the state by saving it to the blockchain. Then, it fires an event called `NewValueSet`.

- a `get` function that lets you read the value `variable`.

Create a new file in the `contracts` folder called `SimpleStore.sol` and copy the following snippet into it:

```solidity
pragma solidity ^0.5.0;

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

Everything is set up properly. It is time to compile our smart contract:

```bash
truffle compile
```

This will print out the following to the console:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStore.sol
> Artifacts written to /Users/andrei/Documents/develop-locally/build/contracts
> Compiled successfully using:

   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang
```

### Create a Migration

To deploy to Ganache we will have to create something called a migration.

Migrations are JavaScript files that help Truffle deploy the code to the blockchain. Note that `truffle init` created a special contract called `Migrations.sol`. Its role is to keep track of the changes you're making to your code. If you've ever used Rails, the concept should be familiar to you.

We'll start from the file `truffle init` already created for us- `./contracts/1_initial_migration.js`. Let's take a look at what's inside:

```js
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
```

To get ready for deployment, do:

```bash
cp ./contracts/1_initial_migration.js ./contracts/2_simple_store.js
```

Next, let's modify `./contracts/2_simple_store.js` to this:

```js
var SimpleStore = artifacts.require("./SimpleStore.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

### Update truffle-config-js

Next, open the `truffle-config.js` file in your favorite text editor and modify the `development` network to this:

```js
development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "*",
  },
```

### Install Ganache

Before migrating the `SimpleStore` smart contract, you need to spin up a local blockchain instance. You can do this using a tool called [Ganache](https://truffleframework.com/ganache).

> Even if a cli version of Ganache is bundled with Truffle, we encourage you to check the link above and download the GUI version.

So, download Ganache from the link above, and launch the application.

### Migrate the SimpleStore Smart Contract

Now you’re all set to migrate the `SimpleStore` smart contract without having to type too much:

```bash
truffle migrate --network development
```

In the output below we see Truffle checking if our contracts are compiled. Then, it deploys them to Ganache:

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 0x38d7ea4c68000


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x41a167d346e3aa3928b2973a1e32939773e6f6a51d6a2bda4130fad9e5c9dee5
   > Blocks: 0            Seconds: 0
   > contract address:    0xE447875DC7A195b1966ECD04F4896Da8484EC0Ce
   > block number:        5
   > block timestamp:     1558940207
   > account:             0x360731F6e87f8F0F1CdAE33Ce6a7eC6c4eD167b5
   > balance:             99.98122416
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


2_simple_store.js
=================

   Deploying 'SimpleStore'
   -----------------------
   > transaction hash:    0xeb4ea40eb75385f3ec4d8f94221e214271a745d1c0eff93cd3f3cb4937d668e2
   > Blocks: 0            Seconds: 0
   > contract address:    0x096F0fF4506776785C539AE7Af8bBA0BbBc3Ea1a
   > block number:        7
   > block timestamp:     1558940207
   > account:             0x360731F6e87f8F0F1CdAE33Ce6a7eC6c4eD167b5
   > balance:             99.97776358
   > gas used:            130995
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0026199 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0026199 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.00831806 ETH
```

Now let's check the `Transactions` tab in Ganache. You should see something like the following:

![Ganache Initial Migration](/developers/img/how-to-develop-locally/ganache-initial-migration.PNG)

### Test Against Ganache

The `test` folder is where we are going to be putting our tests. Note that Truffle provides support for tests written in *JavaScript* and *Solidity* but, for the scope of this tutorial, we are going to keep things simple and stick to *JavaScript*.

Let’s begin by creating a new file. In the terminal, run:

```bash
touch test/SimpleStore.js
```

Next, add the following conent to the `test/SimpleStore.js` file:

```js
const BN = require('bn.js')
const SimpleStore = artifacts.require('SimpleStore')
contract('Test', (accounts) => {
  let [alice] = accounts
  let contractInstance
        beforeEach(async () => {
            contractInstance = await SimpleStore.new()
        });
    it('should be able to set a value', async () => {
                let value = 4
                const result = await contractInstance.set(value, {from: alice})
                assert.equal(result.receipt.status, true)
                assert.equal(result.logs[0].args._value.toString(), value.toString())
        })
        it('should be able to set and then get a value', async () => {
                let value = 5
                await contractInstance.set(value, {from: alice})
                const result = await contractInstance.get({from: alice})
                assert.equal(result.toString(), value.toString())
        })
})
```

To test our smart contract, use the following command:

```bash
truffle test
```

The output should look similar to this:

    Using network 'development'.
    
    
    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.
    
    
    
      Contract: Test
        ✓ should be able to set a value (154ms)
        ✓ should be able to set and then get a value (154ms)
    
    
      2 passing (636ms)
    

And there you go! That's the final step of this section.

Next, we’re going to show you how to deploy and test the `SimpleStore` smart contract against Loom.

## Develop Locally Against Loom

To develop locally against Loom, the first step is to download the Loom binary.

### Download Loom

Use the following commands to download Loom:

```bash
mkdir loom &&
cd loom/ &&
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh &&
cd ..
```

You should see something similar to this printed out to the console:

      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   615  100   615    0     0   1924      0 --:--:-- --:--:-- --:--:--  1927
    Downloading loom executable...
    2.0.0+b789
    All done.
    

### Create a Private Key

Next, we would want to create a new private key:

```bash
loom genkey -a loom_public_key -k loom_private_key
```

    local address: 0x42F401139048AB106c9e25DCae0Cf4b1Df985c39
    local address base64: QvQBE5BIqxBsniXcrgz0sd+YXDk=
    

### Start a Local Loom Chain

At this point, we would want to initialize and then start a local Loom chain.

In a new terminal, run the following:

```bash
cd loom && ./loom init
```

Now, let's spin up Loom by typing:

```bash
./loom run
```

### Install loom-truffle-provider

In order to make Web3.js calls compatible with Loom DAppChain, we must use `loom-truffle-provider`. Let's install it:

```bash
npm install loom-truffle-provider
```

### Update truffle-config.js

Now that `loom-truffle-provider` is installed, the next thing we are required to do is to initialize it as follows.

```js
const LoomTruffleProvider = require('loom-truffle-provider');
```

Then, we would want to tell Truffle know how to deploy to Loom. To do so, we're going to create a new network called `local_loom` and a `provider` function that will overwrite Truffle's default provider:

```js
local_loom: {
  provider: function() {
    const privateKey = readFileSync(path.join(__dirname, 'loom_private_key'), 'utf-8')
    const chainId = 'default'
    const writeUrl = 'http://127.0.0.1:46658/rpc'
    const readUrl = 'http://127.0.0.1:46658/query'
    const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
    loomTruffleProvider.createExtraAccountsFromMnemonic("gravity top burden flip student usage spell purchase hundred improve check genre", 10)
    return loomTruffleProvider
    },
  network_id: '*'
}
```

At this point, you `truffle-config.js` file should look like this:

```js
<br />const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')
const LoomTruffleProvider = require('loom-truffle-provider')
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    local_loom: {
      provider: function() {
        const privateKey = readFileSync(path.join(__dirname, 'loom_private_key'), 'utf-8')
        const chainId = 'default'
        const writeUrl = 'http://127.0.0.1:46658/rpc'
        const readUrl = 'http://127.0.0.1:46658/query'
        const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
        loomTruffleProvider.createExtraAccountsFromMnemonic("gravity top burden flip student usage spell purchase hundred improve check genre", 10)
        return loomTruffleProvider
        },
      network_id: '*'
    }
  }
}
```

### Deploy to Loom

Now we have everything in place to deploy to Loom with just one command:

```bash
truffle migrate --network local_loom
```

Note that we're using the `--network` flag to tell Truffle that we want it to deploy to Loom.

It will take just a few seconds to deploy and you'll see something like this:

    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.
    
    
    Starting migrations...
    ======================
    > Network name:    'local_loom'
    > Network id:      13654820909954
    > Block gas limit: 0x0
    
    
    1_initial_migration.js
    ======================
    
       Deploying 'Migrations'
       ----------------------
       > transaction hash:    0x61d8857997b8cc4c0ffee17a61699d56f2daf7942a04ae9af0e61858f82b7b11
       > Blocks: 0            Seconds: 0
       > contract address:    0x90703c72B51BE5bdf5173bB31Ac083086e5C8081
       > block number:        12
       > block timestamp:     1559224998
       > account:             0x4a8A206E9521745110421324C620D0CaEB6d5c61
       > balance:             0
       > gas used:            0
       > gas price:           0 gwei
       > value sent:          0 ETH
       > total cost:          0 ETH
    
    
       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:                   0 ETH
    
    
    2_simple_store.js
    =================
    
       Deploying 'SimpleStore'
       -----------------------
       > transaction hash:    0x6ca7ee75073a87042fa7b33be3404ded61fe2bd01145cbeb6397d823a18fae83
       > Blocks: 0            Seconds: 0
       > contract address:    0x943023e5e7E38D92069e04320BFBE27220786B1b
       > block number:        18
       > block timestamp:     1559225004
       > account:             0x4a8A206E9521745110421324C620D0CaEB6d5c61
       > balance:             0
       > gas used:            0
       > gas price:           0 gwei
       > value sent:          0 ETH
       > total cost:          0 ETH
    
    
       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:                   0 ETH
    
    
    Summary
    =======
    > Total deployments:   2
    > Final cost:          0 ETH
    

### Test Against Loom

So we've successfully deployed the `SimpleStore` smart contract to Loom. Now, all that's left to do is to test it.

And the beauty of it is that we're only required to run `truffle test` with the `--network` flag as follows:

```bash
truffle test --network local_loom
```

You should see something similar to the following:

    Using network 'local_loom'.
    
    
    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.
    
    
    
      Contract: Test
        ✓ should be able to set a value (3023ms)
        ✓ should be able to set and then get a value (3025ms)
    
    
      2 passing (14s)
    

Great! Now that you've learned how to develop and test locally, you might want to further your knowledge and learn how to join the Loom Testnet. If so, head over to [this guide](/developers/join-testnet) and follow the instructions.