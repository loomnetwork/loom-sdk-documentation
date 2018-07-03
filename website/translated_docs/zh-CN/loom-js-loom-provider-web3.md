---
id: loom-js-loom-provider-web3
title: Loom.js + Web3.js
sidebar_label: Loom.js + Web3.js
---
# 概览

The `loom-js` comes with the `LoomProvider` which makes possible to connect with `Web3.js` as a provider allowing Ethereum developers to deploy and send transactions to smart contracts, listen for smart contracts events running inside the Loom DAppChains, for further details check out [EVM page](evm)

首先从NPM 安装 `loom-js`

```shell
yarn add loom-js
# 或者若你更喜欢用npm的话...
npm install loom-js
```

# 实例化合约

## SimpleContract

假设我们有一个 Solidity 合约，已经编译并部署到了 Looom DApp链

    pragma solidity ^0.4.22;
    
    contract SimpleStore {
      uint value;
    
      event NewValueSet(uint);
    
      function set(uint _value) public {
        value = _value;
        emit NewValueSet(value);
      }
    
      function get() public view returns (uint) {
        return value;
      }
    }
    

有了 Solidity 编译器编译的二进制文件，下一步就是为Loom DApp链生成一个 `genesis.json` 。 (不要忘记将 ` location ` 设置为已编译的二进制文件)

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

在编译完合约后将生成如下的ABI接口文件:

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
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "",
    "type": "uint256"
  }],
  "name": "NewValueSet",
  "type": "event"
}]
```

用 `LoomProvider` 实例化和使用 `Web3` 看起来很像使用以太坊节点，不过首先我们需要正确初始化 `loom-js` 客户端。

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// 这个方法将初始化并返回客户端
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws',
  )

  return client
}

// 配置密钥文件
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// 客户端准备好了
const client = getClient(privateKey, publicKey)
```

现在客户端准备好了，让我们来实例化 `Web3`，为了正确初始化 `Web3` 实例，我们将传入 `LoomProvider` 以及`client`。

```js
const web3 = new Web3(new LoomProvider(client, privateKey))
```

一切就绪，可以实例化合约了

```js
// 基于公钥来获得地址
const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

// 获得合约地址 (我们无需知道地址，只要 genesis.json 里面指定的名字即可）
const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

// 将 loom 地址转译为十六进制以和 Web3 兼容
const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

// 实例化合约
const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})
```

合约成功实例化并准备就绪

# 事务和调用

在 `Web3 合约` 的实例化之后, 我们将能够像这样使用事务的合约方法 (`发送`) 和调用 (`call`):

```js
(async function () {
  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be 47
})()
```

# 事件

可以将事件侦听器添加到合约中, 尽管它尚不支持事件过滤。

```js
(async function () {
  // Listen for new value set
  contract.events.NewValueSet({}, (err, newValueSet) {
    if (err) {
      console.error('error', err)
      return
    }

    console.log('New value set', newValueSet.returnValues)
  })
})()
```

## 放在一起

现在, 我们已经有了所有的方法来确保您的 DApp链 运行, 然后运行下面的代码, 您将看到 `Value: hello!` 在控制台出现。

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// 这个方法将初始化并返回客户端
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws',
  )

  return client
}

// 配置密钥文件

```