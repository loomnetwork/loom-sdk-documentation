---
id: loom-js-loom-provider-web3
title: Loom.js + Web3.js
sidebar_label: Loom.js + Web3.js
---
# 개요

`loom-js`는`LoomProvider`와 함께 제공되므로 Ethereum 개발자가 트랜잭션을 배포하고 보낼 수 있는 provider로써 `Web3.js`을 연결하고 Loom DAppChain 내에서 구동되는 스마트 컨트랙트 이벤트를 listen할 수 있도록 해줍니다, 더 자세한 사항은 [EVM 페이지](evm)를 확인하세요

NPM을 통해서 `loom-js` 설치를 시작하기:

```shell
yarn add loom-js
# 혹은 여러분이 선호하는 것으로...
npm install loom-js
```

# 컨트랙트를 인스턴스화하기

## The SimpleContract

Let's say that we have a Solidity contract, which is already compiled and deployed on Loom DAppChain

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

After compiled the contract will generate the following ABI Interface:

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

Instantiate and using the `Web3` with `LoomProvider` looks similar from use from an Ethereum Node, but first we need to initialize the `loom-js` client properly.

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider, EvmContract
} from '../loom.umd'

import Web3 from 'web3'

// This function will initialize and return the client
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws',
  )

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
const web3 = new Web3(new LoomProvider(client, privateKey))
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

# 트랜잭션과 Call

After the instantiation of the `Web3 Contract` we'll be able to use the contract methods for transactions (`send`) and calls (`call`) like so:

```js
(async function () {
  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be 47
})()
```

# 이벤트

It is possible to add event listeners to the contract, although it don't support the filters yet

```js
(async function () {
  // 새로운 값의 설정을 listen한다
  contract.events.NewValueSet({}, (err, newValueSet) {
    if (err) {
      console.error('error', err)
      return
    }

    console.log('New value set', newValueSet.returnValues)
  })
})()
```

## Putting it all together

Now that we have all the pieces in place make sure that you have the DAppChain running and then run the following code, you should see `Value: hello!` printed to the console.

```js
import {
  Client, Address, LocalAddress, CryptoUtils, LoomProvider
} from '../loom.umd'

import Web3 from 'web3'

// This function will initialize and return the client
function getClient(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46658/websocket',
    'ws://127.0.0.1:46658/queryws',
  )

  return client
}

// Setting up keys
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Client ready
const client = getClient(privateKey, publicKey)

// Setting the web3
const web3 = new Web3(new LoomProvider(client, privateKey))

;(async () => {
  // Set the contract ABI
  const ABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

  // Getting our address based on public key
  const fromAddress = LocalAddress.fromPublicKey(publicKey).toString()

  // Get the contract address (we don't need to know the address just the name specified in genesis.json
  const loomContractAddress = await client.getContractAddressAsync('SimpleStore')

  // Translate loom address to hexa to be compatible with Web3
  const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

  // Instantiate the contract
  const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress})

  // Listen for new value set
  contract.events.NewValueSet({}, (err, newValueSet) {
    if (err) {
      console.error('error', err)
      return
    }

    console.log('New value set', newValueSet.returnValues)
  })

  // Set value of 47
  await contract.methods.set(47).send()

  // Get the value
  const result = await contract.methods.get().call()
  // result should be 47
})()

```