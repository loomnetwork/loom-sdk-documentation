---
id: dapp-metrics-website-info
title: DApp Metrics Website Info
sidebar_label: DApp Metrics Website Info
---

## Purpose

This guide shows how to get useful information on the DApps running on Loom Mainnet. Thus, if you are running a DApp metrics website or just want to get more insight on the DApps running on Loom Mainnet, then carry on with this guide.

## Block Explorers

- [MainNet Block Explorer](http://plasma-blockexplorer.dappchains.com/)
- [TestNet Block Explorer](http://extdev-blockexplorer.dappchains.com)

## Overview

Loom provides support for `JSON-RPC` via `HTTP` or `WebSocket`. To interact with Loom via `HTTP` from the command line, we recommend [curl](https://github.com/curl/curl). If you would want to interact with Loom via `WebSocket`, consider using [wscat2](9https://www.npmjs.com/package/wscat2).

Compared to `HTTP`, `WebSocket` is a bi-directional, full-duplex protocol which uses a single TCP connection. With `WebSocket`, a client can subscribe and wait for contract events instead of polling for them. See the [Ethereum RPC PUB SUB] page for more details (https://github.com/ethereum/go-ethereum/wiki/RPC-PUB-SUB)

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

**HTTP Request**

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

**WebSocket Request**

```bash
echo "{ \"jsonrpc\":\"2.0\",
  \"method\":\"eth_getTransactionReceipt\",
   \"params\":[ \"0x34a641c643aab0028a94c4a3d4a4e057c08f742ef86b262d93ca7ab55c8b2d7f\" ],
   \"id\":1 }" | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
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

**HTTP Request**

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

**WebSocket Request**

```bash
echo "{ \"jsonrpc\":\"2.0\",
  \"method\":\"eth_blockNumber\",
  \"params\":[],
  \"id\":83 }" | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0x911e01",
  "jsonrpc": "2.0",
  "id": 83
}
```

### eth_call

Executes a new message call immediately without creating a transaction on the blockchain.

#### Parameters

1. Object - The transaction call object

- `from`: DATA, 20 Bytes - The address the transaction is sent from.
- `to`: DATA, 20 Bytes - The address the transaction is directed to.
- `data`: DATA - Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI

#### Returns

`DATA` - the return value of the executed contract.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"jsonrpc":"2.0",
  "method":"eth_call",
  "params":[{see above}],
  "id":1}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
"method":"eth_call",
"params":[{see above}],
"id":1}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0x",
  "jsonrpc": "2.0",
  "id":1,
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

**HTTP Request**

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

**WebSocket Request**

```bash
echo "{
  \"jsonrpc\":\"2.0\",
  \"method\":\"eth_getBlockByNumber\",
  \"params\":[
  \"latest\",
  true
  ],
  \"id\":1
}" | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
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

**HTTP Request**

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
}"
```

**WebSocket Request**

```bash
echo "{
        \"jsonrpc\":\"2.0\",
        \"method\":\"eth_getBlockByHash\",
        \"params\":[
                \"0xfbb4018172ebeb0d0163103072ed8dfbd439ffa65730e861af4602d82af40d73\",
                true
        ],
        \"id\":1
}" | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
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

**HTTP Request**

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
}"
```

**WebSocket Request**

```bash
echo "{
        \"jsonrpc\":\"2.0\",
        \"method\":\"eth_getCode\",
        \"params\":[
                \"0xc72783049049c3d887a85df8061f3141e2c931cc\",
                \"0x2\"
        ],
        \"id\":1
}" | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0x608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f6b4dfb4146044575b600080fd5b348015604f57600080fd5b5060566098565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73e288d6eec7150d6a22fde33f0aa2d81e06591c4d815600a165627a7a72305820b8b6992011e1a3286b9546ca427bf9cb05db8bd25addbee7a9894131d9db12500029",
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getBalance

Returns the balance of the account of given address.

#### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - the string "latest"

#### Headers

Content-Type: application/json

#### Returns

`QUANTITY` - integer of the current balance in wei.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"id": 0,
    "jsonrpc":"2.0",
    "method": "eth_getBalance",
    "params": ["0xc85972bC975a52b62bC16388FFB590E04d5C6beF",
    "latest"
    ]}'
