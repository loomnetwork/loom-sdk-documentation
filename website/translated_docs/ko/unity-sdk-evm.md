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

스마트 컨트랙트의 스테이트를 변경시키기 위해서는 여러분은 public 메소드 호출이 필요합니다, 그렇게 하기 위해서는 서명된 트랜잭션이 반드시 DAppChain에 보내져서 검증이 되어야 합니다. 다행히도 `EvmContract` 클래스는 여러분이 `EvmContract.Call*Async()` 계열의 메소드를 사용하면 이런 것들을 대부분 처리해줍니다.

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 스마트 컨트랙트는 문자열을 저장하는데 사용될 수 있는 public `SetTileMapState` 메소드를 제공합니다, 이 메소드는 아무것도 반환하지 않는다는 것을 주의하세요. `LoomEvmQuickStartSample` 클래스에 `TilesChain.SetTileMapState()`를 호출하는 메소드를 추가해 봅시다.

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

## DAppChain에서 데이터 읽어오기

스마트 컨트랙트의 스테이트를 읽어오기 위해서 여러분은 public read-only 메소드중 하나를 호출해주어야 합니다, read-only 메소드 호출은 스마트 컨트랙트의 스테이트를 변경하지 않습니다. 여러분은 `EvmContract.StaticCall*Async()` 계열의 메소드를 사용해서 스마트 컨트랙트의 read-only 메소드를 호출할 수 있습니다.

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) 스마트 컨트랙트는 문자열을 저장하는데 사용될 수 있는 public `GetTileMapState` 메소드를 제공합니다, `LoomEvmQuickStartSample` 클래스에 `TilesChain.GetTileMapState`를 호출하는 메소드를 추가해 봅시다.

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

## DAppChain으로부터 이벤트 수신하기

DAppChain은 스마트 컨트랙트를 호출하는 것에 대한 반응으로 이벤트를 트리거 할 수 있다. To be notified of new events, you must subscribe to the `EvmContract.EventReceived` event. But first, we need to define a DTO (Data Transfer Object) that specifies the event parameters.

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