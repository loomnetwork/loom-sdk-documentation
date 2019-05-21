---
id: go-events
title: Go Event Indexing
sidebar_label: Go Event Indexing
---

## Go Event Indexing

Previously, events emitted in Go would only go out to the websocket. Now, they can be stored in a local database or Redis also.

## Enabling the Event Store

Here's a template you can use to enable the Event Store:

```yaml
EventStore:
  DBName: {{.EventStore.DBName}} // Set DB name (can be anything, default is events)
  DBBackend: {{.EventStore.DBBackend}} // Set DB type 'goleveldb' or 'cleveldb'
{{end}}

EventDispatcher:
  Dispatcher: {{.EventDispatcher.Dispatcher}} // Available dispatcher: "db_indexer" | "log" | "redis"
  # Redis will be use when Dispatcher is "redis"
  Redis:
    URI: "{{.EventDispatcher.Redis.URI}}"// Redis URI
```

## Example

As an example, to store the events in Redis, you should add the following to your `loom.yml` file:


```yaml
EventDispatcher:
  # Available dispatcher: "db_indexer" | "log" | "redis"
  Dispatcher: "db_indexer"
  # Redis will be used when Dispatcher is "redis"
  Redis:
    URI: "redis_url_here"

EventStore:
  DBName: "event"
  DBBackend: "goleveldb"
```

Finally, you can query the events using [something like this](https://plasma.dappchains.com/query/contractevents?fromBlock=5216332&toBlock=5216352).