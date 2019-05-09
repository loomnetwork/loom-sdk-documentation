---
id: truffle-deploy
title: Truffle DApp链示例
sidebar_label: Truffle部署
---
![http://truffleframework.com](/developers/docs/img/truffle.jpg)

Truffle 与 Loom DApp链交互的简单示例，此示例使用 [loom-truffle-provider](https://github.com/loomnetwork/loom-truffle-provider)（有关详细信息，请查看 LoomTruffleProvider 代码库）

## 要求

```bash
Node >= 8
```

## 安装

下载 Truffle DApp链示例 有两种方法：Git 或 Unbox

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

## 启动 Dapp链

```bash
# Download
wget https://private.delegatecall.com/loom/osx/stable/loom
chmod +x loom

# Run
./loom init
./loom run
```

## 部署 Truffle

```bash
# 在第二个终端

# 部署 Migrations.sol 和 SimpleStore.sol
yarn deploy

# 在 /test 目录上运行测试
yarn test
```

> 为了正确地重新部署合约，有一个命令 “yarn deploy: reset”
> 
> 也可以通过调用 "yarn truffle" 直接调用truffle命令
> 
> 我们没有对这个特定示例的构建目录进行版本控制，虽然建议进行版本控制，但可以通过编辑 .gitignore 来消除限制。

## 当前的局限

* 在智能合约上声明的事件应该有命名参数，如在合约`SimpleStore.sol`中的`NewValueSet(uint _value)` 。 它也有助于处理事件。

## Loom Network

<https://loomx.io>

## 许可证

BSD 3-条款许可证