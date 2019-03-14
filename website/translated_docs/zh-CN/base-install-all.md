---
id: basic-install-all
title: 安装 Loom SDK
sidebar_label: 安装 Loom SDK
---
# 安装和设置 Loom

目前在 Windows 上使用 Loom 的唯一方法是使用 [Windows 的 Linux 子系统](https://docs.microsoft.com/en-us/windows/wsl/install-win10)。

安装好之后，可进行下一步操作。

## 下载 loom

以下脚本可用于自动将稳定版的loom下载到当前目录：

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 安装

```bash
./loom init
```

## 运行区块链

从安装步骤中创建的目录中运行。

```bash
./loom run
```

## 开始使用 Solidity + Truffle

看看我们的 [Truffle 和 Solidity](join-testnet.html) 相关教程

## 开始使用 Golang 合约

看看我们的 [Golang 合约](prereqs-all.html)