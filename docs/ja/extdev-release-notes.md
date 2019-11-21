---
id: extdev-release-notes
title: Extdev Release Notes
sidebar_label: Extdev
---

## Overview

Reverse chronology order of release notes.

## Extdev build 1344 Hard Fork - 2019/11/21

**New features:**

- Withdrawing LOOM to Binance will now incur a fee (charged in BNB). This feature will be activated by the `tg:v1.4` feature flag.
- The Binance Gateway contract will now mint & burn coin when necessary. This feature will be activated by the `coin:v1.3` feature flag.
- Nodes now support a new `dpos_total_staked` RPC method that returns a simple JSON-RPC response containing the total amount staked via the DPOS contract.
- Nodes will no longer write to `mempool.wal` by default, this can be re-enabled in `loom.yml`:
  ```yaml
  MempoolWalEnabled: true
  ```

**Bug fixes:**

- Transaction events will now be emitted to subscribers after the block in which the transactions are included has been committed.
- The Binance Gateway will now adjust the decimal precision for LOOM deposits & withdrawals. This fix will be activated by the `tg:v1.3` feature flag.
- Remove redundant `TokenWithdrawer` field from withdrawal receipts. This fix will be activated by the `tg:v1.5` feature flag.

## Extdev build 1330 Hard Fork - 2019/11/04

This is a maintenance release that adds a new `AppStore.PruneEvmKeysInterval` setting to the on-chain config, this is used to tweak the pruning of ancient data from Extdev and Plasmachain.

## Extdev build 1328 Hard Fork - 2019/10/27

**Breaking changes:**

- The `eth_getTransactionCount` and eth_call Web3 JSON-RPC methods on the `/eth` endpoint now expect the input address to be an Ethereum account, not a Loom account.
- `eth_getLogs` and any other Web3 JSON-RPC methods that query a range of blocks will now only allow querying up to 20 blocks per request on public Extdev nodes.

**Bug fixes:**

- Fix broadcasting of EVM contract events to subscribers, previously if a contract method emitted multiple events subscribers would only receive the first event.
- Ensure `eth_getBlockByNumber` and `eth_getBlockByHash` return the same tx hashes regardless of whether or not the full parameter is true or not.
- Ensure `eth_getLogs` returns tx hashes that are consistent with `eth_getBlockByNumber`.

**New features:**

- A node will now panic when it’s started using a jump-start that requires a newer build than the node is currently running, once the build is upgraded the node can simply be restarted without restoring the working directory from the jump-start. This requires a jump-start that’s created after the `chaincfg:v1.4` feature flag is enabled, which means it will only work with future jump-starts (the first of which will be available a few days after this release).
- The `eth_sendRawTransaction` JSON-RPC method on the `/eth` endpoint now works similarly to the way one would expect it to work on an Ethereum node. Note that an account mapping between the Ethereum account that’s used to sign the Ethereum tx and an Extdev account must exist before `eth_sendRawTransaction` will accept the Ethereum tx. This feature will be enabled via the tx:eth feature flag, and should unlock the ability to use any Web3 JSON-RPC compatible library to call & deploy EVM contracts via the `/eth` endpoint.
- Logs returned by `eth_getLogs`, `eth_getTransactionReceipt`, and Web3 subscriptions now contain a `BlockTime` field. This is a Loom-specific extension of the Web3 JSON-RPC interface.

## Extdev Build 1286 Hard Fork - 2019/09/26

This is a maintenance release that reverts the new EVM tx hash generation algo introduced in build 1283. The hard fork will activate when the `receipts:v3.4` feature flag is enabled.

If you’re running a non-validator node on an earlier build it will stop processing blocks once it detects the `receipts:v3.4` feature flag has been activated, upgrade to build 1286 and the node should resume processing blocks.
