---
id: json-rpc-methods
title: JSON RPC 메소드
sidebar_label: JSON RPC 메소드
---
## 개요

[Web3.js](https://github.com/ethereum/web3.js)와 호환되기 위해서 LoomProvider는 [이더리움 JSON RPC 메소드](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-api)와 완벽히 호환되는 몇 개의 메소드를 추가했습니다, 이 메소드들은 Loom `QueryService`나 `LoomProvider`에 의해서 직접 호출될 수 있습니다, 이번 튜토리얼에서 우리는 `LoomProvider`에 대해서 얘기할 것입니다

### JSON RPC 메서드를 호출 하는 LoomProvider

프로바이더는 클라이언트와 Loom DAppChain 사이의 다리역할이 되어야 합니다, 아래 코드는 `LoomProvider` 가 인스턴스화되어 `eth_accounts`로 계정을 얻기 위해서 `JSON RPC`를 호출하는 예제입니다

```javascript
const privateKey = CryptoUtils.generatePrivateKey();
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

// 클라이언트 생성
const client = new Client(
  "default",
  "ws://127.0.0.1:46658/websocket",
  "ws://127.0.0.1:46658/queryws"
);

// 함수 호출자의 주소
const from = LocalAddress.fromPublicKey(publicKey).toString();

// loom provider 인스턴스화
const loomProvider = new LoomProvider(client, privateKey);

// eth_accounts JSON RPC 호출
const jsonRPCString = '{"id": 1,"jsonrpc": "2.0", "method": "eth_accounts", "params": []}'

// 보내기전에 JSON 파싱은 필수적인 과정
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// 반환값은 다음과 같음
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
// }
```

## eth_accounts

* * *

#### 설명

LoomProvider가 소유하고 있는 주소의 리스트를 반환한다

#### 파라미터

없음

#### 반환값

`데이터 배열`, 20 Bytes - 클라이언트가 소유하고 있는 주소.

#### 예제

```Javascript
// eth_accounts JSON RPC call
const jsonRPCString = '{"id": 1,"jsonrpc": "2.0", "method": "eth_accounts", "params": []}'

// 보내기전에 JSON 파싱은 필수적인 과정
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// 반환값은 다음과 같음
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
// }
```

## eth_blockNumber

* * *

#### 설명

가장 최근에 완성된 블록 번호를 반환합니다.

#### 파라미터

없음

#### 반환값

`수량` - 현재 클라이언트에 올라간 현재 블록 번호의 정수값.

#### 예제

```Javascript
// eth_blockNumber JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'

// 보내기전에 JSON 파싱은 필수적인 과정
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// 반환값은 다음과 같음
// {
//   "id":83,
//   "jsonrpc": "2.0",
//   "result": "0x4b7" // 1207
// }
```

## eth_call

* * *

#### 설명

블록체인에 트랜잭션 생성없이 즉시 새로운 메시지를 실행합니다.

#### 파라미터

1. 객체 - 트랜잭션 호출 객체

- from: 데이터, 20 Bytes - 트랜잭션을 보내는 주소.
- to: 데이터, 20 Bytes - 트랜잭션이 전달되는 주소.
- data: 데이터 - 메소드 인증 해쉬 및 인코딩된 파라미터. 더 자세한 내용은 이더리움 컨트랙트 ABI를 보세요

#### 반환값

`데이터` - 실행된 컨트랙트의 반환값.

#### 예제

```Javascript
// eth_call JSON RPC call
const jsonRPCString = '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'

// 보내기전에 JSON 파싱은 필수적인 과정
await loomProvider.sendAsync(JSON.parse(jsonRPCString))

// 반환값은 다음과 같음
// {
//   "id":1,
//   "jsonrpc": "2.0",
//   "result": "0x"
// }
```

## eth_getBlockByNumber

* * *

#### 설명

블록 번호에 해당하는 블록정보를 반환합니다.

#### 파라미터

1. `숫자|태그` -기본 블록 파라미터로 지정될 블록번호의 숫자값 혹은 문자열 "earliest", "latest", "pending".
2. `Boolean` - true면 전체 트랜잭션 객체를 반환하고, false면 트랜잭션 해쉬값 만을 반환한다.

#### 반환값

`객체` - 블록객체, 또는 블록을 못찾을 경우 `null`:

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

* * *

#### Description

Returns information about a block by hash.

#### Parameters

1. `DATA` - `32 Bytes` - Hash of a block.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

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

* * *

#### Description

Returns code at a given address.

#### Parameters

1. `DATA`, `20 Bytes` - address

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

* * *

#### Description

Polling method for a filter, which returns an array of logs which occurred since last poll.

#### Parameters

1. `QUANTITY` - the filter id.

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

* * *

#### Description

Returns an array of all logs matching a given filter object.

#### Parameters

1. `Object` - The filter options:

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

* * *

#### Description

Returns the receipt of a transaction by transaction hash.

**Note** That the receipt is not available for pending transactions.

#### Parameters

1. `DATA`, 32 Bytes - hash of a transaction

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

* * *

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

* * *

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

1. `Object` - The filter options:

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

* * *

#### Description

Creates new message call transaction or a contract creation, if the data field contains code.

#### Parameters

1. `Object` - The transaction object

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

* * *

#### Description

It works by subscribing to particular events. The node will return a subscription id. For each event that matches the subscription a notification with relevant data is send together with the subscription id.

#### Parameters

1. `object` with the following (optional) fields

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

* * *

#### Description

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additonally Filters timeout when they aren't requested with [eth_getFilterChanges](#eth-getfilterchanges) for a period of time.

#### Parameters

1. `QUANTITY` - The filter id

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

* * *

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