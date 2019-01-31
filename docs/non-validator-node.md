---
id: non-validator-node
title: Non Validator Node
sidebar_label: Non Validator Node
---

# Joining  extdev-plasma-us1.dappchains.com as Non-validator

Follow the instructions below to join the cluster extdev-plasma-us1.dappchains.com as a non-validator node.

## Download Stable Version of loom

```bash
wget https://private.delegatecall.com/loom/linux/build-762/loom
chmod +x loom
./loom version
```

## Create loom.yml

```yaml
ChainID: "extdev-plasma-us1"
QueryServerHost: "tcp://0.0.0.0:9999"
RPCListenAddress: "tcp://0.0.0.0:46657"
BlockchainLogLevel: "info"
LoomLogLevel: "info"
LogLevel: "info"
ContractLogLevel: "info"
RegistryVersion: 2
ReceiptsVersion: 1
EVMAccountsEnabled: true
TransferGateway:
  ContractEnabled: true
LoomCoinTransferGateway:
  ContractEnabled: true
CreateEmptyBlocks: true
DPOSVersion: 2
BootLegacyDPoS: true
CachingStoreConfig:
  CachingEnabled: true
```

## Initialize loom

```bash
./loom init
```

## Replace `genesis.json` in current directory

```json
{
  "contracts": [
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "coin",
      "location": "coin:1.0.0",
      "init": {
        "accounts": [
          {
            "owner": {
              "chain_id": "extdev-plasma-us1",
              "local": "MHMeEebYJMfnBpk6PKKXyxdv9So="
            },
            "balance": "1000"
          },
          {
            "owner": {
              "chain_id": "extdev-plasma-us1",
              "local": "0Uci31f2EoaM7P3Dhl6gUMhH9O8="
            },
            "balance": "1000"
          },
          {
            "owner": {
              "chain_id": "extdev-plasma-us1",
              "local": "NP3Iz4pS1LrlVfk1q5Yrja66kPg="
            },
            "balance": "1000"
          },
          {
            "owner": {
              "chain_id": "extdev-plasma-us1",
              "local": "5revlBULnzPvGB0iIhPSlWszMx4="
            },
            "balance": "1000"
          }
        ]
      }
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "dposV2",
      "location": "dposV2:2.0.0",
      "init": {
        "params": {
          "validatorCount": "21",
          "electionCycleLength": "60",
          "oracleAddress": {
            "chain_id": "extdev-plasma-us1",
            "local": "Z5Qpn2pHMDcmiFer8EBAYDkleTE="
          }
        },
        "validators": [
          {
            "power": "10",
            "pubKey": "CKjlUZIMTVT3oFWyx4+RmiBdznoszEyy0bn09uhd1XU="
          },
          {
            "power": "10",
            "pubKey": "N49Nt1P7/whXUa5nk1E/jJPZEmG3UJd0hsHpuHK1eaY="
          },
          {
            "power": "10",
            "pubKey": "q2CzaJWjZXqu2vEf+HtkPI8j/0jmbtpHz3jxN4UMF28="
          },
          {
            "power": "10",
            "pubKey": "HwS0l1v8rJw4mw7jZouh6NYmiK1qk2IA/JehcdquuaY="
          }
        ]
      }
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "ethcoin",
      "location": "ethcoin:1.0.0",
      "init": null
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "addressmapper",
      "location": "addressmapper:0.1.0",
      "init": null
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "gateway",
      "location": "gateway:0.1.0",
      "init": {
        "owner": {
          "chain_id": "extdev-plasma-us1",
          "local": "bWVeTJjewiMi6HMxCAxQmMjPVOw="
        },
        "oracles": [
          {
            "chain_id": "extdev-plasma-us1",
            "local": "34hhmXhsUwL5H2cmeEfr8DdoUs0="
          }
        ],
        "first_mainnet_block_num": "2863097"
      }
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "loomcoin-gateway",
      "location": "loomcoin-gateway:0.1.0",
      "init": {
        "owner": {
          "chain_id": "extdev-plasma-us1",
          "local": "q3pFLLKx8jbzpTSQ9p5zuJCnMaU="
        },
        "oracles": [
          {
            "chain_id": "extdev-plasma-us1",
            "local": "whFzjdcqGTynXvZETvUmFPYxhsM="
          }
        ],
        "first_mainnet_block_num": "2863097"
      }
    }
  ]
}
```

## Replace `chaindata/config/genesis.json`

```json
{
  "genesis_time": "2019-01-25T04:38:21Z",
  "chain_id": "extdev-plasma-us1",
  "consensus_params": {
    "block_size": {
      "max_bytes": "22020096",
      "max_gas": "-1"
    },
    "evidence": {
      "max_age": "100000"
    },
    "validator": {
      "pub_key_types": [
        "ed25519"
      ]
    }
  },
  "validators": [
    {
      "address": "DF08C75CA88DF9EB71E78260A5F41DEEE5A8C93E",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "CKjlUZIMTVT3oFWyx4+RmiBdznoszEyy0bn09uhd1XU="
      }
    },
    {
      "address": "3DEB26D8718244502E46DDE48D651ADA098071AA",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "N49Nt1P7/whXUa5nk1E/jJPZEmG3UJd0hsHpuHK1eaY="
      }
    },
    {
      "address": "F5278DA47C67FCEEE4AE160C4B3396BEA45E7753",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "q2CzaJWjZXqu2vEf+HtkPI8j/0jmbtpHz3jxN4UMF28="
      }
    },
    {
      "address": "E7D1FF41D2B458EF4C3C8996F02E46C2FFB33C29",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "HwS0l1v8rJw4mw7jZouh6NYmiK1qk2IA/JehcdquuaY="
      }
    }
  ],
  "app_hash": ""
}
```

## Run loom

```bash
./loom run --persistent-peers tcp://1cba97a0a108cb0de51e5a3ff6ac15d70e0fa076@52.53.145.158:46656,tcp://367a9fa0df0afeed204c3360867e37ef03da5b97@18.144.71.222:46656,tcp://7b537b6ad25b5b13864ec20bed8803489189a274@52.53.153.109:46656,tcp://d7623e990790048db76c5d6a25e12efa818aaef1@13.57.240.102:46656
```
