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

因此，你需要按 `block height`: 1 来搜索。 打开你的 loom 终端（运行 `loom run` 命令的地方） 2. 找到你刚刚创建的区块链日志，`index` 就是区块高度 3. 在区块列表的右上角, 有一个搜索输入框, 填入区块高度并搜索它。

## 构建你自己的浏览器

区块浏览器将在原始 JSON 视图中显示区块数据，如下所示：

通常，如果你的 DApp 数据排列良好，采用有效的 JSON 格式，那就没问题了。 但如果不是，它只会在原始文本视图中显示而且不易阅读。

因此，你可能希望构建自己的区块浏览器，就像我们为 [delegatecall.com](http://blockchain.delegatecall.com) 所做的那样。

你需要了解 `Vue`, `TypeScript` 和 `Google Protobuf` 才能开始。 阅读 [DelagateCall Block Explorer](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) 的源代码，能让事情变得容易一些。

开始吧： 1. 找到你的 DApp 的 `.proto` 文件。它定义了你的 DApp数据结构。 把它放入 `vue-block-explorer` 的 `src/pbs` 文件夹中。 然后运行 `yarn proto` （假定你之前已经运行了 `yarn install`）。 2. 你会收到2个新文件`YOUR_PROTO_FILE_NAME_pb.d.ts` 和 `YOUR_PROTO_FILE_NAME_pb.js`。 3. 在 `transaction-reader.ts` 中，引入你的 `.proto` 文件中的类。

    import * as DC from '@/pbs/YOUR_PROTO_FILE_NAME_pb'
    

1. 你现在可以使用自己的 protobuf 解码器来解码区块数据。 你可能希望为不同的数据编写不同的解码函数（以 *delegatecall* 为例）：
    
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
        
    
    对于每一个解码函数，使用相应的 protobuf 函数进行解码：
    
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
        

更多的脚本，像 `run`, `build` 或 `format` 代码，你可以阅读区块浏览器中的 `README.MD` 文件。