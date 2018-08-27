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

스테이트에 특정 키가 존재하는지를 확인하려면 `Has` 오퍼레이션을 사용하세요

    Has(key []byte) bool
    

키에 저장된 값을 읽기위해서는 `Get` 오퍼레이션을 사용하세요

    Get(key []byte, pb proto.Message) error
    

Get 오퍼레이션은 저장된 데이터를 protobuf 구조체로 unmarshal 합니다.

## 키 삭제하기

키에 저장된 데이터는 아래와 같이 삭제할 수 있습니다

    Delete(key []byte)