---
id: block-explorer-tutorial
title: 블록 탐색기 튜토리얼
sidebar_label: 블록 탐색기 튜토리얼
---

## 개요:

이번에는 블록 탐색기를 활용해, DAppChain에서 생성되는 블록들을 탐색하는 방법을 알아볼 예정입니다.

![](/developers/img/block_explorer.png)![](/developers/img/block_explorer_details.png)

## 온라인 탐색기

로컬 환경에서 DAppChain을 돌린 후에 [온라인 탐색기](https://basechain-blockexplorer.dappchains.com)에 접속하시면 바로 로컬에서 생성되는 블록들을 확인하실 수 있습니다.

만약 다른 머신에서 Loom DAppChain을 실행한 경우, 해당 Loom DAppChain RPC 서버 URL을 탐색기 하단에 위치한 접속 네트워크 칸에 복사해서 붙여넣으시면 됩니다. `http://YOUR_DAPP_CHAIN_SERVER_IP:46657` (포트를 변경하지 않았을 경우의 RPC URL 예제)

- 해당 서버는 외부에서 접속이 가능해야 합니다.

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

그러니 우리가 [delegatecall.com](http://blockchain.delegatecall.com)에서 했듯이 자신만의 탐색기를 만들기를 원할 수도 있습니다.

이를 위해서는 `Vue`, `Typescript`, `Google Protobuf`를 알고 있을 필요가 있습니다. 시작하기 전에 [DelagateCall 블록 탐색기](https://github.com/loomnetwork/vue-block-explorer/tree/dc-2) 코드를 참고하면 도움이 될 것입니다.

시작하기:

1. 여러분의 DApp을 위한 `.proto` 파일을 찾으세요. DApp 데이터 구조를 정의하는 파일입니다. 이 파일을 `vue-block-explorer`의 `src/pbs` 폴더에 넣습니다. 그 후 `yarn proto` 명령어를 실행합니다.(그전에 `yarn install`을 먼저 실행한 상태여야 합니다).
2. `YOUR_PROTO_FILE_NAME_pb.d.ts`와 `YOUR_PROTO_FILE_NAME_pb.js`라는 이름으로 2개의 새로운 파일이 생성됩니다.
3. `transaction-reader.ts`에서 `.proto` 파일의 클래스들을 import 합니다.

   import \* as DC from '@/pbs/YOUR_PROTO_FILE_NAME_pb'

1)  여러분은 블록 데이터를 디코드 하기위한 자신만의 protobuf 디코더를 당장 만들수도 있습니다. 서로다른 데이터에 대한 각각 다른 디코딩 함수를 작성하길 원할 수도 있습니다(*delegatecall*을 예로 들면):

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

    이런 각각의 디코딩 함수는 디코딩을 위한 상대적인 protobuf 함수를 사용합니다.

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

`run`, `build` 혹은 `format` 코드와 같은 더 많은 스크립트는, 블록 탐색기의 `README.MD` 파일에서 볼 수 있습니다.
