---
id: intro-loom-sdk
title: Loom Network 是什么？
sidebar_label: 介绍 Loom SDK
---
![Loom Network 是什么？](/developers/docs/img/what-is-loom.png)

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

## PlasmaChain：用于在侧链和以太坊主网之间进行交易的受Plasma Cash支持的枢纽。

几个月前，我们官宣了ZombieChain（僵尸链）：“以太坊DApp的类EOS DPoS侧链。” 自从我们宣布这一消息以来，ZombieChain已经有了很大的进展。 我们开始在ZombieChain上搭建“僵尸战场”的交易市场——而当我们的功能特性列表不断变长的时候，我们意识到这条链拥有比我们原来的预期所更大的潜力。 所以我们决定升级这条链，并让它在我们的未来愿景中扮演更重要的角色：它将成为代币事务的中心枢纽，通过Plasma Cash连接到以太坊。 可以把这条链想象成一条通往以太坊主网的桥梁，它有着一个内置的去中心化交易所（DEX），而所有其他侧链可以用其来实现更快、更便宜的事务而无需接触主网。 如此伟大的角色需要一个伟大的名字。 因此，我们决定将ZombieChain更名为“PlasmaChain”。

![PlasmaChain](/developers/docs/img/plasmachain_diagram.png)

PlasmaChain，原名“ZombieChain”。

### 以下是一些将会构建在PlasmaChain上的特性功能：

* 连接主网的Plasma Cash，提供原生ETH、ERC20和NFT（ERC721）支持
* 内置DEX/交易市场功能
* ETH和LOOM的原生支付
* 计划在未来整合BTC支付
* 计划以PlasmaChain为母链，将Plasma Cash连接到“第3层”链。 （想想“侧链的侧链”，其中 PlasmaChain作为清算所，使多个侧链之间的代币交易不用接触主网即可实现）

所以呢：当你读这里时，“僵尸战场”交易市场已经在PlasmaChain上运行了！ 我们还会在不久的将来部署多个测试网，我们将向第三方开放部署他们的DApp。 这些测试网可能会在后来发展作为他们自己特定的链上线。 但期间，他们将帮助我们测试第三方DApp，对新功能进行尝试并最终将其纳入PlasmaChain。 作为中心枢纽，它充当多个侧链和以太坊之间的桥梁，PlasmaChain将成为我们愿景中最重要的组成部分之一。

# 了解Plasma Cash

![了解Plasma Cash](/developers/docs/img/plasma.jpg)

我们已经写了两篇文章来解释我们如何在Loom DApp链上使用Plasma：

[在Loom Network DApp链上使用Plasma：可扩展的DApp和以太坊保护的资产](https://medium.com/loom-network/loom-network-plasma-5e86caaadef2)

[Plasma使用指南(Vol. I)：游戏——着重讨论用Plasma保护侧链对于真实用户的好处](https://medium.com/loom-network/practical-plasma-volume-i-gaming-9cfd3f971734)

# Loom代币

我们专门有一篇文章详细介绍了关于LOOM代币的问题： [LOOM代币FAQ —— 你的问题，我们有答案！](https://medium.com/loom-network/loom-token-faqs-you-got-questions-we-got-answers-2d3c9185b4d0)