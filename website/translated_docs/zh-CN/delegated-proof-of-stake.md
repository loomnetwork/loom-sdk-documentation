---
id: 委任股权证明
title: 委任股权证明
---
委任股权证明算法使代币持有者可以选举见证人。 见证人将充当区块链的验证者，提议区块以及核实交易是否准确。 在再次接受选举之前，这些见证人的任期长度为标准期限。

## 参数

**币合约地址** - 指定用于计算投票权力的ERC20风格硬币合约。默认情况下，这将解析为`coin`的地址。

**见证人个数** - 可当选的见证人数量。

**见证人薪水** - 可选项。见证人验证区块所获金额。

**投票分配** - 每个币帐户获得的选票数。默认情况下, 这个数字等于见证人的数量。

**选举周期长度** - 选举周期的长短。默认情况下是1周。

**最小权利分数** - 可选项。 币供应中的多少需要投票选举才被认为是有效的。 例如，币供应的20%需要有5个。

## 候选人注册

所有候选人必须通过指定与其地址相匹配的公钥进行注册。

## 投票

Each coin account has up to a specified number of votes, generally equal to the number of witnesses. However, the power of each vote is proportional to the balance of coins the account holds. This ensures that accounts with more at stake have a greater voice in how the network is run. In the current implementation votes do not expire. This means that unless a vote is explicitly changed it is assumed that the account holder is satisfied with the job of the witness and will receive the account holder's vote again in the next election. Unlike traditional elections, voting can be done any time so there is no "election day", however votes are not counted until the election time.

### Proxying Votes

In addition to voting directly for witness candidates, accounts can also proxy their vote to a trusted party. This means the proxy ends up with a vote power proportional to `proxy balance + sum(balance of principals)`.

## Elections

Any account can trigger an election if enough time has passed by sending a transaction to the network. Witnesses are elected by summing up the total voting power given to them and taking the top N candidates where N is the witness count specified in the initial parameters. This means that all witnesses end up with an equal chance of proposing a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction is not reached then the witness set does not change.

## Future Improvements

## Bonding

In the future witnesses may lock up a specified number of coins that can be seized for bad behavior. This adds an additional incentive for good behavior beyond the witness salary.

### Proof of Authority

Right now candidates do not have to proof their identity, but in the future it may be useful to enable on-chain notarization to verify candidates' identities.

### Alternating Election Cycle

Currently all witnesses are up for reelection at every election. It may be better to have an election cycle that differs from the term length.

### Vote Expiration

Currently votes never expire, however, one can imagine a scenario in which votes expire after a certain time period. This would prevent lost or stolen accounts from having undue influence in elections. This can be done either by looking at the time the vote was cast or by looking at the last activity on the account.

## Contract Transactions

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

## Example CLI Usage

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