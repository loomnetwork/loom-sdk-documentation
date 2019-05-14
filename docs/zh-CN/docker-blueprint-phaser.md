---
id: docker-blueprint-phaser
title: Phaser Docker 示例
sidebar_label: Phaser Docker 示例
---
我们有公共的Docker容器来直接运行Dapp链及演示程序。 你所要做的就只是需要安装Docker。

每次更新代码时都会构建Docker镜像，所以它永远是最新的。

注意：下面的命令公开了所有可用的端口，但可能并非总是需要。

## [Phaser SDK 演示](https://github.com/loomnetwork/phaser-sdk-demo)

考虑到这是在本地计算机上运行的, 并没有任何其他web服务器在端口80上运行：

```bash
docker run -d -p 46656:46656  -p 46658:46658  loomnetwork/weave-blueprint:latest

docker run -d -p 80:3000 loomnetwork/phaser-sdk-demo:latest
```

如果在同一主机上运行web服务器，则 `phaser-sdk-demo` 的容器可以使用 `-p 127.0.0.1: 3000:3000`运行，并将web服务器配置为与端口 3000 (或任何其他可用端口) 的反向代理。

Web浏览器能够访问`weave-blueprint`容器中运行的websockets很重要。

Docker运行的参数`-p`可以根据需要进一步操纵。

## [Docker图像](https://hub.docker.com/r/loomnetwork/)

如果你想拉出个别图像

[Loom基础](https://hub.docker.com/r/loomnetwork/loom/)

[蓝图合约](https://hub.docker.com/r/loomnetwork/weave-blueprint/)

[Phaser SDK UI示例](https://hub.docker.com/r/loomnetwork/phaser-sdk-demo)