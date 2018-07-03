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

在本节中，您将了解用于编写与Loom DApp链交互的Go代码的 go-loom API，在Go中编写智能合约将在后面的部分中介绍。

在 go-loom 程序包中，您将找到许多示例, examples / cli 包含一个CLI app，可用于与 examples / plugins / helloworld 智能合约进行交互。 我们将从构建和测试驱动CLI app开始，然后我们将向您介绍用于构建它的 go-loom API。

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

您将看到以下响应：

```js
{
  Key: '123',
  Value: '456'
}
```

这就结束了我们对示例CLI app功能的演示，现在是时候看一下用于实现它的` go-loom </ 0> API的各个部分。</p>

<h2>连接到DApp链</h2>

<p><code>Contract` 类提供了一种与Loom DApp链上运行的智能合约进行交互的便捷方式。 让我们编写一个创建client.Contract实例的方法来与Loom SDK中的示例 [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) 智能合同从Loom SDK 进行交互...

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

## 将数据写入 DApp链

要改变智能合约的状态，您需要调用其公共方法之一，为此必须将签名的事务发送到DApp链并由其进行验证。 幸运的是, 当您使用 `client.Contract`方法时， `Contract.Call()`将处理其中的大部分问题。

[helloworld ](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go)智能合约具有公共 `GetMsg`方法，可以调用该方法来查找密钥和值之间的关联。 让我们编写一个调用此方法的函数......

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

## 从DApp链读取数据

要读取智能合约的状态，您需要调用其公共只读方法之一，您可以使用 Contract.StaticCall() 方法。

helloworld 有一个公共 GetMsg 方法，可以用来查找密钥与值之间的关联。 让我们编写一个调用此方法的函数......</p> 

```go
func load(contract *client.Contract, key string) (string, error) {
  params := types.MapEntry{
    Key: key, // 智能合约将查找储存在此项下的值。
  }
  var result types.MapEntry
  if _, err := contract.StaticCall("GetMsg", &params, contract.Address, &result); err != nil {
    return "", err
  }
  return result.Value, nil
}
```

## 整理一下

现在, 我们已经有了所有的方法来确保您的 DApp链 运行, 然后运行下面的代码, 您将看到 `Value: hello!` 在控制台出现。

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