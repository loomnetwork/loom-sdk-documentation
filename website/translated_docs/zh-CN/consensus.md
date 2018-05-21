---
id: 共识
title: 区块链共识
---
Loom区块链允许可插入的后端作为共识。 任何[ABCI](https://github.com/tendermint/abci)匹配的共识引擎可以用来运行loom应用程序。 后端负责确认区块链以及维持区块链状态，亦即区块和交易。 默认后端是[Tendermint](https://tendermint.com/)，实行着[BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)风格共识算法，它需要2/3 + 1张验证者投票来确认一个区块。 在未来，我们计划支持比特币风格PoW/最长的链共识。

## 选择验证者

If the consensus algorithm chosen is BFT style, then validators must be chosen. Validators are responsible for ensuring the correctness of the Blockchain state. They do this by proposing and voting on blocks. By default validators are set in the genesis config of the consensus backend. Privileged smart contracts can also modify the validator list by using the `SetValidatorPower` API to modify a validator's power.

### Delegated Proof of Stake

If using a BFT style backend the [delegated proof of stake smart contract](delegated-proof-of-stake.html) can be used.