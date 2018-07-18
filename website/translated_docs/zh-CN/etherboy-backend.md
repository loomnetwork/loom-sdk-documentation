---
id: etherboy-backend
title: Etherboy 后端
sidebar_label: Etherboy 后端
---
本文档说明如何在单个服务器实例 (任何64位Linux实例) 中运行Etherboy。

## 安装

1. 选择一个你喜欢的工作目录。在这个例子中, 我们使用 `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. 下载二进制文件:
    
    ```bash
    wget https://private.delegatecall.com/loom/linux/build-288/loom
    wget https://private.delegatecall.com/etherboy/linux/build-53/etherboycli
    chmod +x loom etherboycli
    
    mkdir contracts
    wget -O contracts/etherboycore.so https://private.delegatecall.com/etherboy/linux/build-53/etherboycore.0.0.1
    ```

3. 在工作目录中执行`loom init`以初始化配置文件。
4. 在工作目录中更新 `genesis.json`:
    
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

5. 添加 `loom.yml` 到工作目录中： 
        yaml
        QueryServerHost: "tcp://0.0.0.0:9999"

注意: `loom` 和 `etherboycli` 可以放置在你 `$PATH` 中的任何位置，因此你不必总是使用 `./` 执行。 但是，`etherboycore.0.0.1` 必须总是放在`$WORKING_DIRECTORY/contracts/etherboycore.so`里面。

## 运行

有两种方式可以运行：直接运行或者通过systemd（或任何你喜欢的过程控制系统）。

### 直接运行

在工作目录中执行`loom init`以初始化配置文件。

```bash
./loom run
I[05-16|06:06:16.970] Using simple log event dispatcher
I[05-16|06:06:19.999] Starting RPC HTTP server on tcp://0.0.0.0:9999 module=query-server
```

这将在前台运行Etherboy，并将其输出打印到控制台。要更好地进行流程管理, 请查看下一节。

### systemd启动脚本

以下启动脚本可通过使用systemd来控制服务。对 `WorkingDirectory` 和/或 `ExecStart` 进行更改以反映你的设置。

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

把它保存到`/etc/systemd/system/etherboy.service`。运行这些操作以激活它:

```bash
sudo systemctl daemon-reload
sudo systemctl start etherboy.service
```

你现在可以使用以下方法检查输出:

```bash
sudo journalctl -u etherboy.service
```

当你满足一切都按预期运行时, 执行以下操作将启用该服务, 以便在启动时开始:

```bash
sudo systemctl enable etherboy.service
```

## 验证

### 监听端口

如果一切顺利, 你将能够看到这些端口在你的服务器上打开。

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