---
id: etherboy-backend
title: Etherboy 백엔드
sidebar_label: Etherboy 백엔드
---
이 문서는 Etherboy DAppChain을 단일 서버 인스턴스 (64-bit Linux 인스턴스) 에서 구동하는 방법에 대해서 설명합니다.

## 설치하기

1. 작업 디렉토리를 선택하세요. 이 예제에서 이 예제에서 우리는 다음을 사용합니다 `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. 바이너리를 다운로드하세요:
    
    ```bash
    wget https://private.delegatecall.com/loom/linux/stable/loom
    wget https://private.delegatecall.com/etherboy/linux/build-53/etherboycli
    chmod +x loom etherboycli
    
    mkdir contracts
    wget -O contracts/etherboycore.so https://private.delegatecall.com/etherboy/linux/build-53/etherboycore.0.0.1
    ```

3. 설정 파일을 초기화하기 위해서 작업 디렉토리에서 `loom init`을 실행하세요.
4. 작업 디렉토리에서 `genesis.json`를 업데이트 하세요:
    
    ```json
    {
        "contracts": [
            {
                "vm": "plugin",
                "name": "etherboycore",
                "format": "plugin",
                "location": "etherboycore:0.0.1",
                "init": {
    
                }
            }
        ]
    }
    ```

5. 작업 디렉토리에 `loom.yml` 파일을 추가하세요 
        yaml
        RPCBindAddress: "tcp://0.0.0.0:46658"

주의: `loom`과 `etherboycli`는 여러분의 `$PATH` 내의 어느 곳이든 위치시킬 수 있습니다. 그래서 항상 `./`을 붙여서 실행시킬 필요는 없습니다. 하지만, `etherboycore.0.0.1`는 반드시 `$WORKING_DIRECTORY/contracts/etherboycore.0.0.1`에 위치하여야 합니다.

## 실행하기

두가지 실행방법이 있습니다 - 직접실행, 혹은 systemd를 통한 방법(또는 여러분이 선호하는 어떠한 프로세스 컨트롤 시스템)

### 직접 실행

서비스를 실행하기 위해서 작업 디렉토리에서 `loom run`를 실행하세요:

```bash
./loom run
I[05-16|06:06:16.970] Using simple log event dispatcher
```

이것은 포그라운드에서 Etherboy를 실행하고 콘솔에 결과를 출력합니다. 더 나은 프로세스 관리를 위해서는 다음 섹션을 보세요.

### systemd Startup Script

다음 startup script는 systemd를 이용해서 서비스를 컨트롤하는데 사용됩니다. 설정이 반영되도록 `WorkingDirectory`와/또는 `ExecStart`을 변경하세요.

```ini
[Unit]
Description=Etherboy
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/home/ubuntu/loom run
Restart=always
RestartSec=2
StartLimitInterval=0
LimitNOFILE=500000
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

`/etc/systemd/system/etherboy.service`에 저장하세요. 활성화를 위해서 실행하세요:

```bash
sudo systemctl daemon-reload
sudo systemctl start etherboy.service
```

다음과 같이 출력을 검사할 수 있습니다:

```bash
sudo journalctl -u etherboy.service
```

의도한 대로 모든것이 구동 되었다고 판단될때, 다음을 실행하면 부팅시에 시작되도록 서비스를 활성화 할 것입니다:

```bash
sudo systemctl enable etherboy.service
```

## 검증하기

### 리스닝 포트

모든 것이 잘 되고 있다면, 여러분의 서버에서 이런 포트가 열려 있는 것을 볼 수 있을 것입니다.

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46657                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46658                :::*                    LISTEN      14327/loom
```

### CLI - etherboycli

```bash
$ pwd
/home/ubuntu
$ ./etherboycli genkey -k key
$ ./etherboycli create-acct -k key
<nil>
$ ./etherboycli set -k key
<nil>

+ ./etherboycli get -k key
{"Value":0}
```