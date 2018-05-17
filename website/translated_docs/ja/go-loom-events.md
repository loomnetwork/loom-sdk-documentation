---
id: goloomevents
title: go-loomコントラクトからのイベントの発生
sidebar_label: イベントの発生
---
## go-pluginsからのイベントの発生

Loom SDKはコントラクトにイベントを発生させる機能を提供しており、これはインデックスなどの複数の目的で使用することができる。 現在Loom SDKは、Redisのソート済みセットへのイベント発生をサポートしている。

### Loom SDKの設定

デフォルトではloom-sdkはログにイベントを出力するだけである。

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

### Event structure

The event JSON shown above is wrapped in some transaction specific metadata before being emitted to the event stream. The other fields in the metadata include Called address, the contract address, the contract name and the raw transaction request data.

Below is an example of the full message that goes into redis -

```json
{
  "caller": {
    "ChainID": "default",
    "Local": "2DiOmpX+kSRZK0jxEgxdGuPC0eo="
  },
  "address": {
    "ChainID": "default",
    "Local": "AFsXhk862/U7E4Ty5vISDGZS93k="
  },
  "plugin": "etherboycore:0.0.1",
  "encodedData": "eyJPd25lciI6ImdvZGJvbGUxIiwiTWV0aG9kIjoiY3JlYXRlYWNjdCIsIkFkZHIiOiIyRGlPbXBYK2tTUlpLMGp4RWd4ZEd1UEMwZW89In0=",
  "rawRequest": "ChpldGhlcmJveWNvcmUuQ3JlYXRlQWNjb3VudBIUEghnb2Rib2xlMRoIZ29kYm9sZTE="
}
```

The `rawRequest` and the `encodedData` are base64 encoded with a standard encoding.

### Sample indexer

A sample tool which reads from the event stream and puts messages into elasticsearch can be written as below

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"

    "github.com/gomodule/redigo/redis"
    loom "github.com/loomnetwork/go-loom"
)

var queueName = "loomevents"
var elasticURL = "http://localhost:9200"
var elasticIndex = "etherboy"

type emitData struct {
    Caller     loom.Address `json:"caller"`
    Address    loom.Address `json:"address"`
    PluginName string       `json:"plugin"`
    Data       []byte       `json:"encodedData"`
}

type emitMsg struct {
    Owner  string
    Method string
    Addr   []byte
    Value  int64
}

type indexEntry struct {
    Plugin      string
    BlockHeight int64
    CallerAddr  []byte
    ChainAddr   []byte
    Owner       string
    Method      string
    Value       int64
}

func main() {
    c, err := redis.DialURL("redis://localhost:6379")
    if err != nil {
        log.Fatal("Cannot connect to redis")
    }
    checkpoint := getCheckPoint(c)
    log.Printf("Checkpoint: %d\n", checkpoint)
    for {
        nextCP := checkpoint + 1
        events, eof, _ := getEvents(c, nextCP)
        if eof {
            log.Println("No more events, sleeping ...")
            time.Sleep(3 * time.Second)
            continue
        }
        log.Printf("Fetched %d events for height %d\n", len(events), checkpoint)
        for _, event := range events {
            indexEvent(checkpoint, event)
            checkPointEvent(c, nextCP)
        }
        checkpoint = nextCP
    }
}

func getCheckPoint(c redis.Conn) int64 {
    cp, _ := redis.Int64(c.Do("GET", "checkpoint"))
    return cp
}

func getEvents(c redis.Conn, height int64) ([]*emitData, bool, error) {
    count, err := redis.Int(c.Do("ZCOUNT", queueName, height, "+inf"))
    if err != nil {
        log.Printf("Error fetching event count: %v", err)
        return nil, false, err
    }
    if count == 0 {
        return nil, true, nil
    }
    eventVals, err := redis.Values(c.Do("ZRANGEBYSCORE",
        queueName,
        height,
        height))
    if err != nil {
        log.Printf("Unable to fetch event data: %v\n", err)
        return nil, false, err
    }
    events := []*emitData{}
    for _, ev := range eventVals {
        var ed emitData
        evBytes, ok := ev.([]byte)
        if !ok {
            log.Printf("Error typecasting event data %v", ev)
            continue
        }
        if err := json.Unmarshal(evBytes, &ed); err != nil {
            log.Printf("Error unmarshaling event data %s: %v", ev, err)
            continue
        }
        events = append(events, &ed)
    }
    return events, false, nil
}

func indexEvent(height int64, event *emitData) {
    callerAddr := event.Caller.Local
    chainAddr := event.Address.Local
    plugin := event.PluginName
    var msg emitMsg
    json.Unmarshal(event.Data, &msg)
    owner := msg.Owner
    method := msg.Method
    value := msg.Value
    indexEntry := &indexEntry{
        Plugin:      plugin,
        BlockHeight: height,
        CallerAddr:  callerAddr,
        ChainAddr:   chainAddr,
        Owner:       owner,
        Method:      method,
        Value:       value,
    }
    indexJSON, err := json.Marshal(indexEntry)
    if err != nil {
        log.Printf("Error marshalling index json: %v", err)
        return
    }
    elasticResourceURL := fmt.Sprintf("%s/%s/%s/", elasticURL, elasticIndex, "app")
    log.Println(elasticResourceURL)
    resp, err := http.Post(elasticResourceURL, "application/json", bytes.NewReader(indexJSON))
    if err != nil {
        log.Printf("Error writing to index: %v\n", err)
        return
    }
    defer resp.Body.Close()
    log.Printf("%+v", indexEntry)
    return
}

func checkPointEvent(c redis.Conn, cp int64) error {
    c.Do("SET", "checkpoint", cp)
    return nil
}
```