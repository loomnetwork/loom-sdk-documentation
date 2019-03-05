---
id: hsm
title: ハードウェア セキュリティ モジュール - HSM
sidebar_label: ハードウェアセキュリティモジュール
---
## 概要

ハードウェアセキュリティモジュールは、コンピューターがハッキングされたとしてもバリデーターの秘密鍵が漏洩しないことを保証しているため、 このモジュールを手始めに使用することをPlasmachainの全バリデーターにおすすめしたい。 また将来的に、このモジュールの使用をチェーンのバリデーター参加要件とする可能性がある。

## サポートされているデバイス

今現在、我々はED25519アルゴリズムのEDDSA暗号化を行うことのできるデバイスをサポートしている。 現時点で、[Yubico HSM2](https://www.yubico.com/products/yubihsm/)をサポートしており、これは、ビットコインやイーサリアムの電子署名に使われているようなものも含む、幅広い暗号アルゴリズムをカバーした$500前後の安価なデバイスである。 また、間も無く、EDDSA暗号化が可能な他のPKCS11対応デバイスをサポートする予定である。

## HSM の構成

Loom.yml の次のセクションを追加する必要がある。

```yaml
HsmConfig:
  HsmEnabled: true
  HsmDevType: yubihsm
  HsmConnUrl: "localhost:12345"
  HsmAuthPassword: "password"
  HsmAuthKeyId: 1
  HsmSignKeyID: 0
```

## 構成オプション

* HsmEnabled

HSMデバイスで署名を有効にする場合はtrueに設定しなければならない。falseに設定した場合、他の設定は無視される。

* HsmDevType: 

オプション - yubihsm、softhsm (近日公開)、pkcs11 (近日公開)

* HsmConnUrl:

yubicohsmのためのHttp urlで、デフォルトでhttp://localhost:12345をリッスンする。

* HsmAuthPassword: 

HSMデバイスのためのパスワード。 (以前は HsmDevLogCred)

* HsmAuthKeyId:

yubico hsm上での認証のためのID。 これは、特にそのデフォルトのAuthKeyIdとして、1を設定する。

* SignKeyDomain:

Yubico HSMsは、あなたが指定すれば、セキュリティのための複数のドメイン設定を可能にする。指定しなければ、デフォルトは1である。

* HsmSignKeyID:

HSM上の秘密鍵のIDであり、前もって作っておくことをお勧めする。 この値を0に設定すると、Loom SDKはHSM上でその新しい秘密鍵を生成する。

## Yubico HSM を設定

1. Yubico ドライバー、ユーティリティのダウンロード。

<https://developers.yubico.com/YubiHSM2/Releases/> バージョン 1.04 以降が必要。

2. Yubico ドライバのインストール。 

```bash
dpkg -i *.deb 
```

3. Yubico コネクタの実行。

```bash
yubihsm-connector -d 
```

4. 最初の秘密鍵の作成。

```bash
yubihsm-shell
connect
keepalive 25
session open 1 password
generate asymmetric 0 100 label_eddsa_sign 1,2,3 export_under_wrap,asymmetric_sign_eddsa ed25519
session close 0
quit
```

これでID100のキーが手に入る。 loom.yml で HsmSignKeyId を100に設定すること。

### 登録候補者のようなトランザクションに署名するための HSM の使用

1. PrivateKeyId と base64 の公開鍵を見つける

cat chaindata/config/priv_validator.json

get key_id and pub_key/value

2. hsm.jsonを作成

```json
hsm.json
{
    "YubiHsmConnURL":"localhost:12345",
    "AuthKeyID":1,
    "Password":"password",
    "PrivKeyID":999999 
}
```

privKeyIDにあなたのキーのidを入力。

3. ./loom call register_candidateV2 PUBLIC_KEY_IN_BASE64 10 --hsmconfig hsm.json -r http://dposv2.dappchains.com:80/query -w http://dposv2.dappchains.com:80/rpc --chain dposv2

PUBLIC_KEY_IN_BASE64 を priv_validator のそれに取り替える。