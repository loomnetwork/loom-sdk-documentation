---
id: loom-js-loom-provider-web3
title: Loom.js + Web3.js
sidebar_label: Loom.js + Web3.js
---
# 概要

The `loom-js` comes with the `LoomProvider` which makes possible to connect with `Web3.js` as a provider allowing Ethereum developers to deploy and call smart contracts running inside the Loom DAppChains, for further details check out [EVM page](evm)

To get started install `loom-js` from NPM:

```shell
yarn add loom-js
# or if you prefer...
npm install loom-js
```

# コントラクトのインスタンス化

## SimpleContract

Let's say that we have a Solidity contract, which is already compiled and deployed on Loom DAppChain

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
    

With the binary compiled with the Solidity compiler the next step is to create a `genesis.json` for the Loom DappChain. (Don't forget to set the `location` to the compiled binary)

```Javascript
{
    "contracts": [
        {
            "vm": "EVM",
            "format": "hex",
            "name": "SimpleStore",
            "location": "/path_to_simple_store/SimpleStore.bin"
        }
    ]
}

```

コントラクトをコンパイルしたら、次のABIインターフェースが生成される:

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

Instantiate and using the `Web3` with `LoomProvider` looks similar from use from an Ethereum Node, but first we need to initialize the `loom-js` client properly.

```js
import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// This function will initialize and return the client
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws',
  )

  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  return client
}

// Setting up keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Client ready
const client = getClient(privateKey, publicKey)
```

Now with client ready let's instantiate the `Web3`, in order to properly initialize the `Web3` instance we're going to pass the `LoomProvider` with the `client`

```js
const web3 = new Web3(new LoomProvider(client))
```

We're ready to instantiate the contract

```js
// Getting our address based on public key
const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

// Get the contract address (we don't need to know the address just the name specified in genesis.json
const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

// Translate loom address to hexa to be compatible with Web3
const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

// Instantiate the contract
const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})
```

The contract is instantiated and ready

# トランザクションと呼び出し

After the instantiation of the `Web3 Contract` we'll be able to use the contract methods for transactions (`send`) and calls (`call`) like so:

```js
(async function () {
  // バリューを47に設定
  await contract.methods.set(47).send()

  // バリューの取得
  const result = await contract.methods.get().call()
  // 結果は47となる
})()
```

## まとめ

全て準備が整ったので、DAppチェーンが稼働していることを確認してから、次のコードを実行してみよう。`Value: hello!`とコンソールにプリントされるはずだ。

```js
import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// こうして関数は初期化およびクライアントの返却をする
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws',
  )

  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  return client
}

// キーの設定
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// クライアントの準備
const client = getClient(privateKey, publicKey)

// web3の設定
const web3 = new Web3(new LoomProvider(client))

;(async () => {
  // コントラクトABIの設定
  const ABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

  // 秘密鍵を基にアドレスを取得
  const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

  // コントラクトアドレスの取得 (アドレスは必要なく、genesis.json中での特定の名前だけで良い)
  const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

  // Web3と互換性を持つようloom addressをhexaへ変換
  const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

  // コントラクトのインスタンス化
  const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})

  // 47のバリューを設定
  await contract.methods.set(47).send()

  // バリューの取得
  const result = await contract.methods.get().call()
  // result should be 47
})()

```