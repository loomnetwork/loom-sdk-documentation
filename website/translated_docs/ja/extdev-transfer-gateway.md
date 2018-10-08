---
id: extdev-transfer-gateway
title: Transfer Gateway Testnet Tutorial
sidebar_label: Transfer Gateway Testnet
---
## 概要

このドキュメントではトークンコントラクト間のトークンの転送を必要とするセットアップを解説する。 `extdev`と`Rinkeby`にデプロイしている。 もしまだ終えてないなら最初に高いレベルの概要 [転送ゲートウェイ](transfer-gateway.html)を読むべきである。

## トークンコントラクトを `extdev`にデプロイする

If you wish to transfer tokens from a token contract deployed on `Rinkeby` to one that's deployed on `extdev` you'll need to ensure that the token contract you deploy to `extdev` implements the `mintToGateway` function. We've created some sample contracts and a simple CLI to interact with them.

### MyToken ERC721 contract

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyToken is ERC721Token {
    // Transfer Gateway contract address
    address public gateway;

    constructor(address _gateway) ERC721Token("MyToken", "MTC") public {
        gateway = _gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _uid) public
    {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
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
    string public symbol = "MCC";
    uint8 public decimals = 18;

    constructor(address _gateway) public {
        gateway = _gateway;
        totalSupply_ = 0;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _amount) public {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        totalSupply_ = totalSupply_.add(_amount);
        balances[gateway] = balances[gateway].add(_amount);
    }
}
```

Full source for all contracts can be found in the [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) repo.

If you've already completed the [Testnet Tutorial](join-testnet.html) then the `MyToken` and `MyCoin` contracts have already been deployed to `extdev`, and if you haven't, please do so now, then return to this page.

Now that the token contracts are deployed to `extdev`, take a look in the `src/contracts` dir of your `truffle-dappchain-example` checkout.

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

Take note of the `address` fields, these are the addresses of the deployed contracts, you'll need them soon.

## 2. Deploy token contracts to `Rinkeby`

There aren't any special requirements for token contracts deployed to Ethereum networks, though there are safe transfer extensions you may wish to implement in your ERC20 contracts to make it easier to deposit tokens into the `Rinkeby` Gateway.

### MyRinkebyToken ERC721 contract

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyRinkebyToken is ERC721Token {
    constructor() ERC721Token("MyRinkebyToken", "MRT") public {
    }

    function mint(uint256 _uid) public
    {
        _mint(msg.sender, _uid);
    }

    // Convenience function to get around crappy function overload limitations in Web3
    function depositToGateway(address _gateway, uint256 _uid) public {
        safeTransferFrom(msg.sender, _gateway, _uid);
    }
}
```

### MyRinkebyCoin ERC20 contract

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/AddressUtils.sol";
import "./ERC20Receiver.sol";

contract MyRinkebyCoin is StandardToken {
    using AddressUtils for address;

    string public name = "MyRinkebyCoin";
    string public symbol = "MRC";
    uint8 public decimals = 18;

    // one billion in initial supply
    uint256 public constant INITIAL_SUPPLY = 1000000000;

    bytes4 constant ERC20_RECEIVED = 0xbc04f0af;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;
    }

    function safeTransferAndCall(address _to, uint256 _amount) public {
        transfer(_to, _amount);
        require(
            checkAndCallSafeTransfer(msg.sender, _to, _amount),
            "Sent to a contract which is not an ERC20 receiver"
        );
    }

    function checkAndCallSafeTransfer(
        address _from, address _to, uint256 _amount
    ) internal returns (bool) {
        if (!_to.isContract()) {
            return true;
        }

        bytes4 retval = ERC20Receiver(_to).onERC20Received(_from, _amount);
        return (retval == ERC20_RECEIVED);
    }
}
```

Full source for all contracts can be found in the [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) repo.

Let's deploy these contracts to `Rinkeby`.

1. Generate an Ethereum private key:
    
    ```bash
    cd truffle-dappchain-example
    # this will create the rinkeby_account, rinkeby_mnemonic, and rinkeby_private_key files
    yarn gen:rinkeby-key
    ```

2. Get the public key for Rinkeby from this file
    
    ```bash
    cat rinkeby_account
    ```

3. Give the new account in `rinkeby_account` some ETH so it can be used to deploy contracts to `Rinkeby`, you can either use https://faucet.rinkeby.io or transfer some ETH from another account.

4. Set your Infura API key (get it from see https://infura.io)
    
    ```bash
    export INFURA_API_KEY=XXXXXXXXXXXXXXXX
    ```

5. Deploy sample contracts
    
        yarn deploy:rinkeby
        

6. Take a look in the `src/contracts` directory, and make note of the contract addresses and transaction hashes.
    
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
    
    At the end of `MyRinkebyCoin.json` you'll find a section similar to this:
    
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

Once you've deployed your contracts to both chains you'll need to let the Transfer Gateway know you want it to transfer tokens between the contracts. You can either do so programmatically using the `TransferGateway` class in [loom-js](https://github.com/loomnetwork/loom-js), or via the `loom` CLI. Make sure you double-check the contract addresses match the ones you deployed earlier!

```bash
# in truffle-dappchain-example
# set LOOM_BIN to reference your Loom binary
cd ..
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

