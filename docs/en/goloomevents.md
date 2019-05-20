---
id: goloomevents
title: Emitting events from go-loom contracts
sidebar_label: Emitting events
---

## Emitting events from go-plugins

The loom SDK gives a facility for the contracts to emit events that can be used for multiple purposes such as indexing. Currently, the loom SDK supports emitting events into a Redis sorted set.


### Configuring the loom SDK

By default, the loom SDK will only emit events to the log. To configure it to send the events to a Redis sorted set, add the following line to the `loom.yaml` config file:

```yaml
EventDispatcherURI: "redis://localhost:6379"
```

This will start emitting events to the Redis server in a sorted set called `loomevents`. Each event is added to the sorted set, with the score being the blockchain height.

### Emitting events

The code snippet below shows how to emit events from the contract:

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
