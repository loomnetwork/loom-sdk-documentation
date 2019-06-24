module.exports = {
  base: '/developers/',
  SEARCH_MAX_SUGGESTIONS: 10,
  plugins: ['vuepress-plugin-nprogress', '@vuepress/active-header-links'],
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/img/favicon/favicon.ico',
      },
    ],
    ['script', { src: 'https://buttons.github.io/buttons.js' }],
    ['script', { src: '/js/drip.js' }],
  ],
  locales: {
    '/en/': {
      lang: 'en',
      title: 'Loom SDK',
      description:
        'Loom Developer Documentation. Learn all you need to know about building your own DApps on top of Loom PlasmaChain.',
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      title: 'Loom SDK',
      description:
        'Loom开发文档：学习关于在Loom PlasmaChain上构建DApp所需的全部知识。',
    },
    '/ko/': {
      lang: 'ko',
      title: 'Loom SDK',
      description:
        '이 페이지는 Loom 개발자 문서입니다. Loom 플라즈마체인상에 여러분의 DApp을 구축하기 위해 알아야 하는 모든 것들을 이 문서를 통해 배워보세요!',
    },
    '/ja/': {
      lang: 'ja',
      title: 'Loom SDK',
      description:
        'Loom 開発者ドキュメント。LoomのPlasmaChain上でのDApp開発に必要な全てを学びましょう。',
    },
  },
  themeConfig: {
    locales: {
      '/en/': {
        selectText: 'English',
        label: 'English',
      },
      '/zh-CN/': {
        selectText: '中文',
        label: '中文',
      },
      '/ko/': {
        selectText: '한국어',
        label: '한국어',
      },
      '/ja/': {
        selectText: '日本語',
        label: '日本語',
      },
    },
    nav: [
      {
        text: 'Blog',
        link: 'https://medium.com/loom-network',
      },
    ],
    logo: '/img/loom-api-logo.png',
    sidebar: [
      {
        title: 'Introduction',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/intro-to-loom', 'Intro Loom SDK'],
          ['/basic-install-all', 'Installation Loom SDK'],
          ['/join-testnet', 'Join Testnets'],
          ['/extdev-transfer-gateway', 'extdev-transfer-gateway'],
        ],
      },
      {
        title: 'Javascript Client SDK',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/loom-js-quickstart', 'NodeJS & Browser Quick Start'],
          ['/web3js-loom-provider-truffle', 'Web3, LoomProvider and Truffle'],
        ],
      },
      {
        title: 'Go Contract SDK',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/prereqs-all', 'Installation Go Loom SDK'],
          ['/go-loom-clients', 'Building DAppChain Clients'],
          ['/goloomstate', 'Saving and reading state'],
          ['/goloomevents', 'Emitting events'],
          ['/goloompermissions', 'Permission Helpers'],
          ['/builtin', 'builtin'],
          ['/go-events', 'Go Event Indexing'],
        ],
      },
      {
        title: 'Game SDKs',
        collapsable: true,
        sidebarDepth: 1,
        children: [['/cocos-sdk-quickstart', 'Cocos SDK Quickstart']],
      },
      {
        title: 'Unity SDK',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/unity-quick-start', 'Quick Start'],
          ['/unity-sdk-overview', 'Overview'],
          ['/unity-sdk-plugin', 'Plugin-based Smart Contract Quickstart'],
          ['/unity-sdk-evm', 'EVM-based Smart Contract Quickstart'],
          ['/unity-sample-tiles-chain-evm', 'Tiles EVM Example'],
          ['/unity-truffle-loom-sample', 'Unity + Truffle + Loom Quick Start'],
          ['/unity-truffle-loom-template', 'Unity + Truffle + Loom Template'],
        ],
      },
      {
        title: 'Events',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/loomevents', 'Subscribing to events'],
          ['/web3js-event-filters', 'Web3 event filters'],
        ],
      },
      {
        title: 'Consensus',
        collapsable: true,
        sidebarDepth: 1,
        children: [['/delegated-proof-of-stake', 'delegated-proof-of-stake']],
      },
      {
        title: 'Monitoring',
        collapsable: true,
        sidebarDepth: 1,
        children: [['/metrics', 'Metrics'], ['/logging', 'Logging']],
      },
      {
        title: 'Solidity & EVM',
        collapsable: true,
        sidebarDepth: 1,
        children: [['/evm', 'EVM'], ['/truffle-deploy', 'Truffle Deploy']],
      },
      {
        title: 'Example Games & Apps',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/etherboy-game', 'Etherboy Game'],
          ['/phaser-sdk-demo', 'Phaser SDK Demo'],
          ['/phaser-sdk-demo-websocket', 'Phaser + Websockets Demo'],
          ['/phaser-sdk-demo-web3-websocket', 'JS WebSockets + EVM Web3 Demo'],
          ['/simple-social-network-example', 'Simple Social Network Example'],
        ],
      },
      {
        title: 'Transfer Gateway',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/transfer-gateway', 'Transfer Gateway'],
          ['/transfer-gateway-example', 'Transfer Gateway Example'],
        ],
      },
      {
        title: 'Deployment',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/etherboy-backend', 'Etherboy Backend'],
          ['/multi-node-deployment', 'Multi Node Deployment'],
          ['/docker-blueprint-phaser', 'Phaser Docker Example'],
        ],
      },
      {
        title: 'Networks',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/testnet-plasma', 'PlasmaChain Testnets'],
          ['/validator', 'Become Validator'],
          ['/non-validator-node', 'Non Validator Node'],
        ],
      },
      {
        title: 'Top ERC20s',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/top-erc20s', 'Top ERC20s Deployed to Loom'],
        ],
      },
      {
        title: 'Tron Integration',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/deposit-and-withdraw-trx', 'Deposit and Withdraw TRX'],
        ],
      },
      {
        title: 'Frequently Asked Questions',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/arch', 'arch'],
          ['/release-notes', 'Release Notes'],
          ['/common-issues', 'common-issues'],
        ],
      },
      {
        title: 'Advanced and Internal',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/loom-yaml', 'Loom Yaml and Configuration options'],
          ['/karma', 'Karma'],
          ['/json-rpc-methods', 'JSON RPC Methods'],
          ['/hsm', 'Hardware Security Modules'],
        ],
      },
      {
        title: 'Block Explorer',
        collapsable: true,
        sidebarDepth: 1,
        children: [['/block-explorer-tutorial', 'Block Explorer Tutorial']],
      },
    ],
  },
}
