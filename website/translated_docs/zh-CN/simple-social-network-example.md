---
id: simple-social-network-example
title: 简单的社交网络示例
sidebar_label: 简单的社交网络示例
---
此示例显示如何使用 `Web3` 和 [Loom.js](https://github.com/loomnetwork/loom-js) 在Loom DApp链上构建社交网络。 在这个简单的社交网络中, 用户可以发布和评论帖子。 源代码可在 [Github](https://github.com/loomnetwork/solidity-social-example) 找到。

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> 为此示例编译的智能合约使用Solidity版本0.4.24（SimpleSocialNetwork.sol）

## 开发

### 1.) 运行你自己的 Dapp 链

请确保您已按照[必须条件](https://loomx.io/developers/docs/en/prereqs.html)中的说明安装了Golang。

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 2.) 启动 ElasticSearch 和 Redis

> 请注意，为了纠正运行并与应用程序交互，需要这两个服务

```bash
# macOS
brew tap homebrew/services
brew install elasticsearch
brew install redis

# 在 macOS 上启动服务
brew services start elasticsearch
brew services start redis
```

### 3.) 启动索引器

索引器是一种服务，它将从智能合约接收所有事件，并提供构建在消息队列和快速数据库（Redis + ElasticSearch）上的缓存层。 此服务累积的数据在 `http://localhost:8081/posts` and `http://localhost:8081/comments` 中提供。

注意这在 Node8 上效果最佳。

    brew install node@8
    

```bash
# 在第二个终端上
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) 启动 web 服务器

网络服务器将服务于前端，允许用户与Loom Dapp链上的智能合约进行交互。

```bash
# 在第三个终端上
cd solidity-social-example/webclient

# 安装
yarn

# 开始演示
yarn start

```

### 5.) 运行

在 web 浏览器中打开`http://localhost:8080`来使用这个简单的社交网络。