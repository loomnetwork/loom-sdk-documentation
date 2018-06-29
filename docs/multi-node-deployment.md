---
id: multi-node-deployment
title: Example Deployment
sidebar_label: Multi Node Deployment
---

# Multi Node Deployment

This documentation describes how to run loom in a multi node setup.

## Installation

These steps need to be executed on each node.

1. Choose a working directory of your choice. In this example we are using `/home/ubuntu`
    ```bash
    cd /home/ubuntu
    ```
1. Download the binaries:
    ```bash
    wget https://private.delegatecall.com/loom/linux/build-208/loom
    chmod +x loom
    ```
1. Execute `./loom init` in the working directory to initialize config files.
1. Add `loom.yml` in the working directory:
    ```yaml
    QueryServerHost: "tcp://0.0.0.0:9999"
    ```

## Configuration

There are two genesis.json files that needs to be combined.

### genesis.json #1 - in the working directory

The `genesis.json` file looks like this:

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

Next, collect all `validators` from each node, then combine them into an array. This file will now need to be replaced with the combined file, in all nodes. For a two node cluster, it should now look like this:

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

### genesis.json #2 - inside chaindata/config

You will find a file named `genesis.json`. It is not to be confused with the one in the working directory. It should look like this:

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

## Running

First, we need to get node keys from each node. Go to the working directory and run `loom nodekey`:

```bash
$ loom nodekey
47cd3e4cc27ac621ff8bc59b776fa228adab827e
```

Do remember to clearly make note which node key is for which node. Also important is the private IP (or any IP that are available for the nodes to communicate with each other). Generally, in a cloud environment we use public IPs for security and latency reasons.

Now, let's use an example with 4 nodes:

| Node | IP         | Node key           |
| ---- | ---------- | -------------------|
| 1    | 10.2.3.4   | 47cd3e4cc27ac621ff8bc59b776fa228adab827e |
| 2    | 10.6.7.8   | e728bada822af677b95cb8ff126ca72cc4e3dc74 |
| 3    | 10.3.2.1   | 4953e5726664985cc1cc92ae2edcfc6e089ba50d |
| 4    | 10.7.6.5   | 02c90b57d241c3c014755ecb07e0c0d232e07fff |

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
tcp        0      0 :::9999                 0.0.0.0:*               LISTEN      2135/loom
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
    loom_build: build-196
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
