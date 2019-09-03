---
id: deposit-and-withdraw-bnb
title: Deposit and Withdraw BNB
---

## Purpose

Loom’s PlasmaChain has recently integrated with Binance Chain, which means users can now easily deposit and withdraw BNB between Binance Chain and Loom.

This guide walks you through the basics of building a simple web app that lets users deposit and withdraw BNB between Binance Testnet and Loom Testnet.

## Requirements

Make sure the following requirements are met and then follow the steps in the next section:

- Operating system: Linux or macOS. If you're running Windows, please install the Windows Subsystem for Linux. See the [Install the Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) page for details on installing WSL.
- Node.js 10 or higher (recommended v10.15.3)

## Getting Started

The first thing we would want to do is to import a few things:

```js
import {
  Client, LocalAddress, CryptoUtils, LoomProvider, Address, createDefaultTxMiddleware
} from 'loom-js'
import BN from 'bn.js'
import Web3 from 'web3'
import bnbToken from '../../truffle/build/contracts/BNBToken.json'
import { BinanceTransferGateway } from 'loom-js/dist/contracts'
import bech32 from 'bech32'
```

Next, we instantiate the client and configure the default middleware:

```js
_createClient () {
    this.privateKey = this._getPrivateKey()
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    const writeUrl = 'wss://extdev-plasma-us1.dappchains.com/websocket'
    const readUrl = 'wss://extdev-plasma-us1.dappchains.com/queryws'
    const networkId = 'extdev-plasma-us1'
    this.client = new Client(networkId, writeUrl, readUrl)
    this.client.on('error', msg => {
      console.error('Error connecting to extdev.', msg)
    })
    this.client.txMiddleware = createDefaultTxMiddleware(this.client, this.privateKey)
  }
```

## Instantiating the BNB Coin Contract

On Loom, your BNB get automatically deposited to pre-deployed contract. Let's instantiate it using something like this:

```js
  _getLoomBNBContract () {
    const bnbCoinAddress = '0x9ab4e22d56c0c4f7d494442714c82a605d2f28e0'
    this.loomBNBContract = new this.web3.eth.Contract(bnbToken.abi, bnbCoinAddress)
  }
```

### The Loom Transfer Gateway Smart Contract

To withdraw BNB from Extdev to Binance Chain, we'll need to instantiate the Binance Transfer Gateway smart contract:

```js
  async _getLoomBNBTransferGatewayContract () {
    this.loomBNBGateway = await BinanceTransferGateway.createAsync(
      this.client,
      Address.fromString('extdev-plasma-us1:' + this.loomUserAddress)
    )
  }
```

### Deposit BNB

You can easily deposit BNB from Binance. First, you will need to create a wallet by following the instructions from [this page](https://testnet.binance.org/en/). Next, head over to the [testnet faucet](https://www.binance.com/en/dex/testnet/address) to add testnet funds to your account.

Now, your can transfer some BNB to the Extdev hot wallet address: `tbnb1gc7azhlup5a34t8us84x6d0fluw57deuf47q9w`. There's something you must pay attention to: copy Extdev address and paste it into the memo field. Our demo will generate a private key for you and compute the extdev address:

![Deposit and Withdraw BNB](/developers/img/bnb-deposit-withdraw.png)

Just follow the instructions and you're set.


### Withdraw BNB

To withdraw BNB, you should basically follow classic approve and transfer flow:

1. Approve the Transfer Gateway to take the token:

```js
await this.loomBNBContract.methods.approve(loomBNBTransferGatewayAddress, amountInt + fee).send({ from: this.loomUserAddress })
```

2. Withdraw using something like this:

```js
await this.loomBNBGateway.withdrawTokenAsync(new BN(amountInt - fee, 10), bnbTokenAddress, recipient)
```


## Refreshing the BNB  Balance

To automatically refresh the BNB balance, we're listening to events like so:

```js
  async _filterEvents () {
    this.loomBNBContract.events.Transfer({ filter: { address: this.loomUserAddress } }, async (err, event) => {
      if (err) console.error('Error on event', err)
      this._refreshBalance()
    })
  }
```

Next, we refresh the balance with:

```js
  async _refreshBalance () {
    this.bnbBalance = await this.loomBNBContract.methods.balanceOf(this.loomUserAddress).call({ from: this.loomUserAddress })
    this.bnbBalance = this.bnbBalance / 100000000
    EventBus.$emit('updateBalance', { newBalance: this.bnbBalance })
  }
```

## Demo Project

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).
