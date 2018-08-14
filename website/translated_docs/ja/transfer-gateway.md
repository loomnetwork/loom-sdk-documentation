---
id: transfer-gateway
title: トランスファーゲートウェイ
sidebar_label: トランスファーゲートウェイ
---
## 概要

トランスファーゲートウェイでは、Loom DAppチェーンとイーサリアム・ネットワーク間のトークンを移転できる。 現在ERC721トークンのみのサポートであるが、今後近いうちにERC20トークン及びETHのサポートを追加していく。

トランスファーゲートウェイは、以下４つの主要コンポーネントから構成されている:

- イーサリアム上のSolidityコントラクトゲートウェイ (メインネットゲートウェイ)
- Loom DAppチェーン上のGoコントラクトゲートウェイ (DAPpチェーンゲートウェイ)
- Loom DAppチェーン上のGoコントラクトアドレスマッパー
- Oracleゲートウェイ (DAppチェーンノードのプロセス内、またはスタンドアロンプロセスで実行可能)

![Diagram of ERC721 Transfer to DAppChain](/developers/img/transfer-gateway-erc721-to-dappchain.png)

ユーザーがイーサリアムアカウントからDAppチェーンアカウントにトークンを移転したい場合、まずはメインネットゲートウェイに移転することが必要だ。 するとデポジットイベントが送信される。 デポジットイベントはゲートウェイOracleにより検知され、DAppチェーンゲートウェイへと転送される。 その後DAppチェーンゲートウェイは、ユーザー(メインネットゲートウェイへトークンをデポジットした者)のDAppチェーンアカウントへとトークンを移転する。

![Diagram of ERC721 Transfer to Ethereum](/developers/img/transfer-gateway-erc721-to-ethereum.png)

同じトークンをイーサリアムアカウントへと戻したい場合、ユーザーはまず引き出し保留中にするため、トークンをDAppチェーンゲートウェイへと送り返さなくてはならない。 この保留中の引き出しは、引き出しの署名やDAppチェーンゲートウェイへの通知を行うゲートウェイOracleにより検知される。 DAppチェーンゲートウェイはイベントを送信し、署名済み引き出しの記録を提出すれば、メインネットゲートウェイからイーサリアムアカウントへトークンの引き出しが可能であることをユーザーに通知する。

