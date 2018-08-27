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
    

이것은 redis server의 `loomevents`이라 불리는 sorted set에 이벤트 내보내기를 시작합니다. 각 이벤트는 블록체인 height 가 되는 스코어와 함께 sorted set에 추가됩니다. 

### 이벤트 내보내기

아래 코드조각은 컨트랙트로부터 이벤트 내보내기를 보여주는 예제 코드입니다.

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

### 이벤트 구독하기

이벤트 구독하기에 관한 더 자세한 사항은 [이 페이지](loomevents.html)를 보세요