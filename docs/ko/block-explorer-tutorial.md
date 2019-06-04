---
id: block-explorer-tutorial
title: Block Explorer Tutorial
sidebar_label: Block Explorer Tutorial
---

## Overview

This Block Explorer helps you to check the block data on your DAppChain.

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## Online explorer

You can find it at [Loom Block Explorer](https://blockexplorer.loomx.io).

Input your Loom DAppChain RPC server URL into the bottom left corner of the list. Normally, the URL should look something like this-`http://YOUR_DAPP_CHAIN_SERVER_IP:46657`.

If you are running a Loom DAppChain on your local machine, you should just type `http://127.0.0.1:46657`. Make sure your server is accessible from outside (e.g. not blocked by a firewall).

## Local Explorer

You can also run the block explorer locally.

To get started, clone the [Vue Block Explorer repo](https://github.com/loomnetwork/vue-block-explorer):

```bash
git clone https://github.com/loomnetwork/vue-block-explorer.git
```

Then, install the dependencies and start the dev server:

```bash
yarn install
yarn run serve
```

The dev server should run at `http://127.0.0.1:8080`. If the `8080` port is used by other programs, it will pick another one.

By default, it will read block data from `http://127.0.0.1:46658`. So, if you are running the server on another IP, you can change it in the server list as in the online version.

## Search By Block Height

The explorer would show all blocks in current DAppChain. Thus, if you are running a shared blockchain, like Loom DAppChain, it'll be hard to check your own block data since there are too many blocks.

Therefore, you need to search by the `block height`:

1. Open your a terminal and `cd` into your `loom` directory (that is where you run the `loom run` command).
2. Find the blockchain log you just created. Note that the `index` is the block height.
3. In the top right corner of the block list, there is a search input. Put the block height in the input box and search for it.

## Build Your Own Explorer

The block explorer would display the block data in a raw JSON format. Normally, if your DApp data is arranged well in a valid JSON format, it would be fine. But if it's not, it will just show in a raw text view which is not easy to read.

So, you might want to build your own explorer, as we did for [delegatecall.com](http://blockchain.delegatecall.com).

To get started, you need some knowledge of `Vue`, `TypeScript` and also `Google Protobuf`. Reading the source code of the [DelegateCall Block Explorer](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) would make it easier.

Roughly, you should follow these steps:

1. Run `yarn install`.
2. Find your own `.proto` file for your DApp. This file defines your DApp data structure. Put it in the `src/pbs` directory of the `vue-block-explorer`. Then, run the following command `yarn proto`.
3. You will get 2 new files- `YOUR_PROTO_FILE_NAME_pb.d.ts` and `YOUR_PROTO_FILE_NAME_pb.js`
4. In `transaction-reader.ts`, import the classes in your `.proto` file:

    import * as DC from '@/pbs/YOUR_PROTO_FILE_NAME_pb'
    

4. Now, you can use your own protobuf decoders to decode the block data. You might want to write different decoding function for different data. Let's take *DelegateCall* as an example:
    
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
        

The repository provides you with a bunch of useful scripts such as `run`, `build` or `format`. Check out the `README.MD` file to find out more.