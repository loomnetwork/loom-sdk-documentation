---
id: loomevents
title: 이벤트 구독하기
sidebar_label: 이벤트 구독하기
---
## 이벤트 내보내기

이벤트는 스마트 컨트랙트와 [go plugins](./goloomevents)에서 내보낸다. 이런 이벤트는 두가지 방법으로 구독할 수 있다.

### 이벤트 구조

The event JSON shown above is wrapped in some transaction specific metadata before being emitted to the event stream. The other fields in the metadata include Called address, the contract address, the contract name and the raw transaction request data.

아래는 redis로 들어오는 전체 메시지 예제이다 -

```json
{
  "caller": {
    "ChainID": "default",
    "Local": "2DiOmpX+kSRZK0jxEgxdGuPC0eo="
  },
  "address": {
    "ChainID": "default",
    "Local": "4ojW7scVDWoi/eM/CqLYHgZZHE0="
  },
  "plugin": "etherboycore:0.0.1",
  "blockHeight": 65,
  "encodedData": "eyJPd25lciI6ImdvZGJvbGUxIiwiTWV0aG9kIjoic2F2ZXN0YXRlIiwiQWRkciI6IjJEaU9tcFgra1NSWkswanhFZ3hkR3VQQzBlbz0iLCJWYWx1ZSI6MTAxMH0=",
  "rawRequest": "CglTYXZlU3RhdGUSGhIIZ29kYm9sZTEaDnsiVmFsdWUiOjEwMTB9"
}
```

`rawRequest`와 `encodedData`는 base64 표준으로 인코딩되어 있다.

## Subscribing via Redis

By default the loom-sdk will only emit events to the log. To configure it to send it to a redis sorted set, add the following line to the loom.yaml config file.

    EventDispatcherURI: "redis://localhost:6379"
    

This will start emitting events to the redis server in a sorted set called `loomevents`. Each event is added to the sorted set with the score being the blockchain height.

## Subscribing via websockets

The Loom SDK query endpoint can be used to subscribe to the event stream as well. Here is sample subscription code using a command line and the [wscat](https://www.npmjs.com/package/wscat2) nodejs cli.

    $ cat command.json
    {
        "method": "subevents",
        "jsonrpc": "2.0",
        "params": [],
        "id": "dontcare"
    }
    
    $ wscat -k ws://localhost:46658/queryws < command.json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "result": {}
    }{
      "jsonrpc": "2.0",
      "id": "0",
      "result": {
        "caller": {
          "ChainID": "default",
          "Local": "2DiOmpX+kSRZK0jxEgxdGuPC0eo="
        },
        "address": {
          "ChainID": "default",
          "Local": "4ojW7scVDWoi/eM/CqLYHgZZHE0="
        },
        "plugin": "etherboycore:0.0.1",
        "blockHeight": 65,
        "encodedData": "eyJPd25lciI6ImdvZGJvbGUxIiwiTWV0aG9kIjoic2F2ZXN0YXRlIiwiQWRkciI6IjJEaU9tcFgra1NSWkswanhFZ3hkR3VQQzBlbz0iLCJWYWx1ZSI6MTAxMH0=",
        "rawRequest": "CglTYXZlU3RhdGUSGhIIZ29kYm9sZTEaDnsiVmFsdWUiOjEwMTB9"
      }
    }
    

The first json in the cli ouptut is the response of the subscribe command. The following json is an event from a contract processing a transaction.

### Example go code

You can refer to [a demo indexer](https://github.com/loomnetwork/etherboy-core/blob/master/tools/cli/indexer/etherboyindexer.go) which uses the redis and websocket event subscriptions to read the events and persist to elasticsearch. (Note that this code is meant only for demonstration purposes).