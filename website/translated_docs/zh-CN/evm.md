---
id: evm
title: 以太坊虚拟机
sidebar_label: EVM
---
## 概括

loom DApp链包含一个以太坊虚拟机（EVM）并使你可以部署以及运行将编译成EVM字节码的智能合约。

### 以太坊虚拟机

一个EVM由一个数据库以及EVM字节码解释器组成。

解释器运行EVM字节码，专为创建适合区块链的安全的确定性程序而设计。 编码EVM智能合约最受欢迎的语言是Solidity，不过任何编译为EVM字节码的语言都可以由EVM解释器运行。

该数据库由EVM上已部署的每个程序的地址键入。 该值包含程序的字节码和任何相关数据。

### DApp链和EVM

目前有几种与DApp链EVM交互的方式。

1. 智能合约可以在区块链初始启动时被部署。
2. Loom命令行工具允许部署智能合约或在已经部署的合约中调用方法。
3. 另一种智能合约，即EVM合约或插件合约，可以调用已部署的EVM合约上的方法。
4. 在Go里你可以用go-loom的EvmContract对象。
5. 在TypeScript或JavaScript中你使用loom-js的EvmContract对象。
    
    EVM智能合约以编译的字节码的形式部署到DApp链中。 这使得链无法得知父语言。 Solidity智能合约方法调用的参数是以在[Solidity网站上有详细文档的](https://solidity.readthedocs.io/en/develop/abi-spec.html)应用程序二进制接口(ABI) 来进行编码的。 ABI可以变得相当复杂，但是正如我们以后看到的，以太坊实现应该给出了支持参数生成的功能。
    
    ## 在启动时部署
    
    通过将已编译的代码放入合约目录中并链接 `genesis.json`文件, 可以在启动时在DApp链上部署合约。
    
    这里是genesis文件的一个示例。 ```json { "contracts": [ { "vm": "EVM", "format": "truffle", "name": "SimpleStore", "location": "/path/to/loomchain/contracts/SimpleStore.json" }, { "vm": "plugin", "format": "plugin", "name": "evmexample", "location": "evmexample:1.0.0", "init": {
    
             }
         }
        
    
    ] }

    在顶部的数组中有两个合约。 第一个是EVM合约，第二个是插件。
    * `vm: ` 用于运行合约的虚拟机。 目前有两种选择。
      1. `plugin` 用户创建了合约。
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
    
    在下面我们将假设，Go被用于终端应用程序，而插件的智能合约用Go写，EVM的智能合约用Solidity写。 参阅 loom-js-quickstart.md 来寻找javascript的解决方案。
    
    ### 最小插件
    
    首先让我们来看看在Go-loom里合约的定义。
    ```go
    type Contract interface {
        Meta() (plugin.Meta, error)
    }
    

而plugin.Meta是从一个protobuf定义中被定义的

```go
type ContractMeta struct {
    Name    string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
    Version string `protobuf:"bytes,2,opt,name=version,proto3" json:"version,omitempty"`
}
```

因此, 一个合约所需要的就是实现Meta函数。然而，作为可在DApp链里使用的插件，还需要有一些其他东西。这里是一个最简单的例子。

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
```

这里是一些需要注意的地方。 1. 第一，合约必须是package main。 2. 将我们名为Hello World的合约定义为结构。 3. 实现`Meta()` 函数，返回合约名和版本号。 4. 需要定义变量`Contract`。 函数`contract.MakePluginContract` 将我们简单的大纲转换为一个DApp链能与之交互的东西。 5. 然后，主例程可以将合约设置为工作服务器。

当然了，我们的合约没有任何功能所以什么也做不了。 下一步就是为其添加一些功能。 然后，MakePluginContract函数可以使用反射来学习我们为合约提供的所有新方法。

### 添加功能

```go
func (c *HelloWorld) Hello(ctx contract.StaticContext, req *types.HelloRequest) (*types.HelloResponse, error) {
    return &types.HelloResponse{
        Out: "Hello World!",
    }, nil
}
```

所以这样一个简单的函数就会返回一个固定的语句。 几个重点。 `contract.StaticContext` 或者 `contract.Context` 应该是第一个参数。 它提供了多种方法允许你访问DApp链上的资源。 比如，观看或修改状态数据库，或者调用其他插件。 * 第二个参数中的用户输入和第一个返回值以[protobuf 语句](https://developers.google.com/protocol-buffers/)的形式出现；在这个例子中就是 HelloRequest 和 HelloResponse。 这些protobuf语句结构需要从一个中性语言的.proto文件中生成。 见下。 * 输入和输出的protobuf语句参数需要和调用应用程序协调。 由于protobuf语句数据结构是从与语言无关的.proto文件生成的，因此调用应用程序和智能合约是用不同语言编写的并不重要。

所以这将是适合我们的Hello函数的 types.proto 文件的示例。

```proto
syntax = "proto3";

message HelloRequest {
    string in = 1;
}

message HelloResponse {
    string out = 1;
}

```

一个我们可以使用的 types.pb.go 文件，可以通过使用proto的 protoc-gen-gogo 插件构建， 命令如下 

    bash
     protoc --gogo_out=. --plugin=protoc-gen-gogo  types.proto

### 调用智能合约

以下代码片段显示了如何使用Go-loom中的函数在Go中调用HelloWorld示例的Hello函数。

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, "http://localhost:1234", "http://localhost:2345")
    contract := client.NewContract(rpcClient, contractAddr, "HelloWorld")
    request := &types.HelloRequest{}
    response := &types.HelloResponse{}
    _, err = contract.StaticCall("Hello", request, signer, response)
    fmt.Println(response.Out)
```

1. 创建一个可以通过自己的url与我们的DApp链交互的客户端。
2. 从我们的智能合约的名字和地址中获取代号。
3. 有线类型 HelloRequest 和 HelloResponse 必须匹配我们调用的合约方法的输入和输出参数。 
4. 调用`Hello` 方法。我们起诉StaticCall，因为 Hello 方法有一个静态上下文。

## 调用Solidity合约

现在我们已经快速回顾了实现插件的情况，我们可以从插件中访问部署在DApp链的EVM上的智能合约。

首先，我们假设我们已经在DApp链的EVM上部署了这个简单的Solidity合约。

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

我们将看一个包含这个Solidity合约的简单插件。 所以我们的插件将有两个功能 SetValue 和 GetValue，他们将把数据在SimpleStore合约和事务启动器中传递。 因为它包含这个SimpleStore，我们称之为EvmExample。

以下是EvmExample合约的大纲，其中为 SetValue 和 GetValue 方法添加了存根。

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

用于生成语句声明的 .proto 文件如下所示

```proto
syntax = "proto3";

message Dummy {
}

message WrapValue {
    int64 value = 1;
}
```

让我们先看看 SetValue 函数。需要调用来在EVM上运行智能合约的函数是 ```go contractpb.CallEVM(ctx Context, addr loom.Address, input []byte, output *[]byte) error

    传递了上下文，用于设置输出只能是一个虚拟对象。 我们需要Solidity合约的地址以及正确的输入值。
    
    上下文包含一个注册表，允许我们从其名称中获取合约的地址。
    ```go
    ssAddr, err := ctx.Resolve("SimpleStore")
    

输入值被直接传递到EVM并且需要被如[Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html)所述的编码。

### ABI编码参数

所以我们的输入值需要被编码如下

```text
60fe47b100000000000000000000000000000000000000000000000000000000000003db
```

别害怕，go-ethereum 可以帮助我们。

当你编译Solidity的时候，你不仅获得了运行在EVM上的字节码，你还得到了一个ABI。ABI是一个描述合约接口的json事物。这里是给我们SimpleStore的ABI

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

我们可以使用"github.com/ethereum/go-ethereum/accounts/abi" 和这个ABI字符串来编码我们的输入值。 那个关键的函数是[abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON)

```go
    abiSimpleStore, err := abi.JSON(strings.NewReader(SimpleStoreABI))
    input, err := abiSimpleStore.Pack("set", big.NewInt(value.Value))
```

在这里，我们在`SimpleStoreABI` 变量中有SimpleContract ABI。我们可以从文件中读取，或者将其硬代码入源中。

Pack 方法采用函数签名和参数列表, 并返回编码的输入。

### 整理一下

现在我们知道如何得到输入和合约地址，我们可以给出一个SetValue方法的例子。为了清晰起见, 删除了错误检查。

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

这个函数可以用Go-loom的Go语言调用。

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, writeUri, readUri)
    contract := client.NewContract(rpcClient, contractAddr, "EvmExample")
    payload := &types.WrapValue{
        Value: int64(value),
    }
    _, err = contract.Call("SetValue", payload, signer, nil)

