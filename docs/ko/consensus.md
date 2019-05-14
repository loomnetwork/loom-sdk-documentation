---
id: consensus
title: Blockchain Censensus
---

The loom blockchain allows a pluggable backend for consensus. Any [ABCI](https://github.com/tendermint/abci) compatible consensus engine can be used to run loom applications. The backend is responsible for confirming blocks and maintaining the blockchain state, namely blocks and transactions. The default backend is [Tendermint](https://tendermint.com/), which implements a [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) style consensus algorithm requiring 2/3 + 1 votes by validators for a block to be confirmed. In the future we plan on supporting bitcoin style PoW/Longest chain consensus.

## Selecting Validators

If the consensus algorithm chosen is BFT style, then validators must be chosen. Validators are responsible for ensuring the correctness of the Blockchain state. They do this by proposing and voting on blocks. By default validators are set in the genesis config of the consensus backend. Privileged smart contracts can also modify the validator list by using the `SetValidatorPower` API to modify a validator's power.

### Delegated Proof of Stake

If using a BFT style backend the [delegated proof of stake smart contract](delegated-proof-of-stake.html) can be used.