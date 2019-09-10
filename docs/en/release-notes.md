---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
---

## Overview

Reverse chronology order of release notes.

## Loom 2.0 Release Build 1263 - 2109/09/10

This is a maintenance release that fixes several issues and adds some new features.

**Bugfixes:**

- Setting `eth_getBlockByNumber` to `latest` while getting information about a block returns the last committed block rather than the one before it.
- Improved reliability with regard to how broken YubiHSM sessions are refreshed. Thanks to Certus One for the fix!
- Account nonces are incremented for all committed transaction, regardless of whether it was successful or not. This reduces the likelihood of clients receiving a `Tx already exists in cache` error after an EVM transaction reverts.
- The `loom reset` command now deletes `evm.db` in addition `to app.db`.

**New features:**

- Additional validation in Transfer Gateway
- Enables the on-chain config (an extension of the feature flag system)
- Reduces the amount of data stored on-chain for migration transactions.
- Improved generation & indexing of EVM events when Go contracts call EVM contracts.

## Loom 2.0 Release Build 1213 – 2019/08/12

This release upgrades the Binance Transfer Gateway and the EVM.

* Support for mapping BEP2 tokens on Binance Chain to ERC20 contracts on PlasmaChain
* Binance Chain to PlasmaChain account mapping
* Validator slashing (if validators miss too many blocks)
* Referrer handling fixes in DPoS contract
* Third-party self-service deployer whitelist middleware updates
* Additional validation in coin contracts
* Additional validation of EVM transaction values
* Support for EVM features introduced in the Ethereum Constantinople fork (makes it possible to use Solidity v0.5.x)

## Loom 2.0 Release Build 1085 - 2019/05/31

We have been focusing on mainnet builds so this has a large backlog of features for third party chains.

Major update, major updates for Performance, Caching and DPoS. It is recommended to upgrade your testnets immediately.

