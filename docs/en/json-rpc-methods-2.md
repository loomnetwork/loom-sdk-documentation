---
id: json-rpc-methods-2
title: JSON RPC Methods
sidebar_label: JSON RPC Methods
---

## Overview

Those methods are callable directly `JSON RPC` on `/eth` address. In this tutorial, we're going to talk about `JSON RPC` interface via `HTTP / WebSocket`.

> Note: The legacy documentation for JSON RPC using the LoomProvider stills available, bear in mind that the current documentation doesn't depends on LoomProvider and can be accessed directly by HTTP and WebSocket protocols more info at [Http & WebSocket JSON RPC](json-rpc-interface.html)

### Calling JSON RPC Methods

The methods below are accessible by calling the Loomchain on address `/eth`, for instance:

```bash
# Calling JSON RPC functions on Plasmachain via HTTP
https://plasma.dappchains.com/eth

# Calling JSON RPC functions on Plasmachain via WebSocket
wss://plasma.dappchains.com/eth

# Calling JSON RPC functions on localhost
http://localhost:46658/eth
```

## eth_blockNumber

---

#### Description

Returns the number of the most recent completed block.

#### Parameters

None

#### Returns

`QUANTITY` - integer of the current block number the client is on.

#### Example

```bash
# eth_blockNumber JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_blockNumber", "params": []}' https://plasma.dappchains.com/eth
```

