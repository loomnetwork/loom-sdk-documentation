---
id: hsm
title: Hardware Security Modules - HSM
sidebar_label: Hardware Security Modules 
---

## Overview

Hardware security modules ensure that private keys of the validator are not compromised even if a machine is hacked. We are highly encouraging all validators on the Plasmachain to have one for starters. In future the chain may make it a requirement to have one to participate as a validator


## Supported devices

Right now we will only support devices that can do EDDSA encryption with the ED25519 algorithm. Our initial Device we are supporting is the [Yubico HSM2](https://www.yubico.com/products/yubihsm/) both an economically cheap device at around $500, it also supports a wide array of encryption including bitcoin/ethereum signing techniques. Also we support PKCS11 enabled devices that have above encryptions enabled.

## Configuring an HSM

In Loom.yaml you need to add the following section
```yaml
HsmConfig:
  HsmEnabled: "true"
  HsmDevType: "yubihsm"
  HsmConnUrl: "localhost:12345"
  HsmDevLogCred: "password"
  HsmAuthKeyId: 0
```

## Config options

* HsmDevType: 

Options - yubihsm, softhsm, pkcs11(future)

* HsmConnUrl:

Http url for the yubicohsm, by default it listens to http://localhost:12345

* HsmDevLogCred: 

Password for the hsm 

* HsmAuthKeyId:

Id number of the private key on the HSM, we suggest to create in advance. In future releases if you set this value to zero, Loom sdk will attempt at creating a new private key on the HSM itself.



## Setuping up the Yubico HSM

1. Download yubico drivers, utils

[https://developers.yubico.com/YubiHSM2/Releases/](https://developers.yubico.com/YubiHSM2/Releases/)
We require version 1.04 or greater

2. Install the yubico drivers 
```bash
dpkg -i *.deb 
```
3. First you need to run the yubico connector
```bash
yubihsm-connector -d 
```

4. Create your first private key
```bash
yubihsm-shell
connect
keepalive 25
session open 1 password
generate asymmetric 0 100 label_eddsa_sign 1,2,3 export_under_wrap,asymmetric_sign_eddsa ed25519
session close 0
quit
```

You should now have a key at 100. Please set HsmAuthKeyId to 100 in your loom.yaml