* DposV3 live to see features - [DPosV3 Medium Post](https://medium.com/loom-network/plasmachain-upgrade-whats-new-in-dpos-v3-66798adda108)
* New EVM Database store - To enable Set Appstore to Version: 3
* Core database performance updates
* New configs for Leveldb, `DBBackendConfig -> CacheSizeMegs` see our [config page](loom-yaml.html) for details
* Universal transaction signing, Eth, Tron, more details - [Universal signing medium](https://medium.com/loom-network/universal-transaction-signing-seamless-layer-2-dapp-scaling-for-ethereum-b63a733fc65c)
* More Web3 Json RPC Comptability, Blockexplorers such as Blockscout can index Loom
* Feature Flags, ability to enable disable chain features with soft or hard forks. Light form of governance
* More Metrics around Leveldb
* Windows native build support - `make loom-windows`
* CachingStore updates see our - [config page](loom-yaml.html) for details

## Loom 2.0 Release Build 789 - 2019/02/12

Major update, major updates for Performance, Caching and DPoS. It is recommended to upgrade your testnets immediately.

* DPosV2 now supports Delegates staking and full reward cycle
* Nonce incrementing mid block, loom-js and unity-sdk updated to support
* Work has started on DPoSV3 to have shorter reward cycles and other improvements
* Karma updates
* CheckTx preformance boosts
* Updated P2P protocol
* Go contracts now support event indexing - [Go Events Docs](go-events.html)
* EVM Queries has improved caching layer
* Bug for EVM contracts writting more then 11,800 keys is fixed
* Support for non ETH block chains via TG has started
* More metrics exposed
* YubiHSM Fixes
* Many new config options - [Loom Yaml Configs](loom-yaml.html)



## Loom 2.0 Initial Release Build 651 - 2018/12/14

* Loom SDK 2.0
* Updated P2P Protocols
* Blockexplorer now supports EVM
* Loom Native token support for on chain Staking
* Support For delegation rewards in protocol
* Fixes for GetEvmBlockByNumber/Hash
* Range function Prefix fixes for Go Contracts
* HSM local key signing  - [HSM Docs](hsm.html)
* Unity SDK Updated with better network management

Note Loom SDK 2.0 is not protocol compatible with 1.0 chains. If you have a production chain using 1.0 please contact support@loomx.io for migration help.

## Release 575 - 2018/11/16

* HSM Bug fixes for Yubico Devices  - [HSM Docs](hsm.html)
* HSM now can create new private keys on demand

## Release 575 - 2018/11/13

* HSM support for Yubico Devices - [HSM Docs](hsm.html)
* DPoS Version2 beta - for Plasmachain external validators
* Plasma cash massive improvements, see [Plasma Cli](https://github.com/loomnetwork/plasma-cli)
* Pruning for the Datastore, if chain gets to large, see [Config](loom-yaml.html)
* New EVM receipts data store, see [Config](loom-yaml.html)


## Release 478 - 2018/10/08

* Updated Transfer Gateway utilities
* Transfer Gateway [tutorial plasma testnet](extdev-transfer-gateway.html)

## Release 458 - 2018/09/27

**It is recommended that all users move up to this release**

* Plasmachain Testnets available for Devs - [Docs](testnet-plasma.html)
* Karma Faucet for Testnets - [Faucet](http://faucet.dappchains.com)
* Karma contracts (Sybil resistance) Loom SDK - [Karma](karma.html)
* Massive performance increasements for high load environments
* Initial info about running a Validator - [Validator](validator.html)

## Release 404 - 2018/08/24

** Features
* ERC20 support upgraded in TransferGateway
* Example ERC20 in Gateway - [Example](https://github.com/loomnetwork/token-gateway-example)
* Loom SDK Doc site in [Korean](https://loomx.io/developers/ko/)
* EVM now has limited support for Payable functions, more coming next week
* Loom-JS updates for ERC20/ETH transfers with TransferGateway.
* Loom-JS integration to DPoS contracts
* Experimental Support for [Plasma Debits](https://github.com/loomnetwork/plasma-cash/pull/115)

** Breaking changes
* Deprecrating QueryServerHost, and consolidating all functions to the RPCServer.
* New Config option: RPCBindAddress: "tcp://0.0.0.0:46658"
* Upgrades of PBFT engine, this may cause incompatibility issues on upgrades, please try in staging environments


## Release 375 - 2018/08/10

*NOTE* This is a feature test release, with minor compatibility changes, please verify in staging environements before upgrading your production environment.

* Fixes for Eventing on EVM Contracts
* Beta release of the [Transfer Gateway](transfer-gateway.html)
* [Demo of Transfer Gateway](https://github.com/loomnetwork/cards-gateway-example)
* Memory leak fixes
* Minor api breakages, please upgrade go-loom/loom-js. Unity updates coming soon
* Go-loom is upgraded for api breakages
* loom-js is upgraded for this release.

## Release 330 - 2018/07/30

* Fix for consensus problems on EVM
* Updates for Zombiechain TestNet
* Added more telemetry to measure performance
* Range queries on Go Contracts
* Added ChainID to loom.yaml

* [EVM indexed filter](https://loomx.io/developers/en/web3js-event-filters.html)
* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 288 - 2018/07/17

* [EVM indexed filter](https://loomx.io/developers/en/web3js-event-filters.html)
* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 276 - 2018/07/13

* [New Block Explorer](block-explorer-tutorial.html)
* Multinode EVM fixes
* Loom-JS updates for Plasma cash
* Zombiechain testnet fixes
* DPoS Updates

## Release 209 - 2018/06/20

Major release
* Plasma Cash initial integration - Demos coming next week
* Multinode fixes and performance increases
* Ansible updates for multinode
* Querying / Filtering on EVM supports more types
* Unity SDK updates for EVM
* Loom-JS updates for EVM

## Release 186 - 2018/06/19

* [EVM Unity Example app](https://loomx.io/developers/en/unity-sample-tiles-chain-evm.html)
* Unity SDK support for Solidity Apps
* Many fixes for Filtering/Querying Ethereum Events

## Release 163 - 2018/06/11

* Support for latest Build of Truffle
* [Updated truffle example](https://github.com/loomnetwork/loom-truffle-provider)
* Initial Implementation of Sybil resistance framework
* Websocket events now support topics
* Loom-JS 1.8.0 Release with updated websocket topic support

## Release 161 - 2018/06/07

* Tons of Truffle Fixes
* Tons of web3.js fixes for Loom-Js provider

## Release 155 - 2018/06/06

* [Cocos SDK is Live](cocos-sdk-quickstart.html)
* [Truffle Support available](truffle-deploy.html)
* Static calls to EVM now allow caller
* EVM Fixes for a lot of scenarios


## Release 143 - 2018/06/01

* [BluePrint Docker Images Available](docker-blueprint.html)
* [Japanese Hackathon Results](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [Docker Images for some of Loom SDK Projects](https://hub.docker.com/r/loomnetwork/)
* Evm TX Reciepts fixes


## Release 137 - 2018/05/30

* Go Clients can Access EVM Contracts
* Numerous bug fixes for EVM
* Social Network Example App - Solidity


## Release 136 - 2018/05/28

* Initial Solidity Alpha test build, you can now deploy solidity contracts
* Websocket eventing support for solidity
* Example Project for solidity Events
* [Multinode deployment guide](multi-node-deployment.html)

## Release 133 - 2018/05/24

* Etherboy Demo released
* [Japanese Docs released](https://loomx.io/developers/ja)
* Updated Homepage for [docs site](https://loomx.io/developers/en/)

## Release 132 - 2018/05/23

* Websocket performance fixes
* New Websocket Demo App - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain)

## Release 129 - 2018/05/22

* Websocket support for eventing
* Updates to indexing layer for solidty contracts
* Phaser Game Demo

## Release 128 - 2018/05/21

* Lots of bug fixes for Etherboy

## Release 128 - 2018/05/19

* Stable Beta Release
* Updating logging to default to multiple files
* Moving all RPC to a single interface
* Updated External Process interface
