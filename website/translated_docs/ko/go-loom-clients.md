---
id: go-loom-clients
title: Building DAppChain clients in Golang
sidebar_label: Building DAppChain Clients
---
## 개요

`go-loom` 라이브러리는 Loom DAppChain과 상호작용할 수 있는 Go 앱과 서비스를 만드는데 필요한 모든것들을 제공하며, 이런 DAppChain 위에서 동작하는 스마트 컨트랙트를 만들 수도 있습니다.

`go-loom`을 설치하는 것을 시작해보기:

```shell
go get github.com/loomnetwork/go-loom
```

이번 챕터에서 여러분은 Loom DAppChain과 상호작용하는 Go 코드를 작성하는데 사용되는 `go-loom` API를 소개할 것입니다, Go로 작성하는 스마트 컨트랙트는 다음 섹션에서 다룰 예정입니다.

`go-loom` 패키지에서 여러분은 수많은 예제를 보실 수 있습니다, `examples/cli` 에는 `examples/plugins/helloworld` 스마트 컨트랙트와 상호작용하는데 사용되는 CLI 앱이 포함되어 있습니다. 우리는 만드는 것을 시작으로 CLI app의 구동을 테스트 하고나서, 그것을 만드는데 사용된 `go-loom` API에 대해서 소개할 것입니다.

```shell
# 이것은 ./example-cli 실행파일을 생성합니다
make example-cli
```

## CLI app 예제

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) 스마트 컨트랙트는 키에 연관된 깂을 저장하는데 호출되는 public `SetMsg` 메소드를 제공합니다.

```shell
./example-cli call set_msg -k 123 -v 456 --contract [contract_name] -p [priv_key]
```

스마트 컨트랙트는 키에 연관된 값을 조회할 때 호출되는 public read-only `GetMsg` 메소드를 제공합니다.

```shell
./example-cli call get_msg -k 123 -p [priv_key]
```

다음과 같은 응답을 볼 수 있습니다:

```js
{
  Key: '123',
  Value: '456'
}
```

CLI app 예제의 기능을 시험해보는것으로 마무리 짓습니다, 자 구현하는데 사용된 `go-loom` API 부분을 살펴볼 시간입니다.

## DAppChain에 연결하기

`client.Contract` 타입은 Loom DAppChain 에서 구동되는 스마트 컨트랙트와 상호작용하는 편리한 방법을 제공합니다. Loom SDK의 [helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) 스마트 컨트랙트 예제와 상호작용하는 `client.Contract` 인스턴스를 만드는 함수를 작성해봅시다...

```go
package main

import (
  "github.com/loomnetwork/go-loom/auth"
  "github.com/loomnetwork/go-loom/client"
  "github.com/loomnetwork/go-loom/examples/types"
  "golang.org/x/crypto/ed25519"
)

// getContract는 스마트 컨트랙트와 상호작용하는데 사용되는 새로운 `Contract` 인스턴스를 생성합니다.
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

## DAppChain에 데이터를 쓰기

스마트 컨트랙트의 상태를 변경시키기 위해서 여러분은 public 메소드중 하나를 호출해야 합니다. 그러기 위해서는 서명된 트랜젝션이 DAppChain 으로 보내져야 하고 검증되어야 합니다. 다행히도 `client.Contract` 타입은 여러분이 `Contract.Call()` 메소드를 사용할때 이런것들을 대부분 처리해 줍니다.

[helloworld](https://github.com/loomnetwork/go-loom/blob/master/examples/plugins/helloworld/helloworld.go) 스마트 컨트랙트는 키에 연관된 값을 저장하기 위해서 호출되는 public `SetMsg` 메소드를 제공한다. 이 메소드를 호출하는 함수를 작성해보자...

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

## DAppChain에서 데이터를 읽어오기

스마트 컨트랙트의 상태를 읽어오기 위해서 여러분은 public read-only 메소드중 하나를 호출해주어야 합니다, `Contract.StaticCall()` 메소드를 사용해서 이런 것을 할 수 있습니다.

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