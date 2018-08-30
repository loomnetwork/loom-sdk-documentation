---
id: evm
title: 以太坊虚拟机
sidebar_label: EVM
---
## 概述

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

这里是genesis文件的一个示例。

```json
 {
     "contracts": [
         {
             "vm": "EVM",
             "format": "truffle",
             "name": "SimpleStore",
             "location": "/path/to/loomchain/contracts/SimpleStore.json"
         },
         {
             "vm": "plugin",
             "format": "plugin",
             "name": "evmexample",
             "location": "evmexample:1.0.0",
             "init": {

             }
         }
     ]
 }

```

顶部数组中有两个合约。 第一个是EVM合同，第二个是插件。

* `vm:` 以前是虚拟机运行合约。现在有两种选择。 
    1. `plugin` 用户创建合约。
    2. `EVM` 合约运行在DApp链 EVM 上。
* `format` 合约目录中智能合约输入文件的性质。 
    1. `plugin` 用户插件，可以由 `go-loom` 生成。
    2. `truffle` Solidity 程序，使用 truffle 编译器编译。
    3. `solidity` Solidity 程序，使用 solc 编译。
    4. `hex` Raw Hex，例如使用 ` solc -o </ code> 选项编译的 solidty 程序。</li>
</ol></li>
<li><code>name` 这个名称可用于检索由 loom 或 EVM 分配的合约地址。
    5. `location` 位于contracts目录中的文件二进制文件的版本化名称。 对于 truffle 和 solidity，可能有必要提供完整的路径。</ul> 
    
    所以在这个例子中，Loom DApp链将会用我们 SimpleStore solidity 合约的 truffle 编译中的字节码。 然后将在该链的EVM上部署它。 可以在loom的登录信息中找到确认信息和合约地址。
    
    ## 从命令行部署并运行
    
    Loom 命令行工具有三个用于与链的 EVM 交互的命令。
    
    * `deploy` 这会将一个用 EVM 字节码写的智能合约部署到该链的EVM上。
    * `call` 这将对一个已经部署的EVM智能合约调用一个改变其状态的方法。
    * `static-call` 这将对一个已经部署的EVM智能合约调用一个只读的方法。
    
    ### 部署
    
    使用` ./ loom deploy </ code>部署合约时，会将其编译为 EVM 字节码并放置在 DApp 链的 EVM 中。</p>

<pre><code class="text">Deploy a contract 

Usage:
  loom deploy [flags]

  -a, --address string    address file
  -b, --bytecode string   bytecode file
      --chain string      chain ID (default "default")
  -h, --help              help for deploy
  -k, --key string        private key file
  -n, --name string       contract name
  -r, --read string       URI for quering app state (default "http://localhost:46658/query")
  -w, --write string      URI for sending txs (default "http://localhost:46658/rpc")
`</pre> 
    
    -a 和 -k 标志用于标识具有公钥和私钥地址文件的用户。
    
    -b 提供了保存合约的原始 EVM 字节码的文件。 这可以使用 Solidity 编译器，如 `solc --bin -o. MySolProgram.sol`
    
    -n allows you to enter a name for your contract. This will act as a more user friendly handle than the contract address.
    
    例如：
    
    ```text
     ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
      http://localhost:46658/rpc -r http://localhost:46658/query
    ```
    
    如果一切正常，你将会看到以下内容：
    
    ```text
    和地址一同部署的新合约：  default:0x71A53d11A3b77e369463804FEE9B17ba7E24d98B
    Runtime bytecode:  [96 96 96 64 82 ... 84 226 214 187 0 41]
    事务回执:  [10 178 198 52 108 ... 141 155 79 250 97 129 104 243]
    
    ```
    
    The output contract address can be used to call a method on the contract in the call command. 搜索要部署的事务回执，请使用唯一的[事务哈希](https://loomx.io/developers/docs/en/evm.html#transaction-receipt) 。
    
    ### 调用
    
    ```text
    在可以改变状态的合约上调用方法
    
    Usage:
      loom call [flags]
    
    Flags:
      -a, --address string         address file
          --chain string           chain ID (default "default")
      -c, --contract-addr string   contract address
      -n, --contract-name string   contract name
      -h, --help                   help for call
      -i, --input string           file with input data
      -k, --key string             private key file
      -r, --read string            URI for quering app state (default "http://localhost:46658/query")
      -w, --write string           URI for sending txs (default "http://localhost:46658/rpc")
    ```
    
    -a 和 -k 标志用于标识具有公钥和私钥地址文件的用户。
    
    -c 需要合约地址。这可以是先前对` \loom deploy `的调用或从启动日志中检索的一个输出。
    
    -n 是部署时为合约输入的名称或标签。 可以用作地址的替代品。
    
    -i 是输入字符串。对于一个 Solidity 合约，这将会是如[Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html) 中所述的ABI编码。
    
    例如
    
    ```text
    call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputSet.bin \
      -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1  \
      -w http://localhost:46658/rpc -r http://localhost:46658/query                         
    
    ```
    
    完成后, 将返回 \[事务哈希\](https://loomx.io/developers/docs/en/evm.html#transaction-receipt), 这对于每个事务调用都应该是唯一的。 它可用于返回事务的回执。
    
    ### 静态调用
    
    调用合约的只读方法，返回方法的返回值。
    
    ```text
    Usage:
      loom static-call [flags]
    
    Flags:
          --chain string           chain ID (default "default")
      -c, --contract-addr string   contract address
      -n, --contract-name string   contract name
      -h, --help                   help for static-call
      -i, --input string           file with input data
      -r, --read string            URI for quering app state (default "http://localhost:46658/query")
      -w, --write string           URI for sending txs (default "http://localhost:46658/rpc")
      -a, --address string         address file
          --chain string           chain ID (default "default")
      -k, --key string             private key file
    ```
    
    -a 和 -k 标志用于标识具有公钥和私钥地址文件的用户。
    
    -c 需要合约地址。这可以是先前对` \loom deploy `的调用或从启动日志中检索的一个输出。
    
    -n 是部署时为合约输入的名称或标签。 可以用作地址的替代品。
    
    -i 是输入字符串。 对于一个 Solidity 合约，这将会是如[Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html) 中所述的ABI编码。 例如
    
    地址域-a 和-k 是可选的。
    
    ```text
    static-call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \
      -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1  \
      -w http://localhost:46658/rpc -r http://localhost:46658/query
    
    ```
    
    ## 来自用户插件
    
    部署到 DApp 链的 EVM 上的智能合约可以由创建插件的用户调用。在 go-loom 系统中的 evmexample 实例给出了实现这一目标的方法。
    
    在继续下去之前，让我们考虑以下各种相关的组件。
    
    * 用户申请。这是一个在 DApp 链上启动事务的终端用户应用程序。
    
    * DApp 链。从用户应用程序接收事务并转发到要运行的相应合同。 同时将结果提交给区块链。
    
    * 智能合约。由用户编写并部署在 DApp 链上。有两种主要类型。
        
        1. 插件。 可以用 gRPC 所支持的任何语言编写；go-loom 允许简单使用 Go 编写合约，并为 javascript 提供 loom-js 。 该插件被编译为 DApp 链使用 gRPC 调用的可执行文件。
        2. EVM smart contracts. Solidity programs or any other code that compiles into EVM bytecode can be run by the DAppChain using its EVM.
    
    插件可以通过使用 gRPC 回调到 DApp 链来运行其他合约，包括那些部署在EVM上的合约。 然而，相反的情况却并非如此，EVM 部署的合约只能在 EVM 内进行交互，这是为了确保 EVM 的结果具有确定性。
    
    ### 用户代码
    
    用户提供两项代码。智能合约和使用 DApp 链的最终应用程序。
    
    接下来我们将假设，Go 被用于终端应用程序，而插件的智能合约用 Go 编写，EVM 的智能合约用 Solidity 编写。 有关 JavaScript 的解决方案，请参考[ loom-js-quickstart ](loom-js-quickstart.html)。
    
    ### 最小的插件
    
    首先让我们看一下 Go-loom 中合约的定义。
    
    ```go
    type Contract interface {
        Meta() (plugin.Meta, error)
    }
    ```
    
    而 plugin.Meta 是从 protobuf 的定义中被定义的
    
    ```go
    type ContractMeta struct {
        Name    string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
        Version string `protobuf:"bytes,2,opt,name=version,proto3" json:"version,omitempty"`
    }
    ```
    
    因此, 一个合约所需要的就是实现 Meta 函数。然而，作为可在 DApp 链里使用的插件，还需要有一些其他东西。这里有一个最简单的例子。
    
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
    
    这里有一些需要注意的地方。
    
    1. 首先，合约必须是 package main 。
    2. 将我们名为 Hello World 的合约定义为结构。
    3. 实现`Meta()` 函数，返回合约名和版本号。
    4. The variable `Contract` needs to be defined. The function `contract
.MakePluginContract` converts our simple outline into an object that a DAppChain can communicate with.
    5. 然后，主例程可以将合约设置为工作服务器。
    
    当然了，我们的合约没有任何功能所以什么也做不了。 下一步就是为其添加一些功能。 然后，MakePluginContract 函数可以使用反射来学习我们为合约提供的所有新方法。
    
    ### 添加功能
    
    ```go
    func (c *HelloWorld) Hello(ctx contract.StaticContext, req *types.HelloRequest) (*types.HelloResponse, error) {
        return &types.HelloResponse{
            Out: "Hello World!",
        }, nil
    }
    ```
    
    这是一个返回固定消息的简单函数。 有以下要点。
    
    * `contract.StaticContext` 或 `contract.Context` 应该是第一个参数。 它提供了多种方法允许你访问DApp链上的资源。 例如，查看或修改状态数据库，或者调用其他插件。 
    * * 第二个参数中的用户输入和第一个返回值以 [protobuf 语句](https://developers.google.com/protocol-buffers/)的形式出现；在这个例子中就是 HelloRequest 和 HelloResponse。 这些 protobuf 语句结构需要从一个语言中立的 .proto 文件中生成。 请参考一下内容。
    * 输入和输出 protobuf 消息参数需要与调用应用程序协调。 由于 protobuf 语句数据结构是从与语言无关的 .proto 文件生成的，因此调用应用程序和智能合约是用不同语言编写的并不重要。 
    
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
    
    一个我们可以使用的 types.pb.go 文件，可以通过使用 proto 的 protoc-gen-gogo 插件构建， 命令如下
    
    ```bash
     protoc --gogo_out=. --plugin=protoc-gen-gogo  types.proto
    ```
    
    ### 调用智能合约
    
    以下代码片段显示了如何使用 Go-loom 中的函数在 Go 中调用 HelloWorld 示例的 Hello 函数。
    
    ```go
        rpcClient := client.NewDAppChainRPCClient(chainId, "http://localhost:1234", "http://localhost:2345")
        contract := client.NewContract(rpcClient, contractAddr, "HelloWorld")
        request := &types.HelloRequest{}
        response := &types.HelloResponse{}
        _, err = contract.StaticCall("Hello", request, signer, response)
        fmt.Println(response.Out)
    ```
    
    1. 创建一个可以使用期 url 与我们的 DApp 链交互的客户端。
    2. 从我们的智能合约的名字和地址中获取代号。
    3. 有线类型 HelloRequest 和 HelloResponse 必须匹配我们调用的合约方法的输入和输出参数。 
    4. 调用`Hello` 方法。我们提出 StaticCall 的请求，因为 Hello 方法有一个静态上下文。
    
    ## 调用 Solidity 合约
    
    现在我们已经快速回顾了实现插件的情况，我们可以从插件中访问部署在 DApp 链的 EVM 上的智能合约。
    
    首先，我们假设我们已经在 DApp 链的 EVM 上部署了这个简单的 Solidity 合约。
    
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
    
    我们将看到一个包含 Solidity 合约的简单插件。 通过这种方式，我们的插件将具有两个函数—— SetValue 和 GetValue ，它们将在 SimpleStore 合约和事务启动器之间传递数据。 因为它包含这个 SimpleStore ，我们称之为 EvmExample 。
    
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
    
    让我们先看看 SetValue 函数。 调用在 EVM 上运行智能合约的功能是
    
    ```go
     contractpb.CallEVM(ctx Context, addr loom.Address, input []byte, output *[]byte) error 
    ```
    
    这里传递了上下文，因为设置输出只能是一个虚拟对象。 我们需要确定合约的地址和正确的输入。
    
    上下文包含一个注册表，允许我们从其名称中获取合约的地址。
    
    ```go
    ssAddr, err := ctx.Resolve("SimpleStore")
    ```
    
    输入值被直接传递到 EVM 并且需要被如 [Solidity ABI 文档](https://solidity.readthedocs.io/en/develop/abi-spec.html)所述的编码。
    
    ### ABI编码参数
    
    所以我们的输入值需要如下编码
    
    ```text
    60fe47b100000000000000000000000000000000000000000000000000000000000003db
    ```
    
    不要担心，go-ethereum 可以帮助我们。
    
    当你编码 Solidity 的时候，你不仅获得了运行在 EVM 上的字节码，你还得到了一个 ABI 。ABI 是一个描述合约接口的 json 事物。这里是给我们 SimpleStore 的 ABI 。
    
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
    
    我们可以使用"github.com/ethereum/go-ethereum/accounts/abi" 和这个 ABI 字符串来编码我们的输入值。 这个关键函数是[abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON)
    
    ```go
        abiSimpleStore, err := abi.JSON(strings.NewReader(SimpleStoreABI))
        input, err := abiSimpleStore.Pack("set", big.NewInt(value.Value))
    ```
    
    在这里，我们在 `SimpleStoreABI` 变量中有 SimpleContract ABI 。我们可以从文件中读取，或者将其硬代码入源中。
    
    Pack 方法采用函数签名和参数列表, 并返回编码的输入。
    
    ### 整理一下
    
    现在我们知道如何得到输入和合约地址，我们可以给出一个 SetValue 方法的例子。为了清晰起见, 错误检查已删。
    
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
    
    这个函数可以用 Go-loom 的 Go 语言调用。
    
    ```go
        rpcClient := client.NewDAppChainRPCClient(chainId, writeUri, readUri)
        contract := client.NewContract(rpcClient, contractAddr, "EvmExample")
        payload := &types.WrapValue{
            Value: int64(value),
        }
        _, err = contract.Call("SetValue", payload, signer, nil)
    
    ```
    
    GetValue 函数以类似的方式工作。 我们现在必须从 Solidity 合约中打开输出，并在 WrapValue 消息中返回。 `StaticCallEvm` 用作 `get` 是一个view或者常量函数。
    
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
    
    ## Evm 合约
    
    go-loom 和 loom-js 用一个 RPC 客户端为与一个运行中的 DApp 链的交互提供帮助。
    
    ### go-loom
    
    这个工作的方式和[go-loom Contract](https://loomx.io/developers/docs/en/go-loom-clients.html#connecting-to-a-dappchain) 中所述的类似。
    
    #### 连接到 DApp链上的Solidity合约
    
    因此，要连接到一个现有的运行在 DApp 链 EVM 上的 Solidity 智能合约，我们可以使用
    
    ```go
    package main
    
    import (
      "github.com/loomnetwork/go-loom/auth"
      "github.com/loomnetwork/go-loom/client"
      "github.com/loomnetwork/go-loom/vm"
    )
    
    // getContract 创建一个新的“合约”实例，它可用于与部署在 DApp 链上 EVM 的智能合约交互。
    func getEvmContract(contractName string) (*client.EvmContract, error) {
      rpcClient := client.NewDAppChainRPCClient(
        "default",
        "ws://127.0.0.1:46658/websocket",
        "ws://127.0.0.1:46658/queryws",
      )
      contractAddr, err := rpcClient.Resolve(contractName)
      if err != nil {
        return nil, err
      }
      return client.NewEvmContract(rpcClient, contractAddr), nil
    }
    ```
    
    #### 将Solidity合约部署到一个DApp链上
    
    我们还可以将新的智能合约部署到运行的 DApp 链 EVM 上。为此，我们需要合约字节码。
    
    可以使用 Solidty 编译器 `solc --bin -o . mySolidityProgram.sol` 将 Solidity 合约转换为字节代码。
    
    `hex.DecodeString` 可用于将十六进制字符串转换为 [] 字节数组。 然后, 我们可以使用 client.DeployContract 来部署我们的合约。 然后返回一个 EVMContract 的代号。 第二个返回的参数是一个[transaction hash](https://loomx.io/developers/docs/en/evm.html#transaction-receipt)，它可以被用来取回使用 TxHash Query 的事务回执。
    
    ```go
    import (
      "encoding/hex"
      "github.com/loomnetwork/go-loom/auth"
      "github.com/loomnetwork/go-loom/client"
      "github.com/loomnetwork/go-loom/vm"
    )
    
    func deployEvmContract(name string, byteHex string, signer auth.Signer) 
    (handle *EvmContract, txReciept []byte, err error) {
        // 删除十六进制字符串开头的0x
        byteCode, err := hex.DecodeString(string(byteHex[2:]))
        if err != nil {
            return err
        }
        rpcClient := client.NewDAppChainRPCClient(common.ChainID, common.WriteURI, common.ReadURI)
        return client.DeployContract(rpcClient, signer, byteCode, name)
    }
    ```
    
    #### 取回Solidity合约的代码
    
    你可以使用 DAppChains QueryInterface 的方法 GetCode 来取回一个已部署Solidity合约的运行时字节码。
    
    ```go
    // GetCode 返回在 DAppChain 的 EVM 上运行的协定的运行时字节代码。
    // 为非 EVM 合约提供error。
    // 合约 - 字符串形式的合约地址。 (使用 loom.Address.String() 来转换)
    // 返回 []byte - 合约运行时的字节码。
    func (c *DAppChainRPCClient) GetCode(contract string) ([]byte, error) 
    ```
    
    运行时代码是初始合约的二进制文件, 其中移除启动和构建的合约代码，因为它不再需要了。
    
    #### 在DApp链上编写Solidity合约
    
    编写和读取部署在 DApp 链 EVM 上的智能合约类似于[编写](https://loomx.io/developers/docs/en/go-loom-clients.html#writing-data-to-a-dappchain)和[读取](https://loomx.io/developers/docs/en/go-loom-clients.html#reading-data-from-a-dappchain)非 EVM 插件。 主要区别在于函数签名和输入参数需要用 [ABI 编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)转换为字节码。 你可以用 go-ethereum [abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON) 函数使用你的合约ABI（可以从`solc --abi -o.MySolidiityProgram.sol ` 获取）来对输入进行编码。 MySolidiityProgram.sol</code>
    
    Evm 合约的调用方法是用于改变 DApp 链状态的方法。
    
    ```go
     input (
       "github.com/loomnetwork/go-loom/auth"
       "github.com/loomnetwork/go-loom/client"
       "github.com/loomnetwork/go-loom/vm
       "github.com/ethereum/go-ethereum/accounts/abi"   
     )
    
     func store(contract *client.EvmContract, key, abi string, value int) ([]byte, error) {
        abiSS, err := abi.JSON(strings.NewReader(SimpleStoreABI))
        if err != nil {
            return []byte{}, err
        }
        input, err := abiSS.Pack("set", big.NewInt(value.Value))
        if err != nil {
            return []byte[], err
        ]
        return contract.Call(input, key) 
     }
    ```
    
    Call 方法返回[事务哈希值](https://loomx.io/developers/docs/en/evm.html#transaction-hash)。你可以在` GetEvmTxReceipt </ code>方法中使用此哈希来检索有关合约的更多信息。
 这会返回一个 <a href="https://loomx.io/developers/docs/en/evm.html#transaction-receipt">transcation recieipt, vm.EvmTxReceipt</a> 对象。</p>

<pre><code class="go"> input (
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

`</pre> 
    
    #### 读取DApp链上的Solidity合约
    
    想从 EVM 智能合约得到信息，你需要使用 Evm 合约的 staticCall 来调用视图方法。 这会返回 ABI 编码[]字节形式的结果。 对于其他 EVM 方法，函数签名和输入变量是 [ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html)的。 StaticCall 的调用方字段是可选的，并且用空的 loom.Address 即可。
    
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
    
    在 JavaScript 和 TypeScript 中，你可以使用与非 EVM 插件类似的方式调用部署在 DApp 链的 EVM 上的方法合约，已在 loom-js 快速入门中进行了概述
    
    #### 连接到 DApp 链上的 Solidity 合约
    
    We use the EvmContract class instead of the Contract class. So the loom-js quick-start getEvmContract could looks like:
    
    ```js
    const {
      NonceTxMiddleware, SignedTxMiddleware, Client,
      EvmContract, Address, LocalAddress, CryptoUtils
    } = require('loom-js')
    
    const { MapEntry } = require('./helloworld_pb')
    
    /**
     * 创建一个新的`Evm 合约`实例，可用于与在 DApp 链的 EVM 上运行的智能合约进行交互。
     * @param privateKey 将用于签署发送到合约的事务的私钥。
     * @param publicKey 与私钥相对应的公钥。
     * @returns `EvmContract` 示例.
     */
    async function getContract(privateKey, publicKey) {
      const client = new Client(
        'default',
        'ws://127.0.0.1:46658/websocket',
        'ws://127.0.0.1:46658/queryws'
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
    
    #### 在 DApp 链上编写 Solidity 合约
    
    调用 EVM 智能合约的方法使状态发生突变，其工作原理与[将数据写入DAppChain](https://loomx.io/developers/docs/en/loom-js-quickstart.html#writing-data-to-a-dappchain)相同。Evm 合约的主要区别在于，输入采用 [ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html) 数组的格式。
    
    ```go
        let txHash = await evmContract.callAsync(abiEncodedInput)
    ```
    
    返回值是一个[事务哈希](https://loomx.io/developers/docs/en/evm.html#transaction-hash)。你可以通过 `GetEvmTxReceipt` 方法用事务哈希取回更多有关合约的信息。 这会返回一个 [transaction receipt, EvmTxReceipt](https://loomx.io/developers/docs/en/evm.html#transaction-receipt) 对象。
    
    ```text
        let receipt = await client.getTxReceiptAsync(rtv)
    ```
    
    #### 读取 DApp 链上的 Solidity 合约
    
    想从 EVM 智能合约得到信息，你需要使用 Evm 智能合约的 staticCall 来调用 视图方法。 这会返回 ABI 编码[]字节形式的结果。 对于其他 EVM 方法，函数签名和输入变量是 [ABI编码](https://solidity.readthedocs.io/en/develop/abi-spec.html) 的。
    
    ```go
        let txResult = await evmContract.staticCallAsync(abiEncodedInput)
    ```
    
    ## 事务哈希
    
    使用可以修改状态的 `Call` 事务写入 DApp 链返回事务哈希。 这是事务详细信息的唯一哈希。 没有两个合约能返回相同的哈希。 它可用于取回事务的详细信息。
    
    ### 事务回执
    
    每个 EVM 调用事务的详细信息存储在 loom 链上, 可以使用事务哈希访问。
    
    Loom 链的 `QueryService` 有返回 protobuf 形式回执的 `TxReceipt(txHash []byte) ([]byte, error)` 方法。 go-loom 和 loom-js 为此查询提供 API 。
    
    go-loom:`func (c *DAppChainRPCClient) GetEvmTxReceipt(txHash []byte) (vm
.EvmTxReceipt, error)`
    
    loom-js: `async getTxReceiptAsync(txHash: Uint8Array): Promise<EvmTxReceipt | null>`
    
    以下是事务回执对象的详细信息。 
    
    | Field             | 内容                                             |
    | ----------------- |:---------------------------------------------- |
    | TransactionIndex  | 此区块的事务编号                                       |
    | BlockHash         | 上一区块的哈希                                        |
    | BlockNumber       | 区块高度                                           |
    | CumulativeGasUsed | 目前尚未使用                                         |
    | GasUsed           | 目前尚未使用                                         |
    | ContractAddress   | 被调用合约的地址                                       |
    | Logs              | Events, encoded as an array of Event protobufs |
    | LogsBloom         | 尚未使用                                           |
    | Status            | 1 = 成功 或 0 = 失败                                |