---
id: goloompermissions
title: 和权限助手一起使用go-loom
sidebar_label: 权限助手
---
## 使用go-loom合同中的权限

用go-loom编写的合同可以使用辅助函数来设置和检查任意标记的权限。

这有点类似于OpenZeppelin</a>.  的 Solidity the Ownable概念。</p> 

每个权限都有三属性: 1. 地址 2. 代币 3. 角色

代币可以是任何字符或字节序列，表示要拥有的对象。 例如, 用户名可以是一个代币, 用户拥有所有权。 其他类似于代币的东西也可以拥有所有权。

A permission `role` is granted to an `address` on a `token`. 例如, 创建帐户时, 可以将 `owner` 权限授予 `username` 标记上的发件人地址。.

例如

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

这会将` userName </ code>（代币）的<code>所有者</ code>权限授予事务的发件人地址。此角色是一个用于通过一次调用授予多个权限的阵列。</p>

<p>要检查事务发件人的访问权限，</p>

<pre><code>    if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
        return errors.New("User unverified")
    }
`</pre> 

在HasPermission中，返回与bool值（指示匹配）以及` address </ code>和<code> role </ code>的组合匹配的角色子集。</p>

<p>还有另外两个低级函数以任意地址的权限运行。</p>

<pre><code>    HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
    GrantPermissionTo(addr loom.Address, token []byte, role string)
`</pre>