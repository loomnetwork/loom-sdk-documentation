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
    ['link', { rel: "icon", href: 'img/favicon/favicon.ico' }]
  ],
  theme: 'awesome',
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'English', // this will be set as the lang attribute on <html>
      title: 'Loom SDK',
      description: 'Loom Platform has generators for a default project'
    },
    '/zh-CN/': {
      lang: '中文',
      title: 'Loom SDK',
      description: 'Loom 平台具有默认项目的生成器。'
    },
    '/ko/': {
      lang: '한국어',
      title: 'Loom SDK',
      description: 'Loom 플랫폼은 기본 프로젝트를 위한 제네레이터를 제공합니다.'
    },
    '/ja/': {
      lang: '日本語',
      title: 'Loom SDK',
      description: 'Loomのプラットフォームには、デフォルトのプロジェクト用のジェネレータがあります。'
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
          }, {
            text: 'Docs',
            link: '/base-install-all'
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
            ['/events', '订阅事件'],
            ['/web3js-event-filters', 'Web3 事件过滤器']
          ]
        }, {
          title: '共识',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', '委任股权证明']
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
            ['/truffle-deploy', 'Truffle部署']
          ]
        }, {
          title: '示例游戏 & 应用程序',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy游戏'],
            ['/phaser-sdk-demo', 'Phaser SDK 演示'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets 演示'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 演示'],
            ['/simple-social-network-example', '简单的社交网络示例']
          ]
        }, {
          title: '转移网关',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', '转移网关'],
            ['/transfer-gateway-example', '转移网关示例']
          ]
        }, {
          title: '部署',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy 后端'],
            ['/multi-node-deployment', '多节点部署'],
            ['/docker-blueprint', 'Phaser Docker 示例']
          ]
        }, {
          title: '网络',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain 测试网'],
            ['/validator', '成为验证者'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: '常见问题',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'DApp链架构'],
            ['/release-notes', '发布日志'],
            ['/common-issues', '常见问题']
          ]
        }, {
          title: '高等和内部',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml 和配置选项'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPC方法'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: '区块浏览器',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', '区块浏览器教程']
          ]
        }]
      },
      '/ko/': {
        label: '한국어',
        base: '/ko',
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
          title: 'Javascript 클라이언트 SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJS & Browser 퀵스타트'],
            ['/web3js-loom-provider', 'Web3, LoomProvider and Truffle']
          ]
        }, {
          title: 'Go 컨트랙트 SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', 'Installation Go Loom SDK'],
            ['/go-loom-clients', 'DAppChain 클라이언트 구축하기'],
            ['/read-write-state', '상태를 저장하거나 읽기'],
            ['/go-loom-events', '이벤트 보내기'],
            ['/go-loom-permissions', '퍼미션 헬퍼'],
            ['/builtin-smart-contracts', '내장된 스마트 컨트랙트'],
            ['/go-events', 'Go Event Indexing'],
          ]
        }, {
          title: '게임 SDKs',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDK 퀵스타트']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', '퀵스타트'],
            ['/unity-sdk-overview', '개요'],
            ['/unity-sdk-plugin', 'Plugin 기반의 스마트 컨트랙트 퀵스타트'],
            ['/unity-sdk-evm', 'EVM 기반의 스마트 컨트랙트 퀵스타트'],
            ['/unity-sample-tiles-chain-evm', 'Tiles EVM 예제'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loom 퀵스타트'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loom 템플릿'],
          ]
        }, {
          title: '이벤트',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', '이벤트 구독'],
            ['/web3js-event-filters', 'Web3 이벤트 필터']
          ]
        }, {
          title: '컨센서스',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', '위임 지분 증명(Delegated Proof of Stake)']
          ]
        }, {
          title: '모니터링',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', '메트릭'],
            ['/logging', '로깅']
          ]
        }, {
          title: 'Solidity와 EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffle 배포']
          ]
        }, {
          title: '게임 & 앱 예제',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboy 게임'],
            ['/phaser-sdk-demo', 'Phaser SDK 데모'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websockets 데모'],
            ['/phaser-sdk-demo-websocket-web3', 'JS WebSockets + EVM Web3 데모'],
            ['/simple-social-network-example', '간단한 소셜 네트워크 예제']
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
          title: '배포',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboy 백엔드'],
            ['/multi-node-deployment', '멀티 노드 배포'],
            ['/docker-blueprint', 'Phaser Docker 예제']
          ]
        }, {
          title: '네트워크',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChain Testnets'],
            ['/validator', 'Become Validator'],
            ['/non-validator-node', 'Non Validator Node']
          ]
        }, {
          title: '자주하는 질문들',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'DAppChain 구조'],
            ['/release-notes', '릴리즈 노트'],
            ['/common-issues', '일반적인 문제점']
          ]
        }, {
          title: '고급 및 내부동작',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yaml과 설정 옵션'],
            ['/karma', '카르마'],
            ['/json-rpc-methods', 'JSON RPC 메소드'],
            ['/hsm', 'Hardware Security Modules']
          ]
        }, {
          title: '블록 탐색기',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorer 튜토리얼']
          ]
        }]
      },
      '/ja/': {
        label: '日本語',
        base: '/ja',
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
          title: 'イントロダクション',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/intro-to-loom', 'Loom SDK入門'],
            ['/base-install-all', 'Loom SDKのインストール'],
            ['/join-test-net', 'テストネットへの参加'],
            ['/extdev-transfer-gateway', 'トランスファーゲートウェイテストネット']
          ]
        }, {
          title: 'JavascriptクライアントSDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-js-quickstart', 'NodeJSとブラウザのクイックスタート'],
            ['/web3js-loom-provider', 'Web3、LoomProviderとTruffle']
          ]
        }, {
          title: 'GoコントラクトSDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/prereqs-all', 'Go Loom SDKのインストール'],
            ['/go-loom-clients', 'DAppチェーンクライアントの構築'],
            ['/read-write-state', '状態の保存と読み取り'],
            ['/go-loom-events', 'イベントの発生'],
            ['/go-loom-permissions', '権限ヘルパーの使用'],
            ['/builtin-smart-contracts', 'ビルトインのスマートコントラクト'],
            ['/go-events', 'Goイベントのインデクシング'],
          ]
        }, {
          title: 'ゲームSDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cocos-sdk-quickstart', 'Cocos SDKクイックスタート']
          ]
        }, {
          title: 'Unity SDK',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/unity-quick-start', 'Unityクイックスタート'],
            ['/unity-sdk-overview', '概要'],
            ['/unity-sdk-plugin', 'プラグインベースのスマートコントラクトクイックスタート'],
            ['/unity-sdk-evm', 'EVMベースのスマートコントラクトクイックスタート'],
            ['/unity-sample-tiles-chain-evm', 'TilesのEVMサンプル'],
            ['/unity-tuffle-loom-sample', 'Unity + Truffle + Loomクイックスタート'],
            ['/unity-truffle-loom-template', 'Unity + Truffle + Loomテンプレート'],
          ]
        }, {
          title: 'イベント',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/events', 'イベントのサブスクライブ'],
            ['/web3js-event-filters', 'Web3イベントフィルター']
          ]
        }, {
          title: 'コンセンサス',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/delegated-proof-of-stake', 'Delegated Proof of Stake']
          ]
        }, {
          title: 'モニタリング',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/metrics', 'メトリクス'],
            ['/logging', 'ロギング']
          ]
        }, {
          title: 'Solidity & EVM',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/evm', 'EVM'],
            ['/truffle-deploy', 'Truffleデプロイ']
          ]
        }, {
          title: 'サンプルゲーム＆アプリ',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-game', 'Etherboyゲーム'],
            ['/phaser-sdk-demo', 'Phaser SDKのデモ'],
            ['/phaser-sdk-demo-websocket', 'Phaser + Websocketsのデモ'],
            ['/phaser-sdk-demo-websocket-web3', 'JS Websocket + EVM Web3 デモ'],
            ['/simple-social-network-example', 'シンプルなソーシャルネットワークのサンプル']
          ]
        }, {
          title: 'トランスファーゲートウェイ',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/transfer-gateway', 'トランスファーゲートウェイ'],
            ['/transfer-gateway-example', 'Transfer Gatewayサンプル']
          ]
        }, {
          title: 'デプロイ',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/etherboy-backend', 'Etherboyバックエンド'],
            ['/multi-node-deployment', 'マルチノードデプロイメント'],
            ['/docker-blueprint', 'Phaser Dockerサンプル']
          ]
        }, {
          title: 'ネットワーク',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/testnets-plasma', 'PlasmaChainテストネット'],
            ['/validator', 'バリデーターになるには'],
            ['/non-validator-node', '非バリデーターのノード']
          ]
        }, {
          title: 'よくある質問',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/arch', 'DAppチェーンのアーキテクチャ'],
            ['/release-notes', 'リリースノート'],
            ['/common-issues', 'よくある問題点']
          ]
        }, {
          title: 'さらなる詳細と内部',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/loom-yaml', 'Loom Yamlと設定オプション'],
            ['/karma', 'Karma'],
            ['/json-rpc-methods', 'JSON RPCメソッド'],
            ['/hsm', 'ハードウェアセキュリティモジュール']
          ]
        }, {
          title: 'Block Explorer',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/block-explorer-tutorial', 'Block Explorerチュートリアル']
          ]
        }]
      }
    }
  }
}