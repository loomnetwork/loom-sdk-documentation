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

**Election cycle length** - 선거주기. 기본적으로 1주입니다.

**Minimum power fraction** - 선택사항. 선거가 유효하다고 위해서 선거에 얼마를 많은 코인 공급이 요구되는지. 예를들면, 5라는 값은 투표에 필요한 코인 공급량의 20%에 해당합니다.

## Candidate Registration

모든 candidate들은 그들의 주소와 일치하는 퍼블릭 키를 지정하는 등록을 해야합니다.

## Voting

각 코인 계정은 최대 특정 수의 득표를 얻게 되는데, 일반적으로 witness의 수와 같습니다. 하지만, 각 득표의 힘은 계정이 가지고 있는 코인의 잔액과 비례합니다. 이것은 지분이 더 많은 계정이 네트워크를 실행에 대한 더 큰 힘을 가지게 해줍니다. 현재 구현에서 투표는 만료되지 않습니다. 이것은 투표를 명시적으로 변경하지 않는 한 계정 소유자는 witness의 일에 충족되며 다음 선거에서 다시 계정 소유자의 투표를 받을 것입니다. 그러나 전통적인 선거와는 달리 투표는 언제든지 할 수 있어서 "선거일"이라는 것은 없습니다. 하지만, 투표는 선거시간까지 카운팅되지 않습니다.

### Proxying Votes

Witness candidate에 대한 직접적인 투표와 더불어서, 계정은 그들의 투표를 신뢰할 수 있는 곳에 위임할 수 있습니다. 이것은 proxy는 `proxy 잔액 + 합계(위임자들의 잔액)`에 비례하는 투표 권한을 최종적으로 얻게됩니다.

## 선거

네트워크에 트랜잭션을 전송하고 충분한 시간이 경과되면 어떤 계정이든 선거를 트리거 할 수 있습니다. Witness는 그들에게 주어진 총 투표권을 합산하고 상위 N명의 후보를 취하는 것으로 선출됩니다 여기서 N이란 초기 파라미터에 지정된 witness 수입니다. 이것은 모든 witness가 그들이 얼마나 많은 표를 받았는지에 상관없이 블록을 제안하는 것에 대해서 동등한 기회를 가진다는 것을 의미합니다. 만약에 최소 투표권 비율로 지정된 최소 투표권을 충족하지 못한다면 witness 세트는 변경되지 않습니다.

## 추후 개선사항

## Bonding

추후에는 witness는 나쁜 행위에 대해서 압수될 수 있는 특정 수의 코인을 락업할 수도 있습니다. 이것은 witness 보상을 넘어 좋은 행위에 대한 추가적인 인센티브를 더합니다.

### Proof of Authority

현재 candidate은 그들의 신원 증명할 필요는 없습니다, 그러나 추후에는 on-chain 공증을 활성화 시키는 것이 candidate의 신원을 확인하는데 유용할 수 있습니다.

### Alternating Election Cycle

현재 모든 선거에서 모든 witness가 재선거를 합니다. 선거주기의 길이와 다른 재선거주기를 갖는 것이 더 나을 수도 있습니다. 용어 길이.

### 투표 만료

현재 투표는 만료되지 않습니다, 하지만, 특정 기간이후에 투표가 만료되는 시나리오를 상상해 볼 수 있습니다. 이것은 분실 또는 도난당한 계좌가 선거에 부당한 영향을 끼치는 것을 방지해줄 수 있습니다. 이것은 투표 당시의 시간을 보거나 또는 계정의 마지막 활동을 살펴 보는 것이 될 수 있습니다.

## 컨트랙트 트랜잭션

`registerCandidate`

Witness가 될 후보자를 등록합니다.

`unregisterCandidate`

Witness가 될 후보자의 등록을 취소합니다.

`vote`

특정 후보자에게 투표합니다.

`proxyVote`

여러분의 투표를 다른 계정에게 위임합니다.

`unproxyVote`

여러분의 투표의 위임을 취소합니다.

`elect`

선거를 실행합니다.

## CLI 사용 예제

시작하려면 우리는 먼저 블록체인을 초기화하는 것이 필요합니다. DPOS와 코인 스마트 컨트랙트가 자동으로 `genesis.json`에 추가될 것입니다.

```shell
loom init
```

다음으로 우리는 예제 계정을 위한 퍼블릭/프라이빗 키를 생성합니다.

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