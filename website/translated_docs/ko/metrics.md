---
id: metrics
title: 메트릭
sidebar_label: 메트릭
---
## 개요

Loom은 메트릭을 사용하며 메트릭 값을 외부 모니터링 서비스에 제공합니다. 미들웨어 레이어는 애플리케이션 서비스와 계측 사이를 구분짓기 위해서 도입되었습니다. Loom SDK은 go-kit의 `metrics` 패키지를 계측기 메트릭으로 활용합니다.

## Loom SDK 메트릭

Loom captures and exposes 4 different types of metrics:

- `Counter` 증가만 하는 단일 숫자 값
- `Gauge` 증가와 감소를 하는 단일 숫자 값
- `Histogram` 슬라이딩 시간대의 버킷으로 그룹화 된 관찰 샘플
- `Summary` 슬라이딩 시간대의 수량과 같이 버킷으로 그룹화 된 관찰 샘플

The following Go code shows an example of how Loom creates metrics with `go-kit`. The `Namespace` is prefixed with *loomchain*. The `Subsystem` can be either *query_service or *backend_service*.

For example, the requestCounter metric key is referred as `loomchain_query_service_request_count` and the requestLatency metric key is `loomchain_query_service_request_latency_microseconds`. All the keys are unique.

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

Loom also provides the two different field names for each metrics to create variation of metric values. The first one is `method` which is the name of the method call. The second one is `error` which will be true if the method call returns an error.

The followings are the example of the exposed metrics with different fields.

    loomchain_query_service_request_count{error="false",method="Nonce"} 
    loomchain_query_service_request_count{error="true",method="Nonce"} 
    loomchain_query_service_request_count{error="false",method="Query"}
    loomchain_query_service_request_count{error="true",method="Query"}
    

## 메트릭 엔드포인트

When running a smart contract using `loom run` command, the default metrics endpoint is `127.0.0.1:46658/metrics`. The endpoint is configurable using the configuration key `RPCBindAddress` in the configuration file.

You can poll the the metrics from the endpoint using http clients or web browsers. The server running on `127.0.0.1:46658` will show the request count and latency metrics as followed.

```sh
curl 127.0.0.1:46658/metrics

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

## 메트릭 모니터링

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
      - 127.0.0.1:46658 # The IP address to the query server host
```

## 모든 메트릭 리스트

The following are the list of metrics exposed by Loom SDK:

| Metrics                                                  | Type    | Description                                      |
| -------------------------------------------------------- | ------- | ------------------------------------------------ |
| loomchain_query_service_request_count                | Counter | Number of query requests received                |
| loomchain_query_service_request_latency_microseconds | Summary | Total duration of query requests in microseconds |