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

4. ワーキングディレクトリで`loom init`を実行し、設定ファイルを初期化しよう。

注: `loom`と`etherboycli`は`$PATH`をどこにでも通すことができるので、常に`./`で実行する必要はない。 しかしながら、`etherboycore.so`は常に`$WORKING_DIRECTORY/contracts/etherboycore.so`に置かれていなくてはならない。

## 起動

起動するには、直接的なやり方、もしくはsystemd(またはお好きなプロセス制御システム)を通して行うやり方の2つの方法がある。

### 直接的な実行

ワーキングディレクトリで`loom run`を実行し、サービスを起動しよう:

```bash
./loom run
I[05-16|06:06:16.970] Using simple log event dispatcher
I[05-16|06:06:19.999] Starting RPC HTTP server on tcp://127.0.0.1:9999 module=query-server
```

これはフォア グラウンドで Etherboy を実行し、そのアウトプットをコンソールにプリントする。プロセスマネジメントをより良く行うには、次のセクションを見てみよう。

### systemdスタートアップスクリプト

次のスタートアップスクリプトは、systmdを使ったサービスをコントロールするために使用することができる。 `WorkingDirectory`及び/又は`ExecStart`を変更して、あなたのセットアップを反映させよう。

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