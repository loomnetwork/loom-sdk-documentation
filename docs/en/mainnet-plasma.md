---
id: testnet-plasma
title: Plasmachain
sidebar_label: Plasmachain
---

This page provides information on where and how to access the Plasmachain network.
If you want more details, see our [guide](deploy-loom-mainnet.html) on deploying to PlasmaChain.

## Plasmachain

### General information

- **Name**: Plasmachain
- **Type**: Mainnet
- **Availability**: End User
- **URL**: plasma.dappchains.com
- **chainId**: default
- **networkId**: *
- **readUrl**: https://plasma.dappchains.com/query

### Truffle configuration file

Use this sample Truffle [configuration file](https://github.com/loomnetwork/truffle-dappchain-example/blob/master/truffle-config.js) to deploy your smart contracts to Plasmachain.

### Connect to Plasmachain

You can use this snippet to connect to Plasmachian:

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
  console.error('Error on connecting to Plasmachain', msg)
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

**Contracts deployed on Ethereum**

- **Transfer Gateway**: 0xe080079ac12521d57573f39543e1725ea3e16dcc (use this for Eth, ERC721, and ERC20 assets)
- **Loom Transfer Gateway**: // TODO: Needs address

**Contracts deployed on Plasmachain**

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

**Top 100 ERC20 smart contracts deployed to Loom**

We've already deployed to Loom the top 100 smart contracts. See the full list [here](top-erc20s.html).


**EthCoin**

If you transfer Eth to your Plasmachain account, it'll get deposited into the EthCoin contract:

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

- **Binance hotWallet address**: //TODO: Needs address

**Contracts deployed on Plasmachain**

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

The BNB Coin contract is deployed at //TODO: Needs address

Instantiate the contract like this:

```js
const web3Loom = new Web3(loomProvider)

// ... content omitted for brevity

const bnbCoinAddress = //TODO: Needs address 
const plasmachainBNBContract = new web3Loom.eth.Contract(bnbToken.abi, bnbCoinAddress)
```

The `bnbToken.abi` file can be found [here](https://github.com/loomnetwork/loom-examples/blob/master/truffle/build/contracts/BNBToken.json).


### Tron Integration

**Contract deployed on Tron**

- **Transfer Gateway**: //TODO: Needs address

**Contract deployed on Plasmachain**

You can resolve the address of the Tron transfer gateway by name as follows:

```js
const contractAddr = await client.getContractAddressAsync('tron-gateway')
```

- **TRX Coin**

If you deposit TRX tokens to the Tron transfer gateway, the assets will get transferred into the `TRXCoin` smart contract deployed on Plasmachain.

Use something like the following to instantiate the contract:

```js
const loomWeb3 = new Web3(new LoomProvider(client, privateKey))
const trxCoinContractAddress = //TODO: needs address

const trxCoinContract = new loomWeb3.eth.Contract(TRXToken.abi, trxCoinContractAddress)
```

The `TRXToken.abi` file can be found [here](https://github.com/loomnetwork/loom-examples/blob/master/truffle/build/contracts/TRXToken.json).

## Transfer Gateway Tutorials

For more details on how to transfer tokens between Loom and other chains like Ethereum, Tron, and Binance see our [transfer gateway exampls](transfer-gateway-example.html) page.
