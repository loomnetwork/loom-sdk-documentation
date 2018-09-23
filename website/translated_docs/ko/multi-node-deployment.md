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
loom run --persistent-peers tcp://<node1_key>@<node1_ip>:46656,tcp://<node2_key>@<node2_ip>:46656,...tcp://<nodeN_key>@<nodeN_ip>:46656
```

위 테이블을 사용하는 예제를 봅시다.

노드 1:

```bash
loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

노드 2:

```bash
loom run --persistent-peers tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:46656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:46656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:46656
```

노드 3와 노드 4도 동일하게 적용됩니다. 우리는 노드 자신의 키와 IP주소는 제외합니다.

**모든 커맨드는 작업 디렉토리 내에서 실행되어야 한다는 것을 잊지마세요.**

### systemd Startup Script

다음 startup script는 systemd를 이용해서 서비스를 컨트롤하는데 사용됩니다. 설정이 반영되도록 `WorkingDirectory`와/또는 `ExecStart`을 변경하세요.

`ExecStart`을 주목하세요, loom을 직접 실행했던 이전 섹션과 동일한 컨셉으로 구성되었습니다. 이것은 각 노드가 다른 startup script를 가진다는 것을 의미합니다.

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

`/etc/systemd/system/loom.service`에 저장하세요. 활성화를 위해서 실행하세요:

```bash
sudo systemctl daemon-reload
sudo systemctl start loom.service
```

다음과 같이 출력을 검사할 수 있습니다:

```bash
sudo journalctl -u loom.service
```

의도한 대로 모든것이 구동 되었다고 판단될때, 다음을 실행하면 부팅시에 시작되도록 서비스를 활성화 할 것입니다:

```bash
sudo systemctl enable loom.service
```

## 검증하기

### 리스닝 포트

모든 것이 잘 되고 있다면, 각 노드에서 이런 포트가 열려 있는 것을 볼 수 있을 것입니다.

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::46656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## 자동화

설정 파일과 startup 커맨드를 조합하는 것이 많은 노력이 들어간다면, Ansible을 사용하여 자동화하는 방법이 있습니다.

Ansible 로컬에 설치되어야 합니다.

Playbook은 [여기서](https://github.com/loomnetwork/loom-playbooks/blob/master/loom-playbook.yml) 확인 가능합니다

여러분의 노드와 작업 디렉토리를 맞추기위해서 inventory를 변경해야할 필요가 있습니다.

**노드에 SSH와 sudo 권한이 가능하도록 하세요**

### Inventory: inventory.yaml

Inventory는 노드와 노드의 IP 주소를 지정합니다. 노드가 오직 하나의 IP만 가지고 있다면, `ansible_host`와 `private_ip`에 동일한 것을 사용하세요. Ansible는 `ansible_host`를 host와 연결하기 위해서 사용하며, 반면에 `private_ip`는 노드들이 서로 통신하기 위해서 사용된다.

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

노드의 세부사항과 함께 inventory을 수정한 후, playbook을 실행하세요:

```bash
ansible-playbook -i inventory.yml -vv loom-playbook.yml
```

## 더 많은 자동화: Vagrant

전체 cluster를 provision 하기 위해 포함된Vagrantfile도 있습니다. Ansible는 호스트 머신에 설치되어야 합니다.

VirtualBox provider로 테스트 됩니다. 왠만한 머신에서 4개의 노드를 생성하고 provision 하는데 2분이 채 걸리지 않습니다.

다음 변수는 필요에 따라 변경될 수 있습니다.

```ruby
# Vagrant로 생성된 cluster 사이즈
num_instances = 4

# Private Network Prefix
private_network_prefix = "172.31.99."

# 빌드 넘버
loom_build = "build-208"
```

주의: Vagrant는 자신만의 inventory를 만들기 때문에 `inventory.yml`이 사용되지 않습니다.