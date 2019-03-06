---
id: loom-yaml
title: Loom Yamlと設定オプション
sidebar_label: Loom Yamlと設定オプション
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
    

変更したい1行があれば、そこの # を消去しよう。

## RPCBindAddress

オプション: "tcp://0.0.0.0:46658"

これは、バインディングRPCインターフェイスのためのプライマリインターフェイスである。

## LoomLogLevel

オプション: debug, info, warn, error

Loomブロックチェーン用の一般的なロギング。

## ContractLogLevel

オプション: debug, info, warn, error

Goベースのスマートコントラクト用の一般的なロギング。

## BFTLogLevel

オプション: debug, info, warn, error

BFTレイヤーブロックチェーン用の一般的なロギング。使用するBFTエンジンに基づき、変更となる可能性がある。

## EthereumURI

オプション: "ws://127.0.0.1:8545"

これはイーサリアム・ブロックチェーンのURLであり、Plasmaやトランスファーゲートウェイのためにデータを読み取る。 今後はinfuraのサポートも予定している。

## ChainID

オプション: "awesomechain"

これはあなたのチェーンの名前である。例えば "eth"、"zombiechain"、"test-zombiechain"、"delegatecall"というようなものだ。

# config.toml

Tendermint BFTエンジンをお使いであれば、このファイルを修正可能だ。そうでない場合はそのままにしておこう。

## ABCIAddress

オプション: "http://127.0.0.1:45667"

Tendermint bftエンジン用のポート

## ReceiptsVersion

オプション: 1,2

ほとんどのユーザーはこれを1に設定する必要があり、evmの受信者はアプリケーションストアに保存される。 2に設定されている場合、EVMの受信者は別のデータベースに保存される。 これはディスクの使用に適しているが、 AppHashesに影響するため、クラスター全体を同じバージョンで初期化する必要があり、初期化後に変更してはならない。

## RegistryVersion

オプション: 1,2

ほとんどのユーザーはこれを2に設定する必要がある。 これはスマートコントラクトレジストリの最新バージョンである。 クラスタ全体を同じバージョンで初期化する必要があり、初期化後に変更してはならない。

## DPOSVersion

オプション: 1,2

DPoSのバージョン2はまだ実験段階であり、開発用クラスタでのみこれを使用する。 これはリワードとスラッシングをよりサポートする。 クラスタ全体を同じバージョンにする必要があり、初期化後に変更してはならない。

## CreateEmptyBlocks

Boolean: true, false

多くのクラスタは、ディスク容量を節約するために空のブロックを無効にしようとする。

## AppStore

```yaml
AppStore:
  CompactOnLoad: true
  MaxVersions: 50
```

Configures how much history is retained in app.db, should be enabled on production clusters, and dev clusters that don't get wiped often. A new app.db version is created with each block, so without these settings nodes will consume significantly more disk space.

### CompactOnLoad

ノードの起動時にapp.dbを圧縮する。これはノードの起動時間に影響を及ぼすが、古いapp.dbバージョンによって占有されていたディスク領域が解放される。

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

詳細は[HSM Page](hsm.html) を参照

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

例

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