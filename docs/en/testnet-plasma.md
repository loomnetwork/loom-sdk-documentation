---
id: testnet-plasma
title: PlasmaChain Extdev
sidebar_label: PlasmaChain Extdev
---

This page provides information on where and how to access the Extdev network.
If you want more details, see our [guide](deploy-loom-testnet.html) on deploying to Loom testnet.

## Extdev

> **Devnets typically are wiped often, only use for experimental features!**

### General Information

- **Name**: Dev Plasma Test
- **Type**: Testnet
- **Availability**: Stable developer
- **URL**: extdev-plasma-us1.dappchains.com
- **chainId**: extdev-plasma-us1
- **networkId**: 9545242630824
- **writeUrl**: wss://extdev-plasma-us1.dappchains.com/websocket
- **readUrl**: wss://extdev-plasma-us1.dappchains.com/queryws

### Connect to extdev

You can use this snippet to connect to Extdev:

```js
import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'
import Web3 from 'web3'

const client = new Client(networkId, writeUrl, readUrl)
this.client.on('error', msg => {
  console.error('Error on connecting to Extdev', msg)
  })
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
const currentUserAddress = LocalAddress.fromPublicKey(publicKey)
const web3 = new Web3(new LoomProvider(client, privateKey))
```

If you want to use [Universal Signing](https://medium.com/loom-network/universal-transaction-signing-seamless-layer-2-dapp-scaling-for-ethereum-b63a733fc65c) instead, see [our guide](how-to-get-started.html#to-get-started-with-universal-transaction-signing) on universal signing.

### Ethereum Integration

**Contracts deployed on Rinkeby**

- **Transfer Gateway**: 0xb73C9506cb7f4139A4D6Ac81DF1e5b6756Fab7A2 (use this for Eth, ERC721, and ERC20 assets)
- **Loom Transfer Gateway**: // Don't know

**Contracts deployed on Extdev**

- **Transfer Gateway**

You can resolve the address of the Ethereum transfer gateway by name as follows:

```js
const contractAddr = await client.getContractAddressAsync('gateway')
```

**EthCoin**

If you transfer Eth to your Extdev account, it'll get deposited into the EthCoin contract:

Instantiate the contract like this:

```js
import {
  Contracts
} from 'loom-js'

// ...
const EthCoin = Contracts.EthCoin
const ethCoinInstance = await EthCoin.createAsync(client, currentUserAddress)
```

Then, you can check the balance as follows:

```js
const balance = await ethCoinInstance.getBalanceOfAsync(currentUserAddress.toString())
```

- **Loom Transfer Gateway**

//TODO: Don't know

### Binance Integration

- **Binance hotWallet address**: tbnb1gc7azhlup5a34t8us84x6d0fluw57deuf47q9w

**Contracts deployed on Extdev**

- **Transfer Gateway**

You can resolve the address of the Binance transfer gateway by name as follows:

```js
const contractAddr = await this.client.getContractAddressAsync('binance-gateway')
```

- **BNB Coin:** 

The BNB Coin contract is deployed at 0x9ab4e22d56c0c4f7d494442714c82a605d2f28e0.

Instantiate the contract like this:

```js
// ...
const web3Loom = new Web3(loomProvider)
// ...
const extdevBNBContract = new web3Loom.eth.Contract(bnbToken.abi, this.extdevNetworkConfig['bnbCoinAddress'])

```

The `bnbToken.abi` file can be found [here](https://github.com/loomnetwork/loom-examples/blob/master/truffle/build/contracts/BNBToken.json).


### Tron Integration

**Contract deployed on Shasta**

- **Transfer Gateway**: //Don't know. It got wiped at some point


**Contract deployed on Extdev**

You can resolve the address of the Tron transfer gateway by name as follows:

```js
const contractAddr = await this.client.getContractAddressAsync('tron-gateway')
//TODO: check this... dunno if it works
```

//TODO: Add TRX coin