---
id: go-loom-clients
title: 在Golang中构建DApp链用户
sidebar_label: 构建DApp链客户端
---
## 概括

go-loom 库包含构建与Loom DApp链交互的Go app和服务以及构建存在在这些DApp链上的智能合约所需的一切。

开始安装 go-loom :

```shell
获取github.com/loomnetwork/go-loom
```

在本节中，你将了解用于编写与Loom DApp链交互的Go代码的 go-loom API，在Go中编写智能合约将在后面的部分中介绍。

在 go-loom 程序包中，你将找到许多示例, examples / cli 包含一个CLI app，可用于与 examples / plugins / helloworld 智能合约进行交互。 我们将从构建和测试驱动CLI app开始，然后我们将向你介绍用于构建它的 go-loom API。

```shell
#这将生成./example-cli可执行文件
make example-cli
```

## CLI app示例

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) 智能合约具有一个公共 `SetMsg` 方法, 可以调用该方式来储存密钥与值的关联。

```shell
./example-cli call set_msg -k 123 -v 456 --contract [contract_name] -p [priv_key]
```

智能合约还具有一个公共只读 GetMsg 方法，可以调用该方法来查找密钥和值之间的关联。

```shell
./example-cli call get_msg -k 123 -p [priv_key]
```

你应该看到以下响应：

```js
{
  Key: '123',
  Value: '456'
}
```

这就结束了我们对示例CLI app功能的演示，现在是时候看一下用于实现它的` go-loom </ 0> API的各个部分。</p>

<h2>连接到DApp链</h2>

<p><code>Contract` 类提供了一种与Loom DApp链上运行的智能合约进行交互的便捷方式。 Let's write a function that creates a `client.Contract` instance to interact with the sample [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract from the Loom SDK...

```go
package main


import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/examples/types"
)
// getContract 创建一个新的“Contract”实例，可用于与智能合约交互。
func getContract(contractName string) (*client.Contract, error) {
  rpcClient := client.NewDAppChainRPCClient(
    "default",
    "http://localhost:46658/rpc",
    "http://localhost:46658/query",
  )
  contractAddr, err := rpcClient.Resolve(contractName)
  if err != nil {
    return nil, err
  }
  return client.NewContract(rpcClient, contractAddr.Local), nil
}
 

```

## Writing data to a DAppChain

To mutate the state of a smart contract you need to call one of its public methods, to do so a signed transaction must be sent to and validated by the DAppChain. Fortunately the `client.Contract` type takes care of most of this when you use the `Contract.Call()` method.

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value. Let's write a function that calls this method...

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

## Reading data from a DAppChain

To read the state of a smart contract you need to call one of its public read-only methods, you can do so by using the `Contract.StaticCall()` method.

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `GetMsg` method that can be called to look up an association between a key and a value. Let's write a function that calls this method...

```go
func load(contract *client.Contract, key string) (string, error) {
  params := types.MapEntry{
    Key: key, // The smart contract will look up the value stored under this key.
  }
  var result types.MapEntry
  if _, err := contract.StaticCall("GetMsg", &params, contract.Address, &result); err != nil {
    return "", err
  }
  return result.Value, nil
}
```

## Putting it all together

Now that we have all the pieces in place make sure that you have the DAppChain running and then run the following code, you should see `Value: hello!` printed to the console.

```go
func main() {
  _, privateKey, err := ed25519.GenerateKey(nil)
  if err != nil {
    panic(err)
  }
  signer := auth.NewEd25519Signer(privateKey)
  contract, err := getContract("helloworld")
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