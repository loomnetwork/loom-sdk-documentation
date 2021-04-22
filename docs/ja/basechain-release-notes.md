---
id: basechain-release-notes
title: Basechain Release Notes
sidebar_label: Basechain
---

## Overview

Reverse chronology order of release notes.

## Basechain Build 1411 Hard Fork - 2021/04/22

This build includes all the necessary parts to support LOOM transfers between Basechain and
Binance Smart Chain through the BSC Transfer Gateway.

**New features:**
- Update build config to support Golang `1.16.2`
- Add new `bsc-gateway` Go contract to handle LOOM BEP20 deposits and withdrawals on the Basechain side.
- Add new `tg:v1.7` feature flag to enable the `bsc-gateway` contract.

**Upgrade instructions:**

1) Download Basechain build 1411

```bash
wget https://downloads.loomx.io/loom/linux/stable/basechain
chmod 755 basechain
```

2) Restart the node on the new build.

## Basechain Build 1385 Hard Fork - 2020/04/28

**New features:**
- Disable unecessary key sorting in the EVM.
- Add new `coin allowance` CLI command that can be used to check the amount of LOOM previously
  approved for transfer to a particular spender.
- Add new `redelegate-all` CLI command that can be used to randomly redistribute delegations from
  former validators to active validators.
- Extend `chain-cfg list-validators` CLI command to show individual validator powers. The power
  displayed by this command for each validator is the percentage of the validators current voting
  power out of the total voting power.

**Upgrade instructions:**

1) Download Basechain build 1385

```bash
wget https://downloads.loomx.io/loom/linux/stable/basechain
chmod 755 basechain
```

2) Restart the node on the new build.

## Basechain Build 1376 Hard Fork - 2020/04/06

**New features:**
- Disable SHA3 preimage recording in EVM.
- Add new config settings to allow disabling of some unecessary key sorting in the EVM.
  ```yaml
  Geth:
    EnableStateObjectDirtyStorageKeysSorting: false
    EnableTrieDatabasePreimageKeysSorting: false
  ```
  In this build this key sorting is still enabled by default, but it'll likely be disabled in the
  next release.
- Disable a cache used for speeding up client queries, the caching is of no benefit to nodes that
  aren't queried by clients. Since the vast majority of nodes, regardless of whether or not they're
  validators don't respond to client queries it makes more sense to disable the caching by default.
  Caching can be re-enabled on nodes via the config:
  ```yaml
  CachingStoreConfig:
    CachingEnabled: true
  ```
- Nodes now support a new `canonical_tx_hash` RPC method on the `/query` interface that can be used
  to obtain a canonical tx hash from an EVM tx hash (which is just a hash of the tx receipt).
- Add the ability to strip voting power from jailed validators while they remain jailed. This is to
  ensure that if a validator with a significant chunk of the voting power is offline for a long time
  the remaining validators can continue to swiftly reach consensus without it. Once a jailed
  validator is unjailed all its voting power is restored. This feature can be activated by the
  `dpos:v3.8` feature flag.

**Bug fixes:**
- Update `dpos_total_staked` RPC method to exclude delegations from the bootstrap nodes.
- Update `DPOS.ClaimRewardsFromAllValidators` to claim rewards from all validators, previously it only
  claimed rewards from active validators. This fix can be enabled via the `dpos:v3.6` feature flag.
- Update default Infura URI used by the `gateway withdraw-funds` command, in case Infura decides to
  change the URI format again the default value can be overriden with the new `eth-uri` flag.
- Nodes will now load the last block header on startup before responding to queries.

**Upgrade instructions:**

1) Download Basechain build 1376

```bash
wget https://downloads.loomx.io/loom/linux/stable/basechain
chmod 755 basechain
```

2) Restart the node on the new build.


## Basechain Upgrade Part 1 of 3 - Build 1346 Hard Fork - 2019/11/27

The Basechain upgrade is the largest upgrade ever, it consists of three parts. This build is the
first part, it contains improved Web3 JSON-RPC compatibility and an upgraded Binance Transfer Gateway.
The second part will consist of an upgrade to the Transfer Gateway on Ethereum Mainnet, and the third
and final part will address the recent rewards shortfall due to the annual 60m LOOM cap being reached
sooner than expected.

