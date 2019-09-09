---
id: multi-node-deployment
title: 部署示例
sidebar_label: 多节点部署
---

# 多节点部署

本文档介绍了如何在多节点设置中运行 loom。

## 安装

需要在每个节点上执行这些步骤。

1. 选择一个你喜欢的工作目录。在这个例子中, 我们使用 `/home/ubuntu`

    ```bash
    cd /home/ubuntu
    ```

2. 下载二进制文件:

    ```bash
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
    ```

3. 在工作目录中执行 `./loom init` 以初始化配置文件。
4. 添加 `loom.yml` 到工作目录中

    ```yaml
    DPOSVersion: 3
    ```

## 配置

有两个 genesis.json 文件需要组合。

### genesis.json #1 - 在工作目录中

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

### genesis.json＃2 - 在 chaindata / config 中

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

## 运行

首先，我们需要从每个节点获取节点密钥。 转到工作目录并运行 `loom nodekey`：

```bash
$ loom nodekey
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

请记住清楚地记下哪个节点密钥用于哪个节点。 同样重要的是私有IP（或任何可用于节点彼此通信的IP）。 通常，在云环境中，出于安全性和延迟原因，我们使用公共IP。

现在，让我们使用一个包含4个节点的示例：

| 节点 | IP       | 节点密钥                                     |
| -- | -------- | ---------------------------------------- |
| 1  | 10.2.3.4 | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2  | 10.6.7.8 | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3  | 10.3.2.1 | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4  | 10.7.6.5 | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

要运行loom，我们需要告诉每个节点它的对等体。 一般格式是：

```bash
loom run --persistent-peers tcp://<node1_key>@<node1_ip>:46656,tcp://<node2_key>@<node2_ip>:46656,...tcp://<nodeN_key>@<nodeN_ip>:46656
```

让我们使用上表来查看示例。

在节点1上

```bash
loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

在节点2上

```bash
loom run --persistent-peers tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

节点3和节点4也是如此。我们排除节点自己的密钥和IP地址。

**请记住，所有命令都需要在工作目录中执行。**

### systemd 启动脚本

以下启动脚本可通过使用systemd来控制服务。对 `WorkingDirectory` 和/或 `ExecStart` 进行更改以反映你的设置。

注意 `ExecStart`，它直接运行 loom 时使用与上一节相同的概念进行构造。 这意味着每个节点都有不同的启动脚本。

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

把它保存到 `/etc/systemd/system/loom.service`。运行这些操作以激活它:

```bash
sudo systemctl daemon-reload
sudo systemctl start loom.service
```

你现在可以使用以下方法检查输出:

```bash
sudo journalctl -u loom.service
```

当你满足一切都按预期运行时, 执行以下操作将启用该服务, 以便在启动时开始:

```bash
sudo systemctl enable loom.service
```

## 验证

### 监听端口

如果一切顺利, 你将能够看到这些端口在每个节点上打开。

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## 自动化

如果组合配置文件和启动命令似乎需要做很多工作，我们可以使用 Ansible 自动化它。

Ansible 需要在本地安装。

手册在[这里](https://github.com/loomnetwork/loom-playbooks/blob/master/loom-playbook.yml)可见。

您需要更改清单以匹配你的节点和首选工作目录。

**请确保 SSH 和 sudo 访问节点可用**

### 清单：inventory.yaml

清单指定节点及其IP地址。 如果节点只有一个IP，则对`ansible_host`和`private_ip`使用相同的IP。 Ansible 使用`ansible_host`连接到主机，而节点使用`private_ip`进行相互通信。

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

使用节点的详细信息修改清单后，执行手册：

```bash
ansible-playbook -i inventory.yml -vv loom-playbook.yml
```

## 更多自动化：Vagrant

还包含一个 Vagrantfile 来配置完整群集。 Ansible 需要安装在主机上。

它使用 VirtualBox provider 进行测试。 在一台像样的机器上创建和配置4个节点只需不到两分钟。

在需要时, 可能会更改下列变量。

```ruby
# Vagrant创建的集群大小
num_instances = 4

# 专用网络前缀
private_network_prefix = "172.31.99."

# 构建编号
loom_build = "build-208"
```

注意: Vagrant 创建自己的清单, 因此 `inventory.yml` 未使用。
