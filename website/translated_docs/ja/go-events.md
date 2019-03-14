---
id: Goイベント
title: Goイベントのインデクシング
sidebar_label: Goイベントのインデクシング
---
以前はGoで出力されたイベントはwebsocketにしか送信されなかった。 今それらはローカルデータベースまたはredisに保存することができる。 以下はイベントを保存するための設定である。

## イベントの保存

```yaml
EventDispatcher:
  # Available dispatcher: "db_indexer" | "log" | "redis"
  Dispatcher: "db_indexer"
  # Redis will be use when Dispatcher is "redis"
  Redis:
    URI: "redis_url_here"
```