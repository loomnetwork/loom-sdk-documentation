---
id: goloomstate
title: go-loom 合约中保存和读取状态
sidebar_label: 保存和读取状态
---
## 合约状态

每个合约都可以访问沙盒状态以存储数据。 如果合同操作返回错误，则回滚对状态的写入操作。 如果事务成功提交，它将包含状态根的哈希值，以便将任何给定状态提交给区块链。

## 写入状态

使用合同上下文中的 `Set` 操作保存到状态。

    Set(key []byte, pb proto.Message) error
    

go-loom 命令保存的数据是 protobuf 对象。

## Reading from the state

Use the `Has` operation to check whether a particular key exists in the state

    Has(key []byte) bool
    

To read the value saved at a key use the `Get` operation

    Get(key []byte, pb proto.Message) error
    

Get will unmarshal the saved data into a protobuf struct

## Deleting a key

Data saved at a key can be delete with

    Delete(key []byte)