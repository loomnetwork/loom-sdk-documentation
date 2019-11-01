---
id: use-remix-with-loom
title: How to Use Remix with Loom
sidebar_label: How to Use Remix with Loom
---

## Purpose

This document walks you the process of setting up [Remix](https://remix.ethereum.org/) with Loom. 

To smooth things out, we've built a small JSON RPC Proxy. It's nothing more than a service that proxies JSON RPC calls to Loom. This allows you to integrate an Ethereum compatible service such as Remix with Loom.

Note that the current version of the proxy doesn't support the debug mechanism used by Remix.

First, you'll clone the  [JSON RPC Proxy](https://github.com/loomnetwork/loom-provider-json-rpc-proxy) repository, install the dependencies and build the proxy. Next, we'll show you how to set a few environment variables so that it'll proxy the Remix requests to Loom Basechain or Loom Testnet. We'll wrap it up by explaining how to configure Remix with our custom web3 provider.


## Prerequisites

* Node.js 10 or higher (recommended v10.15.3)

To check out if Node.js is installed on your computer, fire up a terminal and type the following command:

```bash
node -v
```

If Node.js is already installed, you'll see something like the following:

```bash
v10.15.3
```

If Node.js is not installed, or you're running an older version, you can download the installer from [this page](https://nodejs.org/en/download/)

* Yarn

See the [Yarn Installation](https://yarnpkg.com/lang/en/docs/install/) page for instructions on how to get `yarn` installed on your computer.

* Git client

If you don't have Git installed on your computer, refer to the [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) page.


## 1. Clone the JSON RPC Proxy repository.

Fire up a terminal, `cd` into your projects directory, and enter the following commands:

```bash
git clone https://github.com/loomnetwork/loom-provider-json-rpc-proxy
```


## 2. Install Dependencies and Build the Proxy

Run the following commands to install the required dependencies and build the proxy:

```bash
cd loom-provider-json-rpc-proxy/ && yarn install && yarn build
```

## 3. Configure the Proxy

You can configure the proxy to connect either to Loom Testnet or Loom Basechain by setting the following environment variables:

- PORT: the port on which the proxy listens for incoming requests. The default value is 8080.
- CHAIN_ID: the ID chain you want to connect to. The default value is `default`.
- CHAIN_ENDPOINT: the address of the endpoint. The default value is `wss://plasma.dappchains.com`.
- DEBUG: if you set this variable to `loom-provider-json-rpc-proxy`, it'll let you debug calls.

Use the following command to run the proxy against Loom Testnet:

```bash
PORT=8545 CHAIN_ENDPOINT="wss://extdev-plasma-us1.dappchains.com" CHAIN_ID="extdev-plasma-us1" node .
```

To run the proxy against Loom Basechain, simply do the following:

```bash
node .
```

All defaults just work :)


## 4. Configure Remix

At this point, you can head your browser to [Remix](https://remix.ethereum.org/). Click on the `Run` menu and then select the `Environment` as `Web3 Provider`.

![Configure Remix](/developers/img/remix.png)

Now everything is set! Go ahead and use Remix to develop and deploy your Solidity smart contracts on Loom.

Please feel free to reach out to us on [Telegram](https://t.me/loomnetworkdev) if you have any questions about this tutorial or just want to leave us feedback.


