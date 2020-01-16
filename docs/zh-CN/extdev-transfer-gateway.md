---
id: extdev-transfer-gateway
title: 转移网关测试网教程
sidebar_label: 转移网关测试网
---
## 概述

在本文档中，我们将引导你完成在已部署到 `extdev` 和 `Rinkeby` 的代币合约之间转移代币所需的设置。 如果你尚未这样做，则应首先阅读 [转移网关](transfer-gateway.html) 的高级概述。

## 1. 将代币合约部署到 `extdev`

如果你想要将代币从部署在 `Rinkeby` 上的代币合约转移到部署在 `extdev` 上的代币合约，你需要确保你部署在 `extdev` 上的代币合约实施了 `mintToGateway` 方法。 我们创建了一些示例合约和一个简单的 CLI 来与它们进行交互。

### MyToken ERC721合约

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyToken is ERC721Token {
    // Transfer Gateway contract address
    address public gateway;

    constructor(address _gateway) ERC721Token("MyToken", "MTC") public {
        gateway = _gateway;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _uid) public
    {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        _mint(gateway, _uid);
    }
}
```

### MyCoin ERC20 合约

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyCoin is StandardToken {
    // Transfer Gateway contract address
    address public gateway;

    string public name = "MyCoin";
    string public symbol = "MCC";
    uint8 public decimals = 18;

    constructor(address _gateway) public {
        gateway = _gateway;
        totalSupply_ = 0;
    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway(uint256 _amount) public {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        totalSupply_ = totalSupply_.add(_amount);
        balances[gateway] = balances[gateway].add(_amount);
    }
}
```

