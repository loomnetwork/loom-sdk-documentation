---
id: how-to-get-started
title: How to Get Started
sidebar_label: How to Get Started
---

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](deploy-loom-testnet.html)

## To get started with Golang Contracts

See our [Golang Contracts](prereqs-all.html)

## To get started with universal transaction signing

Loom Mainnet has the ability to verify and accept transactions signed by native Ethereum wallets. In a nutshell, users can simply use their MetaMask account or any other native Ethereum wallet — further blending the line between Layer 1 and Layer 2.

In the next sections, we'll briefly walk you through the setup required to enable universal transaction signing in your app.

### Connecting to Loom

The first thing we want to do is to instantiate a new `Client`:

```js
  _createClient () {
    const chainId = this.extdevConfig['chainId']
    const writeUrl = this.extdevConfig['writeUrl']
    const readUrl = this.extdevConfig['readUrl']
    const client = new Client(chainId, writeUrl, readUrl)
    return client
  }
  ```

### Pretending to be Metamask

Once the client gets instantiated, we must force personal sign by pretending to be MetaMask no matter what the web3 provider actually is:

```js
    const ethProvider = web3js.currentProvider
    ethProvider.isMetaMask = true
```

### Setting Up a Signer

Next, let's setup a a signer and then get the `callerAddress` (that is your address on Ethereum or Rinkeby):

```js
  async _setupSigner (plasmaClient, provider) {
    const signer = getMetamaskSigner(provider)
    const ethAddress = await signer.getAddress()
    const callerAddress = new Address('eth', LocalAddress.fromHexString(ethAddress))

    plasmaClient.txMiddleware = [
      new NonceTxMiddleware(callerAddress, plasmaClient),
      new SignedEthTxMiddleware(signer)
    ]

    return callerAddress
  }
```

This allows us to create the default set of tx middleware required to successfully commit transactions to Loom.

### Creating a Temporary Loom Provider

Now, we can create a temporary provider for Loom:

```js
  async _createLoomProvider (client, callerAddress) {
    const dummyKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(dummyKey)
    const dummyAccount = LocalAddress.fromPublicKey(publicKey).toString()
    const loomProvider = new LoomProvider(
      client,
      dummyKey,
      () => client.txMiddleware
    )
    loomProvider.setMiddlewaresForAddress(callerAddress.local.toString(), client.txMiddleware)
    loomProvider.callerChainId = callerAddress.chainId
    // remove dummy account
    loomProvider.accounts.delete(dummyAccount)
    loomProvider._accountMiddlewares.delete(dummyAccount)
    return loomProvider
  }
```

Note that we're using a dummy key and, once `LoomProvider` and instantiated and the middlewares are added, it is no longer needed.

### Checking Mappings

At this point, we want to check if your Ethereum account has been already mapped:

```js
    let accountMapping = await this._loadMapping(callerAddress, client)
    if (accountMapping === null) {
      console.log('Create a new mapping')
      const signer = getMetamaskSigner(ethProvider)
      await this._createNewMapping(signer)
      accountMapping = await this._loadMapping(callerAddress, client)
      console.log(accountMapping)
    } else {
      console.log('mapping already exists')
    }
```

Here's how the function that check if a mapping exists looks like:

```js
  async _loadMapping (ethereumAccount, client) {
    const mapper = await AddressMapper.createAsync(client, ethereumAccount)
    let accountMapping = { ethereum: null, plasma: null }
    try {
      const mapping = await mapper.getMappingAsync(ethereumAccount)
      accountMapping = {
        ethereum: mapping.from,
        plasma: mapping.to
      }
    } catch (error) {
      console.error(error)
      accountMapping = null
    } finally {
      mapper.removeAllListeners()
    }
    return accountMapping
  }
```

### Adding a New Mapping

If a mapping doesn't exist we'll add it with:

```js
  async _createNewMapping (signer) {
    const ethereumAccount = await signer.getAddress()
    const ethereumAddress = Address.fromString(`eth:${ethereumAccount}`)
    const plasmaEthSigner = new EthersSigner(signer)
    const privateKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = this._createClient()
    client.txMiddleware = createDefaultTxMiddleware(client, privateKey)
    const loomAddress = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))

    const mapper = await AddressMapper.createAsync(client, loomAddress)
    try {
      await mapper.addIdentityMappingAsync(
        ethereumAddress,
        loomAddress,
        plasmaEthSigner
      )
      client.disconnect()
    } catch (e) {
      if (e.message.includes('identity mapping already exists')) {
      } else {
        console.error(e)
      }
      client.disconnect()
      return false
    }
  }
```

Again, note that once the mapping is created, the private key is not needed anymore.

### Instantianting the contract

For the scope of this example, we are using the [SimpleStore](https://github.com/loomnetwork/eth-signing-demo/blob/master/truffle/contracts/SimpleStore.sol) smart contract. Instantiating it is as simple as:

```js
  async _getContract () {
    this.contract = new this.web3loom.eth.Contract(SimpleStoreJSON.abi, SimpleStoreJSON.networks[this.extdevConfig['networkId']].address)
  }
```

### Universal transaction signing in action

Now, to execute the `set` method of our smart contract, we can do something like this:

```js
  async _setValue () {
    const ethAddress = this.accountMapping.ethereum.local.toString()
    const value = parseInt(this.counter, 10)
    await this.contract.methods
      .set(value)
      .send({
        from: ethAddress
      })
  }
```

If everything works well you should see a Metamask popup asking you to confirm the transaction:

![Eth Signing](/developers/img/eth-signing-metamask-popup.gif)

Note that you just signed transactions on Loom without even accessing your eth wallet keys😉.

### Demo Project

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).

### Other Wallets

If you use Portis or Fortmatic, head over to [this page](others.html).