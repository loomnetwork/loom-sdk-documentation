---
id: goloompermissions
title: Working with permissions helpers in go-loom
sidebar_label: Permission Helpers
---
## Go-loom으로 컨트랙트 내에서 퍼미션 사용하기

Contracts written with go-loom can use helper functions for setting and checking permissions on arbitrary tokens.

This is somewhat similiar to in Solidity the Ownable concept from [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol).

Every permission has three attributes: 1. address 2. token 3. role

A token can be any string or byte sequence, which represents an object to be owned. For example a persons username can be a token, that they have ownership over. Other things like tokens could also have ownership.

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