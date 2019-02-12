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


## Plasma

```yaml
PlasmaCash:
  ContractEnabled: true
  OracleEnabled: true
```

## Karma

```yaml
Karma:
  Enabled: true
  ContractEnabled: false
  UpkeepEnabled: true
  MaxCallCount: 10
  SessionDuration: 60
```

### Enabled
Enables karma functionality. Users cannot perform transactions without positive karma. 
Call transactions are limited by MaxCallCount and karma.

### ContractEnabled
Allows you to deploy karma contract to collect data even if chain doesn't use it

### UpkeepEnabled
Deployed contracts have an upkeep cost. Contracts can be active or inactive, users periodically spend karma to keep contracts active.

### MacCallCount
Maximum number of call transactions allowed per session duration. This is increased by the user's karma.

### SessionDuration
Session duration in seconds for restricting call transaction. 

## Caching Store 

```yaml
CachingStoreConfig: 
  CachingEnabled: {{ .CachingStoreConfig.CachingEnabled }}
  # Number of cache shards, value must be a power of two
  Shards: {{ .CachingStoreConfig.Shards }} 
  # Time after we need to evict the key
  EvictionTimeInSeconds: {{ .CachingStoreConfig.EvictionTimeInSeconds }} 
  # interval at which clean up of expired keys will occur
  CleaningIntervalInSeconds: {{ .CachingStoreConfig.CleaningIntervalInSeconds }} 
  # Total size of cache would be: MaxKeys*MaxSizeOfValueInBytes
  MaxKeys: {{ .CachingStoreConfig.MaxKeys }} 
  MaxSizeOfValueInBytes: {{ .CachingStoreConfig.MaxSizeOfValueInBytes }} 
  # Logs operations
  Verbose: {{ .CachingStoreConfig.Verbose }} 
  LogLevel: "{{ .CachingStoreConfig.LogLevel }}" 
  LogDestination: "{{ .CachingStoreConfig.LogDestination }}" 
```


## Event Store

```yaml
EventDispatcher:
  # Available dispatcher: "db_indexer" | "log" | "redis"
  Dispatcher: "db_indexer"
  # Redis will be use when Dispatcher is "redis"
  Redis:
  	URI: "{{.EventDispatcher.Redis.URI}}"
```

## App store

```yaml
AppStore:
  # If true the app store will be compacted before it's loaded to reclaim disk space.
  CompactOnLoad: {{ .AppStore.CompactOnLoad }}
  # Maximum number of app store versions to keep, if zero old versions will never be deleted.
  MaxVersions: {{ .AppStore.MaxVersions }}
  # Number of seconds to wait after pruning a batch of old versions from the app store.
  # If this is set to zero the app store will only be pruned after a new version is saved.
  PruneInterval: {{ .AppStore.PruneInterval }}
  # Number of versions to prune at a time.
  PruneBatchSize: {{ .AppStore.PruneBatchSize }}
```