---
id: validator
title: Become Validator
sidebar_label: Become Validator
---

## Purpose

This page walks you through the steps necessary to become a validator.

First, we will describe how to create a Loom public-private key pair, and then we'll show you how to use our validator self-service to get your address whitelisted.

> Note that, in order to whitelist your address, you need 1.25M Loom.

### Creating a Loom Public-Private Key Pair

First, you need to download the latest stable version of Loom. Fire up a terminal and run the following command:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

Then, you can create a public-private key pair like this:

```bash
./loom genkey -a pubkey -k privkey
```

This will save your private key into a file called `privkey` and your public key into a file called `pubkey`:

![Generate Keys](/developers/img/validator-management-generate-keys.png)

### Connecting to Dashboard

First, let's head over to our [validator management](https://dashboard.dappchains.com/validator-management) page. You will be asked to choose a wallet. Currently, we provide support for the following wallets:

![Select wallet](/developers/img/validator-management-select-wallet.png)

> Please note that, for the scope of this tutorial, we're using our Testnet. However, the process is similar on Loom Mainnet.

Depending on your preference, click "Metamask", "Ledger (Legacy)", "Ledger (via Metamask)"or "Trezor via Metamask".

We selected MetaMask, but the process is similar if you choose a different wallet. Next, you'll see a Metamask popup like this:

![Select wallet](/developers/img/validator-management-connect-request.png)

Just click "Connect" and, at this point, the dashboard will map your Ehtereum and Loom Mainnet accounts. If it sounds complex, there's no need to worry. Everything happens under the hood and you will only be asked to sign a message:

![Signature request](/developers/img/validator-management-signature-request.png)

Wait a bit until the mapping gets created.

### Adding a Mapping to an Existing Loom Mainnet Account

Next, you'll have two options to choose from:

- Add a mapping to an existing Loom Mainnet Account, or
- Create a new account
    
    ![Map to an existing account](/developers/img/validator-management-map-to-an-existing-account.png)

Go ahead and select "Add a mapping to an existing Loom Mainnet Account".

The dashboard will ask you to input your Loom Mainnet private key:

![Input your private key](/developers/img/validator-management-input-your-private-key.png)

Go ahead and paste your private key and then click "Continue" to move to the next step.

Now, the dashboard will derive the address from the private key you provided and will check if a mapping already exists for said address. If not, it will create a new mapping. This will take a few seconds to process and you will be asked to sign a message:

![Signature Request](/developers/img/validator-management-signature-request-2.png)

Once the mapping is created and verified you will be redirected to your account page:

![Your account](/developers/img/validator-management-your-account.png)

### Depositing Loom

In the previous section you learned how to map your accounts. Next, we will show you how to deposit tokens to Loom Mainnet.

From the left pane, click on the "Deposit and Withdraw" and then select "Deposit" from the "LOOM" tab:

![Deposit and withdraw](/developers/img/validator-management-deposit-and-withdraw.png)

A popup will show, asking you to enter the amount of Loom you want to deposit. Type `1250000` and click "Confirm":

![Deposit Loom from Ethereum](/developers/img/validator-management-deposit-loom-from-ethereum.png)

Next, Metamask will ask you to approve the transaction:

![Approve deposit](/developers/img/validator-management-approve-deposit.png)

Click "Confirm" and wait a bit until a new popup will ask you to confirm the deposit:

![Confirm deposit](/developers/img/validator-management-complete-deposit.png)

Then, Metamask will ask you once again to confim the transaction:

![Final confirmation](/developers/img/validator-management-final-confirmation.png)

Note that your Loom Mainnet balance will get updated after 10 block confirmations:

![10 blocks confirmation](/developers/img/validator-management-10-block-confirmations.png)

Once 10 blocks are confirmed, your balace on Loom Mainnet will get updated

![Updated balance](/developers/img/validator-management-updated-balance.png)

Great! You're almost there. Next, we'll show you how to actually whitelist your address

### Whitelisting your Address

Now, go to the left pane and click on the "Validator Management". You will be taken to a page looking like below:

![Register as a validator](/developers/img/validator-management-register-as-validator.png)

Click on the "Register Validator" button and you will be asked to fill in the following bits of information:

- Public key
- Validator Name
- Description
- Website
- Fee

Paste the content from the `pubkey` file you created a bit earlier and, once you're finished filling in the form, click "Submit". A Metamask popup will ask you to sign the transaction:

![Sign Add Validator](/developers/img/validator-management-sign-add-validator.png)

Lastly, you will need to sign a message similar to the one below:

![Sign Message Add Validator](/developers/img/validator-management-sign-message-add-validator.png)

Hooray! You've just whitelisted your address. Now, the Validator Management page should look something like this:

![Sign Message Add Validator](/developers/img/validator-management-successfuly-registered.png)

Awesome, right? You're on your way of becoming a validator on Loom!