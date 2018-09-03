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
    wget https://private.delegatecall.com/loom/linux/build-404/loom
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

Note: `loom` and `etherboycli` can be placed anywhere in your `$PATH` so you don't have to always execute with `./`. However, `etherboycore.0.0.1` must always be placed in `$WORKING_DIRECTORY/contracts/etherboycore.0.0.1`.

## Running

There are two ways to run - directly, or via systemd (or any process control system you prefer)

### Direct execution

Execute `loom run` in the working directory to run the service:

```bash
./loom run
I[05-16|06:06:16.970] Using simple log event dispatcher
I[05-16|06:06:19.999] Starting RPC HTTP server on tcp://0.0.0.0:9999 module=query-server
```

This will run Etherboy in the foreground and print its output to the console. For better process management, look at the next section.

### systemd Startup Script

The following startup script can be used to control the service using systemd. Make changes to `WorkingDirectory` and/or `ExecStart` to reflect your setup.

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

Save it to `/etc/systemd/system/etherboy.service`. Run these to activate it:

```bash
sudo systemctl daemon-reload
sudo systemctl start etherboy.service
```

You may now inspect the output using:

```bash
sudo journalctl -u etherboy.service
```

When satisfied everything is running as intended, executing the following will enable the service so that it is started at boot:

```bash
sudo systemctl enable etherboy.service
```

## Verifying

### Listening ports

If all is well, you will be able to see these ports opened in your server.

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46657                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46658                :::*                    LISTEN      14327/loom
```

### The CLI - etherboycli

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