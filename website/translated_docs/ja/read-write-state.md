---
id: goloomstate
title: go-loomコントラクトでの状態の保存と読み取り
sidebar_label: 状態の保存と読み取り
---
## コントラクトの状態

各コントラクトは、データ格納のためにサンドボックス化された状態へアクセスすることができる。 コントラクト実行がエラーになると、状態を書き込むアクションは巻き戻される。 トランザクションが正常にコミットされるとそこにステートルートのハッシュ値が含まれるので、任意の状態がブロックチェーンへコミットされる。

## 状態の書き込み

コントラクトのコンテキストで状態を保存するには、`Set`オペレーションを使用する。

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