---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

This doc is for developers on how they can join the Plasmachain Testnet to do deployment. If you are looking for information on how to run nodes, or to become a validator please checkout [Validator Guide](validator.html)

**Prerequisite**
 - Loom installed (see [instruction](https://loomx.io/developers/docs/en/basic-install-osx.html#installation) )

```bash
 curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
 ```

**How to generate a private key with Loom and get your public address**

```
$ ./loom genkey -k priv_key -a pub_key
```

result

```bash
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```
and this will create files named `priv_key` and `pub_key`,
the `priv_key` file contains your private key that you'll use to deploy contracts to the DAppChain.


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
2. Obtain the testnet URL from [PlasmaChain Testnets](testnet-plasma.html) page
3. Get the source:
    ```bash
    git clone https://github.com/loomnetwork/truffle-dappchain-example
    cd truffle-dappchain-example
    # copy the private key generated earlier to the root directory of the example repo
    cp ../priv_key extdev_private_key
    ```
4. If you wish to deploy the example contracts to `extdev-plasma-us1` skip this step. Otherwise,
   add the network you wish to deploy to in `truffle-config.js`.
5. Install node modules:
    ```bash
    yarn
    ```
6. Run deploy:
    ```bash
    yarn deploy:extdev
    ```
    If you don't have karma this will fail with error `Failed to commit Tx: origin has no karma`
    so you need to request karma from [Karma Faucet](http://faucet.dappchains.com)
