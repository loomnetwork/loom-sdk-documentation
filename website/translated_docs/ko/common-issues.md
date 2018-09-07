---
id: common-issues
title: 일반적인 이슈
---
우리는 일반적인 이슈들을 해결하고 매 릴리즈를 통해 이를 개선하기 위해서 노력하고 있습니다.

릴리즈 중에도 우리는 여기에 사람들이 접하게 되는 일반적인 이슈를 기록할 것입니다.

1) "우리가 접속할 수 있기전에 Plugin이 종료됨"

    <br />plugin: plugin process exited: path=/bin/sh
    panic: plugin exited before we could connect
    
    

이것은 보통 죽여야 하는 행이 걸린 프로세스가 있음을 의미합니다.

    ps -ef | grep blueprint
    kill -9 xxxx 
    

blueprint를 컨트랙트 이름으로 변경하고, xxx는 프로세스 아이디를 의미합니다