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
        // 请求中间件
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
        // 这应该在Unity控制台窗口中打印：{“key”：“321”，“value”：“456”}。
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## 从DApp链读取数据

要读取智能合约的状态，您需要调用其公共只读方法之一，调用只读方法不会修改智能合约状态。 你可以使用`Contract.StaticCallAsync()`方法在智能合约上调用只读方法。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)智能合约具有公共 `GetMsg`方法，可以调用该方法来查找键和值之间的关联。 让我们在 `LoomQuickStartSample`类中添加一个方法来调用`BluePrint.GetMsg`。

```csharp
async Task StaticCallContract(Contract contract)
{
    var result = await contract.StaticCallAsync<MapEntry>("GetMsg", new MapEntry
    {
        Key = "123"
    });

    if (result != null)
    {
        // 这应该在Unity控制台窗口中打印：{ "key": "123", "value": "hello!" }
        // 如果`LoomQuickStartSample.CallContract()` 首先被调用的话.
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## 放在一起

将以下方法添加到 `LoomQuickStartSample`类中。

```csharp
// 用于初始化
async void Start()
{
    // 私钥用于签署发送到DApp链的事务。
    // 通常你会为每个玩家生成一个私钥，或让他们提供自己的私钥。
    // 在此示例中，我们每次都会生成一个新密钥。
    var privateKey = CryptoUtils.GeneratePrivateKey();
    var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);

    var contract = await GetContract(privateKey, publicKey);
    await CallContract(contract);
    //  这应该在Unity控制台窗口中打印：{ "key": "123", "value": "hello!" } 
    await StaticCallContract(contract);
    // 这应该在Unity控制台窗口中打印：{ "key": "321", "value": "456" } 
    await CallContractWithResult(contract);
}
```

现在我们已经准备好了所有代码，让我们测试一下： 1. 在Unity场景中创建一个空的`GameObject`并将 `LoomQuickStartSample`脚本添加进去。 2. 在本地Loom DApp链节点上部署 [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 智能合约。 3. 在Unity编辑器中点击 `Play`。