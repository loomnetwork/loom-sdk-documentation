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

*지원불가, 다음 릴리즈에서 삭제될 것입니다, 사용하지 마세요

옵션: 예를 들자면 url "tcp://0.0.0.0:9999"

이것은 블록체인와의 인터페이스이고 바인드 포트 세팅입니다, 기본 포트는 9999입니다

## EthereumURI

옵션: "ws://127.0.0.1:8545"

이것은 플라즈마와 transfer 게이트웨이가 데이터를 읽기 위한 Ethereum 블록체인의 url 입니다. 향후에 infura를 위한 지원이 있을 것입니다.

## ChainID

옵션: "awesomechain"

이것은 여러분 체인의 이름입니다, 예를 들면 "eth", "zombiechain", "test-zombiechain", "delegatecall".

# config.toml

여러분이 만약 tendermint BFT 엔진을 사용한다면, 이 파일을 수정할 수도 있고, 그냥 내버려 둘 수도 있습니다.

## ABCIAddress

옵션: "http://127.0.0.1:45667"

Tendermint bft 엔진을 위한 포트