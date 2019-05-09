---
id: common-issues
title: 常见问题
---
我们努力地解决常见问题，并在每一个新版本中使它们变得更好。

在版本发布之间，我们把人们遇到的常见问题放在这里。

1) “在我们可以链接之前，插件退出了”

    <br />插件：插件进程退出：path=/bin/sh
    panic: 在我们可以链接之前，插件退出了
    
    

这通常意味着有个进程需要被关闭

    ps -ef | grep blueprint
    kill -9 xxxx 
    

将蓝图更改为合约的名字，然后xxx就是进程id