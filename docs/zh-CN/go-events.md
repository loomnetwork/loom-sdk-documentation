---
id: go-events
title: Go Event Indexing
sidebar_label: Go Event Indexing
---
Previously events emitted in Go would only go out to the websocket. Now they can be stored in a local database or redis also. Below is the config to store the events

## Event Store

```yaml
EventDispatcher:
  # Available dispatcher: "db_indexer" | "log" | "redis"
  Dispatcher: "db_indexer"
  # Redis will be use when Dispatcher is "redis"
  Redis:
    URI: "redis_url_here"
```