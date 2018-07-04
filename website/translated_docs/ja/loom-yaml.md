---
id: loom-yaml
title: Loom Yamlと設定オプション
sidebar_label: Loom Yaml and Configuration options
---
# loom.yaml

    QueryServerHost: "tcp://0.0.0.0:9999"
    EventDispatcherURI: ""
    BFTLogLevel: "debug"
    LoomLogLevel: "info"
    RootDir: "."
    DBName: "app"
    GenesisFile: "genesis.json"
    PluginsDir: "contracts"
    ContractLogLevel: "debug"
    RPCProxyPort: 46658
    # Peers: ""
    # SessionMaxAccessCount: "0"
    # SessionDuration: "600"
    PlasmaCashEnabled: false
    # EthereumURI: ws://127.0.0.1:8545"
    

変更したい1行があれば、そこの # を消去しよう。

## LoomLogLevel

オプション: debug, info, warn, error

Loomブロックチェーン用の一般的なロギング。

## ContractLogLevel

オプション: debug, info, warn, error

Goベースのスマートコントラクト用の一般的なロギング。

## BFTLogLevel

オプション: debug, info, warn, error

General logging for the BFT Layer Blockchain. This may change based on which BFT engine you are using.

## QueryServerHost

Options: url for example "tcp://0.0.0.0:9999"

This is the nterface to the blockchain, set a bind port, default port is 9999

## EthereumURI

Options: "ws://127.0.0.1:8545"

This is the url of the Ethereum Blockchain to read data for plasma and transfer gateway. In future we will have support for infura also.

## RPCProxyPort

Options: "46658"

This is one of the rpc ports for blockchain.

NOTE: this will be changing to a bind interface style in next release

# config.toml

If you are using tendermint BFT engine, you can modify this file, otherwise leave it alone.

## ABCIAddress

Options: "http://127.0.0.1:45667"

Port for tendermint bft engine

## RPCAddress

Options: "http://127.0.0.1:45668"

Note this has to match the RPCProxyPort in the loom.yaml