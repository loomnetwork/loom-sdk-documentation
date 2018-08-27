---
id: goloomstate
title: go-loom 컨트랙트에 스테이트를 저장 및 읽기
sidebar_label: 스테이트를 저장 및 읽기
---
## 컨트랙트 스테이트

Each contract has access to a sandboxed state for storage of data. The write actions on the state are rolled back in case the contract operation returns an error. If a transaction is successfully commited, it contains the hash of the state root so that any given state is commited to the blockchain.

## Writing to the state

Use the `Set` operation on the contract context to save to the state.

    Set(key []byte, pb proto.Message) error
    

go-loom mandates that the data being saved is a protobuf object.

## Reading from the state

Use the `Has` operation to check whether a particular key exists in the state

    Has(key []byte) bool
    

To read the value saved at a key use the `Get` operation

    Get(key []byte, pb proto.Message) error
    

Get will unmarshal the saved data into a protobuf struct

## Deleting a key

Data saved at a key can be delete with

    Delete(key []byte)