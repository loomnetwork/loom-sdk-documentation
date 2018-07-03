---
id: goloompermissions
title: 和权限助手一起使用go-loom
sidebar_label: 权限助手
---
## 使用go-loom合同中的权限

用go-loom编写的合同可以使用辅助函数来设置和检查任意标记的权限。

这有点类似于OpenZeppelin</a>.  的 Solidity the Ownable概念。</p> 

每个权限都有三属性: 1. 地址 2. 代币 3. 角色

代币可以是任何字符或字节序列，表示要拥有的对象。 例如, 人的用户名可以是一个代币, 用户拥有所有权。 其他类似于代币的东西也可以拥有所有权。

A permission `role` is granted to an `address` on a `token`. For example, when creating an account, the `owner` permission can be given to the sender address on the `username` token.

For example

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

will grant a `owner` permission on a `userName` (token) to the sender address of the transaction. The roles is an array to grant multiple permissions in a single call.

To check for a permission for the sender of a transaction,

        if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
            return errors.New("User unverified")
        }
    

The HasPermission returns a bool (to indicate a match) and a subset of the roles that were matched for the combination of `address` and `role`

There are 2 other low level functions to work with permissions on arbitrary addresses

        HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
        GrantPermissionTo(addr loom.Address, token []byte, role string)