---
id: hsm
title: Hardware Security Modules - HSM
sidebar_label: Hardware Security Modules
---

## Overview

Hardware security modules ensure that the private keys of the validator are not compromised even if a machine is hacked. We are highly encouraging all validators on Basechain to have one for starters. In the future, we may we may require the use of an HSM to participate as a validator.


## Supported Devices

Right now, we will only support devices that can do EDDSA encryption with the ED25519 algorithm. Currently, we support the [Yubico HSM2](https://www.yubico.com/products/yubihsm/), an economically cheap device at around $500. It supports a wide array of encryption algorithms, including those used for bitcoin/ethereum signing. Also, we'll soon support other PKCS11 enabled devices that can do EDDSA encryption.

## Configuring an HSM

In loom.yml you need to add the following section:

```yaml
HsmConfig:
  HsmEnabled: true
  HsmDevType: yubihsm
  HsmConnUrl: "localhost:12345"
  HsmAuthPassword: "password"
  HsmAuthKeyId: 1
  HsmSignKeyID: 0
```

## Config options

* HsmEnabled

Must be set to true to enable signing with the HSM device.  If set to false, the other setting are ignored.

* HsmDevType:

Options - yubihsm, softhsm (coming soon), pkcs11 (coming soon)

* HsmConnUrl:

HTTP URL for the yubicohsm. By default it listens to http://localhost:12345

* HsmAuthPassword:

Password for the HSM device. (previously HsmDevLogCred)

* HsmAuthKeyId:

The ID number for authentication on the yubico hsm. This typically will be set to 1 as its the default AuthKeyId.

* SignKeyDomain:

With Yubico HSMs, you can allow multiple domains for security. Otherwise, it defaults to 1.

* HsmSignKeyID:

The ID number of the private key on the HSM. We suggest creating this in advance. If you set this value to zero, Loom SDK will attempt to create a new private key on the HSM itself.

## Setting up the Yubico HSM

1. Download yubico drivers, utils:

[https://developers.yubico.com/YubiHSM2/Releases/](https://developers.yubico.com/YubiHSM2/Releases/)

**We require version 1.04 or greater.**

2. Install the yubico drivers:
```bash
dpkg -i *.deb
```

3. Run the yubico connector:
```bash
yubihsm-connector -d
```

4. Create your first private key:
```bash
yubihsm-shell
connect
keepalive 25
session open 1 password
generate asymmetric 0 100 label_eddsa_sign 1,2,3 export_under_wrap,asymmetric_sign_eddsa ed25519
session close 0
quit
```

You should now have a key at with ID 100. Please set `HsmSignKeyId` to `100` in your `loom.yml`.



### Using HSM for signing transactions like Register Candidate

1. Find out your PrivateKeyId and base64 public key:
```bash
cat chaindata/config/priv_validator.json
```

Get `key_id` and `pub_key/value`.

2. Create an `hsm.json` file:

```json
{
    "YubiHsmConnURL":"localhost:12345",
    "AuthKeyID":1,
    "Password":"password",
    "PrivKeyID":999999
}
```

Put your key id into the `privKeyID` field.


3. Run the following:
```bash
./loom call register_candidateV2 PUBLIC_KEY_IN_BASE64 10  --hsmconfig hsm.json -r http://dposv2.dappchains.com:80/query -w http://dposv2.dappchains.com:80/rpc  --chain dposv2
```

Swap `PUBLIC_KEY_IN_BASE64` for the one in the `priv_validator`.
