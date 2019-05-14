---
id: web3js-event-filters
title: Web3 事件过滤器
sidebar_label: Web3 事件过滤器
---
## 概述

使用[Web3](https://github.com/ethereum/web3.js) 库，开发人员能够轻松地从 DAppChain 上的 [EVM](evm.html) 中收听事件， 也可以为索引值创建过滤器。

## 过滤

让我们创建一个过滤器，获取在Loom DApp链上生成的最新块，并在控制台上连续打印块哈希。

```js
const {
  Client, CryptoUtils, LoomProvider
} = require('loom-js')
const Web3 = require('web3')

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
);

// Create private key for first account
const privateKey = CryptoUtils.generatePrivateKey()

// Instantiate web3 client using LoomProvider as provider
const web3 = new Web3(new LoomProvider(client, privateKey));

// Create filter to get the latest block
const filter = web3.eth.filter('latest');

// Watch filter will return the hash of the latest block continuously 
filter.watch(function (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log('Block hash', result)
```

## 按索引值过滤

另一个很棒的功能是使用`索引`值进行过滤。 这可用于在发送特定`索引`值时触发事件处理程序。

以下合约:

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

可以为 `NewValueSet` 事件设置事件处理程序, 只有当 `值` 发出时才触发div 类 = "notranslate" >> 4 </div> 10</code>, 如果合约发出任何其他值, 则不会触发该项。

```js
// Generate public and private keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString()

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey))

// ABI for the contract
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

// Address of the contract deployed
const contractAddress = '0x...'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})

// Subscribe for listen the event NewValueSet
contract.events.NewValueSet({ filter: { _value: 10 } }, (err: Error, event: any) => {
  if (err) t.error(err)
  else {
    // Print on terminal only when value set is equal to 10
    console.log('The value set is 10')
  }
})
```