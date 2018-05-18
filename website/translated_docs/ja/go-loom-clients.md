---
id: go-loomクライアント
title: GolangでのDAppチェーンクライアントの構築
sidebar_label: DAppチェーンクライアントの構築
---
## 概要

`go-loom`ライブラリには、Goアプリ構築に必要な全てのもの、そしてLoom DAppチェーンと対話するためのサービスが含まれている。これらはDAppチェーン上で機能するスマートコントラクトの構築を可能にする。

`go-loom`のインストール:

```shell
go get github.com/loomnetwork/go-loom
```

このセクションでは`go-loom`の紹介を行なっていこう。go-loom APIは、Loom DAppチェーンと対話するGoのコードを書くために使用するものだ。Goでのスマートコントラクトのコーディングは、後のセクションで扱っていこう。

`go-loom`パッケージには多くのサンプルがある。`examples/cli`にはCLI アプリが含まれており、これはスマートコントラクト`examples/plugins/helloworld` と対話するために使用することができる。 まずはCLIアプリの構築及びテスト運用からスタートし、その後構築に使用した`go-loom` APIを紹介していこう。

```shell
# これは実行可能な ./example-cli を生成する
make example-cmds
```

## CLI アプリのサンプル

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`SetMsg`メソッドを持っており、これはキーとバリューの連想配列を保存するよう呼び出すことができる。

```shell
./example-cli call --method SetMsg -k 123 -v 456
```

このスマートコントラクトは同じくパブリックな`GetMsg`メソッドを持っており、これはキーとバリューの連想配列を参照するために呼び出すことができる。

```shell
./example-cli static-call --method GetMsg -k 123
```

以下のレスポンスが見られるはずだ:

```js
{
  Key: '123',
  Value: '456'
}
```

これでサンプルCLIアプリの機能のデモンストレーションが完了した。今度はこの実装に使用した`go-loom` APIについて見ていこう。

## DAppチェーンへの接続

`client.Contract`タイプは、Loom DAppチェーン上で実行されるスマートコントラクトと対話するための便利な方法を提供する。 Loom SDKのサンプルスマートコントラクト [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) と対話する `client.Contract` インスタンスを作成する関数を書いてみよう。

```go
package main

import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/examples/types"
  "golang.org/x/crypto/ed25519"
)

// getContractは新しい`Contract`インスタンスを作成し、これを使ってスマートコントラクトとの対話が行える。
func getContract(contractHexAddr) (*client.Contract, error) {
  rpcClient := client.NewDAppChainRPCClient(
    "default",
    "ws://127.0.0.1:46657/websocket",
    "ws://127.0.0.1:9999/queryws",
  )
  contractAddr, err := loom.LocalAddressFromHexString(contractHexAddr)
  if err != nil {
    return nil, err
  }
  return client.NewContract(rpcClient, contractAddr), nil
}
```

## DAppチェーンへのデータの書き込み

スマートコントラクトの状態を変更するには、そのパブリックなメソッドのうちどれかを呼び出すことが必要であり、さらに署名済みのトランザクションが送信され、DAppチェーンによって検証されていなくてはならない。 幸いこれらのほとんどは、`Contract.Call()`メソッドを使用すれば `client.Contract`クラスが処理を行う。

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`SetMsg`メソッドを持っており、これはキーとバリューの連想配列を保存するよう呼び出すことができる。 このメソッドを呼び出す関数を書いてみよう。

```go
func store(contract *client.Contract, key, value string, signer auth.Signer) error {
  params := types.MapEntry{
    Key: key,
    Value: value,
  }
  if _, err := contract.Call("SetMsg", &params, signer, nil); err != nil {
    return err
  }
  return nil
}

```

## DAppチェーンからのデータの読み取り

スマートコントラクトの状態を読み取るためには、パブリックな読み取り専用メソッドのうちどれかを呼び出す必要があり、`Contract.StaticCall()`メソッドを使って行うことができる。

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)スマートコントラクトは、パブリックな`GetMsg`メソッドを持っており、キーとバリューの連想配列を参照するようこれを呼び出すことができる。 このメソッドを呼び出す関数を書いてみよう。

```go
func load(contract *client.Contract, key string) (string, error) {
  params := types.MapEntry{
    Key: key, // The smart contract will look up the value stored under this key.
  }
  var result types.MapEntry
  if _, err = contract.StaticCall("GetMsg", params, &result); err != nil {
    return "", err
  }
  return result.Value, nil
}
```

## まとめ

全て準備が整ったので、DAppチェーンが稼働していることを確認してから、次のコードを実行してみよう。`Value: hello!`とコンソールにプリントされるはずだ。

```go
func main() {
  _, privateKey, err := ed25519.GenerateKey(nil)
  if err != nil {
    panic(err)
  }
  signer := auth.NewEd25519Signer(privateKey)
  contract, err := getContract("0x005B17864f3adbF53b1384F2E6f2120c6652F779")
  if err != nil {
    panic(err)
  }
  store(contract, "123", "hello!", signer)
  value, err := load(contract, "123")
  if err != nil {
    panic(err)
  }
  fmt.Printf("Value: %s\n", value)
}
```