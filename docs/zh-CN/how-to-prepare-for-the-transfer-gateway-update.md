---
id: how-to-prepare-for-the-transfer-gateway-update
title: How to Prepare for the Transfer Gateway Update
---

## Purpose

As part of the Basechain upgrade, we'll be updating the Transfer Gateway which will include
redeployment of the Gateway contract to Ethereum Mainnet. To make the transition as smooth as
possible, we've added a new API to `loom-js` for interacting with the Ethereum Gateway contracts.
This page outlines the changes you'll need to make in order to ensure your DApp continues
to work after the Transfer Gateway update goes live.

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

You should update your code to use the new `loom-js` Ethereum Gateway wrapper API to ensure minimal
disruption when the Ethereum Gateway contract is updated on Ethereum Mainnet. Otherwise, users of
your DApp will not be able to transfer assets from Loom to Ethereum.

### 2.1 Use the createEthereumGatewayAsync function to Instantiate the Ethereum Transfer Gateway

The method signatures of the withdraw methods on the latest version of the Ethereum Gateway
contract have changed, `loom-js` provides a thin wrapper over the Ethereum Gateway contract that
provides a uniform interface regardless of the version of the underlying Gateway contract.
The wrapper can be instantiate using the `createEthereumGatewayAsync` function like this:

```js
import {
  LocalAddress,
  CryptoUtils,
  Address,
  Contracts,
  createEthereumGatewayAsync, // Include this line!
  getMetamaskSigner
} from 'loom-js'

// Returns a new wrapper for the Ethereum Gateway contract
async function getEthereumGatewayContract() {
  const networkId = await web3.eth.net.getId()

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
  * If you're running `loom-js` in Node.js, change the following line to something like:
  * const signer = new OfflineWeb3Signer(web3, account)
  */
  const signer = getMetamaskSigner(web3.currentProvider)
  const ethereumGatewayContract = await createEthereumGatewayAsync(
    version,
    this._RinkebyGatewayAddress(), // In this example, we're instantiating the Rinkeby transfer gateway
    signer
  )
}
```

### 2.2 Use the withdrawalReceiptAsync Function to Get the Withdrawal Receipt

Prior to `loom-js` 1.70.1, you probably did something like this to retrieve a withdrawal receipt:

```js
const receipt = await loomGatewayContract.withdrawalReceiptAsync(userLocalAddr)
if (!receipt) {
  return null
}
const signature = CryptoUtils.bytesToHexAddr(receipt.oracleSignature)
return {
  signature: signature,
  amount: receipt.value.toString(10),
  tokenContract: receipt.tokenContract.local.toString()
}
```

In `loom-js` 1.70.1 you no longer have to worry about what's in the receipt, nor do you need to figure
out which of the `withdraw` functions you need to pass the receipt to, the wrapper will handle that for you:

```js
const receipt = await loomGatewayContract.withdrawalReceiptAsync(userLoomAddr)
const tx = await ethereumGatewayContract.withdrawAsync(receipt, { gasLimit: gas })
return tx.hash
```

Please note that you must also call the `withdrawAsync` function to resume a withdrawal.

## Sample Code

We've updated our examples to reflect the changes to the API. If you're running `loom-js` in Node.js, please refer to the [truffle-dappchain-example](https://github.com/loomnetwork/truffle-dappchain-example/blob/master/gateway-cli.js) repository for more details. If you're running `loom-js` in the browser, please see the [loom-examples](https://github.com/loomnetwork/loom-examples) repository.

If you get stuck at some point, feel free to contact us and we'll help you out!
