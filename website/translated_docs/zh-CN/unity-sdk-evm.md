---
id: unity-sdk-evm
title: 基于EVM的智能合约快速入门
sidebar_label: 基于EVM的智能合约快速入门
---
Loom支持EVM（[以太坊虚拟机](evm.html)）和基于插件的智能合约。 比如，可以使用（go-loom）[https://github.com/loomnetwork/go-loom] 创建基于插件的智能合约。

在此示例中，我们将演示如何使用Unity SDK与基于EVM的智能合约进行通信。

## 示例代码

这个示例使用了来自[`unity-tiles-chain-evm` 演示 ](https://github.com/loomnetwork/unity-tiles-chain-evm) 的Solidity 合约。 出于此示例的目的，我们将使用此示例合约来存储文本字符串。

## 连接到 DApp链

`EvmContract` 类提供了一种方便的方式与在运行着EVM-兼容智能合约的 Loom DApp 链上运行的智能合约进行交互。 让我们编写一个创建`EvmContract` 实例的方法来与示例[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约进行交互。

```csharp
// LoomEvmQuickStartSample.cs
using UnityEngine;
using System;
using System.Threading.Tasks;
using Loom.Unity3d;
using Loom.Nethereum.ABI.FunctionEncoding.Attributes;

public class LoomEvmQuickStartSample : MonoBehaviour
{
    async Task<EvmContract> GetContract(byte[] privateKey, byte[] publicKey)
    {
        var writer = RPCClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            .WithWebSocket("ws://127.0.0.1:46657/websocket")
            .Create();

        var reader = RPCClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            .WithWebSocket("ws://127.0.0.1:9999/queryws")
            .Create();

        var client = new DAppChainClient(writer, reader)
            { Logger = Debug.unityLogger };

        // 必须的中间件
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]
        {
            new NonceTxMiddleware
            {
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });

        // 合约的ABI
        const string abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_tileState\",\"type\":\"string\"}],\"name\":\"SetTileMapState\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"GetTileMapState\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"state\",\"type\":\"string\"}],\"name\":\"OnTileMapStateUpdate\",\"type\":\"event\"}]\r\n";
        // 注意：使用基于EVM的智能合约，您无法按名称访问它们。
        // 将已部署合约的地址放在此处。
        var contractAddr = Address.FromHexString("0xf420fbbb810698a74120df3723315ee06f472870");
        var callerAddr = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddr, abi);
    }
}
```

## 将数据写入 DApp链

要改变智能合约的状态，您需要调用其公共方法之一，为此必须将签名的事务发送到DApp链并由其进行验证。 幸运的是，当你使用`EvmContract.Call*Async()`系列方法时， `EvmContract`类会处理大部分内容。

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约有一个公共`SetTileMapState` 方法，可以调用该方法来存储键和值之间的关联，请注意，此方法不返回任何内容。 Let's add a method to the `LoomEvmQuickStartSample` class that calls `TilesChain.SetTileMapState()`.

```csharp
public async Task CallContract(EvmContract contract)
{
    if (contract == null)
    {
        throw new Exception("Not signed in!");
    }
    Debug.Log("Calling smart contract...");

    await contract.CallAsync("SetTileMapState", "hello " + UnityEngine.Random.Range(0, 10000));

    Debug.Log("Smart contract method finished executing.");
}
```

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, calling a read-only method doesn't modify the smart contract state. You can call a read-only method on a smart contract by using the `EvmContract.StaticCall*Async()` family of methods.

The [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract has a public `GetTileMapState` method that can be called to get the stored string value. Let's add a method to the `LoomEvmQuickStartSample` class to call `TilesChain.GetTileMapState`.

```csharp
public async Task StaticCallContract(EvmContract contract)
{
    if (contract == null)
    {
        throw new Exception("Not signed in!");
    }

    Debug.Log("Calling smart contract...");

    string result = await contract.StaticCallSimpleTypeOutputAsync<string>("GetTileMapState");
    if (result != null)
    {
        Debug.Log("Smart contract returned: " + result);
    } else
    {
        Debug.LogError("Smart contract didn't return anything!");
    }
}
```

## Receiving events from a DAppChain

DAppChains can trigger events in reaction to calling a smart contract. To be notified of new events, you must subscribe to the `EvmContract.EventReceived` event. But first, we need to define a DTO (Data Transfer Object) that specifies the event parameters.

```csharp
public class OnTileMapStateUpdateEvent
{
    [Parameter("string", "state", 1)]
    public string State { get; set; }
}

private void ContractEventReceived(object sender, EvmChainEventArgs e)
{
    Debug.LogFormat("Received smart contract event: " + e.EventName);
    if (e.EventName == "OnTileMapStateUpdate")
    {
        OnTileMapStateUpdateEvent onTileMapStateUpdateEvent = e.DecodeEventDTO<OnTileMapStateUpdateEvent>();
        Debug.LogFormat("OnTileMapStateUpdate event data: " + onTileMapStateUpdateEvent.State);
    }
}
```

## Putting it all together

Add the following method to the `LoomEvmQuickStartSample` class.

```csharp
async void Start()
{
    // The private key is used to sign transactions sent to the DAppChain.
    // Usually you'd generate one private key per player, or let them provide their own.
    // In this sample we just generate a new key every time.
    var privateKey = CryptoUtils.GeneratePrivateKey();
    var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);

    // Connect to the contract
    var contract = await GetContract(privateKey, publicKey);
    // This should print something like: "hello 6475" in the Unity console window if some data is already stored
    await StaticCallContract(contract);
    // Listen for events
    contract.EventReceived += ContractEventReceived;
    // Store the string in a contract
    await CallContract(contract);
}
```

Now that we have all the code in place let's test it out: 1. Create an empty `GameObject` in a Unity scene and attach the `LoomEvmQuickStartSample` script to it. 2. Deploy the [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract on a local Loom DAppChain node. 3. Hit `Play` in the Unity Editor.