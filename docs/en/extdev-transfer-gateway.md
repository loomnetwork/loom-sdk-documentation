---
id: extdev-transfer-gateway
title: Transfer Gateway Testnet Tutorial
sidebar_label: Transfer Gateway Testnet
---

## Overview

In this doc, we'll walk you through the setup required to transfer tokens between token contracts you've deployed to `extdev` and `Rinkeby`. If you haven't done so already you should first read through the high-level overview of the [Transfer Gateway][].

## Requirements

Make sure the following requirements are met and then follow the steps in the next section:

- Operating system: Linux or macOS. If you're running Windows, please install the Windows Subsystem for Linux. See the [Install the Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) page for details on installing WSL.
- Node >= 8
- yarn


## 1. Deploy token contracts to `extdev`

If you wish to transfer tokens from a token contract deployed on `Rinkeby` to one that's deployed on `extdev`, you'll need to ensure that the token contract you deploy to `extdev` implements the `mintToGateway` function. We've created some sample contracts and a simple CLI to interact with them.

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

Full source for all contracts can be found in the [Truffle DAppChain Example][] repo.

1. Download the `loom` binary, while you won't be spinning up your own DAppChain in this tutorial, you will be using some of the CLI commands built into the `loom` binary to interact with the  `extdev` PlasmaChain.

   ```bash
   curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
   # set LOOM_BIN to reference the downloaded loom binary,
   # makes it easy to invoke it from anywhere
   export LOOM_BIN=`pwd`/loom
   ```

2. Clone the [Truffle DAppChain Example][] repo.

   ```bash
   # clone the tutorial repo to the gateway-tutorial directory
   git clone https://github.com/loomnetwork/truffle-dappchain-example gateway-tutorial
   cd gateway-tutorial
   # install dependencies
   yarn
   ```

3. Generate your own private key for deploying and calling contracts on the `extdev` PlasmaChain.

   ```bash
   $LOOM_BIN genkey -k extdev_private_key -a extdev_public_key
   ```

   You should see something similar to this displayed in the console:

   ```
   local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
   local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
   ```

   This is the public address that corresponds to your new private key. You'll find the private key in the `extdev_private_key` file, and the corresponding public key in the `extdev_public_key` file.

4. Deploy the `MyToken` and `MyCoin` contracts to the `extdev` PlasmaChain.

   ```bash
   yarn deploy:extdev
   ```

## 2. Deploy token contracts to `Rinkeby`

There aren't any special requirements for token contracts deployed to Ethereum networks.

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

contract MyRinkebyCoin is StandardToken {
    string public name = "MyRinkebyCoin";
    string public symbol = "MRC";
    uint8 public decimals = 18;

    // one billion in initial supply
    uint256 public constant INITIAL_SUPPLY = 1000000000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;
    }
}
```

Full source for all contracts can be found in the [Truffle DAppChain Example][] repo.

Let's deploy these contracts to `Rinkeby`.

1. Generate an Ethereum private key:
   ```bash
   # this will create the rinkeby_account, rinkeby_mnemonic, and rinkeby_private_key files
   yarn gen:rinkeby-key
   ```

2. Get the address of the new `Rinkeby` account from the `rinkeby_account` file:
   ```bash
   cat rinkeby_account
   ```

3. Give the `Rinkeby` account some ETH so it can be used to deploy contracts to `Rinkeby`. You can either use https://faucet.rinkeby.io or transfer some ETH from another account.

4. Set your Infura API key (get it from https://infura.io):
   ```bash
   export INFURA_API_KEY=XXXXXXXXXXXXXXXX
   ```

5. Deploy the sample contracts:
   ```bash
   yarn deploy:rinkeby
   ```

   If this fails with an error similar to this one:
   ```
   Error encountered, bailing. Network state unknown. Review successful transactions manually.
   insufficient funds for gas * price + value
   ```
   Transfer a bit more ETH to your Rinkeby account.

## 3. Map `extdev` contracts to `Rinkeby` contracts

Once you've deployed your contracts to both chains you'll need to let the Transfer Gateway know you want it to transfer tokens between the contracts. You can either do so programmatically using the `TransferGateway` class in [loom-js][], or the `loom` CLI. For this tutorial we've built a more streamlined JS CLI with `web3` and [loom-js][], so you don't have to go looking for contract
addresses, transaction hashes, and sacrificial goats.

Map the `MyToken` contract deployed on `extdev` to the `MyRinkebyToken` contract deployed on `Rinkeby`:

```bash
node ./gateway-cli.js map-contracts token
```

Map the `MyCoin` contract deployed on `extdev` to the `MyRinkebyCoin` contract deployed on `Rinkeby`:

```bash
node ./gateway-cli.js map-contracts coin
```

After you execute these commands the Transfer Gateway will attempt to verify that you are the creator of these contracts. Note that this may take a couple of minutes. In the meantime, you can proceed to the next step.

## 4. Map `extdev` account to `Rinkeby` account

Now that the two token contracts are connected via the Transfer Gateway you can start transferring tokens from `extdev` to `Rinkeby`. However, if you want to transfer tokens from `Rinkeby` to `extdev`, you'll need to connect your `extdev` account to your `Rinkeby` account.

```bash
node ./gateway-cli.js map-accounts
```

Great, everything should now be ready for flawless token transfer between `extdev` and `Rinkeby`!


## 5. Token transfer

### From `Rinkeby` to `extdev`

Now that all contracts and accounts have been mapped you can transfer tokens and ETH to the `Rinkeby` Gateway contract.

Let's start by minting some of the `MyRinkebyToken` ERC721 tokens, and transferring one of them to the `PlasmaChain`:

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

And now let's transfer some of the `MyRinkebyCoin` ERC20 tokens. Note that a billion of them have already been minted to your account so you can transfer them right away.

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

The ERC721 tokens can be transferred back to `Rinkeby` using the `withdraw-token` command:

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

The ERC20 tokens can be transferred back to `Rinkeby` using the `withdraw-coin` command:

```bash
# transfer 60 tokens to Rinkeby
node ./gateway-cli.js withdraw-coin 60

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### Troubleshooting

Sometimes the withdrawal process may error out due to network issues or because gas ran out. If that happens, you can try to complete the interrupted withdrawal using the `resume-withdrawal` command.

```bash
node ./gateway-cli.js resume-withdrawal
```

> NOTE: Only one pending withdrawal is allowed per user.

[Truffle DAppChain Example]: https://github.com/loomnetwork/truffle-dappchain-example
[Transfer Gateway]: transfer-gateway.html
[Transfer Gateway Example]: https://github.com/loomnetwork/transfer-gateway-example
[loom-js]: https://github.com/loomnetwork/loom-js
