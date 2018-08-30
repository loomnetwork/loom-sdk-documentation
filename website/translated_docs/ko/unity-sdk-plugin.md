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

스마트 컨트랙트의 스테이트를 변경시키기 위해서는 여러분은 public 메소드 호출이 필요합니다, 그렇게 하기 위해서는 서명된 트랜잭션이 반드시 DAppChain에 보내져서 검증이 되어야 합니다. 다행히도 `Contract` 클래스는 여러분이 `Contract.callAsync()` 메소드를 사용할때 이런 것들을 대부분 처리해줍니다.

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트는 키에 연관된 값을 저장하는데 사용될 수 있는 public `SetMsg` 메소드를 제공합니다. `LoomQuickStartSample` 클래스에 `BluePrint.SetMsg()`를 호출하는 메소드를 추가해 봅시다.

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

스테이트를 변경하는 스마트 컨트랙트는 값을 반환할 수 있습니다. [BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) 스마트 컨트랙트는 키/값을 저장하고 저장된 키/값을 반환하는 public `SetMsgEcho` 메소드를 가지고 있습니다. `LoomQuickStartSample` 클래스에 `BluePrint.SetMsgEcho`를 호출하는 또 다른 메소드를 추가해봅시다.

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
        // Unity 콘솔창에 이것이 출력됩니다: { "key": "321", "value": "456" }
        Debug.Log("Smart contract returned: " + result.ToString());
    }
    else
    {
        throw new Exception("Smart contract didn't return anything!");
    }
}
```

## DAppChain에서 데이터 읽어오기

스마트 컨트랙트의 스테이트를 읽어오기 위해서 여러분은 public read-only 메소드중 하나를 호출해주어야 합니다, read-only 메소드 호출은 스마트 컨트랙트의 스테이트를 변경하지 않습니다. You can call a read-only method on a smart contract by using the `Contract.StaticCallAsync()` method.

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