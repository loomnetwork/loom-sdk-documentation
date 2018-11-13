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

Most users should set this to 1, and the evm receipts will be stored in the application store. If the number is set to 2, EVM receipts are stored in a seperate database. This is better for disk usage. However it affects the AppHashes, so the entire cluster must be initialized with the same version, and it must not be changed after initialization.

## RegistryVersion

Options: 1,2

Most users should set this to 2. This is the latest version of the smart contract registry. The entire cluster needs to be initialized with the same version, and it must not be changed after initialization.

## DPOSVersion

Options: 1,2

Version 2 of DPoS is still experimental, only use this on dev clusters. It has better support for rewards and slashing. The entire cluster needs to be on same version, and it must not be changed after initialization.

## CreateEmptyBlocks

Boolean: true, false

Most clusters will want to disable empty blocks to save disk space.

## AppStore

```yaml
AppStore:
  CompactOnLoad: true
  MaxVersions: 50
```

Configures how much history is retained in app.db, should be enabled on production clusters, and dev clusters that don't get wiped often. A new app.db version is created with each block, so without these settings nodes will consume significantly more disk space.

### CompactOnLoad

Will compact app.db when the node starts, this affects node start times, but ensures disk space that's taken up by old app.db versions is freed.

### MaxVersions

Max versions stored in the app store, each time a block is committed a new version of the app state is stored in the store, this doesn't affect how many blocks/transactions are stored in the blockchain store.

## HSM

```yaml
HsmConfig:
  HsmEnabled: "true"
  HsmDevType: "yubihsm"
  HsmConnUrl: "localhost:12345"
  HsmDevLogCred: "password"
  HsmAuthKeyId: 1
  HsmSignKeyId: 100
```
 
Please see [HSM Page](hsm.html) for more details
