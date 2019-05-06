module.exports = {
  base: '/developers/',
  markdown: {
    // options for markdown-it-anchor
    anchor: {
      permalink: false
    },
    // options for markdown-it-toc
    toc: {
      includeLevel: [1, 2]
    },
    extendMarkdown: md => {
      // use more markdown-it plugins!
    }
  },
  theme: 'awesome',
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'English', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh-CN/': {
      lang: '中文',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/ko/': {
      lang: '한국어',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/ja/': {
      lang: '日本語',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    locales: {
      // The key is the path for the locale to be nested under.
      // As a special case, the default locale can use '/' as its path.
      '/': {
        label: 'English', // this will be set as the lang attribute on <html>
        nav: [{
            text: 'Home',
            link: '/'
          }
        ],
        sidebar: [{
          title: 'Introduction',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/intro-to-loom', 'Intro Loom SDK'],
            ['/base-install-all', 'Installation Loom SDK'],
            ['/join-test-net', 'Join Testnets'],
            ['/extdev-transfer-gateway', 'Transfer Gateway Testnet Tutorial']
          ]
        }, {
          title: 'Javascript Client SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJS & Browser Quick Start'],
            ['/web3js-loom-provider', 'Web3, LoomProvider and Truffle']
          ]
        }, {
          title: 'Go Contract SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', 'Installation Go Loom SDK'],
            ['/go-loom-clients', 'Building DAppChain Clients'],
            ['/read-write-state', 'Saving and reading state'],
            ['/go-loom-events', 'Emitting events'],
            ['/go-loom-permissions', 'Permission Helpers'],
            ['/builtin-smart-contracts', 'Built-in Smart Contracts'],
            ['/go-events', 'Go Event Indexing'],
          ]
        }, {
          title: 'Game SDKs',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDK Quickstart']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', 'Quick Start'],
            ['/unity-sdk-overview', 'Overview'],
            ['/unity-sdk-plugin', 'Plugin-based Smart Contract Quickstart'],
            ['/unity-sdk-evm', 'EVM-based Smart Contract Quickstart'],
            ['/unity-sample-tiles-chain-evm', 'Tiles EVM Example'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loom Quick Start'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loom Template'],
          ]
        }, {
          title: 'Events',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', 'Subscribing to events'],
            ['/web3js-event-filters', 'Web3 event filters']
          ]
        }, {
          title: 'Consensus',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', 'Delegated Proof of Stake']
          ]
        }, {
          title: 'Monitoring',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', 'Metrics'],
            ['/logging', 'Logging']
          ]
        }, {
          title: 'Solidity & EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffle Deploy']
          ]
        }, {
          title: 'Example Games & Apps',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy Game'],
            ['/phaser-sdk-demo', 'Phaser SDK Demo'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets Demo'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 Demo'],
            ['/simple-social-network-example', 'Simple Social Network Example']
          ]
        }, {
          title: 'Transfer Gateway',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', 'Transfer Gateway'],
            ['/transfer-gateway-example', 'Transfer Gateway Example']
          ]
        }, {
          title: 'Deployment',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy Backend'],
            ['/multi-node-deployment', 'Multi Node Deployment'],
            ['/docker-blueprint', 'Phaser Docker Exaample']
          ]
        }, {
          title: 'Networks',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain Testnets'],
            ['/validator', 'Become Validator'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: 'Frequently Asked Questions',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'Architecture of a DAppChain'],
            ['/release-notes', 'Release Notes'],
            ['/common-issues', 'Common Issues']
          ]
        }, {
          title: 'Advanced and Internal',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml and Configuration options'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPC Methods'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: 'Block Explorer',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorer Tutorial']
          ]
        }]
      },
      '/zh-CN/': {
        label: '中文',
        base: '/zh-CN',
        nav: [{
            text: 'Home',
            link: '/'
          },
        ],
        sidebar: [{
          title: '介绍',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/intro-to-loom', '介绍 Loom SDK'],
            ['/base-install-all', '安装 Loom SDK'],
            ['/join-test-net', '加入测试网'],
            ['/extdev-transfer-gateway', '转移网关']
          ]
        }, {
          title: 'Javascript 客户端 SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJS & 浏览器快速启动'],
            ['/web3js-loom-provider', 'Web3, LoomProvider 和 Truffle']
          ]
        }, {
          title: 'Go 合约 SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', '安装 Go Loom SDK'],
            ['/go-loom-clients', '构建DApp链客户端'],
            ['/read-write-state', '保存和读取状态'],
            ['/go-loom-events', '发送事件'],
            ['/go-loom-permissions', '权限助手'],
            ['/builtin-smart-contracts', '内置智能合约'],
            ['/go-events', 'Go Event Indexing'],
          ]
        }, {
          title: '游戏 SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDK快速上手']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', '快速入门'],
            ['/unity-sdk-overview', '概述'],
            ['/unity-sdk-plugin', '基于插件的智能合约快速入门'],
            ['/unity-sdk-evm', '基于EVM的智能合约快速入门'],
            ['/unity-sample-tiles-chain-evm', '图块EVM示例'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loom快速入门'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loom 模版'],
          ]
        }, {
          title: '事件',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', 'Subscribing to events'],
            ['/web3js-event-filters', 'Web3 event filters']
          ]
        }, {
          title: '共识',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', 'Delegated Proof of Stake']
          ]
        }, {
          title: '监测',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', '度量'],
            ['/logging', '日志']
          ]
        }, {
          title: 'Solidity & EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffle Deploy']
          ]
        }, {
          title: '示例游戏 & 应用程序',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy Game'],
            ['/phaser-sdk-demo', 'Phaser SDK Demo'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets Demo'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 Demo'],
            ['/simple-social-network-example', 'Simple Social Network Example']
          ]
        }, {
          title: 'Transfer Gateway',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', 'Transfer Gateway'],
            ['/transfer-gateway-example', 'Transfer Gateway Example']
          ]
        }, {
          title: '部署',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy Backend'],
            ['/multi-node-deployment', '多节点部署'],
            ['/docker-blueprint', 'Phaser Docker Exaample']
          ]
        }, {
          title: '网络',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain Testnets'],
            ['/validator', 'Become Validator'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: '常见问题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'Architecture of a DAppChain'],
            ['/release-notes', 'Release Notes'],
            ['/common-issues', 'Common Issues']
          ]
        }, {
          title: '高等和内部',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml and Configuration options'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPC Methods'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: '区块浏览器',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorer Tutorial']
          ]
        }]
      },
      '/ko/': {
        lang: '한국어',
        title: 'VuePress',
        description: 'Vue 驱动的静态网站生成器',
        nav: [{
            text: 'Home',
            link: '/'
          },
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'External',
            link: 'https://google.com'
          },
        ],
        sidebar: [{
          title: 'Introduction',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/intro-to-loom', 'Intro Loom SDK'],
            ['/base-install-all', 'Installation Loom SDK'],
            ['/join-test-net', 'Join Testnets'],
            ['/extdev-transfer-gateway', 'Transfer Gateway Testnet Tutorial']
          ]
        }, {
          title: 'Javascript Client SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJS & Browser Quick Start'],
            ['/web3js-loom-provider', 'Web3, LoomProvider and Truffle']
          ]
        }, {
          title: 'Go Contract SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', 'Installation Go Loom SDK'],
            ['/go-loom-clients', 'Building DAppChain Clients'],
            ['/read-write-state', 'Saving and reading state'],
            ['/go-loom-events', 'Emitting events'],
            ['/go-loom-permissions', 'Permission Helpers'],
            ['/builtin-smart-contracts', 'Built-in Smart Contracts'],
            ['/go-events', 'Go Event Indexing'],
          ]
        }, {
          title: 'Game SDKs',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDK Quickstart']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', 'Quick Start'],
            ['/unity-sdk-overview', 'Overview'],
            ['/unity-sdk-plugin', 'Plugin-based Smart Contract Quickstart'],
            ['/unity-sdk-evm', 'EVM-based Smart Contract Quickstart'],
            ['/unity-sample-tiles-chain-evm', 'Tiles EVM Example'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loom Quick Start'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loom Template'],
          ]
        }, {
          title: 'Events',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', 'Subscribing to events'],
            ['/web3js-event-filters', 'Web3 event filters']
          ]
        }, {
          title: 'Consensus',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', 'Delegated Proof of Stake']
          ]
        }, {
          title: 'Monitoring',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', 'Metrics'],
            ['/logging', 'Logging']
          ]
        }, {
          title: 'Solidity & EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffle Deploy']
          ]
        }, {
          title: 'Example Games & Apps',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy Game'],
            ['/phaser-sdk-demo', 'Phaser SDK Demo'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets Demo'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 Demo'],
            ['/simple-social-network-example', 'Simple Social Network Example']
          ]
        }, {
          title: 'Transfer Gateway',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', 'Transfer Gateway'],
            ['/transfer-gateway-example', 'Transfer Gateway Example']
          ]
        }, {
          title: 'Deployment',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy Backend'],
            ['/multi-node-deployment', 'Multi Node Deployment'],
            ['/docker-blueprint', 'Phaser Docker Exaample']
          ]
        }, {
          title: 'Networks',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain Testnets'],
            ['/validator', 'Become Validator'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: 'Frequently Asked Questions',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'Architecture of a DAppChain'],
            ['/release-notes', 'Release Notes'],
            ['/common-issues', 'Common Issues']
          ]
        }, {
          title: 'Advanced and Internal',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml and Configuration options'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPC Methods'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: 'Block Explorer',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorer Tutorial']
          ]
        }]
      },
      '/ja/': {
        lang: '日本語',
        title: 'VuePress',
        description: 'Vue 驱动的静态网站生成器',
        nav: [{
            text: 'Home',
            link: '/'
          },
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'External',
            link: 'https://google.com'
          },
        ],
        sidebar: [{
          title: 'Introduction',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/intro-to-loom', 'Intro Loom SDK'],
            ['/base-install-all', 'Installation Loom SDK'],
            ['/join-test-net', 'Join Testnets'],
            ['/extdev-transfer-gateway', 'Transfer Gateway Testnet Tutorial']
          ]
        }, {
          title: 'Javascript Client SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJS & Browser Quick Start'],
            ['/web3js-loom-provider', 'Web3, LoomProvider and Truffle']
          ]
        }, {
          title: 'Go Contract SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', 'Installation Go Loom SDK'],
            ['/go-loom-clients', 'Building DAppChain Clients'],
            ['/read-write-state', 'Saving and reading state'],
            ['/go-loom-events', 'Emitting events'],
            ['/go-loom-permissions', 'Permission Helpers'],
            ['/builtin-smart-contracts', 'Built-in Smart Contracts'],
            ['/go-events', 'Go Event Indexing'],
          ]
        }, {
          title: 'Game SDKs',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDK Quickstart']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', 'Quick Start'],
            ['/unity-sdk-overview', 'Overview'],
            ['/unity-sdk-plugin', 'Plugin-based Smart Contract Quickstart'],
            ['/unity-sdk-evm', 'EVM-based Smart Contract Quickstart'],
            ['/unity-sample-tiles-chain-evm', 'Tiles EVM Example'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loom Quick Start'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loom Template'],
          ]
        }, {
          title: 'Events',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', 'Subscribing to events'],
            ['/web3js-event-filters', 'Web3 event filters']
          ]
        }, {
          title: 'Consensus',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', 'Delegated Proof of Stake']
          ]
        }, {
          title: 'Monitoring',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', 'Metrics'],
            ['/logging', 'Logging']
          ]
        }, {
          title: 'Solidity & EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffle Deploy']
          ]
        }, {
          title: 'Example Games & Apps',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy Game'],
            ['/phaser-sdk-demo', 'Phaser SDK Demo'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets Demo'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 Demo'],
            ['/simple-social-network-example', 'Simple Social Network Example']
          ]
        }, {
          title: 'Transfer Gateway',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', 'Transfer Gateway'],
            ['/transfer-gateway-example', 'Transfer Gateway Example']
          ]
        }, {
          title: 'Deployment',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy Backend'],
            ['/multi-node-deployment', 'Multi Node Deployment'],
            ['/docker-blueprint', 'Phaser Docker Exaample']
          ]
        }, {
          title: 'Networks',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain Testnets'],
            ['/validator', 'Become Validator'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: 'Frequently Asked Questions',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'Architecture of a DAppChain'],
            ['/release-notes', 'Release Notes'],
            ['/common-issues', 'Common Issues']
          ]
        }, {
          title: 'Advanced and Internal',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml and Configuration options'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPC Methods'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: 'Block Explorer',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorer Tutorial']
          ]
        }]
      }
    }
  }
}