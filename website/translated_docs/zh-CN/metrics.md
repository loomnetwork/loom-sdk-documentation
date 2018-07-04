---
id: metrics
title: 度量
sidebar_label: 度量
---
## 概述

Loom 检测度量并将度量值公开给外部监控服务。 引入中间件层以实现应用程序服务和检测之间的关注分离。 Loom SDK 利用 go-kit 的 `metrics` 包来检测度量。

## Loom SDK 度量

Loom 获取并公开了4种不同类型的度量：

- `Counter` 仅上升的单个数值
- `Gauge` 上升和下降的单个数值
- `Histogram` 在滑动时间窗口上分组到桶中的观察样本
- `Summary` 在滑动时间窗口分组到具有分位数的桶中的观察示例

以下 Go 代码显示了 Loom 如何使用 `go-kit`创建度量的一个示例。 `Namespace` 以 *loomchain* 为前缀。 `Subsystem` 可以是 *query_service 或 *backend_service*.

例如，requestCounte 度量密钥称为 `loomchain_query_service_request_count`，requestLatency 度量密钥为 `loomchain_query_service_request_latency_microseconds`。 所有的密钥都是独一无二的。

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

Loom 还为每个度量提供两个不同的字段名称，以创建度量值的变体。 第一个是 `method`, 它是方法调用的名称。 第二个是 `error`, 如果方法调用返回错误, 则为 true。

以下是具有不同字段的公开度量的示例。

    loomchain_query_service_request_count{error="false",method="Nonce"}
    loomchain_query_service_request_count{error="true",method="Nonce"}
    loomchain_query_service_request_count{error="false",method="Query"}
    loomchain_query_service_request_count{error="true",method="Query"}
    

## 度量端点

When running a smart contract using `loom run` command, the default metrics endpoint is `127.0.0.1:9999/metrics`. The endpoint is configurable using the configuration key `QueryServerHost` in the configuration file.

You can poll the the metrics from the endpoint using http clients or web browsers. The server running on `127.0.0.1:9999` will show the request count and latency metrics as followed.

```sh
curl 127.0.0.1:9999/metrics

# HELP loomchain_query_service_request_count Number of requests received.
# TYPE loomchain_query_service_request_count counter
loomchain_query_service_request_count{error="false",method="Nonce"} 2
loomchain_query_service_request_count{error="true",method="Query"} 2
# HELP loomchain_query_service_request_latency_microseconds Total duration of requests in microseconds.
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

## Monitoring Metrics

Loom does not store the metrics but only exposes the metric values at the moment. To get metrics, you can either poll the metrics from the endpoint to your monitoring system or you can use [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/).

You can also visualize the metrics using tools like [Grafana](https://grafana.com/) or [Kibana](https://www.elastic.co/products/kibana).

### Prometheus

To configure prometheus server, add the following to your config file:

```yaml
scrape_configs:
  - job_name: "loomchain"
    metrics_path: "/metrics"
    scrape_interval: "2s"
    static_configs:
    - targets:
      - 127.0.0.1:9999 # The IP address to the query server host
```

## List of All Metrics

The following are the list of metrics exposed by Loom SDK:

| Metrics                                                  | Type    | Description                                      |
| -------------------------------------------------------- | ------- | ------------------------------------------------ |
| loomchain_query_service_request_count                | Counter | Number of query requests received                |
| loomchain_query_service_request_latency_microseconds | Summary | Total duration of query requests in microseconds |