---
id: loomevents
title: 订阅事件
sidebar_label: 订阅事件
---
## 发送事件

事件由智能合约和 [go plugins](./goloomevents)发出。 有两种方式订阅这些事件：

### 事件结构

上面展示的事件JSON在发送到事件流之前被封装在一些事务特定的元数据中。 元数据中的其他字段包括被调用地址、合约地址、合约名称和原始事务请求数据。

以下是进入redis的完整信息示例 -

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

`rawRequest`和`encodedData`使用标准编码进行base64编码。

## 通过Redis订阅

默认情况下，loom-sdk只会将事件发送到log。 要将其配置为将其发送到redis有序集合中，请将以下行添加到loom.yaml配置文件中。

    EventDispatcherURI: "redis://localhost:6379"
    

这将开始把事件发送到名为`loomevents`的有序集合中的redis服务器。每个事件都会被添加到有序集合中，得分就是区块链高度。

## 通过websockets订阅

Loom SDK查询端点也可用于订阅事件流。 以下是一个使用命令和[wscat](https://www.npmjs.com/package/wscat2) nodejs cli的示例订阅代码。

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
    

Cli输出中的第一个json是订阅命令的响应。 以下json是来自一个处理事务的合约的事件。

### 示例go代码

你可以参考使用redis和websocket事件订阅的[demo索引器](https://github.com/loomnetwork/etherboy-core/blob/master/tools/cli/indexer/etherboyindexer.go) 来读取事件并坚持弹性搜索。 （注意这个代码仅用于演示目的）。