**Breaking changes:**
- The `eth_getTransactionCount` and `eth_call` Web3 JSON-RPC methods on the `/eth` endpoint now expect
  the input address to be an Ethereum account, not a Loom account.
- The `eth_getLogs` method and any other Web3 JSON-RPC methods that query a range of blocks will now
  only allow querying up to 20 blocks per request on public Basechain nodes.

**New features:**
- A node will now panic when it’s started using a jump-start that requires a newer build than the
  node is currently running. Once you upgrade the binary, you can simply restart the node without
  restoring the working directory from the jump-start. This requires a jump-start that’s created
  after the `chaincfg:v1.4` feature flag is enabled, which means it will only work with future
  jump-starts (the first of which will be available a few days after this release).
- The `eth_sendRawTransaction` JSON-RPC method on the `/eth` endpoint now works similarly to the way
  one would expect it to work on an Ethereum node. Note that an account mapping between the Ethereum
  account that’s used to sign the Ethereum tx and an Basechain account must exist before `eth_sendRawTransaction`
  will accept the Ethereum tx. This feature will be enabled via the `tx:eth` feature flag, and should
  unlock the ability to use any Web3 JSON-RPC compatible library to call & deploy EVM contracts via
  the `/eth` endpoint.
- The logs returned by `eth_getLogs`, `eth_getTransactionReceipt`, and Web3 subscriptions now contain
  a `BlockTime` field. This is a Loom-specific extension of the Web3 JSON-RPC interface.
- A new `AppStore.PruneEvmKeysInterval` setting has been added to the on-chain config. This will be
  used to tweak the pruning of ancient data.
- Withdrawing LOOM to Binance will now incur a fee (charged in BNB). This feature will be activated
  by the `tg:v1.4` feature flag.
- The Binance Gateway contract will now mint & burn coin when necessary. This feature will be
  activated by the `coin:v1.3` feature flag.
- Nodes now support a new `dpos_total_staked` RPC method that returns a simple JSON-RPC response
  containing the total amount staked via the DPOS contract.
- Nodes will no longer write to `mempool.wal` by default. This can be re-enabled in `loom.yml`:
  ```yaml
  MempoolWalEnabled: true
  ```

**Bug fixes:**
- Fix broadcasting of EVM contract events to subscribers. Previously, if a contract method emitted
  multiple events, subscribers would only receive the first event.
- Ensure that the`eth_getBlockByNumber` and `eth_getBlockByHash` methods return the same tx hashes
  regardless of whether or not the full parameter is true or not.
- Ensure `eth_getLogs` returns tx hashes that are consistent with `eth_getBlockByNumber`.
- Transaction events will now be emitted to subscribers after the block in which the transactions
  are included has been committed.
- The Binance Gateway will now adjust the decimal precision for LOOM deposits & withdrawals.
  This fix will be activated by the `tg:v1.3` feature flag.
- Remove redundant `TokenWithdrawer` field from withdrawal receipts. This fix will be activated by
  the `tg:v1.5` feature flag.

**Upgrade instructions:**

1) Download Basechain build 1346

```bash
wget https://downloads.loomx.io/loom/linux/stable/basechain
chmod 755 basechain
```

2) Restart the node on the new build.

## Pre-Basechain Build 1286 Hard Fork - 2019/10/01

**Bugfixes:**

* Fix memory leak in the contract event subscription system.
* Fix events being erroneously emitted by failed calls to Go contracts.
* Store transaction receipts for failed calls to EVM contracts. Will be enabled via the `receipts:v3.1` and `receipts:v3.4` feature flags.
* Stop emitting redundant jailing events once a validator is jailed.

**New features:**

* `eth_getStorageAt` Web3 JSON-RPC method is now supported. If the block parameter is specified it must be set to `latest`.
* Allow ETH to be minted on chain genesis to make it easier to test & develop `payable` Solidity contracts on a local node.

**Upgrade instructions:**

> The download location and binary name have changed from the previous build, but the configuration should remain unchanged.

1) Download Basechain build 1286

```bash
wget https://downloads.loomx.io/loom/linux/build-1286/basechain
chmod 755 basechain
```

2) Restart the node on the new build.
