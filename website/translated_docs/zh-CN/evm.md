---
id: evm
title: 以太坊虚拟机器
sidebar_label: EVM
---
## 概括

loom DApp链包含一个以太坊虚拟机器（EVM）并使你可以部署以及运行将编译成EVM字节码的智能合约。

### 以太坊虚拟机器

一个EVM由一个数据库以及EVM字节码解释器组成。

解释器运行EVM字节码，专为创建适合区块链的安全的确定性程序而设计。 编码EVM智能合约最受欢迎的语言是Solidity，然而任何编译为EVM字节码的语言都可以由EVM解释器运行。

该数据库由EVM上已部署的每个程序的地址键入。 该值包含程序的字节码和任何相关数据。

### DApp链和EVM

目前有几种与DApp链EVM交互的方式。

1. 智能合约可以在区块链初始启动时被部署。
2. Loom命令行工具允许部署智能合约或在已经部署的合约中调用方法。
3. 另一种智能合约，即EVM合约或插件合约，可以调用已部署的EVM合约上的方法。
4. 在Go里你可以用go-loom的EvmContract对象。
5. 在TypeScript或JavaScript中你使用loom-js的EvmContract对象。
    
    EVM智能合约以编译的字节码的形式部署到DApp链中。 这使得链无法得知父语言。 Solidity智能合约方法调用的参数是以在[Solidity网站上记录的](https://solidity.readthedocs.io/en/develop/abi-spec.html).应用程序二进制接口(ABI) 来进行编码的。 ABI可以变得相当复杂，但是正如我们以后看到的，以太坊实现应该给出了支持参数生成的功能。
    
    ## Deploy on Boot up.
    
    通过将已编译的代码放入合约目录中并链接 `genesis.json`文件, 可以在启动时在DApp链上部署合约。
    
    这里是genesis文件的一个示例。 ```json { "contracts": [ { "vm": "EVM", "format": "truffle", "name": "SimpleStore", "location": "/path/to/loomchain/contracts/SimpleStore.json" }, { "vm": "plugin", "format": "plugin", "name": "evmexample", "location": "evmexample:1.0.0", "init": {
    
             }
         }
        
    
    ] }

    在顶部序列中有两个合约。 第一个是EVM合约，第二个是插件。
    * ' vm: ' 用于运行合约的虚拟机。 目前有两种选择。
      1. "plugin" 用户创建了合约。
      2. `EVM` 合约运行在DApp链虚拟机上。
    * `format` 合约目录中智能合约输入文件的性质。
      1. `plugin` 用户插件，可通过`go-loom`产生。
      2. `truffle` Solidity程序，用truffle的编译器编译。
      3. `solidity` Solidity程序，用solc编译。
      4. `hex` 原始Hex，例如使用`solc -o`选项编译的solidity程序。
    * `name` 这个名称可用于检索由loom或EVM分配的合约地址。
    * `location` 位于合约目录中的二进制文件的版本化名称。 对于truffle和solidity来说，可能有必要提供完整的路径。
    
    所以在这个例子中，Loom DApp链将会用我们SimpleStore Solidity合约的truffle编译中的字节码。 然后将在该链的EVM上部署它。 可以在loom的登录信息中找到确认信息和合约地址。
    
    ## 部署并从命令行运行
    
    Loom命令行工具有三个用于与链的EVM交互的命令。
    * `deploy` 这会将一个用EVM字节码写的智能合约部署到该链的EVM上。
    * `call` 这将对一个已经部署的EVM智能合约调用一个改变其状态的方法。
    * `static-call` 这将对一个已经部署的EVM智能合约调用一个只读的方法。
    
    
    ### 部署
    使用 `./loom deploy`将可以编译成EVM字节码的合约部署到DApp链的EVM上。 
    ```文本
    部署一个合约
    
    使用:
      loom deploy [flags]
    
      -a, --地址字符串       地址文件
      -b, --字节码字符串     字节码文件
          --链字符串        链ID (默认 "默认")
      -h, --帮助           部署的帮助
      -k, --密钥字符串        私钥文件
      -n, --名称字符串      合约名
      -r, --读取字符串       用于查询应用程序状态的URI (默认 "http://localhost:46658/query")
      -w, --写字符串      用于发送txs的URI (默认 "http://localhost:46658/rpc")
    

-a 和 -k 标志用于标识具有公用密钥和私钥地址文件的用户。

-b 给出了保存合约的原始EVM字节码的文件。 这可以用Solidity编译器，如 `solc --bin -o. MySolProgram.sol`

-n 允许你为合约输入名称。这将是一个比合同地址更用户友好的代号。

示例： 

    text
     ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
      http://localhost:46657 -r http://localhost:9999

  
如果一切正常，你应该看到类似以下的内容： ```文本 新合约部署地址： 默认: 0x71A53d11A3b77e369463804FEE9B17ba7E24d98B Runtime字节码: [96 96 96 64 82 ... 84 226 214 187 0 41] 事务收据: [10 178 198 52 108 ... 141 155 79 250 97 129 104 243]

    输出合约地址可用于调用命令中调用合约上的方法。
    独特的 [事务哈希] (https://loomx.io/developers/docs/en/evm.html#transaction-receipt) 可用于检索部署事务的收据。 
    
    ### 调用
    
    ```文本
    对合约调用一个可以改变其状态的方法
    
    使用:
      loom call [flags]
    
    Flags:
      -a, --地址字符串         地址文件
          --链字符串           链ID (默认 "默认")
      -c, --合约地址字符串   合约地址
      -n, --合约名字符串   合约名
      -h, --帮助                   调用的帮助
      -i, --输入字符串           输入数据的文件
      -k, --钥匙字符串             私有密钥文件
      -r, --读取字符串           用于查询应用程序状态的URI (默认 "http://localhost:46658/query")
    

-a 和 -k 标志用于标识具有公用密钥和私钥地址文件的用户。

-c 需要合约地址。这可以是先前对` \loom deploy `的调用或从启动日志中检索的一个输出。

-n 是部署时为合约输入的名称或标签。 可以用作地址的替代品。

-i 是输入字符串。对于一个Solidity合约，这将会是如[Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html) 中所述的ABI编码。

示例 ```文本 call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputSet.bin \ -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1 \ -w http://localhost:46657 -r http://localhost:9999

    完成后, 这将返回 [事务哈希](https://loomx.io/developers/docs/en/evm.html#transaction-receipt), 这对于每个事务调用都应该是唯一的。 它可用于返回事务的收据。
    
    ### static-call
    在合约上调用只读方法。 返回方法的返回值。
    ```文本
    使用:
      loom static-call [flags]
    
    Flags:
          --链字符串          链ID (默认 "默认")
      -c, --合约地址字符串   合约地址
      -n, --合约名字符串   合约名
      -h, --帮助                   静态调用的帮助
      -i, --输入字符串           输入数据文件
      -r, --读取字符串           用于查询应用程序状态的URI (默认 "http://localhost:46658/query")
      -w, --写字符串           用于发送txs的URI (默认 "http://localhost:46658/rpc")
      -a, --地址字符串         地址文件
          --链字符串          链ID (默认 "默认")
      -k, --密钥字符串             私钥文件
    

-a 和 -k 标志用于标识具有公用密钥和私钥地址文件的用户。

-c 需要合约地址。这可以是先前对` \loom deploy `的调用或从启动日志中检索的一个输出。

-n 是部署时为合约输入的名称或标签。 可以用作地址的替代品。

-i 是输入字符串。 对于一个Solidity合约，这将会是如[Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html) 中所述的ABI编码。 示例

地址域-a 和-k 是可选的。 ```文本 static-call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \ -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1 \ -w http://localhost:46657 -r http://localhost:9999

    <br />## 从一个用户插件
    
    部署在DApp链EVM上的智能合约可以从用户创建的插件里调用。 Go-loom里的EVM示例给出了一个如果实现这个的范例。 
    
    在继续下去之前，让我们考虑以下各种相关的组件。
    
    * 用户应用程序。 这是一个在DApp链上启动事务的终端用户应用程序。 
    
    * DApp链。 从用户应用程序接收事务并转发到相应的合约去运行。 同时将结果提交到区块链。
    
    * 智能合约。 这些是由用户编写并部署在DApp链上的。 
    有两种主要类型。
        1. 插件。 这些可以用gRPC所以支持的任何语言写；go-loom允许用Go写的合约的简单使用，而loom-js是给javascript的。 该插件被编译成一个DApp链用gRPC调用的可执行文件。
        2. EVM 智能合约。 Solidity程序或其他任何编译成EVM字节码的代码都可以由DApp链用它的EVM运行。
    
    插件可以通过使用gRPC回调到DApp链来运行其他合同，包括那些部署在EVM上的合约。 然而，相反的情况却并非如此，EVM部署的合约只能在EVM内进行交互，这是为了确保EVM的结果具有确定性。
    
    ### 用户代码
    
    用户提供两个代码项。 智能合约以及使用DApp链的终端应用程序。
    
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

We will look at a simple plugin that wraps this solidity contract. So our plugin will have two functions SetValue and GetValue that will just pass data between the SimpleStore contract and the transaction initiator. As it wraps this SimpleStore we will call it EvmExample.

Here is the outline as for the EvmExample contract, with stubs added for the SetValue and GetValue methods.

```go
package main

import (
    "github.com/loomnetwork/go-loom/plugin"
    "github.com/loomnetwork/go-loom/plugin/contractpb"
    "github.com/loomnetwork/go-loom/examples/plugins/evmexample/types"
)

type EvmExample struct {
}

func (c *EvmExample) Meta() (plugin.Meta, error) {
    return plugin.Meta{
        Name:    "EvmExample",
        Version: "1.0.0",
    }, nil
}

func (c *EvmExample) SetValue(ctx contractpb.Context, value *types.WrapValue) error {
    return nil
}

func (c *EvmExample) GetValue(ctx contractpb.Context, req *types.Dummy) (*types.WrapValue, error) {
        return nil, nil
}

var Contract = contractpb.MakePluginContract(&EvmExample{})

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

Now we know how to get the input, and contact address we can give an example of our SetValue method. Error checking removed for clarity.

```go
func (c *EvmExample) SetValue(ctx contractpb.Context, value *types.WrapValue) error {
    ssAddr, err := ctx.Resolve("SimpleStore")
    abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    input, err := abiSS.Pack("set", big.NewInt(value.Value))

    evmOut := []byte{}
    err = contractpb.CallEVM(ctx, ssAddr,R input, &evmOut)
    return err
}
```

This function could be called in Go using Go-loom with.

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, writeUri, readUri)
    contract := client.NewContract(rpcClient, contractAddr, "EvmExample")
    payload := &types.WrapValue{
        Value: int64(value),
    }
    _, err = contract.Call("SetValue", payload, signer, nil)

