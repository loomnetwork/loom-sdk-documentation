---
id: goloomevents
title: 从go-loom合约中发送事件
sidebar_label: 发送事件
---
## 从go-plugins发送事件

Loom SDK提供了在合同上生成事件的功能，可用于多种目的，例如索引。 目前，Loom SDK支持将事件输出到一组有序的Redis。

### Loom SDK配置

默认情况下，loom-sdk仅将事件输出到日志。 要配置它并将其输出到Redis的有序集中，请将以下行添加到配置文件loom.yaml中。

    EventDispatcherURI: "redis://localhost:6379"
    

通过这种方式，事件将使用已排序的集合` loomevents `输出到Redis服务器。每个事件都会添加到按块高度分数排序的集合中。

### 发送事件

以下代码段是一个从合约生成事件的示例代码。

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

### 订阅事件

有关订阅事件的更多信息, 请参见 [本页](loomevents.html)