---
id: 블록 익스플로러 튜토리얼
title: 블록 익스플로러 튜토리얼
sidebar_label: 블록 익스플로러 튜토리얼
---
## 개요:

이번에는 블록 익스플로러를 활용해, 디앱체인에서 생성되는 블록들을 탐색하는 방법을 알아볼 예정입니다.

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## 공식 온라인 익스플로러

로컬 환경에서 룸 디앱체인을 돌린 후에 [룸 공식 온라인 익스플로어](https://blockexplorer.loomx.io)에 접속하시면 바로 로컬에서 생성되는 블록들을 확인하실 수 있습니다.

만약에 클라우드서버 등 다른 머신에서 룸 디앱체인을 실행하고 계실 경우에는 해당 머신의 룸 디앱체인과 연결되는 RPC URL을 익스플로러 하단에 위치한 접속 네트워크 칸에 복사해서 붙여넣으시면 됩니다. `http://YOUR_DAPP_CHAIN_SERVER_IP:46657` (포트를 변경하지 않았을 경우의 RPC URL 예제)

+ AWS등 클라우드 서버일 경우 네트워크 설정에서 외부접속이 허용되도록 해주셔야합니다.

## 로컬 익스플로러

사전에 말씀드린 공식 온라인 익스플로러를 거치지 않고, 로컬에서 익스플로러를 직접 실행 하실 수 도 있습니다.

아래의 블록 익스플로러 깃헙 레포를 클론 한 후

    git clone https://github.com/loomnetwork/vue-block-explorer.git
    

Then install the dependencies and start the dev server:

    yarn install
    yarn run serve
    

The dev server should run at `http://127.0.0.1:8080`, if the `8080` port is used by other programs, it will pick another one.

By default, it will read block data from `http://127.0.0.1:46658`, if you are running the server on another IP, you can change it in the server list as in online version.

## Search By Block Height

The explorer would show all blocks in current DAppChain, so if you are running a shared blockchain, like running Loom DAppChain, it'll be hard to check your own block data since there are too many of them.

Therefore you need to search by the `block height`:

1. Open your loom terminal (where you run the `loom run` command)
2. Find the blockchain log you just created, the `index` is the block height
3. In the top right corner of the block list, there is a search input, put the block height and search it.

## Build Your Own Explorer

The block explorer would display the block data in a raw JSON view, like this:

Normally if your DApp data is arranged well in valid JSON format, it would be fine. But if it's not, it will just show in a raw text view and not easy to read.

So you might want to build your own explorer, just like what we did for [delegatecall.com](http://blockchain.delegatecall.com).

You need to know `Vue`, `TypeScript` and also `Google Protobuf` to start. Reading the source code of [DelagateCall Block Explorer](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) would make it easier.

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
        

More scripts like `run`, `build` or `format` the code, you can read the `README.MD` file in the block explorer.