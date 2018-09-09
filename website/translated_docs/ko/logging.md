* * *

id: logging title: 로깅 sidebar_label: 로깅

* * *

## 개요

Loom 설정가능한 로깅을 내장하고 있습니다. 사용자는 로그 레벨과 로그 목적지를 설정할 수 있습니다.

## Loom SDK 로깅

### 로그 레벨 설정하기

Loom sdk에는 두가지 유형의 로그가 있습니다. 첫번째는 블록체인 트랜잭션과 컨센서스 이벤트에 관한 로그입니다. 두번째는 loom sdk가 생성한 로그와 내보낸 이벤트 같은 것들에 관한 것입니다.

로그 레벨을 설정하려면 여러분의 `loom.yaml` 파일을 다음과 같이 설정하세요.

    LoomLogLevel: debug # loom sdk에서 내보내는 이벤트에 대한 로그 레벨 설정
    BlockchainLogLevel: error # 블록체인 로그에 관한 로그 레벨 설정
    

`LoomLogLevel`과 `BlockchainLogLevel`에 대한 기본값은 각각 `info`와 `error`입니다.

### 로그 목적지 설정하기

현재 loom 로그에 대해서는 파일 타겟을 지원합니다.

    LogDestination: "file://loom.log" # loom.log는 기본 타겟입니다.
    

stderr로 로깅을 하려면 `file://-`로 목적지를 지정하세요

## 컨트랙트 로깅

로그 레벨와 목적지에 대한 설정이 분리되어 있듯이 컨트랙트 로깅도 분리되어 있습니다. 이것들은 환경 변수를 사용해서 세팅됩니다. 예: `CONTRACT_LOG_LEVEL=debug CONTRACT_LOG_DESTINATION="file://-" $LOOM_EXE run`

이것은 컨트랙트 로그 레벨을 `debug`로 목적지를 stderr로 설정합니다. 로그 레벨과 목적지에 대한 기본값은 각각 `info` and `file://contract.log` 입니다.

### 컨트랙트에서 로깅하기

The contract context has a pre-configured logger that can be used for structured logging. For example

    ctx.Logger().Info("Created account", "owner", owner, "address", addr)
    

will generate a log line like

    ts=2018-05-13T02:06:49.817229589Z module=loom level=info _msg="Created account" owner=godbole4 address="\ufffd8\ufffd\ufffd\ufffd\ufffd\ufffd$Y+H\ufffd\u0012\u000c]\u001a\ufffd\ufffd\ufffd\ufffd"
    

Available methods on the context logger are `Error`, `Warn`, `Info`, and `Debug`