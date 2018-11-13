---
id: loom-yaml
title: Loom Yaml and Configuration options
sidebar_label: Loom Yaml and Configuration options
---

# loom.yaml

```
RPCBindAddress: "tcp://0.0.0.0:46658"
QueryServerHost: "tcp://0.0.0.0:9999"
EventDispatcherURI: ""
BFTLogLevel: "debug"
LoomLogLevel: "info"
RootDir: "."
DBName: "app"
GenesisFile: "genesis.json"
PluginsDir: "contracts"
ContractLogLevel: "debug"
ChainID: "awesomechain"
# Peers: ""
# SessionMaxAccessCount: "0"
# SessionDuration: "600"
PlasmaCashEnabled: false
# EthereumURI: ws://127.0.0.1:8545"
```
remove the # from lines you want to change

## RPCBindAddress

Options: "tcp://0.0.0.0:46658"

This is the primary interface for binding RPC interface

## LoomLogLevel

Options: debug, info, warn, error

General logging for the Loom Blockchain


## ContractLogLevel

Options: debug, info, warn, error

General logging for the Go Based Smart contracts.

## BFTLogLevel

Options: debug, info, warn, error

General logging for the BFT Layer Blockchain. This may change based on which BFT engine you are using.

## QueryServerHost

*Deprecated, will be removed next release, don't use this

Options: url for example "tcp://0.0.0.0:9999"

This is the nterface to the blockchain, set a bind port, default port is 9999 


## EthereumURI

Options: "ws://127.0.0.1:8545"

This is the url of the Ethereum Blockchain to read data for plasma and transfer gateway.
In future we will have support for infura also.


## ChainID

Options: "awesomechain"

This is the name of your chain, for example "eth", "zombiechain", "test-zombiechain", "delegatecall".

# config.toml

If you are using tendermint BFT engine, you can modify this file, otherwise leave it alone.

## ABCIAddress

Options: "http://127.0.0.1:45667"

Port for tendermint bft engine

## ReceiptsVersion

Options: 1,2

For now most users should set this to 1, and the evm receipts will be stored in the application store. If the number is set to 2, EVM receipts are stored in a seperate database. This is better for disk usage. However it effects the AppHashes, so the entire network needs to have same option

## RegistryVersion

Options: 1,2

For now most users should set this to 2. This is what version of the smart contract service registry you want to use. The entire cluster needs to be on same version.

## DPOSVersion

Options: 1,2

Version 2 of DPoS is still experimental, only use this on dev clusters. It has better support for rewards and slashing. The entire cluster needs to be on same version.

## CreateEmptyBlocks

Boolean: true, false

Most clusters will want to disable empty blocks for disk space:

## AppStore

```yaml
AppStore:
  CompactOnLoad: True
  MaxVersions: 50
  PruneInterval: 30
```

Configures if the internal loom database should be compacted. This should only be used in production environments

### CompactOnLoad

Will do a large compaction on start, this affects node start times, but ensures disk space is freed

### MaxVersions

Max blocks stored in the app store, this doesn't effect how many block/transactions are stored in the blockchain store

### PruneInterval

How many blocks before trying to clean up disk for the application store.


## HSM

```yaml
HsmConfig:
  HsmEnabled: "true"
  HsmDevType: "yubihsm"
  HsmConnUrl: "localhost:12345"
  HsmDevLogCred: "password"
  HsmAuthKeyId: 0
```
 
Please see [HSM Page](hsm.html) for more details