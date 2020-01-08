---
id: block-explorer-tutorial
title: Block Explorerチュートリアル
sidebar_label: Block Explorerチュートリアル
---

## 概要:

この Block Explorer は、DApp チェーン上のブロックデータチェックに役立ちます。

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## オンラインエクスプローラー

[Loom Block Explorer](https://basechain-blockexplorer.dappchains.com)にアクセスするだけでよい。 DApp チェーンをローカルマシンで実行している場合は、こちらでブロックデータを参照しよう。

別のマシン上で Loom DApp チェーンを実行している場合は、Loom DApp チェーン RPC サーバーの URL を、リストの左下隅に入力しよう。通常は次の URL となる: `http://YOUR_DAPP_CHAIN_SERVER_IP:46657`

あなたのサーバーが外部よりアクセス可能であることを確認しよう。

## ローカルエクスプロラー

Block explorer はローカルで実行することも可能だ。

Github のリポジトリをクローンしてスタートしよう:

    git clone https://github.com/loomnetwork/vue-block-explorer.git

その後依存ファイルをインストールし、開発サーバーをスタートしよう:

    yarn install
    yarn run serve

Dev サーバーは以下で実行し `http://127.0.0.1:8080`, もし`8080` ポートが他のプログラムで使われていたら別のものを選ぶ。

デフォルトでは、ブロックデータを以下から読み取り`http://127.0.0.1:46658`, もしサーバを他の IP で実行中なら、オンラインバージョンのサーバーリストの中から変更可能。

## ブロック高で検索

エクスプローラーは現在の DApp チェーンないの全てのブロックを表示する。もし Loom DApp チェーンのような共有ブロックチェーンを実行中なら、数が多すぎて、あなた自身のブロックデータをチェックするのは難しくなるだろう。

それゆえ`block height`で検索する必要がある。

1. 1. loom ターミナルを開く(`loom run`コマンドを実行している場所)
2. 2. あなたが今作ったブロックチェーンログを探す
3. 3. ブロックリストの右上で検索の入力にブロック高を入力して検索する。

## あなた自身のエクスプローラーをビルドする

ブロックエクスプローラーはブロックデータを生の JSON で以下のように表示する。

通常、あなたの DApp データは有効な JSON フォーマットで配置され、有効である。しかし、そうでないなら、生のテキストで表示され可読性がない。

そのためあなたは私たちが行ったのと同様に自身のエクスプローラーをビルドしたくなるだろう、 [delegatecall.com](http://blockchain.delegatecall.com)。

開始するためにはあなたは `Vue`、 `TypeScript` 、 `Google Protobuf` について知る必要がある。 ソースを読むには [DelagateCall ブロックエクスプローラー](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2)が理解しやすい。

まず始めに:

1. 1. あなた自身の DApp のための `.proto` ファイルを探し、 DApp のデータ構造を定義する。 それを`vue-block-explorer`の`src/pbs`フォルダーに置く。 そして、 `yarn proto`を実行する (すでに`yarn install` を実行済みと想定)。
2. あなたは以下の２つの新しいファイルを得る `YOUR_PROTO_FILE_NAME_pb.d.ts` 、 `YOUR_PROTO_FILE_NAME_pb.js`
3. 3. `transaction-reader.ts`の中で `.proto` ファイルの中のクラスをインポートする:

   import \* as DC from '@/pbs/YOUR_PROTO_FILE_NAME_pb'

1)  ブロックデータを今デコードするためにあなた自身の protobuf デコーダーを使うことができる。 異なるデータ( 例えば*delegatecall*) のためにデーコード関数を書きたいかもしれない。

        function readDCProtoData(cmc: ContractMethodCall): DelegateCallTx {
          const methodName = cmc.toObject().method
          const dataArr = cmc.toArray()[1]
          switch (methodName) {
            case 'CreateAccount':
              return readCreateAccountTxPayload(dataArr)
            case 'Vote':
              return readVoteTxPayload(dataArr)
            case 'CreateQuestion':
            case 'CreateAnswer':
            case 'CreateComment':
              return readPostCommentTxPayload(dataArr)
            case 'AcceptAnswer':
              return readAcceptAnswerTxPayload(dataArr)
          }
          throw new UnsupportedTxTypeError()
        }

    それぞれのデコード関数のために、関係のある protobuf 関数をデコードするのに使う

        function readVoteTxPayload(r: Uint8Array): IVoteTx {
          const DCVoteTX = DC.DelegatecallVoteTx.deserializeBinary(r).toObject()
          const voteTX = DCVoteTX.voteTx!
          return {
            txKind: TxKind.Vote,
            comment_permalink: voteTX.commentPermalink.trim(),
            voter: voteTX.voter,
            up: voteTX.up
          }
        }

以下のような追加のスクリプト `run`, `build`、 `format` コードは、ブロックエクスプローラの`README.MD` ファイルで読むことができる。
