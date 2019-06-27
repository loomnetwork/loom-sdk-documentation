In this section, we will explore the steps required to deploy your first smart contract to Loom.

First, head over to our [Developer Dashboard](https://dev-dashboard.dappchains.com/login). We offer 3 different ways in which you can connect and sign transactions:

![Select Wallet](/developers/img/deploy-to-loom-select-wallet.png)

Depending on your preference click "Ledger", "Metamask" or "Trezor via Metamask".

Next, you will be asked if you want to link your existing Relentless Marketplace account:

![Link Marketplace Account](/developers/img/deploy-to-loom-link-marketplace-account.png)

If so, click on the "Link my account" button and follow the instructions.

If you don't have a Relentless Marketplace account or you want to use a different account, just click on the "Nope, I'm not from Relentless Marketplace" button.

Say we choose to create a new account. Once we've selected this option, you'll see a Metamask popup like this:

<img src="/developers/img/deploy-to-loom-map-accounts.png" alt="Map Accounts" width="400" />

Click "Sign" and, under the hood, the dashboard will map your accounts. Next, you will be redirected to your dashboard. It'll look similar to this:

![Map Accounts](/developers/img/deploy-to-loom-dashboard.png)

## Deposit Loom to Plasmachain

From the left pane, click on the "Deploy to Plasmachain". You will be redirected to a page similar to the one below:

![New Account Options](/developers/img/deploy-to-loom-deposit-loom.png)

Notice that, in order to deploy to Plasmachain, you need to stake some LOOM. Click on the "Deposit more Loom to Plasmachain" and follow the instructions.

## Adding the Public Keys

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

Now, as an example, let's suppose you already have a Loom address- `0xC8613234a93977079d464e9b77bF60b227DB67A1`. If so, all you have to do is to replace the `0x` prefix with `loom`. It'll look something like this: `loomC8613234a93977079d464e9b77bF60b227DB67A1`.

Lastly, click "Add Key" and you're ready to deploy to Loom.

## Deploying to Loom mainnet

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
<br />import { sha256 } from 'js-sha256'
import { CryptoUtils } from 'loom-js'
import { LoomTruffleProvider } from 'loom-truffle-provider'
import { mnemonicToSeedSync } from 'bip39'

const mnemonic = 'YOUR MNEMONIC'

module.exports = {
  networks: {
    loom: {
      provider: function () {
        const chainId = 'default'
        const writeUrl = 'http://plasma.dappchains.com/rpc'
        const readUrl = 'http://plasma.dappchains.com/query'
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

You are now ready to deploy your first smart contract to Loom mainnet!