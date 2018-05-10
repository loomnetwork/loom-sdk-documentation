---
id: metrics
title: Metrics
sidebar_label: Metrics
---

## Overview

Loom instruments metrics and exposes the values of the metrics to external monitoring services. Middleware layer is introduced to enable separation of concern between appliction services and instrumenting. 

Loom utilizes go-kit's `metrics` package to instruement metrics. To get started, install `metrics`:

```sh
go get github.com/go-kit/kit/metrics
```

## Create Metrics

To capture the value of the metrics, you need to initialize a metrics. There are 4 different types of metrics: 

- `Counter` a single numerical value that goes up only
- `Gauge` a single numberial value that goes up and down
- `Histogram` a sample of observation grouped into buckets over a sliding time window
- `Summary` a sample of observation grouped into buckets with quantiles over a sliding time window

The following GO code shows an example of how to create metrics with `go-kit`. It requires `Namespace`, `Subsystem`, and `Name` to form a key reference to the metrics. For example, the requestCounter metric key is referred as `loomchain_query_service_request_count` and the requestLatency metric key is `loomchain_query_service_request_latency_microseconds`. The keys must be unique. 

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

We also can optionally provide the field names for each metrics to create variation of metric values. For example, the `fieldKey` contains `method` and `error`. This enables metrics to have the same key but different method and error. The followings are the example of the exposed metrics with different fields.

```
loomchain_query_service_request_count{error="false",method="Nonce"} 
loomchain_query_service_request_count{error="true",method="Nonce"} 
loomchain_query_service_request_count{error="false",method="Query"}
loomchain_query_service_request_count{error="true",method="Query"}
```

## Middlware

To integrate the metics with the application services, we have to create a middleware that sits between the application services and the caller. The middleware intercepts the incoming requests and capture the metrics value before the application service responds back the the caller.

For example, we have the QueryService interface and QueryServer implementing the interface as followed:

```Go
type QueryService interface {
	Query(contract string, query []byte) ([]byte, error)
	Nonce(key string) (uint64, error)
}

type QueryServer struct {
	StateProvider
	ChainID string
	Loader  lcp.Loader
}

func (s *QueryServer) Query(contract string, query []byte) ([]byte, error) {...}

func (s *QueryServer) Nonce(key string) (uint64, error) {..}
```

We can construct a middleware layer as a QuerySerivce implementation. In the `Query` and `Nonce` method, we simply capture the values of the metric in the defer block to record the time duration taken by the service.

```Go
type InstrumentingMiddleware struct {
	requestCount   metrics.Counter
	requestLatency metrics.Histogram
	next           QueryService
}

func (m InstrumentingMiddleware) Query(contract string, query []byte) (resp []byte, err error) {
    defer func(begin time.Time) {
		lvs := []string{"method", "Query", "error", fmt.Sprint(err != nil)}
		m.requestCount.With(lvs...).Add(1)
		m.requestLatency.With(lvs...).Observe(time.Since(begin).Seconds())
	}(time.Now())

    resp, err = m.next.Query(contract, query)
    return
}

func (m InstrumentingMiddleware) Nonce(key string) (resp uint64, err error) {...}
```


## Put it all together

Once we have a middleware layer, we just have to intialize and inject the middleware when we construct our application.

For example, our `main.go` would look like this:

```Go
// query service
var qsvc rpc.QueryService
{
    qsvc = &rpc.QueryServer{
        StateProvider: app,
        ChainID:       chainID,
        Loader:        loader,
    }
    qsvc = rpc.NewInstrumentingMiddleWare(requestCount, requestLatency, qsvc)
}

handler := MakeQueryServiceHandler(qsvc, logger)
StartHTTPServer(host, handler, logger)
```

To expose the metrics as an endpoint, we have to create a HTTP handler that routes the endpoint to the metrics and then run a standard HTTP server with the created handler.

```Go
func MakeQueryServiceHandler(svc QueryService, logger log.TMLogger) http.Handler {
    mux := http.NewServeMux()
    ...
    
    mux.Handle("/metrics", promhttp.Handler())

    return mux
}
```

We can poll the the metrics from the endpoint using http clients or web browser. The server running on `localhost:9999` will show the following request count and latency with built-in Go metrics.

