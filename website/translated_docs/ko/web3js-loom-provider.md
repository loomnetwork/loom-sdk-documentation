---
id: web3js-loom-provider-truffle
title: Web3, LoomProvider, Truffle
sidebar_label: Web3, LoomProvider, Truffle
---
## 개요

`loom-js`는`LoomProvider`와 함께 제공되므로 여러분이 [Web3.js](https://github.com/ethereum/web3.js)를 가지고 통합하는 것을 가능하게 해줍니다, 이것은 Loom DAppChain에 탑재된 [EVM](evm.html)과 함께 통합하는 것이 손쉬워 집니다, 또한 테스트, 배포, 그리고 solidity 스마트 컨트랙트를 관리하기 위해서 [Truffle Framework](http://truffleframework.com/)의 사용이 가능합니다.

### Web3

`Web3.js` 공식 문서에는 이렇게 언급되어 있습니다:

> `Web3.js`는 여러분이 HTTP나 IPC 커넥션을 사용하는 로컬 혹은 리모트 이더리움 노드와 상호작용 하는것을 가능하게 해주는 라이브러리의 집합입니다.

Loom DAppChain에서 통신은 `HTTP`나 `IPC` 대신 `WebSockets`을 사용하여 일어납니다, 하지만 더 깊은 통신 지식이 요구되지는 않습니다 왜냐하면 `Web3.js`가 그 부분을 추상화 해주기 때문입니다.

### LoomProvider

`Provider`는 `Web3.js` API와 이더리움 노드를 연결시켜주는 다리역할을 합니다, `Web3.js` call이 Loom DAppChain과 호환되게 만들기위해서 여러분은 `LoomProvider`을 사용해야만 합니다

`Web3.js`과 `LoomProvider`의 조합은 Loom DAppChain에 배포된 스마트 컨트랙트와의 상호작용을 위한 좋은 선택입니다, 왜냐하면 `Web3.js`는 [ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html)의 해석을 수동으로 해줄 필요없이 API 호출 구성을 추상화 해주기 때문입니다.

### Truffle 프레임워크

`Truffle` 공식 사이트에서는 아래와 같이 말하고 있습니다:

> Truffle은 가장 인기있는 이더리움 개발 프레임워크로써 여러분의 삶을 훨씬 쉽게 만드는 미션을 가지고 있습니다.

이것은 정말입니다, 왜냐하면 `Truffle`은: `compile`, `deploy`, `test`, `debug`와 더 많은 것들을 할 수 있습니다.

## Truffle로 배포하기 및 실행하기

### 다운로드 및 설치

먼저 `Truffle`을 설치하는게 필요합니다:

```bash
# 현재 지원 버전
npm install -g truffle
```

일단 `Truffle`이 설치되면 디렉토리를 생성하고 프로젝트를 초기화 합시다:

```bash
# 디렉토리를 생성하고 들어간다
mkdir simple-store
cd simple-store

# truffle로 빈 프로젝트를 초기화한다
truffle init
```

새로운 디렉토리 구조는 다음과 같습니다:

    .
    ├── contracts
    │   └── Migrations.sol
    ├── migrations
    │   └── 1_initial_migration.js
    ├── test
    ├── truffle-config.js
    └── truffle.js
    

### 컨트랙트를 추가하고 마이그레이션 하기

`contracts` 디렉토리에서 우리는 [Solidity](http://solidity.readthedocs.io/en/v0.4.22/)로 우리의 컨트랙트를 생성해야만 합니다, 우리는 유명한 `SimpleStore.sol`을 사용할 것입니다 이것은 스테이트 변경을 위한 파라미터 `value`를 가지는 `set` 함수, 읽기전용이고 스테이트 변경을 하지 않는 `get` 함수와 파라미터 `value`를 가지는 `NewValueSet` 이벤트를 가지고 있습니다, 다음 예제를 보세요:

    pragma solidity ^0.4.22;
    
    contract SimpleStore {
      uint value;
    
      event NewValueSet(uint _value);
    
      function set(uint _value) public {
        value = _value;
        emit NewValueSet(value);
      }
    
      function get() public view returns (uint) {
        return value;
      }
    }
    

다음으로 마이그레이션을 추가해 봅시다, `Truffle`는 마이그레이션이라는 컨셉으로 동작합니다, 변경사항과 업데이트를 추적하는데 매우 유용합니다. migrations 디렉토리에 파일이 생성되어야 하고고 `JavaScript` 파일 이어야하며 파일 이름은 숫자 `2`로 시작해야만되어서 `2_simple_store.js`가 됩니다, 내용은 다음과 같아야 합니다:

```Javascript
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};
```

> Truffle 통합의 전체 예제는 https://github.com/loomnetwork/truffle-dappchain-example 에서 확인 가능합니다

### 다운로드 및 Loom Truffle Provider 설정

마지막으로 추가할 사항은 `Loom Truffle Provider` 입니다, 이 플러그인은 `Truffle`과 Loom DAppChain 사이의 연결을 제공합니다 (그리고 또한 하위에 `LoomProvider`를 가지고 있습니다). 설치해 봅시다:

```bash
npm install loom-truffle-provider --save
# 또는
yarn add loom-truffle-provider
```

그리고 필요한 설정을 추가하기 위해서 `truffle.js` 파일을 수정해 봅시다, 다음 예제와 같습니다:

```javascript
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./private_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

module.exports = {
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}
```

> `loom genkey -a public_key -k private_key` 커맨드로 여러분의 키를 생성하는 것을 잊지마세요

### Truffle 배포 명령어 실행하기

이제 배포 명령어를 실행하기에 좋습니다:

> 하지만 그전에 Loom DAppChain의 시작이 필요합니다

```bash
truffle deploy --network loom_dapp_chain
```

> 이미 배포를 하였고 배포를 재설정 하려면 `truffle deploy --reset --network loom_dapp_chain` 명령어를 실행할 수 있습니다

### 더 많은 계정 추가하기

`LoomTruffleProvider`의 계정에 접근하려면 `getProviderEngine` 함수를 사용해야만 합니다. 이 하수는 `accountsAddrList` 및`accounts` 속성에 대한 액세스를 제공하는 `LoomProvider`를 반환합니다.

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)
```

그리고 함수 `createExtraAccounts`를 사용하는 것만으로 더 많은 계정을 추가합니다

```js
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
loomTruffleProvider.createExtraAccounts(10)
```

## 설정 및 Web3.js + LoomProvider의 실행

### 다운로드 및 설치

`npm`을 통해서 최신버전의 `Web3.js`을 다운로드 받을 수 있습니다

```bash
npm install web3 --save
# 또는
yarn add web3
```

그리고 `LoomProvider`를 다운로드 하고 설치하세요 (이것은 `loom-js` 내에 존재합니다)

```bash
npm install loom-js --save
# 또는
yarn add loom-js
```

### 프로젝트에 추가하기 및 설정

`Web3.js`를 Node.js 프로젝트에 추가하는 것은 (Node.js 버전 8 또는 이후버전이 실행중인) 설치후에 매우 간단합니다, `Webpack`을 사용하는 프로젝트에서도 물론 간단합니다:

```Javascript
// Node.JS 8 또는 이후버전
const Web3 = require('web3')

// ES2016을 지원하는 Webpack
import Web3 from 'web3'
```

다음 단계는 `LoomProvider`를 설정하는 것입니다, `NodeJS & Browser 퀵스타트`에 관한 예제와 매우 유사합니다.

```Javascript
const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

// client를 생성한다
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

// 함수 호출자 주소
const from = LocalAddress.fromPublicKey(publicKey).toString()

// LoomProvider로 web3 client를 인스턴스화 하기
const web3 = new Web3(new LoomProvider(client, privateKey))

const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewValueSet","type":"event"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const contractAddress = '0x...'

// 컨트랙트를 인스턴스화 하고 사용가능한 상태로 만들기
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
```

### Web3 컨트랙트 인스턴스 실행하기

`SimpleStore.sol`를 위애서 선언했다고 가정하고, 우리는 `set`과 `get` 함수를 쉽게 호출할 수 있습니다:

```Javascript
// 값에 47을 넣는다
const tx = await contract.methods.set(47).send()

// 47인 값을 읽어온다
const value = await contract.methods.get().call()
```

또한 이벤트를 listen합니다, 여기에선 `NewValueSet` 이벤트:

```Javascript
contract.events.NewValueSet({}, (err, event) => {
  if (err) {
    return console.error(err)
  }

  console.log('New value set', event.returnValues._value)
})
```