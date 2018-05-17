---
id: etherboy-deployment
title: サンプルのデプロイ
sidebar_label: Etherboyのデプロイ
---
# Etherboy

このドキュメンテーションでは、Etherboyを単一サーバーインスタンス(64ビットのLinuxインスタンス)で稼働させる方法を説明する。

## インストール

1. ワーキングディレクトリを自分で選択しよう。この例で使っているのは: `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. バイナリをダウンロード
    
    ```bash
    wget https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-94/loom
    wget https://storage.googleapis.com/private.delegatecall.com/etherboy/linux/build-53/etherboycli
    chmod +x loom etherboycli
    
    mkdir contracts
    wget -O contracts/etherboycore.so https://storage.googleapis.com/private.delegatecall.com/etherboy/linux/build-53/etherboycore.so
    ```

3. ワーキングディレクトリに`genesis.json`を作成しよう。
    
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

4. Execute `loom init` in the working directory to initialize config files.

Note: `loom` and `etherboycli` can be placed anywhere in your `$PATH` so you don't have to always execute with `./`. However, `etherboycore.so` must always be placed in `$WORKING_DIRECTORY/contracts/etherboycore.so`.

## Running

There are two ways to run - directly, or via systemd (or any process control system you prefer)

### Direct execution

Execute `loom run` in the working directory to run the service:

```bash
./loom run
I[05-16|06:06:16.970] Using simple log event dispatcher
I[05-16|06:06:19.999] Starting RPC HTTP server on tcp://127.0.0.1:9999 module=query-server
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

## 検証

### ポートのリッスン

全てうまくいくと、あなたのサーバーに開かれたこれらのポートを見ることができる。

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46657                :::*                    LISTEN      14327/loom
tcp6       0      0 :::46658                :::*                    LISTEN      14327/loom
tcp6       0      0 :::9999                 :::*                    LISTEN      14327/loom
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