---
id: extdev-release-notes
title: Extdev Release Notes
sidebar_label: Extdev Release Notes
---

## Overview

Reverse chronology order of release notes.

## Extdev Build 1286 Hard Fork - 2019/09/26

This is a maintenance release that reverts the new EVM tx hash generation algo introduced in build 1283. The hard fork will activate when the `receipts:v3.4` feature flag is enabled.

If you’re running a non-validator node on an earlier build it will stop processing blocks once it detects the `receipts:v3.4` feature flag has been activated, upgrade to build 1286 and the node should resume processing blocks.
