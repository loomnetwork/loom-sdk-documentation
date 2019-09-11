---
id: intro-loom-sdk
title: What is Loom Network?
sidebar_label: Intro Loom SDK
---

![What is Loom Network?](/developers/img/what-is-loom.png)

Loom Network is building a fundamental infrastructure platform to help Ethereum scale. It allows developers to run large-scale applications and is the first Ethereum scaling solution to be live in production.

In short, you can think of Loom Network as EOS on top of Ethereum.

# What is the Loom SDK?

Our core product is an SDK that allows developers to quickly build their own blockchains without having to understand blockchain infrastructure. Think of it like a “build your own blockchain” generator.

## What is Basechain?

So, the Loom SDK allows for developers to spin up an unlimited number of sidechains to scale their dapps as needed — a crucial piece in our long-term vision of blockchain scalability, and one that is now being used by multiple games and dapps in production.

But Basechain will be the central hub that all these chains connect to as their bridge to Ethereum, for interchain communication with other major blockchains (such as Cosmos, EOS, and Tron), and as a shared liquidity pool for tokenized assets.

Thus, our company’s primary objectives over the next year are all related to growing Basechain to become the “universal Layer 2” for high performance dapps.

In the next chapter, you will learn how to deploy your first app to Loom Basechain. Let's get started!


## Deploying to Testnet

Deploying to Loom Basechain is no different from deploying to the Ethereum main net, or to Rinkeby. If you know how to do one, you also know how to do the other.

We at Loom are using Truffle to build, test, and deploy our smart contracts. To make our life easier, we developed something called a provider that lets Truffle deploy to Loom Basechain just like it deploys to Ethereum.

Without delving too much into details, the provider works like a bridge that makes Web3.js calls compatible with Loom Basechain.

This chapter shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with Loom Basechain.

### Requirements

Make sure the following requirements are met and then follow the steps in the next section:

```text
Node >= 8
yarn or npm
```

### Install

First, let's clone the [Truffle DAppChainExample](https://github.com/loomnetwork/truffle-dappchain-example/) repository. Open a terminal, `cd` into the directory where you store your projects, and run the following command:

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

Next, `cd` into `truffle-dappchain-example`:

```bash
cd truffle-dappchain-example
```

and run:

```bash
yarn install
```

### Run against Loom Testnet

#### Generate the Loom private key

The following command will download the `loom` binary and generate the private key for you:

```bash
yarn gen:extdev-key
```

> The Loom private key will be saved into a file called `extdev_private_key`.


#### Deploy to extdev

As an example, we will deploy and run our application against `extdev`.

Run the following command:

```bash
yarn deploy:extdev
```

>The above command will **compile and then deploy** our smart contract to `extdev`


#### Test

Run this command below to send transactions to the smart contract deployed to `extdev`:


```test
yarn test:extdev
```

If everything looks good, let's spin up a web server and interact with our smart contract.

#### Start the web interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

> The web interface is available on http://localhost:8080.


### Run against local Loom chain

First, you have to generate a private key using:

```bash
yarn gen:loom-key
```

#### Spin up Loom Chain

In a new terminal, run:

```bash
yarn loom-init
```

#### Deploy the smart contract

To deploy, run the following command:

```bash
yarn deploy
```

You will see something like this:

```text
Starting migrations...
======================
> Network name:    'loom_dapp_chain'
> Network id:      13654820909954
> Block gas limit: 0
```

Copy the `Network id` paste it into a text file. We'll use it later.

#### Test

```
yarn test
```

### Web interface

Open the `src/contract.js` file in your text editor of choice and go to line 87.

Now, say your `Network id` is `13654820909954`. Replace

```javascript
return Promise.resolve('default')
```

with

```javascript
return Promise.resolve('13654820909954')
```


We're ready to start the web server. In a new terminal, run:

```bash
yarn serve
```


### Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also, is possible to call truffle directly with `yarn truffle`.

3. We're not versioning the build directory for this particular example, although is recommended to do so. The limitation can be removed by editing the `.gitignore` file.


## Deploying to Loom

