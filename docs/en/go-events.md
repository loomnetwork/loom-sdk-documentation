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

## Querying and Decoding Events in Go

Use the following example to query and decode events in Go:

```go
type MyEvent struct {
	Owner  string
	Method string
	Addr   []byte
}

rpcClient := client.NewDAppChainRPCClient("default", "http://plasma.dappchains.com:80/rpc", "http://plasma.dappchains.com:80/query")
fromBlock := uint64(5216300)
toBlock := uint64(5216320)
result, err := rpcClient.GetContractEvents(fromBlock, toBlock, "")
if err != nil {
	panic(err)
}
for _, event := range result.Events {
	var decodedEvent MyEvent
	if err := json.Unmarshal(event.EncodedBody, &decodedEvent); err != nil {
		panic(err)
	}
}
```

## Querying and Decoding Events in JavaScript

To query and decode events you can use something like the following:


```js
this.simpleStoreInstance.events.NewValueSet({ filter: { _value: 10 }}, (err, event) => {
      if (err) console.error('Error on event', err)
      else {
        if (this.onEvent) {
          this.onEvent(event.returnValues)
        }
      }
    })
```

For a simple example of Truffle interacting with Loom DappChain, check out [this repo](https://github.com/loomnetwork/truffle-dappchain-example).