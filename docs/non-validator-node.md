---
id: non-validator-node
title: Non Validator Node
sidebar_label: Non Validator Node
---

# Joining  extdev-plasma-us1.dappchains.com as Non-validator

Follow the instructions below to join the cluster extdev-plasma-us1.dappchains.com as a non-validator node.

## Download Stable Version of loom

```bash
wget https://private.delegatecall.com/loom/linux/build-690/loom
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
LogStateDB: true
LogEthDBBatch: true
RegistryVersion: 2
ReceiptsVersion: 1
EVMAccountsEnabled: true
TransferGateway:
  ContractEnabled: true
LoomCoinTransferGateway:
  ContractEnabled: true
CreateEmptyBlocks: false
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
                "validators": [ {
    "power": "10",
    "pubKey": "H0pzKPpQ8s1oO9dsptUxrQxwgdiH78J+lgiDmiVgDX8="
},{
    "power": "10",
    "pubKey": "VkmHP4iQOBEBbYNgkSuWaK+qLh40pCwNn3khgRoqi6A="
},{
    "power": "10",
    "pubKey": "akjPOSkJSS70grcNK1fOWPL+bF/+BmFiLudNMja74o0="
},{
    "power": "10",
    "pubKey": "TmE0QXt6ibtpC0c8euVn/pyDKvJnDDoqlOiJMAkj5RY="
} ]
            }
        }
        ,
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
                    "local": "rPVlt934udB+qiTlZHvSVdxagIA="
                },
                "oracles": [{
                    "chain_id": "extdev-plasma-us1",
                    "local": "MVERAqPP6662d5xDHpHkJTL90A0="
                }],
                "first_mainnet_block_num": "2863097"
            }
        }
        ,
        {
            "vm": "plugin",
            "format": "plugin",
            "name": "loomcoin-gateway",
            "location": "loomcoin-gateway:0.1.0",
            "init": {
                "owner": {
                    "chain_id": "extdev-plasma-us1",
                    "local": "rPVlt934udB+qiTlZHvSVdxagIA="
                },
                "oracles": [{
                    "chain_id": "extdev-plasma-us1",
                    "local": "MVERAqPP6662d5xDHpHkJTL90A0="
                }],
                "first_mainnet_block_num": "2863097"
            }
        }
    ]
}
```

## Replace `chaindata/config/genesis.json`

```json
{
  "genesis_time": "2018-12-19T12:08:15Z",
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
    "address": "51A6AAEE6B90585CD4570F4F0FE649952876F992",
    "name": "",
    "power": "10",
    "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "H0pzKPpQ8s1oO9dsptUxrQxwgdiH78J+lgiDmiVgDX8="
    }
},{
    "address": "93BF985EAA5C762E66179AE25C4E4F8F2F5F2E35",
    "name": "",
    "power": "10",
    "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "VkmHP4iQOBEBbYNgkSuWaK+qLh40pCwNn3khgRoqi6A="
    }
},{
    "address": "5630CB245BDE5BB9EF0017F52AFD81652E7C114F",
    "name": "",
    "power": "10",
    "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "akjPOSkJSS70grcNK1fOWPL+bF/+BmFiLudNMja74o0="
    }
},{
    "address": "5A05B73DBC719F3DE66969854DBDBBD33BA567BA",
    "name": "",
    "power": "10",
    "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "TmE0QXt6ibtpC0c8euVn/pyDKvJnDDoqlOiJMAkj5RY="
    }
}
  ],
  "app_hash": ""
}
```

## Run loom

```bash
./loom run --persistent-peers tcp://115d7b6764d0a651f7bacb3851108899ed7a6816@13.57.179.124:46656,tcp://19823e2ea13451aaae4dec31db7940658f0bac8d@13.57.254.58:46656,tcp://b213b03464b380dadc396b0203fb8369da24f6a5@54.193.2.204:46656,tcp://d9b20bcbcb4cc2e1bd8b89bbdd9fb92d52055681@18.144.70.230:46656
```

The non-validator node will now sync with the validator nodes. Status can be queried at http://localhost:46657/status
