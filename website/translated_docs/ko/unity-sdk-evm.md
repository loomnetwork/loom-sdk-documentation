---
id: unity-sdk-evm
title: EVM기반의 스마트 컨트랙트 퀵스타트
sidebar_label: EVM기반의 스마트 컨트랙트 퀵스타트
---
Loom은 EVM ([Ethereum Virtual Machine](evm.html))과 plugin기반의 스마트 컨트랙트를 지원합니다. Plugin기반의 스마트 컨트랙트는 [go-loom](https://github.com/loomnetwork/go-loom)으로 생성될 수 있습니다, 예를 들면.

이번 예제에서, 우리는 Unity SDK가 어떻게 EVM기반의 스마트 컨트랙트와 통신하는지 살펴볼 것입니다.

## 예제 코드

이 예제는 [`unity-tiles-chain-evm` 데모](https://github.com/loomnetwork/unity-tiles-chain-evm)에 있는 Solidity 컨트랙트를 사용합니다. 이 예제의 목적에 맞게, 텍스트 문자열을 저장하는데 예제 컨트랙트를 사용할 것입니다.

## DAppChain에 연결하기

`EvmContract` 클래스는 EVM호환 스마트 컨트랙트가 구동되는 Loom DAppChain에서 동작하는 스마트 컨트랙트와 상호작용하기 위한 편리한 방법을 제공합니다. [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 스마트 컨트랙트 예제와 상호작용하는 `EvmContract` 인스턴스를 생성하는 메소드를 작성해 봅시다.

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

        // middleware가 요구됨
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]
        {
            new NonceTxMiddleware
            {
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });

        // Solidity 컨트랙트의 ABI 
        const string abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_tileState\",\"type\":\"string\"}],\"name\":\"SetTileMapState\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"GetTileMapState\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"state\",\"type\":\"string\"}],\"name\":\"OnTileMapStateUpdate\",\"type\":\"event\"}]\r\n";
        // 주의: EVM기반의 스마트 컨트랙트로 이름으로 접근하는 것은 불가능합니다.
        // Put the address of your deployed contract here.
        var contractAddr = Address.FromHexString("0xf420fbbb810698a74120df3723315ee06f472870");
        var callerAddr = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddr, abi);
    }
}
```

## DAppChain에 데이터 쓰기

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

Now that we have all the code in place let's test it out:

1. Create an empty `GameObject` in a Unity scene and attach the `LoomEvmQuickStartSample` script to it.
2. Deploy the [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) smart contract on a local Loom DAppChain node.
3. Hit `Play` in the Unity Editor.