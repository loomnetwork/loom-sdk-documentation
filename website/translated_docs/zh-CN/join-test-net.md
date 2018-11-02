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

# 如何使用 Karma faucet

1. 访问 [Karma Faucet](https://faucet.dappchains.com) 网站   
      
      
    ![图片](/developers/img/faucet/1.png)   
      
      
    
2. 在 recipient address 栏内填入你的 `公共地址`，它与你的truffle账户相同。   
      
      
    ![图片](/developers/img/faucet/2.png)   
      
      
    
3. 选择你想要部署合约的测试网网络   
      
      
    ![图片](/developers/img/faucet/3.png)   
      
      
    
4. 点击 `request` 按钮   
      
      
    ![图片](/developers/img/faucet/4.png)   
      
      
    
5. 在你部署合约到选择的测试网之前，确保有出现 `faucet-karma`   
      
      
    ![图片](/developers/img/faucet/5.png)

# 将Truffle示例部署到测试网

1. 确保你已安装了节点和 yarn/npm
2. 从[PlasmaChain测试网](testnet-plasma.html)页面获取测试网网址
3. 获取来源: 
        bash
        git clone https://github.com/loomnetwork/truffle-dappchain-example
        cd truffle-dappchain-example
        # copy the private key generated earlier to the root directory of the example repo
        cp ../priv_key extdev_private_key

4. 如果想将示例合约部署到 `extdev-plasma-us1`, 请跳过此步骤。否则，将你想部署到的网络添加到 `truffle-config.js` 中。
5. 安装节点模块: 
        bash
        yarn

6. 运行部署: 
        bash
        yarn deploy:extdev 如果你没有karma，这里会报错 
    
    `Failed to commit Tx: origin has no karma` 所以你需要从这里获取karma： [Karma Faucet](http://faucet.dappchains.com)