---
id: basic-install-all
title: Loom SDKのインストール
sidebar_label: Loom SDKのインストール
---

# Loomのインストールとセットアップ

現在LoomをWindowsで使うには、[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)を使用するのが唯一の方法である。

これをインストールしたら、 下記の通り実行しよう。

## Loomをダウンロード

次のスクリプトは、現在のディレクトリへ自動的にLoomの安定的なバージョンをダウンロードする：

```bash
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

## 初期化

Loomを初期化するには、以下のようにタイプしよう:

```bash
./loom init
```

## ブロックチェーンの起動

インストール手順で作成したディレクトリ内から以下のコマンドで実行する：

```bash
./loom run
```

## Solidity + Truffleでスタートするには

[TruffleとSolidity](join-testnet.html)のチュートリアルを参照すること。

## Golangコントラクトでスタートするには

[Golangコントラクト](prereqs-all.html)を参照すること。

## ユニバーサルトランザクション署名でスタートするには

Loomメインネットは、ネイティブのEthereumウォレットで署名されたトランザクションの検証と受容が可能である。 簡単に言うと、ユーザーはMetaMaskアカウントもしくはネイティブのEthereumウォレットを使うだけでよく、さらにレイヤー１とレイヤー２の境界線を融合させることが可能だ。

次のセクションでは、ユニバーサルトランザクション署名をアプリ内で有効にするために必要なセットアップを簡潔に取り上げていこう。

### Loomへの接続

まずはじめに行いたいのは、新たな`Client`のインスタンス化である:

```js
this.client = new Client(
  this.chainId,
  this.writeUrl,
  this.readUrl
)
```

clientがインスタンス化されると、実際のweb3プロバイダがどんなものであったとしても、MetaMaskであるかのように個人署名を実行しなくてはならない:

```js
let provider = this.web3js.currentProvider
provider.isMetaMask = true
const ethersProvider = new ethers.providers.Web3Provider(provider)
```

次は、以下のようにして `createDefaultTxMiddleware`関数を呼び出そう:

```js
this.client.txMiddleware = createDefaultTxMiddleware(this.client, privateKey)
```

こうして、トランザクションをうまくLoomにコミットするのに必要となるトランザクションミドルウェアのデフォルトセットを作成する。

### LoomProviderの構成

今度は`LoomProvider`のインスタンス化と構成を行いたい:

```js
this.loomProvider = new LoomProvider(this.client, privateKey)
this.loomProvider.callerChainId = this.callerChainId
this.loomProvider.setMiddlewaresForAddress(to.local.toString(), [
  new NonceTxMiddleware(
    new Address(this.callerChainId, LocalAddress.fromHexString(this.ethAddress)),
    this.client
  ),
  new SignedEthTxMiddleware(signer)
])
```

我々は`SignedEthTxMiddleware`を使用しており、これはMetaMaskのようなEthereum互換ウォレットを使ってトランザクションへの署名を可能にするということに注意しよう。

### コントラクトのインスタンス化

例として、[SimpleStore](https://github.com/loomnetwork/eth-signing-demo/blob/master/truffle/contracts/SimpleStore.sol)スマートコントラクトを使用している。 インスタンス化はこのように簡単にできる:

```js
const web3 = new Web3(this.loomProvider)
this.contract = new web3.eth.Contract(SimpleStoreJSON.abi, SimpleStoreJSON.networks[this.networkId].address)
```

### ユニバーサルトランザクション署名の実行

では今度は以下のようにして、我々のスマートコントラクトにある`set`メソッドを実行することができる:

```js
await this.contract.methods
  .set(value)
  .send({
    from: this.ethAddress
  })
```

全てがうまく動いている場合、MetaMaskのポップアップでトランザクションの承認を尋ねられるはずだ:

![Eth Signing](/developers/img/eth-signing-metamask-popup.gif)

ETHウォレットの鍵にアクセスすることすらなく、Loom上でトランザクション署名を行ったことに注目しよう😉。

### デモプロジェクト

この機能をお見せするために、小さなデモプロジェクトを作成した。 ソースコードは[こちら](https://github.com/loomnetwork/Eth-Signing-Demo)から利用可能だ。

### 他のウォレット

PortisやFortmaticをお使いであれば、[このページ](others.html)を見てみよう。