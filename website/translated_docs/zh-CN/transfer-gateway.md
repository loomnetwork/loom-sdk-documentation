---
id: transfer-gateway
title: 转移网关
sidebar_label: 转移网关
---
## 概述

转移网关允许代币在 Loom DApp链和以太坊网络之间传输。 目前仅支持 ERC721代币，但在不久的将来会添加 ERC20代币和 ETH支持。

转移网关由四大主要组件构成:

- 以太坊的网关 Solidity 合约（主网网关）
- Loom DApp链上的网关 Go 合约（DApp链网关）
- Loom DApp链上的地址映射器 Go 合约
- 网关 Oracle（可以在DApp链节点上运行进程，也可以作为独立进程运行）

[ERC20 转移网关示例](https://github.com/loomnetwork/token-gateway-example)

[ERC721 转移网关示例](https://github.com/loomnetwork/cards-gateway-example)

![ERC721 转移到 DApp链的示意图](/developers/img/transfer-gateway-erc721-to-dappchain.png)

当用户希望将代币从他们的以太坊帐户转移到他们的DApp链帐户时，他们必须首先将其转移到主网网关，这会发出一个存款事件。 存款事件由网关 Oracle 接收，并将其转发到 DApp链网关。 然后，DApp链网关将代币转移到该用户的DApp链帐户。

![ERC721 转移到以太坊的示意图](/developers/img/transfer-gateway-erc721-to-ethereum.png)

要将这个代币返回其以太坊帐户，用户必须首先将代币转移回DApp链网关，这将创建一个待处理的取款。 这个待处理的取款由网关 Oracle 接受，签署取款并通知DApp链网关。 DApp链网关发出一个事件，让用户知道他们可以通过提供已签名的取款记录，将他们的代币从主网网关提取到他们的以太坊帐户。

如果你是一个爱动手实践的学习者，你可能希望直接进入 [转移网关卡牌](https://github.com/loomnetwork/cards-gateway-example) 示例项目，然后再继续阅读...

## 设置 ERC721 合约

要将 ERC721 代币从以太坊转移到 DApp链，你需要自己的两个 ERC721 合约，一个在以太坊（主网 ERC721），另一个在DApp链（DApp链 ERC721）。

你的主网 ERC721 合约不需要任何特殊的功能来使用转移网关。 虽然你可能想要在下面添加类似 depositToGateway 方法的内容，使其更轻松地将代币传输到主网网关：

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

你的DApp链 ERC721合约必须提供一个公共 `mint` 方法，以允许DApp链网关铸造从以太坊转移来的代币：

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

如果你对你的合约满意，可以用 Truffle 将它们部署到以太坊和DApp链，你可能要查看一下 [loom-truffle-doc](web3js-loom-provider-truffle.html)。

## 将主网合约映射到DApp链合约

部署合约后，你需要向DApp链网关发送请求以在它们之间创建映射。 当DApp链网关被通知你的主网 ERC721合约中的代币已存入主网网关时，它将在你的DApp链 ERC721合约中铸造一个匹配的代币（除非该代币已存在于DAppC链上）。 DApp链网关将拒绝创建合约映射，除非你提供证明你已部署了这两个合约。

要证明你部署了主网 ERC721合约，你必须提供一个签名（用部署合约的以太坊私钥对消息进行签名时就会生成），以及部署合约的主网事务哈希。

要证明你部署了 DApp链 ERC721 合约，只需使用你用于部署合约的 DApp链私钥, 对发送到 DApp链网关的请求签名，DApp链网关将通过在 DApp链合约注册表中查找合约创建者来验证发送请求者是否部署了合约。

在DApp链网关收到合约映射请求后，会有一点点延迟，接着就会被网关 Oracle 接收到。 网关 Oracle 将查找部署了主网合约的事务，以找出真正部署它的人，然后将其结果提交给DApp链网关，该网关将批准所请求的映射，或者直接将其丢弃。

## ERC721 代币转移到 DApp链

Alice 已经设法在主网上获得了一个很棒的代币，现在想将它转移到她的DApp链账户。 在她这样做之前，她必须向地址映射器合约发送请求，以便在她的以太坊和DApp链帐户之间创建映射。 与DApp链网关一样，地址映射器将拒绝创建帐户映射，除非 Alice 提供证据证明她是两个帐户的所有者。

要证明她拥有自己的主网帐户，Alice 必须提供一个签名（通过使用与帐户关联的以太坊私钥对消息进行签名而生成的）。 要证明她拥有自己的DApp链账户，她只需使用与她的账户关联的DApp链私钥签署她发送到DApp链网关的请求即可。 一旦地址映射器收到请求，它将创建所请求的帐户映射， Alice 就可以开始在她的以太坊和DApp链帐户之间转移代币了。

## ERC721 代币转移到以太坊

Alice 在DApp链上玩得很开心，现在她想将代币从她的DApp链账户转回她的主网账乎。 首先，她必须批准DApp链网关来接管她想要转移的代币所有权，她可以通过向DAppC链 ERC721合约发送请求来做到这一点。

接下来，Alice 应该向DApp链网关发送请求以启动代币提取这一过程。 当DApp链网关收到请求时，它会为 Alice 创建一个待处理的取款记录，然后等待网关 Oracle 签署待处理的取款。 小小的延迟之后，网关 Oracle 会签署待处理的取款，并将签名提交给DApp链网关，然后DApp链网关发出一个事件通知 Alice 她的待处理取款已经签署。

要完成取款流程，Alice 必须将取款签名（由网关 Oracle 生成）提供给主网网关，然后主网网关将相应的代币转移到 Alice 的主网帐户。

## 总结

你现在应该对转移网关的工作原理有了基本的了解，虽然我们还没有提供或解释过任何实际的API。 如果你还没有做的话，请查看 [转移网关卡牌](https://github.com/loomnetwork/cards-gateway-example) 示例项目，该项目是使用 [loom-js](https://github.com/loomnetwork/loom-js) 提供的转移网关 API 构建的。