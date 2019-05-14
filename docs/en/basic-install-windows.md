---
id: basic-install-windows
title: Installation (Windows)
sidebar_label: Installation (Windows)
---
Installing and setting up Loom on Windows

Currently the only way to use Loom on windows is to use the   [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Once you install that you can continue on below and run the Linux install steps.

## Installation

```bash
wget https://private.delegatecall.com/loom/linux/stable/loom
chmod +x loom

./loom init
```

## Run Blockchain
```
./loom run
```


## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](truffle-deploy.html)


## To get started on Golang Contracts 

See our [Golang Contracts](prereqs.html)