The first argument must be the address of the contract on `extdev`, and the second argument must be the address of the contract on `Rinkeby`. `eth-tx` is the hash of the `Rinkeby` transaction that deployed the contract with you can usually find in the Truffle generated `.json` file. If you deploy the contract in some other way you can find the transaction hash by searching for the contract address on https://rinkeby.etherscan.io and then taking a look at the `Contract Creator` details.

After you execute this command the Transfer Gateway will attempt to verify that you are the creator of both contracts, this may take a couple of minutes.

## 4. Map `extdev` account to `Rinkeby` account

Now that the two token contracts are connected via the Transfer Gateway you can start transferring tokens from `extdev` to `Rinkeby`. However, if you want to transfer tokens from `Rinkeby` to `extdev` you'll need to connect your `extdev` account to your `Rinkeby` account, which you can either do using the `AddressMapper` class in [loom-js](https://github.com/loomnetwork/loom-js), or via the `loom` CLI:

```bash
$LOOM_BIN gateway map-accounts \
    --key file://extdev_private_key \
    --eth-key file://rinkeby_private_key \
    --chain extdev-plasma-us1 \
    --uri http://extdev-plasma-us1.dappchains.com:80
```

## 5. Token transfer

### From `Rinkeby` to `extdev`

Once all contracts and accounts have been linked you can transfer tokens and ETH to the `Rinkeby` Gateway contract. We'll use a simple CLI built with `web3` and [loom-js](https://github.com/loomnetwork/loom-js) to transfer ERC721 and ERC20 tokens to the `PlasmaChain`.

Lets start by minting some of the `MyRinkebyToken` ERC721 tokens, and transferring one of them to the `PlasmaChain`.

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

And now lets transfer some of the `MyRinkebyCoin` ERC20 tokens, a billion of them have already been minted to your account so you can transfer them right away.

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

### From `extdev` to `Rinkeby`

The ERC721 tokens can be transferred back to `Rinkeby` using the `withdraw-token` command.

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

The ERC20 tokens can be transferred back to `Rinkeby` using the `withdraw-coin` command.

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

### Troubleshooting

Sometimes the withdrawal process may error out due to network issues, or because gas ran out, if that happens you can try to complete the interrupted withdrawal using the `resume-withdrawal` command.

```bash
node ./gateway-cli.js resume-withdrawal
```

> NOTE: Only one pending withrawal is allowed per user.

## Summary

If you haven't already, take a look at the [Transfer Gateway Example](https://github.com/loomnetwork/transfer-gateway-example) project, which was built using the Transfer Gateway API provided by [loom-js](https://github.com/loomnetwork/loom-js).