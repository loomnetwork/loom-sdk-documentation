---
id: basic-install-all
title: Install Loom SDK
sidebar_label: Install Loom SDK
---

# Installing and setting up Loom

Currently the only way to use Loom on Windows is to use the   [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).1

Once you install that you can continue with the below sections.

## Download loom

The following script automatically downloads the latest stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## Initialize

To initialize loom, type:

```bash
./loom init
```

## Run Blockchain

Run the following command from within the directory created in the installation step:

```bash
./loom run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](join-testnet.html)

## To get started with Golang Contracts

See our [Golang Contracts](prereqs-all.html)


## To get started with universal transaction signing

Loom Mainnet has the ability to verify and accept transactions signed by native Ethereum wallets. In a nutshell, users can simply use their MetaMask account or any other native Ethereum wallet — further blending the line between Layer 1 and Layer 2.


In the next sections, we'll briefly walk you through the setup required to enable universal transaction signing in your app.

### Connecting to Loom

The first thing we want to do is to instantiate a new `Client`:

```js
this.client = new Client(
  this.chainId,
  this.writeUrl,
  this.readUrl
)
```

Once the client gets instantiated, we must force personal sign by pretending to be MetaMask no matter what the web3 provider actually is:

```js
let provider = this.web3js.currentProvider
provider.isMetaMask = true
const ethersProvider = new ethers.providers.Web3Provider(provider)
```

Next, let's call the `createDefaultTxMiddleware` function as follows:

```js
this.client.txMiddleware = createDefaultTxMiddleware(this.client, privateKey)
```

This allows us to create the default set of tx middleware required to successfully commit transactions to Loom.

### Configuring LoomProvider

Now, we want to instantiate and configure `LoomProvider`:

```js
this.loomProvider = new LoomProvider(this.client, privateKey)
this.loomProvider.callerChainId = this.callerChainId
this.loomProvider.setMiddlewaresForAddress(to.local.toString(), [
  new NonceTxMiddleware(
    new Address(this.callerChainId, LocalAddress.fromHexString(this.ethAddress)),
    this.client
  ),
  new SignedEthTxMiddleware(signer)
])
```

Note that we're using the `SignedEthTxMiddleware` which lets us sign transactions via an Ethereum compatible wallet like Metamask.

### Instantianting the contract

For the scope of this example, we are using the [SimpleStore](https://github.com/loomnetwork/eth-signing-demo/blob/master/truffle/contracts/SimpleStore.sol) smart contract. Instantiating it is as simple as:

```js
const web3 = new Web3(this.loomProvider)
this.contract = new web3.eth.Contract(SimpleStoreJSON.abi, SimpleStoreJSON.networks[this.networkId].address)
```

### Universal transaction signing in action

Now, to execute the `set` method of our smart contract, we can do something like this:

```js
await this.contract.methods
  .set(value)
  .send({
    from: this.ethAddress
  })
```

If everything works well you should see a Metamask popup asking you to confirm the transaction:

![Eth Signing](/developers/img/eth-signing-metamask-popup.gif)

Note that you just signed transactions on Loom without even accessing your eth wallet keys😉.

### Demo Project

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).


## Universal transaction signing with Portis

Universal transactions signing works with Portis as well. We've added a simple demo to our [example repo](https://github.com/loomnetwork/eth-signing-demo/blob/master/src/eth-signing-portis.js).

![Portis Demo](/developers/img/Portis-demo.gif)

To see it in action, you must checkout [the repo](https://github.com/loomnetwork/eth-signing-demo) and follow the instructions in the README.md file.
