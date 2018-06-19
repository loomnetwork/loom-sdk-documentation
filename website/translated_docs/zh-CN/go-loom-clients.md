---
id: go-loom-clients
title: Building DAppChain clients in Golang
sidebar_label: Building DAppChain Clients
---
## Overview

The `go-loom` library contains everything you need to build Go apps & services that interact with Loom DAppChains, and to build the smart contracts that live on those DAppChains.

To get started install `go-loom`:

```shell
go get github.com/loomnetwork/go-loom
```

In this section you'll be introduced to the `go-loom` API that you will use to write Go code that interacts with a Loom DAppChain, writing smart contracts in Go will be covered in a later section.

In the `go-loom` package you will find a number of examples, `examples/cli` contains a CLI app that can be used to interact with the `examples/plugins/helloworld` smart contract. We'll start by building and test driving the CLI app, then we'll introduce you to the `go-loom` API that was used to build it.

```shell
# this should generate the ./example-cli executable
make example-cli
```

## Example CLI app

The [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract has a public `SetMsg` method that can be called to store an association between a key and a value.

```shell
./example-cli call set_msg -k 123 -v 456 --contract [contract_name] -p [priv_key]
```

The smart contract also has a public read-only `GetMsg` method that can be called to look up an association between a key and a value.

```shell
./example-cli call get_msg -k 123 -p [priv_key]
```

You should see the following response:

```js
{
  Key: '123',
  Value: '456'
}
```

And that concludes our demonstration of the functionality of the example CLI app, now it's time to take a look at the parts of the `go-loom` API that were used to implement it.

## Connecting to a DAppChain

The `client.Contract` type provides a convenient way to interact with a smart contract running on a Loom DAppChain. Let's write a function that creates a `client.Contract` instance to interact with the sample [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) smart contract from the Loom SDK...

```go
package main

import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/examples/types"
  "golang.org/x/crypto/ed25519"
)

// getContract creates a new `Contract` instance that can be used to interact with a smart contract.
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