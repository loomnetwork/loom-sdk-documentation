---
id: deposit-and-withdraw-trx
title: Deposit and Withdraw TRX
---

Loom’s Basechain is integrated with TRON, which means TRON developers can directly interact with all dapps built on Loom Basechain.

This guide walks you through the basics of building a simple web app that lets users deposit and withdraw TRX between Shasta and Loom Testnet.

## Getting Started

[TronWeb](https://developers.tron.network/docs/tron-web-intro) is a Javascript library that enables web apps to "talk" with the TRON blockchain. So, the first thing we would want to do is to install `Tron-Web`:

```bash
npm install tronweb
```

Next, let's instantiate `TronWeb`:

```js
await new Promise((resolve) => {
  const tronWebState = {
    installed: !!window.tronWeb,
    loggedIn: window.tronWeb && window.tronWeb.ready && window.tronWeb.fullNode.host != 'http://127.0.0.1'
  }

  if (tronWebState.installed) {
    this.tronLinkStatus = tronWebState
  }

  if (tronWebState.loggedIn) {
    this.tronWeb = window.tronWeb
    this.tronAddrBase58 = window.tronWeb.defaultAddress.base58
    this.tronCurrentNetwork = window.tronWeb.fullNode.host
  } else {
    this.userTronAddr = null
    this.tronCurrentNetwork = null
  }

  return resolve()
})
```

## Connecting to Loom

Now that we've instantiated `TronWeb`, the next thing we would want to do is to connect to Loom by instantiating a new Client:

```js
this.client = new Client(
  this.chainId,
  this.writeUrl,
  this.readUrl
)
```

and configuring it with the default middleware:

```js
this.client.txMiddleware = createDefaultTxMiddleware(this.client, privateKey)
```

## Mapping Addresses

Once we've initialized and configured the client, let's check if our addresses are already mapped. If not, we're going to add a new mapping:


```js
const addressMapper = await AddressMapper.createAsync(this.client, this.loomLocalAddress)
if (!(await addressMapper.hasMappingAsync(this.loomLocalAddress))) {
  try {
    await addressMapper.addIdentityMappingAsync(
      this.loomLocalAddress,
      this.trxAddrObj,
      signer
    )
  } catch (error) {
    console.log('This Loom account has been mapped to a different Tron address.')
    throw (error)
  }
} else {
  console.log('Address mapping already exists.')
}
```

## Instantiating Our Smart Contracts

For the scope of this tutorial, we need to instantiate 3 smart contracts:

### Tron Transfer Gateway Smart Contract

```js
this.tronGateway = await this.getContract(TRX_GATEWAY_ADDRESS)
```

### Loom Transfer Gateway Smart Contract

```js
this.loomGateway = await Contracts.TronTransferGateway.createAsync(
  this.client,
  this.loomLocalAddress
)
```

### TRX Coin Smart Contract

```js
this.loomTRX = new this.loomWeb3.eth.Contract(erc20abi.abi, TRX_COIN_ADDRESS_HEX)
```

### Deposit TRX

You can easily deposit TRX to Loom with the following line of code:

```js
await this.tronGateway.sendToken().send({ 'from': this.tronAddrBase58, 'callValue': TRX_AMOUNT })
```

### Withdraw TRX

To withdraw TRX, you should follow the steps below:

1. Approve the Transfer Gateway to take the token:

```js
await this.loomTRX.methods.approve(LOOM_GATEWAY_ADDRESS, TRX_AMOUNT).send({ from: this.loomAddressInHex })
```

2. Withdraw TRX using something like this:

```js
receipt = await this.loomGateway.withdrawTRXAsync(new BN(TRX_AMOUNT, 10))
```

3. This will create a pending withdrawal. Then, the Gateway Oracle will pick the pending withdrawal and, after a small delay, it will sign the pending withdrawal and submit the signature to the DAppChain Gateway. In turn, the DAppChain Gateway emits an event to notify us that the pending withdrawal has been signed. Here's how we can make sure that the event has been emitted:

```js
const timeout = 60 * 1000
const gatewayContract = this.loomGateway
const receiveSignedWithdrawalEvent = new Promise((resolve, reject) => {
  let timer = setTimeout(
    () => reject(new Error('Timeout while waiting for withdrawal to be signed')),
    timeout
  )
  const listener = event => {
    console.log('receiveSignedWithdrawalEvent resolved')

    if (
      event.tokenContract.local.toString() === TRON_DAPP_ADDRESS &&
      event.tokenOwner.toString() === this.trxAddrObj.toString()
    ) {
      clearTimeout(timer)
      timer = null
      gatewayContract.removeAllListeners(Contracts.TransferGateway.EVENT_TOKEN_WITHDRAWAL)
      console.log('Oracle signed tx ', CryptoUtils.bytesToHexAddr(event.sig))
      resolve(event)
    }
  }
  gatewayContract.on(Contracts.TransferGateway.EVENT_TOKEN_WITHDRAWAL, listener)
})

await receiveSignedWithdrawalEvent
```

Then, we can get the withdrawal receipt and the signature using something like this:

```js
let data = await this.loomGateway.withdrawalReceiptAsync(this.loomLocalAddress)
if (!data) return null
  let signature = CryptoUtils.bytesToHexAddr(data.oracleSignature)
```

4. Lastly, let's withdraw TRX to our TRON account:

```js
let sig = signature
if (sig.length > 132) {
  let byteToOmit = sig.length - 132 + 2 // +2 from `0x`
  sig = sig.slice(byteToOmit)
  sig = '0x' + sig
}

const r = sig.slice(0, 66)
const s = '0x' + sig.slice(66, 130)
let v = '0x' + sig.slice(130, 132)
v = this.loomWeb3.utils.toDecimal(v)
await this.tronGateway.withdrawTRX(TRX_AMOUNT, r, s, v).send({ from: this.tronAddrBase58 })
```

## Refreshing Balances

We'll be using a simple function to refresh our balances:

```js
async refreshBalance () {
  const loomBalance = await this.loomTRX.methods.balanceOf(this.loomAddressInHex).call({ from: this.loomAddressInHex })
  const shastaBalance = await this.tronWeb.trx.getBalance(this.tronAddrBase58)
  this.info = 'Refreshing balances.'
  this.info = 'LoomTRX balance: ' + loomBalance + ' Shasta TRX balance: ' + shastaBalance
},
```

On Loom, we can just listen to events using something like this:

```js
async filterEvents () {
  this.loomTRX.events.Transfer({ filter: { } }, async (err, event) => {
    if (err) console.error('Error on event', err)
    await this.refreshBalance()
  })
}
```

Since TRX is a native token on TRON, there are no events we could listen to. Thus, to make it so that the web UI automatically updates our balance on TRON, we will poll the account balance as follows:

```js
const maxRetries = 10
let retries = 0
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const initialShastaBalance = await this.tronWeb.trx.getBalance(this.tronAddrBase58)
let currentShastaBalance = initialShastaBalance
while (initialShastaBalance == currentShastaBalance && retries < maxRetries) {
  currentShastaBalance = await this.tronWeb.trx.getBalance(this.tronAddrBase58)
  await delay(2000)
  retries++
}
if (retries == maxRetries) {
  console.log('Waiting is over... No change!')
} else {
  console.log('Balance updated after ' + retries + ' retries. Refreshing balances')
  await this.refreshBalance()
}
```

## Wrapping it up

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).
