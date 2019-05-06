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

You can find all the code on this page and a ready-to-go Unity scene in the Loom Unity SDK under [`Assets/LoomSDK/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/LoomSDK/Samples/QuickStart).

## DAppチェーンへの接続

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Loom SDKのサンプルスマートコントラクト[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go) と対話する`Contract` インスタンスを作成する関数を書いてみよう。

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

## DAppチェーンへのデータの読み取り

スマートコントラクトの状態を読み取るには、そのパブリックな読み取り専用メソッドのうちどれかを呼び出すことが必要だ。読み取り専用メソッドの呼び出しで、スマートコントラクトの状態が変更されることはない。 スマートコントラクト上の読み取り専用メソッドは、`Contract.StaticCallAsync()` メソッドを使用して呼び出すことができる。

[BluePrint](https://github.com/loomnetwork/weave-blueprint/blob/master/src/blueprint.go)スマートコントラクトは、パブリックな`GetMsg`メソッドを持っており、キーとバリューの連想配列を参照するようこれを呼び出すことができる。 `LoomQuickStartSample`クラスに`BluePrint.GetMsg()`を呼び出すメソッドを追加しよう。

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

## まとめ

`LoomQuickStartSample` クラスに次のメソッドを追加しよう。

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