```

GetValue 函数以类似的方式工作。 我们现在必须从Solidity合约中打开输出，并在WrapValue 消息中返回。 `StaticCallEvm` 用作 `get` 是一个view或者常量函数。

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

go-loom和loom-js用一个RPC客户端为与一个运行中的DApp链的交互提供帮助。

### go-loom

这个工作的方式和[go-loom Contract](https://loomx.io/developers/docs/en/go-loom-clients.html#connecting-to-a-dappchain) 中所述的类似。

#### 连接到 DApp链上的Solidity合约

因此，要连接到一个现有的运行在DApp链EVM上的Solidity智能合约，我们可以使用

```go
package main

import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/vm"
)

// getContract 创建一个新的“合约”实例，它可用于与部署在DApp链上EVM的智能合约交互。
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

#### 将Solidity合约部署到一个DApp链上

我们还可以将新的智能合约部署到运行的 DApp链EVM。为此，我们需要合约字节码。

可以使用Solidty编译器`solc --bin -o . mySolidityProgram.sol` 将Solidity合约转换为字节代码。

`hex.DecodeString` 可用于将十六进制字符串转换为 [] 字节数组。 然后, 我们可以使用 client.DeployContract 来部署我们的合约。 然后返回一个 EVMContract 的代号。 第二个返回的参数是一个[transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-receipt)，它可以被用来取回使用TxHash Query的事务回执。

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

