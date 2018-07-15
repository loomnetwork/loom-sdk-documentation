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

別のマシン上でLoom DAppチェーンを実行している場合は、Loom DAppチェーンRPCサーバーのURLを、リストの左下隅に入力しよう。通常は次のURLとなる: `http://YOUR_DAPP_CHAIN_SERVER_IP:46657` 

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

エクスプローラーは現在のDAppチェーンないの全てのブロックを表示する。もしLoom DAppチェーンのような共有ブロックチェーンを実行中なら、数が多すぎて、あなた自身のブロックデータをチェックするのは難しくなるだろう。

それゆえ`block height`で検索する必要がある。 1. loomターミナルを開く(`loom run`コマンドを実行している場所) 2. あなたが今作ったブロックチェーンログを探す 3. ブロックリストの右上で検索の入力にブロック高を入力して検索する。

## あなた自身のエクスプローラーをビルドする

ブロックエクスプローラーはブロックデータを生のJSONで以下のように表示する。

通常、あなたのDAppデータは有効なJSONフォーマットで配置され、有効である。しかし、そうでないなら、生のテキストで表示され可読性がない。

そのためあなたは私たちが行ったのと同様に自身のエクスプローラーをビルドしたくなるだろう、 [delegatecall.com](http://blockchain.delegatecall.com)。

開始するためにはあなたは `Vue`、 `TypeScript` 、 `Google Protobuf` について知る必要がある。 ソースを読むには [DelagateCall ブロックエクスプローラー](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2)が理解しやすい。

まず始めに: 1. あなた自身のDAppのための `.proto` ファイルを探し、 DAppのデータ構造を定義する。 それを`vue-block-explorer`の`src/pbs`フォルダーに置く。 そして、 `yarn proto`を実行する (すでに`yarn install` を実行済みと想定)。 2. あなたは以下の２つの新しいファイルを得る `YOUR_PROTO_FILE_NAME_pb.d.ts` 、 `YOUR_PROTO_FILE_NAME_pb.js` 3. `transaction-reader.ts`の中で `.proto` ファイルの中のクラスをインポートする:

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
        

More scripts like `run`, `build` or `format` the code, you can read the `README.MD` file in the block explorer.