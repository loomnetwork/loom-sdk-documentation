---
id: goloomstate
title: go-loom 合约中保存和读取状态
sidebar_label: 保存和读取状态
---
## 合约状态

每个合约都可以访问沙盒状态以存储数据。 如果合约操作返回错误，则回滚对状态的写入操作。 如果事务成功提交，它将包含状态根的哈希值，以便将任何给定状态提交给区块链。

## 写入到状态中

使用合约上下文中的 `Set` 操作保存到状态。

    Set(key []byte, pb proto.Message) error
    

go-loom 命令保存的数据是 protobuf 对象。

## 从状态中读取

使用 `Has` 操作检查状态中是否存在特定密钥

    Has(key []byte) bool
    

要读取保存在键上的值, 请使用 `Get` 操作

    Get(key []byte, pb proto.Message) error
    

Get 会将保存的数据解编为 protobuf 结构

## 删除键

保存在键上的数据可以被删除

    Delete(key []byte)