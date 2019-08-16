---
id: multi-node-deployment
title: Example Deployment
sidebar_label: Multi Node Deployment
---

# Multi-Node Deployment

This documentation describes how to run loom in a multi-node setup.

## Installation

The following steps need to be executed on each node:

1. Choose a working directory of your choice. In this example, we are using `/home/ubuntu`

```bash
    cd /home/ubuntu
    ```

2. Download the binaries:

    ```bash
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
    ```

3. Execute `./loom init` in the working directory to initialize config files.
4. Add `loom.yml` in the working directory:

    ```yaml
    RPCBindAddress: "tcp://0.0.0.0:46658"
    DPOSVersion: 3
    ```

## Configuration

There are two genesis.json files that need to be combined.

### genesis.json #1 - in the working directory

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

### genesis.json #2 - inside chaindata/config

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

## Running

First, we need to get node keys from each node. Go to the working directory and run `loom nodekey`:

```bash
loom nodekey
```

You should see something like this:

```text
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

Do remember to clearly make a note which node key is for which node. Also important is the private IP (or any IP that are available for the nodes to communicate with each other). Generally, in a cloud environment, we use public IPs for security and latency reasons.

Now, let's use an example with 4 nodes:

| Node | IP       | Node key                                 |
| ---- | -------- | ---------------------------------------- |
| 1    | 10.2.3.4 | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2    | 10.6.7.8 | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3    | 10.3.2.1 | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4    | 10.7.6.5 | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

To run loom, we need to tell each node about its peers. The general format is:

```bash
loom run --persistent-peers tcp://<node1_key>@<node1_ip>:26656,tcp://<node2_key>@<node2_ip>:26656,...tcp://<nodeN_key>@<nodeN_ip>:26656
```

Let's see examples by using the table above.

On node 1:

```bash
loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:26656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:26656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:26656
```

On node 2:

```bash
loom run --persistent-peers tcp://47cd3e4cc27ac621ff8bc59b776fa228adab827e@10.2.3.4:26656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:26656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:26656
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
ExecStart=/home/ubuntu/loom run --persistent-peers tcp://e728bada822af677b95cb8ff126ca72cc4e3dc74@10.6.7.8:26656,tcp://4953e5726664985cc1cc92ae2edcfc6e089ba50d@10.3.2.1:26656,tcp://02c90b57d241c3c014755ecb07e0c0d232e07fff@10.7.6.5:26656
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

### Listening Ports

If all is well, you will be able to see these ports opened in each node.

```bash
$ sudo netstat -tpnl
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::26656                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46657                :::*                    LISTEN      2135/loom
tcp6       0      0 :::46658                :::*                    LISTEN      2135/loom
```

## Automation

If combining the configuration files and startup commands seems to be a lot of work, we have a way to automate it using Ansible.

> Note that Ansible needs to be installed locally.

The playbook is available [here](https://github.com/loomnetwork/loom-playbooks/blob/master/loom-playbook.yml).

You will need to change the inventory to match your nodes and preferred working directory.

**Please ensure SSH and sudo access to the nodes are available**

### Inventory: inventory.yaml

The inventory specifies the nodes and their IP addresses. If the node only has one IP, use the same for both `ansible_host` and `private_ip`. `ansible_host` is used by Ansible to connect to the host, while `private_ip` is used by the nodes to communicate with each other.

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

The following variables may be changed when needed:

```ruby
# Size of the cluster created by Vagrant
num_instances = 4

# Private Network Prefix
private_network_prefix = "172.31.99."

# Build numbers
loom_build = "build-208"
```

Note: Vagrant creates its own inventory so `inventory.yml` is not used.