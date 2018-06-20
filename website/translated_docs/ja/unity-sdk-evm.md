---
id: unity-sdk-evm
title: EVMベースのスマートコントラクトクイックスタート
sidebar_label: EVMベースのスマートコントラクトクイックスタート
---
Loomは、EVM ([Ethereum Virtual Machine](evm.html)) 及びプラグインベースのスマートコントラクトをサポートする。 プラグインベースのスマートコントラクトは、例えば(go-loom)[https://github.com/loomnetwork/go-loom]を使用して作成される。

このサンプルでは、Unity SDKを使用してプラグインベースのスマートコントラクトと対話する方法をデモンストレーションする。

## サンプル コード

このサンプルは、[`unity-tiles-chain-evm`デモ](https://github.com/loomnetwork/unity-tiles-chain-evm)のSolidityコントラクトを使用している。 このサンプルでは、サンプルコントラクトはテキスト文字列を保存していくためだけに使用していく。

## DAppチェーンへの接続

`EvmContract` クラスは、Loom DAppチェーンで実行されるスマートコントラクトと対話するための便利な方法を提供する。Loom DAppチェーンは、EVM互換性のあるスマートコントラクトを実行することができる。 サンプルスマートコントラクト [TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol) と対話する `Contract` インスタンスを作成する関数を書いてみよう。

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

        // ミドルウェアを要求
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]
        {
            new NonceTxMiddleware
            {
                PublicKey = publicKey,
                Client = client
            },
            new SignedTxMiddleware(privateKey)
        });

        // SolidityコントラクトのABI
        const string abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_tileState\",\"type\":\"string\"}],\"name\":\"SetTileMapState\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"GetTileMapState\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"state\",\"type\":\"string\"}],\"name\":\"OnTileMapStateUpdate\",\"type\":\"event\"}]\r\n";
        var contractAddr = await client.ResolveContractAddressAsync("TilesChain");
        var callerAddr = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddr, abi);
    }
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`EvmContract.Call*Async()`ファミリーのメソッドを使用すれば 、`EvmContract`クラスが処理を行う。

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol)スマートコントラクトは、パブリックな`SetTileMapState`メソッドを持っており、これはバリューの文字列を保存するよう呼び出すことができる。このメソッドは何も返さないことに気をつけること。 `LoomEvmQuickStartSample`クラスに`TilesChain.SetTileMapState()`を呼び出すメソッドを追加しよう。

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

## DAppチェーンからのデータの読み取り

スマートコントラクトの状態を読み取るには、そのパブリックな読み取り専用メソッドのうちどれかを呼び出すことが必要だ。読み取り専用メソッドの呼び出しで、スマートコントラクトの状態が変更されることはない。 スマートコントラクト上の読み取り専用メソッドは、`EvmContract.StaticCall*Async()` ファミリーのメソッドを使用して呼び出すことができる。

[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol)スマートコントラクトは、パブリックな`GetTileMapState`メソッドを持っており、これは保存された文字列のバリュー取得するために呼び出すことができる。 `LoomEvmQuickStartSample`クラスに`TilesChain.GetTileMapState`を呼び出すメソッドを追加しよう。

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

## DAppチェーンからのイベントの受信

DAppチェーンはスマートコントラクト呼び出しに反応して、イベントをトリガすることができる。 新規イベントを通知するには、`EvmContract.ChainEventReceived`イベントへのサブスクライブをする必要がある。 しかしまずはDTO(Data Transfer Object) を定義し、イベントパラメーターを指定しなくてはならない。

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

## まとめ

`LoomEvmQuickStartSample` クラスに次のメソッドを追加しよう。

```csharp
async void Start()
{
    // 秘密鍵(privateKey)はDAppチェーンへ送られたトランザクションへ署名するために使われる。
    // 通常プレイヤー1人につき1つの秘密鍵を生成するか、もしくはプレイヤーが自身の秘密鍵を提供する。
    // このサンプルでは、毎回新しく鍵を生成している。
    var privateKey = CryptoUtils.GeneratePrivateKey();
    var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);

    // コントラクトに接続
    var contract = await GetContract(privateKey, publicKey);
    // 何かしらのデータがすでに保存されていれば、Unityコンソールウィンドウには
    //  こんな風にプリントされるはずだ: "hello 6475" 
    await StaticCallContract(contract);
    // イベントをリッスン
    contract.ChainEventReceived += ContractOnChainEventReceived;
    // コントラクトに文字列を保存
    await CallContract(contract);
}
```

全コードの用意ができたので、テストしてみよう: 1. Unityシーンに空の`GameObject`を作成し、そこに`LoomEvmQuickStartSample`スクリプトを付け加えよう。 2. スマートコントラクト[TilesChain](https://github.com/loomnetwork/unity-tiles-chain-evm/blob/master/dappchain/TilesChain.sol)をローカルのLoom DAppチェーンノードにデプロイしよう。 3. Unityエディタの`Play`をクリックしよう。