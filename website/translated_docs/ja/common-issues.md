---
id: よくある問題点
title: よくある問題点
---
我々は共通の課題を解決し、各リリースごとに改善するよう努めている。

リリースの合間で、人々が遭遇する共通の課題についてここに記しておこう。

1) "Plugin Exited before we could connect"

    <br />plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    
    

これは通常、killする必要がある無意味に稼働しているがあるということを意味する。

    ps -ef | grep blueprint
    kill -9 xxxx 
    

blueprintをコントラクトの名前であるものに変更しよう。xxxxはプロセスidだ。