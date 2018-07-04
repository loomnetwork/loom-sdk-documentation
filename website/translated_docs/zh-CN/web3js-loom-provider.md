---
id: web3js-loom-provider-truffle
title: Web3, LoomProvider 和 Truffle
sidebar_label: Web3, LoomProvider 和 Truffle
---
## 概述

`LoomProvider` 还附带了`loom-js` ，它允许你与 [Web3.js](https://github.com/ethereum/web3.js) 集成，从而更容易与 Loom DApp 链中包含的 [EVM](evm.html) 集成，也可以使用 [Truffle Framework](http://truffleframework.com/) 来管理测试，部署和 solidity 智能合约。</p> 

### Web3

正如 `Web3.js` 的官方文档所述：

> `Web3.js` 是一个库集合，允许你使用 HTTP 或 IPC 连接与本地或远程以太坊节点进行交互。

对于 Loom DApp 链，使用 `WebSockets` 而不是 `HTTP` 或 `IPC` 进行通信，由于 `Web3.js` 抽象了该部分，所以不需要更深入的通信知识。

### LoomProvider

`Provider` 是将 `Web3.js` API 连接到以太坊节点的桥梁，为了使 `Web3.js` 调用与 Loom DApp 链兼容，你应该使用LoomProvider。

结合 `Web3` 和 `LoomProvider` 是一个很好的选择, 可以与部署在Loom DApp链上的智能合同进行交互,因为 `Web3` 抽象了 API 调用的构造, 不需要手动解释 [ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html)。

### Truffle 框架

所以 `Truffle` 的官方网站说：

> Truffle 是以太坊最受欢迎的开发框架，其使命就是让您的生活更轻松。

这完全是真的，因为 `Truffle` 可以：`编译`，`部署`，`测试`，`调试`等等。

## 从 Truffle 部署和运行

### 下载和安装

首先, 你需要安装 `Truffle`:

```bash
# 当前支持的版本 
npm install -g truffle
```

Once `Truffle` is installed let's create a directory and initialize a project:

```bash
# Create directory and access
mkdir simple-store
cd simple-store

# Initialize a project from zero with truffle
truffle init
```

The new directory structure will looks like:

    .
    ├── contracts
    │   └── Migrations.sol
    ├── migrations
    │   └── 1_initial_migration.js
    ├── test
    ├── truffle-config.js
    └── truffle.js
    

### Adding contract and migration

On the `contracts` directory we should create our contract in [Solidity](http://solidity.readthedocs.io/en/v0.4.22/), we're going to use the famous `SimpleStore.sol` which has a `set` function for a parameter `value` also for an state change, a `get` function for the read only and no state change call and an event called `NewValueSet` which will have the parameter `value`, as the following example:

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
    

Next let's add an migration, `Truffle` works with the concept of migrations, which makes useful for track changes and updates. The file should be created on migrations directory and it should be `JavaScript` file and the file name should start with the number `2` becoming `2_simple_store.js`, and the content should be the following:

```Javascript
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

> There's a complete example of Truffle integration available on https://github.com/loomnetwork/truffle-dappchain-example

### Download and configure Loom Truffle Provider

The last cog to be added is the `Loom Truffle Provider`, that plugin provides the connection between `Truffle` and Loom DAppChain (and it also has the `LoomProvider` underneath). Let's install:

```bash
npm install loom-truffle-provider --save
#or
yarn add loom-truffle-provider
```

And let's edit the file `truffle.js` to add the necessary configuration, as the following example:

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

> Don't forget to generate yours keys using the command `loom genkey -a public_key -k private_key`

### Running Truffle deploy command

Now we're good to run the deploy command:

> But before you need to start the Loom DAppChain

```bash
truffle deploy --network loom_dapp_chain
```

> If you already deployed and wants to reset the deployment you can run the command `truffle deploy --reset --network loom_dapp_chain`

### Adding more accounts

In order to access accounts on `LoomTruffleProvider` you should use the function `getProviderEngine` which will return the `LoomProvider` giving access to properties `accountsAddrList` and `accounts``

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)
```

And add more accounts just use function `createExtraAccounts`

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
loomTruffleProvider.createExtraAccounts(10)
```

## Configuring and running Web3.js + LoomProvider

### Download and Install

You can download the `Web3.js` latest version using `npm`

```bash
npm install web3 --save
# or
yarn add web3
```

And download and install `LoomProvider` (which lives on `loom-js`)

```bash
npm install loom-js --save
# or
yarn add loom-js
```

### Adding to project and configuring

Adding `Web3.js` to Node.js project (running on Node.js version 8 or greater) is fairly simple after the install, it should be simple as well for projects using `Webpack` also:

```Javascript
// Node.JS 8 or greater
const Web3 = require('web3')

// Webpack with ES2016 support
import Web3 from 'web3'
```

Next step is to configure the `LoomProvider`, is quite similar from the example on `NodeJS & Browser Quick Start`.

```Javascript
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

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const contractAddress = '0x...'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
```

### Running Web3 contract instance

Let's assume that is the `SimpleStore.sol` which was declared up above, so we can call `set` and `get` functions easier:

```Javascript
// Set the value 47
const tx = await contract.methods.set(47).send()

// Get the value 47
const value = await contract.methods.get().call()
```

Also listen for events, in that case for the event `NewValueSet`:

```Javascript
contract.events.NewValueSet({}, (err, event) => {
  if (err) {
    return console.error(err)
  }

  console.log('New value set', event.returnValues._value)
})
```