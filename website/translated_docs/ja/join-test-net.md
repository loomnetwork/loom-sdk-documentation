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

こうしてファイル名`priv_key` 及び `pub_key`が作成され、 `priv_key`はコントラクトデプロイで使われる秘密鍵を格納する。

# Karma Faucetの使用方法

1. [Karma Faucet](https://faucet.dappchains.com)のウェブサイトにアクセスする。   
      
      
    ![image](/developers/img/faucet/1.png)   
      
      
    
2. 受信者アドレス(recipient address)に、あなたのtruffleアカウントと同じアカウントの`public address` を入力する。   
      
      
    ![image](/developers/img/faucet/2.png)   
      
      
    
3. コントラクトをデプロイしたいテストネット・ネットワークを選択する。   
      
      
    ![image](/developers/img/faucet/3.png)   
      
      
    
4. `request` ボタンをクリックする。   
      
      
    ![image](/developers/img/faucet/4.png)   
      
      
    
5. 選択したテストネットにコントラクトをデプロイする前に、`faucet-karma` が表示できていることを確認する。   
      
      
    ![image](/developers/img/faucet/5.png)

# Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed
2. Obtain the testnet URL from [testnets-plasma](testsnets-plasma.html)
3. Get the source: 
        bash
        git clone https://github.com/loomnetwork/truffle-dappchain-example
        cd truffle-dappchain-example
        cp ../priv_key private_key

4. Edit `truffle-config.js` and modify these values with the values obtained from the testnets-plasma page:
    
    - `chainId` - `extdev-plasma-us1`
    - `writeUrl` - `http://extdev-plasma-us1.dappchains.com:80/rpc`
    - `readUrl` - `http://extdev-plasma-us1.dappchains.com:80/query`
        
        example
        
        ```js
        const LoomTruffleProvider = require('loom-truffle-provider') 
        
        const chainId = 'extdev-plasma-us1'
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query'
        
        const privateKey = "<--- your key in priv_key file--->"
        
        const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey) 
        
        module.exports = { 
            networks: { 
                loom_dapp_chain: { 
                    provider: loomTruffleProvider, 
                    network_id: '*' 
                }
            } 
        }
        ```

5. Install node modules:
    
    ```bash
    yarn
    ```

6. Run deploy: 
        bash
        yarn deploy If you don't have karma this will fail with error 
    
    `Failed to commit Tx: origin has no karma` so you need to request karma from [Karma Faucet](http://faucet.dappchains.com)