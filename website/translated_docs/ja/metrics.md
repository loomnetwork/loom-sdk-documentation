---
id: metrics
title: メトリクス
sidebar_label: メトリクス
---
## Overview

Loomはメトリクスを備えており、外部のモニタリングサービスにメトリクス値を公開している。 ミドルウェアレイヤーは、アプリケーションのサービスとインストゥルメント化間の関心の分離を可能にするために導入される。 Loom SDKは、go-kitの`metrics`パッケージを利用してメトリクスを備えている。

## Loom SDKのメトリクス

Loomは4つの異なるタイプのメトリクスをキャプチャ及び公開している:

- `Counter` 単一の数値。増えることだけ可能。
- `Gauge` 単一の数値で増減が可能。
- `Histogram` スライディングタイムウインドウのバケットにグループ分けされた観察サンプル。
- `Summary` スライディングタイムウインドウのバケットに、分位点でグループ分けされた観察サンプル。

以下のGoコードは、`go-kit`を用いたLoomのメトリクス作成方法の例を示している。 `Namespace`は*loomchain*の前に書かれている。 `Subsystem`は*query_serviceもしくは*backend_service*のどちらも可能だ。

例えば、requestCounterのメトリックキーは`loomchain_query_service_request_count`、及び requestLatencyのメトリックキーは`loomchain_query_service_request_latency_microseconds`というふうに参照される。 全てのキーは唯一のものであり同じものはない。

```Go
fieldKeys := []string{"method", "error"}
requestCount := kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
    Namespace: "loomchain",
    Subsystem: "query_service",
    Name:      "request_count",
    Help:      "Number of requests received.",
}, fieldKeys)
requestLatency := kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
    Namespace: "loomchain",
    Subsystem: "query_service",
    Name:      "request_latency_microseconds",
    Help:      "Total duration of requests in microseconds.",
}, fieldKeys)
```

またLoomはメトリック値のバリエーションを作成するために、各メトリックに2つの異なるフィールド名も提供する。 まず`method`だが、これはメソッドコールの名称だ。 次に`error`だが、これはメソッドコールがエラーを返す場合にtrueとなる。

以下は異なるフィールドで公開されているメトリクスの例である。

    loomchain_query_service_request_count{error="false",method="Nonce"} 
    loomchain_query_service_request_count{error="true",method="Nonce"} 
    loomchain_query_service_request_count{error="false",method="Query"}
    loomchain_query_service_request_count{error="true",method="Query"}
    

## メトリックのエンドポイント

`loom run`コマンドを使用してスマートコントラクトを実行する際、デフォルトのメトリクスのエンドポイントは`127.0.0.1:46658/metrics`である。 このエンドポイントは、設定ファイル中の設定キー`RPCBindAddress`を使って設定可能だ。

httpクライアントやwebブラウザを使用して、エンドポイントからメトリクスをポーリングすることが可能だ。`127.0.0.1:46658`で動いているサーバーは、リクエストのカウントとレイテンシーのメトリクスを以下のように示す。

```sh
curl 127.0.0.1:46658/metrics

# HELP loomchain_query_service_request_count 受け取ったリクエスト数。
# TYPE loomchain_query_service_request_count counter
loomchain_query_service_request_count{error="false",method="Nonce"} 2
loomchain_query_service_request_count{error="true",method="Query"} 2
# HELP loomchain_query_service_request_latency_microseconds ミリ秒単位での全リクエストの合計時間。
# TYPE loomchain_query_service_request_latency_microseconds summary
loomchain_query_service_request_latency_microseconds{error="false",method="Nonce",quantile="0.5"} 1.0352e-05
loomchain_query_service_request_latency_microseconds{error="false",method="Nonce",quantile="0.9"} 2.4728e-05
loomchain_query_service_request_latency_microseconds{error="false",method="Nonce",quantile="0.99"} 2.4728e-05
loomchain_query_service_request_latency_microseconds_sum{error="false",method="Nonce"} 3.508e-05
loomchain_query_service_request_latency_microseconds_count{error="false",method="Nonce"} 2
loomchain_query_service_request_latency_microseconds{error="true",method="Query",quantile="0.5"} 1.5574e-05
loomchain_query_service_request_latency_microseconds{error="true",method="Query",quantile="0.9"} 1.7501e-05
loomchain_query_service_request_latency_microseconds{error="true",method="Query",quantile="0.99"} 1.7501e-05
loomchain_query_service_request_latency_microseconds_sum{error="true",method="Query"} 3.3075000000000004e-05
loomchain_query_service_request_latency_microseconds_count{error="true",method="Query"} 2

```

## メトリクスのモニタリング

Loomはメトリクスを格納しないのだが、その時点でのメトリック値の公開のみ行なっている。 メトリクスの取得には、エンドポイントからモニタリングシステムへメトリクスのポーリングを行うか、もしくは[Prometheus](https://prometheus.io/docs/prometheus/latest/installation/)を使用することもできる。

また[Grafana](https://grafana.com/)や[Kibana](https://www.elastic.co/products/kibana)のようなツールを使用して、メトリクスを可視化することもできる。

### Prometheus

Prometheusサーバーを設定するために、以下を設定ファイルに追加しよう:

```yaml
scrape_configs:

  - job_name: "loomchain"
    metrics_path: "/metrics"
    scrape_interval: "2s"
    static_configs:
    - targets:
      - 127.0.0.1:46658 # The IP address to the query server host
```

## 全メトリクスのリスト

以下はLoom SDKによって公開されるメトリクスのリストだ:

| メトリクス                                                    | タイプ     | 説明                   |
| -------------------------------------------------------- | ------- | -------------------- |
| loomchain_query_service_request_count                | Counter | 受け取ったクエリリクエスト数       |
| loomchain_query_service_request_latency_microseconds | Summary | ミリ秒単位でのクエリリクエストの合計時間 |