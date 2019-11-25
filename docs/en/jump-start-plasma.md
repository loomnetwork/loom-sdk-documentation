---
id: jump-start-plasma
title: Basechain Jump Start
sidebar_label: Basechain Jump Start
---

## Purpose

This page shows you how to launch a Basechain node from the jump start.

## Hardware Requirements

The minimum hardware requirements are as follows: 4 CPU, 32 GB RAM, NVMe SSD. Example: `AWS i3.xlarge`.

## Download the Latest Basechain Stable Build

```bash
wget https://downloads.loomx.io/loom/linux/stable/basechain
chmod +x basechain
```

## Download the Jump Start Archive

There are two available locations where you can download it from, USA or Singapore. Choose the location closest to you. The Singapore location is automatically replicated from the USA location so it might be a while before it becomes available when we update the archive.

In each location, there are two different archives. One is full and another is the smaller image that has no historical app state.

### United States

* Full image:
  * Archive: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start.tar.gz>
  * MD5: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start.tar.gz.md5sum>
* Smaller image:
  * Archive: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start-min.tar.gz>
  * MD5: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start-min.tar.gz.md5sum>

### Singapore

* Full image:
  * Archive: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start.tar.gz>
  * MD5: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start.tar.gz.md5sum>
* Smaller image:
  * Archive: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start-min.tar.gz>
  * MD5: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start-min.tar.gz.md5sum>

## Extract the Archive

```bash
tar xfvz plasma-jump-start.tar.gz
```

## Generate the Unique Config

```bash
mkdir blank
cd blank
cp ../loom-jump-start/loom.yml .
../basechain init
cp chaindata/config/{priv_validator.json,node_key.json} ../loom-jump-start/chaindata/config/
cd ../loom-jump-start
```

## Start the Node

```bash
../basechain run --persistent-peers tcp://580a760af842657125f012c35fc486206b06de1e@18.223.135.245:46656,tcp://0b4989d8349a4a8eb0a901bfdad42336818e1687@18.223.124.100:46656,tcp://527692dde372f2e04870d5b24f9f7e80a573556c@3.16.45.215:46656
```

## Finally

The non-validator node will now sync with the validator nodes. Status can be queried at http://localhost:46658/rpc/status

## Run Loom as a service on Ubuntu 16.04 (Optional)

Create `/etc/systemd/system/loom.service`

```ini
[Unit]
Description=Loom
After=network.target

[Service]
Type=simple
User=<user that runs loom>
WorkingDirectory=<working directory of loom>
ExecStart=<path to loom>/basechain run --persistent-peers tcp://580a760af842657125f012c35fc486206b06de1e@18.223.135.245:46656,tcp://0b4989d8349a4a8eb0a901bfdad42336818e1687@18.223.124.100:46656,tcp://527692dde372f2e04870d5b24f9f7e80a573556c@3.16.45.215:46656
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

### Inspect the Logs (method 2)

```bash
sudo journalctl -u loom.service -f
```

## The Open Files Limit

When using systemd, the open files limit is taken care of by the LimitNOFILE directive. It will not, however, be applied when running loom manually.

### The system-wide Limit

Add the following lines to the `/etc/sysctl.conf` file:

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
