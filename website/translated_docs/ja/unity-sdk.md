---
id: unity-sdk
title: Unity SDK
sidebar_label: Unity SDK
---
## 概要

[Unity SDK](http://github.com/loomnetwork/unity3d-sdk)は、ゲームがLoom DAppチェーン上で実行されるスマートコントラクトと対話することを可能にし、またアイデンティティ管理や資産の移転といったオプションサービスも提供する。 Unityのターゲットプラットフォームは、現在以下がサポートされている:

- Desktop (Mac/Windows/Linux)
- Android
- iOS
- WebGL

## サンプル コード

[`Assets/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/Samples/QuickStart)に、このページの全コード及びLoom Unity SDK内で用意済みのUnityシーンがある。

## DAppチェーンへの接続

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Loom SDKのサンプルスマートコントラクト[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) と対話する`Contract` インスタンスを作成する関数を書いてみよう。

```csharp
// LoomQuickStartSample.cs
using System;
using System.Threading.Tasks;
using UnityEngine;
using Loom.Unity3d;
using Loom.Unity3d.Samples;

public class LoomQuickStartSample : MonoBehavior
{
    Contract GetContract(byte[] privateKey, byte[] publicKey)
    {
        var client = new DAppChainClient("http://localhost:46658", "http://localhost:47000")
        {
            Logger = Debug.unityLogger
        };
        // ミドルウェアを要求
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]{
            new NonceTxMiddleware{
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });
        // Loom DAppチェーン上のスマートコントラクト`helloworld` のアドレス
        var contractAddr = Address.FromHexString("0x005B17864f3adbF53b1384F2E6f2120c6652F779");
        var callerAddr = Address.FromPublicKey(publicKey);
        return new Contract(client, contractAddr, "helloworld", callerAddr);
    }
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 Fortunately the `Contract` class takes care of most of this when you use the `Contract.CallAsync()` method.

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value, note that this method doesn't return anything. Let's add a method to the `LoomQuickStartSample` class that calls `helloworld.SetMsg()`.

```csharp
async Task CallContract(Contract contract)
{
    await contract.CallAsync("SetMsg", new MapEntry
    {
        Key = "123",
        Value = "hello!"
    });
}
```

Smart contract methods that mutate state may return a value. The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `SetMsgEcho` method that will store a key/value and return the key/value it stored. Let's add another method to the `LoomQuickStartSample` class to call `helloworld.SetMsgEcho`.

```csharp
async Task CallContractWithResult(Contract contract)
{
    var result = await contract.CallAsync<MapEntry>("SetMsgEcho", new MapEntry
    {
        Key = "321",
        Value = "456"
    });

    if (result != null)
    {
        // This should print: { "key": "321", "value": "456" } in the Unity console window.
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, calling a read-only method doesn't modify the smart contract state. You can call a read-only method on a smart contract by using the `Contract.StaticCallAsync()` method.

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. Let's add a method to the `LoomQuickStartSample` class to call `helloworld.GetMsg`.

```csharp
async Task StaticCallContract(Contract contract)
{
    var result = await contract.StaticCallAsync<MapEntry>("GetMsg", new MapEntry
    {
        Key = "123"
    });

    if (result != null)
    {
        // This should print: { "key": "123", "value": "hello!" } in the Unity console window
        // provided `LoomQuickStartSample.CallContract()` was called first.
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## Putting it all together

Add the following method to the `LoomQuickStartSample` class.

```csharp
// Use this for initialization
async void Start()
{
    // The private key is used to sign transactions sent to the DAppChain.
    // Usually you'd generate one private key per player, or let them provide their own.
    // In this sample we just generate a new key every time.
    var privateKey = CryptoUtils.GeneratePrivateKey();
    var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);

    var contract = GetContract(privateKey, publicKey);
    await CallContract(contract);
    // This should print: { "key": "123", "value": "hello!" } in the Unity console window
    await StaticCallContract(contract);
    // This should print: { "key": "321", "value": "456" } in the Unity console window
    await CallContractWithResult(contract);
}
```

Now that we have all the code in place let's test it out: 1. Create an empty `GameObject` in a Unity scene and attach the `LoomQuickStartSample` script to it. 2. Deploy the [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract on a local Loom DAppChain node. 3. Hit `Play` in the Unity Editor.