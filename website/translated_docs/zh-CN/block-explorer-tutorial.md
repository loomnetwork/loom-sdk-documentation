---
id: block-explorer-tutorial
title: 区块浏览器教程
sidebar_label: 区块浏览器教程
---
## 概述:

此区块浏览器帮助你检查你的 DApp 链上的区块数据。

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## 在线浏览器

你可以访问 [Loom 区块浏览器](https://blockexplorer.loomx.io), 如果你在本地计算机上运行了 Loom DApp 链，你将在那里看到区块数据。

如果你在另一台机器上运行 Loom DApp 链，可以在列表的左下角输入你的 Loom DApp 链 RPC 服务器 URL，通常 URL 应该是`http://YOUR_DAPP_CHAIN_SERVER_IP:46657`.

请确保你的服务器可以从外部访问。

## 本地浏览器

你也可以在本地运行区块浏览器。

一开始，先从我们的 Github 复制代码库

    git clone https://github.com/loomnetwork/vue-block-explorer.git
    

然后安装依赖项并启动开发服务器:

    yarn install
    yarn run serve
    

开发服务器会运行在 `http://127.0.0.1:8080`，如果 `8080` 端口被其他程序使用，则会选择另一个。

默认情况下, 它将从 `http://127.0.0.1:46657`中读取区块数据, 如果你在另一个 IP 上运行服务器, 则可以在服务器列表中将其更改为在线版本。

## 按区块高度搜索

浏览器会显示当前 DApp 链中的所有区块，因此，如果你运行的是共享型区块链，比如说 Loom DApp 链，则很难查看你自己的区块数据，因为区块数量庞大。

因此，你需要按 `block height`: 1 来搜索。 打开你的 loom 终端（运行 `loom run` 命令的地方） Find the blockchain log you just created, the `index` is the block height 3. In the top right corner of the block list, there is a search input, put the block height and search it.

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