---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---

The delegated proof of stake algorithm allows token holders to elect validators.
These validators serve a standard term length before being subject to elections again.

## Parameters

**Coin contract address** - Specifies which ERC20-like coin contract to use to calculate the power of a vote.

**Validator count** - The number of validators that can be elected.

**Vote allocation** - Number of votes each coin account gets.  By default this is equal to the number of validators.

**Term length** - How long validators serve before elections are held and votes are recounted.

**Minimum power fraction** - How much of the coin supply needs to have voted for elections to be considered valid.
For example, a value of 5 corresponds to 20% of the coin supply needing to have voted.

## Candidate Registration

All candidates must register by specifying the public key matching their address.

## Voting

Each coin account has up to a specified number of votes, generally equal to the number of validators.
However, the power of each vote is proportional to the balance of coins the account holds.  This ensures that accounts
with more at stake have a greater voice in how the network is run.

### Proxying Votes

In addition to voting directly for validator candidates, accounts can also proxy their vote to trusted party. This means
the proxy ends up with a vote power proportional to `proxy balance + sum(balance of pricipals)`.

## Elections

Any account can trigger an election if enough time has passed by sending a transaction to the network.
Validators are elected by summing up the total voting power given to them and taking the top N candidates where N
is the validator count specified in the initial parameters. This means that all validators end up with an equal chance of proposing
a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction
is not reached then the validator set does not change.


## Validator Rewards

`TODO`