もしハンズオンで学習したければ、続きを読むよりも直接 [Transfer Gateway Cards](https://github.com/loomnetwork/cards-gateway-example) のサンプルを試してみると良いかもしれない...

## ERC721コントラクトのセットアップ

ERC721トークンをイーサリアムからDAppチェーンへと移転するには、独自のERC721コントラクトが２つ必要になる。１つはイーサリアム上(メインネットのERC721)、もう１つはDAppチェーン上(DAPpチェーンのERC721) のものだ。

メインネットのERC721コントラクトは、トランスファーゲートウェイと連動させるために特別なことは何も必要としない。 しかし少しばかり簡単にメインネットゲートウェイへトークンを移転するには、下の`depositToGateway` メソッドのようなものを追加してもよい:

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyAwesomeToken is ERC721Token("MyAwesomeToken", "MAT") {
    // Mainnet Gateway address
    address public gateway;

    constructor(address _gateway) public {
        gateway = _gateway;
    }

    function depositToGateway(uint tokenId) public {
        safeTransferFrom(msg.sender, gateway, tokenId);
    }

}
```

イーサリアムから移転されたトークンをDAppチェーンゲートウェイが生成できるよう、DAppチェーンのERC721コントラクトはパブリックな `mint` メソッドを提供する必要がある:

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

/**
 * @title Full ERC721 Token for Loom DAppChains
 * This implementation includes all the required and some optional functionality of the ERC721
 * standard, it also contains some required functionality for Loom DAppChain compatiblity.
 */
contract MyAwesomeToken is ERC721Token {
    // DAppChain Gateway address
    address public gateway;

    constructor(address _gateway) ERC721Token("MyAwesomeToken", "MAT") public {
        gateway = _gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Mainnet Gateway
    function mint(uint256 _uid) public
    {
        require(msg.sender == gateway);
        _mint(gateway, _uid);
    }
}
```

コントラクトに満足しているなら、Truffleを使ってイーサリアムとDAppチェーンにデプロイすることができる。 これについては [loom-truffle-doc](web3js-loom-provider-truffle.html) を参照のこと。

## メインネットコントラクトをDAppチェーンコントラクトへマッピング

コントラクトをデプロイしたら、DAppチェーンゲートウェイにリクエストを送信してコントラクト間のマッピングを作成しなくてはならない。 トークンがメインネットのERC721コントラクトからメインネットゲートウェイへデポジットされたと通知されると、DAppチェーンゲートウェイはそれに一致するトークンをDAppチェーンのERC732コントラクト内に作成する (トークンがDAppチェーン上にすでに存在していない限り) 。 両コントラクトをデプロイした証明を提出できなければ、DAppチェーンゲートウェイはコントラクトのマッピング作成を拒否する。

メインネットのERC721をデプロイしたことを証明するには、署名を提出しなくてはならない。この署名は、コントラクトデプロイ時に使用したイーサリアムの秘密鍵を使ってメッセージに署名すると生成される。

DAppチェーンのERC721コントラクトをデプロイしたことを証明するには、DAppチェーンゲートウェイに送信されたリクエストに署名するだけでよく、これはコントラクトデプロイ時に使用したDAppチェーンの秘密鍵を使用して行う。DAppチェーンゲートウェイは、DAppチェーンコントラクトレジストリ内でコントラクト作成者を参照することで、コントラクトをデプロイしたリクエスト送信者を検証する。

DAppチェーンゲートウェイがコントラクトのマッピングリクエストを受け取ると、ゲートウェイOracleから検知されるまでにやや遅延がある。 ゲートウェイOracleは、誰が実際にコントラクトをデプロイしたのか、メインネットコントラクトのトランザクションを検索する。そして検索結果をDAppチェーンゲートウェイに送り返すと、マッピングリクエストは承認、もしくは却下のどちらかとなる。

## DAppチェーンへのERC721トークン移転

アリスは、あなたのメインネット上トークンの取得を管理している。そして今、彼女は自身のDAppチェーンアカウントにそのトークンを移転しようとしている。 しかしその前に、彼女はAddress Mapperコントラクトにリクエストを送り、彼女のイーサリアムアカウントとDAppチェーンアカウント間のマッピングを作成しなくてはならない。 DAppチェーンゲートウェイと同じく、アリスが両アカウントの所有者であることの証明を提出できない場合Address Mapperはアカウントマッピングの作成を拒否する。

メインネットアカウントの所有を証明するには、アリスは署名を提出しなくてはならない。この署名は、アカウントと紐づけられたイーサリアム秘密鍵を使用して、メッセージに署名することで生成される。 そしてDAppチェーンアカウントの所有を証明するには、彼女はDAppチェーンアカウントに送信されたリクエストに署名するだけでよい。その際、彼女のアカウントと紐づけられたDAppチェーン秘密鍵を使用して署名を行う。 Address Mapperはリクエストを受け取るとすぐ、リクエストされたアカウントマッピングを作成する。するとアリスは彼女のイーサリアムアカウントとDAppチェーンアカウント間でトークン移転を開始することができる。

## イーサリアムへのERC721トークンの移転

Alice has had her fun on the DAppChain so she wants to transfer her token from her DAppChain account back to her Mainnet account. First she must grant approval to the DAppChain Gateway to take over ownership of the token she wants to transfer, she can do this by sending a request to the DAppChain ERC721 contract.

Next, Alice should send a request to the DAppChain Gateway to start the token withdrawal process. When the DAppChain Gateway receives the request it creates a pending withdrawal record for Alice, and then waits for the Gateway Oracle to sign the pending withdrawal. After a small delay the Gateway Oracle signs the pending withdrawal, and submits the signature to the DAppChain Gateway, which in turn emits an event to notify Alice that her pending withdrawal has been signed.

To complete the withdrawal process Alice must provide the withdrawal signature (generated by the Gateway Oracle) to the Mainnet Gateway, which then transfers the corresponding token to Alice's Mainnet account.

## Summary

You should now have a basic understanding of how the Transfer Gateway works, though we haven't presented nor explained any of the actual API yet. If you haven't already, take a look at the [Transfer Gateway Cards](https://github.com/loomnetwork/cards-gateway-example) example project, which was built using the Transfer Gateway API provided by [loom-js](https://github.com/loomnetwork/loom-js).