The function would return something like this:
```json
{
  "result": "0x90ce79",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_call

---

#### Description

Executes a new message call immediately without creating a transaction on the blockchain.

#### Parameters

1.  Object - The transaction call object

- `from`: DATA, 20 Bytes - The address the transaction is sent from.
- `to`: DATA, 20 Bytes - The address the transaction is directed to.
- `data`: DATA - Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI

#### Returns

`DATA` - the return value of the executed contract.

#### Example

```bash
# eth_call JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}' https://plasma.dappchains.com/eth
```

The returned value should look something like:

```json
{
  "result": "0x",
  "jsonrpc": "2.0",
  "id":1,
}
```

## eth_getBalance

---

#### Description

Returns the balance of the account of given address.

#### Parameters

`DATA`, 20 Bytes - address to check for balance.
`QUANTITY|TAG` - the string "latest"

#### Returns

`QUANTITY` - integer of the current balance in wei.

#### Example

```bash
# eth_getBalance JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_getBalance", "params": ["0xc85972bC975a52b62bC16388FFB590E04d5C6beF","latest"]}' https://plasma.dappchains.com/eth
```

It returns something like

```json
{
  "result": "0xafe369b46d54a000",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getBlockByNumber

---

#### Description

Returns information about a block by block number.

#### Parameters

1.  `QUANTITY|TAG`:
  - an integer representing the block number, or
  -a string which can take one the following values- "earliest", "latest" or "pending", as in the default block parameter.
2.  `Boolean` - If `true`, it returns the full transaction objects. If `false`, it returns only the hashes of the transactions.

#### Returns

`Object` - A block object, or `null` when no block was found:

- `number`: QUANTITY - the block number. null when its pending block.
- `hash`: DATA, 32 Bytes - hash of the block. null when its pending block.
- `parentHash`: DATA, 32 Bytes - hash of the parent block.
- `nonce`: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
- `sha3Uncles`: DATA, 32 Bytes - SHA3 of the uncles data in the block.
- `logsBloom`: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
- `transactionsRoot`: DATA, 32 Bytes - the root of the transaction trie of the block.
- `stateRoot`: DATA, 32 Bytes - the root of the final state trie of the block.
- `receiptsRoot`: DATA, 32 Bytes - the root of the receipts trie of the block.
- `miner`: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
- `difficulty`: QUANTITY - integer of the difficulty for this block.
- `totalDifficulty`: QUANTITY - integer of the total difficulty of the chain until this block.
- `extraData`: DATA - the "extra data" field of this block.
- `size`: QUANTITY - integer the size of this block in bytes.
- `gasLimit`: QUANTITY - the maximum gas allowed in this block.
- `gasUsed`: QUANTITY - the total used gas by all transactions in this block.
- `timestamp`: QUANTITY - the unix timestamp for when the block was collated.
- `transactions`: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
- `uncles`: Array - Array of uncle hashes.

#### Example

```bash
# eth_getBlockByNumber JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x90ce79", true],"id":1}' https://plasma.dappchains.com/eth
```

This would return something like this:

```json
{
  "result": {
    "number": "0x90ce79",
    "hash": "0xc1372e5ee3fb06b686a395d727e7834f6216520859ae700b95832742248be4ba",
    "parentHash": "0x608d57081a158c5a2b15e4c5735c5e496984c57e4c3d413bb9e098741a8a30aa",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x0",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xc17518d0c299dcdfe966196b17e171237809fdb0",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x0",
    "size": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x5d489c70",
    "transactions": [],
    "uncles": []
  },
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getBlockByHash

---

#### Description

Returns information about a block by hash.

#### Parameters

1.  `DATA` - `32 Bytes` - Hash of a block.
2.  `Boolean` - If `true` it returns the full transaction objects if `false` only the hashes of the transactions.

#### Returns

`Object` - A block object, or `null` when no block was found:

- `number`: QUANTITY - the block number. null when its pending block.
- `hash`: DATA, 32 Bytes - hash of the block. null when its pending block.
- `parentHash`: DATA, 32 Bytes - hash of the parent block.
- `nonce`: DATA, 8 Bytes - hash of the generated proof-of-work. null when its pending block.
- `sha3Uncles`: DATA, 32 Bytes - SHA3 of the uncles data in the block.
- `logsBloom`: DATA, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
- `transactionsRoot`: DATA, 32 Bytes - the root of the transaction trie of the block.
- `stateRoot`: DATA, 32 Bytes - the root of the final state trie of the block.
- `receiptsRoot`: DATA, 32 Bytes - the root of the receipts trie of the block.
- `miner`: DATA, 20 Bytes - the address of the beneficiary to whom the mining rewards were given.
- `difficulty`: QUANTITY - integer of the difficulty for this block.
- `totalDifficulty`: QUANTITY - integer of the total difficulty of the chain until this block.
- `extraData`: DATA - the "extra data" field of this block.
- `size`: QUANTITY - integer the size of this block in bytes.
- `gasLimit`: QUANTITY - the maximum gas allowed in this block.
- `gasUsed`: QUANTITY - the total used gas by all transactions in this block.
- `timestamp`: QUANTITY - the unix timestamp for when the block was collated.
- `transactions`: Array - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
- `uncles`: Array - Array of uncle hashes.

#### Example

```bash
# eth_getBlockByHash JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xc1372e5ee3fb06b686a395d727e7834f6216520859ae700b95832742248be4ba", true],"id":1}' https://plasma.dappchains.com/eth
```

The function would return something like this:

```json
{
  "result": {
    "number": "0x90ce79",
    "hash": "0xc1372e5ee3fb06b686a395d727e7834f6216520859ae700b95832742248be4ba",
    "parentHash": "0x608d57081a158c5a2b15e4c5735c5e496984c57e4c3d413bb9e098741a8a30aa",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x0",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xc17518d0c299dcdfe966196b17e171237809fdb0",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x0",
    "size": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x5d489c70",
    "transactions": [],
    "uncles": []
  },
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getBlockTransactionCountByNumber

---

#### Description

Returns the number of transactions in a block matching the given block number.

#### Parameters

`QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.

#### Returns

`QUANTITY` - integer of the number of transactions in this block.

#### Example

```bash
# eth_getBlockTransactionCountByNumber JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' https://plasma.dappchains.com/eth
```

It returns something like this:

```json
{
  "result": "0x1",
  "jsonrpc": "2.0",
  "id": 1
}
```

## eth_getBlockTransactionCountByHash

---

#### Description

Returns the number of transactions in a block from a block matching the given block hash.

#### Parameters

`DATA`, 32 Bytes - hash of a block.

#### Returns

`QUANTITY` - integer of the number of transactions in this block.

#### Example

```bash
# eth_getBlockTransactionCountByHash JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xa5fbf0b8f384d1ab67708e73c50777f6cb958d916a3c83e052752abbbea8571d"],"id":1}' https://plasma.dappchains.com/eth
```

It returns something like this:

```json
{
  "result": "0x1",
  "jsonrpc": "2.0",
  "id": 1
}
```

## eth_getCode

---

#### Description

Returns the code at a given address.

#### Parameters

1.  `DATA`, `20 Bytes` - address

#### Returns

`DATA` - the code from the given address.

#### Example

```bash
# eth_getCode JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_getCode", "params": ["0xe9837e455f09300e98f5ac59d862da781da594e7"]}' https://plasma.dappchains.com/eth
```

The return value would look similar to this:

```json
{
  "result": "0x608060405234801561001057600080fd5b506004361061013...",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getFilterChanges

---

#### Description

Polling method for a filter, which returns an array of logs which occurred since the last poll.

#### Parameters

1.  `QUANTITY` - the filter id.

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

```bash
# eth_getFilterChanges JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}' https://plasma.dappchains.com/eth
```

The returned value would look like:


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

## eth_getFilterLogs

---

#### Description

Returns an array of all logs matching filter with given id.

#### Parameters

`QUANTITY` - The filter id.

#### Returns

See [eth_getFilterChanges](#eth-getfilterchanges)

#### Example

```bash
# eth_getFilterLogs JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}' https://plasma.dappchains.com/eth
```

Result see eth_getFilterChanges

## eth_getLogs

---

#### Description

Returns an array of all logs matching a given filter object.

#### Parameters

1.  `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `address`: `DATA`|Array, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: Array of `DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of `DATA` with "or" options.
- `blockhash`: `DATA`, 32 Bytes - (optional, future) With the addition of EIP-234, `blockHash` will be a new filter option which restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using `blockHash` is equivalent to fromBlock = toBlock = the block number with hash `blockHash`. If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.

#### Returns

See [eth_getFilterChanges](#eth-getfilterchanges)

#### Example

```bash
# eth_getLogs JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}' https://plasma.dappchains.com/eth
```

Result see [eth_getFilterChanges](#eth-getfilterchanges)

## eth_getTransactionReceipt

---

#### Description

Returns the receipt of a transaction by transaction hash.

> The receipt is not available for pending transactions.

#### Parameters

1.  `DATA`, 32 Bytes - hash of a transaction

#### Returns

`Object` - A transaction receipt object, or `null` when no receipt was found:

- `transactionHash`: `DATA`, 32 Bytes - hash of the transaction.
- `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block.
- `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
- `blockNumber`: `QUANTITY` - block number where this transaction was in.
- `from`: `DATA`, 20 Bytes - address of the sender.
- `to`: `DATA`, 20 Bytes - address of the receiver. `null` when it's a contract creation transaction.
- `contractAddress`: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation. Otherwise, `null`.
- `logs`: `Array` - Array of log objects generated by this transaction.
- `status`: `QUANTITY` either 1 (success) or 0 (failure)

#### Example

```bash
# eth_getTransactionReceipt JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_getTransactionReceipt", "params": ["0x6dde2dce0f08eae8ffaa85df68b5ec6e5cfcf613317ac4d95ca71729c69ae656"]}' https://plasma.dappchains.com/eth
```

It'll return something like this:

```json
{
  "result": {
    "transactionHash": "0x6dde2dce0f08eae8ffaa85df68b5ec6e5cfcf613317ac4d95ca71729c69ae656",
    "transactionIndex": "0x0",
    "blockHash": "0x849be5ff8d4e27156f11aa2007bfc7435a46ae20af4f2994fae30342b9d74734",
    "blockNumber": "0x9176a2",
    "from": "0xd21bad2b76e1f45c996ed53855f196728b102b5c",
    "cumulativeGasUsed": "0x0",
    "gasUsed": "0x0",
    "contractAddress": null,
    "to": "0xe9837e455f09300e98f5ac59d862da781da594e7",
    "logs": [],
    "logsBloom": "0x0",
    "status": "0x1"
  },
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getTransactionByBlockNumberAndIndex

---

#### Description

Returns information about a transaction by block number and transaction index position.

#### Parameters

`QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
`QUANTITY` - the transaction index position.

#### Returns

See [eth_getTransactionByHash](#eth-getblockbyhash)

#### Example

```bash
# eth_getTransactionByBlockNumberAndIndex JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x918b89", "0x0"],"id":1}' https://plasma.dappchains.com/eth
```

It returns something like

```json
{
  "result": {
    "number": "0x90ce79",
    "hash": "0xc1372e5ee3fb06b686a395d727e7834f6216520859ae700b95832742248be4ba",
    "parentHash": "0x608d57081a158c5a2b15e4c5735c5e496984c57e4c3d413bb9e098741a8a30aa",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x0",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xc17518d0c299dcdfe966196b17e171237809fdb0",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x0",
    "size": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x5d489c70",
    "transactions": [],
    "uncles": []
  },
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_getTransactionCount

---

#### Description

Returns the number of transactions sent from an address.

#### Parameters

`DATA`, 20 Bytes - address.

#### Returns

`QUANTITY` - integer of the number of transactions send from this address.

#### Example

```bash
# eth_getTransactionCount JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_getTransactionCount", "params": ["0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"]}' https://plasma.dappchains.com/eth
```

It returns something like

```json
{
  "result": "0x1",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_newBlockFilter

---

#### Description

Creates a filter, to notify when new pending transactions arrive. To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

#### Parameters

None

#### Returns

`QUANTITY` - A filter id.

#### Example

```bash
# eth_newBlockFilter JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_newBlockFilter", "params": []}' https://plasma.dappchains.com/eth
```

Return value:

```json
{
  "result": "0xcdcbd464cf4336bd350520424bc2ecf3",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_newFilter

---

#### Description

Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

##### A note on specifying topic filters:

Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in the first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in the first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

#### Parameters

1.  `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `toBlock`: `QUANTITY|TAG` - (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

#### Returns

`QUANTITY` - A filter id

#### Example

```bash
# eth_newFilter JSON RPC call
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_newFilter", "params": [{"topics":["0xb922f092a64f1a076de6f21e4d7c6400b6e55791cc935e7bb8e7e90f7652f15b"]}]}' https://plasma.dappchains.com/eth
```

 The return value should be something like:
```json
{
  "result": "0x7c7889c444a73498382bf05bb519e394",
  "jsonrpc": "2.0",
  "id": 0
}
```

## eth_sendRawTransaction

---

#### Description

Creates new message call transaction or a contract creation for signed transactions.

#### Parameters

1.  `Object` - The signed transaction data

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

#### Example

```bash
# eth_sendRawTransaction JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params": ["0xf901420485174876e8008347e7c48080b8f06060604052341561000f57600..."]}' https://plasma.dappchains.com/eth
```

The function should return something similar to:

```json
{
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
  "jsonrpc": "2.0",
  "id":1,
}
```

## eth_subscribe

---

#### Description

It works by subscribing to particular events. The node will return a subscription id. For each event that matches the subscription, a notification with relevant data is send together with the subscription id.

#### Parameters

1.  `object` with the following (optional) fields:

- `address`, either an address or an array of addresses. Only logs that are created from these addresses are returned (optional)
- `topics`, only logs which match the specified topics (optional)

#### Returns

Subscription id

#### Example

```bash
# eth_subscribe JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}' https://plasma.dappchains.com/eth
```

The return value should look something like:

```json
{
  "result":"0x4a8a4c0517381924f9838102c5a4dcb7",
  "jsonrpc":"2.0",
  "id":2
}
```

## eth_unsubscribe

---

#### Description

Subscriptions are cancelled with a regular RPC call with eth_unsubscribe as method and the subscription id as first parameter. It returns a bool indicating if the subscription was cancelled successful.

#### Parameters

- subscription id

#### Example

```bash
# eth_unsubscribe JSON RPC call
curl -X POST --data '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}' https://plasma.dappchains.com/eth
```

The return value should look something like:

```json
{
  "result":"true",
  "jsonrpc":"2.0",
  "id":2
}
```

## eth_uninstallFilter

---

#### Description

Uninstalls a filter with the given id. It should always be called when watching is no longer needed. Note that filters time out when they aren't requested with [eth_getFilterChanges](#eth-getfilterchanges) for a period of time.

#### Parameters

1.  `QUANTITY` - The filter id

#### Returns

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

#### Example

```bash
# eth_uninstallFilter JSON RPC call
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params": ["0xb"]}' https://plasma.dappchains.com/eth
```

It returns something like this:

```json
{
  "result": true,
  "jsonrpc": "2.0",
  "id": 1
  }
```



