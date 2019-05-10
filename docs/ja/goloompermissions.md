---
id: goloompermissions
title: go-loomでの権限ヘルパーの使用
sidebar_label: 権限ヘルパーの使用
---
## go-loomのコントラクトでの権限の使用

go-loomを使って書かれたコントラクトは、任意のトークンに対する権限の設定とチェックをするためのヘルパー関数を使用することができる。

これはSolidityだと[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol) のOwnableのコンセプトに少し似ている。

それぞれの権限が以下の3つの要素を持っている:

1. address
2. token
3. role

トークンは、オブジェクトが所有されていることを表す何かしらの文字列、もしくはバイトシーケンスとすることができる。 例えば、ある人物のユーザー名をトークンとして、その人がその所有権を持つことが可能だ。 トークンのようなその他のものにも、所有権を持たせることができる。

`token`に対する権限`role`は、`address`に付与される。 例えばアカウント作成時、`username`トークンに対する`owner`権限を送信者アドレスに与えることができる。

例えば

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

これは`userName` (トークン)に対する`owner`権限を、トランザクションの送信者アドレスに付与することになる。 このロールは、複数の権限を１回のコールで付与するための配列だ。

トランザクションの送信者のアクセス権限をチェックするには、

        if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
            return errors.New("User unverified")
        }
    

HasPermissionでは、(一致について示す)bool値と、`address`と`role`の組み合わせと一致したロールのサブセットが返される。

他に２つ、任意のアドレスの権限を使って動く低レベル関数がある。

        HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
        GrantPermissionTo(addr loom.Address, token []byte, role string)