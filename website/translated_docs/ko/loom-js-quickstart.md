---
id: loom-js-quickstart
title: NodeJS & Browser 퀵스타트
sidebar_label: NodeJS & Browser 퀵스타트
---
## 개요

`loom-js` 라이브러리는 여러분이 Loom DAppChain에서 구동되는 스마트 컨트랙트와 상호작용하는데 필요한 web 앱과 NodeJS 서비스를 개발하는데 필요한 모든 것을 제공합니다.

NPM을 통해서 `loom-js` 설치를 시작하기:

```shell
yarn add loom-js
# 혹은 여러분이 선호하는 것으로...
npm install loom-js
```

## 예제코드

[Loom JS 예제 레파지토리](https://github.com/loomnetwork/loom-js-samples)의 `quickstart` 디렉토리에서 모든 코드들을 확인하실 수 있습니다..

## DAppChain에 연결하기

`Contract` 클래스는 Loom DAppChain 위에서 구동되는 스마트 컨트랙트와 상호작용하는 편리한 방법을 제공합니다. Loom SDK의 [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트 예제와 상호작용하는 `Contract` 인스턴스를 생성하는 함수를 작성해 봅시다... 

```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * 스마트 컨트랙트와 상호작용하는데 사용되는 새로운 `Contract` 인스턴스를 생성합니다.
 * @param privateKey 컨트랙트에 보내지는 트랜잭션을 서명하기 위해 사용되는 프라이빗 키.
 * @param publicKey 프라이빗 키에 대응되는 퍼블릭 키.
 * @returns `Contract` 인스턴스.
 */
async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws'
  )
  // middleware가 요구됩니다.
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

## DAppChain에 데이터 쓰기

스마트 컨트랙트의 상태를 변경시키기 위해서는 여러분은 public 메소드 호출이 필요합니다, 그렇게 하기 위해서는 서명된 트랜잭션이 반드시 DAppChain에 보내져서 검증이 되어야 합니다. 다행히도 `Contract` 클래스는 여러분이 `Contract.callAsync()` 메소드를 사용할때 이런 것들을 대부분 처리해줍니다.

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value. Let's write a function that calls this method...

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

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, you can do so by using the `Contract.staticCallAsync()` method.

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. Let's write a function that calls this method...

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

  const contract = await getContract(privateKey, publicKey)
  await store(contract, '123', 'hello!')
  const value = await load(contract, '123')
  console.log('Value: ' + value)
})()
```