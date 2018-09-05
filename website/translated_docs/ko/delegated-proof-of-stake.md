---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---
Delegated proof of stake 알고리즘은 토큰 홀더가 witness를 선출할 수 있게 해줍니다. Witnesse는 블록체인의 validator로서 행동하는데, 블록을 제안하고 트랜잭션이 정확한지를 검사하는 역할을 합니다. 이 증인은 선거를 다시 하기 전까지 표준 기간 동안 서비스를 제공합니다.

## 파라미터

**Coin contract address** - 투표권을 계산하는 데 사용되는 ERC20와 같은 코인 컨트랙트를 지칭합니다. 기본적으로 이것은 `coin`의 주소로 확인됩니다.

**Witness count** - 선출될 수 있는 witness의 수.

**Witness salary** - 선택사항. Witness가 블록 검증에 대한 보상의 양.

**Vote allocation** - 각 코인 계정이 얻은 득표 수. 기본적으로 이것은 witness의 수와 같습니다.

**Election cycle length** - How long the election cycle is. By default this is 1 week.

**Minimum power fraction** - Optional. How much of the coin supply needs to have voted for elections to be considered valid. For example, a value of 5 corresponds to 20% of the coin supply needing to have voted.

## Candidate Registration

All candidates must register by specifying the public key matching their address.

## 투표 중

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

We also need to tweak the DPOS settings for this example so we can run an election right now instead of waiting a full election cycle for votes to come in. We do this by changing the `electionCycleLength` in `genesis.json` to `0`. We'll also add a salary of 10 coins for witnesses.

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
./example-cli call transfer dpos 90 -p privkey
```

We can also check our balance and the balance of the dpos contract at any time.

```shell
./example-cli call balance <your address>
./example-cli call balance dpos
```

In order to run for a witness seat we need to register on the blockchain. For this example we'll just register ourselves.

```shell
./example-cli call register_candidate <public key> -p privkey
```

Then we'll vote for ourselves, giving all of our vote allocation, which is 21 votes.

```shell
./example-cli call vote <your address> 21 -p privkey
```

Finally we'll run the election, which we've rigged :).

```shell
./example-cli call elect -p privkey
```

To verify that we've been elected we can check the witness list again to see that it's changed.

```shell
./example-cli call list_witnesses
```

We can run the election again and verify we were paid for our service.

```shell
./example-cli call elect -p privkey
./example-cli call balance <your address>
```