---
id: unity-sdk-plugin
title: プラグインベースのスマートコントラクトクイックスタート
sidebar_label: プラグインベースのスマートコントラクトクイックスタート
---
Loom supports EVM ([Ethereum Virtual Machine](evm.html)) and plugin-based smart contracts. Plugin-based smart contracts can be created with (go-loom)[https://github.com/loomnetwork/go-loom], for example.

In this example, we will demostrate how to use the Unity SDK to communicate with plugin-based smart contracts.

## サンプル コード

[`Assets/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/LoomSDK/Samples/QuickStart)に、このページの全コード及びLoom Unity SDK内で用意済みのUnityシーンがある。

## DAppチェーンへの接続

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Let's write a method that creates a `Contract` instance to interact with the sample [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract provided in the Loom SDK...

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

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`Contract.CallAsync()` メソッドを使用すれば `Contract`クラスが処理を行う。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)スマートコントラクトは、パブリックな`SetMsg`メソッドを持っており、これはキーとバリューの連想配列を保存するよう呼び出すことができる。このメソッドは何も返さないことに気をつけること。 `LoomQuickStartSample`クラスに`BluePrint.SetMsg()`を呼び出すメソッドを追加しよう。

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

状態を変更するスマートコントラクトのメソッドは、値を返すことがある。 [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)スマートコントラクトは、パブリックな`SetMsgEcho`メソッドを持っており、これはキー/バリューの保存と、保存されたキー/バリューの返却を行う。 `LoomQuickStartSample`クラスに`BluePrint.SetMsgEcho`を呼び出すメソッドを追加しよう。

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
        // Unityコンソールウインドウにこのようにプリントされる: { "key": "321", "value": "456" }
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## DAppチェーンからのデータの読み取り

スマートコントラクトの状態を読み取るには、そのパブリックな読み取り専用メソッドのうちどれかを呼び出すことが必要だ。読み取り専用メソッドの呼び出しで、スマートコントラクトの状態が変更されることはない。 スマートコントラクト上の読み取り専用メソッドは、`Contract.StaticCallAsync()` メソッドを使用して呼び出すことができる。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)スマートコントラクトは、パブリックな`GetMsg`メソッドを持っており、キーとバリューの連想配列を参照するようこれを呼び出すことができる。 Let's add a method to the `LoomQuickStartSample` class to call `BluePrint.GetMsg`.

```csharp
async Task StaticCallContract(Contract contract)
{
    var result = await contract.StaticCallAsync<MapEntry>("GetMsg", new MapEntry
    {
        Key = "123"
    });

    if (result != null)
    {
        // Unityコンソールウインドウにこのようにプリントされる: { "key": "123", "value": "hello!" }
        // 与えられた `LoomQuickStartSample.CallContract()` が初めに呼び出される。
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
// これで初期化する
async void Start()
{
    // 秘密鍵(privateKey)はDAppチェーンへ送られたトランザクションへ署名するために使われる。
    // 通常プレイヤー1人につき1つの秘密鍵を生成するか、もしくはプレイヤーが自身の秘密鍵を提供する。
    // このサンプルでは、毎回新しく鍵を生成している。
    var privateKey = CryptoUtils.GeneratePrivateKey();
    var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);

    var contract = await GetContract(privateKey, publicKey);
    await CallContract(contract);
    // Unityコンソールウインドウにこのようにプリントされる: { "key": "123", "value": "hello!" } 
    await StaticCallContract(contract);
    // Unityコンソールウインドウにこのようにプリントされる: { "key": "321", "value": "456" }
    await CallContractWithResult(contract);
}
```

全コードの用意ができたので、テストしてみよう: 1. Unityシーンに空の`GameObject`を作成し、そこに`LoomQuickStartSample`スクリプトを付け加えよう。 2. スマートコントラクト[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)をローカルのLoom DAppチェーンノードにデプロイしよう。 3. Unityエディタの`Play`をクリックしよう。

## EVMベースのノード

## サンプル コード

このサンプルは、[`unity-tiles-chain-evm`デモ](https://github.com/loomnetwork/unity-tiles-chain-evm)のSolidityコントラクトを使用している。 For the purpose of this sample, we will use this sample contract just to store a text string.

## Connecting to a DAppChain

The `EvmContract` class provides a convenient way to interact with a smart contract running on a Loom DAppChain running an EVM-compatible smart contract. Let's write a method that creates an `EvmContract` instance to interact with the sample [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract.

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
        var contractAddr = await client.ResolveContractAddressAsync("TilesChain");
        var callerAddr = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddr, abi);
    }
}
```

## Writing data to a DAppChain

To mutate the state of a smart contract you need to call one of its public methods, to do so a signed transaction must be sent to and validated by the DAppChain. Fortunately the `EvmContract` class takes care of most of this when you use the `EvmContract.Call*Async()` family of methods.

The [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract has a public `SetTileMapState` method that can be called to store an string value, note that this method doesn't return anything. Let's add a method to the `LoomEvmQuickStartSample` class that calls `TilesChain.SetTileMapState()`.

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

DAppChains can trigger events in reaction to calling a smart contract. To be notified of new events, you must subscribe to the `EvmContract.ChainEventReceived` event. But first, we need to define a DTO (Data Transfer Object) that specifies the event parameters.

```csharp
public class OnTileMapStateUpdateEvent
{
    [Parameter("string", "state", 1)]
    public string State { get; set; }
}

private void ContractOnChainEventReceived(object sender, EvmChainEventArgs e)
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
    contract.ChainEventReceived += ContractOnChainEventReceived;
    // Store the string in a contract
    await CallContract(contract);
}
```

Now that we have all the code in place let's test it out: 1. Create an empty `GameObject` in a Unity scene and attach the `LoomEvmQuickStartSample` script to it. 2. Deploy the [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract on a local Loom DAppChain node. 3. Hit `Play` in the Unity Editor.