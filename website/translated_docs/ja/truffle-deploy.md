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
# Download
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

# Run
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

> コントラクトを正しく再デプロイするには "yarn deploy:reset" というコマンドがある。
> 
> また "yarn truffle" を呼び出すことで、Truffleコマンドを直接呼び出すこともできる。
> 
> このサンプルのためのビルドディレクトリのバージョニングは行なっていないが、バージョニングを行うことをおすすめする。この制限は .gitignore を編集することで解除できる。

## 現在の制限

* スマートコントラクト上で宣言されたイベントは、`SimpleStore.sol`にある`NewValueSet(uint _value)`のように、名前のあるパラメーターを持っていなくてはならない。

## Loom Network

<https://loomx.io>

## ライセンス

BSD 3-Clause License