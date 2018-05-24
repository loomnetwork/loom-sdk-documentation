---
id: loomevents
title: イベントのサブスクライブ
sidebar_label: イベントのサブスクライブ
---
## イベントの送信

イベントはスマートコントラクトおよび[goプラグイン](./goloomevents)から送信される。 このイベントは２つの方法でサブスクライブできる。

### イベントの構造

上に示したイベントのJSONデータは、イベントストリームへ出力される前に、あるトランザクション固有のメタデータでラップされる。 メタデータの他のフィールドには、呼び出しアドレス、コントラクトアドレス、コントラクト名とトランザクションリクエストのローデータが含まれている。

以下はRedisへ出力される完全なメッセージの例である -

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

`rawRequest`及び`encodedData`は標準エンコーディングを使用したBase64でエンコードされている。

## Redisでのサブスクライブ

loom-sdkは、デフォルトではログにイベントを出力するのみとなっている。これを設定してRedisのソート済みセットへ出力するには、次の１行を設定ファイルloom.yamlに追加しよう。

    EventDispatcherURI: "redis://localhost:6379"
    

こうして、Redisサーバーへ`loomevents`というソート済みセットにてイベントが出力されるようになる。 各イベントは、ブロックの高さのスコアでソートされたセットへと追加される。

## websocketsでのサブスクライブ

The Loom SDK query endpoint can be used to subscribe to the event stream as well. Here is sample subscription code using a command line and the [wscat](https://www.npmjs.com/package/wscat2) nodejs cli.

    $ cat command.json
    {
        "method": "subevents",
        "jsonrpc": "2.0",
        "params": [],
        "id": "dontcare"
    }
    
    $ wscat -k ws://localhost:9999/queryws < command.json
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

### Goコードの例

You can refer to [a demo indexer](https://github.com/loomnetwork/etherboy-core/blob/master/tools/cli/indexer/etherboyindexer.go) which uses the redis and websocket event subscriptions to read the events and persist to elasticsearch. (Note that this code is meant only for demonstration purposes).