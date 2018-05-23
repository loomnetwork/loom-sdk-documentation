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

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Let's write a function that creates a `Contract` instance to interact with the sample [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract from the Loom SDK...

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
async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]
  const contractAddr = await client.getContractAddressAsync('BluePrint')
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  return new Contract({
    contractAddr,
    callerAddr,
    client
  })
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`Contract.CallAsync()` メソッドを使用すれば `Contract`クラスが処理を行う。

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value. このメソッドを呼び出す関数を書いてみよう。

```js
/**
 * スマートコントラクト内のキーとバリューの連想配列を格納
 * @param contract コントラクトのインスタンスが`getContract()`から返す
 */
async function store(contract, key, value) {
  const params = new MapEntry()
  params.setKey(key)
  params.setValue(value)
  await contract.callAsync('SetMsg', params)
}

```

## DAppチェーンからのデータの読み取り

スマートコントラクトの状態を読み取るためには、パブリックな読み取り専用メソッドのうちどれかを呼び出す必要があり、`Contract.StaticCallAsync()`メソッドを使って行うことができる。

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. このメソッドを呼び出す関数を書いてみよう。

```js
/**
 * スマートコントラクト内にあるキーと結び付けられたバリューをロードする。
 * @param contract コントラクトのインスタンスが`getContract()`から返す
 */
async function load(contract, key) {
  const params = new MapEntry()
  // The smart contract will look up the value stored under this key.
  params.setKey(key)
  const result = await contract.staticCallAsync('GetMsg', params, new MapEntry())
  return result.getValue()
}
```

## まとめ

全て準備が整ったので、DAppチェーンが稼働していることを確認してから、次のコードを実行してみよう。`Value: hello!`とコンソールにプリントされるはずだ。

```js
(async function () {
  const privateKey = CryptoUtils.generatePrivateKey()
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const contract = await getContract(privateKey, publicKey)
  await store(contract, '123', 'hello!')
  const value = await load(contract, '123')
  console.log('Value: ' + value)
})()
```