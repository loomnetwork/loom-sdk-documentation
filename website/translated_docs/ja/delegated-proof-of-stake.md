---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---
The delegated proof of stake algorithm allows token holders to elect witnesses. Witnesses act as validators of the blockchain, proposing blocks and verifying that transactions are correct. These witnesses serve a standard term length before being subject to elections again.

## パラメーター

**コインのコントラクトアドレス** - ERC-20のようなコインのコントラクトを指定し、一票の力を計算するのに使用する。デフォルトではこれは`coin`のアドレスがリゾルブされる。

**Witness count** - The number of witnesses that can be elected.

**Vote allocation** - Number of votes each coin account gets. By default this is equal to the number of witnesses.

**Election cycle length** - How long the election cycle is. By default this is 1 week.

**最小の投票割合** - 選挙を有効とみなすには、コイン供給量のうちどれくらい投票される必要があるか。 例えば、5 の値は投票に必要なコイン供給の20%に相当する。

## 候補者登録

すべての候補者は、自分のアドレスに一致する公開鍵を指定して登録を行わなくてはならない。

## 投票

Each coin account has up to a specified number of votes, generally equal to the number of witnesses. しかし各票の持つ力は、そのアカウントが保有しているコイン残高に比例する。 こうしてより多くのステイクを持つアカウントが、ネットワーク運営についてより大きな発言権を持つことが保証される。 現在の実装では、投票に有効期限はない。 This means that unless a vote is explicitly changed it is assumed that the account holder is satisfied with the job of the witness and will receive the account holder's vote again in the next election. 従来の選挙とは違っていつでも投票が行えるため「投票日」というものはないのだが、選挙時まで投票がカウントされることはない。

### 投票の委任

In addition to voting directly for witness candidates, accounts can also proxy their vote to a trusted party. これは結局のところ、委任票は`proxy balance + sum(balance of principals)`に比例する一票の力を持つことになるという意味だ。

## 選挙

十分な時間が経過していれば、ネットワークへトランザクションを送信することでどのアカウントも選挙をトリガすることができる。 Witnesses are elected by summing up the total voting power given to them and taking the top N candidates where N is the witness count specified in the initial parameters. This means that all witnesses end up with an equal chance of proposing a block no matter how many votes they received. If the mininum number of power required specified by the minimum power fraction is not reached then the witness set does not change.

## 今後の改善

### Witness Rewards

Witnesses are not directly paid for their work now. In the future a scheme could be developed to allow witnesses to be paid out for proposing and/or validating blocks.

### 認証の証明

今現在、候補者は彼らのアイデンティティを証明する必要はない。だが候補者のアイデンティティを検証するよう、オンチェーンのノータリゼーションを可能にすると、将来役立つかもしれない。

### 選挙周期の変更

Currently all witnesses are up for reelection at every election. It may be better to have an election cycle that differs from the term length.

### 投票の有効期限

現在投票に有効期限はないが、ただし投票が一定期間後に期限切れとなるシナリオを想像することができる。 こうすることで、紛失もしくは盗まれたアカウントが選挙に過度の影響力を持つようになるのを防げる。 これは投票がなされた時間のチェック、もしくはアカウントの最後のアクティビティのチェックのどちらでも行うことができる。

## コントラクトのトランザクション

`registerCandidate`

Register a candidate to be a witness.

`unregisterCandidate`

Unregister a candidate to be a witness.

`vote`

ある特定の候補者へ投票

`proxyVote`

自分の投票権を別のアカウントに委任する

`unproxyVote`

投票委任の取り消し

`elect`

選挙の実行

## CLI 活用サンプル

スタートするには、まずブロックチェーンを初期化することが必要だ。DPoSとコインのスマートコントラクトは自動的に`genesis.json`へと追加される。

```shell
loom init
```

次にサンプルアカウントに公開/秘密鍵を生成しよう。

```shell
loom genkey -a pubkey -k privkey
```

そしたら、ブロックチェーン上の初期コインが我々が投票力を持てるように分配されているか、確認する必要がある。 これを行うには、`genesis.json`の修正と、コインコントラクト設定の`init`セクションの変更が必要だ。

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
                    "local": "<local address in base64 from genkey>"
                },
                "balance": 10
            }
        ]
    }
},
```

そうしたら、ブロックチェーンを起動してコインとDPoSのスマートコントラクトを初期化しよう。

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

In order to run for a witness seat we need to register on the blockchain. For this example we'll just register ourselves.

```shell
./example-cli call register_candidate <public key> -k privkey
```

Then we'll vote for ourselves, giving all of our vote allocation, which is 21 votes.

```shell
./example-cli call vote <local address> 21 -k privkey
```

Finally we'll run the election, which we've rigged :).

```shell
./example-cli call elect -k privkey
```

To verify that we've been elected we can check the witness list again to see that it's changed.

```shell
./example-cli call list_witnesses
```