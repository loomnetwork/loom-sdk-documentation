---
id: json-rpc-interface
title: HTTP & WebSocket
sidebar_label: HTTP & WebSocket
---

## Overview

Loomchain now supports the `JSON-RPC` communication via protocols  `HTTP` or `WebSocket`, for those who already used `LoomProvider` might not know but the communication protocol between Loomchain and [loom-js](https://github.com/loomnetwork/loom-js) uses the `GPRC protocol`, however looking for more compatibility and usability we're adding the `JSON-RPC` layer which is similar to the same used on Ethereum nodes with the same methods, off course Loomchain don't have all the same methods since the internals are in some way different.

## JSON RPC

As the official [JSON-RPC](https://www.jsonrpc.org/specification) specification states: `JSON-RPC` is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments.

## HTTP Requests

In order to send `HTTP` requests using the `JSON RPC` to the node we have to specify the path correctly which is `/eth` and every Loomchain node should have the path available for instance `http://localhost:46658/eth` to call methods on localhost or `https://plasma.dappchains.com/eth` to call methods on Plasmachain.

Let's say we want to retrieve the current block on Plasmachain

```bash
curl -X POST --data '{"id": 0, "jsonrpc":"2.0", "method": "eth_blockNumber", "params": []}' https://plasma.dappchains.com/eth
```

Which should return something like

```json
{
  "result": "0x90c10e",
  "jsonrpc": "2.0",
  "id": 0
}
```

## WebSocket Requests

Sending `WebSocket` requests are easy also we can use the same url but now this time we're going to put the `WebSocket` protocol specification on the front of the address like `ws://localhost:46558/eth` to call methods on localhost or `wss://plasma.dappchains.com/eth` to call methods on Plasmachain.

> Note: on this example we're going to use the tool wscat2 which can be downloaded at [npm](https://www.npmjs.com/package/wscat2)

The same example as above to retrieve the current block number on Plasmachain

```bash
echo '{"id": 0, "jsonrpc":"2.0", "method": "eth_blockNumber", "params": []}' | wscat wss://plasma.dappchains.com/eth
```

Which should return something like

```json
{
  "result": "0x90c78e",
  "jsonrpc": "2.0",
  "id": 0
}
```

The main advantage of the `WebSocket` protocol is to access on the real time `PUB-SUB` support, which allows us get the information on each block created or to subscribe for some contract event.

For the available methods check [JSON RPC Methods](json-rpc-methods-2.html)