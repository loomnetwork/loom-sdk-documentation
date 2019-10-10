---
id: binance-loom-ethereum
title: Move tokens between Binance, Loom, and Ethereum
---

## Purpose

This is the third guide in our Binance series. First, we walked you through the process of [transferring BNB](deposit-and-withdraw-bnb.html) between Binance and Loom.

However, as a developer, you can also launch your BEP2 token on Binance. Thus, our [second guide](deposit-and-withdraw-bep2.html) showed how to build a simple DApp that transfers BEP2 tokens between Binance and Loom.

Now, we are going to explain how to transfer your tokens between Binance, Loom, and Ethereum.

## Prerequisites

We assume you've covered the first two parts of our Binance series. If so, let's make sure your local copy of the [Loom Examples repo](https://github.com/loomnetwork/loom-examples) is updated. You must `cd` into the `loom-examples` directory and run:

```bash
git pull
```

Next, let's make sure your dependencies are up-to-date:

```text
npm install
```

## Settings Things Up

If you've followed along with our previous Binance tutorials, a BEP2 token and a corresponding smart contract on the Loom side (that is Extdev) should have been deployed and mapped.

Now, to move tokens to Ethereum, we are required to deploy a new contract called `SampleERC20MintableToken` to the Ethereum test net (for the scope of this example we're using the Rinkeby network).

Follow these steps to deploy the smart contract to Rinkeby:

1. Generate an Ethereum private key:

   ```bash
   # this will create 3 new files in the root directory of the project: rinkeby_account, rinkeby_mnemonic, and rinkeby_private_key
   npm run gen:rinkeby-key
   ```

2. Get the address of the new `Rinkeby` account from the `rinkeby_account` file:

   ```bash
   cat rinkeby_account
   ```

3. Give the `Rinkeby` account some ETH so it can be used to deploy contracts to `Rinkeby`. You can either use the [Rinkeby authenticated faucet](https://faucet.rinkeby.io) or transfer some ETH from another account.

4. Set your Infura API key (get it from [Infura website](https://infura.io)):

   ```bash
   export INFURA_API_KEY=XXXXXXXXXXXXXXXX
   ```

5. Deploy the contract by running:
    ```bash
    npm run migrate:rinkeby-bep2-token
    ```

6. Like we did in our previous tutorial with the BEP2 token and its corresponding smart contract on Loom, we must now map our Loom contract with the newly deployed contract on Rinkeby. You can create the mapping with:

    ```bash
    npm run map:bep2-contracts
    ```

## Spinning Up the Demo

Once you completed the previous steps, you are ready to see the demo in action. Run the following command:

```bash
npm run start
```

Next, just point your browser at [localhost:8080](http://localhost:8080) and select the "Binance - Loom - Ethereum" demo.

## Trying Out the Demo

The first thing you need to do is to move some BNB tokens from Binance to Extdev:

![Move BNB from Binance to Extdev](/developers/img/binance-loom-ethereum-1-deposit-bnb.gif)

Then, let's transfer some BEP2 tokens from Binance to Extdev:

![Move BEP2 from Binance to Extdev](/developers/img/binance-loom-ethereum-2-deposit-bep2.gif)

Now, we can send our tokens from Extdev to Rinkeby:

![Move BEP2 from Extdev to Rinkeby](/developers/img/binance-loom-ethereum-3-deposit-bep2-to-rinkeby.gif)

...and from Rinkeby to Extdev:

![Move BEP2 from Rinkeby to Extdev](/developers/img/binance-loom-ethereum-4-withdraw-bep2-to-loom.gif)

Lastly, let's move tokens from Extdev to Binance:

![Move BEP2 from Rinkeby to Extdev](/developers/img/binance-loom-ethereum-5-withdraw-bep2-to-binance.gif)

## Let's See What Makes it Tick

At its core, this demo is built around a couple of simple components:

 - a BEP2 token. See the [settings things up](deposit-and-withdraw-bep2.html#_1-setting-things-up) page from our previous tutorial for more details.
 - a corresponding ERC20 token deployed to Loom Testnet. We've walked you through the source code in [this section](deposit-and-withdraw-bep2.html#_1-e-deploying-to-loom-testnet).
 - an ERC20 token called `SampleERC20MintableToken` which we just deployed to the Rinkeby network. This smart contract is nothing special. It just starts by inheriting from `ERC20/ERC20Mintable.sol` and `./IERC20GatewayMintable.sol`:

```js
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "./IERC20GatewayMintable.sol";
```

While we're here, let's take a glance at the `./IERC20GatewayMintable.sol` smart contract:

```js
pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20 interface for token contracts deployed to mainnet that let Ethereum Gateway mint the token.
 */
contract IERC20GatewayMintable is ERC20 {
    // Called by the Ethereum Gateway contract to mint tokens.
    //
    // NOTE: the Ethereum gateway will call this method unconditionally.
    function mintTo(address _to, uint256 _amount) public;
}
```

As you can see, it's an abstract contract (cannot be directly compiled because the `mintTo` function lacks the implementation). We're just using it as a base contract.

Now let's get back to the `SampleERC20MintableToken` smart contract. There are a few things to note:

1. The constructor takes the address of the transfer gateway as a parameter and saves it to a mapping:

```js
 constructor(address _gateway) public {
        gateways[_gateway] = true;
        validators[msg.sender] = true;
        name = "erc20mintable";
        symbol = "MNT20";
    }
```

2. We implement a function called `mintTo` that allows the transfer gateway to mint tokens:

```js
 function mintTo(address _to, uint256 _amount) onlyGateway public {
        _mint(_to, _amount);
    }
```

Note that we put a restriction on who can call this method- only the transfer gateway can call it. Here's how the modifier looks like:

```js
modifier onlyGateway(){
  require(gateways[msg.sender] == true, "only gateways are allowed mint");
  _;
}
```

You can check the full [source code](https://github.com/loomnetwork/loom-examples/blob/master/mainnet/contracts/SampleERC20MintableToken.sol) of this smart contract on GitHub.

 - Lastly, to tie everything together, we created two mappings. The first one [links the Binance and Loom(https://github.com/loomnetwork/loom-examples/blob/master/scripts/map-binance-contracts.js)] token contracts and the second one [links the Loom and Ethereum](https://github.com/loomnetwork/loom-examples/blob/master/scripts/map-contracts.js) token contracts.

## The Front-End

In this section, we'll take a quick look at what happens under the hood of our front-end.

We split the code roughly into two files.

### The User Interface

The `/src/binance-loom-ethereum.js` file mainly deals with the user interface. 
Because transferring tokens to Binance and Ethereum requires us to pay fees, we start by initializing the [BNBCoin](https://github.com/loomnetwork/loom-examples/blob/master/src/bnb/BNBCoin.js) and [LoomEthCoin](https://github.com/loomnetwork/loom-examples/blob/master/src/LoomEthCoin/LoomEthCoin.js) classes:

```js
this.bep2Coin = new BinanceExtdevRinkeby()
await this.bep2Coin.load(this.web3js)
this.bnbCoin = new BNBCoin()
await this.bnbCoin.load(this.web3js)
this.ethCoin = new LoomEthCoin()
await this.ethCoin.load(this.web3js)

```

For convenience, we've added a new function to the `BNBCoin` that approves the gateway to take the fee:


```js
async approveFee () {
  const fee = 37500
  EventBus.$emit('updateStatus', { currentStatus: 'Approving the gateway to take the BNB fee.' })
  const binanceTransferGatewayAddress = await this._getBinanceTransferGatewayAddress()
  await this.loomBNBContract.methods.approve(binanceTransferGatewayAddress, fee).send({ from: this.accountMapping.ethereum.local.toString() })
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  let approvedBalance = 0
  while (approvedBalance == 0) {
    approvedBalance = await this.loomBNBContract.methods.allowance(this.loomUserAddress, binanceTransferGatewayAddress).call({ from: this.accountMapping.ethereum.local.toString() })
    await delay(5000)
  }
  EventBus.$emit('updateStatus', { currentStatus: 'Approved the gateway to take the BNB fee.' })
}

```

Then, we did the same for the `LoomEthCoin.js` class:

```js
async approveFee () {
  const gatewayAddress = Address.fromString(this.loomGatewayContract.address.toString())
  await this.ethCoin.approveAsync(gatewayAddress, new BN(this._gas()))
}
```

Next, we implement a couple of functions that simpy call the corresponding methods on the `bnbCoin`, `bep2Coin`, and `ethCoin` objects:

```js
async withdrawToBinance () {
  if ((this.binanceAddress === null) || (this.binanceAddress.length === 0)) {
    console.log('Binance Address should not be empty.')
    return
  }
  const amountToWithdraw = 5
  console.log('Withdrawing ' + amountToWithdraw + ' tokens to ' + this.binanceAddress)
  await this.bnbCoin.approveFee()
  console.log('Approved the transfer gateway to take the fee.')
  await this.bep2Coin.withdrawToBinance(this.binanceAddress, amountToWithdraw)
  console.log('Tokens withdrawn.')
},
async withdrawToEthereum () {
  const amount = 5
  await this.ethCoin.approveFee()
  this.bep2Coin.withdrawToEthereum(amount)
},
async depositToLoom () {
  const amount = 5
  this.bep2Coin.depositToLoom(amount)
},
async resumeLoomToEthereum () {
  this.bep2Coin.resumeWithdrawal()
},
```

### The BinanceExtdevRinkeby class
  
The `BinanceExtdevRinkeby` class is where we've baked most of the logic. First, we import a few things:

```js
import {
  LocalAddress,
  CryptoUtils,
  Address,
  Contracts
} from 'loom-js'
import BN from 'bn.js'
import extdevBEP2Token from '../../truffle/build/contracts/SampleBEP2Token.json'
import rinkebyBEP2Token from '../../mainnet/build/contracts/SampleERC20MintableToken.json'
import { BinanceTransferGateway } from 'loom-js/dist/contracts'
import bech32 from 'bech32'
import { EventBus } from '../EventBus/EventBus'
import GatewayJSON from '../../truffle/build/contracts/Gateway.json'
import { UniversalSigning } from '../UniversalSigning/UniversalSigning'
```

Next, we declare our class like this:


```js
export default class BinanceExtdevRinkeby extends UniversalSigning {
  // truncated for brevity
}
```

The thing to note about this code is that the class inherits from the `UniversalSigning` class. This lets us separate the logic so that we can easily initialize the class like this:

```js
async load (web3Ethereum) {
  const { web3Loom, accountMapping, client } = await super._load(web3Ethereum)
  this._getExtdevUserAddress(accountMapping)
  await this._getContracts(web3Ethereum, web3Loom, client, accountMapping)
  this.accountMapping = accountMapping
  this.client = client
  await this._filterEvents()
  await this._refreshBalance()
}
```

The `_load` function from the `UniversalSigning` class does a couple of things:

- first, it loads some values we don't want to hardcode (like the `chainId`) from a JSON file by calling the `_loadNetworkConfiguration` function.
- sets up a signer and gets your Ethereum address
- creates a new temporary provider for Loom,
- checks if a mapping exitsts. If not, it creates one.
- lastly, it returns the mapping togehter with the temporary provider and the `client`

Here's how the function looks like:

```js
async _load (web3Ethereum) {
    this._loadNetworkConfiguration()
    const client = this._createClient()
    client.on('error', console.error)
    const callerAddress = await this._setupSigner(client, web3Ethereum.currentProvider)
    console.log('callerAddress: ' + callerAddress)
    const loomProvider = await this._createLoomProvider(client, callerAddress)
    const web3Loom = new Web3(loomProvider)
    let accountMapping = await this._loadMapping(callerAddress, client)
    if (accountMapping === null) {
      console.log('Create a new mapping')
      const signer = getMetamaskSigner(web3Ethereum.currentProvider)
      await this._createNewMapping(signer)
      accountMapping = await this._loadMapping(callerAddress, client)
      console.log(accountMapping)
    } else {
      console.log('mapping already exists')
    }
    console.log('mapping.ethereum: ' + accountMapping.ethereum.toString())
    console.log('mapping.plasma: ' + accountMapping.plasma.toString())
    return { web3Loom, accountMapping, client }
  }
```

Now, let's get back to our function from the `BinanceExtdevRinkeby` class. Next, it initializes the contracts with `_getContracts`, and calls a function that we'll listen for events- `_filterEvents`. This way, every time our balance changes, the UI will get updated. Lastly, the function reads the initial balance by running `_refreshBalance`.

## Moving tokens from Loom to Ethereum

To move tokens from Loom to Ethereum, we follow a two-step process:

 - first, we approve the transfer gateway to take the fee:
 
```js
await this.ethCoin.approveFee()
```

 - once the transfer gateway is approved to take the fee, we run the `withdrawToEthereum` function on the `bep2Coin` object:

```js
async withdrawToEthereum (amount) {
  EventBus.$emit('updateStatus', { currentStatus: 'Transferring to Extdev Gateway.' })
  await this._transferCoinsToExtdevGateway(amount)
  EventBus.$emit('updateStatus', { currentStatus: 'Getting withdrawal receipt.' })
  const data = await this._getWithdrawalReceipt()
  EventBus.$emit('updateStatus', { currentStatus: 'Withdrawing from Rinkeby Gateway.' })
  await this._withdrawCoinsFromRinkebyGateway(data)
}
```

Again, this function is pretty straightforward. First, it transfers the tokens to the transfer gateway contract on the Loom side:

```js
async _transferCoinsToExtdevGateway (amount) {
  const multiplier = new BN(100000000, 10)
  const amountInt = (new BN(parseInt(amount), 10)).mul(multiplier)
  const dAppChainGatewayAddr = this.extdevNetworkConfig['extdev2RinkebyGatewayAddress']
  const ethAddress = this.accountMapping.ethereum.local.toString()
  await this.extdevBEP2Contract.methods
    .approve(dAppChainGatewayAddr, amountInt.toString())
    .send({ from: ethAddress })

  const timeout = 60 * 1000
  const ownerMainnetAddr = Address.fromString('eth:' + ethAddress)
  const loomCoinContractAddress = extdevBEP2Token.networks[this.extdevNetworkConfig['networkId']].address
  const tokenAddress = Address.fromString(this.extdevNetworkConfig['chainId'] + ':' + loomCoinContractAddress)
  const mainNetContractAddress = rinkebyBEP2Token.networks[this.rinkebyNetworkConfig['networkId']].address
  const gatewayContract = this.extdev2RinkebyGatewayContract

  const receiveSignedWithdrawalEvent = new Promise((resolve, reject) => {
    let timer = setTimeout(
      () => reject(new Error('Timeout while waiting for withdrawal to be signed')),
      timeout
    )
    const listener = event => {
      const tokenEthAddress = Address.fromString('eth:' + mainNetContractAddress)
      if (
        event.tokenContract.toString() === tokenEthAddress.toString() &&
        event.tokenOwner.toString() === ownerMainnetAddr.toString()
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
  await gatewayContract.withdrawERC20Async(
    amountInt,
    tokenAddress,
    ownerMainnetAddr
  )
  console.log('before receiveSignedWithdrawalEvent')
  await receiveSignedWithdrawalEvent
}
```

One thing to note. As seen above, calling `await gatewayContract.withdrawERC20Async` creates a pending withdrawal. The pending withdrawal is signed by the Gateway validators, and an event is emitted by the Gateway to notify users that a withdrawal has been signed. At that point, the user can fetch the signed withdrawal receipt from the Gateway and submit it to the Ethereum Gateway in order to withdraw the token to their Ethereum account.

- Next, we fetch the signed withdrawal record with:

```js
async _getWithdrawalReceipt () {
  const userLocalAddr = Address.fromString(this.accountMapping.plasma.toString())
  const gatewayContract = this.extdev2RinkebyGatewayContract
  const receipt = await gatewayContract.withdrawalReceiptAsync(userLocalAddr)
  return receipt
}
```

- lastly, let's withdraw the tokens to our Rinkeby account by calling the `withdrawCoinsFromRinkebyGateway` function and passing it the `data` structure containing the signature:


```js
async _withdrawCoinsFromRinkebyGateway (receipt) {
  const gatewayContract = this.ethereumGatewayContract
  const gas = this._gas()
  const tx = await gatewayContract.withdrawAsync(receipt, { gasLimit: gas })
  console.log(`Tokens withdrawn from MainNet Gateway.`)
  console.log(`Rinkeby tx hash: ${tx.hash}`)
}

```


## Moving tokens from Ethereum to Loom

To move move tokes from Ethereum to Loom, we run the `depositToLoom` function on the `bep2Coin` object:

```js
async depositToLoom (amount) {
  const multiplier = new BN(100000000, 10)
  const amountInt = (new BN(parseInt(amount), 10)).mul(multiplier)
  const rinkebyGatewayAddress = this.extdevNetworkConfig['rinkeby2ExtdevGatewayAddress']
  const rinkebyContractAddress = rinkebyBEP2Token.networks[this.rinkebyNetworkConfig['networkId']].address
  const userRinkebyAddress = this.accountMapping.ethereum.local.toString()
  EventBus.$emit('updateStatus', { currentStatus: 'Approving the transfer gateway to take the tokens.' })
  try {
    await this.rinkebyBEP2Contract
      .methods
      .approve(
        rinkebyGatewayAddress,
        amountInt.toString()
      )
      .send({ from: userRinkebyAddress })
  } catch (error) {
    console.log('Failed to approve Ethereum Gateway to take the coins.')
    throw error
  }
  EventBus.$emit('updateStatus', { currentStatus: 'Depositing to the transfer gateway.' })
  console.log('Calling depositERC20.')
  try {
    await this.rinkeby2ExtdevGatewayContract
      .methods
      .depositERC20(
        amountInt.toString(),
        rinkebyContractAddress
      )
      .send({ from: userRinkebyAddress, gas: '489362' })
  } catch (error) {
    console.log('Failed to transfer coin to the Ethereum Gateway')
    throw error
  }
  EventBus.$emit('updateStatus', { currentStatus: 'Tokens deposited!' })
}
```

First, it approves the transfer gateway to take the tokens and then calls the `depositERC20` method on the Rinkeby transfer gateway. The method expects two parameters: the amount to transfer and the address of the token contract.


## Moving Tokens from Ethereum to Binance

To move tokens from Ethereum to Binance, we first approve the gateway to take the fee by calling the `approveFee` function on the `bnbCoin` object and then run the `withdrawToBinance` function which takes two arguments: your address on Binance and the amount to withdraw. Here's how the `withdrawToBinance` function looks like:

```js
async withdrawToBinance (binanceAddress, amountToWithdraw) {
  const multiplier = new BN(100000000, 10)
  const amountInt = (new BN(parseInt(amountToWithdraw), 10)).mul(multiplier)
  EventBus.$emit('updateStatus', { currentStatus: 'Approving the gateway to take the tokens.' })
  const binanceTransferGatewayAddress = await this._getBinanceTransferGatewayAddress()
  await this.extdevBEP2Contract.methods.approve(binanceTransferGatewayAddress, amountInt.toString()).send({ from: this.accountMapping.ethereum.local.toString() })
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  let approvedBalance = 0
  EventBus.$emit('updateStatus', { currentStatus: 'Approved. Next -> Checking the allowance.' })
  while (approvedBalance == 0) {
    approvedBalance = await this.extdevBEP2Contract.methods.allowance(this.extdevUserAddress, binanceTransferGatewayAddress).call({ from: this.accountMapping.ethereum.local.toString() })
    await delay(5000)
  }
  EventBus.$emit('updateStatus', { currentStatus: 'Allowance checked. Next -> Withdrawing tokens to Binance' })
  const bep2TokenAddress = Address.fromString('extdev-plasma-us1:' + this.extdevBEP2Contract._address.toLowerCase())
  const tmp = this._decodeAddress(binanceAddress)
  const recipient = new Address('binance', new LocalAddress(tmp))
  await this.extdev2BinanceGatewayContract.withdrawTokenAsync(amountInt, bep2TokenAddress, recipient)
  EventBus.$emit('updateStatus', { currentStatus: 'Succesfully withdrawn!' })
  await delay(1000)
}
```

If you've made through here, congrats! You should have a good understanding of how to transfer tokens between Binance, Loom, and Ethereum. The best way to move forward is to get your hands dirty and try to create some great stuff based on this demo.

In the meantime, please feel free to reach out to us on [Telegram](https://t.me/loomnetworkdev) if you have any questions about this tutorial or just want to leave us feedback.
