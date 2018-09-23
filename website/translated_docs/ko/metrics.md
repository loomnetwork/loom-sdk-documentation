---
id: metrics
title: 메트릭
sidebar_label: 메트릭
---
## 개요

Loom은 메트릭을 사용하며 메트릭 값을 외부 모니터링 서비스에 제공합니다. 미들웨어 레이어는 애플리케이션 서비스와 계측 사이를 구분짓기 위해서 도입되었습니다. Loom SDK은 go-kit의 `metrics` 패키지를 계측기 메트릭으로 활용합니다.

## Loom SDK 메트릭

Loom 4가지의 서로다른 종류의 메트릭을 수집 및 제공합니다:

- `Counter` 증가만 하는 단일 숫자 값
- `Gauge` 증가와 감소를 하는 단일 숫자 값
- `Histogram` 슬라이딩 시간대의 버킷으로 그룹화 된 관찰 샘플
- `Summary` 슬라이딩 시간대의 수량과 같이 버킷으로 그룹화 된 관찰 샘플

다음 Go 코드는 `go-kit`로 생성하는 메트릭이 어떤지를 보여주는 에시입니다. `Namespace`는 *loomchain*로 prefix 되었습니다. `Subsystem`은 *query_service 또는 *backend_service*가 될 수 있습니다.

예를 들면, requestCounter 메트릭 키는 `loomchain_query_service_request_count`로 참조되어지고 requestLatency 메트릭 키는 `loomchain_query_service_request_latency_microseconds` 입니다. 모든키는 유일합니다.

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

Loom은 메트릭 값에 변형을 주기 위해서 각 메트릭 별로 두가지의 다른 필드 이름을 제공합니다. 첫번째는 메소드 콜의 이름인 `method` 입니다. 두번째는 `error`이며 메소드 콜이 에러를 반환하고자 할때 true가 됩니다.

다음은 다른 필드로 외부에 제공되는 메트릭의 예제입니다.

    loomchain_query_service_request_count{error="false",method="Nonce"} 
    loomchain_query_service_request_count{error="true",method="Nonce"} 
    loomchain_query_service_request_count{error="false",method="Query"}
    loomchain_query_service_request_count{error="true",method="Query"}
    

## 메트릭 엔드포인트

`loom run` 커맨드로 스마트 컨트랙트가 실행될때, 기본 메트릭 엔드포인트는 `127.0.0.1:46658/metrics`입니다. 엔드포인트는 설정파일의 `RPCBindAddress` 설정 키를 통해서 변경이 가능합니다.

Http 클라이언트나 web 브라우저를 이용해서 엔드포인트로 부터 메트릭을 폴링할 수 있습니다. `127.0.0.1:46658`에서 구동중인 서버는 다음과 같이 request count 와 latency 메트릭을 보여줄 것입니다.

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

Loom은 메트릭을 저장하지 않고 순간의 메트릭 값을 보여줄 뿐입니다. 메트릭을 얻기 위해서, 엔드포인트에서 여러분의 모니터링 시스템으로 메트릭을 폴링하거나 [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/)를 사용할 수 있습니다.

[Grafana](https://grafana.com/)이나 [Kibana](https://www.elastic.co/products/kibana)와 같은 툴을 사용해서 메트릭을 시각화 할 수도 있습니다.

### Prometheus

Prometheus 서버를 설정하려면, 설정파일에 다음을 추가하세요:

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

다음은 Loom SDK에서 제공하는 메트릭 리스트입니다:

| 메트릭                                                      | 타입      | 설명                             |
| -------------------------------------------------------- | ------- | ------------------------------ |
| loomchain_query_service_request_count                | Counter | 수신된 query request 수            |
| loomchain_query_service_request_latency_microseconds | Summary | 마이크로초 단위의 query request 총 지속시간 |