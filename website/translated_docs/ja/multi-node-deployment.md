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
        wget https://private.delegatecall.com/loom/linux/build-133/loom

3. ワーキングディレクトリで`loom init`を実行し、設定ファイルを初期化しよう。
4. ワーキングディレクトリ内の `genesis.json` を更新 
        json
        {
            "contracts": [
            ]
        }

5. Add `loom.yml` in the working directory: 
        yaml
        QueryServerHost: "tcp://0.0.0.0:9999"

## 設定

ワーキングディレクトリにあるフォルダ`chaindata/config`の中を見てみよう。 `genesis.json`という名前のファイルが見つかるはずだ。 ワーキングディレクトリにあるものと混同しないようにしよう。 このファイルは以下のようなものだ:

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

次に各ノードから全ての`validators`を収集して結合し、配列にしよう。 今度は全ノードにあるこのファイルを、結合したファイルへと置き換えなくてはならない。 ２ノードのクラスタは、このようになるはずだ:

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
loom run tcp://<node1_key>@<node1_ip>:46656,tcp://<node2_key>@<node2_ip>:46656,...tcp://<nodeN_key>@<nodeN_ip>:46656
```

上の表を用いた例を見ていこう。

ノード 1にて:

```bash
loom run tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
```

ノード２にて:

```bash
loom run tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
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

これを`/etc/systemd/system/loom.service`へ保存し、アクティベートするために以下を実行しよう:

```bash
sudo systemctl daemon-reload
sudo systemctl start loom.service
```

以下を使ってアウトプットを検証できる:

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
tcp        0      0 :::9999                 0.0.0.0:*               LISTEN      2135/loom
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## 自動化

If combining the configuration files and startup commands seems to be a lot of work, we have a way to automate it using Ansible.

Ansible needs to be installed locally.

The playbook is available [here](https://github.com/loomnetwork/loom-playbooks/blob/master/loom-playbook.yml)

You will need to change the inventory to match your nodes and preferred working directory.

**Please ensure SSH and sudo access to the nodes are available**

### Inventory: inventory.yaml

The inventory specifies the nodes and their IP addresses. If the node only have one IP, use same for both `ansible_host` and `private_ip`. `ansible_host` is used by Ansible to connect to the host, while `private_ip` is used by the nodes to communicate with each other.

```yaml
---
all:
  vars:
    loom_build: build-132
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

After modifying the inventory with the details of the nodes, execute the playbook:

```bash
ansible-playbook -i inventory.yml -vv loom-playbook.yml
```

## More Automation: Vagrant

There is also a Vagrantfile included to provision a full cluster. Ansible needs to be installed on the host machine.

It is tested with VirtualBox provider. It takes less than two minutes on a decent machine to create and provision 4 nodes.

The following variables may be changed when needed.

```ruby
# Size of the cluster created by Vagrant
num_instances = 4

# Private Network Prefix
private_network_prefix = "172.31.99."

# Build numbers
loom_build = "build-132"
```

Note: Vagrant creates its own inventory so `inventory.yml` is not used.