* * *

id: logging title: ロギング sidebar_label: ロギング

* * *

## 概要

Loomには設定可能なロギング機能が組み込まれている。 ユーザーはログのレベルと出力先を設定できる。

## Loom SDKのロギング

### ログレベルの設定

Loom SDKには2タイプのログがある。 1つ目は、ブロックチェーンのトランザクションとコンセンサス・イベントのログである。 2つ目はLoom SDKによって生成されたログで、出力されたイベントのようなものだ。

以下を`loom.yaml`に設定して、ログレベルを設定しよう。

    LoomLogLevel: debug # LoomSDKによって出力されるイベントのログレベルを設定
    BlockchainLogLevel: error # ブロックチェーンのログのログレベルを設定
    

`LoomLegLevel`と`BlockchainLogLevel`のデフォルトは、それぞれ`info`と`error`である。

### ログ出力先の設定

Currently a file target is supported for the loom logs.

    LogDestination: "file://loom.log" # loom.log is also the default target
    

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