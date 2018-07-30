---
id: etherboy-backend
title: Etherboy Backend
sidebar_label: Etherboy Backend
---

This documentation explains how to run the Etherboy DAppChain in a single server instance
(any 64-bit Linux instance).

## Installation

1. Choose a working directory of your choice. In this example we are using `/home/ubuntu`
    ```bash
    cd /home/ubuntu
    ```
1. Download the binaries:
    ```bash
    wget https://private.delegatecall.com/loom/linux/build-330/loom
    wget https://private.delegatecall.com/etherboy/linux/build-53/etherboycli
    chmod +x loom etherboycli

    mkdir contracts
    wget -O contracts/etherboycore.so https://private.delegatecall.com/etherboy/linux/build-53/etherboycore.0.0.1
    ```
1. Execute `loom init` in the working directory to initialize config files.
1. Update `genesis.json` in the working directory:
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
1. Add `loom.yml` in the working directory:
    ```yaml
    QueryServerHost: "tcp://0.0.0.0:9999"
    ```


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
