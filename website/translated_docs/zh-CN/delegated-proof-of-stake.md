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

每个币帐户都有特定数量的选票，通常等于见证人的数量。 然而，每张选票的权力与账户持有的币余额成正比。 这可以确保有更多利害关系的帐户在网络运行方式上有更大的发言权。 在当前实现，选票不会过期。 这意味着, 除非一张选票被明确更改了, 否则将会假设帐户持有人对见证人的工作感到满意, 而且他将在下次选举中再次收到帐户持有人的投票。 与传统的选举不同, 投票可以在任何时候进行, 所以没有 "选举日", 但是选票要到选举的时候才能算出来。

### 代理投票

除了直接为见证人候选人投票外, 账户还可以将投票权委托给信任的一方。 这意味着代理拥有 `代理余额 + 总和 (本金余额)` 成正比的投票权。

## 选举

如果过了足够长的时间，任何帐户都可以通过向网络发送事务触发选举。 见证人是通过总结给予他们的总投票权并选出前N名候选人而选出的（N是初始参数中指定的见证人个数）。 这意味着，无论他们收到多少票，所有见证人最终都有平等的机会来提议一个区块。 如果没有达到最小权利分数规定的最小权利需要数量，那么见证人集不会改变。

## 未来的改进

## 连结

在未来, 见证人可能会锁定指定数量的币, 用以扣押不良行为。这为超出见证人薪水的良好行为增加了一个额外的激励。

### 权威证明

现在，候选人不必证明自己的身份，但将来可能进行上链公证核实候选人的身份会更有帮助。

### 交替的选举周期

目前，所有的见证人在每次选举中都会连任。 有一个不同于任期长短的选举周期也许更好。

### 选票期限

目前，选票从来不会过期, 但是，人们可以想象一个场景, 在某个时间段后选票会过期。 这将防止遗失或被盗帐户在选举中产生不当影响。 这可以通过查看投票的时间或查看帐户上的最后一个操作来完成。

## 合约事务

`<code>registerCandidate` 候选人登记</code>

登记一个候选人为见证人

`<code>unregisterCandidate` 取消登记候选人</code>

注销候选人为见证人。

`<code>vote` 投票</code>

投票给某个候选人。

`<code>proxyVote` 代理投票</code>

把你的选票委托给另一个帐户。

`<code>unproxyVote` 取消代理投票</code>

取消你的选票的代理

`<code>elect` 选举</code>

进行选举

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