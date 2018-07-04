---
id: web3js-loom-provider-truffle
title: Web3, LoomProvider 和 Truffle
sidebar_label: Web3, LoomProvider 和 Truffle
---
## 概述

`LoomProvider` 还附带了`loom-js` ，它允许你与 [Web3.js](https://github.com/ethereum/web3.js) 集成，从而更容易与 Loom DApp 链中包含的 [EVM](evm.html) 集成，也可以使用 [Truffle Framework](http://truffleframework.com/) 来管理测试，部署和 solidity 智能合约。</p> 

### Web3

正如 `Web3.js` 的官方文档所述：

> `Web3.js` 是一个库集合，允许你使用 HTTP 或 IPC 连接与本地或远程以太坊节点进行交互。

对于 Loom DApp 链，使用 `WebSockets` 而不是 `HTTP` 或 `IPC` 进行通信，由于 `Web3.js` 抽象了该部分，所以不需要更深入的通信知识。

### LoomProvider

`Provider` 是将 `Web3.js` API 连接到以太坊节点的桥梁，为了使 `Web3.js` 调用与 Loom DApp 链兼容，你应该使用LoomProvider。

结合 `Web3` 和 `LoomProvider` 是一个很好的选择, 可以与部署在Loom DApp链上的智能合同进行交互,因为 `Web3` 抽象了 API 调用的构造, 不需要手动解释 [ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html)。

### Truffle 框架

所以 `Truffle` 的官方网站说：

> Truffle 是以太坊最受欢迎的开发框架，其使命就是让您的生活更轻松。

这完全是真的，因为 `Truffle` 可以：`编译`，`部署`，`测试`，`调试`等等。

## 从 Truffle 部署和运行

### 下载和安装

首先, 你需要安装 `Truffle`:

```bash
# 当前支持的版本 
npm install -g truffle
```

安装 `Truffle` 后, 让我们创建一个目录并初始化一个项目:

```bash
# 创建目录和访问
mkdir simple-store
cd simple-store

# 使用 truffle 从零开始初始化项目
truffle init
```

新的目录结构将如下所示:

    .
    ├── contracts
    │ └── Migrations.sol
    ├── migrations
    │ └── 1_initial_migration.js
    ├── test
    ├── truffle-config.js
    └── truffle.js
    

### 添加合约和迁移

在 `contracts` 目录上，我们应该在[Solidity](http://solidity.readthedocs.io/en/v0.4.22/)中创建合约，我们将使用著名的`SimpleStore.sol` ，它具有一个参数`value`的`set`函数，也用于状态更改，`get` 函数用于只读，没有状态更改调用，以及一个名为`NewValueSet` 的事件，它将具有参数值，如下例所示：

    pragma solidity ^0.4.22;
    
    contract SimpleStore {
      uint value;
    
      event NewValueSet(uint _value);
    
      function set(uint _value) public {
        value = _value;
        emit NewValueSet(value);
      }
    
      function get() public view returns (uint) {
        return value;
      }
    }
    

接下来让我们添加一个迁移，Truffle 使用迁移的概念，这对跟踪更改和更新很有用。 该文件应该在迁移目录中创建，它应该是 `JavaScript` 文件，文件名应该从数字 `2` 开始变为 `2_simple_store.js`，内容应该如下：

```Javascript
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

> 在 https://github.com/loomnetwork/truffle-dappchain-example 上有一个完整的 Truffle 集成示例

### 下载并配置 Loom Truffle Provider

要添加的最后一个部件是 `Loom Truffle Provider`，该插件提供 `Truffle` 和 Loom DApp 链之间的连接（它下面还有 `LoomProvider`）。 我们安装吧：

```bash
npm install loom-truffle-provider --save
#or
yarn add loom-truffle-provider
```

让我们编辑文件 `truffle.js` 添加必要的配置, 如下面的示例所示:

```javascript
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

module.exports = {
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}
```

> 不要忘记使用命令 `loom genkey -a public_key -k private_key` 生成你的密钥

### 运行 Truffle 部署命令

现在, 我们准备好了运行部署命令:

> 但之前你需要启动 Loom DApp链

```bash
truffle deploy --network loom_dapp_chain
```

> 如果您已部署并希望重置部署，则可以运行该命令 `truffle deploy --reset --network loom_dapp_chain`

### 添加更多帐户

为了访问 `LoomTruffleProvider` 上的帐户, 应使用函数 `getProviderEngine`, 这将返回 `LoomProvider` 授予对属性 `accountsAddrList` 和 "帐户" 的访问权限

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)
```

并添加更多帐户只需使用函数 `createExtraAccounts`

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
loomTruffleProvider.createExtraAccounts(10)
```

## 配置和运行 Web3.js + LoomProvider

### 下载和安装

你可以用 `npm` 下载 `Web3.js` 最新版

```bash
npm install web3 --save
# 或
yarn add web3
```

下载并安装 `LoomProvider`（它位于 `loom-js`上）

```bash
npm install loom-js --save
# 或
yarn add loom-js
```

### 添加到项目和配置

将 `Node3.js` 添加到 Node.js 项目（在 Node.js 版本8或更高版本上运行）在安装后相当简单，对于使用 `Webpack` 的项目也应该很简单：

```Javascript
// Node.JS 8 or greater
const Web3 = require('web3')

// Webpack with ES2016 support
import Web3 from 'web3'
```

下一步是配置 `LoomProvider`，与 `NodeJS & Browser Quick Start` 上的示例非常相似。

```Javascript
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46657/websocket',
  'ws://127.0.0.1:9999/queryws',
)

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(publicKey).toString()

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, privateKey))

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const contractAddress = '0x...'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
```

### 运行 Web3 合约实例

我们假设这是上面声明的 `SimpleStore.sol`，可以更容易地调用`set`和`get`函数：

```Javascript
// Set the value 47
const tx = await contract.methods.set(47).send()

// Get the value 47
const value = await contract.methods.get().call()
```

Also listen for events, in that case for the event `NewValueSet`:

```Javascript
contract.events.NewValueSet({}, (err, event) => {
  if (err) {
    return console.error(err)
  }

  console.log('New value set', event.returnValues._value)
})
```