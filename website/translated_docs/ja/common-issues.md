---
id: common-issues
title: 共通課題
---
我々は共通の課題を解決し、各リリースごとに改善するよう努めている。

リリースの合間で、人々が遭遇する共通の課題についてここに記しておこう。

1) "Plugin Exited before we could connect"

    <br />plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    
    

This usually means there is a process hanging around that needs to be killed

    ps -ef | grep blueprint
    kill -9 xxxx 
    

Change blueprint to whatever the name of the contract is, and then the xxx is the process id