```sh
curl localhost:9999/metrics

# HELP go_gc_duration_seconds A summary of the GC invocation durations.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 0
go_gc_duration_seconds_sum 0
go_gc_duration_seconds_count 0
# HELP go_goroutines Number of goroutines that currently exist.
# TYPE go_goroutines gauge
go_goroutines 24
# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 1.741816e+06
# HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
# TYPE go_memstats_alloc_bytes_total counter
go_memstats_alloc_bytes_total 1.741816e+06
# HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
# TYPE go_memstats_buck_hash_sys_bytes gauge
go_memstats_buck_hash_sys_bytes 1.443518e+06
# HELP go_memstats_frees_total Total number of frees.
# TYPE go_memstats_frees_total counter
go_memstats_frees_total 520
# HELP go_memstats_gc_sys_bytes Number of bytes used for garbage collection system metadata.
# TYPE go_memstats_gc_sys_bytes gauge
go_memstats_gc_sys_bytes 235520
# HELP go_memstats_heap_alloc_bytes Number of heap bytes allocated and still in use.
# TYPE go_memstats_heap_alloc_bytes gauge
go_memstats_heap_alloc_bytes 1.741816e+06
# HELP go_memstats_heap_idle_bytes Number of heap bytes waiting to be used.
# TYPE go_memstats_heap_idle_bytes gauge
go_memstats_heap_idle_bytes 704512
# HELP go_memstats_heap_inuse_bytes Number of heap bytes that are in use.
# TYPE go_memstats_heap_inuse_bytes gauge
go_memstats_heap_inuse_bytes 3.719168e+06
# HELP go_memstats_heap_objects Number of allocated objects.
# TYPE go_memstats_heap_objects gauge
go_memstats_heap_objects 15071
# HELP go_memstats_heap_released_bytes_total Total number of heap bytes released to OS.
# TYPE go_memstats_heap_released_bytes_total counter
go_memstats_heap_released_bytes_total 0
# HELP go_memstats_heap_sys_bytes Number of heap bytes obtained from system.
# TYPE go_memstats_heap_sys_bytes gauge
go_memstats_heap_sys_bytes 4.42368e+06
# HELP go_memstats_last_gc_time_seconds Number of seconds since 1970 of last garbage collection.
# TYPE go_memstats_last_gc_time_seconds gauge
go_memstats_last_gc_time_seconds 0
# HELP go_memstats_lookups_total Total number of pointer lookups.
# TYPE go_memstats_lookups_total counter
go_memstats_lookups_total 43
# HELP go_memstats_mallocs_total Total number of mallocs.
# TYPE go_memstats_mallocs_total counter
go_memstats_mallocs_total 15591
# HELP go_memstats_mcache_inuse_bytes Number of bytes in use by mcache structures.
# TYPE go_memstats_mcache_inuse_bytes gauge
go_memstats_mcache_inuse_bytes 13888
# HELP go_memstats_mcache_sys_bytes Number of bytes used for mcache structures obtained from system.
# TYPE go_memstats_mcache_sys_bytes gauge
go_memstats_mcache_sys_bytes 16384
# HELP go_memstats_mspan_inuse_bytes Number of bytes in use by mspan structures.
# TYPE go_memstats_mspan_inuse_bytes gauge
go_memstats_mspan_inuse_bytes 58976
# HELP go_memstats_mspan_sys_bytes Number of bytes used for mspan structures obtained from system.
# TYPE go_memstats_mspan_sys_bytes gauge
go_memstats_mspan_sys_bytes 65536
# HELP go_memstats_next_gc_bytes Number of heap bytes when next garbage collection will take place.
# TYPE go_memstats_next_gc_bytes gauge
go_memstats_next_gc_bytes 4.473924e+06
# HELP go_memstats_other_sys_bytes Number of bytes used for other system allocations.
# TYPE go_memstats_other_sys_bytes gauge
go_memstats_other_sys_bytes 1.555002e+06
# HELP go_memstats_stack_inuse_bytes Number of bytes in use by the stack allocator.
# TYPE go_memstats_stack_inuse_bytes gauge
go_memstats_stack_inuse_bytes 819200
# HELP go_memstats_stack_sys_bytes Number of bytes obtained from system for stack allocator.
# TYPE go_memstats_stack_sys_bytes gauge
go_memstats_stack_sys_bytes 819200
# HELP go_memstats_sys_bytes Number of bytes obtained by system. Sum of all system allocations.
# TYPE go_memstats_sys_bytes gauge
go_memstats_sys_bytes 8.55884e+06
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
