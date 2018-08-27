---
id: goloompermissions
title: go-loom에서 퍼미션 헬퍼로 작업하기
sidebar_label: 퍼미션 헬퍼
---
## Go-loom으로 컨트랙트 내에서 퍼미션 사용하기

go-loom으로 작성된 컨트랙트는 임의의 토큰에 대한 퍼미션을 세팅하고 확인하기 위한 helper 함수를 제공한다.

이것은 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)의 Solidity Ownable 개념과 약간 유사하다.

모든 퍼미션은 세가지의 속성을 가진다: 1. address 2. token 3. role

Token은 아무 글자나 byte 시퀀스가 될수 있고, 소유되는 것을 객체로 표현된다. 예를 들면, 사람의 username을 소유권을 가지고 있는 token이라고 해보자. 다른 token과 다른점은 소유권을 가질 수 있다는 것이다.

퍼미션 `role`은 `token`의 `address`에 부여됩니다. 예를 들면, 계정을 생성할때, `owner` 퍼미션은 `username` token 내의 송신자 address에 주어집니다.

예제

        ctx.GrantPermission([]byte(userName), []string{"owner"})
    

이것은 `userName` (token) 내의 `owner` 퍼미션을 트랜잭션의 송신자 address에게 부여한다. roles 은 단일 호출로 여러개의 퍼미션을 부여하기위한 배열이다.

트랜잭션 송신자의 퍼미션을 확인하기 위해서는,

        if ok, _ := ctx.HasPermission([]byte(userName), []string{"owner"}); !ok {
            return errors.New("User unverified")
        }
    

HasPermission은 bool(일치여부를 알려주는) 값과 `address` 와 `role`의 조합에 대해서 일치하는 roles의 요소들을 반환합니다.

임의의 address에 대한 퍼미션을 사용하기 위한 2개의 저수준 함수가 있습니다.

        HasPermissionFor(addr loom.Address, token []byte, roles []string) (bool, []string)
        GrantPermissionTo(addr loom.Address, token []byte, role string)