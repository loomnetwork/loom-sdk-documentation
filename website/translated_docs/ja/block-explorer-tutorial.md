---
id: block-explorer-tutorial
title: Block Explorerチュートリアル
sidebar_label: Block Explorerチュートリアル
---
## 概要:

このBlock Explorerは、DAppチェーン上のブロックデータチェックに役立ちます。 

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## オンラインエクスプローラー

[Loom Block Explorer](https://blockexplorer.loomx.io)にアクセスするだけでよい。 DAppチェーンをローカルマシンで実行している場合は、こちらでブロックデータを参照しよう。

If you are running Loom DAppChain on another machine, you can input your Loom DAppChain RPC server URL into the bottom left corner of the list, Normally the URL should be `http://YOUR_DAPP_CHAIN_SERVER_IP:46657`.

あなたのサーバーが外部よりアクセス可能であることを確認しよう。

## ローカルエクスプロラー

Block explorer はローカルで実行することも可能だ。

Githubのリポジトリをクローンしてスタートしよう:

    git clone https://github.com/loomnetwork/vue-block-explorer.git
    

その後依存ファイルをインストールし、開発サーバーをスタートしよう:

    yarn install
    yarn run serve
    

Devサーバーは以下で実行し `http://127.0.0.1:8080`, もし`8080` ポートが他のプログラムで使われていたら別のものを選ぶ。

デフォルトでは、ブロックデータを以下から読み取り`http://127.0.0.1:46657`, もしサーバを他のIPで実行中なら、オンラインバージョンのサーバーリストの中から変更可能。

## ブロック高で検索

The explorer would show all blocks in current DAppChain, so if you are running a shared blockchain, like running Loom DAppChain, it'll be hard to check your own block data since there are too many of them.

Therefore you need to search by the `block height`:

1. Open your loom terminal (where you run the `loom run` command)
2. Find the blockchain log you just created, the `index` is the block height
3. In the top right corner of the block list, there is a search input, put the block height and search it.

## あなた自身のエクスプローラーをビルドする

ブロックエクスプローラーはブロックデータを生のJSONで以下のように表示する。

通常、あなたのDAppデータは有効なJSONフォーマットで配置され、有効である。しかし、そうでないなら、生のテキストで表示され可読性がない。

そのためあなたは私たちが行ったのと同様に自身のエクスプローラーをビルドしたくなるだろう、 [delegatecall.com](http://blockchain.delegatecall.com)。

開始するためにはあなたは `Vue`、 `TypeScript` 、 `Google Protobuf` について知る必要がある。 ソースを読むには [DelagateCall ブロックエクスプローラー](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2)が理解しやすい。

To get started:

1. Find your own `.proto` file for your DApp.It defined your DApp data structure. Put it in the `src/pbs` folder of the `vue-block-explorer`. then run `yarn proto` (assume you already run `yarn install` before).
2. You will get 2 new files `YOUR_PROTO_FILE_NAME_pb.d.ts` and `YOUR_PROTO_FILE_NAME_pb.js`
3. In `transaction-reader.ts`, import the classes in your `.proto` file:

    import * as DC from '@/pbs/YOUR_PROTO_FILE_NAME_pb'
    

1. You can use your own protobuf decoders to decode the block data now. You might want to write different decoding function for different data(take *delegatecall* for example):
    
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
        
    
    For each of these decoding functions, use relative protobuf function to decode:
    
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