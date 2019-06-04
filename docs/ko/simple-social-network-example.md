---
id: simple-social-network-example
title: Simple Social Network Example
sidebar_label: Simple Social Network Example
---

This example shows how to build a social network on a Loom DAppChain, using `Web3` and [Loom.js](https://github.com/loomnetwork/loom-js). In this simple social network, users can post and comment on posts. The source is available on [Github](https://github.com/loomnetwork/solidity-social-example).

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> We used Solidity version 0.4.24 to compile this [smart contract](https://github.com/loomnetwork/solidity-social-example/blob/master/dappchain/SimpleSocialNetwork.sol).

## Development

### 1.) Run your own DappChain

First, please ensure you've installed Golang as documented in the [prerequisites](https://loomx.io/developers/en/prereqs.html).

Let's start by cloning the `solidity-social-example` repo:

```bash
git clone https://github.com/loomnetwork/solidity-social-example
cd solidity-social-example
```

Next, we need to download the loom binary:

```bash
cd dappchain
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
chmod +x loom
```

and configure it:

```bash
./loom init
cp genesis.example.json genesis.json
```

To start loom, type:

    ./loom run
    

### 2.) Start ElasticSearch and Redis

> Note that both services are required in order to run and interact with the application

If you are using macOS, run the following commands to install `elasticsearch` and `redis`:

```bash
brew tap homebrew/services
brew install elasticsearch
brew install redis
```

Start the services with

```bash
brew services start elasticsearch
brew services start redis
```

### 3.) Start indexer

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch). The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

For the best performance, we recommend you use Node8:

```bash
brew install node@8
```

In a new terminal, run the following:

```bash
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) Start the web server

The webserver will serve the content which allows users to interact with the smart contracts on the Loom DappChain.

First, fire up a third terminal, `cd` into the `webclient` directory, and install dependencies:

```bash
cd solidity-social-example/webclient
yarn
```

Finally, let's start the front-end:

```bash
yarn start
```

### 5.) Interacting with the application

Open `http://localhost:8080` in your web browser of choice.