---
id: intro-loom-sdk
title: Intro to Loom SDK
sidebar_label: Intro Loom SDK 
---
# What is Loom Network?

![What is Loom Network?](/developers/img/what-is-loom.png)

Loom Network is building a fundamental infrastructure platform to help Ethereum scale.
It allows developers to run large-scale applications, and is the first Ethereum scaling solution to be live in production.

In short, you can think of Loom Network as EOS on top of Ethereum.

## The Loom SDK
Our core product is an SDK that allows developers to quickly build their own blockchains without having to understand blockchain infrastructure. Think of it like a “build your own blockchain” generator.

## DAppChains: Each DApp On Its Own Sidechain
The Loom SDK generates what’s called a DAppChain — a layer-two blockchain that uses Ethereum as its base-layer.
Running each DApp on its own sidechain to Ethereum has a number of benefits, but most importantly:
DAppChains can use alternative consensus rulesets (like DPoS) that optimize for high scalability.
Using Ethereum as a base-layer means DAppChain-based assets (like ERC20 and ERC721 tokens) can have the security guarantees of Ethereum, especially when backed by Plasma.

## DPoS = Massively Scalable DApps
Our SDK allows developers to choose their consensus algorithm and rulesets to customize the scalability / security tradeoffs to their DApps needs.
Out of the box we support DPoS (Delegated Proof of Stake), which enables large-scale online games and social apps — the 2 initial types of DApps we’re focusing on (though you can build any type of DApp on the Loom SDK).
Secured by Plasma on Ethereum
DAppChains use Plasma-based relays to transfer assets back and forth from Ethereum, which allows ERC20 and ERC721 tokens to be used on the DAppChain while still being secured by Ethereum.
In short, the Loom SDK enables developers to build the same types of apps they would build on EOS, but have them backed by Ethereum.

# Understanding DAppChains
To better understand our core thesis on scaling and the benefits of DAppChains, read these two blog posts:

[DAppChains: Scaling Ethereum DApps Through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447)

[Million User DApps on Ethereum: An Introduction to Application-Specific Sidechains](https://medium.com/loom-network/million-user-dapps-on-ethereum-an-introduction-to-application-specific-sidechains-c0fdc288c5e5)

# PlasmaChain

## PlasmaChain: A Plasma Cash-backed Hub for Transacting Between Sidechains and Ethereum Mainnet
A few months back, we announced ZombieChain: “An EOS-like DPoS sidechain for Ethereum DApps.”
Since we made that announcement, ZombieChain has evolved considerably.
What happened is, we started building the marketplace for Zombie Battleground on top of ZombieChain — and as our feature list grew, we realized this chain had potential to become something much larger than originally intended.
So we decided to upgrade this chain to have it play an even more important role in the future of our vision: It’s going to become a central hub for token transactions, linked to Ethereum by Plasma Cash.
Think of it like a bridge to Ethereum mainnet with a built-in Decentralized Exchange (DEX), that other sidechains can use for faster and cheaper transactions without ever touching mainnet.
Such an important role demands an important name. Thus, we’ve decided to rebrand ZombieChain to “PlasmaChain.”

![Plasmachain](/developers/img/plasmachain_diagram.png)

PlasmaChain: The Sidechain Formerly Known as ZombieChain.
### Here are some of the features that will be built into PlasmaChain:
* Plasma Cash link to mainnet for native ETH, ERC20, and NFT (ERC721) support
* Built-in DEX / marketplace functionality
* Native payments in ETH and LOOM
* Plans to integrate BTC payments in the future
* Plans to enable Plasma Cash links to “Layer 3” chains, with PlasmaChain as the parent chain. (Think “sidechains of sidechains”, in which * PlasmaChain is the clearinghouse that enables trading of tokens between multiple sidechains without hitting mainnet.)

Here’s the thing: The Zombie Battleground Marketplace is ALREADY RUNNING on PlasmaChain as you read this.
We will also be deploying multiple testnets in the near future, which we will open to third parties to deploy their DApps.
These testnets may later evolve to become their own specialized production chains. But in the meantime, they’ll help us test third-party DApps and experiment with new features to eventually incorporate into the production PlasmaChain.
As the central hub that acts as a bridge between multiple sidechains and Ethereum, PlasmaChain will be one of the most important pieces in our vision moving forward.

# Understanding Plasma Cash

![Understanding Plasma Cash](/developers/img/plasma.jpg)

We’ve written 2 posts explaining our usage of Plasma on Loom DAppChains:

[Plasma on Loom Network DAppChains: Scalable DApps With Ethereum-Secured Assets](https://medium.com/loom-network/loom-network-plasma-5e86caaadef2)

[Practical Plasma (Volume I): Gaming—focuses on some of the real-world user benefits of securing sidechains with Plasma](https://medium.com/loom-network/practical-plasma-volume-i-gaming-9cfd3f971734)


# Loom Token

For questions about the LOOM token, we have an article specifically devoted to explaining how it works:
[LOOM Token FAQs — You got questions, we got answers!](https://medium.com/loom-network/loom-token-faqs-you-got-questions-we-got-answers-2d3c9185b4d0)