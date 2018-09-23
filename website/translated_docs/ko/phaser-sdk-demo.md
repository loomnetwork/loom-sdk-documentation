---
id: phaser-sdk-demo
title: Phaser SDK 데모
sidebar_label: Phaser SDK 데모
---
![Game screenshot](/developers/img/screenshot.png)

[Phaser](http://phaser.io)와 [Loom.js](https://github.com/loomnetwork/loom-js)를 사용해서 Loom DappChain과 상호작용하는 간단한 HTML5 게임을 보여주는 기본적인 예제입니다. 소스코드는 [Github](https://github.com/loomnetwork/phaser-sdk-demo)에서 확인 가능합니다

## 게임 방법

이동을 위해서 방향키를 사용하고, 윗 방향키를 눌러서 점프를 하세요. 각 행을 통과할때마다, 1점이 부여됩니다. 보너스 스타를 모아서 여러분의 점수를 더 끌어올리세요.

## 개발하기

1.) 여러분만의 DappChain을 실행하세요

Loom 설치하기

```bash
wget https://private.delegatecall.com/loom/osx/build-404/loom
chmod +x loom

mkdir contracts
wget -O contracts/blueprint.0.0.1 https://private.delegatecall.com/weave-blueprint/osx/build-9/blueprint.0.0.1
chmod +x contracts/blueprint.0.0.1

./loom init
cp ../genesis.example.json genesis.json
```

Blockchain 구동하기

    ./loom run
    

여러분만의 DappChain을 실행하는 방법에 대한 더 자세한 사항은 [Loom SDK 문서](https://loomx.io/developers/docs/en/prereqs.html)를 참조하세요.

2.) 개발 server를 시작하세요

개발 server 구동하기

    #소스 가져오기
    git clone https://github.com/loomnetwork/phaser-sdk-demo.git
    
    cd phaser-sdk-demo
    
    # 설치하기
    yarn
    
    # protobuff를 컴파일한다
    yarn run proto
    
    # dev server를 구동한다
    yarn run dev