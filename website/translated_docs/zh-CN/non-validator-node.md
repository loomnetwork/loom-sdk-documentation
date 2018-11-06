---
id: non-validator-node
title: 非验证者节点
sidebar_label: 非验证者节点
---
# 作为非验证者加入 test-z-validator1.dappchains.com

按照以下说明，作为非验证者节点加入群集 test-z-validator1.dappchains.com

## 下载 loom 稳定版

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 创建 lom. yml

```yaml
ChainID: "validator-test1"
QueryServerHost: "tcp://0.0.0.0:9999"
RPCListenAddress: "tcp://0.0.0.0:46657"
TendermintLogLevel: "debug"
LogStateDB: true
LogEthDBBatch: true
RegistryVersion: 2
ReceiptsVersion: 1
```

## 初始化loom

```bash
./loom init
```

## 替换当前目录中的 `genesis.json`

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
            "pubKey": "MMEP3Y2yWJtmAd2Cr9pwTJkEyHXLTerpbTn1QpAAFvA="
          },
          {
            "power": "10",
            "pubKey": "Cx79WED5Scn9ewT5miVx8qad19ZwuyXG9NvG0Yoag8I="
          },
          {
            "power": "10",
            "pubKey": "NqUSCd3DBIsSAR5teAwgT4ZQJ4SAPp+lXj2TqcvapK4="
          },
          {
            "power": "10",
            "pubKey": "HQH7gAGAv6UOpbXOWQrGwvctyVcFKEKgeEbULnsFhDo="
          },
          {
            "power": "10",
            "pubKey": "OAC0w9VwNRj+O/dWNwgHRGTjhzPoJ26Ga7z6R3olh7o="
          },
          {
            "power": "10",
            "pubKey": "1bkXFUlwfhubstxsnwn9EmNTr8SHtap8XtyZWolPswE="
          },
          {
            "power": "10",
            "pubKey": "JWEesnAf7bN+SfS74KhHVXqG07BTVHFs9fkl5s/OxJY="
          },
          {
            "power": "10",
            "pubKey": "Txb+JWnrHIluNg21xVG4nIQmtcX9Td+mG0PAX4gaVkc="
          }
        ]
      }
    }
  ]
}
```

## 替换 `chaindata/config/genesis.json`

```json
{
  "genesis_time": "0001-01-01T00:00:00Z",
  "chain_id": "validator-test1",
  "validators": [
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "MMEP3Y2yWJtmAd2Cr9pwTJkEyHXLTerpbTn1QpAAFvA="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "Cx79WED5Scn9ewT5miVx8qad19ZwuyXG9NvG0Yoag8I="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "NqUSCd3DBIsSAR5teAwgT4ZQJ4SAPp+lXj2TqcvapK4="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "HQH7gAGAv6UOpbXOWQrGwvctyVcFKEKgeEbULnsFhDo="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "OAC0w9VwNRj+O/dWNwgHRGTjhzPoJ26Ga7z6R3olh7o="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "1bkXFUlwfhubstxsnwn9EmNTr8SHtap8XtyZWolPswE="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "JWEesnAf7bN+SfS74KhHVXqG07BTVHFs9fkl5s/OxJY="
      }
    },
    {
      "name": "",
      "power": "10",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "Txb+JWnrHIluNg21xVG4nIQmtcX9Td+mG0PAX4gaVkc="
      }
    }
  ],
  "app_hash": ""
}
```

## 运行 loom

```bash
./loom run --persistent-peers tcp://dfdf44ae4174a73ad507e2007a3ab691bccf000d@18.223.241.239:46656,tcp://29602cb817b2d64f5ee5c4c6b71212d9c4106665@18.216.87.146:46656,tcp://e1ea2ba014c28e1972a08a353c47c73e85660cfb@18.216.78.48:46656,tcp://7e4a87c167c5b1ce44c42c00010c6689df2fe874@18.219.1.252:46656,tcp://e77bf7cfd45eafe290fed9204831cc490f7bde8e@18.188.212.83:46656,tcp://ea8fff72a2157306cb8fc7a4dba1c71b74410300@18.224.149.206:46656,tcp://d3a252302afab26e4c5458a03c43c800ffedad29@18.224.212.250:46656,tcp://cda0ec9aa3aded9a401137a4f511599c25225b9d@18.217.68.113:46656
```

现在，非验证者节点将与验证者节点同步。可以在 http://localhost:46657/status 查询状态。