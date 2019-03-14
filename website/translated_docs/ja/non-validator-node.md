---
id: non-validator-node
title: 非バリデーターのノード
sidebar_label: Non Validator Node
---
# extdev-plasma-us1.dappchains.com に非バリデーターとして参加

下の手順に従って、非バリデーターノードとして extdev-plasma-us1.dappchains.com のクラスタに参加しよう。

## 安定的なバージョンのLoomをダウンロード

```bash
wget https://private.delegatecall.com/loom/linux/build-762/loom
chmod +x loom
./loom version
```

## loom.ymlを作成

```yaml
ChainID: "extdev-plasma-us1"
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

## Loomを初期化

```bash
./loom init
```

## 現在のディレクトリ内に `genesis.json` を置き換える

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

## `chaindata/config/genesis.json` を置き換える

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

## loomを実行

```bash
./loom run --persistent-peers tcp://1cba97a0a108cb0de51e5a3ff6ac15d70e0fa076@52.53.145.158:46656,tcp://367a9fa0df0afeed204c3360867e37ef03da5b97@52.53.184.91:46656,tcp://7b537b6ad25b5b13864ec20bed8803489189a274@54.193.119.132:46656,tcp://d7623e990790048db76c5d6a25e12efa818aaef1@52.53.221.33:46656
```

こうして、非バリデーターノードバリデーターノードと同期されることとなる。ステータスは http://localhost:46657/status にてクエリ可能。

# test-z-asia1.dappchains.com に非バリデーターとして参加

下の手順に従って、非バリデーターノードとして test-z-asia1.dappchains.com のクラスタに参加しよう。

## 安定的なバージョンのLoomをダウンロード

```bash
wget https://private.delegatecall.com/loom/linux/build-769/loom
chmod +x loom
./loom version
```

## loom.ymlを作成

```yaml
ChainID: "asia1"
RPCListenAddress: "tcp://0.0.0.0:46657"
BlockchainLogLevel: "info"
LoomLogLevel: "info"
LogLevel: "info"
ContractLogLevel: "info"
LogStateDB: true
LogEthDBBatch: true
RegistryVersion: 2
ReceiptsVersion: 2
EVMAccountsEnabled: true
TransferGateway:
  ContractEnabled: true
LoomCoinTransferGateway:
  ContractEnabled: true
CreateEmptyBlocks: true
PlasmaCash:
  ContractEnabled: True
```

## Loomを初期化

```bash
./loom init
```

## 現在のディレクトリ内に `genesis.json` を置き換える

```json
{
  "contracts": [
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "coin",
      "location": "coin:1.0.0",
      "init": null
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "dpos",
      "location": "dpos:1.0.0",
      "init": {
        "params": {
          "witnessCount": "21",
          "electionCycleLength": "604800",
          "minPowerFraction": "5"
        },
        "validators": [
          {
            "power": "10",
            "pubKey": "azRdibY3Ei+zabgXe5P6XRpaiLpoRAvcZ5NCi//sPPo="
          },
          {
            "power": "10",
            "pubKey": "htNASFu5N6mRoQrXr5dBWqnZNBrQ2RncdHp6Es6E8NQ="
          },
          {
            "power": "10",
            "pubKey": "Z6s7hcP2Wc0OomapYu6t4ag7BXEfHbZulUsIXn/eAr4="
          },
          {
            "power": "10",
            "pubKey": "q/FEBy3TIlcFqMqIaILNBbd4hl5qmZYIx5rmMZRpcpQ="
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
          "chain_id": "asia1",
          "local": "CUwc5LxlryOciDof5jNC+HblqOo="
        },
        "oracles": [
          {
            "chain_id": "asia1",
            "local": "w8pnvCbwrrdd+bte8CT79q9wSdo="
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
          "chain_id": "asia1",
          "local": "CUwc5LxlryOciDof5jNC+HblqOo="
        },
        "oracles": [
          {
            "chain_id": "asia1",
            "local": "w8pnvCbwrrdd+bte8CT79q9wSdo="
          }
        ],
        "first_mainnet_block_num": "2863097"
      }
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "plasmacash",
      "location": "plasmacash:1.0.0",
      "init": {
        "oracle": {
          "chain_id": "asia1",
          "local": "yVkauJrXuKMRd5uCYoxtCYeUTjo="
        }
      }
    }
  ]
}
```

## `chaindata/config/genesis.json` を置き換える

```json
{
  "genesis_time": "2018-12-18T05:07:03Z",
  "chain_id": "asia1",
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
      "address": "5EDDA0DDF32282FBA87F2DBAB7652D537CF71350",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "azRdibY3Ei+zabgXe5P6XRpaiLpoRAvcZ5NCi//sPPo="
      }
    },
    {
      "address": "8F648619AB9D8E252D59E6531B25D8CB9775C52D",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "htNASFu5N6mRoQrXr5dBWqnZNBrQ2RncdHp6Es6E8NQ="
      }
    },
    {
      "address": "0BA5DAC3FA0E0B66B428285F19582BD1AFBAFE38",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "Z6s7hcP2Wc0OomapYu6t4ag7BXEfHbZulUsIXn/eAr4="
      }
    },
    {
      "address": "34BB90BEDF209D952DA9CC82E89132673EF0C805",
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "q/FEBy3TIlcFqMqIaILNBbd4hl5qmZYIx5rmMZRpcpQ="
      }
    }
  ],
  "app_hash": ""
}
```

## loomを実行

```bash
./loom run --persistent-peers tcp://c50d327b10308483b8e477b8376de73b80d8b1af@3.0.41.112:46656,tcp://9bc89242b811e8616eb37e50746e25f4b1a86ec7@54.254.138.238:46656,tcp://88ba2d1759195187b47de0567a697a46099a2360@3.0.202.142:46656,tcp://6d77bd5a41289701007780311702dd6647aa39d6@13.229.250.215:46656
```

こうして、非バリデーターノードバリデーターノードと同期されることとなる。ステータスは http://localhost:46657/status にてクエリ可能。