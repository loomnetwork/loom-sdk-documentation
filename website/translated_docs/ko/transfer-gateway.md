---
id: transfer-gateway
title: Transfer 게이트웨이
sidebar_label: Transfer 게이트웨이
---
## 개요

Transfer 게이트웨이는 Loom DAppChain과 이더리움 네트워크간에 토큰 전송을 가능하게 해줍니다. 현재는 오직 ERC721 토큰만 지원합니다만, ERC20 토큰과 ETH도 차후 지원될 예정입니다.

Transfer 게이트웨이는 4가지 주요 컴포넌트로 구성되어 있습니다:

- 이더리움 위에 올라간 게이트웨이 Solidity 컨트랙트 (메인넷 게이트웨이)
- Loom DAppChain 위에 올라간 게이트웨이 Go 컨트랙트 (DAppChain 게이트웨이)
- Loom DAppChain 위에 올라간 어드레스 Mapper Go 컨트랙트
- 게이트웨이 Oracle (DAppChain 노드 위에서 실행되는 프로세스 혹은 독립적인 프로세스로 동작될 수 있음)

[ERC20 Transfer 게이트웨이 예제](https://github.com/loomnetwork/token-gateway-example)

[ERC721 Transfer 게이트웨이 예제](https://github.com/loomnetwork/cards-gateway-example)

![Diagram of ERC721 Transfer to DAppChain](/developers/img/transfer-gateway-erc721-to-dappchain.png)

사용자가 자신의 이더리움 계정에서 DAppChain 계정으로 토큰을 전송하고자 할때 먼저 메인넷 게이트웨이에 전송을 하여야 하며, 다음으로 입금 이벤트가 발생됩니다. 입금 이벤트는 게이트웨이 Oracle에 의해서 선택되고 DAppChain 게이트웨이로 보냅니다. DAppChain 게이트웨이는 토큰을 메인넷 게이트웨이로 입금한 사용자의 DAppChain 계정으로 전송합니다.

![Diagram of ERC721 Transfer to Ethereum](/developers/img/transfer-gateway-erc721-to-ethereum.png)

동일한 토큰을 다시 그들의 이더리움 계정으로 돌려받으려면 사용자는 먼저 토큰을 다시 DAppChain 게이트웨이로 보내야하며, 이것은 보류 인출을 생성합니다 보류 인출은 게이트웨이 Oracle에 의해 선택되고 인출이 서명되어서 DAppChain 게이트웨이에게 알려줍니다. DAppChain 게이트웨이는 사용자에게 자신의 토큰을 메인넷 게이트웨이로에서 이더리움 계정으로 인출할 수 있다는 것을 알게 해주기 위해 서명된 인출 기록을 제공하여 이벤트는 내보냅니다.

여러분이 실습 학습자라면 더 읽기전에 [Transfer 게이트웨이 카드](https://github.com/loomnetwork/cards-gateway-example) 예제 프로젝트로 바로 뛰어들길 원하실 수도 있겠네요...

## ERC721 컨트랙트 설정하기

ERC721 토큰을 이더리움에서 DAppChain으로 전송하려면 여러분만의 두개의 ERC721 컨트랙트가 필요합니다, 하나는 이더리움 (메인넷 ERC721) 위에, 나머지는 DAppChain (DAppChain ERC721) 위에.

여러분의 메인넷 ERC721 컨트랙트는 Transfer 게이트웨이와 작동하기 위해서 틀별한 것이 필요하지는 않습니다. 비록 아래처럼 메인넷 게이트웨이로의 토큰 전송을 좀 더 쉽게 해주는 `depositToGateway`과 같은 것을 추가해야하지만:

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyAwesomeToken is ERC721Token("MyAwesomeToken", "MAT") {
    // 메인넷 게이트웨이 주소
    address public gateway;

    constructor(address _gateway) public {
        gateway = _gateway;
    }

    function depositToGateway(uint tokenId) public {
        safeTransferFrom(msg.sender, gateway, tokenId);
    }

}
```

여러분의 DAppChain ERC721 컨트랙트는 이더리움에서 전송된 토큰을 발행하기 위해서 반드시 public `mint` 메소드를 제공해야만 합니다:

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

/**
 * @title Loom DAppChain을 위한 완전한 ERC721 토큰
 * 구현은 모든 ERC721 표준의 모든 요구사항과 추가적인 기능을 포함합니다
 * 또한, Loom DAppChain 호환성을 위해 요구되는 몇가지 기능도 포함합니다.
 */
contract MyAwesomeToken is ERC721Token {
    // DAppChain Gateway address
    address public gateway;

    constructor(address _gateway) ERC721Token("MyAwesomeToken", "MAT") public {
        gateway = _gateway;
    }

    // Mainnet 게이트웨이에서 입금되는 토큰을 발행하기 위해서 DAppChain 게이트웨이에서 사용됨
    function mint(uint256 _uid) public
    {
        require(msg.sender == gateway);
        _mint(gateway, _uid);
    }
}
```

여러분의 컨트랙트에 만족한다면 Truffle을 이용해서 이더리움과 DAppChain에 배포할 수 있습니다, [loom-truffle-doc](web3js-loom-provider-truffle.html)을 살펴보세요.

## 메인넷 컨트랙트와 DAppChain 컨트랙트 매핑하기

일단 여러분의 컨트랙트가 배포되면, DAppChain 게이트웨이에게 그들 사이에 매핑을 해달라고 요청을 보내는 것이 필요합니다. DAppChain 게이트웨이가 여러분의 메인넷 ERC721 컨트랙트의 토큰이 메인넷 게이트웨이에 입금된 것에 대한 알림을 받으면, 여러분의 DAppChain ERC721 컨트랙트에서 매칭되는 토큰을 발행할 것입니다 (토큰이 DAppChain에 존재하지 않는한). DAppChain 게이트웨이는 여러분이 두개의 컨트랙트를 모두 배포했다는게 증명되지 않으면 매핑된 컨트랙트의 생성을 거부할 것입니다.

메인넷 ERC721 컨트랙트의 배포를 증명하기 위해서 컨트랙트를 배포하는데 사용된 이더리움 프라이빗 키를 사용해서 인증된 메시지에 의해서 생성된 시그니처와 컨트랙트를 배포한 메인넷 트랜잭션의 해쉬값을 제공해야만 합니다.

DAppChain ERC721 컨트랙트의 배포를 증명하기 위해서는 간단히 컨트랙트를 배포하는 데 사용된 DAppChain 프라이빗 키를 사용하여 DAppChain 게이트웨이로 보낸 요청을 서명하면 됩니다, DAppChain 게이트웨이는 DAppChain 컨트랙트 레지스트리에 있는 컨트랙트 생성자를 조회해서 컨트랙트의 배포를 요청한 발신자를 인증할 것 입니다,

DAppChain 게이트웨이가 컨트랙트 매핑 요청을 수신하면, 게이트웨이 오라클에 의해서 선택되기 전까지 약간의 대기시간이 발생합니다. 게이트웨이 오라클은 정말로 배포가 되었는지를 확인하기 위해서 메인넷 컨트랙트에 배포된 트랜잭션을 조회할 것입니다, 그리고 DAppChain 게이트웨이에게 다시 결과를 제출하고, 요청된 매핑에 대해서 승인이 되거나 거부될 것입니다.

## DAppChain으로 ERC721 토큰 전송하기

Alice는 메인넷에 있는 여러분의 멋진 토큰중 하나를 획득하고 싶어서 그것을 당장 DAppChain 계정으로 전송하고 싶어합니다. 그렇게 하려면 그전에 그녀는 이더리움과 DAppChain 계정간의 매핑을 생성해주는 Address Mapper 컨트랙트 요청을 보내야만 합니다. DAppChain 게이트웨이와 같이 Address Mapper는 Alice가 두곳의 계정 소유자라는 것을 증명하지 않으면 계정 매핑 생성을 거부할 것입니다.

그녀가 자신의 메인넷 계정을 소유하고 있다는 것을 증명하기 위해서 Alice는 계정과 연관된 이더리움 프라이빗 키를 사용하여 서명된 메시지가 생성해주는 서명을 제공해야만 합니다. 그리고 그녀가 자신의 DAppChain 계정을 가지고 있다는 것을 증명하기 위해서 그녀의 계정과 연관된 DAppChain 프라이빗 키를 이용해서 DAppChain 게이트웨이에 보내는 요청에 서명하면됩니다. Address Mapper가 요청을 받자마자 요청된 계정 매핑 생성을 생성할 것이고, Alice는 이더리움과 DAppChain 계정 사이의 토큰 전송을 시작할 수 있습니다.

## 이더리움으로 ERC721 token 전송하기

Alice has had her fun on the DAppChain so she wants to transfer her token from her DAppChain account back to her Mainnet account. First she must grant approval to the DAppChain Gateway to take over ownership of the token she wants to transfer, she can do this by sending a request to the DAppChain ERC721 contract.

Next, Alice should send a request to the DAppChain Gateway to start the token withdrawal process. When the DAppChain Gateway receives the request it creates a pending withdrawal record for Alice, and then waits for the Gateway Oracle to sign the pending withdrawal. After a small delay the Gateway Oracle signs the pending withdrawal, and submits the signature to the DAppChain Gateway, which in turn emits an event to notify Alice that her pending withdrawal has been signed.

To complete the withdrawal process Alice must provide the withdrawal signature (generated by the Gateway Oracle) to the Mainnet Gateway, which then transfers the corresponding token to Alice's Mainnet account.

## 요약

You should now have a basic understanding of how the Transfer Gateway works, though we haven't presented nor explained any of the actual API yet. If you haven't already, take a look at the [Transfer Gateway Cards](https://github.com/loomnetwork/cards-gateway-example) example project, which was built using the Transfer Gateway API provided by [loom-js](https://github.com/loomnetwork/loom-js).