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

[`Assets/Samples/QuickStart`](https://github.com/loomnetwork/unity3d-sdk/tree/master/Assets/Samples/QuickStart)に、このページの全コード及びLoom Unity SDK内で用意済みのUnityシーンがある。

## DAppチェーンへの接続

`Contract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。 Loom SDKのサンプルスマートコントラクト[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) と対話する`Contract` インスタンスを作成する関数を書いてみよう。

```csharp
// LoomQuickStartSample.cs
using System;
using System.Threading.Tasks;
using UnityEngine;
using Loom.Unity3d;
using Loom.Unity3d.Samples;

public class LoomQuickStartSample : MonoBehavior
{
    Contract GetContract(byte[] privateKey, byte[] publicKey)
    {
        var client = new DAppChainClient("http://localhost:46658", "http://localhost:47000")
        {
            Logger = Debug.unityLogger
        };
        // ミドルウェアを要求
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]{
            new NonceTxMiddleware{
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });
        // Loom DAppチェーン上のスマートコントラクト`helloworld` のアドレス
        var contractAddr = Address.FromHexString("0x005B17864f3adbF53b1384F2E6f2120c6652F779");
        var callerAddr = Address.FromPublicKey(publicKey);
        return new Contract(client, contractAddr, "helloworld", callerAddr);
    }
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`Contract.CallAsync()` メソッドを使用すれば `Contract`クラスが処理を行う。

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`SetMsg`メソッドを持っており、これはキーとバリューの連想配列を保存するよう呼び出すことができる。このメソッドは何も返さないことに気をつけること。 `LoomQuickStartSample`クラスに`helloworld.SetMsg()`を呼び出すメソッドを追加しよう。

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

状態を変更するスマートコントラクトのメソッドは、値を返すことがある。 [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`SetMsgEcho`メソッドを持っており、これはキー/バリューの保存と、保存されたキー/バリューの返却を行う。 `LoomQuickStartSample`クラスに`helloworld.SetMsgEcho`を呼び出すメソッドを追加しよう。

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

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`GetMsg`メソッドを持っており、キーとバリューの連想配列を参照するようこれを呼び出すことができる。 `LoomQuickStartSample`クラスに`helloworld.GetMsg`を呼び出すメソッドを追加しよう。

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

    var contract = GetContract(privateKey, publicKey);
    await CallContract(contract);
    // Unityコンソールウインドウにこのようにプリントされる: { "key": "123", "value": "hello!" } 
    await StaticCallContract(contract);
    // Unityコンソールウインドウにこのようにプリントされる: { "key": "321", "value": "456" }
    await CallContractWithResult(contract);
}
```

全コードの用意ができたので、テストしてみよう: 1. Unityシーンに空の`GameObject`を作成し、そこに`LoomQuickStartSample`スクリプトを付け加えよう。 2. スマートコントラクト[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)をローカルのLoom DAppチェーンノードにデプロイしよう。 3. Unityエディタの`Play`をクリックしよう。