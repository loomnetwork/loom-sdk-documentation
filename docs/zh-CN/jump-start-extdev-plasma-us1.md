---
id: jump-start-extdev-plasma-us1
title: Extdev Jump Start
sidebar_label: Extdev Jump Start
---

## Purpose

This page shows you how to launch an extdev-plasma-us1 node from the jump start.

## Hardware Requirements

The minimum hardware requirements are as follows: 2 CPU, 16 GB RAM, NVMe SSD. Example: `AWS i3.large`.

## Download the Latest Extdev Stable Build

```bash
wget https://downloads.loomx.io/loom/linux/extdev-stable/loom
chmod +x loom
```

## Download the Jump Start Archive

There are two available locations where you can download it from, USA or Singapore. Choose the location closest to you. The Singapore location is automatically replicated from the USA location so it might be a while before it becomes available when we update the archive.

### United States

* Archive: <http://loom-share.s3-website.us-east-2.amazonaws.com/extdev-plasma-us1-jump-start-min.tar.gz>
* MD5: <http://loom-share.s3-website.us-east-2.amazonaws.com/extdev-plasma-us1-jump-start-min.tar.gz.md5sum>

### Singapore

* Archive: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/extdev-plasma-us1-jump-start-min.tar.gz>
* MD5: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/extdev-plasma-us1-jump-start-min.tar.gz.md5sum>

## Extract the Archive

```bash
tar xfvz extdev-plasma-us1-jump-start.tar.gz
```

## Generate the Unique Config

```bash
mkdir blank
cd blank
cp ../loom-jump-start/loom.yml .
../loom init
cp chaindata/config/{priv_validator.json,node_key.json} ../loom-jump-start/chaindata/config/
cd ../loom-jump-start
```

## Start the Node

> NOTE: Check the open files limit on your system before starting the node! See [Open Files Limit](#open-files-limit).

Now, let's start the node by running:

```bash
../loom run --persistent-peers tcp://1cba97a0a108cb0de51e5a3ff6ac15d70e0fa076@52.53.145.158:46656,tcp://367a9fa0df0afeed204c3360867e37ef03da5b97@52.53.184.91:46656,tcp://7b537b6ad25b5b13864ec20bed8803489189a274@54.193.119.132:46656,tcp://d7623e990790048db76c5d6a25e12efa818aaef1@52.53.221.33:46656
```

## Finally

The non-validator node will now sync with the validator nodes. Status can be queried at http://localhost:46658/rpc/status

## Run Loom as a Service on Ubuntu 16.04 (Optional)

Create `/etc/systemd/system/loom.service`

```ini
[Unit]
Description=Loom
After=network.target

[Service]
Type=simple
User=<user that runs loom>
WorkingDirectory=<working directory of loom>
ExecStart=<path to loom>/loom run --persistent-peers tcp://1cba97a0a108cb0de51e5a3ff6ac15d70e0fa076@52.53.145.158:46656,tcp://367a9fa0df0afeed204c3360867e37ef03da5b97@52.53.184.91:46656,tcp://7b537b6ad25b5b13864ec20bed8803489189a274@54.193.119.132:46656,tcp://d7623e990790048db76c5d6a25e12efa818aaef1@52.53.221.33:46656
Restart=always
RestartSec=2
StartLimitInterval=0
LimitNOFILE=500000
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

### Reload the Config

```bash
systemctl daemon-reload
```

### Run Loom on Boot

```bash
systemctl enable loom.service
```

### To start/stop/restart the Service

```bash
systemctl (start/stop/restart) loom.service
```

### Inspect the Logs (Method 1)

```bash
tail -f /var/log/syslog
```

### Inspect the Logs (Method 2)

```bash
sudo journalctl -u loom.service -f
```

## The Open Files Limit

When using systemd, the open files limit is taken care of by the LimitNOFILE directive. It will not, however, be applied when running loom manually.

### The system-wide Limit

Add the following lines to `/etc/sysctl.conf`

```ini
fs.file-max=500000
```

To activate it immediately:

```bash
sudo sysctl -p
```

To check whether it is active:

```bash
cat /proc/sys/fs/file-max
```

### For a Specific User

Add the following lines to the `/etc/security/limits.conf` file:

```bash
username        hard nofile 500000
username        soft nofile 500000
```

Note: The user needs to re-login to have it active

To check whether it is active:

```bash
# check soft limit
ulimit -Sn

# check hard limit
ulimit -Hn
```