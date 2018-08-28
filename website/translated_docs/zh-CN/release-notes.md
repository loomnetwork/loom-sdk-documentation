---
id: release-notes
title: 发布日志
sidebar_label: 发布日志
---
## 概述

发布日志（最新的在顶部）

## Release 404 - Aug 24th

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

## Release 375 - Aug 10th

*NOTE* This is a feature test release, with minor compatibility changes, please verify in staging environements before upgrading your production environment.

* Fixes for Eventing on EVM Contracts
* Beta release of the [Transfer Gateway](transfer-gateway.html)
* [Demo of Transfer Gateway](https://github.com/loomnetwork/cards-gateway-example)
* Memory leak fixes
* Minor api breakages, please upgrade go-loom/loom-js. Unity updates coming soon
* Go-loom is upgraded for api breakages
* loom-js is upgraded for this release. 

## Release 330 - July 30th

* Fix for consensus problems on EVM 
* Updates for Zombiechain TestNet
* Added more telemetry to measure performance
* Range queries on Go Contracts
* Added ChainID to loom.yaml

* [EVM indexed filter](https://loomx.io/developers/docs/en/web3js-event-filters.html)

* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 288 - July 17th

* [EVM indexed filter](https://loomx.io/developers/docs/en/web3js-event-filters.html)
* EVM filter pool fixes and event system
* Loom-JS EVM updates for indexed filters
* Loom-JS EVM fixes for getting block by hash

## Release 276 - July 13th

* [New Block Explorer](block-explorer-tutorial.html)
* Multinode EVM fixes 
* Loom-JS updates for Plasma cash
* Zombiechain testnet fixes
* DPoS Updates

## Release 209 - June 20th

Major release

* Plasma Cash initial integration - Demos coming next week
* Multinode fixes and performance increases
* Ansible updates for multinode
* Querying / Filtering on EVM supports more types 
* Unity SDK updates for EVM 
* Loom-JS updates for EVM

## Release 186 - June 19th

* [EVM Unity Example app](https://loomx.io/developers/docs/en/unity-sample-tiles-chain-evm.html)
* Unity SDK support for Solidity Apps
* Many fixes for Filtering/Querying Ethereum Events

## Release 163 - June 11th

* Support for latest Build of Truffle
* [Updated truffle example](https://github.com/loomnetwork/loom-truffle-provider)
* Initial Implementation of Sybil resistance framework
* Websocket events now support topics 
* Loom-JS 1.8.0 Release with updated websocket topic support

## Release 161 - June 7th

* Tons of Truffle Fixes
* Tons of web3.js fixes for Loom-Js provider

## Release 155 - June 6th

* [Cocos SDK is Live](cocos-sdk-quickstart.html)
* [Truffle Support available](truffle-deploy.html)
* Static calls to EVM now allow caller
* EVM Fixes for a lot of scenarios 

## Release 143 - June 1st

* [BluePrint Docker Images Available](docker-blueprint.html)
* [Japanese Hackathon Results](https://medium.com/loom-network/highlights-from-the-first-loom-unity-sdk-hackathon-tokyo-edition-6ed723747c19)
* [Docker Images for some of Loom SDK Projects](https://hub.docker.com/r/loomnetwork/)
* Evm TX Reciepts fixes 

## Release 137 - May 30th

* Go Clients can Access EVM Contracts
* Numerous bug fixes for EVM
* [Social Network Example App - Solidity](simple-social-network-example.html)

## Release 136 - May 28th

* Initial Solidity Alpha test build, you can now deploy solidity contracts
* Websocket eventing support for solidity 
* [Example Project for solidity Events](phaser-sdk-demo-web3-websocket.html)
* [Multinode deployment guide](multi-node-deployment.html)

## Release 133 - May 24th

* [Etherboy Demo released](https://loomx.io/developers/docs/en/etherboy-game.html)
* [Japanese Docs released](https://loomx.io/developers/ja)
* Updated Homepage for [docs site](https://loomx.io/developers/en/) 

## Release 132 - May 23rd

* Websocket performance fixes
* New Websocket Demo App - TilesChain - [Github](https://github.com/loomnetwork/tiles-chain) 

## Release 129 - May 22rd

* Websocket support for eventing
* Updates to indexing layer for solidty contracts
* Phaser Game Dame - [Github](https://github.com/loomnetwork/phaser-sdk-demo)

## Release 128 - May 21th

* Lots of bug fixes for Etherboy

## Release 128 - May 19th

* Stable Beta Release
* Updating logging to default to multiple files 
* Moving all RPC to a single interface
* Updated External Process interface