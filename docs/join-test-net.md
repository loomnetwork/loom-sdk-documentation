---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

This doc is for developers on how they can join the Plasmachain Testnet to do deployment. If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

#TODO explain loom sidechains

#TODO explain doc is for developers, and dev

#TODO walk through getting the truffle example and deploying to a testnet


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
