---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---

The delegated proof of stake algorithm allows token holders to elect validators.
These validators serve a standard term length before being subject to elections again.

## Parameters

**Coin contract address** - Specifies which ERC20-like coin contract to use to calculate the power of a vote. By default this is resolved to the address at `coin`.

**Validator count** - The number of validators that can be elected.

**Vote allocation** - Number of votes each coin account gets. By default this is equal to the number of validators.

**Cycle length** - How long the election cycle is. By default this is 1 week.

**Minimum power fraction** - How much of the coin supply needs to have voted for elections to be considered valid.
For example, a value of 5 corresponds to 20% of the coin supply needing to have voted.

## Candidate Registration

All candidates must register by specifying the public key matching their address.

## Voting

Each coin account has up to a specified number of votes, generally equal to the number of validators.
However, the power of each vote is proportional to the balance of coins the account holds.  This ensures that accounts
with more at stake have a greater voice in how the network is run.  In the current implementation votes do not expire.
This means that unless a vote is explicitly changed it is assumed that the account holder is satisfied with the job of the
validator and will get receive the account holder's vote again in the next election.  Unlike traditional elections, voting
can be done any time so there is no "election day", however votes are not counted until the election time.

### Proxying Votes

In addition to voting directly for validator candidates, accounts can also proxy their vote to a trusted party. This means
the proxy ends up with a vote power proportional to `proxy balance + sum(balance of principals)`.

## Elections

Any account can trigger an election if enough time has passed by sending a transaction to the network.
Validators are elected by summing up the total voting power given to them and taking the top N candidates where N
is the validator count specified in the initial parameters. This means that all validators end up with an equal chance of proposing
a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction
is not reached then the validator set does not change.

## Future Improvements

### Validator Rewards

Validators are not directly paid for their work now.  In the future a scheme could be developed to allow validators to be paid out
for proposing and/or validating blocks.

### Proof of Authority

Right now candidates do not have to proof their identity, but in the future it may be useful to enable on-chain notarization to
verify candidates' identities.

### Alternating Election Cycle

Currently all validators are up for reelection at every election.  It may be better to have an election cycle that differs from the
term length.

### Vote Expiration

Currently votes never expire, however, one can imagine a scenario in which votes expire after a certain time period.  This would
prevent lost or stolen accounts from having undue influence in elections.  This can be done either by looking at the time the vote
was cast or by looking at the last activity on the account.

## Contract Transactions

`registerCandidate`

Register a candidate to be a validator.

`unregisterCandidate`

Unregister a candidate to be a validator.

`vote`

Vote for a particular candidate.

`proxyVote`

Proxy your votes to another account.

`unproxyVote`

Unproxy your votes.

`elect`

Run the election.

## Example CLI Usage

First we need to initialize the blockchain. The DPOS smart contract will automatically be added into `genesis.json`.
```shell
loom init
```

Next we generate public/private keys for an example account.
```shell
loom genkey -a pubkey -k privkey
```

Then we need to make sure some initial coins on the blockchain are given out so that we have some voting power. To do this we need to modify
`genesis.json` and change the `init` section of the coin contract.
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

In order to run for a validator seat we need to register. For this example, we'll just register ourselves.
```shell
loom dpos register_candidate <public key>
```

Then we'll vote for ourselves giving all of our vote allocation, which is 21 votes.
```shell
loom dpos vote <local address> 21
```

Finally we'll run the election, which we've rigged :).
```shell
loom dpos elect
```

To verify this we can check the validator list again to see that it's changed.
```shell
loom dpos list_validators
```
