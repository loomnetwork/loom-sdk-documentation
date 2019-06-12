---
id: jump-start-plasma
title: plasma Jump Start
sidebar_label: plasma Jump Start
---

Follow the instructions below to launch a plasma node from the jump start

## Download stable version of plasmachain

```bash
wget https://private.delegatecall.com/loom/linux/stable/plasmachain
chmod +x plasmachain
```

## Download jump start archive

There are two available locations where you can download it from, USA or Singapore. Choose the location closest to you. The Singapore location is automatically replicated from the USA location so it might be a while before it becomes available when we update the archive.

In each location, there are two different archives. One is full and another is the smaller image that has no historical app state.

### United States

* Full image:
  * Archive: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start.tar.gz>
  * MD5: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start.tar.gz>
* Smaller image:
  * Archive: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start-min.tar.gz>
  * MD5: <http://loom-share.s3-website.us-east-2.amazonaws.com/plasma-jump-start-min.tar.gz>

### Singapore

* Full image:
  * Archive: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start.tar.gz>
  * MD5: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start.tar.gz>
* Smaller image:
  * Archive: <http://loom-share-sg.s3-website.ap-southeast-1.amazonaws.com/plasma-jump-start-min.tar.gz>
  * MD5: <http://loom-share-sg.s3-ap-website.southeast-1.amazonaws.com/plasma-jump-start-min.tar.gz>

## Extract archive

```bash
tar xfvz plasma-jump-start.tar.gz
```

## Generate unique config

```bash
mkdir blank
cd blank
cp ../loom-jump-start/loom.yml .
../plasmachain init
cp chaindata/config/{priv_validator.json,node_key.json} ../loom-jump-start/chaindata/config/
cd ../loom-jump-start
```

## Start the node

```bash
../plasmachain run --persistent-peers tcp://1739225062b349fa0805ba823dd0155165f40be3@18.216.200.134:46656,tcp://5dcfe8f23c2eeefad39247f9f7c6c33bf112f6c0@52.15.45.21:46656,tcp://29f2d48d3d61687324eeeed0a43b736c4506dd64@18.225.14.100:46656
```

## Finally

The non-validator node will now sync with the validator nodes. Status can be queried at http://localhost:46658/rpc/status

## Make loom run as a service on Ubuntu 16.04 (Optional)

Create `/etc/systemd/system/loom.service`

```ini
[Unit]
Description=Loom
After=network.target

[Service]
Type=simple
User=<user that runs loom>
WorkingDirectory=<working directory of loom>
ExecStart=<path to loom>/plasmachain run --persistent-peers tcp://5dcfe8f23c2eeefad39247f9f7c6c33bf112f6c0@52.15.45.21:46656,tcp://29f2d48d3d61687324eeeed0a43b736c4506dd64@18.225.14.100:46656
Restart=always
RestartSec=2
StartLimitInterval=0
LimitNOFILE=500000
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

### Reload the config

```bash
systemctl daemon-reload
```

### To make it run on boot

```bash
systemctl enable loom.service
```

### To start/stop/restart

```bash
systemctl (start/stop/restart) loom.service
```

### To look at logs (method 1)

```bash
tail -f /var/log/syslog
```

### To look at logs (method 2)

```bash
sudo journalctl -u loom.service -f
```

## Open Files Limit

When using systemd, the open files limit is taken care of by the LimitNOFILE directive. It will not, however, be applied when running loom manually.

### For system-wide limit

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

### For specific user

Add lines to `/etc/security/limits.conf`

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
