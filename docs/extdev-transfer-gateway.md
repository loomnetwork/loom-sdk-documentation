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

Now that the token contracts are deployed to `extdev`, take a look in the `src/contracts`
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

5. Take a look in the `src/contracts` directory, and make note of the contract addresses and
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
# set LOOM_BIN to reference your Loom binary
export LOOM_BIN=`pwd`/loom
cd truffle-dappchain-example

# Map MyToken on extdev to MyRinkebyToken on Rinkeby
$LOOM_BIN gateway map-contracts \
    0x04aed4899e1514e9ebd3b1ea19d845d60f9eab95 0x56846c23c432145c4b87c0d835c3e9abe55ae7f5 \
    --eth-key file://rinkeby_private_key \
    --eth-tx 0x82c5776434267478f5bb29a8387a10ac61a9e52b3b2074797a07eac9968fbe3d \
    --key file://extdev_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80

# Map MyCoin on extdev to MyRinkebyCoin on Rinkeby
$LOOM_BIN gateway map-contracts \
    0x60ab575af210cc952999976854e938447e919871 0x55f0df4e4acdd70161bad66f938fd4d02ad31547 \
    --eth-key file://rinkeby_private_key \
    --eth-tx 0x31e5b6a986916773f97ecd9365562abab8df2819d1c591f96a5f6a3727a2dcec \
    --key file://extdev_private_key \
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
$LOOM_BIN gateway map-accounts \
    --key file://extdev_private_key \
    --eth-key file://rinkeby_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```


## Token transfer from `Rinkeby` to `extdev`

Once all contracts and accounts have been linked you can transfer tokens and ETH to the `Rinkeby`
Gateway contract. We'll use a simple CLI built with `web3` and `loom-js` to transfer ERC721 and
ERC20 tokens to the `PlasmaChain`.

Lets start by minting some of the `MyRinkebyToken` ERC721 tokens, and transferring one of them to
the `PlasmaChain`.
```bash
# mint some tokens on Rinkeby
node ./gateway-cli.js mint-token 1
node ./gateway-cli.js mint-token 2
node ./gateway-cli.js mint-token 3

# transfer a token to extdev PlasmaChain
node ./gateway-cli.js deposit-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

And now lets transfer some of the `MyRinkebyCoin` ERC20 tokens, a billion of them have already
been minted to your account so you can transfer them right away.
```bash
# transfer 120 tokens to extdev PlasmaChain
node ./gateway-cli.js deposit-coin 120

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```


## Token transfer from `extdev` to `Rinkeby`

Here's how you can transfer an ERC721 token back to `Rinkeby`:
```bash
# transfer a token to Rinkeby
node ./gateway-cli.js withdraw-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

And of course you can also transfer the ERC20 tokens back to `Rinkeby`:
```bash
# transfer 60 tokens to Rinkeby
node ./gateway-cli.js withdraw-coin 60

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```


## Summary

If you haven't already, take a look at the [Transfer Gateway Example][] project, which was built
using the Transfer Gateway API provided by [loom-js][].


[Testnet Tutorial]: join-testnet.html
[Truffle DAppChain Example]: https://github.com/loomnetwork/truffle-dappchain-example
[Transfer Gateway]: transfer-gateway.html
[Transfer Gateway Example]: https://github.com/loomnetwork/transfer-gateway-example
