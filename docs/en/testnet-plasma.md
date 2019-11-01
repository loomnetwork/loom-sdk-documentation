---
id: loom-testnet
title: Loom Testnet
sidebar_label: Loom Testnet
---

This page provides information on where and how to access the Loom Testnet network. If you want more details, see our [guide](deploy-loom-testnet.html) on deploying to Loom Testnet.

## Loom Testnet

> On rare occasions, Extdev may get wiped. Use it only for development and testing.

### General Information

- **Name**: Loom Testnet
- **Type**: Testnet
- **Availability**: Stable developer
- **URL**: extdev-plasma-us1.dappchains.com
- **chainId**: extdev-plasma-us1
- **networkId**: 9545242630824
- **writeUrl**: wss://extdev-basechain-us1.dappchains.com/websocket
- **readUrl**: wss://extdev-basechain-us1.dappchains.com/queryws
- Max Contract Size: **24,576 bytes**
- Max Gas Limit per transaction: **4,915,200**

### Truffle configuration file

Use this sample Truffle [configuration file](https://github.com/loomnetwork/truffle-dappchain-example/blob/master/truffle-config.js) to deploy your smart contracts to Loom Testnet.

### Connect to Loom Testnet

You can use this snippet to connect to Loom Testnet:

```js
import {
  Client,
  LocalAddress,
  CryptoUtils,
  LoomProvider,
  createDefaultTxMiddleware
} from 'loom-js'
import Web3 from 'web3'

// ... content omitted for brevity

const client = new Client(networkId, writeUrl, readUrl)
client.on('error', msg => {
  console.error('Error on connecting to Loom Testnet', msg)
  })
client.txMiddleware = createDefaultTxMiddleware(client, privateKey)

// ... content omitted for brevity

const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
const currentUserAddress = LocalAddress.fromPublicKey(publicKey)

// ... content omitted for brevity

const web3 = new Web3(new LoomProvider(client, privateKey))
```

If you want to use [Universal Signing](https://medium.com/loom-network/universal-transaction-signing-seamless-layer-2-dapp-scaling-for-ethereum-b63a733fc65c) instead, see [our guide](how-to-get-started.html#to-get-started-with-universal-transaction-signing) on universal signing.

### Ethereum Integration

**Contracts deployed on Rinkeby**

- **Transfer Gateway**: `0x9c67fD4eAF0497f9820A3FBf782f81D6b6dC4Baa` (use this for Eth, ERC721, and ERC20 assets)
- **Loom Transfer Gateway:** `0xC6e1421720C7F62455C053BC8326633D68c01C00`

**Contracts deployed on Loom Testnet**

- **Transfer Gateway**

You can resolve the address of the Ethereum transfer gateway by name as follows:

```js
const contractAddr = await client.getContractAddressAsync('gateway')
```

- **Loom Transfer Gateway**

You can resolve the address of the Ethereum transfer gateway by name as follows:

```js
const contractAddr = await client.getContractAddressAsync('loomcoin-gateway')
```

**EthCoin**

If you transfer Eth to your Loom Testnet account, it'll get deposited into the EthCoin contract:

Instantiate the contract like this:

```js
import {
  Contracts
} from 'loom-js'

// ... content omitted for brevity

const EthCoin = Contracts.EthCoin
const ethCoinInstance = await EthCoin.createAsync(client, currentUserAddress)
```

Then, you can check the balance as follows:

```js
const balance = await ethCoinInstance.getBalanceOfAsync(currentUserAddress.toString())
```

Resolve the address by name with:

```js
const contractAddr = await client.getContractAddressAsync('ethcoin')
```

### Binance Integration

- **Binance Hot Wallet address**: `tbnb1gc7azhlup5a34t8us84x6d0fluw57deuf47q9w`

**Contracts deployed on Loom Testnet**

- **Transfer Gateway**

You can resolve the address of the Binance transfer gateway by name as follows:

```js
const contractAddr = await client.getContractAddressAsync('binance-gateway')
```

Instantiate the Binance transfer gateway contract like this:

```js
import { BinanceTransferGateway } from 'loom-js/dist/contracts'

// .. content omitted for brevity

const binanceTransferGatewayContract = await BinanceTransferGateway.createAsync(
  client,
  currentUserAddress
)
```

- **BNB Coin:**

The BNB Coin contract is deployed at `0x9ab4e22d56c0c4f7d494442714c82a605d2f28e0`.

Instantiate the contract like this:

```js
const web3Loom = new Web3(loomProvider)

// ... content omitted for brevity

const bnbCoinAddress = '0x9ab4e22d56c0c4f7d494442714c82a605d2f28e0'
const extdevBNBContract = new web3Loom.eth.Contract(bnbToken.abi, bnbCoinAddress)
```

The `bnbToken.abi` file can be found [here](https://github.com/loomnetwork/loom-examples/blob/master/truffle/build/contracts/BNBToken.json).

## Transfer Gateway Tutorials

For more details on how to transfer tokens between Loom and other chains like Ethereum, Tron, and Binance see our [transfer gateway exampls](transfer-gateway-example.html) page.
