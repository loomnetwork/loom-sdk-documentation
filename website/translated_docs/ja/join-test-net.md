---
id: join-testnet
title: テストネットへの参加
sidebar_label: テストネットへの参加
---
この開発者向けドキュメーンテーションは、PlasmaChainテストネットに参加しデプロイを行う方法についてのものである。 ノードの運営方法やバリデータになる方法についての情報をお探しであれば、 [バリデーターガイド](validator.html)をチェックすること。

**前提条件**

- Loomがインストール済みであること ([手順はこちら](https://loomx.io/developers/docs/ja/basic-install-osx.html#installation) )

```bash
 curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

**Loomで秘密鍵を生成し、パブリックアドレスを取得する方法**

    $ ./loom genkey -k priv_key -a pub_key
    

結果

```bash
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```

そしてこれは`priv_key`という名前と`pub_key`という名前でファイルを生成し、`priv_key`ファイルはあなたの秘密鍵を含みDAppチェーンへのデプロイに使う。

# Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed
2. Obtain the testnet URL from [PlasmaChain Testnets](testnet-plasma.html) page
3. Get the source: 
        bash
        git clone https://github.com/loomnetwork/truffle-dappchain-example
        cd truffle-dappchain-example
        # copy the private key generated earlier to the root directory of the example repo
        cp ../priv_key extdev_private_key

4. If you wish to deploy the example contracts to `extdev-plasma-us1` skip this step. Otherwise, add the network you wish to deploy to in `truffle-config.js`.
5. Install node modules: 
        bash
        yarn

6. Run deploy: 
        bash
        yarn deploy:extdev