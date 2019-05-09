---
id: json-rpc-methods
title: JSON RPC Methods
sidebar_label: JSON RPC Methods
---

## Overview

In order to be compatible with [Web3.js](https://github.com/ethereum/web3.js) LoomProvider added some methods that are quite compatible with [Ethereum JSON RPC Methods](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-api), those methods are callable directly by the Loom `QueryService` or by `LoomProvider`, on this tutorial we're going to talk about `LoomProvider`

### LoomProvider calling JSON RPC Methods

The provider should be the bridge between client and the Loom DAppChain, the code below is an example of `LoomProvider` been instantiated and calling the `JSON RPC` to get accounts with `eth_accounts`

```javascript
const privateKey = CryptoUtils.generatePrivateKey();
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

// Create the client
const client = new Client(
  "default",
  "ws://127.0.0.1:46658/websocket",
  "ws://127.0.0.1:46658/queryws"
);

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString();

// Instantiate loom provider
const loomProvider = new LoomProvider(client, privateKey);

// eth_accounts JSON RPC call
const jsonRPCString = '{"id": 1,"jsonrpc": "2.0", "method": "eth_accounts", "params": []}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
// }
```

## eth_accounts

---

#### Description

Returns a list of addresses owned by the LoomProvider

#### Parameters

None

#### Returns

`Array of DATA`, 20 Bytes - addresses owned by the client.

#### Example

```Javascript
// eth_accounts JSON RPC call
const jsonRPCString = '{"id": 1,"jsonrpc": "2.0", "method": "eth_accounts", "params": []}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
// }
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

```Javascript
// eth_blockNumber JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":83,
//   "jsonrpc": "2.0",
//   "result": "0x4b7" // 1207
// }
```

## eth_call

---

#### Description

Executes a new message call immediately without creating a transaction on the block chain.

#### Parameters

1.  Object - The transaction call object

- from: DATA, 20 Bytes - The address the transaction is sent from.
- to: DATA, 20 Bytes - The address the transaction is directed to.
- data: DATA - Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI

#### Returns

`DATA` - the return value of the executed contract.

#### Example

```Javascript
// eth_call JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": "0x"
// }
```

## eth_getBlockByNumber

---

#### Description

Returns information about a block by block number.

#### Parameters

1.  `QUANTITY|TAG` - integer of a block number, or the string "earliest", "latest" or "pending", as in the default block parameter.
2.  `Boolean` - If true it returns the full transaction objects, if false only the hashes of the transactions.

#### Returns

`Object` - A block object, or `null` when no block was found:

- `number`: `QUANTITY` - the block number. null when its pending block.
- `hash`: `DATA`, 32 Bytes - hash of the block. null when its pending block.
- `parentHash`: DATA`, 32 Bytes - hash of the parent block.
- `logsBloom`: `DATA`, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
- `timestamp`: `QUANTITY` - the unix timestamp for when the block was collated.
- `transactions`: `Array` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.

#### Example

```Javascript
// eth_getBlockByNumber JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
// "id":1,
// "jsonrpc":"2.0",
// "result": {
//     "number": "0x1b4", // 436
//     "hash": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
//     "parentHash": "0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dde5eb5",
//     "logsBloom": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
//     "timestamp": "0x54e34e8e" // 1424182926
//     "transactions": [{...},{ ... }]
//   }
// }
```

## eth_getBlockByHash

---

#### Description

Returns information about a block by hash.

#### Parameters

1.  `DATA` - `32 Bytes` - Hash of a block.
2.  `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

#### Returns

`Object` - A block object, or `null` when no block was found:

- `number`: `QUANTITY` - the block number. null when its pending block.
- `hash`: `DATA`, 32 Bytes - hash of the block. null when its pending block.
- `parentHash`: `DATA`, 32 Bytes - hash of the parent block.
- `logsBloom`: `DATA`, 256 Bytes - the bloom filter for the logs of the block. null when its pending block.
- `timestamp`: `QUANTITY` - the unix timestamp for when the block was collated.
- `transactions`: `Array` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.

#### Example

```Javascript
// eth_getBlockByHash JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
// "id":1,
// "jsonrpc":"2.0",
// "result": {
//     "number": "0x1b4", // 436
//     "hash": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
//     "parentHash": "0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dde5eb5",
//     "logsBloom": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
//     "timestamp": "0x54e34e8e" // 1424182926
//     "transactions": [{...},{ ... }]
//   }
// }
```

## eth_getCode

---

#### Description

Returns code at a given address.

#### Parameters

1.  `DATA`, `20 Bytes` - address

#### Returns

`DATA` - the code from the given address.

#### Example

```Javascript
// eth_getCode JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
// }
```

## eth_getFilterChanges

---

#### Description

Polling method for a filter, which returns an array of logs which occurred since last poll.

#### Parameters

1.  `QUANTITY` - the filter id.

#### Returns

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter` the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter` logs are objects with following params:

  - `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  - `logIndex`: `QUANTITY` - integer of the log index position in the block. null when its pending log.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. null when its pending log.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. null when its pending log.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. null when its pending. null when its pending log.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. null when its pending. null when its pending log.
  - `address`: `DATA`, 20 Bytes - address from which this log originated.
  - `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except you declared the event with the anonymous specifier.)

#### Example

```Javascript
// eth_getFilterChanges JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc":"2.0",
//   "result": [{
//     "logIndex": "0x1", // 1
//     "blockNumber":"0x1b4", // 436
//     "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
//     "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
//     "transactionIndex": "0x0", // 0
//     "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
//     "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
//     "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
//     },{
//       ...
//     }]
// }
```

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
- `blockhash`: `DATA`, 32 Bytes - (optional, future) With the addition of EIP-234, blockHash will be a new filter option which restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed.

#### Returns

See [eth_getFilterChanges](#eth-getfilterchanges)

#### Example

```Javascript
// eth_getFilterChanges JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))
```

Result see [eth_getFilterChanges](#eth-getfilterchanges)

## eth_getTransactionReceipt

---

#### Description

Returns the receipt of a transaction by transaction hash.

**Note** That the receipt is not available for pending transactions.

#### Parameters

1.  `DATA`, 32 Bytes - hash of a transaction

#### Returns

`Object` - A transaction receipt object, or `null` when no receipt was found:

- `transactionHash`: `DATA`, 32 Bytes - hash of the transaction.
- `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block.
- `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
- `blockNumber`: `QUANTITY` - block number where this transaction was in.
- `from`: `DATA`, 20 Bytes - address of the sender.
- `to`: `DATA`, 20 Bytes - address of the receiver. null when its a contract creation transaction.
- `contractAddress`: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise null.
- `logs`: `Array` - Array of log objects, which this transaction generated.
- `status`: `QUANTITY` either 1 (success) or 0 (failure)

#### Example

```Javascript
// eth_getTransactionReceipt JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
// "id":1,
// "jsonrpc":"2.0",
// "result": {
//      transactionHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
//      transactionIndex:  '0x1', // 1
//      blockNumber: '0xb', // 11
//      blockHash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
//      contractAddress: '0xb60e8dd61c5d32be8058bb8eb970870f07233155', // or null, if none was created
//      logs: [{
//          // logs as returned by getFilterLogs, etc.
//      }, ...],
//      status: '0x1'
//   }
// }
```

## eth_newBlockFilter

---

#### Description

Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

#### Parameters

None

#### Returns

`QUANTITY` - A filter id.

#### Example

```Javascript
// eth_newBlockFilter JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc":  "2.0",
//   "result": "0x1" // 1
// }
```

## eth_newFilter

---

#### Description

Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call [eth_getFilterChanges](#eth-getfilterchanges).

##### A note on specifying topic filters:

Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in first position AND B in second position (and anything after)"
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

```Javascript
// eth_newFilter JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": "0x1" // 1
// }
```

## eth_sendTransaction

---

#### Description

Creates new message call transaction or a contract creation, if the data field contains code.

#### Parameters

1.  `Object` - The transaction object

- `from`: `DATA`, 20 Bytes - The address the transaction is send from.
- `to`: `DATA`, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.
- `data`: `DATA` - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see Ethereum Contract ABI

#### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [eth_getTransactionReceipt](#eth-gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

#### Example

```Javascript
// eth_sendTransaction JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
// }
```

## eth_subscribe

---

#### Description

It works by subscribing to particular events. The node will return a subscription id. For each event that matches the subscription a notification with relevant data is send together with the subscription id.

#### Parameters

1.  `object` with the following (optional) fields

- `address`, either an address or an array of addresses. Only logs that are created from these addresses are returned (optional)
- `topics`, only logs which match the specified topics (optional)

#### Returns

Subscription id

#### Example

```Javascript
// eth_subscribe JSON RPC call
const jsonRPCString = '{"id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd", "topics": ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "jsonrpc":"2.0",
//   "id":2,
//   "result":"0x4a8a4c0517381924f9838102c5a4dcb7"
// }
```

## eth_uninstallFilter

---

#### Description

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additonally Filters timeout when they aren't requested with [eth_getFilterChanges](#eth-getfilterchanges) for a period of time.

#### Parameters

1.  `QUANTITY` - The filter id

#### Returns

`Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

#### Example

```Javascript
// eth_uninstallFilter JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": true
// }
```

## net_version

---

#### Description

Returns the current network id.

#### Parameters

None

#### Returns

`String` - The current network id.

- "474747": Currently there's now network id defined, the number returned is simply `474747`

#### Example

```Javascript
// net_version JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'

// Parse JSON is a necessary step before send
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// Return should be something like
// {
//   "id":67,
//   "jsonrpc": "2.0",
//   "result": "474747"
// }
```
