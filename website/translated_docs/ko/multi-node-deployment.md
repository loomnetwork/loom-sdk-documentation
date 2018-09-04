---
id: multi-node-deployment
title: 배포 예제
sidebar_label: 멀티 노드 배포
---
# 멀티 노드 배포

이 문서는 멀티 노드 셋업에서 loom을 구동하는 방법에 대해서 설명합니다.

## 설치하기

이 단계는 각 노드에서 실행되어야 합니다.

1. 여러분만의 작업 디렉토리를 선택하세요. 이 예제에서는 다음을 사용합니다 `/home/ubuntu` 
        bash
        cd /home/ubuntu

2. 바이너리를 다운로드하세요: 
        bash
        wget https://private.delegatecall.com/loom/linux/build-208/loom
        chmod +x loom

3. 설정 파일을 초기화하기 위해서 작업 디렉토리에서 `./loom init`을 실행하세요.
4. 작업 디렉토리에 `loom.yml` 파일을 추가하세요 
        yaml
        RPCBindAddress: "tcp://0.0.0.0:46658"

## 구성하기

두 개의 genesis.json 파일을 결합 할 필요가 있습니다.

### genesis.json #1 - 작업디렉토리에 있는

`genesis.json` 파일은 다음과 같습니다:

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
      "name": "dpos",
      "location": "dpos:1.0.0",
      "init": {
        "params": {
          "witnessCount": "21",
          "electionCycleLength": "604800",
          "minPowerFraction": "5"
        },
        "validators": [
          {
            "pubKey": "RLYcH6fzeg4k5bDtGwRi/sM2UhO2Yw/kLdtrvvvn6CE=",
            "power": "10"
          }
        ]
      }
    }
  ]
}
```

다음으로, 각 노드로부터 모든 `validators`를 수집하고, 하나의 배열에 그것들을 병합하세요. 이 파일은 이제 모든 노드에서 결합 된 파일로 대체되어야 합니다. 두개의 node cluster 라면, 아래와 같은 모습일 것입니다:

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
      "name": "dpos",
      "location": "dpos:1.0.0",
      "init": {
        "params": {
          "witnessCount": "21",
          "electionCycleLength": "604800",
          "minPowerFraction": "5"
        },
        "validators": [
          {
            "pubKey": "RLYcH6fzeg4k5bDtGwRi/sM2UhO2Yw/kLdtrvvvn6CE=",
            "power": "10"
          },
          {
            "pubKey": "gCn5WayR3cgQjNlNXYiBSYgQ3c1pGIsFWajVGczByZulGa09mb",
            "power": "10"
          }
        ]
      }
    }
  ]
}
```

### genesis.json #2 - chaindata/config 내부에 있는

여러분은 `genesis.json` 파일을 찾을 수 있을 것입니다. 작업 디렉토리에 있는 것과 혼동하지 마세요. 이런 모습일 것입니다:

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
          "value": "RLYcH6fzeg4k5bDtGwRi/sM2UhO2Yw/kLdtrvvvn6CE"
      }
    }
  ],
  "app_hash": ""
}
```

다음으로, 각 노드로부터 모든 `validators`를 수집하고, 하나의 배열에 그것들을 병합하세요. 이 파일은 이제 모든 노드에서 결합 된 파일로 대체되어야 합니다. 두개의 node cluster 라면, 아래와 같은 모습일 것입니다:

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
          "value": "RLYcH6fzeg4k5bDtGwRi/sM2UhO2Yw/kLdtrvvvn6CE"
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

## 실행하기

먼저, 각 노드로부터 노드 키를 얻는 것이 필요합니다. 작업 디렉토리로 가서 `loom nodekey`를 실행하세요:

```bash
$ loom nodekey
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

어떤 노드 키가 어떤 노드인지를 명확하게 기록하는 것을 잊지 마십시오. Private IP (또는 노드가 서로 통신 할 수 있는 IP) 도 중요합니다. 일반적으로, 클라우드 환경에서는 security와 latency 때문에 public IP를 사용합니다.

이제, 4개의 노드를 가지고 있는 있는 예제를 사용해 봅시다:

| Node | IP       | Node key                                 |
| ---- | -------- | ---------------------------------------- |
| 1    | 10.2.3.4 | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2    | 10.6.7.8 | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3    | 10.3.2.1 | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4    | 10.7.6.5 | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

Loom을 실행하기 위해서, 각 노드에게 피어가 누구인지 알려주어야 합니다. 일반적인 포맷은 다음과 같습니다:

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
ExecStart=/home/ubuntu/loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.7.6.5:46656
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
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## Automation

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
loom_build = "build-208"
```

Note: Vagrant creates its own inventory so `inventory.yml` is not used.