---
id: loom-js-quickstart
title: NodeJSとブラウザのクイックスタート
sidebar_label: NodeJSとブラウザのクイックスタート
---
## 概要

`loom-js`ライブラリには、Webアプリ構築に必要となる全てのもの、さらにNodeJSサービスが含まれている。NodeJSサービスは、Loom DAppチェーン上で実行されるスマートコントラクトと対話するためのものである。

NPMで`loom-js`をインストール

```shell
yarn add loom-js
# or if you prefer...
npm install loom-js
```

## サンプル コード

このページの全コードは、[Loom JS samples repo](https://github.com/loomnetwork/loom-js-samples) の `quickstart`ディレクトリにある。

## DAppチェーンへの接続

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Loom SDKのサンプルスマートコントラクト [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) と対話する `Contract` インスタンスを作成する関数を書いてみよう。

```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * 新たな`Contract`インスタンスを作成し、スマートコントラクトとの対話に使えるようにする。
 * @param privateKey(秘密鍵)はコントラクトに送信されたトランザクションに署名するために使われる。
 * @param publicKey(公開鍵)は秘密鍵に対応するものである。
 * @returns `Contract`のインスタンス
 */
function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:47000/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]
  // address of the `helloworld` smart contract on the Loom DAppChain
  const contractAddr = new Address(
    client.chainId,
    LocalAddress.fromHexString('0x005B17864f3adbF53b1384F2E6f2120c6652F779')
  )
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  return new Contract({
    contractAddr,
    // the name of the smart contract at `contractAddr`
    contractName: 'helloworld',
    callerAddr,
    client
  })
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`Contract.CallAsync()` メソッドを使用すれば `Contract`クラスが処理を行う。

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`SetMsg`メソッドを持っており、これはキーとバリューの連想配列を保存するよう呼び出すことができる。 このメソッドを呼び出す関数を書いてみよう。

```js
/**
 * スマートコントラクト内のキーとバリューの連想配列を格納
 * @param contract Contract instance returned from `getContract()`.
 */
async function store(contract, key, value) {
  const params = new MapEntry()
  params.setKey(key)
  params.setValue(value)
  await contract.callAsync('SetMsg', params)
}

```

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, you can do so by using the `Contract.staticCallAsync()` method.

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. Let's write a function that calls this method...

```js
/**
 * Loads the value associated with a key in a smart contract.
 * @param contract Contract instance returned from `getContract()`.
 */
async function load(contract, key) {
  const params = new MapEntry()
  // The smart contract will look up the value stored under this key.
  params.setKey(key)
  const result = await contract.staticCallAsync('GetMsg', params, new MapEntry())
  return result.getValue()
}
```

## Putting it all together

Now that we have all the pieces in place make sure that you have the DAppChain running and then run the following code, you should see `Value: hello!` printed to the console.

```js
(async function () {
  const privateKey = CryptoUtils.generatePrivateKey()
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const contract = getContract(privateKey, publicKey)
  await store(contract, '123', 'hello!')
  const value = await load(contract, '123')
  console.log('Value: ' + value)
})()
```