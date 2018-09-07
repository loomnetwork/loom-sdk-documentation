---
id: consensus
title: 블록체인 컨센서스
---
Loom 블록체인은 컨센서스를 위한 pluggable 백엔드를 허용합니다. 어떠한 [ABCI](https://github.com/tendermint/abci) 호환 컨센서스 엔진도 loom 애플리케이션을 구동하는데 사용될 수 있습니다. 백엔드는 블록을 컨펌하고 블록체인의 상태, 즉 블록과 트랜잭션을 유지하는 일을 담당합니다. 기본 백엔드는 [Tendermint](https://tendermint.com/)입니다, 이것은 [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) 스타일 컨센서스 알고리즘을 구현하며 블록이 컨펌되기 위해서 validator에게 2/3 + 1의 득표가 요구됩니다. 향후에 우리는 비트코인 스타일의 PoW/Longest 체인 컨센서스의 지원 계획이 있습니다.

## Validator 선출하기

선택된 컨센서스 알고리즘이 BFT 스타일이라면, validator가 반드시 선출되어야 합니다. Validator는 블록체인 스테이트의 정확성을 보장해야 하는 책임을 가집니다. 블록에 proposing과 voting을 통해서 이런것이 이루어집니다. 기본 validator는 컨센서스 백엔드의 genesis config에 설정됩니다. 권한이 있는 스마트 컨트랙트는 validator의 파워를 변경하기 위해서 `SetValidatorPower` API를 사용해서 validator 목록을 수정할 수도 있습니다.

### Delegated Proof of Stake

BFT 스타일의 백엔드를 사용한다면 [delegated proof of stake 스마트 컨트랙트](delegated-proof-of-stake.html)를 사용할 수 있습니다.