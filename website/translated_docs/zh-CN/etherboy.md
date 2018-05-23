---
id: etherboy-部署
title: 部署示例
sidebar_label: Etherboy 部署
---
# Etherboy

本文档说明如何在单个服务器实例 (任何64位Linux实例) 中运行Etherboy。

## 安装

1. 选择一个你喜欢的工作目录。在这个例子中, 我们使用 `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. 下载二进制文件:
    
    ```bash
    wget https://storage.googleapis.com/private.delegatecall.com/loom/linux/build-94/loom
    wget https://storage.googleapis.com/private.delegatecall.com/etherboy/linux/build-53/etherboycli
    chmod +x loom etherboycli
    
    mkdir contracts
    wget -O contracts/etherboycore.so https://storage.googleapis.com/private.delegatecall.com/etherboy/linux/build-53/etherboycore.so
    ```

3. 在工作目录中创建 `genesis.json`:
    
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

4. 在工作目录中执行`loom init`以初始化配置文件。

注意: `loom` 和 `etherboycli` 可以放置在你 `$PATH` 中的任何位置，因此你不必总是使用 `./` 执行。 However, `etherboycore.so` must always be placed in `$WORKING_DIRECTORY/contracts/etherboycore.so`.

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
tcp6       0      0 :::9999                 :::*                    LISTEN      14327/loom
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