---
id: loom-yaml
title: Loom Yaml과 설정 옵션
sidebar_label: Loom Yaml과 설정 옵션
---
# loom.yaml

    RPCBindAddress: "tcp://0.0.0.0:46658"
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
    

변경을 원하는 라인에서 #을 제거하세요

## RPCBindAddress

옵션: "tcp://0.0.0.0:46658"

이것은 RPC 인터페이스 바인딩을 위한 프라이머리 인터페이스 입니다

## LoomLogLevel

옵션: debug, info, warn, error

Loom 블록체인을 위한 일반적인 로깅

## ContractLogLevel

옵션: debug, info, warn, error

Go 기반의 스마트 컨트랙트를 위한 일반적인 로깅.

## BFTLogLevel

옵션: debug, info, warn, error

BFT 레이어 블록체인을 위한 일반적인 로깅. 여러분이 사용하는 BFT 엔진에 따라 변경될 수 있습니다.

## EthereumURI

Options: "ws://127.0.0.1:8545"

This is the url of the Ethereum Blockchain to read data for Basechain and transfer gateway. In future we will have support for infura also.

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

Data Types

```yaml
type KarmaConfig struct {
    Enabled         bool  // Activate karma module
    ContractEnabled bool  // Allows you to deploy karma contract to collect data even if chain doesn't use it
    UpkeepEnabled   bool  // Adds an upkeep cost to deployed and active contracts for each user
    MaxCallCount    int64 // Maximum number call transactions per session duration
    SessionDuration int64 // Session length in seconds
}
```

Example

```yaml
Karma:
  Enabled: {{ .Karma.Enabled }}
  ContractEnabled: {{ .Karma.ContractEnabled }}
  UpkeepEnabled: {{ .Karma.UpkeepEnabled }}
  MaxCallCount: {{ .Karma.MaxCallCount }}
  SessionDuration: {{ .Karma.SessionDuration }}
```

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