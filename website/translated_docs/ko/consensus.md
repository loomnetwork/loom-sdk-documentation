---
id: consensus
title: 블록체인 컨센서스
---
Loom 블록체인은 컨센서스를 위한 pluggable 백엔드를 허용합니다. 어떠한 [ABCI](https://github.com/tendermint/abci) 호환 컨센서스 엔진도 loom 애플리케이션을 구동하는데 사용될 수 있습니다. 백엔드는 블록을 컨펌하고 블록체인의 상태, 즉 블록과 트랜잭션을 유지하는 일을 담당합니다. The default backend is [Tendermint](https://tendermint.com/), which implements a [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) style consensus algorithm requiring 2/3 + 1 votes by validators for a block to be confirmed. In the future we plan on supporting bitcoin style PoW/Longest chain consensus.

## Selecting Validators

If the consensus algorithm chosen is BFT style, then validators must be chosen. Validators are responsible for ensuring the correctness of the Blockchain state. They do this by proposing and voting on blocks. By default validators are set in the genesis config of the consensus backend. Privileged smart contracts can also modify the validator list by using the `SetValidatorPower` API to modify a validator's power.

### Delegated Proof of Stake

If using a BFT style backend the [delegated proof of stake smart contract](delegated-proof-of-stake.html) can be used.