In this section, we will explore the steps required to deploy your first smart contract to Loom.

First, head over to our [Developer Dashboard](https://dev-dashboard.dappchains.com/login). We offer 3 different ways in which you can connect and sign transactions:

![Select Wallet](/developers/img/deploy-to-loom-select-wallet.png)

Depending on your preference click "Ledger", "Metamask" or "Trezor via Metamask".

Next, you will be asked if you want to link your existing Relentless Marketplace account:

![Link Marketplace Account](/developers/img/deploy-to-loom-link-marketplace-account.png)


If so, click on the "Link my account" button and follow the instructions.

If you don't have a Relentless Marketplace account or you want to use a different account, just click on the "Nope, I'm not from Relentless Marketplace" button.

Say we choose to create a new account. Once we've selected this option, you'll see a Metamask popup like this:

<img src="/developers/img/deploy-to-loom-map-accounts.png" alt="Map Accounts" width="400"/>

Click "Sign" and, under the hood, the dashboard will map your accounts. Next, you will be redirected to your dashboard. It'll look similar to this:

![Map Accounts](/developers/img/deploy-to-loom-dashboard.png)


### Deposit Loom to Basechain

From the left pane, click on the "Deploy to Basechain". You will be redirected to a page similar to the one below:

![New Account Options](/developers/img/deploy-to-loom-deposit-loom.png)

Notice that, in order to deploy to Basechain, you need to stake some LOOM. Click on the "Deposit more Loom to Basechain" and follow the instructions.

### Adding the Public Keys

From here you have two options. You either create a new account, or you use an existing address:

Let's explore both a bit further.

#### Option 1 - Creating a New Account

Say you clicked "Generate New Key". Next, a new window will pop showing the details of the new account:

![New Account Details](/developers/img/deploy-to-loom-create-new-account.png)

We can't emphasize this more: **store the mnemonic somewhere safe**.

Next, copy the public address and paste it into the "Your Loom Public Address" textbox:

![Public Address](/developers/img/deploy-to-loom-paste-public-address.png)

Lastly, click "Add Key" and you're set.

#### Option 2 - Use an Existing Address

Now, as an example, let's suppose you already have a Loom address- `0xC8613234a93977079d464e9b77bF60b227DB67A1`. If so, all you have to do is to replace the `0x` prefix with `loom`.  It'll look something like this: `loomC8613234a93977079d464e9b77bF60b227DB67A1`.

Lastly, click "Add Key" and you're ready to deploy to Loom.

#### Deploying to Loom

If in the previous step, you chose to use an existing address, chances are that you already know how to use your private key to deploy to Loom. Thus, we won't describe that scenario.

However, if you chose to generate a new address, here's what you have to do:

 - Fire up your favorite text editor and open `truffle-config.js`

 - Start by importing a few things:

```js
import { sha256 } from "js-sha256"
import { CryptoUtils } from "loom-js"
import { LoomTruffleProvider } from 'loom-truffle-provider'
```

 - Next, we'll have to compute the private key from mnemonic as follows:

 ```js
const seed = mnemonicToSeedSync(mnemonic)
const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)))
const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed)
 ```

- Lastly, we can instantiate `loomProvider` like this:

```js
new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64)
```

Wrapping it up, your `truffle-config.js` file should look something like this:

```js

import { sha256 } from 'js-sha256'
import { CryptoUtils } from 'loom-js'
import { LoomTruffleProvider } from 'loom-truffle-provider'
import { mnemonicToSeedSync } from 'bip39'

const mnemonic = 'YOUR MNEMONIC'

module.exports = {
  networks: {
    loom: {
      provider: function () {
        const chainId = 'default'
        const writeUrl = 'http://basechain.dappchains.com/rpc'
        const readUrl = 'http://basechain.dappchains.com/query'
        const seed = mnemonicToSeedSync(mnemonic)
        const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)))
        const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed)
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64)
      },
      network_id: '*'
    }
  }
}
```

Well done!👏🏻👏🏻👏🏻

You are now ready to deploy your first smart contract to Loom!
