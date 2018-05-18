---
id: evm
title: イーサリアム仮想マシン
sidebar_label: EVMのページ
---
## 概要

Loom DAppチェーンはイーサリアム仮想マシン(EVM)を含み、EVMバイトコードへコンパイルされるスマートコントラクトのデプロイと実行が可能となる。

### イーサリアム仮想マシン

EVMを構成するのは、データベース及びEVMバイトコードインタプリタである。

このインタプリタはEVMのバイトコードを実行し、ブロックチェーンに適した安全な決定的プログラムを作るために特別に設計されている。 EVMスマートコントラクトをコーディングするのに最も人気のある言語はSolidityであるが、EVMバイトコードにコンパイルされる言語ならどれでも、EVMインタプリタによって実行可能だ。

このデータベースは、EVMにデプロイされた各プログラムのアドレスをキーとしている。そのバリューは、プログラムのバイトコードと関連データを含む。

### DAppチェーンとEVM

DAppチェーンのEVMと対話するには、現在3つの方法がある。

1. スマートコントラクトは、ブロックチェーンの初期起動時にデプロイできる。
2. Loomのコマンドラインツールは、スマートコントラクトのデプロイ、またはすでにデプロイ済みのコントラクト上のメソッドの呼び出しを可能にする。
3. EVMコントラクトもしくはプラグインコントラクトのどちらからでも、既にデプロイ済みの別のEVMコントラクト上のメソッドを呼び出すことができる。
    
    EVMスマートコントラクトは、コンパイルされたバイトコード形式でDAppチェーンにデプロイされる。 このためチェーンは親言語を認識しない。 Solidityのスマートコントラクトメソッドの呼び出しパラメーターは、[Solidityのウェブサイトに記載されている](https://solidity.readthedocs.io/en/develop/abi-spec.html)アプリケーションバイナリインターフェイス (ABI) でエンコードされる。 このABIは非常に複雑になるのだが、後ほど取り上げるように、イーサリアムの実装はパラメーター生成をサポートする関数を与えなくてはならない。
    
    ## 立ち上げ時のデプロイ
    
    コンパイル済みのコードをコントラクトディレクトリ内に配置し`genesis.json` ファイルをリンクすることで、立ち上げ時のDAppチェーンにデプロイすることができる。
    
    これはジェネシス・ファイルのサンプルだ。 ```json { "contracts": [ { "vm": "EVM", "format": "truffle", "name": "SimpleStore", "location": "/path/to/loomchain/contracts/SimpleStore.json" }, { "vm": "plugin", "format": "plugin", "name": "wrapstore", "location": "wrapstore:1.0.0", "init": {
    
             }
         }
        
    
    ] }

    配列の先頭に2つのコントラクトがある。 1つ目はEVMコントラクトで、2つ目はプラグインコントラクトだ。
    * `vm:`コントラクト実行に使用する仮想マシン。 現在2つのオプションがある。
      1. `plugin`   ユーザーがコントラクトを作成。
      2. `EVM`      コントラクトは、DAppチェーンEVM上で実行される。
    * `format` コントラクトディレクトリ内にあるスマートコントラクトのインプットファイルの性質。
      1. `plugin`   ユーザープラグイン。`go-loom`で作成可能。
      2. `truffle`  truffleのコンパイラを使用してコンパイルされたSolidityプログラム。
      3. `solidity` solcを使用してコンパイルされたSolidityプログラム。
      4. `hex`
    * `name` これはLoomもしくはEVMから割り当てられたコントラクトアドレスを取得するのに使用される。
    * `location`コントラクトディレクトリ内に配置されたバージョン化されたバイナリファイル名。
     truffleとsolidityには完全なpathを与えなければならない可能性がある。
    
    そのためこの例では、Loom DAppチェーンはSolidityコントラクト・SimpleStoreのtruffleコンパイルからバイトコードを受け取ることとなる。 そうしてこれをチェーンのEVMにデプロイする。 Loomのログ情報でその確認とコントラクトアドレスが利用可能となる。
    
    ## コマンドラインよりデプロイ及び実行する
    
    Loomのコマンドラインツールには、チェーンのEVMと対話するための2つのコマンドがある。
    * `deploy`チェーンのEVM上に、EVMバイトコードでスマートコントラクトをデプロイする。
    * `call` 既にデプロイ済みのEVMスマートコントラクトにあるメソッドを呼び出す。
    
    ### Deploy
    
    ```text
    Deploy a contract
    
    Usage:
      loom deploy [flags]
    
    Flags:
      -a, --address string    address file
      -b, --bytecode string   bytecode file
          --chain string      chain ID (default "default")
      -h, --help              help for deploy
      -k, --key string        private key file
      -r, --read string       URI for querying app state (default "http://localhost:47000")
      -w, --write string      URI for sending txs (default "http://localhost:46657")
    

-a 及び -k のフラグは、公開鍵および秘密鍵のアドレスファイルでユーザーを特定するのに使用される。 -b は、コントラクトのEVMローバイトコードを保持しているファイルを提供する。 これは`solc -o outfile.bin myProgram.sol`などのSolidityコンパイラを使用することで生成することができる。

例: 

    text
     ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
      http://localhost:46657 -r http://localhost:9999

  
全てうまく動いていれば、以下が見られるはずだ: ```text New contract deployed with address: default:0xB448D7db27192d54FeBdA458B81e7383F8641c8A Runtime bytecode: [96 96 96 64 82 96 .... ]

    出力されたコントラクトアドレスは、callコマンドでコントラクトのメソッドを呼び出すのに使用できる。
    
    ### Call
    
    ```text
    Call a contract
    
    Usage:
      loom call [flags]
    
    Flags:
      -a, --address string         address file
          --chain string           chain ID (default "default")
      -c, --contract-addr string   contract address
      -h, --help                   help for call
      -i, --input string           file with input data
      -k, --key string             private key file
      -r, --read string            URI for querying app state (default "http://localhost:47000")
      -w, --write string           URI for sending txs (default "http://localhost:46657")
    

-a 及び -k のフラグは、公開鍵および秘密鍵のアドレスファイルでユーザーを特定するのに使用される。 -c はコントラクトアドレスを要求する。 これは前述の`\loom deploy`へのコール結果、もしくは立ち上げ時のログから検索したものとなりうる。 -i は入力文字列だ。 Solidityのコントラクトでは、これは[Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html)で説明されているようにABIにエンコーディングされる。

例 ```text call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \ -c default:0xbD770416A3345f91E4b34576Cb804a576Fa48eB1 \ -w http://localhost:46657 -r http://localhost:9999

    これは完了時にデプロイ済みコントラクトよりレスポンスを返すこととなる。
    
    ## ユーザープラグインから
    DAppチェーンのEVMにデプロイされたコントラクトは、ユーザーが作成したプラグインから呼び出すことができる。 go-loomのWrapStoreの例は、これを実現する方法の例となる。
    
    続きをやる前に、関連する様々なモジュールについて考えてみよう。
    
    * ユーザーアプリケーション。 これはエンド ユーザーのアプリケーションで、DAppチェーン上でのトランザクションを引き起こす。
    
    * DAppチェーン。 ユーザーアプリケーションからトランザクションを受信し、適切なコントラクトへと転送し実行する。 またブロックチェーンに結果をコミットする。
    
    * スマートコントラクト。 ユーザーによって書かれ、DAppチェーン上にデプロイされる。
    これには2つの主なタイプがある。
        1. プラグイン。 RPCでサポートされていれば、どんな言語で書くことも可能だ; 
        go-loom はGoで書かれたコントラクトの使用を簡単にし、またloom-jsは 
        javascript向けのものである。 このプラグインはDAppチェーンがgRPCを使って
        呼び出せるようなものへコンパイルされる。
        2. EVMスマートコントラクト SolidityのプログラムやEVMバイトコードにコンパイルされる
         何か他のコードはDAppチェーンでEVMを使って実行することができる。
    
    プラグインは、EVM上にデプロイ済みのものも含めて他のコントラクトを実行することができる。これはgRPCを使ってDAppチェーンへコールバックするすることで行われる。 逆はしかし真ではない。だがEVMにデプロイされたコントラクトはEVM内でのみやり取りができるので、EVMの結果は決定論的なものとなる。
    
    ### ユーザーのコード
    
    ユーザーは2つのコードを提供する。 それはスマートコントラクトと、DAppチェーンを使用するエンドアプリケーションだ。
    
    以下では、Goがエンドアプリケーションに使用されていること、さらにスマートコントラクトがプラグイン用のGo、もしくはEVM用のSolidity、このどちらかで書かれていることと仮定していく。 javaScript向けのソリューションは、loom-js-quickstart.mdを参照のこと。
    
    ### 最小限のプラグイン
    
    まず、Go-loomでのコントラクト定義について見ていこう。
    ```go
    type Contract interface {
        Meta() (plugin.Meta, error)
    }
    

そしてplugin.Metaはprotobufにより定義されている。

```go
type ContractMeta struct {
    Name    string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
    Version string `protobuf:"bytes,2,opt,name=version,proto3" json:"version,omitempty"`
}
```

なので全コントラクトに必要なのはメタ関数の実装だ。しかし、DAppチェーンでプラグインとして使用できるようにするにはその他もいくつか必要だ。ここにあるのは最小限の例である。

```go
package main

import (
    "github.com/loomnetwork/go-loom/plugin"
    "github.com/loomnetwork/go-loom/plugin/contractpb"
)

type HelloWorld struct {
}

func (c *HelloWorld) Meta() (plugin.Meta, error) {
    return plugin.Meta{
        Name:    "HelloWorld",
        Version: "1.0.0",
    }, nil
}

var Contract plugin.Contract = contractpb.MakePluginContract(&HelloWorld{})

func main() {
    plugin.Serve(Contract)
}
```

ここにはいくつか興味深い点がある。 1. まず、コントラクトはpackage mainでなくてはならない。 2. HelloWorldというコントラクトを構造体として定義。 3. コントラクト名とバージョン数を返す`Meta()` 関数を実装。 4. `Contract`という変数の定義が必要。 関数`contract
.MakePluginContract`は簡単なアウトラインをオブジェクトに変換し、DAppチェーンとのやり取りができるようにする。 5. その後メインルーチンは、コントラクトをワーキングサーバーとしてセットアップ可能。

もちろんこのコントラクトは機能を持たないので何もできない。 次のステップでいくつか追加していこう。 こうしてMakePluginContract関数は、コントラクトに与える新しいメソッドを取得するためにリフレクションを使用することができる。

### 関数の追加

```go
func (c *HelloWorld) Hello(ctx contract.StaticContext, req *types.HelloRequest) (*types.HelloResponse, error) {
    return &types.HelloResponse{
        Out: "Hello World!",
    }, nil
}
```

固定メッセージを返すだけのシンプルな関数だ。 いくつかキーとなる点がある。 * `contract.StaticContext`もしくは`contract.Context`のどちらかが、第１パラメータである必要がある。 これはDAppチェーン上のリソースにアクセスを可能にする様々な方法を提供する。 例えば、データベース状態の閲覧や変更、もしくは他のプラグインの呼び出しなどだ。 * 第２パラメーターのユーザー入力と最初の戻り値は、[protobufメッセージ](https://developers.google.com/protocol-buffers/)の形式をとる; この例ではHelloRequestとHelloResponseだ。 これらのprotobufメッセージ構造体は言語中立な .protoファイルから自動生成される必要がある。 以下を参照のこと。 * protobufメッセージを入力および出力するパラメーターは、呼び出し元のアプリケーションと連携している必要がある。 protobufメッセージのデータ構造が .protoの言語ファイルから生成されるので、呼び出し元のアプリケーションとスマートコントラクトが別の言語で書かれていても問題にはならない。

なのでこれは、Hello関数にとって適切なtypes.protoファイルの例であろう。

```proto
syntax = "proto3";

message HelloRequest {
    string in = 1;
}

message HelloResponse {
    string out = 1;
}

```

使用可能なtypes.pb.goファイルは、protto用のprotoc-gen-gogoプラグインを使って、以下のようなコマンドで生成できる。 

    bash
     protoc --gogo_out=. --plugin=protoc-gen-gogo  types.proto

### スマートコントラクトの呼び出し

次のコードフラグメントは、Hello WorldサンプルのHello関数を呼び出すための、Go-loomを使用したGoでのやり方を示している。 

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, "http://localhost:1234", "http://localhost:2345")
    contract := client.NewContract(rpcClient, contractAddr, "HelloWorld")
    request := &types.HelloRequest{}
    response := &types.HelloResponse{}
    _, err = contract.StaticCall("Hello", request, signer, response)
    fmt.Println(response.Out)
```

1. クライアントを作成し、そのURLでDAppチェーンへのアクセスできるようにする。
2. 名前とアドレスからスマートコントラクトのハンドルを取得する。
3. ワイヤータイプのHelloRequestとHelloResponseは、呼び出し中のコントラクトメソッドの入力および出力パラメーターと一致しなくてはならない。
4. `Hello`メソッドを呼び出す。Helloメソッドは静的コンテキストを持っているので、StaticCallを使っている。

## Solidityコントラクトの呼び出し

プラグインの実装を簡単に見直したので、今度はプラグインからDAppチェーンのEVMにデプロイされたスマートコントラクトにアクセスすることについてやっていこう。

最初に、この簡単なSolidityコントラクトをDAppチェーンのEVMにデプロイしたと仮定しよう。

```solidity
pragma solidity ^0.4.18;
contract SimpleStore {
  function set(uint _value) public {
    value = _value;
  }

  function get() public constant returns (uint) {
    return value;
  }

  uint value;
}
```

このSolidityコントラクトをラップする簡単なプラグインを見ていこう。 こうして我々のプラグインはSetValueとGetValueの2つの関数を持つことになり、これらはSimpleStoreコントラクトとトランザクション送信者の間でのデータ受け渡しを行う。 これはSimpleStoreをラップするので、我々はWrapStoreと呼ぶ。

これはWrapStoreコントラクトに関するアウトラインで、SetValueおよびGetValueメソッドに追加されたスタブもある。

```go
package main

import (
    "github.com/loomnetwork/go-loom/plugin"
    "github.com/loomnetwork/go-loom/plugin/contractpb"
    "github.com/loomnetwork/go-loom/examples/plugins/wrapstore/types"
)

type WrapStore struct {
}

func (c *WrapStore) Meta() (plugin.Meta, error) {
    return plugin.Meta{
        Name:    "WrapStore",
        Version: "1.0.0",
    }, nil
}

func (c *WrapStore) SetValue(ctx contractpb.Context, value *types.WrapValue) error {
    return nil
}

func (c *WrapStore) GetValue(ctx contractpb.Context, req *types.Dummy) (*types.WrapValue, error) {
        return nil, nil
}

var Contract = contractpb.MakePluginContract(&WrapStore{})

func main() {
    plugin.Serve(Contract)
}
```

The .proto file for generating the message declarations looks like

```proto
syntax = "proto3";

message Dummy {
}

message WrapValue {
    int64 value = 1;
}
```

Lets look at the SetValue function first. The function to call to run a smart contract on the EVM is ```go contractpb.CallEVM(ctx Context, addr loom.Address, input []byte, output *[]byte) error

    The context is just passed though, for setting the output can just be a dummy
    object. We need to the address of the solidity contract, and the correct
    input.
    
    The Context contains a Registry that allows us to get the address of a
    contract from it's name.
    ```go
    ssAddr, err := ctx.Resolve("SimpleStore")
    

The input is passed straight though to the EVM and needs to be encoded as laid out in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

### ABI encoding of parameters

So for our input we need to encode it to something like

```text
60fe47b100000000000000000000000000000000000000000000000000000000000003db
```

Don't panic, go-ethereum can help us out.

When you compile Solidity you not only get the bytecode that runs on the EVM, but you get a ABI. The ABI is a json object that describes the contracts interface. Here is the ABI for our SimpleStore

```json
[
    {
      "constant": false,
      "inputs": [
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
```

We can use "github.com/ethereum/go-ethereum/accounts/abi" and this ABI string to encode our input. The key function is [abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON)

```go
    abiSimpleStore, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    input, err := abiSimpleStore.Pack("set", big.NewInt(value.Value))
```

Here we have the SimpleContract ABI in the `SimpleStoreABI` variable. We could either read it in from a file, or hard code into the source.

The Pack method takes the function signature and a list of the arguments and returns the encoded input.

### Putting it together

Ok now we know how to get the input, and contact address we can give an example of our SetValue method. Error checking removed for clarity.

```go
func (c *WrapStore) SetValue(ctx contractpb.Context, value *types.WrapValue) error {
    ssAddr, err := ctx.Resolve("SimpleStore")
    abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    input, err := abiSS.Pack("set", big.NewInt(value.Value))

    evmOut := []byte{}
    err = contractpb.CallEVM(ctx, ssAddr,R input, &evmOut)
    return err
}
```

The evmOut function is a dummy. This function could be called in Go using Go-loom with.

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, writeUri, readUri)
    contract := client.NewContract(rpcClient, contractAddr, "wrapstore")
    payload := &types.WrapValue{
        Value: int64(value),
    }
    _, err = contract.Call("SetValue", payload, signer, nil)

```

The GetValue function now works in a similar fashion. The only difference is that we now have to unwrap the output from the solidity contract and return it in a WrapValue message.

```go
import (
    "github.com/ethereum/go-ethereum/accounts/abi"
    "github.com/ethereum/go-ethereum/common"
    "github.com/loomnetwork/go-loom/examples/plugins/wrapstore/types"
    "github.com/loomnetwork/go-loom/plugin"
    "github.com/loomnetwork/go-loom/plugin/contractpb"
    "math/big"
    "strings"
    "strconv"
)

func (c *WrapStore) GetValue(ctx contractpb.Context, req *types.Dummy) (*types.WrapValue, error) {
    ssAddr, err := ctx.Resolve("SimpleStore")
    if err != nil {
        return nil, err
    }
    abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    if err != nil {
        return nil, err
    }
    input, err := abiSS.Pack("get")
    if err != nil {
        return nil, err
    }
    evmOut := []byte{}
    err = contractpb.CallEVM(ctx, ssAddr, input, &evmOut)
    if err != nil {
        return nil, err
    }
    value, err := strconv.ParseInt(common.Bytes2Hex(evmOut), 16, 64)
    if err != nil {
        return nil, err
    }
    return &types.WrapValue{
        Value: value,
    }, nil
}
```