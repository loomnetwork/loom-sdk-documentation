---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---
Delegated proof of stake(DPoS)のアルゴリズムでは、トークン所有者がバリデーターを選出することができる。これらのバリデーターは、再選出が行われるまでの標準期間中その役割を務める。

## パラメーター

**コインのコントラクトアドレス** - ERC-20のようなコインのコントラクトを指定し、一票の力を計算するのに使用する。デフォルトではこれは`coin`のアドレスがリゾルブされる。

**バリデーターカウント** - 選出可能なバリデーター数。

**票の割り当て** - 各コインアカウントに与えられる票の数。デフォルトではバリデーター数に等しい。

**サイクルレングス** - 選挙期間の長さ。デフォルトでは１週間。

**最小の投票割合** - 選挙を有効とみなすには、コイン供給量のうちどれくらい投票される必要があるか。 例えば、5 の値は投票に必要なコイン供給の20%に相当する。

## 候補者登録

すべての候補者は、自分のアドレスに一致する公開鍵を指定して登録を行わなくてはならない。

## 投票

各コインのアカウントは、ある決まった票数を持っており、通常これはバリデーター数に等しい。 しかし各票の持つ力は、そのアカウントが保有しているコイン残高に比例する。 こうしてより多くのステイクを持つアカウントが、ネットワーク運営についてより大きな発言権を持つことが保証される。 現在の実装では、投票に有効期限はない。 This means that unless a vote is explicitly changed it is assumed that the account holder is satisfied with the job of the validator and will get receive the account holder's vote again in the next election. Unlike traditional elections, voting can be done any time so there is no "election day", however votes are not counted until the election time.

### Proxying Votes

In addition to voting directly for validator candidates, accounts can also proxy their vote to a trusted party. This means the proxy ends up with a vote power proportional to `proxy balance + sum(balance of principals)`.

## 選挙

Any account can trigger an election if enough time has passed by sending a transaction to the network. Validators are elected by summing up the total voting power given to them and taking the top N candidates where N is the validator count specified in the initial parameters. This means that all validators end up with an equal chance of proposing a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction is not reached then the validator set does not change.

## 今後の改善

### Validator Rewards

Validators are not directly paid for their work now. In the future a scheme could be developed to allow validators to be paid out for proposing and/or validating blocks.

### Proof of Authority

Right now candidates do not have to proof their identity, but in the future it may be useful to enable on-chain notarization to verify candidates' identities.

### Alternating Election Cycle

Currently all validators are up for reelection at every election. It may be better to have an election cycle that differs from the term length.

### Vote Expiration

Currently votes never expire, however, one can imagine a scenario in which votes expire after a certain time period. This would prevent lost or stolen accounts from having undue influence in elections. This can be done either by looking at the time the vote was cast or by looking at the last activity on the account.

## Contract Transactions

`registerCandidate`

バリデーター候補者の登録

`unregisterCandidate`

バリデーター候補者の登録取り消し

`vote`

ある特定の候補者へ投票

`proxyVote`

自分の投票権を別のアカウントに委任する

`unproxyVote`

投票委任の取り消し

`elect`

選挙の実行

## CLI 活用サンプル

To get started we first need to initialize the blockchain. The DPOS and Coin smart contracts will automatically be added into `genesis.json`.

```shell
loom init
```

Next we generate public/private keys for an example account.

```shell
loom genkey -a pubkey -k privkey
```

Then we need to make sure some initial coins on the blockchain are given out so that we have some voting power. To do this we need to modify `genesis.json` and change the `init` section of the Coin contract configuration.

```json
{
    "vm": "plugin",
    "format": "plugin",
    "name": "coin",
    "location": "coin:1.0.0",
    "init": {
        "accounts": [
            {
                "owner": {
                    "chain_id": "local",
                    "local": "<local address in base64 from genkey>",
                },
                "balance": 10
            }
        ]
    }
},
```

We then boot the blockchain which will initialize the coin and DPOS smart contracts.

```shell
loom run
```

We can check the witness list at any time by running the `list_validators` subcommand.

```shell
loom dpos list_validators
```

In order to run for a validator seat we need to register. For this example we'll just register ourselves.

```shell
loom dpos register_candidate <public key>
```

Then we'll vote for ourselves, giving all of our vote allocation, which is 21 votes.

```shell
loom dpos vote <local address> 21
```

Finally we'll run the election, which we've rigged :).

```shell
loom dpos elect
```

To verify that we've been elected we can check the validator list again to see that it's changed.

```shell
loom dpos list_validators
```