```

**WebSocket Request**

```bash
echo '{"id": 0,
    "jsonrpc":"2.0",
    "method": "eth_getBalance",
    "params": ["0xc85972bC975a52b62bC16388FFB590E04d5C6beF",
    "latest"
    ]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0xa2fb63a1d437a000",
  "jsonrpc": "2.0",
  "id": 0
}
```

### eth_getBlockTransactionCountByNumber

Returns the number of transactions in a block matching the given block number.

#### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.

#### Headers

Content-Type: application/json

#### Returns

1. `QUANTITY` - integer of the number of transactions in this block.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByNumber",
    "params":["0xe8"],
    "id":1}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByNumber",
    "params":["0xe8"],
    "id":1}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0x1",
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getBlockTransactionCountByHash

Returns the number of transactions in a block matchung the given hash.

#### Parameters

1. `DATA`, 32 Bytes - hash of a block.

#### Headers

Content-Type: application/json

#### Returns

`QUANTITY` - integer of the number of transactions in this block.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data
    '{"jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xa5fbf0b8f384d1ab67708e73c50777f6cb958d916a3c83e052752abbbea8571d"],
    "id":1}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xa5fbf0b8f384d1ab67708e73c50777f6cb958d916a3c83e052752abbbea8571d"],
    "id":1}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0x1",
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getFilterChanges

Polling method for a filter. Returns an array of logs generated since the last poll.

#### Parameters

1. `QUANTITY` - the filter id.

#### Headers

Content-Type: application/json

#### Returns

`Array` - Array of log objects, or an empty array if nothing has changed since the last poll.

- For filters created with `eth_newBlockFilter`, the return values are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter`, the return values are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter`, logs are objects with following params:
    
  - `removed`: `TAG` - `true` when the log was removed due to a chain reorganization. `false` if it's a valid log.
  - `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when it's a pending log.
  - `transactionIndex`: `QUANTITY` - integer index of the transactions index position the log was created from. `null` when it's a pending log.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when it's a pending log.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. null when it's pending. `null` when it's a pending log.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. null when it's pending. `null` when it's a pending log.
  - `address`: `DATA`, 20 Bytes - address from which this log originated.
  - `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. In Solidity, the first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256), except if you declared the event with the anonymous specifier.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0",
  "method":"eth_getFilterChanges",
  "params":["0x16"],
  "id":73}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_getFilterChanges",
  "params":["0x16"],
  "id":73}'  | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs

Returns an array of all logs matching a filter with a given id.

#### Parameters

1. `QUANTITY` - The filter id.

#### Headers

Content-Type: application/json

#### Returns

See [eth_getFilterChanges](#eth-getfilterchanges).

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"jsonrpc":"2.0",
  "method":"eth_getFilterLogs",
  "params":["0x16"],
  "id":74}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_getFilterLogs",
  "params":["0x16"],
  "id":74}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

See [eth_getFilterChanges](#eth-getfilterchanges).

### eth_getLogs

Returns an array of all logs matching a given filter object.

#### Parameters

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `address`: `DATA`|Array, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: Array of `DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of `DATA` with "or" options.
- `blockhash`: `DATA`, 32 Bytes - (optional, future) With the addition of EIP-234, `blockHash` will be a new filter option which restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using `blockHash` is equivalent to fromBlock = toBlock = the block number with hash `blockHash`. If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.

#### Headers

Content-Type: application/json

#### Returns

See [eth_getFilterChanges](#eth-getfilterchanges)

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"jsonrpc":"2.0",
  "method":"eth_getLogs",
  "params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],
  "id":74}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_getLogs",
  "params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],
  "id":74}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

