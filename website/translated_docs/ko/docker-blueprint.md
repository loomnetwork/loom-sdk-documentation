---
id: docker-blueprint-phaser
title: Phaser Docker 예제
sidebar_label: Phaser Docker 예제
---
우리는 DappChain과 데모를 직접 구동하기 위한 공용 도커 컨테이너를 가지고 있습니다. 여러분이 필요한 것이라곤 도커를 설치하는 것 뿐입니다.

도커 이미지는 코드가 업데이트 될때마다 빌드되어 집니다, 그렇기 때문에 항상 최신입니다.

주의: 아래 커맨드는 모든 가용한 포트를 노출시킵니다, 그러나 항상 필요한 것은 아닙니다.

## [Phaser SDK 데모](https://github.com/loomnetwork/phaser-sdk-demo)

로컬 머신에서 구동되고 80번 포트에서 실행중인 웹 서버가 없다는 것을 가정합니다:

```bash
docker run -d -p 46656:46656  -p 46658:46658  loomnetwork/weave-blueprint:latest

docker run -d -p 80:3000 loomnetwork/phaser-sdk-demo:latest
```

If there is a web server running on the same host, the container for `phaser-sdk-demo` can be run with `-p 127.0.0.1:3000:3000` and configure the web server as reverse proxy to port 3000 (or any other free port).

It is important for the web browser to be able to access the websockets running in the `weave-blueprint` container.

The docker run parameter `-p` can be manipulated further according to needs.

## [Docker Images](https://hub.docker.com/r/loomnetwork/)

If you want to pull the individual images

[Loom Base](https://hub.docker.com/r/loomnetwork/loom/)

[Blueprint Contract](https://hub.docker.com/r/loomnetwork/weave-blueprint/)

[Phaser SDK UI Example](https://hub.docker.com/r/loomnetwork/phaser-sdk-demo)