---
id: goloomevents
title: go-loom 컨트랙트에서 이벤트 내보내기
sidebar_label: 이벤트 내보내기
---
## go-plugin 으로 이벤트 내보내기

Loom sdk는 indexing 같은 여러목적으로 사용될 수 있는 이벤트를 내보내기 위한 기능을 컨트랙트에 제공합니다. 현재 Loom sdk는 Redis sorted set에 이벤트 내보내기를 지원합니다.

### Loom sdk 설정하기

기본적으로 loom-sdk 은 이벤트를 로그로 내보냅니다. Redis sorted set에 내보내는 것으로 설정하려면, loom.yaml 파일에 아래 라인을 추가하세요.

    EventDispatcherURI: "redis://localhost:6379"
    

This will start emitting events to the redis server in a sorted set called `loomevents`. Each event is added to the sorted set with the score being the blockchain height.

### Emitting events

The code snippet below shows sample code for emitting events from the contract.

```go
    emitMsg := struct {
        Owner  string
        Method string
        Addr   []byte
    }{owner, "createacct", addr}
    emitMsgJSON, err := json.Marshal(emitMsg)
    if err != nil {
        log.Println("Error marshalling emit message")
    }
    ctx.Emit(emitMsgJSON)
```

### Subscribing to events

See [this page](loomevents.html) for more information on subscribing to events