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

現在Loomログ用にファイルターゲットがサポートされてている。

    LogDestination: "file://loom.log" # loom.log は同じくデフォルトターゲット
    

ログを標準エラー出力するには、出力先を`file://-`と指定しよう。

## コントラクトのロギング

ログのレベルや出力先の設定は、コントラクト別に分かれている。 これらは環境変数を使用して設定される。 Example: `CONTRACT_LOG_LEVEL=debug CONTRACT_LOG_DESTINATION="file://-" $LOOM_EXE run`

これはコントラクトレベルを`debug`へ、そして出力先は標準エラー出力へと設定する。 ログレベルと出力先のデフォルトは、それぞれ`info`及び`file://contract.log`となっている。

### コントラクトからのロギング

コントラクトのコンテキストにはあらかじめ設定されたロガーがあり、これは構造化ロギングに使用することができる。 例えば

    ctx.Logger().Info("Created account", "owner", owner, "address", addr)
    

これは以下のようなログを生成する。

    ts=2018-05-13T02:06:49.817229589Z module=loom level=info _msg="Created account" owner=godbole4 address="\ufffd8\ufffd\ufffd\ufffd\ufffd\ufffd$Y+H\ufffd\u0012\u000c]\u001a\ufffd\ufffd\ufffd\ufffd"
    

コンテキストロガーで利用可能なメソッドは、`Error`、`Warn`、`Info`そして`Debug`である。