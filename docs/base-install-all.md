---
id: basic-install-all
title: Installation Loom SDK
sidebar_label: Installation Loom SDK
---

# Installing and setting up Loom

Currently the only way to use Loom on windows is to use the   [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

Once you install that you can continue on below.

## Download loom

The following script can be used to automatically download loom and make it executable

```bash
#!/usr/bin/env bash

brew_installed=false

if grep -i Microsoft /proc/version >/dev/null 2>&1; then
  platform=linux
elif grep -iE "ubuntu|debian|centos" /proc/version >/dev/null 2>&1; then
  platform=linux
elif uname | grep -i darwin >/dev/null 2>&1; then
  platform=osx
  if \which brew >/dev/null 2>&1; then
    brew_installed=true
  fi
else
  echo "Unable to detect OS..."
  exit 1
fi

if $brew_installed; then
  echo "Installing loom using homebrew..."
  brew tap loomnetwork/client
  brew install loom || brew upgrade loom
else
  echo "Downloading loom executable..."
  if \which curl >/dev/null 2>&1; then
    download_command="curl -sL -o"
  elif \which wget >/dev/null 2>&1; then
    download_command="wget -q -O"
  fi
  $download_command loom https://private.delegatecall.com/loom/${platform}/stable/loom
  sudo mv loom /usr/local/bin/loom
  chmod +x /usr/local/bin/loom
fi
```

## Installation

Create a suitable working directory for loom to run. Here, we chose `workdir`. This is where the initial files and database will be created.

```bash
mkdir workdir
cd workdir
loom init
```

## Run Blockchain

Run from within the directory created in the installation step.

```bash
loom run
```

## To get started with Solidity + Truffle

See our tutorial on [Truffle and Solidity](truffle-deploy.html)

## To get started on Golang Contracts

See our [Golang Contracts](prereqs-all.html)
