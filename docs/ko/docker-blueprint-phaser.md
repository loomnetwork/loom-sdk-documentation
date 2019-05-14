---
id: docker-blueprint-phaser
title: Phaser Docker 예제
sidebar_label: Phaser Docker 예제
---
우리는 DAppChain과 데모를 직접 구동하기 위한 퍼블릭 도커 컨테이너를 가지고 있습니다. 여러분이 해야 할 일은 도커를 설치하는 것뿐입니다.

도커 이미지는 코드가 업데이트 될 때마다 만들어지며, 그렇기 때문에 항상 최신입니다.

주의: 아래 커맨드는 사용 가능한 모든 포트를 노출시킵니다만, 이들이 항상 모두 필요한 것은 아닙니다.

## [Phaser SDK 데모](https://github.com/loomnetwork/phaser-sdk-demo)

로컬 머신에서 구동되고 80번 포트에서 실행중인 웹 서버가 없다는 것을 가정합니다:

```bash
docker run -d -p 46656:46656  -p 46658:46658  loomnetwork/weave-blueprint:latest

docker run -d -p 80:3000 loomnetwork/phaser-sdk-demo:latest
```

만약 같은 호스트에 웹서버가 구동되고 있다면, `phaser-sdk-demo`를 위한 컨테이너는 `-p 127.0.0.1:3000:3000`를 통해서 실행할 수 있고 웹서버를 포트 3000번(또는 다른 비어있는 포트)에 대한 리버스 프록시로 설정합니다.

웹 브라우저가 `weave-blueprint` 컨테이너에서 구동되는 websocket에 접근할 수 있는 것은 매우 중요합니다.

도커 실행 파라미터 `-p`는 필요에 따라 추가적으로 변경될 수 있습니다.

## [도커 이미지](https://hub.docker.com/r/loomnetwork/)

개별 이미지를 가져오고 싶으시면

[Loom Base](https://hub.docker.com/r/loomnetwork/loom/)

[Blueprint 컨트랙트](https://hub.docker.com/r/loomnetwork/weave-blueprint/)

[Phaser SDK UI 예제](https://hub.docker.com/r/loomnetwork/phaser-sdk-demo)