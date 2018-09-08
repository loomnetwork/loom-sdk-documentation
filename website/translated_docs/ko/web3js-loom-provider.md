---
id: web3js-loom-provider-truffle
title: Web3, LoomProvider, Truffle
sidebar_label: Web3, LoomProvider, Truffle
---
## 개요

`loom-js`는`LoomProvider`와 함께 제공되므로 여러분이 [Web3.js](https://github.com/ethereum/web3.js)를 가지고 통합하는 것을 가능하게 해줍니다, 이것은 Loom DAppChain에 탑재된 [EVM](evm.html)과 함께 통합하는 것이 손쉬워 집니다, 또한 테스트, 배포, 그리고 solidity 스마트 컨트랙트를 관리하기 위해서 [Truffle Framework](http://truffleframework.com/)의 사용이 가능합니다.

### Web3

As the official documentation for `Web3.js` states:

> `Web3.js` is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.

For the Loom DAppChains the communication happens using `WebSockets` instead `HTTP` or `IPC`, however the deeper knowledge of the communication isn't required since `Web3.js` abstracts that part.

### LoomProvider

An `Provider` is a bridge that connects the `Web3.js` API to the Ethereum node, in order to make `Web3.js` calls compatible with Loom DAppChain you should use the `LoomProvider`

Combining `Web3.js` and `LoomProvider` is a good option to interact with smart contracts deployed on Loom DAppChain, because `Web3.js` abstracts the construction of API calls not needing the interpretation of the [ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html) manually.

### Truffle 프레임워크

So the official site for `Truffle` says:

> Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

And that is pure true, because `Truffle` can: `compile`, `deploy`, `test`, `debug` and much more.

## Deploying and run from Truffle

### Download and Install

First you'll need to install `Truffle`:

```bash
# Currently supported version
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
# 또는
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
# 또는
yarn add web3
```

And download and install `LoomProvider` (which lives on `loom-js`)

```bash
npm install loom-js --save
# 또는
yarn add loom-js
```

### Adding to project and configuring

Adding `Web3.js` to Node.js project (running on Node.js version 8 or greater) is fairly simple after the install, it should be simple as well for projects using `Webpack` also:

```Javascript
// Node.JS 8 또는 이후버전
const Web3 = require('web3')

// ES2016을 지원하는 Webpack
import Web3 from 'web3'
```

Next step is to configure the `LoomProvider`, is quite similar from the example on `NodeJS & Browser Quick Start`.

```Javascript
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// client를 생성한다
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

// 함수 호출자 주소
const from = LocalAddress.fromPublicKey(publicKey).toString()

// LoomProvider로 web3 client를 인스턴스화 하기
const web3 = new Web3(new LoomProvider(client, privateKey))

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const contractAddress = '0x...'

// 컨트랙트를 인스턴스화 하고 사용가능한 상태로 만들기
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
```

### Running Web3 contract instance

Let's assume that is the `SimpleStore.sol` which was declared up above, so we can call `set` and `get` functions easier:

```Javascript
// 값에 47을 넣는다
const tx = await contract.methods.set(47).send()

// 47인 값을 읽어온다
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