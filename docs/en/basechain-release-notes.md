---
id: basechain-release-notes
title: Basechain Release Notes
sidebar_label: Basechain
---

## Overview

Reverse chronology order of release notes.

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
