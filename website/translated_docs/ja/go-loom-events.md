---
id: goloomevents
title: go-loomコントラクトからのイベントの発生
sidebar_label: イベントの発生
---
## go-pluginsからのイベントの発生

Loom SDKはコントラクトにイベントを発生させる機能を提供しており、これはインデックスなどの複数の目的で使用することができる。 現在Loom SDKは、Redisのソート済みセットへのイベント出力をサポートしている。

### Loom SDKの設定

loom-sdkは、デフォルトではログにイベントを出力するのみとなっている。これを設定してRedisのソート済みセットへ出力するには、次の１行を設定ファイルloom.yamlに追加しよう。

    EventDispatcherURI: "redis://localhost:6379"
    

こうして、Redisサーバーへ`loomevents`というソート済みセットにてイベントが出力されるようになる。 各イベントは、ブロックの高さのスコアでソートされたセットへと追加される。

### イベントの発生

以下のコードスニペットは、コントラクトからイベントを発生させるサンプルコードである。

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

### イベントのサブスクライブ

イベントのサブスクライブについて、[このページ](./loomevents)でさらに情報を参照しよう。