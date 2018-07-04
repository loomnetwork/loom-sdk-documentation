* * *

id: logging title: 日志记录 sidebar_label: 日志记录

* * *

## 概览

Loom 有内建的可配置的日志记录。 The user can configure the log level and the log destination.

## Loom SDK 日志

### 配置日志层级

在 Loom SDK 中有两种日志类型 第一种是区块链事物和共识事件的日志。 第二种是 Loom SDK 创建的日志，记录例如激发事件等内容。

Set the following in your `loom.yaml` to set logging levels.

    LoomLogLevel: debug # sets log level for events emitted from the loom sdk
    BlockchainLogLevel: error # sets log level for the blockchain logs.
    

Defaults for the `LoomLogLevel` and `BlockchainLogLevel` are `info` and `error` respectively.

### 配置日志目录

目前，Loom 日志支持指定文件作为日志存储目标。

    LogDestination: "file://loom.log" # loom.log is also the default target.
    

要记录到 stderr， 指定目录为 `file://-`

## 合约日志

诸如日志层级和目录的配置对合约来说是分开的。 这些是使用环境变量。 例如： `CONTRACT_LOG_LEVEL=debug CONTRACT_LOG_DESTINATION="file://-" $LOOM_EXE run`

而这将配置合约日志的目录为 stderr，并将事件层级配置为`debug` 日志层级和目录的默认值分别是`info` and `file://contract.log` 。

### 在合约中记录日志

在合约上下文中，有一个提前配置好的记录器可以用于结构化的日志记录。 例如

    ctx.Logger().Info("Created account", "owner", owner, "address", addr)
    

将生成一行这样的日志：

    ts=2018-05-13T02:06:49.817229589Z module=loom level=info _msg="Created account" owner=godbole4 address="\ufffd8\ufffd\ufffd\ufffd\ufffd\ufffd$Y+H\ufffd\u0012\u000c]\u001a\ufffd\ufffd\ufffd\ufffd"
    

上下文记录器可用的方法有 `Error`， `Warn`， `Info`， 以及 `Debug`。