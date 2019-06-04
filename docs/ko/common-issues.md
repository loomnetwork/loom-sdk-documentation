---
id: common-issues
title: Common Issues
---

We strive to resolve common issues and make them better with each release.

Inbetween releases we keep common issues here that people run into.

## 1) "Plugin Exited before we could connect"

### Error message

    <br />plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    
    

### Problem

This usually means there is a process hanging around that needs to be killed.

### Solution

    ps -ef | grep blueprint
    kill -9 xxxx 
    

Change blueprint to whatever the name of the contract is, and then replace the `xxx` with your process id.