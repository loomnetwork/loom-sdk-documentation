---
id: extdev-transfer-gateway
title: Testnet Transfer Gateway Tutorial
sidebar_label: Testnet Tutorial
---

## Overview

In this doc we'll walk you through the setup required to transfer tokens between token contracts
you've deployed to `extdev` and `Rinkeby`. If you haven't done so already you should first read
through the high level overview of the [Transfer Gateway][].


## 1. Deploy token contracts to `extdev`

If you wish to transfer tokens from a token contract deployed on `Rinkeby` to one that's deployed
on `extdev` you'll need to ensure that the token contract you deploy to `extdev` implements the
`mintToGateway` function. Sample contracts can be found in the [Truffle DAppChain Example][] repo.

### MyToken ERC721 contract

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

/**
 * @title Full ERC721 Token for Loom DAppChains
 * This implementation includes all the required and some optional functionality of the ERC721
 * standard, it also contains some required functionality for Loom DAppChain compatiblity.
 */
contract MyToken is ERC721Token {
    // DAppChain Gateway address
    address public gateway;

    constructor(address _gateway) ERC721Token("MyToken", "MTC") public {
        gateway = _gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Mainnet Gateway
    function mintToGateway(uint256 _uid) public
    {
        require(msg.sender == gateway);
        _mint(gateway, _uid);
    }
}
```

### MyCoin ERC20 contract

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyCoin is StandardToken {
    // Transfer Gateway contract address
    address public gateway;

    string public name = "MyCoin";
    string public symbol = "MCT";
    uint8 public decimals = 18;
    
    constructor(address _gateway) public {
        gateway = _gateway;
        totalSupply_ = 0;
    }

    function mintToGateway(uint256 _amount) public {
        require(msg.sender == gateway);
        totalSupply_ = totalSupply_.add(_amount);
        balances[gateway] = balances[gateway].add(_amount);
    }
}
```

If you've already completed the [Testnet Tutorial][] then the `MyToken` and `MyCoin` contracts have
already been deployed to `extdev`, and if you haven't, please do so now, then return to this page.

Now that the token contracts are deployed to `extdev`, take a look in the `src/contracts/build`
dir of your `truffle-dappchain-example` checkout.

At the end of `MyToken.json` you'll find a section similar to this:
```json
  "networks": {
    "extdev-plasma-us1": {
      "events": {},
      "links": {},
      "address": "0x04aed4899e1514e9ebd3b1ea19d845d60f9eab95",
      "transactionHash": "0x9db0fd6cc1d25f55391b0edf46568314530c340f505692760f92215d7063ed17"
    }
  },
```

At the end of `MyCoin.json` you'll find a section similar to this:
```json
  "networks": {
    "extdev-plasma-us1": {
      "events": {},
      "links": {},
      "address": "0x60ab575af210cc952999976854e938447e919871",
      "transactionHash": "0xefacc88f84a4371e51876a981f1d966d83c1c0f5d941c0c122d4928538d85ae4"
    }
  },
```

Take note of the `address` fields, these are the addresses of the deployed contracts, you'll need
them soon.


## 2. Deploy token contracts to `Rinkeby`

There aren't any special requirements for token contracts deployed to Ethereum networks. Sample
`MyRinkebyToken`, and `MyRinkebyCoin`contracts have been provided in the [Truffle DAppChain Example][]
repo, so we'll deploy them to `Rinkeby`.

1. Generate an Ethereum private key:
   ```bash
   cd truffle-dappchain-example
   # this will create the rinkeby_account, rinkeby_mnemonic, and rinkeby_private_key files
   yarn gen:rinkeby-key
   ```

2. Give the new account in `rinkeby_account` some ETH so it can be used to deploy contracts to Rinkeby,
   you can either use https://faucet.rinkeby.io or transfer some ETH from another account.

3. Set your Infura API key (get it from see https://infura.io)
   ```bash
   export INFURA_API_KEY=XXXXXXXXXXXXXXXX
   ```

4. Deploy sample contracts
   ```
   yarn deploy:rinkeby
   ```

5. Take a look in the `src/contracts/build` directory, and make note of the contract addresses and
   transaction hashes.
   
   At the end of `MyRinkebyToken.json` you'll find a section similar to this:
   ```json
   "networks": {
     "4": {
       "events": {},
       "links": {},
       "address": "0x56846c23c432145c4b87c0d835c3e9abe55ae7f5",
       "transactionHash": "0x82c5776434267478f5bb29a8387a10ac61a9e52b3b2074797a07eac9968fbe3d"
     }
   },
   ```

   At the end of `MyCoin.json` you'll find a section similar to this:
   ```json
   "networks": {
     "4": {
       "events": {},
       "links": {},
       "address": "0x55f0df4e4acdd70161bad66f938fd4d02ad31547",
       "transactionHash": "0x31e5b6a986916773f97ecd9365562abab8df2819d1c591f96a5f6a3727a2dcec"
     }
   },
   ```

## 3. Map `extdev` contracts to `Rinkeby` contracts

Once you've deployed your contracts to both chains you'll need to let the Transfer Gateway know you
want it to transfer tokens between the contracts. You can either do so programmatically using the
`TransferGateway` class in loom-js, or via the CLI. Make sure you double-check the contract
addresses match the ones you deployed earlier!

```bash
# Map MyToken on extdev to MyRinkebyToken on Rinkeby
./loom gateway map-contracts \
    0x04aed4899e1514e9ebd3b1ea19d845d60f9eab95 0x56846c23c432145c4b87c0d835c3e9abe55ae7f5 \
    --eth-key file://truffle-dappchain-example/rinkeby_private_key \
    --eth-tx 0x82c5776434267478f5bb29a8387a10ac61a9e52b3b2074797a07eac9968fbe3d \
    --key file://truffle-dappchain-example/extdev_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80

# Map MyCoin on extdev to MyRinkebyCoin on Rinkeby
./loom gateway map-contracts \
    0x60ab575af210cc952999976854e938447e919871 0x55f0df4e4acdd70161bad66f938fd4d02ad31547 \
    --eth-key file://truffle-dappchain-example/rinkeby_private_key \
    --eth-tx 0x31e5b6a986916773f97ecd9365562abab8df2819d1c591f96a5f6a3727a2dcec \
    --key file://truffle-dappchain-example/extdev_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```

The first argument must be the address of the contract on `extdev`, and the second argument must
be the address of the contract on `Rinkeby`. `eth-tx` is the hash of the `Rinkeby` transaction
that deployed the contract with you can usually find in the Truffle generated `.json` file. If you
deploy the contract in some other way you can find the transaction hash by searching for the
contract address on https://rinkeby.etherscan.io and then taking a look at the `Contract Creator`
details.

After you execute this command the Transfer Gateway will attempt to verify that you are the creator
of both contracts, this may take a couple of minutes.


## 4. Map `extdev` account to `Rinkeby` account

Now that the two token contracts are connected via the Transfer Gateway you can start transferring
tokens from `extdev` to `Rinkeby`. However, if you want to transfer tokens from `Rinkeby` to `extdev`
you'll need to connect your `extdev` account to your `Rinkeby` account, which you can either do using
the `AddressMapper` class in loom-js, or via the CLI:

```bash
./loom gateway map-accounts \
    --key file://truffle-dappchain-example/extdev_private_key \
    --eth-key file://truffle-dappchain-example/rinkeby_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```


## Token transfer from `Rinkeby` to `extdev`

Once all contracts and accounts have been linked you can transfer tokens and ETH to the Rinkeby
Gateway contract.

For example, to transfer an ERC721 token you'd do something like this:
```js
import Web3 from 'web3'

// const MyRinkebyTokenJSON = loaded from MyRinkebyToken.json
const gatewayAddress = '0x6f7Eb868b2236638c563af71612c9701AC30A388'

async function depositTokenToGateway(tokenId, ownerAccount) {
  const browserWeb3 = new Web3(window.web3.currentProvider)
  const networkId = await browserWeb3.eth.net.getId()
  const contract = new browserWeb3.eth.Contract(
    MyRinkebyTokenJSON.abi,
    MyRinkebyTokenJSON.networks[networkId].address
  )
  await contract.methods
    .safeTransferFrom(ownerAccount, gatewayAddress, tokenId)
    .send({ from: ownerAccount })
}
```

And to transfer an ERC20 token you'd do something like this:
```js
import Web3 from 'web3'

// const MyRinkebyCoinJSON = loaded from MyRinkebyCoin.json
const gatewayAddress = '0x6f7Eb868b2236638c563af71612c9701AC30A388'

async function depositCoinToGateway(amount, ownerAccount) {
  const browserWeb3 = new Web3(window.web3.currentProvider)
  const networkId = await browserWeb3.eth.net.getId()
  const contract = new browserWeb3.eth.Contract(
    MyRinkebyCoinJSON.abi,
    MyRinkebyCoinJSON.networks[networkId].address
  )
  await contract.methods
    .transferFrom(ownerAccount, gatewayAddress, amount)
    .send({ from: ownerAccount })
}
```

## Token transfer from `extdev` to `Rinkeby`

TODO: show sample code for ETH & ERC721 & ERC20 token transfer via loom-js, with extdev TG address


## Summary

If you haven't already, take a look at the [Transfer Gateway Example][] project, which was built
using the Transfer Gateway API provided by [loom-js][].


[Testnet Tutorial]: join-testnet.html
[Truffle DAppChain Example]: https://github.com/loomnetwork/truffle-dappchain-example
[Transfer Gateway]: transfer-gateway.html
[Transfer Gateway Example]: https://github.com/loomnetwork/transfer-gateway-example
