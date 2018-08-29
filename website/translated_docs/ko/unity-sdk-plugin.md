---
id: unity-sdk-plugin
title: Plugin 기반의 스마트 컨트랙트 퀵스타트
sidebar_label: Plugin 기반의 스마트 컨트랙트 퀵스타트
---
Loom 은 EVM ([Ethereum Virtual Machine](evm.html)) 과 plugin 기반의 스마트 컨트랙트를 지원합니다. Plugin 기반의 스마트 컨트랙트는 [go-loom](https://github.com/loomnetwork/go-loom)으로 만들수 있습니다, 예제.

이번 예제에서는, Unity SDK로 Plugin 기반의 스마트 컨트랙트와 커뮤니케이션 하는 방법을 보여드릴 것입니다.

## 예제 코드

여러분은 여기 [`Assets/LoomSDK/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/LoomSDK/Samples/QuickStart) 에서 이 페이지의 모든 코드와 Loom Unity SDK로 만들어진 바로 실행 가능한 Unity scene을 볼 수 있습니다.

## DAppChain에 연결하기

`Contract` 클래스는 Loom DAppChain에서 동작하는 스마트 컨트랙트와 상호작용하기 위한 편리한 방법을 제공합니다. Loom SDK에서 제공하는 [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트 예제와 상호작용하는 `Contract` 인스턴스를 만드는 메소드를 작성해봅시다...

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

## DAppChain에 데이터 쓰기

To mutate the state of a smart contract you need to call one of its public methods, to do so a signed transaction must be sent to and validated by the DAppChain. Fortunately the `Contract` class takes care of most of this when you use the `Contract.CallAsync()` method.

The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value, note that this method doesn't return anything. Let's add a method to the `LoomQuickStartSample` class that calls `BluePrint.SetMsg()`.

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

Smart contract methods that mutate state may return a value. The [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) smart contract has a public `SetMsgEcho` method that will store a key/value and return the key/value it stored. Let's add another method to the `LoomQuickStartSample` class to call `BluePrint.SetMsgEcho`.

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