所有合约的完整源码可以在 [Truffle DApp链示例](https://github.com/loomnetwork/truffle-dappchain-example) 代码库中找到。

1. 下载 `loom` 二进制文件，在本教程中你将不会使用自己的DApp链，而是使用内置于 `loom` 二进制文件中的一些CLI命令来与 `extdev` Basechain进行交互。
    
    ```bash
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
    # set LOOM_BIN to reference the downloaded loom binary,
    # makes it easy to invoke it from anywhere
    export LOOM_BIN=`pwd`/loom
    ```

2. 确保安装了 `node`（版本8或更高版本） 和 `yarn`。

3. 克隆 [Truffle DApp链示例](https://github.com/loomnetwork/truffle-dappchain-example) 代码库。
    
    ```bash
    # clone the tutorial repo to the gateway-tutorial directory
    git clone https://github.com/loomnetwork/truffle-dappchain-example gateway-tutorial
    cd gateway-tutorial
    # install dependencies
    yarn
    ```

4. 生成你自己的私钥，用于在 `extdev` Basechain上部署和调用合同。
    
    ```bash
    $LOOM_BIN genkey -k extdev_private_key -a extdev_public_key
    ```
    
    你应该会在控制台中看到类似这样的内容：
    
        local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
        local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
        
    
    这是你的新私钥对应的公共地址。 你将在 `extdev_private_key` 文件里找到私钥，在 `extdev_public_key` 文件里找到对应的公钥。

5. Deploy the `MyToken` and `MyCoin` contracts to the `extdev` Basechain.
    
    ```bash
    yarn deploy:extdev
    ```

## 2. 将代币合约部署到 `Rinkeby`

There aren't any special requirements for token contracts deployed to Ethereum networks.

### MyRinkebyToken ERC721 合约

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyRinkebyToken is ERC721Token {
    constructor() ERC721Token("MyRinkebyToken", "MRT") public {
    }

    function mint(uint256 _uid) public
    {
        _mint(msg.sender, _uid);
    }

    // Convenience function to get around crappy function overload limitations in Web3
    function depositToGateway(address _gateway, uint256 _uid) public {
        safeTransferFrom(msg.sender, _gateway, _uid);
    }
}
```

### MyRinkebyCoin ERC20 合约

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyRinkebyCoin is StandardToken {
    string public name = "MyRinkebyCoin";
    string public symbol = "MRC";
    uint8 public decimals = 18;

    // one billion in initial supply
    uint256 public constant INITIAL_SUPPLY = 1000000000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;
    }
}
```

所有合约的完整源码可以在 [Truffle DApp链示例](https://github.com/loomnetwork/truffle-dappchain-example) 代码库中找到。

我们把这些合约部署到 `Rinkeby` 吧。

1. 生成一个以太坊私钥。
    
    ```bash
    # this will create the rinkeby_account, rinkeby_mnemonic, and rinkeby_private_key files
    yarn gen:rinkeby-key
    ```

2. 从 `rinkeby_account` 文件中获取 `Rinkeby` 新账户的地址。
    
    ```bash
    cat rinkeby_account
    ```

3. 给 `Rinkeby` 帐户提供一些ETH，以便它可以用于将合同部署到`Rinkeby`，你可以使用 https://faucet.rinkeby.io 或从另一个帐户中转移一些 ETH。

4. 设置你的 Infura API 密钥 （从 https://infura.io 获取）
    
    ```bash
    export INFURA_API_KEY=XXXXXXXXXXXXXXXX
    ```

5. 部署示例合约
    
        yarn deploy:rinkeby
        
    
    如果此操作失败, 并出现类似于这样的错误:
    
        Error encountered, bailing. Network state unknown. Review successful transactions manually.
        insufficient funds for gas * price + value
        
    
    往 `rinkeby_account` 中的帐户再多转移点 ETH。

## 3. 将 `extdev` 合约映射到 `Rinkeby` 合约

将你的合约部署到两条链之后，你将需要让转移网关知道你想让它在合约之间转移代币。 你可以使用 [loom-js](https://github.com/loomnetwork/loom-js) 中的`TransferGateway`类或 `loom` CLI 以编程方式执行此操作。 对于本教程，我们使用 `web3` 和 [loom-js](https://github.com/loomnetwork/loom-js) 构建了一个更简化的 JS CLI，因此你不需要寻找合约地址、事务哈希等等的东西。

将部署在 `extdev` 的 `MyToken` 合约映射到部署在 `Rinkeby` 的 `MyRinkebyToken` 合约：

```bash
node ./gateway-cli.js map-contracts token
```

将部署在 `extdev` 的 `MyCoin` 合约映射到部署在 `Rinkeby` 的 `MyRinkebyCoin` 合约：

```bash
node ./gateway-cli.js map-contracts coin
```

执行了这些命令后，转移网关将尝试验证你是否为这些合约的创建者 ，这可能需要几分钟时间。 在此期间，你可以进行下一步。

## 4. 将 `extdev` 账户映射到 `Rinkeby` 账户

现在两个代币合约通过转移网关连接起来了，你可以开始将代币从 `extdev` 转移到 `Rinkeby`。 但是，如果你想把代币从 `Rinkeby` 转移到 `extdev`，你将需要将你的 `extdev` 账户和 `Rinkeby` 账户连接起来。

```bash
node ./gateway-cli.js map-accounts
```

太棒了，现在一切都应该准备就绪了，可以在 `extdev` 和 `Rinkeby` 之间进行完美的代币转移啦！

## 5. 代币转移

### 从 `Rinkeby` 到 `extdev`

现在所有的合约和账户都已经映射，你可以将代币和ETH转移到 `Rinkeby` 网关合约了。

我们先来铸造一些 `MyRinkebyToken` ERC721 代币，并将其中一个转移到 `Basechain`。

```bash
# mint some tokens on Rinkeby
node ./gateway-cli.js mint-token 1
node ./gateway-cli.js mint-token 2
node ./gateway-cli.js mint-token 3

# transfer a token to extdev
node ./gateway-cli.js deposit-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

现在，我们转移一些 `MyRinkebyCoin` ERC20 代币，十亿这样的代币已经被铸造到你的账户，你可以马上转移它们了。

```bash
# transfer 120 tokens to extdev
node ./gateway-cli.js deposit-coin 120

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### 从 `extdev` 到 `Rinkeby`

使用 `withdraw-token` 命令，可以将 ERC721 代币转移回 `Rinkeby`。

```bash
# transfer a token to Rinkeby
node ./gateway-cli.js withdraw-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

使用 `withdraw-coin` 命令可以将 ERC20 代币转移回`Rinkeby`。

```bash
# transfer 60 tokens to Rinkeby
node ./gateway-cli.js withdraw-coin 60

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### 故障排除

有时撤回过程可能由于网络问题或者gas用尽而出现错误，如果发生这种情况，你可以尝试使用 `resume-withdrawal` 命令来完成被中断的撤回。

```bash
node ./gateway-cli.js resume-withdrawal
```

> 注意: 每个用户只允许有一个挂起的撤回。

## 总结

如果你还没有做的话，请查看 [转移网关示例 ](https://github.com/loomnetwork/transfer-gateway-example) 项目，该项目是使用 [loom-js](https://github.com/loomnetwork/loom-js) 提供的转移网关 API 构建的。