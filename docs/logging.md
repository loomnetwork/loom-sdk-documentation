---
id: logging
title: Logging
sidebar_label: Logging
---

## Overview

Loom has built in logging, that can currently goes to stderr.

## Loom SDK Logging

Set the following in your `loom.yaml` to set logging levels

```
ContractLogLevel: debug # sets log level for events emitted from the contract
BlockchainLogLevel: error # sets log level for the blockchain logs
```


