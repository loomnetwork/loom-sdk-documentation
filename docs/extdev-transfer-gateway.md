---
id: extdev-transfer-gateway
title: Testnet Transfer Gateway Tutorial
sidebar_label: Testnet Tutorial
---

## Overview

In this doc we'll walk you through the setup required to transfer tokens between token contracts
you've deployed to `extdev` and `Rinkeby`. If you haven't done so already you should first read
through the high level overview of the [Transfer Gateway][].


## 1. Deploy token contract to `extdev`

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

In `MyToken.json` you'll find a section similar to this:

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

In `MyCoin.json` you'll find a section similar to this:
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


## 2. Deploy token contract to `Rinkeby`

There aren't any special requirements for token contracts deployed to Ethereum networks, so we'll
assume you've already figured out how to deploy your token contract to `Rinkeby`.


## 3. Map `extdev` contract to `Rinkeby` contract

Once you've deployed your contracts you'll need to let the Transfer Gateway know you want it to
transfer tokens between the two contracts. You can either do so programmatically using the
`TransferGateway` class in loom-js, or via the CLI as shown below:

```bash
./loom gateway map-contracts \
    0x2a6b071aD396cEFdd16c731454af0d8c95ECD4B2 0x5d1ddf5223a412d24901c32d14ef56cb706c0f64 \
    --eth-key file://path/to/eth_priv.key \
    --eth-tx 0x3fee8c220416862ec836e055d8261f62cd874fdfbf29b3ccba29d271c047f96c \
    --key file://path/to/loom_priv.key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```

The first argument must be the address of the contract on `extdev`, and the second argument must
be the address of the contract on `Rinkeby`. `eth-tx` is the hash of the Rinkeby transaction
that deployed the contract, easiest way to find it is by searching for the contract address on
https://rinkeby.etherscan.io and looking at the `Contract Creator` details.

After you execute this command the Transfer Gateway will attempt to verify that you are the creator
of both contracts, this may take a couple of minutes.


## 4. Map `extdev` account to `Rinkeby` account

Now that the two token contracts are connected via the Transfer Gateway you can start transferring
tokens from `extdev` to `Rinkeby`. However, if you want to transfer tokens from `Rinkeby` to `extdev`
you'll need to connect your `extdev` account to your `Rinkeby` account, which you can either do using
the `AddressMapper` class in loom-js, or via the CLI:

```bash
./loom gateway map-accounts \
    --key file://path/to/loom_priv.key \
    --eth-key file://path/to/eth_priv.key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```


## Token transfer from `Rinkeby` to `extdev`

TODO: show sample code for ERC721 & ERC20 token transfer via web3, with extdev TG address


## Token transfer from `extdev` to `Rinkeby`

TODO: show sample code for ETH & ERC721 & ERC20 token transfer via loom-js, with extdev TG address


## Summary

If you haven't already, take a look at the [Transfer Gateway Example][] project, which was built
using the Transfer Gateway API provided by [loom-js][].


[Testnet Tutorial]: join-testnet.html
[Truffle DAppChain Example]: https://github.com/loomnetwork/truffle-dappchain-example
[Transfer Gateway]: transfer-gateway.html
[Transfer Gateway Example]: https://github.com/loomnetwork/transfer-gateway-example
