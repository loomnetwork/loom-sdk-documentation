---
id: simple-social-network-example
title: シンプルなソーシャルネットワークのサンプル
sidebar_label: シンプルなソーシャル ネットワークのサンプル
---
これは、`Web3`と[Loom.js](https://github.com/loomnetwork/loom-js)を使ってLoom DAppチェーン上にソーシャルネットワーキングを構築するサンプルである。 このシンプルなソーシャルネットワークでは、ユーザーは投稿及び投稿へのコメントができる。 ソースコードは[Github](https://github.com/loomnetwork/solidity-social-example)で利用可能。

![](https://dzwonsemrish7.cloudfront.net/items/2W3c2O3G2A1q1l3f3D3d/Screen%20Recording%202018-05-29%20at%2003.35%20PM.gif)

> コンパイルされたこのサンプル用のスマートコントラクトは、 Solidity version 0.4.24 (SimpleSocialNetwork.sol)を使用している。

## 開発

### 1.) 自分のDAppチェーンを起動しよう

Please ensure you've installed Golang as documented in the [prerequisites](https://loomx.io/developers/docs/en/prereqs.html).

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-137/loom
chmod +x loom

# 設定
./loom init
cp genesis.example.json genesis.json

# 起動
./loom run
```

### 2.) ElasticSearchとRedisのスタート

> 両サービスは、起動の修正とアプリケーションとの対話のために必要であることに注意しよう。

```bash
# macOS
brew tap homebrew/services
brew install elasticsearch
brew install redis

# macOSでサービスをスタート
brew services start elasticsearch
brew services start redis
```

### 3.) インデクサーをスタート

The indexer is a service that will receive all events from the smart contract and feed a cache layer built on a message queue and a fast database (Redis + ElasticSearch). The data accumulated by this service is served at `http://localhost:8081/posts` and `http://localhost:8081/comments`

これはNode8 で最適に機能する。

    brew install node@8
    

```bash
# ２つ目のターミナルで
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) webサーバーのスタート

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