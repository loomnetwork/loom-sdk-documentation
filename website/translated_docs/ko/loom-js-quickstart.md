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

스마트 컨트랙트의 스테이트를 변경시키기 위해서는 여러분은 public 메소드 호출이 필요합니다, 그렇게 하기 위해서는 서명된 트랜잭션이 반드시 DAppChain에 보내져서 검증이 되어야 합니다. 다행히도 `Contract` 클래스는 여러분이 `Contract.callAsync()` 메소드를 사용할때 이런 것들을 대부분 처리해줍니다.

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트는 키에 연관된 값을 저장하는데 사용될 수 있는 public `SetMsg` 메소드를 제공합니다. 이 함수를 호출하는 함수를 작성해 봅시다...

```js
/**
 * 스마트 컨트랙트내의 키에 값을 저장합니다.
 * @param contract `getContract()` 에서 반환되는 컨트랙트 인스턴스.
 */
async function store(contract, key, value) {
  const params = new MapEntry()
  params.setKey(key)
  params.setValue(value)
  await contract.callAsync('SetMsg', params)
}

```

## DAppChain에서 데이터 읽기

스마트 컨트랙트의 스테이트를 읽기 위해서는 여러분은 하나의 public read-only 메소드를 호출해야만 합니다, `Contract.staticCallAsync()` 메소드를 사용하는 것도 가능할 것입니다.

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트는 키에 연관된 값을 조회할 때 호출될 수 있는 public `GetMsg` 메소드를 가지고 있습니다... 이 메소드를 호출하는 함수를 작성해 봅시다...

```js
스마트 컨트랙트 내에서 키에 연관된 값을 가져옵니다.
 * @param contract `getContract()` 에서 반환된 컨트랙트 인스턴스.
 */
async function load(contract, key) {
  const params = new MapEntry()
  // 스마트 컨트랙트는 이 키로 저장된 값을 조회할 것입니다.
  params.setKey(key)
  const result = await contract.staticCallAsync('GetMsg', params, new MapEntry())
  return result.getValue()
}
```

## 한꺼번에 해보기

자 이제 모든 코드를 가지고 DAppChain이 구동되어 있는지 확인하고 다음 코드를 실행하세요, 그러면 여러분은 콘솔에서 `Value: hello!`이 출력되는 것을 볼 수 있을 것입니다.

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

[BluePrint]: https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go
