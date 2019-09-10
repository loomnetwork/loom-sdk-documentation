---
id: arch
title: Architecture of a DAppChain
---

Loom SDK is a pluggable Blockchain Development Kit. Pluggable both at the consensus and contract layer.

## Consensus

Loom SDK has 2 layers of consensus- P2P layer (a BFT system) and Loom Consensus (DPoS).

### P2P Layer
Loom Backend supports different BPFT engines, like Tendermint. In the future, we will support Raft for PoA chains.

### DPoS Layer

Loom Consensus layer support Loom DPoS or a configurable PoS/DPoS contract per Chain. Once Casper becomes available we will add support for this.

![](/developers/img/loom-sdk-arch-overview.jpg)



## Smart contracts

It allows smart contracts written in Go, Solidity or any language supporting GRPC.

Smart contracts can be embedded into the chain, like DPoS, Coin or EthereumVM.

They can also be made as external processes, that the blockchain communicates to via GRPC.


![](/developers/img/loom-sdk-arch-contracts.jpg)


## Ethereum Integration

The SDK integrates into the Ethereum Backend with the following pieces:

### Transfer Gateway

![](/developers/img/loom-sdk-arch-plasma.jpg)

### Transfer gateway allows for the following:

* Transfering Assets to a DappChain
* Transfering Assets to Ethereum
* Mirroring(Pegging) Assets on a Dappchain
* ERC-20 Tokens
* ERC-721 Tokens
* Ether

### Basechain Contract supports

* ERC-721 Tokens
* ERC-20 Tokens
* Ether


## Blockchain services

SDK includes a number of high-level blockchain services:

* Signing / Auth / Nonce Middleware
* Built-in Coin
* Indexing
* Websockets and eventing
* Solidity + Ethereum Virtual Machine
* Support for game engines like Unity
* Transfer Gateway integration
* Cron  (coming soon)
* Rate limiting (early phases)
* Hard fork Manager (coming July)
