---
id: docker
title: Running in Docker
sidebar_label: Running in Docker
---

# Running in Docker

We have public Docker containers to run DappChain and demos directly. All you need is Docker installed.

The Docker images are built each time the code is updated, so it is always current.

Note: The commands below exposes all available ports, but that may not be needed all the time.

## Loom (DappChain)

```bash
docker run -d -p 46656:46656 -p 46657:46657 -p 46658:46658 -p 9999:9999 loomnetwork/loom:latest
```

## [Weave Blueprint](https://github.com/loomnetwork/weave-blueprint)

```bash
docker run -d -p 46656:46656 -p 46657:46657 -p 46658:46658 -p 9999:9999 loomnetwork/weave-blueprint:latest
```

## [Phaser SDK Demo](https://github.com/loomnetwork/phaser-sdk-demo)

Considering that this is run on local machine, without any other web server running at port 80:

```bash
docker run -d -p 46656:46656 -p 46657:46657 -p 46658:46658 -p 9999:9999 loomnetwork/weave-blueprint:latest

docker run -d -p 80:3000 loomnetwork/phaser-sdk-demo:latest
```

If there is a web server running on the same host, the container for `phaser-sdk-demo` can be run with `-p 127.0.0.1:3000:3000` and configure the web server as reverse proxy to port 3000 (or any other free port).

It is important for the web browser to be able to access the websockets running in the `weave-blueprint` container.

The docker run parameter `-p` can be manipulated further according to needs.
