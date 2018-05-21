---
id: 共识
title: 区块链共识
---
Loom区块链允许可插入的后端作为共识。 任何[ABCI](https://github.com/tendermint/abci)匹配的共识引擎可以用来运行loom应用程序。 后端负责确认区块链以及维持区块链状态，亦即区块和交易。 默认后端是[Tendermint](https://tendermint.com/)，实行着[BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)风格共识算法，它需要2/3 + 1张验证者投票来确认一个区块。 在未来，我们计划支持比特币风格PoW/最长的链共识。

## 选择验证者

如果选择的共识算法是BFT风格，则验证者必须被选择出来。 验证者负责确保区块链状态的准确性。 他们通过提议并投票表决区块来做到这一点。 默认情况下，验证者被设置为共识后端的起源配置。 Privileged smart contracts can also modify the validator list by using the `SetValidatorPower` API to modify a validator's power.

### Delegated Proof of Stake

If using a BFT style backend the [delegated proof of stake smart contract](delegated-proof-of-stake.html) can be used.