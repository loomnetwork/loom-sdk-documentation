---
id: common-issues
title: 일반적인 이슈
---
우리는 일반적인 이슈들을 해결하고 매 릴리즈를 통해 이를 개선하기 위해서 노력하고 있습니다.

여기에 각 릴리즈별로 사람들이 접하는 일반적인 이슈들을 기록할 것입니다.

1) "접속이 되기 전에 Plugin이 종료됨"

    <br />plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    
    

이것은 보통 죽여야 하는 프로세스가 있음을 의미합니다.

    ps -ef | grep blueprint
    kill -9 xxxx 
    

blueprint를 컨트랙트 이름으로 변경하고, xxx는 프로세스 아이디를 의미합니다