---
id: karma
title: Karma
sidebar_label: Karma
---
Karma 模块提供了一种限制事务的方法。 通过各种 karma 参数限制用户的事务数量和时间。 有个叫做Oracle的用户具有无限制访问权限。

## 安装

首次启动链时，要在 genesis.json 文件中包含 karma 合约才能安装。

```json
     {
            "vm": "plugin",
            "format": "plugin",
            "name": "karma",
            "location": "karma:1.0.0",
            "init": {
            }
     }

```

## 激活和 loom.yaml

激活 karma 功能是从 loom.yaml 配置文件中完成的。

* `KarmaEnabled bool` 打开或关闭 karma 模块的标志。 
* `KarmaSessionDuration int64` 持续时间（秒）。Karma 将限制用户在任何`SessionDuration` 间隔期间（秒）可配置的事务数。
* `KarmaMaxCallCount int64` 用于计算每个 `SessionDuration` 允许的调用事务数量的基值。 `KarmaMaxCallCount int64` 为 `0` 说明调用事务数量没有设限。
* `KarmaMaxDeployCount int64` 用于计算每个 `SessionDuration` 允许的部署事务数量的基值。 `KarmaMaxDeployCount int64` 为 `0` 说明部署事务数量没有设限。 示例 loom.yaml 片段。

```yaml
KarmaEnabled: true
KarmaSessionDuration: 60
KarmaMaxCallCount: 10
KarmaMaxDeployCount: 5
```

## 访问 karma 方法

公共 karma 方法既可以使用其中一个SDK直接在代码中运行，也可以使用 `loom` 可执行文件从命令行运行。

```bash
$ ./loom karma --help

call a method of karma

Usage:
  loom karma [command]

Available Commands:
  append-sources-for-user add new source of karma to a user, requires oracle verification
  delete-sources-for-user delete sources assigned to user, requires oracle verification
  get-sources             list the karma sources
  get-total               calculate total karma for user
  get-user-state          list the karma sources for user
  reset-sources           reset the sources, requires oracle verification
  update-oracle           change the oracle or set initial oracle


Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -h, --help             help for karma
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")

Use "loom karma [command] --help" for more information about a command.
```

## Oracle

* 它定义在 genesis 文件中，可以通过 karma 方法 UpdateOracle 进行更新。
* 它不受 karma 限制的影响。
* 要成功调用以下 karma 配置事务，需要参考 oracle。 
    * `AppendSourcesForUser`
    * `DeleteSourcesForUser`
    * `ResetSources`
    * `UpdateOracle` 如果还没有设置 oracle，那么任何人都可以调用`UpdateOracle`，如果已经设置了 oracle，就必须知道旧的 oracle ，用 `UpdateOracle` 将其改变。 

示例 genesis 文件项。

```json
    {
        "vm": "plugin",
        "format": "plugin",
        "name": "karma",
        "location": "karma:1.0.0",
        "init": {
                "Oracle": {
                    "chainId": "default",
                    "local": "QjWhaN9qvpdI9MjS1YuL1GukwLc="
                }
        }
    }
```

###### loom karma update-oracle

可以使用 `loom update-oracle` 命令更新 oracle，该命令使用 UpdateOracle karma 方法

```bash
$ loom karma update-oracle --help
change the oracle

Usage:
  loom karma update-oracle (new oracle) [old oracle] [flags]

Flags:
  -h, --help   help for update-oracle

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")
```

将 oracle 从 `old oracle` 变成 `new oracle`.  
例如，如果 default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 是当前的oracle

```bash
$ karma update-oracle   default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90  -k ./cmd/loom/data/pri
oracle changed
```

如果尚未设置 oracle，旧的 oracle 就会被删去。

## 源

Karma 是由源产生的。 源可以对应于不同的用户类型，权限级别，升级或状态的临时更改。

```go
type KarmaSourceReward struct {
    Name   string
    Reward int64
}
```

`Name` 是用于识别源的描述性字符串。 `Reward` 用于增加与源关联的 karma。 高 `Reward` 值意味着源生成的每个 karma 点数比低 `Reward` 的源具有更多效果。

可以在 genesis 文件中或稍后通过调用 karma GetSources 和 ResetSources 方法来配置源。

### 源：Genesis 文件

可以在 DApp 链 genesis 文件的 karma `init` 段中设置源。 让第一次运行DApp链时就可以使用源。 例如：

```json
    {
        "vm": "plugin",
        "format": "plugin",
        "name": "karma",
        "location": "karma:1.0.0",
        "init": {
            "Params": {
                "sources": [
                    {
                        "name": "sms",
                        "reward": "1"
                    },
                    {
                        "name": "oauth",
                        "reward": "3"
                    },
                    {
                        "name": "token",
                        "reward": "4"
                    }
                ]
            }
        }
    }
```

这用三个源启动了DApp链，"sms", "oauth" 和 "token" ，有不同的奖励等级。

### 源：ResetSources

Karma 方法 `ResetSources` 用于重置 karma 参数，包括正在运行的 DApp 链中的源。 你可能想要使用 `GetSources` 下载现有参数，并在使用 `UpdateConfig` 设置 karma 配置参数之前对其进行修改。

