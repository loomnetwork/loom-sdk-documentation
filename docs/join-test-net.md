---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

This doc is for developers on how they can join the Plasmachain Testnet to do deployment. If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

#TODO explain loom sidechains

#TODO explain doc is for developers, and dev

**Prerequisite**
 - Loom installed (see [instruction](https://loomx.io/developers/docs/en/basic-install-osx.html#installation) )
 - Truffle 

**How to generate a private key with Loom and get your public address**
```
$./loom genkey -k priv_key -a pub_key
```

result
```
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```
and this will create files name`priv_key` and `pub_key` 
while `priv_key` will store your private key that use for deploy contract


**How to config your truffle**
Please see [Loom Truffle Provider Instruction](https://loomx.io/developers/docs/en/web3js-loom-provider-truffle.html#download-and-configure-loom-truffle-provider) in section  *"Download and configure Loom Truffle Provider"*
```js
const LoomTruffleProvider = require('loom-truffle-provider') 

const chainId = 'extdev-plasma-us1'
const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query'

const privateKey = "<--- your key in priv_key file--->"

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey) 

module.exports = { 
	networks: { 
		extdev: { 
			provider: loomTruffleProvider, 
			network_id: '*' 
		}
	} 
}
```
Then
```
$truffle migrate --network extdev
```
This will fail with error `Failed to commit Tx: origin has no karma`
so you need to request karma from faucet.dappchains.com



# How to use Karma faucet
  
1. Go to faucet.dappchains.com
<br/>
![image](/developers/img/faucet/1.png)
<br/>
2. Fill recipient address with your `public address` which is the same account in your truffle
<br/>
![image](/developers/img/faucet/2.png)
<br/>
3. Select test-net network you want to deploy your contract
<br/>
![image](/developers/img/faucet/3.png)
<br/>
4. Press `request` button
<br/>
![image](/developers/img/faucet/4.png)
<br/>
5. Make sure you get `faucet-karma` appear before deploy your contract to selected test-net
<br/>
![image](/developers/img/faucet/5.png)


# Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed
1. Obtain the testnet URL from [testnets-plasma](testsnets-plasma.html)
1. Get the source:
    ```bash
    git clone https://github.com/loomnetwork/truffle-dappchain-example
    cd truffle-dappchain-example
    ```
1. Edit `truffle-config.js` and modify these values with the values obtained from the testnets-plasma page:
    * `chainId`
    * `writeUrl` - https://xxxxx.dappchains.com/rpc
    * `readUrl` - https://xxxxx.dappchains.com/query
1. Install node modules:
    ```bash
    yarn
    ```
1. Run deploy:
    ```bash
    yarn deploy
    ```
1. Run test:
    ```bash
    yarn test
    ```
