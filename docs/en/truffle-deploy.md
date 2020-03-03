---
id: truffle-deploy
title: Truffle DAppChain Example
sidebar_label: Truffle Deploy
---


# Truffle DappChain Example

This simple example shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with the Basechain.

![](https://dzwonsemrish7.cloudfront.net/items/0a1N05043p1Y1G3K1Y2L/Screen%20Recording%202018-07-17%20at%2011.26%20AM.gif?v=df873ac3)


## Requirements

Make sure the following requirements are met and then follow the steps in the next section:

```text
Node >= 8
yarn or npm
```

## Install

First, let's clone this repository. Open a terminal, `cd` into the directory where you store your projects, and run the following command:

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

## Run against Extdev Testnet

### Generate the Loom private key

The following command will download the `loom` binary and generate the private key for you:

```bash
yarn gen:extdev-key
```

> The Loom private key will be saved into a file called `extdev_private_key`.


### Deploy to Extdev Testnet

As an example, we will deploy and run our application against Extdev.

Run the following command:

```bash
yarn deploy:extdev
```

>The above command will **compile and then deploy** our smart contract to Extdev


### Test

Run this command below to send transactions to the smart contract deployed to Extdev:


```test
yarn test:extdev
```

If everything looks good, let's spin up a web server and interact with our smart contract.

### Start the web interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

> The web interface is available on http://localhost:8080.


## Run against local Loom chain

First, you have to generate a private key using:

```bash
yarn gen:extdev-key
```

### Spin up Loom Chain

In a new terminal, run:

```bash
yarn loom-init
```

### Deploy the smart contract

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

### Test

```
yarn test
```

## Web interface

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


## Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also is possible to call truffle command directly with `yarn truffle`.

2. We're not versioning the build directory for this particular example, although is recommended to versioning, the limitation can be removed by editing the `.gitignore` file.


## Current limitations

* Events declared on smart contracts should have an named parameter like `NewValueSet(uint _value)` in the contract `SimpleStore.sol`. Also, it helps in dealing with events.

Loom Network
----
[https://loomx.io](https://loomx.io)


License
----

BSD 3-Clause License
