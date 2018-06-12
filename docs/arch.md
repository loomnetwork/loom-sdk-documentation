---
id: arch 
title: Architecture of a DAppChain
---

Loom SDK is a pluggable Blockchain Development Kit.  Pluggable both at the consensus and contract layer

## Consensus 


Loom SDK has 2 layers of consensus. One at the P2P layer.

Loom Backend supports different BPFT engines, like Tendermint. In future we will support Raft for PoA chains. 

Loom Consensus layer support Loom DPoS or a configurable PoS/DPoS contract per Chain. Once Casper becomes available we will add support for this

![](/developers/img/loom-sdk-arch-overview.jpg)



## Smart contracts

It allows smart contracts written in Go, Solidity or any language supporting GRPC.

Smart contracts can be embedded into the chain, like DPoS, Coin or EthereumVM.

They can also be made as external processes, that the blockchain communicates to via GRPC.


![](/developers/img/loom-sdk-arch-contracts.jpg)


## Ethereum Integration

SDK Is integrates into the Ethereum Backend with three pieces

### Transfer Gateway

![](/developers/img/loom-sdk-arch-plasma.jpg)

### Transfer gateway allows for the following

* Transfering Assets to a DappChain
* Transfering Assets to Ethereum
* Mirroring(Pegging) Assets on a Dappchain
* ERC-20 Tokens
* ERC-721 Tokens
* Ether 

### Plama Cash Contract supports

* ERC-721 Tokens
* ERC-20 Tokens (July)
* Ether (July)


## Blockchain services

SDK includes a number of high level blockchain services

* Signing / Auth / Nonce Middleware
* Builtin Coin
* Indexing
* Websockets and eventing
* Solidity + Ethereum Virtual Machine
* Support for game engines like Cocos, Unity, and Phaser
* Transfer Gateway integration
* Plasma integration (coming late June)
* Cron  (coming soon)
* Rate limiting (early phases)
* Hard fork Manager (coming July)