###### loom karma get-sources

用 get-sources `loom` 命令列出使用了 GetSources karma 方法的 karma 源。

```bash
$ loom karma get-sources --help
list the karma sources

Usage:
  loom karma get-sources [flags]

Flags:
  -h, --help   help for get-sources

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")

Process finished with exit code 0
```

例如

```bash
$ loom karma get-sources
{
  "sources": [
    {
      "name": "sms",
      "reward": "1"
    },
    {
      "name": "oauth",
      "reward": "3"
    },
    {
      "name": "token",
      "reward": "4"
    }
  ]
}
```

###### loom karma reset-sources

可以使用通过 `loom karma update-sources` 命令到达的 ResetSources karma 方法重置源。 如果要添加到现有源，可能需要使用 `loom karma get-sources` 获取这些现有源。

```bash
$ loom karma reset-sources --help
reset the sources

Usage:
  loom karma reset-sources (oracle) [ [source] [reward] ]... [flags]

Flags:
  -h, --help   help for update-sources

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")

```

例如，如果 `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` 之前被设定为 oracle。

```bash
$ loom karma reset-sources default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" 3 "token" 5 "test" 7
sources successfully updated
```

##### go-loom update sources

下面的 Go 代码片段给出了一个示例，说明如何使用 go-loom 在 Go 中执行此操作，跳过错误检查以提高可读性。

```go
import `github.com/loomnetwork/go-loom/builtin/types/karma`

func AddSource(name string, reward int64, signer auth.Signer, oracle loom.Address, karmaContact client.Contract) {

    // Get the existing configuration parameters
    var resp karma.KarmaSources
    _, err := karmaContact.StaticCall("GetSources", oracle.MarshalPB(), oracle, &resp)

    // Add the new source
    var configVal karma.KarmaSourcesValidator
    configVal.Oracle = oracle.MarshalPB()
    configVal.Sources = append(resp.Sources, &karma.KarmaSourceReward {
            Name: name,
            Reward: reward,
    })

    // Update the source information on the DAppChain
    _, err = karmaContact.Call("ResetSources", &configVal, signer, nil)
}
```

## 用户

如果已经启用了 karma，每个用户通过 karma 分配可以调用的事务都会受到限制。 如果启用 karma，以下限制就会应用。

###### Deploy transactions

进行任何事务都需要完全正确的 karma。

如果 `KarmaMaxDeployCount` 为零，则此处部署事务率没有限制。

否则，用户在任何 `SessionDuration` 时间段内只能运行 `KarmaMaxDeployCount` 部署事务。

###### Call transactions

进行任何事务都需要完全正确的 karma。

如果 `KarmaMaxCallCount` 为零，则此处调用事务率没有限制。

否则，用户在任何 `SessionDuration` 时间段内只能运行 `KarmaMaxCallCount + total karma` 调用事务。 其中 `total karma1` 是根据用户持有的源数量计算的，如下所述。

### #用户 Karma

每个用户都将与零个或多个源相关联。 此列表可能包含 karma 的当前源列表中的活动源，或未在当前源列表中的非活动源。

```go
type KarmaSource struct {
    Name  string
    Count int64 
}

type KarmaAddressSource struct {
    User    *types.Address 
    Sources []*KarmaSource 
}
```

`Name` 标识源并对应于上面 `KarmaSourceReward` 中的 `Name` 字段。 `Count` 与地址关联的特定源的编号。 提供给用户的 karma 源是`

`KarmaSource.Count*KarmaSourceReward.Reward`

Karma 的总量是来自与用户相关联的每个活跃 karma 源的 karma 总和。 与用户关联的源可以在 genesis 文件中配置，也可以通过 karma 方法 `AppendSourcesForUser` 和 `DeleteSourcesForUser` 配置。

#### 用户：Genesis 文件

用户可以与 genesis 文件中的源相关联。 这允许用户在新的 DApp 链一启动时就可以获得 karma。 例如：

```json
        {
            "vm": "plugin",
            "format": "plugin",
            "name": "karma",
            "location": "karma:1.0.0",
            "init": {
                "Params": {
                    "sources": [
                        {
                            "name": "sms",
                            "reward": "1"
                        },
                        {
                            "name": "oauth",
                            "reward": "3"
                        },
                        {
                            "name": "token",
                            "reward": "4"
                        }
                    ],
                    "users": [
                        {
                            "user": {
                                "chainId": "default",
                                "local": "QjWhaN9qvpdI9MjS1YuL1GukwLc="
                            },
                            "sources": [
                                {
                                    "name": "oauth",
                                    "count": "10"
                                },
                                {
                                    "name": "token",
                                    "count": "3"
                                }
                            ]
                        }
                    ],
                }
            }
        }
