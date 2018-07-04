---
id: unity-sdk-plugin
title: 基于插件的智能合约快速入门
sidebar_label: 基于插件的智能合约快速入门
---
Loom支持EVM（[以太坊虚拟机](evm.html)）和基于插件的智能合约。 比如，可以使用 [go-loom](https://github.com/loomnetwork/go-loom)创建基于插件的智能合约。

在此示例中，我们将演示如何使用Unity SDK与基于插件的智能合约进行通信。

## 示例代码

您可以在该页面上找到所有代码，并在 [`Assets/LoomSDK/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/LoomSDK/Samples/QuickStart)下的Loom Unity SDK中找到随时可用的Unity场景。

## 连接到 DApp链

`Contract` 类提供了一种方便的方式与Loom DApp链上运行的智能合约进行交互。 让我们编写一个函数，来创建一个与Loom SDK中提供的示例[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 智能合约进行交互的`Contract`实例......

```csharp
// LoomQuickStartSample.cs
using System;
using System.Threading.Tasks;
using UnityEngine;
using Loom.Unity3d;
using Loom.Unity3d.Samples;

public class LoomQuickStartSample : MonoBehavior
{
    async Task<Contract> GetContract(byte[] privateKey, byte[] publicKey)
    {
        var writer = RPCClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            .WithHTTP("http://127.0.0.1:46658/rpc")
            .Create();

        var reader = RPCClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            .WithHTTP("http://127.0.0.1:46658/query")
            .Create();

        var client = new DAppChainClient(writer, reader)
        {
            Logger = Debug.unityLogger
        };
        // required middleware
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]{
            new NonceTxMiddleware{
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });
        var contractAddr = await client.ResolveContractAddressAsync("BluePrint");
        var callerAddr = Address.FromPublicKey(publicKey);
        return new Contract(client, contractAddr, callerAddr);
    }
}
```

## 将数据写入 DApp链

要改变智能合约的状态，您需要调用其公共方法之一，为此必须将签名的事务发送到DApp链并由其进行验证。 幸运的是, 当您使用 `Contract.CallAsync()`方法时， `Contract`类将处理其中的大部分问题。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 智能合约有一个公共`SetMsg`方法，可以调用该方法来存储键和值之间的关联，请注意，此方法不返回任何内容。 让我们为调用`BluePrint.SetMsg()`的`LoomQuickStartSample`类添加一个方法。

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

改变状态的智能合约方法可能会返回一个值。 [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)智能合约具有公共 `SetMsgEcho`方法，该方法将存储键/值，并返回其存储的键/值。 让我们在 `LoomQuickStartSample` 类中添加另一个方法来调用`BluePrint.SetMsgEcho`。

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

## 从DApp链读取数据

要读取智能合约的状态，您需要调用其公共只读方法之一，调用只读方法不会修改智能合约状态。 You can call a read-only method on a smart contract by using the `Contract.StaticCallAsync()` method.

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. Let's add a method to the `LoomQuickStartSample` class to call `BluePrint.GetMsg`.

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

    var contract = await GetContract(privateKey, publicKey);
    await CallContract(contract);
    // This should print: { "key": "123", "value": "hello!" } in the Unity console window
    await StaticCallContract(contract);
    // This should print: { "key": "321", "value": "456" } in the Unity console window
    await CallContractWithResult(contract);
}
```

Now that we have all the code in place let's test it out: 1. Create an empty `GameObject` in a Unity scene and attach the `LoomQuickStartSample` script to it. 2. Deploy the [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract on a local Loom DAppChain node. 3. Hit `Play` in the Unity Editor.