Result see [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position.

#### Parameters

1. `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
2. `QUANTITY` - the transaction index position.

#### Headers

Content-Type: application/json

#### Returns

See [eth_getTransactionByHash](#eth-getblockbyhash).

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"jsonrpc":"2.0",
  "method":"eth_getTransactionByBlockNumberAndIndex",
  "params":["0x918b89", "0x0"],
  "id":1}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_getTransactionByBlockNumberAndIndex",
  "params":["0x918b89", "0x0"],
  "id":1}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": {
    "hash": "0x2aa19fe52dd961a7f41849f43ffc1623f26726827694ef8a02605fa00ef2f161",
    "nonce": "0x253e0",
    "blockHash": "0xa5fbf0b8f384d1ab67708e73c50777f6cb958d916a3c83e052752abbbea8571d",
    "blockNumber": "0x918b89",
    "transactionIndex": "0x0",
    "from": "0xd21bad2b76e1f45c996ed53855f196728b102b5c",
    "to": "0xe9837e455f09300e98f5ac59d862da781da594e7",
    "value": "0x0",
    "gasPrice": "0x0",
    "gas": "0x0",
    "input": "0xdee11cb0"
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_getTransactionCount

Returns the number of transactions sent from an address.

#### Parameters

1. `DATA`, 20 Bytes - address.

#### Headers

Content-Type: application/json

#### Returns

`QUANTITY` - integer of the number of transactions send from this address.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"id": 0, "jsonrpc":"2.0",
  "method": "eth_getTransactionCount",
  "params": ["0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"]}'
```

**WebSocket Request**

```bash
echo '{"id": 0, "jsonrpc":"2.0",
  "method": "eth_getTransactionCount",
  "params": ["0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

    {
      "result": "0x1",
      "jsonrpc": "2.0",
      "id": 0
    }
    

### eth_newBlockFilter

Creates a filter. This notifies when new pending transactions arrive. To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

#### Parameters

None

#### Headers

Content-Type: application/json

#### Returns

`QUANTITY` - A filter id.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"id": 0, "jsonrpc":"2.0",
  "method": "eth_newBlockFilter",
  "params": []}'
```

**WebSocket Request**

```bash
echo '{"id": 0, "jsonrpc":"2.0",
  "method": "eth_newBlockFilter",
  "params": []}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
"result": "0xcdcbd464cf4336bd350520424bc2ecf3",
"jsonrpc": "2.0",
"id": 0
}
```

### eth_newFilter

Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

A note on specifying topic filters:

Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in the first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in the first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

#### Parameters

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

#### Returns

`QUANTITY` - A filter id

#### Headers

Content-Type: application/json

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"id": 0,
  "jsonrpc":"2.0",
  "method": "eth_newFilter",
  "params": [{"topics":["0xb922f092a64f1a076de6f21e4d7c6400b6e55791cc935e7bb8e7e90f7652f15b"]}]}'
```

**WebSocket Request**

```bash
echo '{"id": 0,
  "jsonrpc":"2.0",
  "method": "eth_newFilter",
  "params": [{"topics":["0xb922f092a64f1a076de6f21e4d7c6400b6e55791cc935e7bb8e7e90f7652f15b"]}]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": "0xcd49f4967c9eb8c92123beaa728a6f98",
  "jsonrpc": "2.0",
  "id": 0
}
```

### eth_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

#### Parameters

1. `Object` - The signed transaction data

#### Headers

Content-Type: application/json

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["0xf901420485174876e8008347e7c48080b8f06060604052341561000f57600..."]}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["0xf901420485174876e8008347e7c48080b8f06060604052341561000f57600..."]}' | wscat wss://plasma.dappchains.com/eth

```

**Result**

```json
{
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
  "jsonrpc": "2.0",
  "id":1,
}
```

### eth_subscribe

Sbscribing to particular events. The node will return a subscription id. For each event that matches the subscription, a notification with relevant data is send together with the subscription id.

#### Parameters

1. `object` with the following (optional) fields:

- `address`, either an address or an array of addresses. Only logs that are created from these addresses are returned (optional)
- `topics`, only logs which match the specified topics (optional)

#### Headers

Content-Type: application/json

#### Returns

Subscription id

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd","topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd","topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result":"0x4a8a4c0517381924f9838102c5a4dcb7",
  "jsonrpc":"2.0",
  "id":2
}
```

### eth_unsubscribe

Subscriptions are cancelled with a regular RPC call with eth_unsubscribe as method and the subscription id as first parameter. It returns a bool indicating if the subscription was cancelled successful.

#### Parameters

1. Subscription id

#### Headers

Content-Type: application/json

#### Returns

`Boolean`

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data  '{"id": 1,
  "method": "eth_unsubscribe",
  "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**WebSocket Request**

```bash
echo '{"id": 1,
  "method": "eth_unsubscribe",
  "params": ["0x9cef478923ff08bf67fde6c64013158d"]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": true,
  "jsonrpc": "2.0",
  "id": 1
}
```

### eth_uninstallFilter

Uninstalls a filter with the given id. It should always be called when watching is no longer needed. Note that filters time out when they are not requested with [eth_getFilterChanges](#eth-getfilterchanges) for a period of time.

#### Parameters

1. `QUANTITY` - The filter id

#### Headers

Content-Type: application/json

#### Returns

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

#### Example

**HTTP Request**

```bash
curl --location --request POST "https://plasma-alpha.dappchains.com/eth" \
  --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["0xb"]}'
```

**WebSocket Request**

```bash
echo '{"jsonrpc":"2.0",
  "method":"eth_sendRawTransaction",
  "params": ["0xb"]}' | wscat wss://plasma.dappchains.com/eth
```

**Result**

```json
{
  "result": true,
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