```

这个 genesis 文件片段将创建三个源，并为本地地址为 `QjWhaN9qvpdI9MjS1YuL1GukwLc` 的用户提供来自 `oauth` 的10个奖励和来自 `token` 的3个奖励。 然后这个用户就会有 `10*3 + 3*4 = 42` 个 karma 了。

#### 用户: AppendSourcesForUser and DeleteSourcesForUser

在一个正在运行的 DApp 链中，我们可以使用 karma 方法 `AppendSourcesForUser` 向用户添加源。 我们需要一个新源名单，以及奖励数量的计数。 可以使用 DeleteSourcesForUser 删除源。

###### loom karma append-sources-for-user

新的源可以使用 karma 方法 AppendSourcesForUser 与用户相关联， 这可以使用 ` loom karma append-sources-for-user ` 命令来访问。

```bash
$ ./loom karma append-sources-for-user  --help
add new source of karma to a user, requires oracle verification

Usage:
  loom karma append-sources-for-user (user) (oracle) [ [source] [count] ]... [flags]

Flags:
  -h, --help   help for append-sources-for-user

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")
```

例如：如果`default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` 是 oracle，code>default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F</code> 是那个我们想要为之添加新源的用户。

```bash
$ ./loom karma append-sources-for-user default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F  default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" 4 "token" 3 -k ./cmd/loom/data/pri
sources successfully updated
```

###### loom karma delete-sources-for-user

可以使用 karma 方法 DeleteUsersForUser 将现有源与用户解除关联。 为此，你可以使用 ` loom karma delete-sources-for-user `。  

```bash
$ loom karma delete-sources-for-user --help
delete sources assigned to user, requires oracle verification

Usage:
  loom karma delete-sources-for-user (user) (oracle) [name]... [flags]

Flags:
  -h, --help   help for delete-sources-for-user

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")
```

例如：如果`default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` 是 oracle，`default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F` 是那个我们想要为之删除源的用户。

```bash
$ ./loom karma delete-sources-for-user default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F  default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" "token" -k ./cmd/loom/data/pri
sources successfully deleted
```

###### loom karma get-user-state

要获取已经与用户关联的源列表，可以使用 loom 命令 `loom karma get-user-state`。

```bash
$ loom karma get-user-state --help
list the karma sources for user

Usage:
  loom karma get-user-state (user address) [flags]

Flags:
  -h, --help   help for get-user-state

Global Flags:
  -a, --address string   address file
      --chain string     chain ID (default "default")
  -k, --key string       private key file
  -r, --read string      URI for quering app state (default "http://localhost:46658/query")
  -w, --write string     URI for sending txs (default "http://localhost:46658/rpc")
```

例如，如果`default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` 是你感到好奇的用户

```bash
./loom karma get-user-state default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90
```

## Karma 方法

任何人都可以调用下面的方法。

* `GetSources(ctx contract.StaticContext, ko *types.Address) (*ktypes.KarmaSources, error)` 返回当前 karma 配置细节。也包括当前的源。
* `GetTotal(ctx contract.StaticContext, params *types.Address) (*karma.KarmaTotal, error)` 返回系统中 karma 的总量。 每个用户已经与源关联的 karma 总和。
* `GetUserState(ctx contract.StaticContext, user *types.Address) (*karma.KarmaState, error)` 返回与用户关联的源和计数。

除非还没有 oracle，否则只能通过引用 oracle 来调用。

* `UpdateOracle(ctx contract.Context, params *ktypes.KarmaNewOracleValidator) error`

下面的方法只能通过引用 oracle 来调用

* `ResetSources(ctx contract.Context, kpo *ktypes.KarmaSourcesValidator) error` 重置可能的源列表。
* `AppendSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateUser) error` 将带计数的一组源关联到用户。 请参阅上文了解详情。 
* `DeleteSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateKeyUser) error` 接触一组源与用户的关联。 请参阅上文了解详情。 

其他方法

* `Meta() (plugin.Meta, error)`
* `Init(ctx contract.Context, req *InitRequest) error`

## Genesis 项

下面是一个实例 genesis 文件项。 Init 块可以为空，只是在 DApp 链上安装 karma 合约。 你可以在 genesis 文件里定义一个 Oracle。 如果你不这样做，你仍然可以调用 karma 方法 `UpdateOracle` 来创建一个初始的 Oracle。 可以用 karma 源列表初始化 karma 合约。 如果执行此操作，还可以将这些源按比例分配给一些用户。

```json
        {
            "vm": "plugin",
            "format": "plugin",
            "name": "karma",
            "location": "karma:1.0.0",
            "init": {
                "Oracle": {
                    "chainId": "default",
                    "local": "QjWhaN9qvpdI9MjS1YuL1GukwLc="
                 },
                "sources": [
                    {
                        "name": "sms",
                        "reward": "1"
                    },
                    {
                        "name": "oauth",
                        "reward": "3"
                    },
                    {
                        "name": "token",
                        "reward": "4"
                    }
                ],
                "users": [
                    {
                        "user": {
                            "chainId": "default",
                            "local": "QjWhaN9qvpdI9MjS1YuL1GukwLc="
                        },
                        "sources": [
                            {
                                "name": "oauth",
                                "count": "10"
                            },
                            {
                                "name": "token",
                                "count": "3"
                            }
                        ]
                    }
                ]

            }
        }
```