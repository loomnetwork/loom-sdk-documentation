---
id: join-testnet
title: 加入测试网
sidebar_label: 加入测试网
---
这篇文档帮助开发人员了解如何加入PlasmaChain测试网进行部署。 如果你要找如何运行节点的信息，或者如何成为验证者，请查看[验证者指南](validator.html)。

**环境依赖**

- 已安装Loom （查看 [安装说明](https://loomx.io/developers/docs/en/basic-install-osx.html#installation) ）

```bash
 curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
```

**如何用Loom生成私钥并获得你的公共地址**

    $ ./loom genkey -k priv_key -a pub_key
    

结果

```bash
local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
```

这将创建名为 `priv_key` 和 `pub_key` 的文件， `priv_key` 文件里包含你将用来把合同部署到DApp链的私钥。


# Deploy Truffle Example to a Testnet

1. Make sure you have node and yarn/npm installed
2. Obtain the testnet URL from [PlasmaChain Testnets](testnet-plasma.html) page
3. Get the source: 
        bash
        git clone https://github.com/loomnetwork/truffle-dappchain-example
        cd truffle-dappchain-example
        # copy the private key generated earlier to the root directory of the example repo
        cp ../priv_key extdev_private_key

4. If you wish to deploy the example contracts to `extdev-plasma-us1` skip this step. Otherwise, add the network you wish to deploy to in `truffle-config.js`.
5. Install node modules: 
        bash
        yarn

6. Run deploy: 
        bash
        yarn deploy:extdev
