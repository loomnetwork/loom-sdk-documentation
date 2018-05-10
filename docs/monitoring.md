---
id: monitoring
title: Monitoring
---

## Overview

Loom exposes built-in metrics via `/metrics` endpoint. Loom does not store the metrics but only expose the metric values at the moment. To get metrics, you can either poll the metric from this endpoint to your monitoring system or you can use [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/).

You can visualize the metrics using tools like [Grafana](https://grafana.com/) or [Kibana](https://www.elastic.co/products/kibana).

## Setup

### Prometheus 

To configure prometheus server, add the following to your config file:

```yaml
scrape_configs:
  - job_name: "loomchain"
    metrics_path: "/metrics"
    scrape_interval: "2s"
    static_configs:
    - targets:
      - <your_ip_address>:9999
```

## Metrics

The following are the list of metrics:

| Metrics       | Description   |
| ------------- |---------------|
| loomchain_query_service_request_count | Number of query requests received |
| loomchain_query_service_request_latency_microseconds | Total duration of query requests in microseconds |

