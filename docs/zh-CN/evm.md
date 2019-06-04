---
id: EVM
title: Ethereum Virtual Machine
sidebar_label: EVM
---

## Overview

Loom DAppChains contain an Ethereum virtual machine (EVM) and allow you to deploy and run smart contracts that compile to EVM bytecode.

### Ethereum virtual machine

An EVM consists of a database and the interpreter for EVM bytecode.

The interpreter runs EVM bytecode and is specially designed for creating secure deterministic programs suitable for blockchains. The most popular language for coding EVM smart contracts is Solidity. However, any language that compiles to EVM bytecode can be run by the EVM interpreter.

The database is keyed by addresses for each of the programs that have been deployed on the EVM. The value contains the program's bytecode and any associated data.

### DAppChains and EVM

There are currently several ways to interact with the DAppChain's EVM:

1. A smart contact can be deployed on the initial startup of the blockchain.
2. The `loom` command line tool allows deploying a smart contract or calling a method on an already deployed contract.
3. Another smart contract, either an EVM contract or a plugin contract, can call methods on an already deployed EVM contract.
4. In Go, you can use `go-loom`'s `EvmContract` object.
5. In TypeScript or JavaScript, you use the `loom-js`'s `EvmContract` object.
    
    An EVM smart contract is deployed to a DAppChain in the form of compiled bytecode. Which makes the chain unaware of the parent language. Parameters to Solidity smart contract method calls are encoded with the Application Binary Interface (ABI) [documented on the Solidity website](https://solidity.readthedocs.io/en/develop/abi-spec.html). The ABI can get quite complex, however, Ethereum implementations should, as we see later, give function to support parameter generation.

## Deploy on Boot up.

Contracts can be deployed on a DAppChain on boot up, by putting the compiled code in the contracts directory and linking the `genesis.json` file.

Here is an example genesis file:

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

There are two contracts in the top array. The first is an EVM contract, and the second one is a plugin.

* `vm:` The virtual machine used to run the contract. Currently, there are two options. 
    1. `plugin` User-created contracts.
    2. `EVM` contract runs on DAppChains EVM.
* `format` The nature of the smart contract's input file in the contracts directory. 
    1. `plugin` User plugin, can be produced by `go-loom`.
    2. `truffle` Solidity program, compiled using truffles compiler.
    3. `solidity` Solidity program, compiled using solc.
    4. `hex` Raw Hex, for instance, solidity program compiled using `solc -o` option .
* `name` This name can be used to retrieve the address of the contract assigned by Loom or the EVM.
* `location` Versioned name of the file binary file located in the contracts directory. For Truffle and Solidity, it might be necessary to give the full path.

So in this example, the Loom DAppChain will take the bytecode from the Truffle compilation of our `SimpleStore` Solidity contract. It will then deploy it on the chain's EVM. Confirmation and the contract's address will be available in Loom's logging information.

## Deploy and run from the command line

The `loom` command line tool has three commands for interacting with the chain's EVM:

* `deploy` This will deploy a smart contract in EVM bytecode onto the chain's EVM.
* `call` This will call a method that can mutate the state on an already deployed EVM smart contract.
* `static-call` This will call a read-only method on an already deployed EVM smart contract.

### Deploy

Use `./loom deploy` to deploy a contract that can be compiled to EVM bytecode onto a DAppChains EVM:

```text
Deploy a contract

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
```

The -a and -k flags are used to identify the user with public and private key address files.

-b gives the file where the raw EVM bytecode for the contract is held. This could be generated using a solidity compiler such as `solc --bin -o.
 MySolProgram.sol`

-n allows you to enter a name for your contract. This will act as a more user-friendly handle than the contract's address.

**Example**

```bash
 ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
  http://localhost:46658/rpc -r http://localhost:46658/query
```

If everything works, you should see something like:

```text
New contract deployed with address:  default:0x71A53d11A3b77e369463804FEE9B17ba7E24d98B
Runtime bytecode:  [96 96 96 64 82 ... 84 226 214 187 0 41]
Transcation receipt:  [10 178 198 52 108 ... 141 155 79 250 97 129 104 243]
```

The output contract address can be used to call a method on the contract in the call command. The unique [transaction hash](https://loomx.io/developers/en/evm.html#transaction-receipt) can be used to retrieve a receipt of the deployment transaction.

### call

```text
Call a method on a contract that can mutate the state

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

The -a and -k flags are used to identify the user with public and private key address files.

-c requires the contract address. This could be one output from a previous call to `\loom deploy` or retrieved from the startup log.

-n is a name or label entered for the contract when it was deployed. Can be used as an alternative to the address

-i is the input string. For a solidity contract, this will be ABI encoded as described in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

**Example**

```text
call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputSet.bin \
  -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1  \
  -w http://localhost:46658/rpc -r http://localhost:46658/query

```

On completion, this will return the [transaction hash](https://loomx.io/developers/en/evm.html#transaction-receipt). This should be unique for each transaction call and it can be used to return a receipt of the transaction.

### static-call

Call a read-only method on a contract. Returns the method return value.

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

The -a and -k flags are used to identify the user with public and private key address files.

-c requires the contract address. This could be one output from a previous call to `\loom deploy` or retrieved from the startup log.

-n is a name or label entered for the contract when it was deployed. Can be used as an alternative to the address.

-i is the input string. For a solidity contract, this will be ABI encoded as described in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

The address fields -a and -k are optional.

**Example**

```bash
static-call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \
  -c 0xbD770416A3345f91E4b34576Cb804a576Fa48eB1  \
  -w http://localhost:46658/rpc -r http://localhost:46658/query

```

## From a user plugin

Smart contracts deployed on a DAppChain's EVM can be called from user created plugins. The `evmexample` in `go-loom` shows how to achieve this.

Before continuing let's consider the various modules involved.

* User application. This is the end user application that initiates transactions on the DAppChain.

* DAppChain. Receives transactions from the user application and forwards to the appropriate contract to run. Also commits results to the blockchain.

* Smart contracts. These are written by the user and deployed on the DAppChain. There are two main types.
    
    1. Plugins. These can be written in any language supported by gRPC; go-loom allows easy use of contracts written in Go, and loom-js for JavaScript. The plugin is compiled into an executable that the DAppChain calls using gRPC.
    2. EVM smart contracts. Solidity programs or any other code that compiles into EVM bytecode can be run by the DAppChain using its EVM.

Plugins can run other contracts including ones deployed on the EVM by calling back to the DAppChain using gRPC. The reverse, however, is not true. EVM deployed contracts can only interact within the EVM, this is to ensure that the EVM's results are deterministic.

### User code

The user provides two items of code:

* the smart contracts and
* the end application that makes use of the DAppChain.

In the following, we will assume that Go is being used for the end application and the smart contracts are written either in Go for plugins or Solidity for EVM. Refer to [loom-js-quickstart](loom-js-quickstart.html) for a JavaScript solution.

### Minimal plugin

First, let's look at the definition of a contract in `go-loom`:

```go
type Contract interface {
    Meta() (plugin.Meta, error)
}
```

and `plugin.Meta` is defined from a protobuf definition:

```go
type ContractMeta struct {
    Name    string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
    Version string `protobuf:"bytes,2,opt,name=version,proto3" json:"version,omitempty"`
}
```

So all a contract needs is to implement the `Meta` function. However, to be usable as a plugin in a DAppChain there are a few other bits. Here is a minimal example:

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

Here are some points of interest:

1. First, the contract has to be `package main`.
2. Define our contract called `HelloWorld` as a struct.
3. Implement the `Meta()` function, returning the contracts name and version number.
4. The variable `Contract` needs to be defined. The function `contract
.MakePluginContract` converts our simple outline into an object that a DAppChain can communicate with.
5. The main routine can then set the contract up as a working server.

Of course, our contract has no functionality so it can't do anything. The next step is to add some functionality. The `MakePluginContract` function can then use reflection to learn any new methods we give to our contract.

### Adding functions

```go
func (c *HelloWorld) Hello(ctx contract.StaticContext, req *types.HelloRequest) (*types.HelloResponse, error) {
    return &types.HelloResponse{
        Out: "Hello World!",
    }, nil
}
```

So we've just added a simple function that just returns a fixed message. A couple of key points:

* Either a `contract.StaticContext` or `contract.Context` should be the first parameter. It provides various methods that allow you to access the resources on the DAppChain. For example, view or modify the state database, or call other plugins.
* The user input in the second parameter and the first return value take the form of [protobuf messages](https://developers.google.com/protocol-buffers/)- `HelloRequest` and `HelloResponse` in this example. These protobuf message structs need to be auto-generated from a language-neutral `.proto` file. See below.
* The input and output protobuf message parameters need to be coordinated with the calling application. As the protobuf message data structures are generated from language-independent `.proto` files, it does not matter if the calling application and the smart contract are written in different languages.

Below is an example of a suitable types `.proto` file for our `Hello` function:

```proto
syntax = "proto3";

message HelloRequest {
    string in = 1;
}

message HelloResponse {
    string out = 1;
}

```

A `types.pb.go` file that we can use can be built using the `protoc-gen-gogo` plugin for proto, with a command like:

```bash
 protoc --gogo_out=. --plugin=protoc-gen-gogo  types.proto
```

### Call smart contract

The following code fragment shows how to call the `Hello` function of our Hello World example in Go using functions from `go-loom`:

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, "http://localhost:1234", "http://localhost:2345")
    contract := client.NewContract(rpcClient, contractAddr, "HelloWorld")
    request := &types.HelloRequest{}
    response := &types.HelloResponse{}
    _, err = contract.StaticCall("Hello", request, signer, response)
    fmt.Println(response.Out)
```

Here's what our code does:

1. Create a client that can talk to our DAppChain using its URL.
2. Get a handle to our smart contract, from its name and address.
3. The wire type `HelloRequest` and `HelloResponse` have to match the input and output parameters of the contract's method we are calling.
4. Call the `Hello` method. We use `StaticCall` as the `Hello` method has a static context.

## Calling Solidity contract

Now that we have had a quick review of implementing plugins, we can look at accessing smart contracts deployed on the DAppChain's EVM from a plugin.

First, let's assume we have deployed this simple Solidity contract on the DAppChain's EVM:

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

We will look at a simple plugin that wraps this solidity contract. So our plugin will have two functions- `SetValue` and `GetValue`. These functions will just pass data between the `SimpleStore` contract and the transaction initiator. As it wraps this `SimpleStore` we will call it `EvmExample`.

Here is the outline as for the `EvmExample` contract, with stubs added for the `SetValue` and `GetValue` methods:

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

The `.proto` file for generating the message declarations looks like:

```proto
syntax = "proto3";

message Dummy {
}

message WrapValue {
    int64 value = 1;
}
```

Let's look at the `SetValue` function first. The function to call to run a smart contract on the EVM is:

```go
 contractpb.CallEVM(ctx Context, addr loom.Address, input []byte, output *[]byte) error
```

The context is just passed through, for setting the output can just be a dummy object. We need to pass the address of the solidity contract, and the correct input.

The `Context` contains a `Registry` that allows us to get the address of a a contract from its name:

```go
ssAddr, err := ctx.Resolve("SimpleStore")
```

The input is passed straight through to the EVM and needs to be encoded as laid out in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

### ABI encoding of parameters

So for our input we need to encode it to something like:

```text
60fe47b100000000000000000000000000000000000000000000000000000000000003db
```

Don't panic, `go-ethereum` can help us out.

When you compile Solidity you not only get the bytecode that runs on the EVM, but you get an ABI. The ABI is a JSON object that describes the contract's interface. Here is the ABI for our `SimpleStore`:

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

Here we have the `SimpleContract` ABI in the `SimpleStoreABI` variable. We could either read it in from a file or hard code into the source.

The `Pack` method takes the function signature and a list of the arguments and returns the encoded input.

### Putting it together

Now we know how to get the input and contact address. At this point, we can give an example of our `SetValue` method. Note that error checking removed for clarity.

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

This function could be called in Go using `go-loom` with:

```go
    rpcClient := client.NewDAppChainRPCClient(chainId, writeUri, readUri)
    contract := client.NewContract(rpcClient, contractAddr, "EvmExample")
    payload := &types.WrapValue{
        Value: int64(value),
    }
    _, err = contract.Call("SetValue", payload, signer, nil)

```

The `GetValue` function works in a similar fashion. We now have to unwrap the output from the solidity contract and return it in a `WrapValue` message. `StaticCallEvm` is used as `get`. It is a view or a constant function.

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

`go-loom` and `loom-js` provide help for communicating with a running DAppChain using an RPC client.

### go-loom

This works in much the same way as described for [go-loom Contract](https://loomx.io/developers/en/go-loom-clients.html#connecting-to-a-dappchain)

#### Connecting to a Solidity contract on a DAppChain

To connect to an existing solidity smart contact running on a DAppChain EVM we can use:

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

#### Deploying a Solidity contract to a DAppChain

We can also deploy a new smart contract to a running DAppChain EVM. For this we need the contract's bytecode.

A Solidity contract can be converted to byte code using the Solidity compiler using something like this:

```bash
solc --bin -o . mySolidityProgram.sol
```

`hex.DecodeString` can be used to convert a hex string to a `[]byte` array. We can then use the `client.DeployContract` methode to deploy our contract and return an `EVMContract` handle. The second return parameter is a [transaction hash](https://loomx.io/developers/en/evm.html#transaction-receipt) that can be used to retrieve a receipt of the transaction using the `TxHash` query.

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

You can retrieve the runtime bytecode for a deployed solidity contract using the DAppChains `QueryInterface` method `GetCode`:

```go
// GetCode returns the runtime byte-code of a contract running on a DAppChain's EVM.
// Gives an error for non-EVM contracts.
// contract - address of the contract in the form of a string. (Use loom.Address.String() to convert)
// return []byte - runtime bytecode of the contract.
func (c *DAppChainRPCClient) GetCode(contract string) ([]byte, error)
```

The runtime code is the initial contract's binary with the code for starting and constructing the contract removed as its no longer needed.

#### Writing to a Solidity contract on a DAppChain

Writing and reading to a smart contract deployed on a DAppChain's EVM works in a similar way to [writing](https://loomx.io/developers/en/go-loom-clients.html#writing-data-to-a-dappchain) and [reading](https://loomx.io/developers/en/go-loom-clients.html#reading-data-from-a-dappchain) to non-EVM plugins. The main difference is that the function signature and input parameters need to be converted to bytecode using [ABI encoding](https://solidity.readthedocs.io/en/develop/abi-spec.html). You can use the `go-ethereum` [abi.JSON](https://godoc.org/github.com/obscuren/go-ethereum/accounts/abi#JSON) function to encode the input using your contract's ABI which you can get from `solc --abi -o. MySolidiityProgram.sol`

`EvmContract`'s `Call` method is used for methods that mutate the DAppChain's state.

```go
 input (
   "github.com/loomnetwork/go-loom/auth"
   "github.com/loomnetwork/go-loom/client"
   "github.com/loomnetwork/go-loom/vm"
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

The `Call` method returns a [transaction hash](https://loomx.io/developers/en/evm.html#transaction-hash). You can use the transaction hash to retrieve more information about the contract using the `GetEvmTxReceipt` method. This returns a [transcation receipt, vm.EvmTxReceipt](https://loomx.io/developers/en/evm.html#transaction-receipt) object.

```go
 input (
   "github.com/loomnetwork/go-loom/auth"
   "github.com/loomnetwork/go-loom/client"
   "github.com/loomnetwork/go-loom/vm"
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

To get information from an EVM smart contract you need to call a view method using the `EvmContract`'s `staticCall`. This returns the result in an ABI encoded []byte. As for other EVM methods, the function signature and input arguments are [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html). The caller field in `StaticCall` is optional and using an empty `loom.Address` is fine.

```go
 input (
   "github.com/loomnetwork/go-loom/auth"
   "github.com/loomnetwork/go-loom/client"
   "github.com/loomnetwork/go-loom/vm"
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

In JavaScript and TypeScript, you can `Call` methods contracts deployed on the EVM of a DAppChain in a similar way as for non-EVM plugins. This is outlined in the [loom-js quickstart](https://loomx.io/developers/en/loom-js-quickstart.html#connecting-to-a-dappchain)

#### Connecting to a Solidity contract on a DAppChain

We use the `EvmContract` class instead of the `Contract` class. So the `loom-js` quick-start `getEvmContract` could look like:

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

#### Writing to a Solidity contract on a DAppChain

Calling an EVM smart contract's method that mutates the state works the same as [writiing data to a DAppChain](https://loomx.io/developers/en/loom-js-quickstart.html#writing-data-to-a-dappchain). The main difference in the case of an `EvmContract` is that the input takes the format of an [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html) array.

```go
    let txHash = await evmContract.callAsync(abiEncodedInput)
```

The return value is a [transaction hash](https://loomx.io/developers/en/evm.html#transaction-hash). You can use the transaction hash to retrieve more information about the contract using the `GetEvmTxReceipt` method. This returns a [EvmTxReceipt](https://loomx.io/developers/en/evm.html#transaction-receipt) object:

```js
    let receipt = await client.getTxReceiptAsync(rtv)
```

#### Reading from a Solidity contract on a DAppCahin

To get information from an EVM smart contract you need to call a view method using the `EvmContract`'s `staticCall`. This returns the result in an ABI encoded `[]byte`. As for other EVM methods, the function signature and input arguments are [ABI encoded](https://solidity.readthedocs.io/en/develop/abi-spec.html).

```go
    let txResult = await evmContract.staticCallAsync(abiEncodedInput)
```

## Transaction hash

Writing to a DAppChain using a `Call` transactions that can modify the state returns a transaction hash. This is a unique hash of the transaction details. No two contracts should return the same hash. It can be used to retrieve details of the transaction.

### Transaction receipt

Details of each EVM call transaction are stored on the loomchain and can be accessed using the transaction hash.

The loom chain `QueryService` has the method `TxReceipt(txHash []byte)
([]byte, error)` which returns the receipt in a protobuf form. `go-loom` and `loom-js` provide an API for this query.

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