---
id: delegated-proof-of-stake
title: Delegated Proof of Stake
---
Delegated proof of stake(DPoS)のアルゴリズムでは、トークン所有者が証人を選出することができる。 証人はバリデーターとして、ブロックの提案とトランザクションが正当であるかの検証を行う。 これらの証人は、再選出が行われるまでの標準期間中その役割を務める。

## パラメーター

**Coin contract address** - ERC-20のようなコインのコントラクトを指定し、一票の力を計算するのに使用する。デフォルトではこれは`coin`のアドレスがリゾルブされる。

**Witness count** - 選出可能な証人数。

<**Vote allocation** - 各コインアカウントに与えられる票の数。デフォルトでは証人数に等しい。

**Election cycle length** - 選挙期間の長さ。デフォルトでは１週間。

**Minimum power fraction** - 選挙を有効とみなすには、コイン供給量のうちどれくらい投票される必要があるか。 例えば、5 の値は投票に必要なコイン供給の20%に相当する。

## 候補者登録

すべての候補者は、自分のアドレスに一致する公開鍵を指定して登録を行わなくてはならない。

## 投票

各コインのアカウントは、ある決まった票数を持っており、通常これは証人数に等しい。 しかし各票の持つ力は、そのアカウントが保有しているコイン残高に比例する。 こうしてより多くのステイクを持つアカウントが、ネットワーク運営についてより大きな発言権を持つことが保証される。 現在の実装では、投票に有効期限はない。 つまり投票が明らかに変更されない限り、アカウント所有者は証人の仕事に満足していると想定し、次の選挙でも再びアカウント所有者からの投票がを受け取ることとなる。 従来の選挙とは違っていつでも投票が行えるため「投票日」というものはないのだが、選挙時まで投票がカウントされることはない。

### 投票の委任

証人候補者への直接投票に加え、アカウントはさらに自分の票を信頼された者に委任することが可能だ。 これは結局のところ、委任票は`proxy balance + sum(balance of principals)`に比例する一票の力を持つことになるという意味だ。

## 選挙

十分な時間が経過していれば、ネットワークへトランザクションを送信することでどのアカウントも選挙をトリガすることができる。 証人は、投票された票の力を合計した上位N人の候補者を取り上げることで選出される。Nは初期パラメーターで指定された証人数である。 これはつまり、結局のところ得票数に関係なく、全証人がブロック提案の機会を等しく持つということだ。 もし最小の投票割合によって指定された必要投票力の最小値に達しなかった場合、証人セットは変更されない。

## 今後の改善

### 証人の報酬

現在証人に直接仕事の対価が支払われることはない。将来ブロックの提案や検証に対して証人に支払いができるよう、スキームを発展させて行く可能性がある。

### 認証の証明

今現在、候補者は彼らのアイデンティティを証明する必要はない。だが候補者のアイデンティティを検証するよう、オンチェーンのノータリゼーションを可能にすると、将来役立つかもしれない。

### 選挙周期の変更

現在全ての証人は毎回選挙時に再選出候補となっている。選挙期間の長さとは異なる選挙周期がある方が良いかもしれない。

### 投票の有効期限

現在投票に有効期限はないが、ただし投票が一定期間後に期限切れとなるシナリオを想像することができる。 こうすることで、紛失もしくは盗まれたアカウントが選挙に過度の影響力を持つようになるのを防げる。 これは投票がなされた時間のチェック、もしくはアカウントの最後のアクティビティのチェックのどちらでも行うことができる。

## コントラクトのトランザクション

`registerCandidate`

証人候補者の登録

`unregisterCandidate`

証人候補者の登録取り消し

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
                            "chain_id": "default",
                            "local": "<local address in base64 from genkey>"
                        },
                        "balance": 10
                    }
                ]
            }
        },
```

We also need to tweak the DPOS settings for this example so we can run an election right now instead of waiting a full election cycle for votes to come in. We do this by changing the `electionCycleLength` in `genesis.json` to ``.

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
                    "minPowerFraction": "5"
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

そうしたら、ブロックチェーンを起動してコインとDPoSのスマートコントラクトを初期化しよう。

```shell
loom run
```

ネットワークへトランザクションを送信するために、[go-loom project](https://github.com/loomnetwork/go-loom)よりexample-cliを使用することができる。これは以下を実行することで構築可能だ:

```shell
make example-cli
```

`list_witnesses`サブコマンドを実行することで、いつでも証人リストをチェックすることができる。

```shell
./example-cli call list_witnesses
```

証人に立候補するには、ブロックチェーン上での登録が必要となる。この例では、単に自分自身を登録しよう。

```shell
./example-cli call register_candidate <public key> -k privkey
```

そうしたら自分自身に投票してみよう。21の割り当て票全てを投票する。

```shell
./example-cli call vote <local address> 21 -k privkey
```

最後に自分で仕組んだ選挙を実行する ^o^

```shell
./example-cli call elect -k privkey
```

自分が選出されたことを検証するには、証人リストが変更されているか再度チェックすることが可能だ。

```shell
./example-cli call list_witnesses
```