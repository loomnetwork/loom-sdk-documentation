---
id: basic-install-windows
title: 安装 (Windows)
sidebar_label: 安装 (Windows)
---
在 Windows 上安装和设置 Loom

目前在 Windows 上使用 Loom 的唯一方法是使用 [Windows 的 Linux 子系统](https://docs.microsoft.com/en-us/windows/wsl/install-win10)。

安装完成后，你可以继续执行以下操作并运行 Linux 安装步骤。

## 安装

```bash
wget https://private.delegatecall.com/loom/linux/stable/loom
chmod +x loom

./loom init
```

## 运行区块链

    ./loom run
    

## 开始使用 Solidity + Truffle

看看我们的 [Truffle 和 Solidity](truffle-deploy.html) 相关教程

## 开始使用 Golang 合约

看看我们的 [Golang 合约](prereqs.html)