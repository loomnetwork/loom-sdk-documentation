---
id: goloomstate
title: go-loom 컨트랙트에 스테이트를 저장 및 읽기
sidebar_label: 스테이트를 저장 및 읽기
---
## 컨트랙트 스테이트

각 컨트랙트는 데이터 저장소를 위한 샌드박스된 스테이트에 대한 접근권한을 가집니다. 컨트랙트가 에러를 반환하는 경우에는 스테이트 쓰기 동작은 롤백됩니다. 트랜잭션이 정상적으로 수행되면, 스테이트 루트의 해쉬값을 가지게 되고 어떤 특정 스테이트가 블록체인에 기록됩니다.

## 스테이트에 쓰기

스테이트에 저장하기 위해서는 컨트랙트 컨텍스트의 `Set` 오퍼레이션을 사용하세요.

    Set(key []byte, pb proto.Message) error
    

go-loom은 저장되는 데이터가 protobuf 객체일 것을 요구합니다.

## 스테이트로부터 읽어오기

Use the `Has` operation to check whether a particular key exists in the state

    Has(key []byte) bool
    

To read the value saved at a key use the `Get` operation

    Get(key []byte, pb proto.Message) error
    

Get will unmarshal the saved data into a protobuf struct

## Deleting a key

Data saved at a key can be delete with

    Delete(key []byte)