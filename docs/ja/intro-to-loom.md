---
id: intro-loom-sdk
title: Loom Networkとは?
sidebar_label: Loom SDK入門
---
![Loom Networkとは?](/developers/docs/img/what-is-loom.png)

LoomネットワークはEthereumのスケールを手助けするための基本的なインフラのプラットフォームを構築している。 それは大規模なスケールでのアプリケーションを開発者が実行できるようにし、プロダクションで動く最初のEthereumのスケーリングの解決方法となる。

簡単に言うと、LoomネットワークはEthereum上のEOSであると考えられる。

## Loom SDK

我々のコアプロダクトはSDKで開発者がすぐに自身のブロックチェーンをその基盤を理解する必要なく構築できるようにする。 「自分のブロックチェーンの構築する」ジェネレーターの様な物と考えて欲しい。

## DAppChains: それぞれ独自のSidechain上に乗ったDApp

Loom SDKはDAppChain(Ethereumをベースレイヤーとして使うレイヤー2のブロックチェーン) と呼ばれる物を生成する。 各DApp毎に独自のEthereumのサイドチェーンを実行する事は数々の利点があり、最も重要な事は: DAppChainは高いスケーラビリティのための最適な(DPoSなどの) コンセンサスルールを代替し利用可能である事だ。 Ethereumをベースレイヤーとして利用する事はDAppChainベースのアセット(ERC20やERC721トークンなど) が特にPlasmaに裏付けられたEthereum上でセキュリティの保証を持つ事ができる事を意味する。

## DPoS = 非常にスケーラブルなDApps

我々のSDKにより、開発者は自身のDAppsの要求に合わせてスケーラビリティとセキュリティのトレードオフをカスタマイズするために自身でコンセンサスアルゴリズムとルールセットを選ぶ事が可能になる 自由な発想で我々はDPoS (Delegated Proof of Stake) をサポートしている、それは大規模なオンラインゲームとソーシャルアプリを可能にする —その２つの初期のタイプのDAppsに我々はフォーカスしている(ただし、どんなタイプのDAppもLoom SDK上に作る事ができる）。 Ethereum上のプラズマによりセキュアにされたDappChainはプラズマベースのリレーを使いアセットをEthereumから出し入れし転送し、Ethereumがセキュアな状態の時にERC20とERC721トークンをDappChain上で使う事を可能する。 簡単に言うと、Loom SDKによって開発者はEOS上で作るであろうアプリと同じタイプの物を作れる様になり、しかしEthereumに裏づけられている。

# ダップチェーンの理解

我々のスケーリングとダップチェーンの利点についてのコアの理論をより理解するために2つのブログの投稿を読む。

[ダップチェーン: サイドチェーンを介したEthereum DAppsのスケーリング](https://medium.com/loom-network-japanese/dappチェーン-f40b5783fb6e)

[Ethereum上の百万人のユーザーのDApps: アプリケーション固有のサイドチェーン入門](https://medium.com/loom-network-japanese/イーサリアム上100万ユーザーdapps-分散型アプリケーション-bcd004ff03ed)

# PlasmaChain

## PlasmaChain: Plasma Cashに裏打ちされたサイドチェーンとEthereumメインネット間のトランザクションハブ

数ヶ月前、我々はZombieChain: “イーサリアムdapps用のeosスタイルdposサイドチェーン” を発表した。 この発表以来、ZombieChainは大幅に発展している。 何があったのかというと、我々はZombieChain上にZombie Battleground用のマーケットプレイスを作り始めた。そして機能リストが膨らんでいくにつれて、このチェーンは当初思っていたよりももっと大きなものになる可能性を秘めていることに我々は気づいた。 そのためこのチェーンをアップグレードして、我々の将来的なビジョンにおいてもっと重要な役割を担うようにすることにした。つまりこのチェーンはトークントランザクションのハブとなり、Plasma CashによりEthereumと接続されたものとなるのだ。 これはEthereumメインネットの橋であり、ビルトインの分散型取引所(DEX)を備えているというふうに考えてみよう。そして他のサイドチェーンもそのDEXを使って、高速で安価なトランザクションをメインネットに触れることなく利用できるのだ。 こんな価値ある役割には、価値ある名前が必要だ。 こうして我々は、ZombieChainを “PlasmaChain” へとリブランディングすることに決めた。

![PlasmaChain](/developers/docs/img/plasmachain_diagram.png)

PlasmaChain: 以前ZombieChainとして知られていたサイドチェーン。

### こういった機能がPlasmaChainに構築される:

* ネイティブなETH、ERC20及びNFT (ERC721) をサポートするメインネットへのPlasma Cashリンク
* ビルトインのDEX / マーケットプレイス機能
* ETH 及びLOOM でのネイティブペイメント
* 今後 BTC ペイメントとの統合を計画
* PlasmaChainを親チェーンとして、『レイヤー3』チェーンへのPlasma Cashリンクが可能となるように計画。 (『サイドチェーンのサイドチェーン』であると考えよう。そこではPlasmaChainを交換所として、メインネットに触れることなく複数サイドチェーン間のトークン取引が可能となる。) 

重要: あなたがこれを読んでいる今も、Zombie Battlegroundのマーケットプレイスはすでに稼働中なのだ。 また近い将来、複数テストネットの デプロイを予定している。これらはサードパーティーに公開され、彼らは自身のDAppsのデプロイが可能となる。 これらのテストネットは今後、独自の特色を持った本番チェーンへと発展していくかもしれない。 だがそれまでは、サードパーティーのDAppsをテストしたり、新たな機能を最終的に本番のPlasmaChainへと組み込むための実験を行ったりするために役立てていく。 複数サイドチェーンとEthereum間の橋のように機能するハブとして、PlasmaChainは前進を続ける我々のビジョンにおける最重要な部分の１つとなっていく。

# Plasma Cashの理解

![Plasma Cashの理解](/developers/docs/img/plasma.jpg)

Loom DAppチェーンでのPlasmaの使用について説明した２つの記事がある:

[Loom Network DAppチェーン上のPlasma: アセットがEthereumに守られているスケーラブルなDApps](https://medium.com/loom-network-japanese/loom-network-plasma-f21e58a57b6f)

[実践的Plasma (Volume I): ゲーミング— サイドチェーンの安全性をPlasmaで守ることでもたらされる現実的なユーザーのメリットについてフォーカス](https://medium.com/loom-network-japanese/実践的plasma-vol-1-ゲーミング-26d9dc7b5f95)

# Loomトークン

LOOMトークンについての質問は、その仕組みを説明している専用記事があるので参照すること: [LOOM Tokenの FAQ — 皆さんからの質問にお答えします！](https://medium.com/loom-network-japanese/loom-tokenの-faq-45b18afa1474)