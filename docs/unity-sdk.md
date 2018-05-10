---
id: unity-sdk
title: Unity SDK
sidebar_label: Unity SDK
---

## Overview

The [Unity SDK](http://github.com/loomnetwork/unity3d-sdk) allows games to interact with smart
contracts running on Loom DAppChains, it also provides optional services like identity management
and asset transfers. The following Unity target platforms are currently supported:

- Desktop (Mac/Windows/Linux)
- Android
- iOS
- WebGL

## Connecting to a DAppChain

The `Contract` class provides a convenient way to interact with a smart contract running on a Loom
DAppChain. Let's write a function that creates a `Contract` instance to interact with the sample
`helloworld` smart contract from the Loom SDK...

```csharp
using UnityEngine;
using Loom.Unity3d;
using Google.Protobuf;

public class Sample : MonoBehavior
{
    private Address contractAddr;
    private DAppChainClient client;

    void CreateClient()
    {
        this.client = new DAppChainClient("http://localhost:46657", "http://localhost:47000")
        {
            Logger = Debug.unityLogger
        };
        this.client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]{
            new NonceTxMiddleware{
                PublicKey = publicKey,
                Client = this.client
            },
            new SignedTxMiddleware(privateKey)
        });

        this.contractAddr = new Address
        {
            ChainId = "default",
            Local = ByteString.CopyFrom(CryptoUtils.HexStringToBytes("0x005B17864f3adbF53b1384F2E6f2120c6652F779"))
        };
    }    
}
```

## Writing data to a DAppChain

To mutate the state of a smart contract you need to call one of its public methods, to do so a
signed transaction must be sent to and validated by the DAppChain.

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods.
