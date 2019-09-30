---
id: basechain-release-notes
title: Basechain Release Notes
sidebar_label: Basechain Release Notes
---

## Overview

Reverse chronology order of release notes.

## Pre-Basechain Basechain Build 1286 Hard Fork- 2019/10/01

**Bugfixes:**

* Fix memory leak in the contract event subscription system.
* Fix events being erroneously emitted by failed calls to Go contracts.
* Store transaction receipts for failed calls to EVM contracts. Will be enabled via the receipts:v3.1 and receipts:v3.4 feature flags.
* Stop emitting redundant jailing events once a validator is jailed.

**New features:**

* `eth_getStorageAt` Web3 JSON-RPC method is now supported. If the block parameter is specified it must be set to `latest`.

* Allow ETH to be minted on chain genesis to make it easier to test & develop `payable` Solidity contracts on a local node.
