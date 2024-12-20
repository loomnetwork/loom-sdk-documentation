module.exports = {
    base: '/developers/',
    SEARCH_MAX_SUGGESTIONS: 10,
    plugins: ['@vuepress/active-header-links'],
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
            description: 'Loom Developer Documentation. Learn all you need to know about building your own DApps on top of Basechain.',
        },
        '/zh-CN/': {
            lang: 'zh-CN',
            title: 'Loom SDK',
            description: 'Loom开发文档：学习关于在Basechain上构建dapp所需的全部知识。',
        },
        '/ko/': {
            lang: 'ko',
            title: 'Loom SDK',
            description: '이 페이지는 Loom 개발자 문서입니다. Loom 플라즈마체인상에 여러분의 DApp을 구축하기 위해 알아야 하는 모든 것들을 이 문서를 통해 배워보세요!',
        },
        '/ja/': {
            lang: 'ja',
            title: 'Loom SDK',
            description: 'Loom 開発者ドキュメント。LoomのBasechain上でのdapp開発に必要な全てを学びましょう。',
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
        nav: [{
            text: 'Blog',
            link: 'https://medium.com/loom-network',
        }, ],
        logo: '/img/loom-api-logo.png',
        sidebar: [{
                title: 'Start Here',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/intro-to-loom', 'Intro to Loom Network'],
                    ['/deploy-zkloom-testnet', 'Deploying to zkLoom Testnet'],
                    ['/deploy-loom-mainnet', 'Deploying to Basechain'],
                    ['/basic-install-all', 'Setup Local Loom Chain'],
                    ['/how-to-develop-locally', 'How to Develop Locally']
                ],
            },
            {
                title: 'Javascript Client SDK',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/zkloom-js-quickstart', 'zkLoom Quick Start'],
                    ['/loom-js-quickstart', 'Loom Quick Start'],
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
                children: [
                    ['/delegated-proof-of-stake', 'delegated-proof-of-stake']
                ],
            },
            {
                title: 'Monitoring',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/metrics', 'Metrics'],
                    ['/logging', 'Logging']
                ],
            },
            {
                title: 'Solidity & EVM',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/evm', 'EVM'],
                    ['/truffle-deploy', 'Truffle Deploy']
                ],
            },
            {
                title: 'Transfer Gateway',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/transfer-gateway', 'Transfer Gateway'],
                    ['/transfer-gateway-example', 'Transfer Gateway Examples'],
                ],
            },
            {
                title: 'Deployment',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/multi-node-deployment', 'Multi Node Deployment'],
                ],
            },
            {
                title: 'Networks',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/testnet-zkloom', 'zkLoom Testnet'],
                    ['/testnet-plasma', 'Extdev Testnet'],
                    ['/mainnet-plasma', 'Basechain'],
                    ['/validator', 'Become Validator'],
                    ['/non-validator-node', 'Non Validator Node'],
                    ['/jump-start-plasma', 'Basechain Jump Start'],
                    ['/jump-start-extdev-plasma-us1', 'Extdev Jump Start'],
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
                title: 'Binance Integration',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/deposit-and-withdraw-bnb', 'Deposit and Withdraw BNB'],
                    ['/deposit-and-withdraw-bep2', 'Deposit and Withdraw BEP2'],
                    ['/binance-loom-ethereum', 'Move tokens between Binance, Loom, and Ethereum'],
                ],
            },
            {
                title: 'Frequently Asked Questions',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/arch', 'arch'],
                    ['/how-to-get-started', 'How to Get Started '],
                    ['/how-to-get-contracts-verified', 'How to Get Contracts Verified'],
                    ['/how-to-loom-js-webpack', 'How to Use loom-js with Webpack'],
                    ['how-to-receive-funds-using-payable-functions', 'How to Receive Funds Using Payable Functions'],
                    ['/how-to-prepare-for-the-transfer-gateway-update', 'How to Prepare for the Transfer Gateway Update'],
                    ['/top-erc20s', 'Top ERC20s Deployed to Loom'],
                    ['/common-issues', 'Common Issues'],
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
                    ['/dapp-metrics-website-info', 'DApp Metrics Website Info']
                ],
            },
            {
                title: 'Others',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/others', 'Other Wallets'],
                    ['/withdrawing-and-claiming-rewards', 'Validators - Withdrawing and Claiming Rewards'],
                    ['/use-remix-with-loom', 'How to Use Remix with Loom'],
                    ['/relentless', 'How to Set-up Relentless']
                ],
            },
            {
                title: 'Release Notes',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    ['/basechain-release-notes', 'Basechain'],
                    ['/extdev-release-notes', 'Extdev'],
                    ['/release-notes', 'Generic']
                ],
            },
        ],
    },
    ga: "UA-108071653-1"
}