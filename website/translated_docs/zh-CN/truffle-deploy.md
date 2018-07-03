---
id: truffle-deploy
title: Truffle DApp链示例
sidebar_label: Truffle部署
---
![http://truffleframework.com](/developers/img/truffle.jpg)

Truffle 与 Loom DApp 链交互的简单示例，此示例使用 [loom-truffle-provider](https://github.com/loomnetwork/loom-truffle-provider)（有关详细信息，请查看 LoomTruffleProvider 代码库）

## 需求

```bash
Node >= 8
```

## 安装

下载 Truffle DApp 链 示例有两种方法：Git 或 Unbox

### Git 方法

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

```bash
cd truffle-dappchain-example

yarn install
# 或
npm install
```

### Unbox 方法

```bash
# 如果还没安装 Truffle 就先安装
npm install -g truffle

mkdir truffle-dappchain-example
cd truffle-dappchain-example

truffle unbox loomnetwork/truffle-dappchain-example
```

## 启动 Dapp 链

```bash
# 下载
wget https://private.delegatecall.com/loom/osx/build-209/loom
chmod +x loom

# 运行
./loom init
./loom run
```

## 部署 Truffle

```bash
# On second terminal

# Deploy Migrations.sol and SimpleStore.sol
yarn deploy

# Running test on directory /test
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

## License

BSD 3-Clause License