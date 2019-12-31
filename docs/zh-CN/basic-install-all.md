---
id: basic-install-all
title: Setup Local Loom Chain
sidebar_label: Setup Local Loom Chain
---

## Purpose

The purpose of this document is to walk you through the process of setting up a local Loom Chain. This step is ***not required for deploying to Loom Testnet or Loom Mainnet***, but we've included it because some people might find it useful. Say, for example, you're offline for large amounts of time. Why wouldn't you want to use that time do some dev work? So, for those of you considering working offline, this document will provide the necessary details.

# Installing and setting up Loom

Currently the only way to use Loom on Windows is to use the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).1

Once you install that, you can continue with the below sections.

## Download loom

The following script automatically downloads the latest stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | bash
```

## Initialize

To initialize loom, type:

```bash
./loom init
```

## Run Blockchain

Run the following command from within the directory created in the installation step:

```bash
./loom run
```