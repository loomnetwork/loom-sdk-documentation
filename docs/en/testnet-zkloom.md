---
id: testnet-zkloom
title: zkLoom Testnet
sidebar_label: zkLoom Testnet
---

This page provides basic information on how to access the zkLoom Testnet. If you want more details, see our guide for [deploying to the zkLoom Testnet](deploy-zkloom-testnet.html).

> The zkLoom Testnet is currently in a highly experimental phase, use it only for development and testing.
> The testnet state may be wiped on occassion as we fine tune the configuration and deploy new core features.

## General Information

- **Name**: zkloom-t1
- **Type**: Testnet
- **Availability**: Experimental
- **URL**: http://zkloom-t1.dappchains.com:2052
- **Network ID**: 36191

## Hardhat Configuration

Here's an example of a Hardhat config that can be used to deploy Solidity contracts to the zkLoom Testnet:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

const config: HardhatUserConfig = {
  defaultNetwork: "zkLoomTestnet",
  networks: {
    zkLoomTestnet: {
      url: "http://zkloom-t1.dappchains.com:2052",
      zksync: true,
      ethNetwork: "http://zkloom-t1.dappchains.com:2082"
    },
  },
  solidity: {
    version: "0.8.16",
  },
  zksolc: {
    version: "1.3.10",
    compilerSource: "binary",
    settings: {},
  }
};

export default config;
```

You can find the full example in the [01-testnet-deploy](https://github.com/loomnetwork/zkloom-examples/tree/main/01-testnet-deploy) project on Github.