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

Once the client gets instantiated, we must force personal sign by pretending to be MetaMask no matter what the web3 provider actually is:

```js
let provider = this.web3js.currentProvider
provider.isMetaMask = true
const ethersProvider = new ethers.providers.Web3Provider(provider)
```

Next, let's call the `createDefaultTxMiddleware` function as follows:

```js
this.client.txMiddleware = createDefaultTxMiddleware(this.client, privateKey)
```

This allows us to create the default set of tx middleware required to successfully commit transactions to Loom.

### Configuring LoomProvider

Now, we want to instantiate and configure `LoomProvider`:

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

Note that we're using the `SignedEthTxMiddleware` which lets us sign transactions via an Ethereum compatible wallet like Metamask.

### Instantianting the contract

For the scope of this example, we are using the [SimpleStore](https://github.com/loomnetwork/eth-signing-demo/blob/master/truffle/contracts/SimpleStore.sol) smart contract. Instantiating it is as simple as:

```js
const web3 = new Web3(this.loomProvider)
this.contract = new web3.eth.Contract(SimpleStoreJSON.abi, SimpleStoreJSON.networks[this.networkId].address)
```

### Universal transaction signing in action

Now, to execute the `set` method of our smart contract, we can do something like this:

```js
await this.contract.methods
  .set(value)
  .send({
    from: this.ethAddress
  })
```

If everything works well you should see a Metamask popup asking you to confirm the transaction:

![Eth Signing](/developers/img/eth-signing-metamask-popup.gif)

Note that you just signed transactions on Loom without even accessing your eth wallet keys😉.

### Demo Project

We've built a small demo project to showcase this functionality. The source code is available [here](https://github.com/loomnetwork/Eth-Signing-Demo).

### Other Wallets

If you use Portis or Fortmatic, head over to [this page](others.html).