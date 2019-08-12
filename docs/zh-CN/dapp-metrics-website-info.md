---
id: dapp-metrics-website-info
title: DApp Metrics Website Info
sidebar_label: DApp Metrics Website Info
---

# DApp Metrics Website Info

## Purpose

This guide shows how to get useful information on the DApps running on Loom Mainnet. Thus, if you are running a DApp metrics website or just want to get more insight on the DApps running on Loom Mainnet, then carry on with this guide.

## Block Explorers

- [MainNet Block Explorer](http://plasma-blockexplorer.dappchains.com/)
- [TestNet Block Explorer](http://extdev-blockexplorer.dappchains.com)

## Web3 Endpoints

You can use the following endpoints to interact with Loom:

- PlasmaChain: http://plasma.dappchains.com/eth
- GameChain: http://gamechain.dappchains.com/eth

## JSON RPC Interface

Loom is EVM compatible and provides support for several important JSON RPC calls. This section will give you a brief overview of some JSON RPC calls you can use.

### eth_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

#### Parameters

1. DATA, 32 Bytes - hash of the transaction

#### Headers

Content-Type: application/json

#### Returns

- Object - A transaction receipt object, or null when no receipt was found:

  - transactionHash : DATA, 32 Bytes - hash of the transaction.
  - transactionIndex: QUANTITY - integer of the transaction's index position in the block.
  - blockHash: DATA, 32 Bytes - hash of the block where this transaction was in.
  - blockNumber: QUANTITY - block number where this transaction was in.
  - from: DATA, 20 Bytes - address of the sender.
  - to: DATA, 20 Bytes - address of the receiver. null when it's a contract creation transaction.
  - cumulativeGasUsed : QUANTITY - The total amount of gas used when this transaction was executed in the block.
  - gasUsed : QUANTITY - The amount of gas used by this specific transaction alone.
  - contractAddress : DATA, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null.
  - logs: Array - Array of log objects, which this transaction generated.
  - logsBloom: DATA, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.

#### Example

**Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data "{
	\"jsonrpc\":\"2.0\",
	\"method\":\"eth_getTransactionReceipt\",
	\"params\":[
		\"0x34a641c643aab0028a94c4a3d4a4e057c08f742ef86b262d93ca7ab55c8b2d7f\"
	],
	\"id\":1
}"
```

**Result**

```bash
{
  "result": {
    "transactionHash": "0x34a641c643aab0028a94c4a3d4a4e057c08f742ef86b262d93ca7ab55c8b2d7f",
    "transactionIndex": "0x0",
    "blockHash": "0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73",
    "blockNumber": "0x912015",
    "from": "0xd21bad2b76e1f45c996ed53855f196728b102b5c",
    "cumulativeGasUsed": "0x0",
    "gasUsed": "0x0",
    "contractAddress": null,
    "to": "0xe9837e455f09300e98f5ac59d862da781da594e7",
    "logs": [
      {
        "logIndex": "0x0",
        "transactionIndex": "0x0",
        "transactionHash": "0x34a641c643aab0028a94c4a3d4a4e057c08f742ef86b262d93ca7ab55c8b2d7f",
        "blockHash": "0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73",
        "blockNumber": "0x912015",
        "address": "0xe9837e455f09300e98f5ac59d862da781da594e7",
        "data": "0x000000000000000000000000000000000000000000000000000000005d491b84",
        "topics": [
          "0x3fe7bd72b9631bc1de227207f7f09fbe45c1aa501170bad6c74a4e7de67cca2c",
          "0x000000000000000000000000000000000000000000000000000000000000b8a0"
        ]
      }
    ],
    "logsBloom": "0x409400890050102205",
    "status": "0x1"
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_blockNumber

Returns the number of most recent block.

#### Parameters

none

#### Headers

Content-Type: application/json

#### Returns

QUANTITY - integer of the current block number the client is on.

#### Example

**Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data "{
	\"jsonrpc\":\"2.0\",
	\"method\":\"eth_blockNumber\",
	\"params\":[],
	\"id\":83
}"
```

**Result**

```bash
{
  "result": "0x911e01",
  "jsonrpc": "2.0",
  "id": 83
}
```

### eth_getBlockByNumber

Returns information about a block by block number.

#### Parameters

1. QUANTITY|TAG - integer of a block number, or the string "earliest", "latest" or "pending".

2. Boolean - If true it returns the full transaction objects, if false only the hashes of the transactions.

#### Headers

Content-Type: application/json

#### Returns

- Object - A block object, or null when no block was found:

  - number: QUANTITY - the block number. null when its pending block.
  - hash: DATA, 32 Bytes - hash of the block. null when its pending block.
  - parentHash: DATA, 32 Bytes - hash of the parent block.
  - nonce: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
  - sha3Uncles: DATA, 32 Bytes - SHA3 of the uncles data in the block.
  - logsBloom: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
  - transactionsRoot: DATA, 32 Bytes - the root of the transaction trie of the block.
  - stateRoot: DATA, 32 Bytes - the root of the final state trie of the block.
  - receiptsRoot: DATA, 32 Bytes - the root of the receipts trie of the block.
  - miner: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
  - difficulty: QUANTITY - integer of the difficulty for this block.
  - totalDifficulty: QUANTITY - integer of the total difficulty of the chain until this block.
  - extraData: DATA - the "extra data" field of this block.
  - size: QUANTITY - integer the size of this block in bytes.
  - gasLimit: QUANTITY - the maximum gas allowed in this block.
  - gasUsed: QUANTITY - the total used gas by all transactions in this block.
  - timestamp: QUANTITY - the unix timestamp for when the block was collated.
  - transactions: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
  - uncles: Array - Array of uncle hashes.

#### Example

**Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data "{
	\"jsonrpc\":\"2.0\",
	\"method\":\"eth_getBlockByNumber\",
	\"params\":[
		\"latest\",
		true
	],
	\"id\":1
}"
```

**Result**

```bash
{
  "result": {
    "number": "0x9121d9",
    "hash": "0xb54064a4da2c853122b3c492d67015a535a050a9bb54d59c0ac239a6aa8e7e99",
    "parentHash": "0x63b0e520044f6c3851ea2f80767eb92e4ec905646aea107b071486f470bcae89",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x0",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x1927e984661b0a2cd7cc28cd417ea61eafc6cac8",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x0",
    "size": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x5d491e38",
    "transactions": [],
    "uncles": []
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getBlockByHash

Returns information about a block by hash.

#### Parameters

1. DATA, 32 Bytes - Hash of a block.

2. Boolean - If true it returns the full transaction objects, if false only the hashes of the transactions.

#### Headers

Content-Type: application/json

#### Returns

- Object - A block object, or null when no block was found:

  - number: QUANTITY - the block number. null when its pending block.
  - hash: DATA, 32 Bytes - hash of the block. null when its pending block.
  - parentHash: DATA, 32 Bytes - hash of the parent block.
  - nonce: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
  - sha3Uncles: DATA, 32 Bytes - SHA3 of the uncles data in the block.
  - logsBloom: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
  - transactionsRoot: DATA, 32 Bytes - the root of the transaction trie of the block.
  - stateRoot: DATA, 32 Bytes - the root of the final state trie of the block.
  - receiptsRoot: DATA, 32 Bytes - the root of the receipts trie of the block.
  - miner: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
  - difficulty: QUANTITY - integer of the difficulty for this block.
  - totalDifficulty: QUANTITY - integer of the total difficulty of the chain until this block.
  - extraData: DATA - the "extra data" field of this block.
  - size: QUANTITY - integer the size of this block in bytes.
  - gasLimit: QUANTITY - the maximum gas allowed in this block.
  - gasUsed: QUANTITY - the total used gas by all transactions in this block.
  - timestamp: QUANTITY - the unix timestamp for when the block was collated.
  - transactions: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
  - uncles: Array - Array of uncle hashes.

#### Example

**Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data "{
        \"jsonrpc\":\"2.0\",
        \"method\":\"eth_getBlockByHash\",
        \"params\":[
                \"0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73\",
                true
        ],
        \"id\":1
}
```

**Result**

```bash
{
  "result": {
    "number": "0x912015",
    "hash": "0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73",
    "parentHash": "0x55e68e8c7ba6d797cc212ab518d12a102ce6424ac09d94beade7b56f003ea9a3",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x409400890050102205",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xc81ab0af2886532cb868e5b0f4f196360663a5e4",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x0",
    "size": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x5d491b84",
    "transactions": [
      {
        "hash": "0x34a641c643aab0028a94c4a3d4a4e057c08f742ef86b262d93ca7ab55c8b2d7f",
        "nonce": "0x22204",
        "blockHash": "0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73",
        "blockNumber": "0x912015",
        "transactionIndex": "0x0",
        "from": "0xd21bad2b76e1f45c996ed53855f196728b102b5c",
        "to": "0xe9837e455f09300e98f5ac59d862da781da594e7",
        "value": "0x0",
        "gasPrice": "0x0",
        "gas": "0x0",
        "input": "0xdee11cb0"
      }
    ],
    "uncles": []
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getCode

Returns code at a given address.

#### Parameters

1. DATA, 20 Bytes - address.
2. QUANTITY|TAG - integer block number, or the string "latest", "earliest" or "pending".

#### Headers

Content-Type: application/json

#### Returns

DATA - the code from the given address.

#### Example

**Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data "{
        \"jsonrpc\":\"2.0\",
        \"method\":\"eth_getCode\",
        \"params\":[
                \"0xc72783049049c3d887a85df8061f3141e2c931cc\",
                \"0x2\"
        ],
        \"id\":1
}
```

**Result**

```bash
{
  "result": "0x608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f6b4dfb4146044575b600080fd5b348015604f57600080fd5b5060566098565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73e288d6eec7150d6a22fde33f0aa2d81e06591c4d815600a165627a7a72305820b8b6992011e1a3286b9546ca427bf9cb05db8bd25addbee7a9894131d9db12500029",
  "jsonrpc": "2.0",
  "id": 1
}
```

## Busy Contracts

### Plasma DPoS Staking

- Smart Contract #1: 0xc72783049049c3d887a85df8061f3141e2c931cc

### Relentless

- Smart Contract #1: 0xE288D6EeC7150d6A22fDe33f0Aa2D81E06591c4d

### Loom Marketplace

- Smart Contract #1: 0xbd54b4b26ac8e4bd202b70f3fbad6b3d5a885eec
- Smart Contract #2: 0x95273cded5f217e391cbf48d2528d171cb1b92b0
- Smart Contract #3: 0xcf2851b1ad63d093238ea296524be8d7cd920e0b

### Axie Infinity

- Smart Contract #1: 0xd839bdf39fb13adc57f4a3cbacba1d8b15429b46
- Land: 0xe228f42ccabe5f38c492b50906ae03d950546a3f
- ItemCollection: 0x485c9f05ac8c3c957ca43518ec346ebff6d47b84
- ChestUnboxer: 0x6491fefedb00c59d36c2f30a65325bbd1046cece

### CryptoRaves

- Smart Contract #1: 0x28694c32059a9538680A622A2764D7cbb0E01F93

### CryptoWars

- Smart Contract #1: 0xa85a641B4ef793d0A3650bf6997b2571aDB2840e
- Smart Contract #2: 0x9160f5cc9B5fDd7798152078259aaFB536957508
- Smart Contract #3: 0xB22Da027c475c9493b931115204fC8C71B82F11d


### Sorare

- Smart Contract #1: 0xb3BEE074E86982dB1F1186FC010B61608fC8c0Dc
- Smart Contract #2: 0xa378EF33461CB8D33C921DF59655355dC7eD0cd9

### Alice Finance

- Smart Contract #1: 0x1Fe7A4F1F8b8528c4cf55990f78cB38d203ADE73
