---
id: how-to-prepare-for-the-transfer-gateway-update
title: How to Prepare for the Transfer Gateway Update
---

## Purpose

As part of the Basechain upgrade, we'll be updating the Transfer Gateway. To make the transition as smooth as possible, we've added a new API to `loom-js` for interacting with the Transfer Gateway. This page outlines the changes you'll need to make in order to ensure your DApp continues to work after the Transfer Gateway update goes live.

## 1. Update loom-js to 1.70.1

To use the new API, you have to make sure that you're running `loom-js` version `1.70.1` or later.

In a terminal window, type the following command to see your `loom-js` version:

```bash
npm ls --depth=0 loom-js
```

If you're running a version earlier than `1.70.1`, you can update it by entering the following command:

```bash
npm install loom-js@1.70.1
```

## 2. Changes to the loom-js API

You must make the following changes so that your codebase correctly uses the new loom-js API. **Otherwise, you won't be able to transfer assets from Loom to Ethereum.**

### 2.1 Use the createEthereumGatewayAsync function to Instantiate the Ethereum Transfer Gateway Used for Withdrawals

The way in which you must instantiate the Ethereum Transfer Gateway used for withdrawals has changed. That said, you need to import the `createEthereumGatewayAsync` function from `loom-js` using something like this:

```js
import {
  LocalAddress,
  CryptoUtils,
  Address,
  Contracts,
  createEthereumGatewayAsync, //Include this line!
  getMetamaskSigner
} from 'loom-js'
```

Then, you can instantiate the gateway as follows:

```js
async _getEthereumTransferGatewayContract(web3Ethereum) {
  const networkId = await web3Ethereum.eth.net.getId()
  console.log("networkId", networkId);

  let version
  switch (networkId) {
    case 1: // Ethereum Mainnet
      version = 1
      break

    case 4: // Rinkeby
      version = 2
      break
    default:
      throw new Error('Ethereum Gateway is not deployed on network ' + networkId)
  }

  /*
  * If you're running `loom-js` in Node.js, change the following 
  * line to something like:
  * const signer = new OfflineWeb3Signer(rinkeby.web3js,rinkeby.account)
  */
  const signer = getMetamaskSigner(web3Ethereum.currentProvider)

  this.ethereumGatewayContract = await createEthereumGatewayAsync(
    version,
    this._RinkebyGatewayAddress(), // In this example, we're instantiating the Rinkeby transfer gateway
    signer
  )
}
```

### 2.2 Use the withdrawalReceiptAsync Function to Get the Withdrawal Receipt

Prior to `loom-js` 1.70.1, you've probably used something similar to the following to get the withdrawal receipt:

```js
const data = await gatewayContract.withdrawalReceiptAsync(userLocalAddr)
if (!data) {
  return null
}
const signature = CryptoUtils.bytesToHexAddr(data.oracleSignature)
return {
  signature: signature,
  amount: data.value.toString(10),
  tokenContract: data.tokenContract.local.toString()
}
```

With `loom-js` 1.70.1, you can replace this snippet with an one-liner:

```js
const receipt = await gatewayContract.withdrawalReceiptAsync(userLocalAddr)
```

### 2.3 Call the withdrawAsync Function to Withdraw Your Assets from the Ethereum Gateway

We've also streamlined the way in which assets get withdrawn from the transfer gateway. Instead of calling different methods depending on what asset you want to withdraw, with 1.70.1, you can use the following snippet:

```js
const tx = await gatewayContract.withdrawAsync(receipt, { gasLimit: gas })
return tx.hash
```

Please note that you must also call the `withdrawAsync` function to resume a withdrawal.

## Sample Code

We've updated our examples to reflect the changes to the API. If you're running `loom-js` in Node.js, please refer to the [truffle-dappchain-example](https://github.com/loomnetwork/truffle-dappchain-example/blob/master/gateway-cli.js) repository for more details. If you're running `loom-js` in the browser, please see the [loom-examples](https://github.com/loomnetwork/loom-examples) repository.

If you get stuck at some point, feel free to contact us and we'll help you out!
