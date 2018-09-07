---
id: loom-yaml
title: Loom Yaml과 설정 옵션
sidebar_label: Loom Yaml과 설정 옵션
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

## QueryServerHost

*Deprecated, will be removed next release, don't use this

Options: url for example "tcp://0.0.0.0:9999"

This is the nterface to the blockchain, set a bind port, default port is 9999

## EthereumURI

Options: "ws://127.0.0.1:8545"

This is the url of the Ethereum Blockchain to read data for plasma and transfer gateway. In future we will have support for infura also.

## ChainID

Options: "awesomechain"

This is the name of your chain, for example "eth", "zombiechain", "test-zombiechain", "delegatecall".

# config.toml

If you are using tendermint BFT engine, you can modify this file, otherwise leave it alone.

## ABCIAddress

Options: "http://127.0.0.1:45667"

Port for tendermint bft engine