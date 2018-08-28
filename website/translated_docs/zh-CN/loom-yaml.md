---
id: loom-yaml
title: Loom Yaml 和配置选项
sidebar_label: Loom Yaml 和配置选项
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
    

从要更改的行中删除 #

## RPCBindAddress

选项： "tcp://0.0.0.0:46658"

这是绑定 RPC 接口的主要接口

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

*已弃用，将在下次发布时删除，请勿使用此功能

选项: url 例如 "tcp://0.0. 0.0: 9999"

这是 区块链的接口, 设置一个绑定端口, 默认端口为9999

## EthereumURI

选项: "ws://127.0. 0.1: 8545"

这是以太坊区块链的网址，用于读取 plasma 和传输网关的数据。 将来我们也会支持 infura。

## ChainID

选项："awesomechain"

这是你的链名称, 例如 "zombiechain", "zombiechain", "delegatecall"。

# config.toml

如果你使用的是 tendermint BFT 引擎, 则可以修改此文件, 否则请单独保留它。

## ABCIAddress

选项: "http://127.0.0.1:45667"

Tendermint bft 引擎的端口