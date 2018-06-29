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

[前提条件](https://loomx.io/developers/docs/en/prereqs.html)に記されているように、Golangをインストール済みか確認すること。

```bash
git clone https://github.com/loomnetwork/solidity-social-example

cd solidity-social-example

cd dappchain
wget https://private.delegatecall.com/loom/osx/build-196/loom
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

インデクサーは、スマートコントラクトから全イベントを受け取り、それをメッセージキューと高速データベース上に構築されたキャッシュレイヤーへと保存するサービスである。 このサービスによって蓄積されたデータは、`http://localhost:8081/posts`及び`http://localhost:8081/comments`にて提供される。

注：これはNode8 で最も良く機能する。

    brew install node@8
    

```bash
# ２つ目のターミナルで
cd solidity-social-example/webclient
yarn
node indexer.js
```

### 4.) webサーバーのスタート

WEBサーバーは、ユーザーがLoom DAppチェーン上のスマートコントラクトと対話可能となるフロントエンドを提供する。

```bash
# ３つ目のターミナルで
cd solidity-social-example/webclient

# インストール
yarn

# デモのスタート
yarn start

```

### 5.) 起動

ウェブブラウザで`http://localhost:8080`を開いて、シンプルなソーシャルネットワークを使ってみよう。