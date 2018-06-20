---
id: web3js-loom-provider-truffle
title: Web3、LoomProviderとTruffle
sidebar_label: Web3、LoomProviderとTruffle
---
## 概要

`loom-js`には`LoomProvider`があり、これは[Web3.js](https://github.com/ethereum/web3.js)との統合を可能にする。こうして、Loom DAppチェーン上の[EVM](evm.html)とより簡単に統合でき、また[Truffleフレームワーク](http://truffleframework.com/)を使用してテストやデプロイメント、Solidityスマートコントラクトを扱えるようになる。

### Web3

`Web3.js`は、公式ドキュメンテーションで次のように説明されている:

> `Web3.js`はライブラリ・コレクションである。これはHTTPもしくはIPC接続を使用して、ローカル又はリモートのイーサリアムノードとの対話を可能にする。

Loom DAppチェーンでは`HTTP`や`IPC`の代わりに、`WebSockets`を用いて通信する。しかし`Web3.js`がその部分の抽象化を行うので、この通信についての深い知識は必要ではない。

### LoomProvider

An `Provider` is a bridge that connects the `Web3.js` API to the Ethereum node, in order to make `Web3.js` calls compatible with Loom DAppChain you should use the `LoomProvider`

Combining `Web3.js` and `LoomProvider` is a good option to interact with smart contracts deployed on Loom DAppChain, because `Web3.js` abstracts the construction of API calls not needing the interpretation of the [ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html) manually.

### Truffleフレームワーク

`Truffle`は公式サイトでこう説明されている:

> Truffleは最もポピュラーなイーサリアム開発フレームワークであり、あなたの開発ライフをもっと簡単にするというミッションを持っている。

そして実際にその通りのものとなっている。なぜなら`Truffle`では以下を含む多くのことが可能なのだ: `compile`、`deploy`、`test`、`debug`

## Truffleを使ったデプロイと実行

### ダウンロードとインストール

まずは`Truffle`をインストールする必要がある:

```bash
# 現在サポートされているバージョン
npm install -g truffle
```

`Truffle`がインストールされたら、ディレクトリを作成してプロジェクトの初期化を行おう:

```bash
# ディレクトリを作成しアクセス
mkdir simple-store
cd simple-store

# Truffleを使ってゼロからプロジェクトを初期化
truffle init
```

新しいディレクトリ構造は次のようになる:

    .
    ├── contracts
    │   └── Migrations.sol
    ├── migrations
    │   └── 1_initial_migration.js
    ├── test
    ├── truffle-config.js
    └── truffle.js
    

### コントラクトの追加とマイグレーション

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
// Node.JS 8 または8以上
const Web3 = require('web3')

// ES2016サポートのWebpack
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
// バリューを47に設定
const tx = await contract.methods.set(47).send()

// バリュー47を取得
const value = await contract.methods.get().call()
```

またイベントをリッスンするには、例えばイベント`NewValueSet`の場合だと以下のようになる:

```Javascript
contract.events.NewValueSet({}, (err, event) => {
  if (err) {
    return console.error(err)
  }

  console.log('New value set', event.returnValues._value)
})
```