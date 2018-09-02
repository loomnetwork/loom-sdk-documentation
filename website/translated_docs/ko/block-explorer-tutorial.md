---
id: block-explorer-tutorial
title: 블록 탐색기 튜토리얼
sidebar_label: 블록 탐색기 튜토리얼
---
## 개요:

이번에는 블록 탐색기를 활용해, DAppChain에서 생성되는 블록들을 탐색하는 방법을 알아볼 예정입니다.

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## 온라인 탐색기

로컬 환경에서 DAppChain을 돌린 후에 [온라인 탐색기](https://blockexplorer.loomx.io)에 접속하시면 바로 로컬에서 생성되는 블록들을 확인하실 수 있습니다.

만약 다른 머신에서 Loom DAppChain을 실행한 경우, 해당 Loom DAppChain RPC 서버 URL을 탐색기 하단에 위치한 접속 네트워크 칸에 복사해서 붙여넣으시면 됩니다. `http://YOUR_DAPP_CHAIN_SERVER_IP:46657` (포트를 변경하지 않았을 경우의 RPC URL 예제)

+ 설정한 서버에 외부에서 접속이 가능해야 합니다.

## 로컬 탐색기

로컬에서 탐색기를 직접 실행할 수도 있습니다.

Github에서 블록 탐색기 저장소를 클론하세요. 

    git clone https://github.com/loomnetwork/vue-block-explorer.git
    

이후 yarn을 통해서 필요한 모듈들을 설치한 후 dev 서버를 실행합니다:

    yarn install
    yarn run serve
    

Dev 서버는 `http://127.0.0.1:8080`에서 실행되고 있을 것입니다. 8080번 포트를 다른 프로그램이 사용하고 있다면 다른 포트를 사용하고 있을 것입니다.

기본적으로 탐색기는 `http://127.0.0.1:46658`에서 블록 데이터를 읽어옵니다. 만약 다른 IP의 서버에서 실행 중이라면, 온라인 버전처럼 서버 리스트를 변경할 수 있습니다.

## Block Height로 검색하기

블록 탐색기는 현재 DAppChain의 모든 블록을 보여줍니다. 따라서 Loom DAppChain과 같은 공용 블록체인을 실행 중인 경우, 블록이 너무 많기 때문에 자신만의 블록을 확인하기는 쉽지 않습니다.

따라서 `block height`로 검색할 필요가 있습니다.

1. Loom 터미널(`loom run` 명령어를 실행했던 곳)을 엽니다.
2. 생성했던 블록체인 로그에서, `index`가 block height입니다.
3. 블록 리스트 우측 상단에 있는 검색창에 해당 block height를 입력합니다.

## 자신만의 탐색기 만들기

블록 탐색기는 블록 데이터를 JSON 양식을 그대로 보여줍니다:

일반적으로 데이터가 유효한 JSON 양식에 맞춰져 있으면 문제가 없지만, 그렇지 않다면 텍스트 뷰를 통해 표시되어 읽기 쉽지 않을 것입니다.

그런 상황을 대비해서 [delegatecall.com](http://blockchain.delegatecall.com) 처럼 커스터마이징 할 수 있습니다.

`Vue`, `Typescript`, `Google Protobuf` 에 대한 지식이 있으면, 얼마든지 수정하실 수 있습니다. 시작하시기전에 [DelagateCall Block Explorer](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) 코드도 한번 참고해보세요.

수정해보기:

1. 디앱의 데이터 구조를 정의하는 파일인 `.proto` 파일을 찾은 후 `vue-block-explorer` 에 있는 `src/pbs` 폴더에 복사해줍니다. 그 후 `yarn proto` 명령어를 실행해줍니다. (`yarn install`을 꼭 미리 실행 해주셔야 합니다.)
2. 2개의 새로운 파일이 `YOUR_PROTO_FILE_NAME_pb.d.ts` 과 `YOUR_PROTO_FILE_NAME_pb.js` 라는 이름으로 생성됩니다.
3. 마지막으로 텍스트 에디터로 `transaction-reader.ts` 파일을 열어서 아래처럼 `.proto` 파일을 import 해준 후 저장 합니다.

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