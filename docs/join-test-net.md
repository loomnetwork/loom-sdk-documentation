---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

This doc is for developers on how they can join the Plasmachain Testnet to do deployment. If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

#TODO explain loom sidechains

#TODO explain doc is for developers, and dev

#TODO walk through how to use karma faucet

#TODO walk through getting the truffle example and deploying to a testnet

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
