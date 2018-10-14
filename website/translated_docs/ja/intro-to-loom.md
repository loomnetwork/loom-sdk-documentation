---
id: intro-loom-sdk
title: Loom Networkとは?
sidebar_label: Loom SDK入門
---
![What is Loom Network?](/developers/img/what-is-loom.png)

LoomネットワークはEthereumのスケールを手助けするための基本的なインフラのプラットフォームを構築している。 それは大規模なスケールでのアプリケーションを開発者が実行できるようにし、プロダクションで動く最初のEthereumのスケーリングの解決方法となる。

簡単に言うと、LoomネットワークはEthereum上のEOSであると考えられる。

## Loom SDK

我々のコアプロダクトはSDKで開発者がすぐに自身のブロックチェーンをその基盤を理解する必要なく構築できるようにする。 「自分のブロックチェーンの構築する」ジェネレーターの様な物と考えて欲しい。

## DAppChains: それぞれ独自のSidechain上に乗ったDApp

Loom SDKはDAppChain(Ethereumをベースレイヤーとして使うレイヤー2のブロックチェーン) と呼ばれる物を生成する。 各DApp毎に独自のEthereumのサイドチェーンを実行する事は数々の利点があり、最も重要な事は: DAppChainは高いスケーラビリティのための最適な(DPoSなどの) コンセンサスルールを代替し利用可能である事だ。 Ethereumをベースレイヤーとして利用する事はDAppChainベースのアセット(ERC20やERC721トークンなど) が特にPlasmaに裏付けられたEthereum上でセキュリティの保証を持つ事ができる事を意味する。

## DPoS = 非常にスケーラブルなDApps

我々のSDKにより、開発者は自身のDAppsの要求に合わせてスケーラビリティとセキュリティのトレードオフをカスタマイズするために自身でコンセンサスアルゴリズムとルールセットを選ぶ事が可能になる 自由な発想で我々はDPoS (Delegated Proof of Stake) をサポートしている、それは大規模なオンラインゲームとソーシャルアプリを可能にする —その２つの初期のタイプのDAppsに我々はフォーカスしている(ただし、どんなタイプのDAppもLoom SDK上に作る事ができる）。 Ethereum上のプラズマによりセキュアにされたDappChainはプラズマベースのリレーを使いアセットをEthereumから出し入れし転送し、Ethereumがセキュアな状態の時にERC20とERC721トークンをDappChain上で使う事を可能する。 簡単に言うと、Loom SDKによって開発者はEOS上で作るであろうアプリと同じタイプの物を作れる様になり、しかしEthereumに裏づけられている。

# ダップチェーンの理解

To better understand our core thesis on scaling and the benefits of DAppChains, read these two blog posts:

[DAppChains: Scaling Ethereum DApps Through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447)

[Million User DApps on Ethereum: An Introduction to Application-Specific Sidechains](https://medium.com/loom-network/million-user-dapps-on-ethereum-an-introduction-to-application-specific-sidechains-c0fdc288c5e5)

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