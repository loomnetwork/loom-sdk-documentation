---
id: consensus
title: 블록체인 컨센서스
---
Loom 블록체인은 컨센서스를 위해 플러그인 가능한 백엔드를 허용합니다. [ABCI](https://github.com/tendermint/abci) 호환 컨센서스 엔진이라면 무엇이든 loom 애플리케이션을 구동하는데 사용될 수 있습니다. 백엔드는 블록을 확정하고 블록체인의 상태, 즉 블록과 트랜잭션을 유지하는 일을 담당합니다. 기본 백엔드는 [Tendermint](https://tendermint.com/)입니다. 이것은 블록을 확정할 때 검증자들의 3/2 + 1개의 투표를 필요로 하는 [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) 스타일 컨센서스 알고리즘을 구현합니다. 향후에 우리는 비트코인 스타일의 PoW/Longest 체인 컨센서스의 지원할 것입니다.

## 검증자 선출하기

선택된 컨센서스 알고리즘이 BFT 스타일이라면, 반드시 검증자들을 선출해야 합니다. 검증자는 블록체인 상태의 정확성을 보장해야 합니다. 이는 블록에 대한 제안과 투표를 통해 이루어집니다. 기본적으로 검증자들은 컨센서스 백엔드의 Genesis config에 설정되어 있습니다. 하나의 검증자의 힘을 조절하기 위해 권한이 있는 스마트 컨트랙트를 통해 `SetValidatorPower` API를 사용해서 검증자 목록을 수정할 수도 있습니다.

### 위임 지분 증명(Delegated Proof of Stake)

BFT 스타일의 백엔드를 사용한다면 [위임 지분 증명 스마트 컨트랙트](delegated-proof-of-stake.html)를 사용할 수 있습니다.