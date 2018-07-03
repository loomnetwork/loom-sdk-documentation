* * *

id: logging title: 日志记录 sidebar_label: 日志记录

* * *

## 概览

Loom 有内建的可配置的日志记录。 用户可以配置日志的层级和日志的存储位置。

## Loom SDK 日志

### 配置日志层级

在 Loom SDK 中有两种日志类型 第一种是区块链事物和共识事件的日志。 第二种是 Loom SDK 创建的日志，记录例如激发事件等内容。

在你的 `loom.yaml` 中设置以下内容来配置日志层级。

    LoomLogLevel: debug # 为 Loom SDK 中的事件激发设置日志层级
    BlockchainLogLevel: error # 为区块链日志设置日志层级
    

默认的，`LoomLogLevel ` 和 `BlockchainLogLevel ` 的层级分别是 `info ` 和 `error `。

### 配置日志目录

目前，Loom 日志支持指定文件作为日志存储目标。

    LogDestination: "file://loom.log" # loom.log 也是默认的日志文件名
    

To log to stderr, specify the destination as `file://-`

## Contract logging

Configurations like log level and destination are seperate for contracts. These are set using environment variables. Example: `CONTRACT_LOG_LEVEL=debug CONTRACT_LOG_DESTINATION="file://-" $LOOM_EXE run`

This will set the contract log level to `debug` and the destination to stderr. The default for log level and destination are `info` and `file://contract.log` respectively.

### Logging from the contract

The contract context has a pre-configured logger that can be used for structured logging. For example

    ctx.Logger().Info("Created account", "owner", owner, "address", addr)
    

will generate a log line like

    ts=2018-05-13T02:06:49.817229589Z module=loom level=info _msg="Created account" owner=godbole4 address="\ufffd8\ufffd\ufffd\ufffd\ufffd\ufffd$Y+H\ufffd\u0012\u000c]\u001a\ufffd\ufffd\ufffd\ufffd"
    

Available methods on the context logger are `Error`, `Warn`, `Info`, and `Debug`