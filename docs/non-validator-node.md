---
id: non-validator-node
title: Non Validator Node
sidebar_label: Non Validator Node
---

# Joining dposv2.dappchains.com as Non-validator

Follow the instructions below to join the cluster test-z-validator1.dappchains.com as a non-validator node.

## Download Stable Version of loom

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## Create loom.yml

```yaml
ChainID: "dposv2"
QueryServerHost: "tcp://0.0.0.0:9999"
RPCListenAddress: "tcp://0.0.0.0:46657"
TendermintLogLevel: "debug"
LogStateDB: true
LogEthDBBatch: true
RegistryVersion: 2
ReceiptsVersion: 2
CreateEmptyBlocks: false
DPOSVersion: 2
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
              "chainId": "dposv2",
              "local": "JC+p7V+PXHYBtUy2MOYOKp7YSbY="
            },
            "balance": "100"
          },
          {
            "owner": {
              "chainId": "dposv2",
              "local": "iOKkG0ByOm40/WmMhdvmjHkHfsc="
            },
            "balance": "100"
          },
          {
            "owner": {
              "chainId": "dposv2",
              "local": "Q7mRqhA3jRrBSP5QXrJSYGMwLVQ="
            },
            "balance": "100"
          },
          {
            "owner": {
              "chainId": "dposv2",
              "local": "yCeaEY/UqwHcJly/BxUH52HCNvI="
            },
            "balance": "100"
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
          "electionCycleLength": "604800"
        },
        "validators": [
          {
            "power": "10",
            "pubKey": "yC1ZAMPKecOtCfBqk0Z0Jh2itcpBZueOehnCtyRb0O8="
          },
          {
            "power": "10",
            "pubKey": "NsOUCD4ZiyobzA06xZkverBR8p57Fl8qY0410ZKY0ZQ="
          },
          {
            "power": "10",
            "pubKey": "lYGdZyuzLk3VOZ7KnpLMKE/EPGIOSCU8+N7G8biWPok="
          },
          {
            "power": "10",
            "pubKey": "k2Uod0/yz5EC8J9b5k0AzSjXOAX1/0DDmxmZp6PXWPI="
          }
        ]
      }
    }
  ]
}
```

## Replace `chaindata/config/genesis.json`

```json
{
  "genesis_time": "0001-01-01T00:00:00Z",
  "chain_id": "dposv2",
  "validators": [
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "yC1ZAMPKecOtCfBqk0Z0Jh2itcpBZueOehnCtyRb0O8="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "NsOUCD4ZiyobzA06xZkverBR8p57Fl8qY0410ZKY0ZQ="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "lYGdZyuzLk3VOZ7KnpLMKE/EPGIOSCU8+N7G8biWPok="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "k2Uod0/yz5EC8J9b5k0AzSjXOAX1/0DDmxmZp6PXWPI="
      }
    }
  ],
  "app_hash": ""
}
```

## Run loom

```bash
./loom run --persistent-peers tcp://d96b4cdb4ee44ef2f88d1eb78ce4b66baa09d506@13.250.65.46:46656,tcp://2e8b6b1328c69fdd1546593c2e9fdc8e7f8240ce@54.251.141.239:46656,tcp://9d0d9dec1fd39851c2fe61e1e4de32e3655d5c71@3.0.48.99:46656,tcp://f5155e7a1eef53e98fcae0043d6d6b29c1e0ee0a@13.250.37.200:46656
```

The non-validator node will now sync with the validator nodes. Status can be queried at http://localhost:46657/status
