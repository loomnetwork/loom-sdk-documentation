---
id: goloompermissions
title: go-loomでの権限ヘルパーの使用
sidebar_label: 権限ヘルパーの使用
---
## go-loomのコントラクトでの権限の使用

go-loomを使って書かれたコントラクトは、任意のトークンに対する権限の設定とチェックをするためのヘルパー関数を使用することができる。

これはSolidityだと[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol) のOwnableのコンセプトに少し似ている。

各権限には3つの属性がある: 1. アドレス 2. トークン 3. ロール

トークンは、オブジェクトが所有されていることを表す何かしらの文字列、もしくはバイトシーケンスとすることが可能だ。 For example a persons username can be a token, that they have ownership over. Other things like tokens could also have ownership.

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