---
id: Relentless
title: Relentless
sidebar_label: How to set-up Relentless
---

## Purpose

[Relentless](https://loom.games/en/) is an adrenaline-pumping trading card game for mobile and desktop. The game is completely free and now it's open-source too. This document will show you how to spin up your instance of Gamechain, build the Relentless smart contract, and run the game in Unity. Lastly, we'll show you how to generate the binaries for macOS, Windows, Android, and iOS.

## Getting Started

1. Install Go by following the instructions from the [Go Getting Started](https://golang.org/doc/install) page.


2. Create the directory in which we're going to install dependencies and build the game:

```bash
mkdir -p ~/go/src ~/go/bin ~/go/pkg
```

3. Create an environment variable called `GOPATH` and append it to `PATH` by adding the following lines to your `~/.bash_profile ` file:


```bash
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin
```

4. Reload configuration:

```bash
source ~/.bash_profile
```

5. Install the Protocol Buffers for Go by following the instructions from [this page](https://github.com/gogo/protobuf).

6. Download the `protoc` binary v3.9.1 for your operating system from [this page](https://github.com/protocolbuffers/protobuf/releases`).


7. Extract the zip and then:
 - copy the `bin/protoc` file into `/usr/local/bin/` and 
 - copy `include/google` into `/usr/local/include/`.

8. Now, cd into `~/go/bin` and download the `loom` binary by entering the following command:

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

9. Install `go-loom`, our Go package for building Go Smart Contracts for the Loom SDK:

```bash
go get github.com/loomnetwork/go-loom
```

10.  Clone the Gamechain repo with:

```text
cd ~/go/src/github.com/loomnetwork/ && git clone https://github.com/loomnetwork/gamechain
``` 

11. Install the `dep` dependency manager:

```text
go get -u github.com/golang/dep/cmd/dep
```

12. Building the `gamechain` binary requires you to authenticate to GitHub using `ssh`. Follow the instructions from [this page](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate a new SSH key. Next, refer to the instructions on the [Adding a new SSH key to your GitHub account](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account) for configuring GitHub to yse  your SSH key.

## Build the Relentless Smart Contract

To build the Relentless smart contract, enter the following commands:


```text
cd ~/go/src/github.com/loomnetwork/gamechain
make deps
make
```

## Spin up Gamechain

In a new terminal, run the following commands:

```bash
loom init
cp zb.genesis.json genesis.json
loom run
```

## Setup the Oracle, Create an Account and Run Transactions

Follow the instructions from the [GameChain GitHub page](https://github.com/loomnetwork/gamechain#creating-account-and-running-transactions) to create an account and run transactions.

## The Front-end

1. Download Unity 2018.4.1 from [this page](https://unity3d.com/get-unity/download/archive) and install it


2. Fire up a terminal, `cd` into your projects directory, and clone the Relentless repo:

```bash
git clone https://github.com/loomnetwork/Relentless/
```


3. Start Unity and point it to the directory in which you cloned the Relentless repo.


4. Configure the backend endpoints by editing the `Assets/Scripts/App/Settings/BackendEndpointsContainer.cs`:

```
using System.Collections.Generic;

namespace Loom.ZombieBattleground.BackendCommunication
{
    public static class BackendEndpointsContainer
    {
        public static readonly string CurrentStagingDataVersion = "v26";

        public static readonly IReadOnlyDictionary<BackendPurpose, BackendEndpoint> Endpoints =
            new Dictionary<BackendPurpose, BackendEndpoint>
            {
                {
                    BackendPurpose.Local,
                    new BackendEndpoint(
                        "https://stage-auth.loom.games",
                        "ws://<backend-ip-address>:46658/queryws",
                        "ws://<backend-ip-address>:46658/websocket",
                        "https://stage-vault.delegatecall.com/v1",
                        CurrentStagingDataVersion,
                        false,
                        false,
                        false,
                        PlasmachainEndpointConfigurationsContainer.EndpointConfigurations[BackendPurpose.Staging]
                    )
                },
                {
                    BackendPurpose.Development,
                    new BackendEndpoint(
                        "https://stage-auth.loom.games",
                        "ws://<backend-ip-address>:46658/queryws",
                        "ws://<backend-ip-address>:46658/websocket",
                        "https://stage-vault.delegatecall.com/v1",
                        CurrentStagingDataVersion,
                        false,
                        false,
                        false,
                        PlasmachainEndpointConfigurationsContainer.EndpointConfigurations[BackendPurpose.Staging]
                    )
                }
            };
    }
}
```

5. Start the game by opening the `APP_INIT` scene.


## Build the game

From the `Windows` menu, select `AssetBundle Browser` and go to the `Build` tab.

### MacOS and Windows

Select the platform, the output path, and then check the `Copy to StreamingAssets` checkbox. Lastly, press the `Build` button.

Once done, make sure that the asset bundle files are correctly placed in `StreamingAssets/AssetBundles/`

### Android

1. Go to `File` -> `Build Settings` and select `Android` from the list of platforms

2. Click on the `Open Download Page` and download the installer.

3. Run the installer. Once the installation is finished, restart Unity.

4. Go to `File` -> `Build settings`. Then, select `Android` from the list of platforms.

5. Next, click on `Player Settings` button. Go to the `Player Settings` -> `Publishing Settings` section and select a keystore.

6. Go back to the `Build Settings` window and click `Build`


### iOS

1. Go to `File` -> `Build Settings` and select `iOS` from the list of platforms

2. Click on the `Open Download Page` and download the installer.

3. Run the installer. Once the installation is finished, restart Unity.

4. Go to `File` -> `Build settings`. Then, select `iOs` from the list of platforms.

5. Go back to the `Build Settings` window and click `Build`

6. This will generate an XCode project. Use XCode to compile and sign the  iOS app. See [this page](https://docs.unity3d.com/Manual/StructureOfXcodeProject.html) for more details on the structure of the iOS project.
