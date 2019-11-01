---
id: basic-install-all
title: 로컬 Loom 체인 셋업
sidebar_label: 로컬 Loom 체인 셋업
---

## 목적

이 문서는 여러분에게 로컬 Loom 체인을 셋업하는 과정을 안내하기 위한 문서입니다. This step is ***not required for deploying to Loom Testnet or Loom Mainnet***, but we've included it because some people might find it useful. Say, for example, you're offline for large amounts of time. Why wouldn't you want to use that time do some dev work? So, for those of you considering working offline, this document will provide the necessary details.

# Loom 설치 및 설정하기

Currently the only way to use Loom on Windows is to use the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).1

Once you install that, you can continue with the below sections.

## Download loom

The following script automatically downloads the latest stable version of loom to the current directory:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
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