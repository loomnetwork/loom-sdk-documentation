---
id: common-issues
title: 常见问题
---
我们努力地解决常见问题，并在每一个新版本中使它们变得更好。

在版本发布之间，我们把人们遇到的常见问题放在这里。

1) 在我们可以链接之前，插件退出了。

    plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    

This usually means there is a process hanging around that needs to be killed

    ps -ef | grep blueprint
    kill -9 xxxx 
    

Change blueprint to whatever the name of the contract is, and then the xxx is the process id