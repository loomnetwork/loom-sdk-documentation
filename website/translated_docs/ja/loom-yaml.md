---
id: loom-yaml
title: Loom Yamlと設定オプション
sidebar_label: Loom Yamlと設定オプション
---
# loom.yaml

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

## QueryServerHost

*撤廃予定。次回リリースにて削除されるので、これは使用しないこと。

オプション: URLの例 "tcp://0.0.0.0:9999"

これはブロックチェーン・インターフェースである。ポートの割り当てを設定しよう。デフォルトのポートは9999となっている。

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