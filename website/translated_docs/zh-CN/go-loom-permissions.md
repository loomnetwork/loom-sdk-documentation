---
id: goloompermissions
title: 和权限助手一起使用go-loom
sidebar_label: 权限助手
---
## 使用go-loom合约中的权限

用go-loom编写的合约可以使用辅助函数来设置和检查任意标记的权限。

这有点类似于在Solidity里[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)的 Ownable概念。

每个权限都有三属性: 1. 地址 2. 代币 3. 角色

代币可以是任何字符或字节序列，表示要拥有的对象。 例如, 一个人用户名可以是代币, 那个人拥有所有权。 其他类似于代币的东西也可以拥有所有权。

权限 `role` 被授予给 `token`上的`address`。 例如, 创建帐户时, 可以将 `owner` 权限授予`username` 代币上的发件人地址。

例如

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

这会将`userName` （代币）的权限授予`owner` 到事务的发送者地址。这个角色是一个通过一次调用授予多个权限的数组。

要检查事务发送者的权限，

        if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
            return errors.New("User unverified")
        }
    

HasPermission 返回一个布尔值（来表明匹配关系）和一个` address `和` role ` 组合匹配的角色子集。

还有另外两个低级函数以任意地址的权限运行。

        HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
        GrantPermissionTo(addr loom.Address, token []byte, role string)