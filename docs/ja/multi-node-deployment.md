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

    ```bash
    cd /home/ubuntu
    ```

2. バイナリをダウンロード

    ```bash
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
    ```

3. ワーキングディレクトリで`./loom init`を実行し、設定ファイルを初期化しよう。
4. ワーキングディレクトリに `loom.yml` を追加しよう。

    ```yaml
    DPOSVersion: 3
    ```

## 設定

２つのgenesis.jsonファイルを組み合わせなくてはならない。

### genesis.json #1 - ワーキングディレクトリ内

The `genesis.json` that was generated should look something like below. You should **NOT** copy the file below as it is an example. Use the file generated in your working directory.

```json
{
  "contracts": [
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "coin",
      "location": "coin:1.0.0",
      "init": null
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "dposV3",
      "location": "dposV3:3.0.0",
      "init": {
        "params": {
          "validatorCount": "21"
        },
        "validators": [
          {
            "pubKey": "2MysikRZ8Yzk3KPDVEl/g2tHSyX0i3DGrAMwtDcYH10=",
            "power": "10"
          }
        ]
      }
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "addressmapper",
      "location": "addressmapper:0.1.0",
      "init": null
    },
    {
      "vm": "plugin",
      "format": "plugin",
      "name": "chainconfig",
      "location": "chainconfig:1.0.0",
      "init": {
        "owner": {
          "chainId": "default",
          "local": "aMt0mxDIxz5MCYKp9c0jEzG1en8="
        },
        "params": {
          "voteThreshold": "67",
          "numBlockConfirmations": "10"
        },
        "features": [
          {
            "name": "test",
            "status": "WAITING"
          }
        ]
      }
    }
  ]
}
```

Next, collect all `validators` from each node, combine them into an array, and save everything to a new file. This old file will now need to be replaced with the new combined file. Do this for all nodes. For a two-node cluster, the **validators** array should look something like this:

```json
  "validators": [
    {
      "pubKey": "2MysikRZ8Yzk3KPDVEl/g2tHSyX0i3DGrAMwtDcYH10=",
      "power": "10"
    },
    {
      "pubKey": "gCn5WayR3cgQjNlNXYiBSYgQ3c1pGIsFWajVGczByZulGa09mb",
      "power": "10"
    }
  ]
```

### genesis.json #2 - chaindata/config 内

You will find it at `chaindata/config/genesis.json`. It is not to be confused with the one in the working directory. You should **NOT** copy the file below as it is an example and it should look something like:

```json
{
  "genesis_time": "2019-06-20T08:58:17.011337021Z",
  "chain_id": "default",
  "consensus_params": {
    "block_size": {
      "max_bytes": "22020096",
      "max_gas": "-1"
    },
    "evidence": {
      "max_age": "100000"
    },
    "validator": {
      "pub_key_types": [
        "ed25519"
      ]
    }
  },
  "validators": [
    {
      "address": "825F1AE812A4395EFF0F88A032AAB2CE42F120EE",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "2MysikRZ8Yzk3KPDVEl/g2tHSyX0i3DGrAMwtDcYH10="
      },
      "power": "10",
      "name": ""
    }
  ],
  "app_hash": ""
}
```

Next, collect all the `validators` from each node, combine them into an array, and save everything to a new file. The old file will now need to be replaced with the new combined file. Do this for all nodes. For a two-node cluster, the **validators** array should look something like this:

```json
  "validators": [
    {
      "address": "825F1AE812A4395EFF0F88A032AAB2CE42F120EE",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "2MysikRZ8Yzk3KPDVEl/g2tHSyX0i3DGrAMwtDcYH10="
      },
      "power": "10",
      "name": ""
    },
    {
      "address": "825F1AE812A4395EFF0F88A032AAB2CE42F120EE",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "gCn5WayR3cgQjNlNXYiBSYgQ3c1pGIsFWajVGczByZulGa09mb"
      },
      "power": "10",
      "name": ""
    }
  ],
```

## 起動

まず、各ノードのノードキーを取得する必要がある。ワーキングディレクトリの`loom nodekey`を実行しよう:

