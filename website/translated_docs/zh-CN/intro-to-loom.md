---
id: intro-loom-sdk
title: Loom Network 是什么？
sidebar_label: 介绍 Loom SDK
---
![What is Loom Network?](/developers/img/what-is-loom.png)

Loom Network 在构建一个帮助以太坊扩展的基础设施平台。 让开发人员能够运行大型应用程序，是第一个正式上线的以太坊扩展解决方案。

简言之，你可以把Loom network看作是以太坊上的EOS。

## Loom SDK

我们的核心产品是 SDK，可以让开发人员快速构建自己的区块链，而无需了解区块链基础设施。 把它想象成一个 "构建你自己的区块链" 生成器。

## DAppChain: 每个 DApp 都在自己的侧链上

Loom SDK 产生一个我们称之为DApp链的产物 —— 一个用以太坊作为基础层的第二层区块链。 将每个DApp运行在它自己的以太坊侧链上有诸多好处，但最重要的是： DApp链可以使用其他共识规则集（如DPoS）来优化高可扩展性。 用以太坊作为基础层意味着基于DApp链的资产（如ERC20和ERC721代币）会有以太坊的安全保证，尤其是当由Plasma支持时。

## DPoS = 大规模可扩展的DApp

我们的SDK允许开发者选择他们自己的共识算法和规则集，根据他们DApp的需求来自定义可扩展性和安全性之间的权衡。 开箱即用，我们支持DPoS（股份授权股权证明），使大型在线游戏和社交应用成为可能 —— 是我们关注的两种初始类型的DApp（尽管你可以在Loom SDK上构建任何类型的DApp）。 以太坊上的Plasma提供安全保障 DApp链使用基于Plasma的中继来与以太坊之间来回转移资产，这使得ERC20和ERC721代币可以在DApp链上使用的同时，仍然由以太坊保障安全。 简而言之，Loom SDK可以让开发者们构建他们会在EOS上构建的相同类型的应用，但是它们将会有以太坊的支持。

# 了解DApp链

为了更好地理解我们关于扩展性和DApp链优势的核心论文，请阅读以下两篇博客文章：

[DApp链：通过侧链扩展以太坊DApp](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447)

[以太坊上百万用户级Dapp ：介绍应用程序特定侧链](https://medium.com/loom-network/million-user-dapps-on-ethereum-an-introduction-to-application-specific-sidechains-c0fdc288c5e5)

# PlasmaChain

## PlasmaChain: A Plasma Cash-backed Hub for Transacting Between Sidechains and Ethereum Mainnet

A few months back, we announced ZombieChain: “An EOS-like DPoS sidechain for Ethereum DApps.” Since we made that announcement, ZombieChain has evolved considerably. What happened is, we started building the marketplace for Zombie Battleground on top of ZombieChain — and as our feature list grew, we realized this chain had potential to become something much larger than originally intended. So we decided to upgrade this chain to have it play an even more important role in the future of our vision: It’s going to become a central hub for token transactions, linked to Ethereum by Plasma Cash. Think of it like a bridge to Ethereum mainnet with a built-in Decentralized Exchange (DEX), that other sidechains can use for faster and cheaper transactions without ever touching mainnet. Such an important role demands an important name. Thus, we’ve decided to rebrand ZombieChain to “PlasmaChain.”

![Plasmachain](/developers/img/plasmachain_diagram.png)

PlasmaChain: The Sidechain Formerly Known as ZombieChain.

### Here are some of the features that will be built into PlasmaChain:

* Plasma Cash link to mainnet for native ETH, ERC20, and NFT (ERC721) support
* Built-in DEX / marketplace functionality
* Native payments in ETH and LOOM
* Plans to integrate BTC payments in the future
* Plans to enable Plasma Cash links to “Layer 3” chains, with PlasmaChain as the parent chain. (Think “sidechains of sidechains”, in which * PlasmaChain is the clearinghouse that enables trading of tokens between multiple sidechains without hitting mainnet.)

Here’s the thing: The Zombie Battleground Marketplace is ALREADY RUNNING on PlasmaChain as you read this. We will also be deploying multiple testnets in the near future, which we will open to third parties to deploy their DApps. These testnets may later evolve to become their own specialized production chains. But in the meantime, they’ll help us test third-party DApps and experiment with new features to eventually incorporate into the production PlasmaChain. As the central hub that acts as a bridge between multiple sidechains and Ethereum, PlasmaChain will be one of the most important pieces in our vision moving forward.

# Understanding Plasma Cash

![Understanding Plasma Cash](/developers/img/plasma.jpg)

We’ve written 2 posts explaining our usage of Plasma on Loom DAppChains:

[Plasma on Loom Network DAppChains: Scalable DApps With Ethereum-Secured Assets](https://medium.com/loom-network/loom-network-plasma-5e86caaadef2)

[Practical Plasma (Volume I): Gaming—focuses on some of the real-world user benefits of securing sidechains with Plasma](https://medium.com/loom-network/practical-plasma-volume-i-gaming-9cfd3f971734)

# Loom Token

For questions about the LOOM token, we have an article specifically devoted to explaining how it works: [LOOM Token FAQs — You got questions, we got answers!](https://medium.com/loom-network/loom-token-faqs-you-got-questions-we-got-answers-2d3c9185b4d0)