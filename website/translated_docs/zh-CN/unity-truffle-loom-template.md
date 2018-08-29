---
id: unity-truffle-loom-template
title: Unity + Truffle + Loom 模版
sidebar_label: Unity + Truffle + Loom 模版
---
# 概览

有Unity客户端的Loom DApp链模板。 **包含:**

- 模板 [`Blueprint` Solidity 合约](https://github.com/loomnetwork/loom-unity-project-template/blob/master/TruffleProject/contracts/Blueprint.sol) 实现基本的字符串到字符串映射。 完美的起点。
- 预配置的 Truffle 项目，可自动将已编译合约的 ABI 和二进制文件提取到相应的文件夹中。
- 准备使用 Unity 项目，它使用 Loom SDK 中的 `Blueprint` 合约。

# 模版结构

```shell
├── DAppChain/
│   ├── build/ # Loom binary and app/blockchain state data will be stored here
│   │   ├── contracts/ # Compiled contracts .bin will go here
│   │   └── ...
│   ├── start-chain.sh # Starts the Loom DAppChain
│   ├── reset-and-start-chain.sh ## Resets app/blockchain state and starts the Loom DAppChain
│   ├── genesis.json # Change this file when changing/adding contracts
│   └── ...
├── TruffleProject/
│   └── ...
└── UnityClient/ # Unity client project
    ├── Assets/
    │   ├── Contracts/ # Contract ABIs will go here
    │   └── ...
    └── ...
```

* * *

## 获取模版

首先，您需要安装Truffle，如果它尚未安装：

```shell
npm install -g truffle
```

之后，你就可以下载模板了：

```shell
git clone https://github.com/loomnetwork/loom-unity-project-template.git
```

可以根据你的项目名称立即重命名 `loom-unity-project-template` 文件夹。

## 构建 Truffle 项目

```shell
# Build the Truffle project. This will extract the ABI files to the Unity client,
# and compiled contracts to the DAppChain/build/ directory

cd Truffle
truffle build
```

## 运行DApp链

```shell
# Start the Loom DAppChain. Loom binary will be downloaded automatically

cd DAppChain
./start-chain.sh
```

## 运行Unity客户端

打开位于 `UnityClient` 文件夹中的Unity项目。打开 `Blueprint/BlueprintTest` 场景并运行/构建它。

# 工作流程

1. 对合约进行更改。
2. 用 `truffle build` 来构建 Truffle 项目。
3. 使用 `DAppChain/start-chain.sh` 启动 Loom DAppChain。
4. 对 Unity 客户端项目进行更改。