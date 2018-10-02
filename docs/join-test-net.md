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




![image](https://user-images.githubusercontent.com/8909566/46338545-a6a53000-c65a-11e8-80e0-405eb9f28bf7.png)




2. Fill recipient address with your `public address` which is the same account in your truffle




![image](https://user-images.githubusercontent.com/8909566/46338595-c9374900-c65a-11e8-85be-9f5b2d5638c2.png)




3. Select test-net network you want to deploy your contract



![image](https://user-images.githubusercontent.com/8909566/46338624-dfdda000-c65a-11e8-9c64-0649f5fba1d0.png)




4. Press `request` button



![image](https://user-images.githubusercontent.com/8909566/46338673-01d72280-c65b-11e8-8efb-65cbd42de0d4.png)




5. Make sure you get `faucet-karma` appear before deploy your contract to selected test-net



![image](https://user-images.githubusercontent.com/8909566/46338792-54b0da00-c65b-11e8-8bd5-faf58cb14ec6.png)



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
