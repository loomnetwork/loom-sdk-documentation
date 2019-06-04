---
id: docker-blueprint-phaser
title: Phaser Docker Example
sidebar_label: Phaser Docker Example
---

## Phaser Docker Example

We have public Docker containers to run DappChain and demos directly. All you need is Docker installed.

The Docker images are built each time the code is updated, so it is always current.

> Note: The commands below expose all available ports, but that may not be needed all the time.

## [Phaser SDK Demo](https://github.com/loomnetwork/phaser-sdk-demo)

Considering that this is run on the local machine, without any other web server running at port 80:

```bash
docker run -d -p 46656:46656  -p 46658:46658  loomnetwork/weave-blueprint:latest

docker run -d -p 80:3000 loomnetwork/phaser-sdk-demo:latest
```

If there is a web server running on the same host, the container for `phaser-sdk-demo` can be run with `-p 127.0.0.1:3000:3000` and configure the web server as a reverse proxy to port 3000 (or any other free port).

It is important for the web browser to be able to access the web sockets running in the `weave-blueprint` container.

The docker run parameter `-p` can be manipulated further according to needs.

## [Docker Images](https://hub.docker.com/r/loomnetwork/)

If you want to pull the individual images

[Loom Base](https://hub.docker.com/r/loomnetwork/loom/)

[Blueprint Contract](https://hub.docker.com/r/loomnetwork/weave-blueprint/)

[Phaser SDK UI Example](https://hub.docker.com/r/loomnetwork/phaser-sdk-demo)