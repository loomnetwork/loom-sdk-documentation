---
id: goloompermissions
title: go-loomでの権限ヘルパーの使用
sidebar_label: 権限ヘルパーの使用
---
## go-loomのコントラクトでの権限の使用

go-loomを使って書かれたコントラクトは設定にヘルパー機能を使用でき、また任意のトークンに対する権限をチェックすることができる。 各権限は3つの属性を持つ: 1. アドレス 2. トークン 3. ロール

The token can by any domain specific byte-array. 権限 `role`は`token`の`address`に与えられる。 例えばアカウントを作成する際、`username` トークンの送信者のアドレスに`owner`の権限を与えることができる。

例えば

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

この例では、`userName`への`owner`の権限をトランザクション送信者アドレスに与えている。 ロールとは、複数の権限を1つのコールで与えるための配列である。

トランザクションの送信者のアクセス権限をチェックするには、

        if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
            return errors.New("User unverified")
        }
    

The HasPermission returns a bool (to indicate a match) and a subset of the roles that were matched for the combination of `address` and `role`

There are 2 other low level functions to work with permissions on arbitrary addresses

        HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
        GrantPermissionTo(addr loom.Address, token []byte, role string)