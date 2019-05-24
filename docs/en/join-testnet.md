---
id: join-testnet
title: Join Testnets
sidebar_label: Join Testnets
---

## Join Testnets

This doc is for developers, and it aims to show how they can join the PlasmaChain Testnet and deploy their smart contracts. If you are looking for information on how to run nodes or to become a validator, please checkout our [Validator Guide](validator.html).

**Prerequisite**

 - Loom installed. See [instructions](basic-install-all.html).

### Generate a private key

Once Loom is installed, you need to **generate a private key with Loom and get your public address**:

```bash
./loom genkey -k priv_key -a pub_key
```

You should see something like this printed out in the console:

```text
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```

This will create two files named `priv_key` and `pub_key`. The `priv_key` file contains your private key that you'll use to deploy contracts to the DAppChain.


### Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed.
2. Obtain the testnet URL from [PlasmaChain Testnets](testnet-plasma.html) page
3. Get the source code from the Truffle DAppChain repo:

    ```bash
    git clone https://github.com/loomnetwork/truffle-dappchain-example
    cd truffle-dappchain-example
    ```
4. Copy the private key to the root directory of the example repo:

    ```bash
    cp ../priv_key extdev_private_key
    ```

4. If you wish to deploy the example contracts to `extdev-plasma-us1` skip this step. Otherwise, add the network you wish to deploy to in `truffle-config.js`.

5. Install node modules:

    ```bash
    yarn
    ```

6. Deploy to `extdev` by running:

    ```bash
    yarn deploy:extdev
    ```
