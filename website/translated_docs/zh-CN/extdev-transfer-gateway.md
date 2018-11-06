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

1. 下载 `loom` 二进制文件，在本教程中你将不会使用自己的DApp链，而是使用内置于 `loom` 二进制文件中的一些CLI命令来与 `extdev` PlasmaChain进行交互。
    
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

4. 生成你自己的私钥，用于在 `extdev` PlasmaChain上部署和调用合同。
    
    ```bash
    $LOOM_BIN genkey -k extdev_private_key -a extdev_public_key
    ```
    
    你应该会在控制台中看到类似这样的内容：
    
        local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
        local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
        
    
    这是你的新私钥对应的公共地址。 你将在 `extdev_private_key` 文件里找到私钥，在 `extdev_public_key` 文件里找到对应的公钥。

5. 在你能够使用部署或调用合约之前，你的新帐户将需要一些 karma。 去 [Karma Faucet](http://faucet.dappchains.com) 上，输入刚刚为你生成的公共地址（以 `0x` 开头的十六进制编码），选择 `extdev` 网络，然后点击 `Request` 按钮获取一些 karma。

6. 将 `MyToken` 和 `MyCoin` 合约部署到 `extdev` PlasmaChain。
    
    ```bash
    yarn deploy:extdev
    ```

## 2. 将代币合约部署到 `Rinkeby`

对于部署到以太坊网络的代币合约没有任何特殊要求，但是你可能希望在ERC20合约中实施安全转移扩展，以便更容易将代币存入 `Rinkeby` 网关。

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
import "openzeppelin-solidity/contracts/AddressUtils.sol";
import "./ERC20Receiver.sol";

contract MyRinkebyCoin is StandardToken {
    using AddressUtils for address;

    string public name = "MyRinkebyCoin";
    string public symbol = "MRC";
    uint8 public decimals = 18;

    // one billion in initial supply
    uint256 public constant INITIAL_SUPPLY = 1000000000;

    bytes4 constant ERC20_RECEIVED = 0xbc04f0af;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;
    }

    function safeTransferAndCall(address _to, uint256 _amount) public {
        transfer(_to, _amount);
        require(
            checkAndCallSafeTransfer(msg.sender, _to, _amount),
            "Sent to a contract which is not an ERC20 receiver"
        );
    }

    function checkAndCallSafeTransfer(
        address _from, address _to, uint256 _amount
    ) internal returns (bool) {
        if (!_to.isContract()) {
            return true;
        }

        bytes4 retval = ERC20Receiver(_to).onERC20Received(_from, _amount);
        return (retval == ERC20_RECEIVED);
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

Map the `MyCoin` contract deployed on `extdev` to the `MyRinkebyCoin` contract deployed on `Rinkeby`:

```bash
node ./gateway-cli.js map-contracts coin
```

After you execute these commands the Transfer Gateway will attempt to verify that you are the creator of these contracts, this may take a couple of minutes. In the meantime you can proceed to the next step.

## 4. Map `extdev` account to `Rinkeby` account

Now that the two token contracts are connected via the Transfer Gateway you can start transferring tokens from `extdev` to `Rinkeby`. However, if you want to transfer tokens from `Rinkeby` to `extdev` you'll need to connect your `extdev` account to your `Rinkeby` account.

```bash
node ./gateway-cli.js map-accounts
```

Great, everything should now be ready for flawless token transfer between `extdev` and `Rinkeby`!

## 5. Token transfer

### From `Rinkeby` to `extdev`

Now that all contracts and accounts have been mapped you can transfer tokens and ETH to the `Rinkeby` Gateway contract.

Lets start by minting some of the `MyRinkebyToken` ERC721 tokens, and transferring one of them to the `PlasmaChain`.

```bash
# mint some tokens on Rinkeby
node ./gateway-cli.js mint-token 1
node ./gateway-cli.js mint-token 2
node ./gateway-cli.js mint-token 3

# transfer a token to extdev PlasmaChain
node ./gateway-cli.js deposit-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

And now lets transfer some of the `MyRinkebyCoin` ERC20 tokens, a billion of them have already been minted to your account so you can transfer them right away.

```bash
# transfer 120 tokens to extdev PlasmaChain
node ./gateway-cli.js deposit-coin 120

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### From `extdev` to `Rinkeby`

The ERC721 tokens can be transferred back to `Rinkeby` using the `withdraw-token` command.

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

The ERC20 tokens can be transferred back to `Rinkeby` using the `withdraw-coin` command.

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

### Troubleshooting

Sometimes the withdrawal process may error out due to network issues, or because gas ran out, if that happens you can try to complete the interrupted withdrawal using the `resume-withdrawal` command.

```bash
node ./gateway-cli.js resume-withdrawal
```

> NOTE: Only one pending withrawal is allowed per user.

## Summary

If you haven't already, take a look at the [Transfer Gateway Example](https://github.com/loomnetwork/transfer-gateway-example) project, which was built using the Transfer Gateway API provided by [loom-js](https://github.com/loomnetwork/loom-js).