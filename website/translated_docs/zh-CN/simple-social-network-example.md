---
id: simple-social-network-example
title: 简单的社交网络示例
sidebar_label: 简单的社交网络示例
---
此示例显示如何使用 `Web3` 和 [Loom.js](https://github.com/loomnetwork/loom-js) 在Loom DApp链上构建社交网络。 在这个简单的社交网络中, 用户可以发布和评论帖子。 源代码可在 [Github](https://github.com/loomnetwork/solidity-social-example) 找到。

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> 为此示例编译的智能合约使用Solidity版本0.4.24（SimpleSocialNetwork.sol）

## 开发

### 1. 运行你自己的 Dapp 链

Please ensure you've installed Golang as documented in the [prerequisites](https://loomx.io/developers/docs/en/prereqs.html).

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

# Configure
./loom init
cp genesis.example.json genesis.json

# Run
./loom run
```

### 2.) Start ElasticSearch and Redis

> Notice that both services are required in order to correct run and interact with the application

```bash
# macOS
brew tap homebrew/services
brew install elasticsearch
brew install redis

# Start services on macOS
brew services start elasticsearch
brew services start redis
```

### 3.) Start indexer

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch). The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

Note this works best on Node8

    brew install node@8
    

```bash
# On second terminal
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) Start the web server

The webserver will serve the frontend which allows users to interact with the smart contracts on the Loom DappChain.

```bash
# On third terminal
cd solidity-social-example/webclient

# Install
yarn

# Start the demo
yarn start

```

### 5.) Running

Open `http://localhost:8080` in your web browser to use the Simple Social Network.