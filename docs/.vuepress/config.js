module.exports = {
  base: '/developers/',
  SEARCH_MAX_SUGGESTIONS: 10,
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
  head: [
    ['link', {
      rel: "icon",
      href: '/img/favicon/favicon.ico'
    }]
  ],
  locales: {
    '/': {
      lang: 'en',
      title: 'Loom SDK',
      description: 'Loom Platform has generators for a default project'
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      title: 'Loom SDK',
      description: 'Loom 平台具有默认项目的生成器。'
    },
    '/ko/': {
      lang: 'ko',
      title: 'Loom SDK',
      description: 'Loom 플랫폼은 기본 프로젝트를 위한 제네레이터를 제공합니다.'
    },
    '/ja/': {
      lang: 'ja',
      title: 'Loom SDK',
      description: 'Loomのプラットフォームには、デフォルトのプロジェクト用のジェネレータがあります。'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'English',
        label: 'English'
      },
      '/zh-CN/': {
        selectText: '中文',
        label: '中文',
      },
      '/ko/': {
        selectText: '한국어',
        label: '한국어'
      },
      '/ja/': {
        selectText: '日本語',
        label: '日本語'
      }
    },
    nav: [{
      text: 'Docs',
      link: '/base-install-all'
    }, {
      text: 'Blog',
      link: 'https://medium.com/loom-network'
    }],
    logo: "/img/loom-api-logo.png",
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
        ['/arch', 'arch'],
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