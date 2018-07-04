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

使用 `loom run`命令运行智能合约时，默认度量标准端点为`127.0.0.1:9999/metrics`。 可以使用配置文件中的配置键`QueryServerHost`配置端点。

您可以使用 http 客户端或 Web 浏览器从端点轮询度量。 运行在`127.0.0.1:9999`上的服务器将显示请求计数和延迟度量，如下所示。

```sh
curl 127.0.0.1:9999/metrics

# 帮助 loomchain_query_service_request_count 收到请求数.
# 键入 loomchain_query_service_request_count 计数器
loomchain_query_service_request_count{error="false",method="Nonce"} 2
loomchain_query_service_request_count{error="true",method="Query"} 2
# 帮助 loomchain_query_service_request_latency_microseconds 请求的总持续时间（以微秒为单位）。
# 键入 loomchain_query_service_request_latency_microseconds 摘要
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

## 监控度量

Loom不存储度量，仅显示当前度量值。 若要获取度量值, 可以从端点向监视系统轮询度量, 也可以使用 [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/)。

你还可以使用 [Grafana](https://grafana.com/) 或 [Kibana](https://www.elastic.co/products/kibana) 等工具可视化度量。

### 普罗米修斯

要配置普罗米修斯服务器, 请将以下内容添加到配置文件中:

```yaml
scrape_configs:
  - job_name: "loomchain"
    metrics_path: "/metrics"
    scrape_interval: "2s"
    static_configs:
    - targets:
      - 127.0.0.1:9999 # The IP address to the query server host
```

## 所有度量列表

以下是由 Loom SDK 公开的度量列表:

| 度量                                                       | 类型  | 描述：               |
| -------------------------------------------------------- | --- | ----------------- |
| loomchain_query_service_request_count                | 计数器 | 收到的查询请求数          |
| loomchain_query_service_request_latency_microseconds | 摘要  | 查询请求的总持续时间 (以微秒计) |