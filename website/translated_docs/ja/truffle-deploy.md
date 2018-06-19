---
id: truffle-deploy
title: Truffle DAppチェーンサンプル
sidebar_label: Truffleデプロイ
---
![http://truffleframework.com](/developers/img/truffle.jpg)

Loom DAppチェーンと対話するTruffleの簡単なサンプルだ。このサンプルは[loom-truffle-provider](https://github.com/loomnetwork/loom-truffle-provider)を使用している(さらなる詳細については、LoomTruffleProviderのリポジトリをチェックしよう)

## 要件

```bash
Node >= 8
```

## インストール

Truffle DAppチェーンサンプルをダウンロードするには、GitもしくはUnboxの２つの方法がある。

### Gitの方法

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

```bash
cd truffle-dappchain-example

yarn install
# もしくは
npm install
```

### Unboxの方法

```bash
# もしまだであれば、Truffleをインストール
npm install -g truffle

mkdir truffle-dappchain-example
cd truffle-dappchain-example

truffle unbox loomnetwork/truffle-dappchain-example
```

## DAppチェーンのスタート

```bash
# ダウンロード
wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-161/loom
chmod +x loom

# 起動
./loom init
./loom run
```

## Truffleのデプロイ

```bash
# ２つ目のターミナル画面で

# Migrations.sol 及び SimpleStore.sol をデプロイ
yarn deploy

# ディレクトリ /test にてテストを実行
yarn test
```

> In order to correctly redeploy the contracts there's a command "yarn deploy:reset"
> 
> Also is possible to call truffle command directly by call "yarn truffle"
> 
> We're not versioning the build directory for this particular example, although is recommended to versioning, the limitation can be removed by editing .gitignore

## Current limitations

* Events declared on smart contracts should have an named parameter like `NewValueSet(uint _value)` in the contract `SimpleStore.sol`. Also it helps to dealing with events

## Loom Network

<https://loomx.io>

## ライセンス

BSD 3-Clause License