```bash
$ loom nodekey
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

ノードキーがどのノードのものか、はっきりとわかるようにしておくことを忘れないように。 またプライベートIP(もしくはノードが互いに通信し合うのに有効なIP)も同じく重要だ。 一般に、クラウド環境ではセキュリティとレイテンシのため、パブリックIPを使う。

では４ノードのサンプルを使用してみよう:

| ノード | IP       | ノードキー                                    |
| --- | -------- | ---------------------------------------- |
| 1   | 10.2.3.4 | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2   | 10.6.7.8 | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3   | 10.3.2.1 | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4   | 10.7.6.5 | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

Loomを実行するには、各ノードにそのピアについて伝える必要がある。一般的なフォーマットはこうだ:

```bash
loom run --persistent-peers tcp://<node1_key>@<node1_ip>:46656,tcp://<node2_key>@<node2_ip>:46656,...tcp://<nodeN_key>@<nodeN_ip>:46656
```

上の表を用いた例を見ていこう。

ノード 1にて:

```bash
loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

ノード２にて:

```bash
loom run --persistent-peers tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

ノード３、ノード４についても同じだ。ノード固有のキーとIPアドレスは除く。

**全コマンドはワーキングディレクトリ内から実行されなくてはならないことを覚えておこう。**

### systemdスタートアップスクリプト

次のスタートアップスクリプトはsystemdを使ったサービスをコントロールするために使用することができる。`WorkingDirectory`および/または`ExecStart`を変更して、あなたの設定を反映させよう。

Loomを直接実行する場合、`ExecStart`は前のセクションと同じコンセプトを使用する構成となっていることに気をつけよう。これは、各ノードが異なるスタートアップスクリプトを持っているという意味である。i

```ini
[Unit]
Description=Loom
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/home/ubuntu/loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
Restart=always
RestartSec=2
StartLimitInterval=0
LimitNOFILE=500000
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

これを`/etc/systemd/system/loom.service`へ保存し、アクティベートするために以下を実行しよう:

```bash
sudo systemctl daemon-reload
sudo systemctl start loom.service
```

以下を使ってアウトプットをチェック可能だ:

```bash
sudo journalctl -u loom.service
```

すべてが思った通りに動いていれば、以下を実行することでブート時にサービスが開始されるようになる。

```bash
sudo systemctl enable loom.service
```

## 検証

### ポートのリッスン

全てうまくいくと、各ノードに開かれたこれらのポートを見ることができる。

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## 自動化

設定ファイルとスタートアップコマンドを組み合わせるのが手間であれば、Ansibleを使用して自動化する方法がある。

Ansibleをローカルにインストールする必要がある。

プレイブックは、[ここ](https://github.com/loomnetwork/loom-playbooks/blob/master/loom-playbook.yml)から利用できる。

自分のノード及び選択したワーキングディレクトリと一致するように、インベントリを変更しなくてはならない。

**ノードへのSSH及びsudoアクセスが利用可能か確認しよう。**

### インベントリ: inventory.yaml

このインベントリは、ノードとそのIPアドレスを指定する。 ノードが１つのIPしか持たない場合、 `ansible_host`と`private_ip`の両方に 同じものを使用しよう。 `ansible_host`はAnsibleによってホストに接続するために使用され、一方`private_ip`はノードが互いに通信するためにノードにより使用される。

```yaml
---
all:
  vars:
    loom_build: build-404
    ansible_ssh_common_args: '-o StrictHostKeyChecking=no'
    working_directory: /home/ubuntu
    user: ubuntu
  hosts:
    loom-0:
      ansible_host: 1.2.3.4
      private_ip: 10.2.3.4
    loom-1:
      ansible_host: 5.6.7.8
      private_ip: 10.6.7.8
    loom-2:
      ansible_host: 4.3.2.1
      private_ip: 10.3.2.1
    loom-3:
      ansible_host: 8.7.6.5
      private_ip: 10.7.6.5
```

インベントリのノード詳細を変更したら、プレイブックを実行しよう:

```bash
ansible-playbook -i inventory.yml -vv loom-playbook.yml
```

## さらなる自動化: Vagrant

また完全なクラスタをプロビジョニングするためのVagrantfileも含まれている。Ansibleがホストマシンにインストールされていることが必要だ。

これはVirtualBoxプロバイダを使ってテストされる。それなりのマシン上であれば、４ノードを作成しプロビジョニングするのに２分もかからない。

以下の変数は必要に応じて変更されることがある。

```ruby
# Vagrantによって作成されたクラスタサイズ
num_instances = 4

# プライベートネットワークのプレフィックス
private_network_prefix = "172.31.99."

# ビルド番号
loom_build = "build-208"
```

注: Vagrantは独自のインベントリを作成するので、`inventory.yml`は使用されない。
