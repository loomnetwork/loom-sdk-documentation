---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---
Delegated proof of stake(DPoS)のアルゴリズムでは、トークン所有者が証人を選出することができる。 証人はバリデーターとして、ブロックの提案とトランザクションが正当であるかの検証を行う。 これらの証人は、再選出が行われるまでの標準期間中その役割を務める。

## パラメーター

**Coin contract address** - ERC-20のようなコインのコントラクトを指定し、一票の力を計算するのに使用する。デフォルトではこれは`coin`のアドレスがリゾルブされる。

**Witness count** - 選出可能な証人数。

**Witness salary** - Optional. The amount that witnesses get paid for validating blocks.

**Vote allocation** - Number of votes each coin account gets. By default this is equal to the number of witnesses.

**Election cycle length** - How long the election cycle is. By default this is 1 week.

**Minimum power fraction** - Optional. How much of the coin supply needs to have voted for elections to be considered valid. For example, a value of 5 corresponds to 20% of the coin supply needing to have voted.

## 候補者登録

All candidates must register by specifying the public key matching their address.

## 投票

Each coin account has up to a specified number of votes, generally equal to the number of witnesses. However, the power of each vote is proportional to the balance of coins the account holds. This ensures that accounts with more at stake have a greater voice in how the network is run. In the current implementation votes do not expire. This means that unless a vote is explicitly changed it is assumed that the account holder is satisfied with the job of the witness and will receive the account holder's vote again in the next election. Unlike traditional elections, voting can be done any time so there is no "election day", however votes are not counted until the election time.

### 投票の委任

In addition to voting directly for witness candidates, accounts can also proxy their vote to a trusted party. This means the proxy ends up with a vote power proportional to `proxy balance + sum(balance of principals)`.

## 選挙

Any account can trigger an election if enough time has passed by sending a transaction to the network. Witnesses are elected by summing up the total voting power given to them and taking the top N candidates where N is the witness count specified in the initial parameters. This means that all witnesses end up with an equal chance of proposing a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction is not reached then the witness set does not change.

## 今後の改善

### 証人の報酬

Witnesses are not directly paid for their work now. In the future a scheme could be developed to allow witnesses to be paid out for proposing and/or validating blocks.

### 認証の証明

Right now candidates do not have to proof their identity, but in the future it may be useful to enable on-chain notarization to verify candidates' identities.

### 選挙周期の変更

Currently all witnesses are up for reelection at every election. It may be better to have an election cycle that differs from the term length.

### 投票の有効期限

Currently votes never expire, however, one can imagine a scenario in which votes expire after a certain time period. This would prevent lost or stolen accounts from having undue influence in elections. This can be done either by looking at the time the vote was cast or by looking at the last activity on the account.

## コントラクトのトランザクション

`registerCandidate`

Register a candidate to be a witness.

`unregisterCandidate`

Unregister a candidate to be a witness.

`vote`

Vote for a particular candidate.

`proxyVote`

Proxy your votes to another account.

`unproxyVote`

Unproxy your votes.

`elect`

Run the election.

## CLI 活用サンプル

To get started we first need to initialize the blockchain. The DPOS and Coin smart contracts will automatically be added into `genesis.json`.

```shell
loom init
```

Next we generate public/private keys for an example account.

```shell
loom genkey -a pubkey -k privkey
```

Then we need to make sure some initial coins on the blockchain are given out so that we have some voting power. To do this we need to modify `genesis.json` and change the `init` section of the Coin contract configuration. In this example we'll give ourselves 100 coins.

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
                            "chain_id": "default",
                            "local": "<local address in base64 from genkey>"
                        },
                        "balance": 100
                    }
                ]
            }
        },
```

We also need to tweak the DPOS settings for this example so we can run an election right now instead of waiting a full election cycle for votes to come in. We do this by changing the `electionCycleLength` in `genesis.json` to ``. We'll also add a salary of 10 coins for witnesses.

```json
        {
            "vm": "plugin",
            "format": "plugin",
            "name": "dpos",
            "location": "dpos:1.0.0",
            "init": {
                "params": {
                    "witnessCount": "21",
                    "electionCycleLength": "0",
                    "minPowerFraction": "5",
                    "witnessSalary": "10"
                },
                "validators": [
                    {
                        "pubKey": "<your validator public key>",
                        "power": "10"
                    }
                ]
            }
        }
```

We then boot the blockchain which will initialize the Coin and DPOS smart contracts.

```shell
loom run
```

To send transactions to the network we can use the example-cli from the [go-loom project](https://github.com/loomnetwork/go-loom). This can be built by running

```shell
make example-cli
```

We can check the witness list at any time by running the `list_witnesses` subcommand.

```shell
./example-cli call list_witnesses
```

First we'll fund the dpos contract so that witnesses can get paid. This is simply a transfer to the `dpos` contract.

```shell
./example-cli call transfer dpos 90 -k privkey
```

We can also check our balance and the balance of the dpos contract at any time.

```shell
./example-cli call balance <your address>
./example-cli call balance dpos
```

In order to run for a witness seat we need to register on the blockchain. For this example we'll just register ourselves.

```shell
./example-cli call register_candidate <public key> -k privkey
```

Then we'll vote for ourselves, giving all of our vote allocation, which is 21 votes.

```shell
./example-cli call vote <your address> 21 -k privkey
```

Finally we'll run the election, which we've rigged :).

```shell
./example-cli call elect -k privkey
```

To verify that we've been elected we can check the witness list again to see that it's changed.

```shell
./example-cli call list_witnesses
```

We can run the election again and verify we were paid for our service.

```shell
./example-cli call elect -k privkey
./example-cli call balance <your address>
```