```

The GetValue function now works in a similar fashion. We now have to unwrap the output from the solidity contract and return it in a WrapValue message . `StaticCallEvm` is used as `get` is a view or constant function.

```go
import (
    "github.com/ethereum/go-ethereum/accounts/abi"
    "github.com/ethereum/go-ethereum/common"
    "github.com/loomnetwork/go-loom/examples/plugins/evmexample/types"
    "github.com/loomnetwork/go-loom/plugin"
    "github.com/loomnetwork/go-loom/plugin/contractpb"  
    "math/big"
    "strings"
    "strconv"
)

func (c *EvmExample) GetValue(ctx contractpb.Context, req *types.Dummy) (*types.WrapValue, error) {
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
    err = contractpb.StaticCallEVM(ctx, ssAddr, input, &evmOut)
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

## EvmContract

go-loom and loom-js provide help for communicating with a running DAppChain using a RPC client.

### go-loom

This works in much the same way as described for [go-loom Contract](https://loomx.io/developers/docs/en/go-loom-clients.html#connecting-to-a-dappchain)

#### Connecting to a Solidity contract on a DAppChain

So to connect to an existing solidity smart contact running on a DAppChain EVM we can use

```go
package main

import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/vm"
)

// getContract creates a new `Contract` instance that can be used to interact
 with a smart contract deployed on a DAppChain's EVM.
func getEvmContract(contractName string) (*client.EvmContract, error) {
  rpcClient := client.NewDAppChainRPCClient(
    "default",
    "ws://127.0.0.1:46657/websocket",
    "ws://127.0.0.1:9999/queryws",
  )
  contractAddr, err := rpcClient.Resolve(contractName)
  if err != nil {
    return nil, err
  }
  return client.NewEvmContract(rpcClient, contractAddr), nil
}
```

#### Deploying a Solidity contract to a DAppChain

We can also deploy a new smart contract to a running DAppChain EVM. For this we need the contracts bytecode.

A solidity contract can be converted to byte code using the solidity compiler `solc --bin -o . mySolidityProgram.sol`

`hex.DecodeString` can be used to convert a hex string to a []byte array. We can then use the client.DeployContract to deploy our contract. and return an EVMContract handle. The second return parameter is a [transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-receipt) that can be used to retrive a reciept of the transaction using the TxHash Query.

```go
import (
  "encoding/hex"
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/vm"
)

func deployEvmContract(name string, byteHex string, signer auth.Signer) 
(handle *EvmContract, txReciept []byte, err error) {
    // remove the 0x at the beging of a hex string
    byteCode, err := hex.DecodeString(string(byteHex[2:]))
    if err != nil {
        return err
    }
    rpcClient := client.NewDAppChainRPCClient(common.ChainID, common.WriteURI, common.ReadURI)
    return client.DeployContract(rpcClient, signer, byteCode, name)
}
```

#### Retrieving Solidity contract's code

You can retrieve the runtime bytecode for a deployed solidity contract using the DAppChains QueryInterface method GetCode.

```go
// GetCode returns the runtime byte-code of a contract running on a DAppChain's EVM.
// Gives an error for non-EVM contracts.
// contract - address of the contract in the form of a string. (Use loom.Address.String() to convert)
// return []byte - runtime bytecode of the contract.
func (c *DAppChainRPCClient) GetCode(contract string) ([]byte, error) 
```

The runtime code is the inital contract's binary with the code for starting and construting the contract removed as its no longer needed.

#### Writing to a Solidity contract on a DAppChain

Writing and reading to a smart contract deployed on a DAppChain's EVM works in a similar way to [writing](https://loomx.io/developers/docs/en/go-loom-clients.html#writing-data-to-a-dappchain) and [reading](https://loomx.io/developers/docs/en/go-loom-clients.html#reading-data-from-a-dappchain) to non-EVM plugins. The main difference is that the function signature and input parameters need to be converted to bytecode using [ABI encoding](https://solidity.readthedocs.io/en/develop/abi-spec.html). You can use the go-ethereum [abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON) function to encode input using your contracts ABI which you can get from `solc --abi -o. MySolidiityProgram.sol`

EvmContract's Call method is used for methods that mutate the DAppChain's state. ```go input ( "github.com/loomnetwork/go-loom/auth" "github.com/loomnetwork/go-loom/client" "github.com/loomnetwork/go-loom/vm "github.com/ethereum/go-ethereum/accounts/abi"  
)

func store(contract *client.EvmContract, key, abi string, value int) ([]byte, error) { abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI)) if err != nil { return []byte{}, err } input, err := abiSS.Pack("set", big.NewInt(value.Value)) if err != nil { return []byte[], err ] return contract.Call(input, key) } ``` The Call method returns a [transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-hash) You can use the transaction hash retrieve more information about the contract using the `GetEvmTxReceipt` method. This returns a [transcation recieipt, vm.EvmTxReceipt](https://loomx.io/developers/docs/en/evm.html#transaction-receipt) object.

```go
 input (
   "github.com/loomnetwork/go-loom/auth"
   "github.com/loomnetwork/go-loom/client"
   "github.com/loomnetwork/go-loom/vm
   "github.com/ethereum/go-ethereum/accounts/abi"   
 )

 ...
    txHash, err := store(ecmContract, key, abi, 23)
    if err != nil {
        return err
    }
    rpcClient := client.NewDAppChainRPCClient(common.ChainID, common.WriteURI, common.ReadURI)
    var receipt vm.EvmTxReceipt
    receipt, err = rpcClinet.GetTxReceipt(txHash)
 ...

```

#### Reading from a Solidity contract on a DAppCahin

To get information from an EVM smart contract you need to call a view method using the EvmContract's staticCall. This returns the result in an ABI encoded []byte. As for other EVM methods the function signature and input arguments are [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html). The caller field in StaticCall is optional, and using an empty loom.Address is fine.

```go
 input (
   "github.com/loomnetwork/go-loom/auth"
   "github.com/loomnetwork/go-loom/client"
   "github.com/loomnetwork/go-loom/vm
   "github.com/ethereum/go-ethereum/accounts/abi"   
 )

 func get(contract *client.EvmContract, abi string, value int) ([]byte, error) {
    abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    if err != nil {
        return []byte{}, err
    }
    input, err := abiSS.Pack("set", big.NewInt(value.Value))
    if err != nil {
        return []byte[], err
    ]
    return contract.StaticCall(input, loom.RootAddress("MyChainId")) 
 }
 ```

### loom-js

In JavaScript and TypeScript you can Call methods contracts deployed on the EVM 
of a DAppChain in a similar way as for non-EVM plugins, outlined in the 
[loom-js quickstart](https://loomx.io/developers/docs/en/loom-js-quickstart.html#connecting-to-a-dappchain)

#### Connecting to a Solidity contract on a DAppChain

We use the EvmContract class instead of the Contract class. So the loom-js
 quick-start getEvmContract could looks like:
```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  EvmContract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * Creates a new `EvmContract` instance that can be used to interact with a 
 smart contract running on a DAppChain's EVM.
 * @param privateKey Private key that will be used to sign transactions sent to the contract.
 * @param publicKey Public key that corresponds to the private key.
 * @returns `EvmContract` instance.
 */
async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]
  const contractAddr = await client.getContractAddres('MySolidityContract')
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  return new EvmContract({
    contractAddr,
    callerAddr,
    client
  })
}
```

#### Writing to a Solidity contract on a DAppChain

Calling an EVM smart contract's method that mutates the state works the same as [writiing data to a DAppChain](https://loomx.io/developers/docs/en/loom-js-quickstart.html#writing-data-to-a-dappchain) The main difference in the case of an EvmContract is that the input takes the format of an [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html) array.

```go
    let txHash = await evmContract.callAsync(abiEncodedInput)
```

The return value is a [transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-hash) You can use the transaction hsh retrive more information about the contract using the `GetEvmTxReceipt` method. This returns a [transaction receipt, EvmTxReceipt](https://loomx.io/developers/docs/en/evm.html#transaction-receipt) object

```text
    let receipt = await client.getTxReceiptAsync(rtv)
```

#### Reading from a Solidity contract on a DAppCahin

To get information from an EVM smart contract you need to call a view method using the EvmContract's staticCall. This returns the result in an ABI encoded []byte. As for other EVM methods the function signature and input arguments are [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html).

```go
    let txResult = await evmContract.staticCallAsync(abiEncodedInput)
```

## Transaction hash

Writing to a DAppChain using a `Call` transactions that can modify the state returns a transaction hash. This is a unique hash of the transaction details. No two contracts should return the same hash. It can be used to retrieve details of the transaction.

### Transaction receipt

Details of each EVM call transaction are stored on the loomchain and can be accessed using the transaction hash.

The loom chain `QueryService` has the method `TxReceipt(txHash []byte) 
([]byte, error)` which returns the receipt in a protobuf form. go-loom and loom-js provide an API for this query.

go-loom:`func (c *DAppChainRPCClient) GetEvmTxReceipt(txHash []byte) (vm
.EvmTxReceipt, error)`

loom-js: `async getTxReceiptAsync(txHash: Uint8Array): Promise<EvmTxReceipt | null>`

Details of the transaction receipt objects follow. 

| Field             | Contents                                       |
| ----------------- |:---------------------------------------------- |
| TransactionIndex  | transaction number this block                  |
| BlockHash         | Hash of the last block                         |
| BlockNumber       | Block height                                   |
| CumulativeGasUsed | Currently not used                             |
| GasUsed           | Currently not used                             |
| ContractAddress   | Address of the contract called                 |
| Logs              | Events, encoded as an array of Event protobufs |
| LogsBloom         | Not used                                       |
| Status            | 1 = success or 0 = failier                     |