---
id: goloompermissions
title: Working with permissions helpers in go-loom
sidebar_label: 퍼미션 헬퍼
---
## Go-loom으로 컨트랙트 내에서 퍼미션 사용하기

go-loom으로 작성된 컨트랙트는 임의의 토큰에 대한 퍼미션을 세팅하고 확인하기 위한 helper 함수를 제공한다.

이것은 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)의 Solidity Ownable 개념과 약간 유사하다.

모든 퍼미션은 세가지의 속성을 가진다: 1. address 2. token 3. role

Token은 아무 글자나 byte 시퀀스가 될수 있고, 소유되는 것을 객체로 표현된다. For example a persons username can be a token, that they have ownership over. Other things like tokens could also have ownership.

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