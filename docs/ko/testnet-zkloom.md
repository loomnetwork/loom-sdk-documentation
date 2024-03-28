---
id: testnet-zkloom
title: zkLoom Testnet
sidebar_label: zkLoom Testnet
---

This page provides basic information on how to access the zkLoom Sepolia Testnet.
If you want more details, see our guide for [deploying to the zkLoom Testnet](deploy-zkloom-testnet.html).

> The zkLoom Sepolia Testnet is currently in a highly experimental phase, use it only for development and testing.
> The testnet state may be wiped on occassion as we fine tune the configuration and deploy new core features.

## General Information

- **Name**: zkloom-sepolia
- **Type**: Testnet
- **Availability**: Experimental
- **URL**: http://zkloom-sepolia.dappchains.com:2052
- **Network ID**: 36192

## Hardhat Configuration

Here's an example of a Hardhat config that can be used to deploy Solidity contracts to the zkLoom Sepolia Testnet:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

const config: HardhatUserConfig = {
  defaultNetwork: "zkLoomSepolia",
  networks: {
    hardhat: {
      zksync: false,
    },
    zkLoomSepolia: {
      url: "http://zkloom-sepolia.dappchains.com:2052",
      zksync: true,
      ethNetwork: "https://sepolia.infura.io/v3/<API-KEY>"
    },
  },
  solidity: {
    version: "0.8.17",
  }
};

export default config;
```

Note that you'll need to replace `<API-KEY>` in the snippet above with your own Infura API key,
you can obtain one when you sign up for a free account at https://app.infura.io/

You can find the full example in the [01-testnet-deploy](https://github.com/loomnetwork/zkloom-examples/tree/main/01-testnet-deploy) project on Github.