#### 取回Solidity合约的代码

你可以使用DAppChains QueryInterface的方法 GetCode 来取回一个已部署Solidity合约的运行时字节码。

```go
// GetCode 返回在 DAppChain 的 EVM 上运行的协定的运行时字节代码。
// 为非 EVM 合约提供error。
// 合约 - 字符串形式的合约地址。 (使用 loom.Address.String() 来转换)
// 返回 []byte - 合约运行时的字节码。
func (c *DAppChainRPCClient) GetCode(contract string) ([]byte, error) 
```

运行时代码是初始合约的二进制文件, 其中移除启动和构建的合约代码，因为不再需要了。

#### 在DApp链上编写Solidity合约

编写和读取部署在DApp链EVM上的智能合约类似于[编写](https://loomx.io/developers/docs/en/go-loom-clients.html#writing-data-to-a-dappchain)和[读取](https://loomx.io/developers/docs/en/go-loom-clients.html#reading-data-from-a-dappchain)非EVM插件。 主要区别在于函数签名和输入参数需要用[ABI 编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)转换为字节码。 你可以用 go-ethereum [abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON) 函数使用你的合约ABI（可以从`solc --abi -o.MySolidiityProgram.sol ` 获取）来对输入进行编码。 

EvmContract的调用方法是用于改变DApp链状态的方法。 ```go input ( "github.com/loomnetwork/go-loom/auth" "github.com/loomnetwork/go-loom/client" "github.com/loomnetwork/go-loom/vm "github.com/ethereum/go-ethereum/accounts/abi"  
)

func store(contract *client.EvmContract, key, abi string, value int) ([]byte, error) { abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI)) if err != nil { return []byte{}, err } input, err := abiSS.Pack("set", big.NewInt(value.Value)) if err != nil { return []byte[], err ] return contract.Call(input, key) } ``` The Call method returns a [transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-hash) 你可以通过`GetEvmTxReceipt`方法用事务回执来取回更多关于合约的信息。 这会返回一个[transcation recieipt, vm.EvmTxReceipt](https://loomx.io/developers/docs/en/evm.html#transaction-receipt)对象。

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

#### 读取DApp链上的Solidity合约

想从EVM智能合约得到信息，你需要使用EvmContract的 staticCall 来调用 view 方法。 这会返回ABI编码[]字节形式的结果。 对于其他EVM方法，函数签名和输入变量是 [ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)的。 StaticCall的调用方字段是可选的，并且用空的 loom.Address 也可以。

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

在JavaScript和TypeScript中，你可以类似于非EVM插件那样在部署在DApp链EVM上的合约上调用方法，大纲在[loom-js quickstart](https://loomx.io/developers/docs/en/loom-js-quickstart.html#connecting-to-a-dappchain) 

#### 链接在DApp链上的智能合约

我们使用 EvmContract 而不是 Contract class。 所以 loom-js 快速启动 getEvmContract 可以像是：
```js
const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  EvmContract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * 创建一个新的“EvmContract”示例，其可以用以于在DApp链EVM上运行的智能合约交互。
 * @param privateKey 将用于签署发送到合约的事务的私钥。
 * @param publicKey 与私钥相对应的公钥。
 * @returns `EvmContract` 示例.
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

#### 在DApp链上编写Solidity合约

调用EVM智能合约改变状态的方法类似于[将数据写入DApp链](https://loomx.io/developers/docs/en/loom-js-quickstart.html#writing-data-to-a-dappchain)。在EvmContract例子中最主要的区别是输入的形式是[ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)的数组。

```go
    let txHash = await evmContract.callAsync(abiEncodedInput)
```

返回值是一个[事务哈希](https://loomx.io/developers/docs/en/evm.html#transaction-hash)。你可以通过`GetEvmTxReceipt`方法用事务哈希取回更多关与合约的信息。 这会返回一个[transaction receipt, EvmTxReceipt](https://loomx.io/developers/docs/en/evm.html#transaction-receipt)对象。

```text
    let receipt = await client.getTxReceiptAsync(rtv)
```

#### 读取DApp链上的Solidity合约

想从EVM智能合约得到信息，你需要使用EvmContract的 staticCall 来调用 view 方法。 这会返回ABI编码[]字节形式的结果。 对于其他EVM方法，函数签名和输入变量是 [ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)的。

```go
    let txResult = await evmContract.staticCallAsync(abiEncodedInput)
```

## 事务哈希

使用可以修改状态的`Call`事务来写入DApp链返回事务哈希。 这是事务详细信息的唯一哈希。 没有两个合约能返回相同的哈希。 它可用于取回事务的详细信息。

### 事务回执

每个 EVM 调用事务的详细信息存储在 loomchain 上, 可以使用事务哈希访问。

Loom chain 的`QueryService` 有返回protobuf形式回执的`TxReceipt(txHash []byte) ([]byte, error)`方法。 go-loom 和 loom-js 为此查询提供API。

go-loom:`func (c *DAppChainRPCClient) GetEvmTxReceipt(txHash []byte) (vm
.EvmTxReceipt, error)`

loom-js: `async getTxReceiptAsync(txHash: Uint8Array): Promise<EvmTxReceipt | null>`

以下是事务回执对象的详细信息。 

| 字段                | 内容                   |
| ----------------- |:-------------------- |
| TransactionIndex  | 此区块的事务编号             |
| BlockHash         | 上一区块的哈希              |
| BlockNumber       | 区块高度                 |
| CumulativeGasUsed | 目前尚未使用               |
| GasUsed           | 目前尚未使用               |
| ContractAddress   | 被调用合约的地址             |
| Logs              | 事件，编码为事件protobufs的数组 |
| LogsBloom         | 尚未使用                 |
| Status            | 1 = 成功 或 0 = 失败      |