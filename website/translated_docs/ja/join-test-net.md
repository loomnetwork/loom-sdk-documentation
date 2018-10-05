---
id: join-testnet
title: テストネットへの参加
sidebar_label: テストネットへの参加
---
この開発者向けドキュメーンテーションは、PlasmaChainテストネットに参加しデプロイを行う方法についてのものである。 If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

**Prerequisite**

- Loom installed (see [instruction](https://loomx.io/developers/docs/en/basic-install-osx.html#installation) )

```bash
 curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

**How to generate a private key with Loom and get your public address**

    $ ./loom genkey -k priv_key -a pub_key
    

result

```bash
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```

and this will create files name`priv_key` and `pub_key` while `priv_key` will store your private key that use for deploy contract

# How to use Karma faucet

1. Go to [Karma Faucet](https://faucet.dappchains.com) website   
      
      
    ![image](/developers/img/faucet/1.png)   
      
      
    
2. Fill recipient address with your `public address` which is the same account in your truffle   
      
      
    ![image](/developers/img/faucet/2.png)   
      
      
    
3. Select test-net network you want to deploy your contract   
      
      
    ![image](/developers/img/faucet/3.png)   
      
      
    
4. Press `request` button   
      
      
    ![image](/developers/img/faucet/4.png)   
      
      
    
5. Make sure you get `faucet-karma` appear before deploy your contract to selected test-net   
      
      
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