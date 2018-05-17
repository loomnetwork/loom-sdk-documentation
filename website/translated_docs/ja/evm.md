---
id: evm
title: イーサリアム仮想マシン
sidebar_label: EVMページ
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
    * `location`コントラクトディレクトリ内に配置されたバイナリファイルのバージョン名。 For truffle and solidity it might be necessary to give the full path.
    
    So in this example the loom DAppChain will take the bytecode from the truffle
    compilation of our SimpleStore solidity contract. It will then deploy it on 
    the chain's EVM. Confirmation and the contracts address will be available in 
    loom's logging information.
    
    ## Deploy and run from command line
    
    The loom command line tool has two commands for interacting with the 
    chains's EVM.
    * `deploy` This will deploy a smart contract in EVM bytecode onto the chain's 
    EVM.
    * `call` This will call a method on an already deployed EVM smart contract.
    
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
    

The -a and -k flags are used to identify the user with public and private key address files. -b gives the file where the raw EVM bytecode for the contract is held. This could be generated using a solidity compiler such as `solc -o outfile.bin myProgram.sol`.

Example: 

    text
     ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
      http://localhost:46657 -r http://localhost:9999

  
If everything works you should see something like: ```text New contract deployed with address: default:0xB448D7db27192d54FeBdA458B81e7383F8641c8A Runtime bytecode: [96 96 96 64 82 96 .... ]

    The output contract address can be used to call a method on the contract in 
    the call command.
    
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
    

The -a and -k flags are used to identify the user with public and private key address files. -c requires the contract address. This could be one output from a previous call to `\loom deploy` or retrieved from the start up log. -i is the input string. For a solidity contract this will be ABI encoded as described in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

Example ```text call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \ -c default:0xbD770416A3345f91E4b34576Cb804a576Fa48eB1 \ -w http://localhost:46657 -r http://localhost:9999

    On completion this will return the response from the deployed contract,
    
    ## From a user plugin
    
    Smart contracts deployed on a DAppChain's EVM can be called from 
    user created plugins. The wrapstore example in go-loom gives and example of 
    how to achieve this. 
    
    Before continuing let's consider the various modules involved.
    
    * User application. This is the end user application that initiates 
    transactions on the DAppChain. 
    
    * DAppChain. Receives transactions from the user application and forwards to 
    the appropriate contract to run. Also commits results to the 
    blockchain.
    
    * Smart contracts. These are written by the user and deployed on the DAppChain. 
    There are two main types.
        1. Plugins. These can be written in any language supported by gRPC; 
        go-loom allows easy use of contracts written in Go, and loom-js for 
        javascript. The plugin is compiled into an executable that the DAppChain 
        calls using gRPC.
        2. EVM smart contracts. Solidity programs or any other code that compiles
         into EVM  bytecode can be run by the DAppChain using its EVM.
    
    Plugins can run other contracts including ones deployed on the EVM by calling 
    back to the DAppChain using gRPC. The reverse however is not true however, 
    ECM deployed contracts can only interact within the EVM, this is to ensure that
    the EVM's results are deterministic.
    
    ### User code
    
    The user provides two items of code. The smart contracts and 
    the end application that make use of the DAppChain.
    
    In the following we will assume that Go is being used for the end 
    application and the smart contracts are written either in Go for plugins or 
    solidity for EVM. Refer to loom-js-quickstart.md for a javascript solution.
    
    ### Minimal plugin
    
    First lets look at the definition of a contract in Go-loom.
    ```go
    type Contract interface {
        Meta() (plugin.Meta, error)
    }
    

and plugin.Meta is defined from a protobuf definition

```go
type ContractMeta struct {
    Name    string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
    Version string `protobuf:"bytes,2,opt,name=version,proto3" json:"version,omitempty"`
}
```

So all a contract needs is to implement the Meta function. However to be usable as a plugin in a DAppChain there are a few other bits. Here is a minimal example.

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

Here are some points of interest. 1. First the contract has to be package main. 2. Define our contract called HelloWorld as a struct. 3. Implement the `Meta()` function, returning the contracts name and version number. 4. The variable `Contract` needs to be defined. The function `contract
.MakePluginContract` converts our simple outline into an object that a DAppChain can communicate with. 5. The main routine can then sets the contract up as a working server.

Of course our contract has no functionality so can't do anything. The next step is to add some. The MakePluginContract function can then use reflection to learn any new methods we give to our contract.

### Adding functions

```go
func (c *HelloWorld) Hello(ctx contract.StaticContext, req *types.HelloRequest) (*types.HelloResponse, error) {
    return &types.HelloResponse{
        Out: "Hello World!",
    }, nil
}
```

So a simple function that just returns a fixed message. A couple of key points. * Either a `contract.StaticContext` or `contract.Context` should be the first parameter. It provides various methods that allow you to access the resources on the DAppChain. For example view or modify the the state database, or call other plugins. * The user input in the second parameter and the first return value take the form of [protobuf messages](https://developers.google.com/protocol-buffers/); HelloRequest and HelloResponse in this example. These protobuf message structs need to auto generated from a language neutral .proto file. See below. * The input and output protobuf message parameters need to coordinated with the calling application. As the protobuf message data structures are generated from language independent .proto files it does not matter if the calling application and the smart contract are written in different languages.

So this would be an example of a suitable types.proto file for our Hello function.

```proto
syntax = "proto3";

message HelloRequest {
    string in = 1;
}

message HelloResponse {
    string out = 1;
}

```

A types.pb.go file that we can use can be built using the protoc-gen-gogo plugin for proto, with a command like 

    bash
     protoc --gogo_out=. --plugin=protoc-gen-gogo  types.proto

### Call smart contract

The following code fragment shows how to call the Hello function of our Hello World example in Go using functions from Go-loom.

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, "http://localhost:1234", "http://localhost:2345")
    contract := client.NewContract(rpcClient, contractAddr, "HelloWorld")
    request := &types.HelloRequest{}
    response := &types.HelloResponse{}
    _, err = contract.StaticCall("Hello", request, signer, response)
    fmt.Println(response.Out)
```

1. Create a client that can talk to our DAppChain using its url.
2. Get a handle to our smart contract, from its name and address.
3. The wire type HelloRequest adn HelloResponse have to match the input and output parameters of the contract's method we are calling. 
4. Call the `Hello` method. We sue StaticCall as the Hello method has a static context.

## Calling solidity contract

Now we have had a quick review of implementing plugins we can look at accessing smart contracts deployed on the DAppChain's EVM from a plugin.

First we we assume we have deployed this simple solidity contract on the DAppChain's EVM.

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

We will look at a simple plugin that wraps this solidity contract. So our plugin will have two functions SetValue and GetValue that will just pass data between the SimpleStore contract and the transaction initiator. As it wraps this SimpleStore we will call it WrapStore.

Here is the outline as for the WrapStore contract, with stubs added for the SetValue and GetValue methods.

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