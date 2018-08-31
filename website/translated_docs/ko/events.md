---
id: loomevents
title: 이벤트 구독하기
sidebar_label: 이벤트 구독하기
---
## 이벤트 내보내기

이벤트는 스마트 컨트랙트와 [go plugins](./goloomevents)에서 내보낸다. 이런 이벤트는 두가지 방법으로 구독할 수 있다.

### 이벤트 구조

아래 보여지는 이벤트 JSON은 이벤트 스트림으로 보내지기 전에 약간의 트랜잭션 특화된 메타데이터로 감싸진다. 메타데이터의 다른 필드들은 Caller 주소, 컨트랙트 주소, 컨트랙트 이름과 raw 트랜잭션 request data를 포함한다.

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

## Redis를 통해서 구독하기

기본적으로 loom-sdk 은 이벤트를 로그로 내보냅니다. Redis sorted set에 내보내는 것으로 설정하려면, loom.yaml 파일에 아래 라인을 추가하세요.

    EventDispatcherURI: "redis://localhost:6379"
    

이것은 redis server의 `loomevents`이라 불리는 sorted set에 이벤트 내보내기를 시작합니다. 각 이벤트는 블록체인 height 가 되는 스코어와 함께 sorted set에 추가됩니다.

## Websocket을 통해서 구독하기

Loom SDK query endpoint는 이벤트 스트림을 구독하는데에도 사용될 수 있다. 여기 커맨드 라인과 [wscat](https://www.npmjs.com/package/wscat2) nodejs cli을 이용한 구독하기 코드 예제가 있습니다.

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
    

Cli 출력의 첫번째 json은 subscribe 커맨드에 대한 응답입니다. 다음 json은 트랜잭션을 처리하는 컨트랙트로부터의 이벤트입니다.

### Go 코드 예제

[Demo indexer](https://github.com/loomnetwork/etherboy-core/blob/master/tools/cli/indexer/etherboyindexer.go)를 참조할 수 있습니다. 이것은 이벤트를 읽고 elasticsearch에 저장하기 위해서 redis와 websocket 이벤트 구독하기를 사용합니다. (이 코드는 데모 목적으로만 의미가 있다는 것을 명심하세요).