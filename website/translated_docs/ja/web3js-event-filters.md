---
id: web3js-event-filters
title: Web3イベントフィルター
sidebar_label: Web3イベントフィルター
---
## 概要

[Web3.js](https://github.com/ethereum/web3.js)ライブラリで、開発者はLoom DAppチェーン上の[EVM](evm.html)からイベントを簡単にリッスンできるようになる。 またインデックス済みバリューのためのフィルターを作成することも可能だ。

## フィルタリング

フィルタを作成して、Loom DAppチェーン上で生成された最新ブロックを取得し、常にコンソール上にブロックハッシュをプリントしよう。

```js
const {
  Client, CryptoUtils, LoomProvider
} = require('loom-js')
const Web3 = require('web3')

// クライアントを作成
const client = new Client(
  'default',
  'ws://127.0.0.1:46657/websocket',
  'ws://127.0.0.1:9999/queryws',
);

// 最初のアカウントの秘密鍵を作成
const privateKey = CryptoUtils.generatePrivateKey()

// LoomProviderをプロバイダとして使用し、Web3クライアントをインスタンス化
const web3 = new Web3(new LoomProvider(client, privateKey));

// 最新ブロックを取得するようフィルターを作成
const filter = web3.eth.filter('latest');

// フィルターが最新ブロックのハッシュを常に返却するのをWatchする 
filter.watch(function (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log('Block hash', result)
```

## インデックスされたバリューによるフィルタリング

もう一つの素晴らしい機能は、`indexed`バリューでのフィルタリングである。これは特定の`indexed`バリューが送信された際に、イベントハンドラーをトリガするのに使用できる。

For the following contract:

```solidity
pragma solidity ^0.4.22;

contract SimpleStore {
  uint value;

  constructor() {
      value = 10;
  }

  event NewValueSet(uint indexed _value);

  function set(uint _value) public {
    value = _value;
    emit NewValueSet(value);
  }
}
```

It's possible to setup an event handler for the `NewValueSet` event that's only triggered when the `value` emitted is `10`, and it won't be triggered if the contract emits any other value.

```js
// 公開鍵と秘密鍵を生成
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// クライアントを作成
const client = new Client(
  'default',
  'ws://127.0.0.1:46657/websocket',
  'ws://127.0.0.1:9999/queryws',
)

// 関数呼び出し元のアドレス
const from = LocalAddress.fromPublicKey(publicKey).toString()

// LoomProviderを使用し、web3クライアントをインスタンス化
const web3 = new Web3(new LoomProvider(client, privateKey))

// コントラクトのABI
const ABI = [
  {
    constant: false,
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'set',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: '_value', type: 'uint256' }],
    name: 'NewValueSet',
    type: 'event'
  }
]

// デプロイ済みコントラクトのアドレス
const contractAddress = '0x...'

// コントラクトをインスタンス化し、使用できるよう準備
const contract = new web3.eth.Contract(ABI, contractAddress, {from})

// イベントNewValueSetをリッスンするようサブスクライブ
contract.events.NewValueSet({ filter: { _value: 10 } }, (err: Error, event: any) => {
  if (err) t.error(err)
  else {
    // Print on terminal only when value set is equal to 10
    console.log('The value set is 10')
  }
})
```