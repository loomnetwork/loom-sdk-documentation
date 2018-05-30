---
id: simple-social-network-example
title: Simple Social Network Example
sidebar_label: Simple Social Network Example
---

This example shows how to build a social network on a Loom DAppChain, using `Web3` and [Loom.js](https://github.com/loomnetwork/loom-js).
In this simple social network users can post and comment on posts. Source is available on [Github](https://github.com/loomnetwork/solidity-social-example).

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> The smart contract compiled for this example uses the Solidity version 0.4.24 (SimpleSocialNetwork.sol)

Development
----

### 1.) Run your own DappChain

Please ensure you've installed Golang as documented in the [prerequisites](https://loomx.io/developers/docs/en/prereqs.html).

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-137/loom
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

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch).
The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

```bash
# On second terminal
cd solidity-social-example/webclient
npm install
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