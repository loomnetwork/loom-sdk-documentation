---
id: loomevents
title: イベントのサブスクライブ
sidebar_label: イベントのサブスクライブ
---
## イベントの送信

イベントはスマートコントラクトおよび[goプラグイン](./goloomevents.html)から送信される。 このイベントは２つの方法でサブスクライブできる。

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
    

こうして、Redisサーバーへ`loomevents`というソート済みセット型にてイベントが出力されるようになる。 各イベントは、ブロックの高さのスコアでソートされたセット型へと追加される。

## websocketsでのサブスクライブ

Loom SDKのクエリ・エンドポイントも、イベントストリームへサブスクライブするのに使用できる。 ここにあるのは、コマンドラインと[wscat](https://www.npmjs.com/package/wscat2) nodejs cliを使用したサンプルのサブスクリプションコードだ。

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
    

CLIアウトプット中の最初のjsonは、サブスクライブコマンドの応答である。次のjsonは、トランザクションを処理しているコントラクトからのイベントである。

### Goコードの例

[デモインデクサー](https://github.com/loomnetwork/etherboy-core/blob/master/tools/cli/indexer/etherboyindexer.go)を参照するとよい。 これは redisとwebsocketのイベントサブスクリプションを使用して、イベントの読み取りとelasticsearchの維持を行なっている。 (このコードはデモンストレーションのみを目的としていることに気をつけること)。