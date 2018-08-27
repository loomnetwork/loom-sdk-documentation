---
id: loom-yaml
title: Loom Yaml 和配置选项
sidebar_label: Loom Yaml 和配置选项
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
    ChainID: "awesomechain"
    # Peers: ""
    # SessionMaxAccessCount: "0"
    # SessionDuration: "600"
    PlasmaCashEnabled: false
    # EthereumURI: ws://127.0.0.1:8545"
    

从要更改的行中删除 #

## LoomLogLevel

选项: 调试、信息、警告、错误

Loom 区块链的常规日志记录

## ContractLogLevel

选项: 调试、信息、警告、错误

Go Based 智能合约的常规日志记录

## BFTLogLevel

选项: 调试、信息、警告、错误

BFT 层区块链的常规日志记录。这可能会根据你使用的 BFT 引擎而改变。

## QueryServerHost

选项: url 例如 "tcp://0.0. 0.0: 9999"

这是 区块链的接口, 设置一个绑定端口, 默认端口为9999

## EthereumURI

选项: "ws://127.0. 0.1: 8545"

这是以太坊区块链的网址，用于读取 plasma 和传输网关的数据。 将来我们也会支持 infura。

## RPCProxyPort

选项: "46658"

这是区块链的 rpc 端口之一。

注意: 这将在下一个版本中更改为绑定接口样式

# config.toml

如果你使用的是 tendermint BFT 引擎, 则可以修改此文件, 否则请单独保留它。

## ABCIAddress

选项: "http://127.0.0.1:45667"

Tendermint bft 引擎的端口

## RPCAddress

选项: "http://127.0.0.1:45668"

注意这必须与 loom.yaml 中的 RPCProxyPort 相匹配

## ChainID

选项："awesomechain"

This is the name of your chain, for example "eth", "zombiechain", "test-zombiechain", "delegatecall".