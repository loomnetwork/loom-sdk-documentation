---
id: unity-sdk-evm
title: 基于EVM的智能合约快速入门
sidebar_label: 基于EVM的智能合约快速入门
---
Loom支持EVM（[以太坊虚拟机](evm.html)）和基于插件的智能合约。 比如，可以使用 [go-loom](https://github.com/loomnetwork/go-loom)创建基于插件的智能合约。

在此示例中，我们将演示如何使用Unity SDK与基于EVM的智能合约进行通信。

## 示例代码

这个示例使用了来自[`unity-tiles-chain-evm` 演示 ](https://github.com/loomnetwork/unity-tiles-chain-evm) 的Solidity 合约。 出于此示例的目的，我们将使用此示例合约来存储文本字符串。

## 连接到 DApp链

`EvmContract` 类提供了一种方便的方式与在运行着EVM-兼容智能合约的 Loom DApp链上运行的智能合约进行交互。 让我们编写一个创建`EvmContract` 实例的方法来与示例[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约进行交互。

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
            .WithWebSocket("ws://127.0.0.1:46658/websocket")
            .Create();

        var reader = RPCClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            .WithWebSocket("ws://127.0.0.1:46658/queryws")
            .Create();

        var client = new DAppChainClient(writer, reader)
            { Logger = Debug.unityLogger };

        // required middleware
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]
        {
            new NonceTxMiddleware
            {
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });

        // ABI of the Solidity contract
        const string abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_tileState\",\"type\":\"string\"}],\"name\":\"SetTileMapState\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"GetTileMapState\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"state\",\"type\":\"string\"}],\"name\":\"OnTileMapStateUpdate\",\"type\":\"event\"}]\r\n";
        // Note: With EVM based smart contracts, you can't access them by name.
        // 将已部署合约的地址放在此处。
        var contractAddr = Address.FromHexString("0xf420fbbb810698a74120df3723315ee06f472870");
        var callerAddr = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddr, abi);
    }
}
```

## 将数据写入 DApp链

要改变智能合约的状态，您需要调用其公共方法之一，为此必须将签名的事务发送到DApp链并由其进行验证。 幸运的是，当你使用`EvmContract.Call*Async()`系列方法时， `EvmContract`类会处理大部分内容。

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约有一个公共`SetTileMapState` 方法，可以调用该方法来存储键和值之间的关联，请注意，此方法不返回任何内容。 让我们为调用`TilesChain.SetTileMapState()`的`LoomEvmQuickStartSample` 类添加一个方法。

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

## 从DApp链读取数据

要读取智能合约的状态，您需要调用其公共只读方法之一，调用只读方法不会修改智能合约状态。 你可以使用 `EvmContract.StaticCall*Async()` 系列方法在智能合约上调用只读方法。

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约有一个公共`SetTileMapState` 方法，可以调用该方法来存储键和值之间的关联，请注意，此方法不返回任何内容。 让我们在`LoomEvmQuickStartSample` 类中添加一个方法调用 `TilesChain.GetTileMapState`。

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

## 从DApp链接收事件

DApp链可以触发事件来回应调用智能合约。 要收到有关新事件的通知，您必须订阅`EvmContract.EventReceived`事件。 但首先，我们需要定义一个指定事件参数的DTO（数据传输对象）。

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

## 放在一起

将以下方法添加到 `LoomEvmQuickStartSample`类中。

```csharp
async void Start()
{
    // 私钥用于签署发送到DApp链的事务。
    // 通常你会为每个玩家生成一个私钥，或让他们提供自己的私钥。
    // 在此示例中，我们每次都会生成一个新密钥。
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

现在我们已经准备好了所有代码，让我们测试一下：

1. 在Unity场景中创建一个空的`GameObject`并将 `LoomEvmQuickStartSample`脚本添加进去。
2. 在本地Loom DApp链节点上部署 [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 智能合约。
3. 在Unity编辑器中点击 `Play`。