---
id: multi-node-deployment
title: サンプルデプロイメント
sidebar_label: マルチノードデプロイメント
---
# マルチノードデプロイメント

このドキュメンテーションでは、マルチノード設定でLoomを実行する方法について説明する。

## インストール

これらの手順を各ノード上で実行する必要がある。

1. ワーキングディレクトリを自分で選択しよう。この例で使っているのは: `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. バイナリをダウンロード 
        bash
        wget https://private.delegatecall.com/loom/linux/build-132/loom

3. ワーキングディレクトリで`loom init`を実行し、設定ファイルを初期化しよう。
4. ワーキングディレクトリ内の `genesis.json` を更新 
        json
        {
            "contracts": [
            ]
        }

## Configuration

In the working directory, look inside the folder `chaindata/config`. You will find a file named `genesis.json`. It is not to be confused with the one in the working directory. It should look like this:

```json
{
  "genesis_time": "0001-01-01T00:00:00Z",
  "chain_id": "default",
  "validators": [
    {
      "name": "",
      "power": 10,
      "pub_key": {
          "type": "ABCD1234ABCD12",
          "value": "bm90aGluZyBzcGVjaWFsIGp1c3QgYSBiYXNlNjQgc3RyaW5nCg=="
      }
    }
  ],
  "app_hash": ""
}
```

Next, collect all the `validators` from each node, then combine them into an array. This file will now need to be replaced with the combined file, in all nodes. For a two node cluster, it should now look like this:

```json
{
  "genesis_time": "0001-01-01T00:00:00Z",
  "chain_id": "default",
  "validators": [
    {
      "name": "",
      "power": 10,
      "pub_key": {
          "type": "AC26791624DE60",
          "value": "bm90aGluZyBzcGVjaWFsIGp1c3QgYSBiYXNlNjQgc3RyaW5nCg=="
      }
    },
    {
      "name": "",
      "power": 10,
      "pub_key": {
          "type": "AC26791624DE60",
          "value": "gCn5WayR3cgQjNlNXYiBSYgQ3c1pGIsFWajVGczByZulGa09mb"
      }
    }
  ],
  "app_hash": ""
}
```

## Running

First, we need to get node keys from each node. Go to the working directory and run `loom nodekey`:

```bash
$ loom nodekey
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

Do remember to clearly make note which node key is for which node. Also important is the private IP (or any IP that are available for the nodes to communicate with each other). Generally, in a cloud environment we use public IPs for security and latency reasons.

Now, let's use an example with 4 nodes:

| Node | IP       | Node key                                 |
| ---- | -------- | ---------------------------------------- |
| 1    | 10.2.3.4 | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2    | 10.6.7.8 | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3    | 10.3.2.1 | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4    | 10.7.6.5 | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

To run loom, we need to tell each node about its peers. The general format is:

```bash
loom run tcp://<node1_key>@<node1_ip>:46656,tcp://<node2_key>@<node2_ip>:46656,...tcp://<nodeN_key>@<nodeN_ip>:46656
```

Let's see examples by using the table above.

On node 1:

```bash
loom run tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
```

On node 2:

```bash
loom run tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
```

The same goes for node 3 and node 4. We exclude the node's own key and IP address.

**Please remember that all commands need to be executed from within the working directory.**

### systemd Startup Script

The following startup script can be used to control the service using systemd. Make changes to `WorkingDirectory` and/or `ExecStart` to reflect your setup.

Notice `ExecStart`, it is constructed using the same concept from the previous section when running loom directly. This means each node has a different startup script.

```ini
[Unit]
Description=Loom
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/home/ubuntu/loom run tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
Restart=always
RestartSec=2
StartLimitInterval=0
LimitNOFILE=500000
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

Save it to `/etc/systemd/system/loom.service`. Run these to activate it:

```bash
sudo systemctl daemon-reload
sudo systemctl start loom.service
```

You may now inspect the output using:

```bash
sudo journalctl -u loom.service
```

When satisfied everything is running as intended, executing the following will enable the service so that it is started at boot:

```bash
sudo systemctl enable loom.service
```

## Verifying

### Listening ports

If all is well, you will be able to see these ports opened in each node.

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:9999          0.0.0.0:*               LISTEN      2135/loom
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```