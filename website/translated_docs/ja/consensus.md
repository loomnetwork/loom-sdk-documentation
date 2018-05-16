---
id: consensus
title: ブロックチェーンのコンセンサス
---
Loomのブロックチェーンでは、コンセンサスのためのプラグイン可能なバックエンドが実現される。 [ABCI](https://github.com/tendermint/abci) 互換性のあるコンセンサスエンジンはどれも、Loomアプリケーションを実行するために使用できる。 バックエンドはブロック承認とブロックチェーンの状態、すなわちブロックとトランザクションの保持する役割を持つ。 デフォルトのバックエンドは [Tendermint](https://tendermint.com/)で、これはブロック承認に 2/3 + 1 のバリデーターからの票を必要とする、 [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)方式のコンセンサス アルゴリズムを実装している。 今後我々は、ビットコイン方式のPoW/最長チェーンのコンセンサスをサポートしていく予定だ。

## バリデーターの選択

BFT方式のコンセンサス アルゴリズムを選択した場合、バリデーターを選ばれなければならない。 バリデーターは、ブロックチェーンの状態の正当性を保証する役割を持つ。 彼らはブロックに提案及び投票をすることでこれを行なっている。 デフォルトでは、バリデーターはコンセンサス バックエンドのgenesisコンフィグで設定される。 Privileged smart contracts can also modify the validator list by using the `SetValidatorPower` API to modify a validator's power.

### Delegated Proof of Stake

If using a BFT style backend the [delegated proof of stake smart contract](delegated-proof-of-stake.html) can be used.