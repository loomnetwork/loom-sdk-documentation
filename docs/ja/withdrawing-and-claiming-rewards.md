---
id: withdrawing-and-claiming rewards
title: Withdrawing Rewards to Mainnet (w/ Ledger + HSM Support) & Claiming Rewards and Re-staking
sidebar_label: Validators - Withdrawing and Claiming Rewards
---

## Withdrawing Rewards to Mainnet (w/ Ledger + HSM Support) & Claiming Rewards and Re-staking

This section will show you how to map your HSM to your Ledger, and how to withdraw your validator rewards to mainnet.

In the following commands, if you’re using an HSM, replace the `--key /path/to/dappchainkey` (or -k) with the HSM path with `--hsm /path/to/hsm.json`.


In Loom you have your Ethereum mainnet address, which gets parsed as `eth:0xdeadbeef` and your Loomchain address, which gets parsed as `chainId:0xabcdef`, where `chainId` is the Chain ID for each chain, `default` for plasma.

We hereafter shall refer to the ethereum mainnet as $ETHADDRESS, and the loom address as $LOOMADDRESS. $ETHADDRESS corresponds to your Ethereum private key’s address(or the address of your Ledger/Trezor) and $LOOMADDRESS corresponds to your Loom private key’s address (or the address of your YubiHSM).

### Mapping your ledger to your HSM

First, your $LOOMADDRESS should be connected to your $ETHADDRESS. This is done via the address mapper. We use the following command:

```bash
./loom gateway map-accounts --interactive --eth-address $ETHADDRESS --key /path/to/dappchainkey -u http://plasma.dappchains.com:80
```

![Mapping your ledger to your HSM](/developers/img/mapping-your-ledger-to-your-hsm.png)

Now you want to paste the hash prompted by the CLI to your signing software. Click “Sign” on the UI and Metamask. The message you are signing is the hash that corresponds to the connection between the two addresses.

![MEW - sign the message](/developers/img/mew-sign.png)

After the message is signed, paste the “sig” field to the CLI.

![MEW - paste the sig field](/developers/img/paste-the-sig-field.png)

Your $ETHADDRESS is now mapped to your $LOOMADDRESS. 

> (NOT RECOMMENDED: If you do not want to use Ledger and are confident with giving the raw private key, you can directly run  `./loom gateway map-accounts --eth-key /path/to/ethkey --key /path/to/dappchainkey -u http://plasma.dappchains.com:80`)

### Withdrawing to Mainnet

Withdrawing your funds to mainnet can be done with one simple command:

```bash
./loom gateway withdraw-rewards -u http://plasma.dappchains.com:80 --chain default --key /path/to/dappchainkey
````

> WARNING: This will withdraw all your unstaked DAppChain funds (the result of `./loom call balance $LOOMADDRESS`) to mainnet if you do not use the flags provided by the CLI. If you want to withdraw ONLY THE UNCLAIMED REWARDS use the following command:

```bash
./loom gateway withdraw-rewards -u http://plasma.dappchains.com:80 --chain default --key /path/to/dappchainkey --only-rewards
```

Please wait as the chain is signing your withdrawal receipt:

![Signing the withdrawal receipt](/developers/img/signing-the-withdrawal-receipt.png)

- If for whatever reason you cancel the command, or the CLI crashes (let us know what happened and send us the stack trace!), you can run the command again and it’ll give you the output:

![CLI troubleshooting](/developers/img/cli-troubleshooting.png)

Now paste the information to [Send Offline](https://www.myetherwallet.com/interface/send-offline) in MEW and wait for your funds to appear in mainnet.

![CLI troubleshooting](/developers/img/send-offline.png)

The transaction should be successful, and you should be able to check for it on Etherscan.
Success! You withdrew your Validator Rewards to mainnet!


## Claiming & Compounding Rewards

> ATTENTION: Since the DPOSv3 release, we allow rewards to compound until the time you withdraw them to your wallet. The way this happens is by treating it as a delegation, specifically the 0th delegation in a delegator’s list of delegations per validator. We often call this the “Rewards delegation” 

If you do not want to claim, and just want to check how many unclaimed LOOM tokens you have due to staking:

```bash
./loom dpos3 check-delegator-rewards $LOOMADDRESS -u http://plasma.dappchains.com:80 --key /path/to/dappchainkey --chain default
```

In order to claim your rewards to your wallet can run the following command:

```bash
./loom dpos3 claim-delegator-rewards -u http://plasma.dappchains.com:80 --key /path/to/dappchainkey --chain default
```

In case you want to claim a part of the rewards and let the rest compound, you can unbond an amount of your rewards delegation :

```bash
./loom dpos3 unbond $LOOMADDRESS <amount> 0 -u http://plasma.dappchains.com:80 --key /path/to/dappchainkey --chain default
```

_The rewards delegation will be set to UNBONDING, and the funds will be available in your balance for withdrawal to mainnet after elections._

You can retrieve all delegations you have made to yourself, by calling:

```bash
./loom dpos3 check-delegation $LOOMADDRESS $LOOMADDRESS -u http://plasma.dappchains.com:80 --key /path/to/dappchainkey --chain default
```

(yes, $LOOMADDRESS is provided twice, once for the delegator argument and once for the validator argument)

For sanity, you can run the following command before and after claiming rewards, to check that your balance did indeed increase:

```bash
./loom coin balance $LOOMADDRESS -u http://plasma.dappchains.com:80 --key /path/to/dappchainkey --chain default
```

