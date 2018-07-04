---
id: loom-js-quickstart
title: NodeJS & 浏览器快速启动
sidebar_label: NodeJS & 浏览器快速启动
---
## 概述

`loom-js` 库包含构建Web应用程序所需的一切，以及与Loom DApp链上运行的智能合约交互的NodeJS 服务。

首先从NPM 安装 `loom-js`

```shell
yarn add loom-js
# 或者若你更喜欢用npm的话...
npm install loom-js
```

## 示例代码

您可以在 `quickstart` 目录中的 [Loom JS samples repo](https://github.com/loomnetwork/loom-js-samples) 页面上找到所有代码。

## 连接到DApp链

`Contract` 类提供了一种方便的方式与Loom DApp链上运行的智能合约进行交互。 让我们编写一个函数，来创建一个与Loom SDK中提供的示例[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 智能合约进行交互的`Contract`实例......

```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * Creates a new `Contract` instance that can be used to interact with a smart contract.
 * @param privateKey Private key that will be used to sign transactions sent to the contract.
 * @param publicKey Public key that corresponds to the private key.
 * @returns `Contract` instance.
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

## 将数据写入 DApp链

要改变智能合约的状态，您需要调用其公共方法之一，为此必须将签名的事务发送到DApp链并由其进行验证。 幸运的是, 当您使用 `Contract.callAsync()` 方法时， `Contract`类将处理其中的大部分问题。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)智能合约具有公共 `SetMsg` 方法，可以调用该方法来储存键和值之间的关联。 让我们编写一个调用此方法的函数......

```js
/**
 * Stores an association between a key and a value in a smart contract.
 * @param contract Contract instance returned from `getContract()`.
 */
async function store(contract, key, value) {
  const params = new MapEntry()
  params.setKey(key)
  params.setValue(value)
  await contract.callAsync('SetMsg', params)
}

```

## 从DApp链读取数据

要读取智能合约的状态，您需要调用其公共只读方法之一，您可以使用 `Contract.staticCallAsync()` 方法。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)智能合约具有公共 `GetMsg`方法，可以调用该方法来查找键和值之间的关联。 让我们编写一个调用此方法的函数......

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

## 放在一起

现在, 我们已经有了所有的方法来确保您的 DApp链 运行, 然后运行下面的代码, 您将看到 `Value: hello!` 在控制台出现。

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