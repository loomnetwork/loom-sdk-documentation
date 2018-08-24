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

