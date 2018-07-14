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

To get started, clone the repo from our Github:

    git clone https://github.com/loomnetwork/vue-block-explorer.git
    

Then install the dependencies and start the dev server:

    yarn install
    yarn run serve
    

The dev server should run at `http://127.0.0.1:8080`, if the `8080` port is used by other programs, it will pick another one.

By default, it will read block data from `http://127.0.0.1:46657`, if you are running the server on another IP, you can change it in the server list as in online version.

## Search By Block Height

The explorer would show all blocks in current DApp Chain, so if you are running a shared blockchain, like running Loom DApp Chain, it'll be hard to check your own block data since there are too many of them.

Therefore you need to search by the `block height`: 1. Open your loom terminal (where you run the `loom run` command) 2. Find the blockchain log you just created, the `index` is the block height 3. In the top right corner of the block list, there is a search input, put the block height and search it.

## Build Your Own Explorer

The block explorer would display the block data in a raw JSON view, like this:

Normally if your DApp data is arranged well in valid JSON format, it would be fine. But if it's not, it will just show in a raw text view and not easy to read.

So you might want to build your own explorer, just like what we did for [delegatecall.com](http://blockchain.delegatecall.com).

You need to know `Vue`, `TypeScript` and also `Google Protobuf` to start. Reading the source code of [DelagateCall Block Explorer](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) would make it easier.

To get started: 1. Find your own `.proto` file for your DApp.It defined your DApp data structure. Put it in the `src/pbs` folder of the `vue-block-explorer`. then run `yarn proto` (assume you already run `yarn install` before). 2. You will get 2 new files `YOUR_PROTO_FILE_NAME_pb.d.ts` and `YOUR_PROTO_FILE_NAME_pb.js` 3. In `transaction-reader.ts`, import the classes in your `.proto` file:

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