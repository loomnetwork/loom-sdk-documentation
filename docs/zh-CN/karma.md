---
id: karma
title: Karma
sidebar_label: Karma
---

## Karma

The karma module provides a way to limit Transactions. Users are limited in the number and timing of transactions by various karma parameters. There is one user called the Oracle who has unlimited access.

## Installation

To install, include the karma contract in the `genesis.json` file when starting the chain for the first time:

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

## Activation and loom.yaml

Activating the karma functionality is done from the `loom.yaml` configuration file.

* `KarmaEnabled bool` Flag that sets the karma module on or off.
* `KarmaSessionDuration int64` A Time period in seconds. Karma restricts users to a configurable number of transactions during any interval of `SessionDuration` seconds.
* `KarmaMaxCallCount int64` Base value used to calculate the number of call Transaction permitted per `SessionDuration`. A `KarmaMaxCallCount int64` of `0` indicates there is no limit imposed.
* `KarmaMaxDeployCount int64` Base value used to calculate the number of deploy Transaction permitted per `SessionDuration`. A `KarmaMaxDeployCount int64` of `0` indicates there is no limit imposed.

Example `loom.yaml` fragment:

```yaml
KarmaEnabled: true
KarmaSessionDuration: 60
KarmaMaxCallCount: 10
KarmaMaxDeployCount: 5
```

## Accessing karma methods

Public karma methods can either be run either directly in code using one of the SDKs or from the command line the using `loom` executable.

```bash
./loom karma --help
```

This will print the following output:

```text
call a method of the karma contract

Usage:
  loom karma [command]

Available Commands:
  add-karma      add new source of karma to a user, requires oracle verification
  delete-sources Delete one or more Karma sources for a user
  deposit-coin   deposit coin for deploys to the user's karma
  get-config     list the karma configuration settings
  get-sources    list the karma sources
  get-total      Check amount of karma user has, target can be either CALL or DEPLOY
  get-upkeep     get upkeep parameters
  get-user-state list the karma sources for user
  reset-sources  reset the sources, requires oracle verification
  set-active     set contract as active
  set-config     set the karma configuration settings
  set-inactive   set contract as inactive
  set-upkeep     set upkeep parameters
  update-oracle  change the oracle or set initial oracle
  withdraw-coin  withdraw coin for deploys to the user's karma

Flags:
      --algo string        crypto algo Ed25519 or Secp256k1 (default "ed25519")
      --chain string       chain ID (default "default")
      --contract string    contract address
  -e, --ethereum string    URI for talking to Ethereum (default "http://localhost:8545")
  -h, --help               help for karma
      --hsmconfig string   hsm config file
  -k, --key string         private key file
  -r, --read string        URI for quering app state (default "http://localhost:46658/query")
  -w, --write string       URI for sending txs (default "http://localhost:46658/rpc")

Use "loom karma [command] --help" for more information about a command.
```

## Oracle

* It is defined in the genesis file and can be updated by the `UpdateOracle` karma method.
* Note that the oracle is unaffected by karma restrictions.
* To successfully call the following karma configuration transactions it is necessary to reference the oracle: 
    * `AppendSourcesForUser`
    * `DeleteSourcesForUser`
    * `ResetSources`
    * `UpdateOracle`
* If no oracle has been set yet then anyone can call `UpdateOracle`. If an oracle has been set, it is necessary to know the old oracle in order to update it using `UpdateOracle`.

Example genesis file entry.

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

The oracle can be updated using the `loom update-oracle` command, which uses the `UpdateOracle` karma method:

```bash
./loom karma update-oracle --help
```

The output should be similar to this:

```text
change the oracle or set initial oracle

Usage:
  loom karma update-oracle <new-oracle> [flags]

Flags:
  -h, --help   help for update-oracle

Global Flags:
      --algo string        crypto algo Ed25519 or Secp256k1 (default "ed25519")
      --chain string       chain ID (default "default")
      --contract string    contract address
  -e, --ethereum string    URI for talking to Ethereum (default "http://localhost:8545")
      --hsmconfig string   hsm config file
  -k, --key string         private key file
  -r, --read string        URI for quering app state (default "http://localhost:46658/query")
  -w, --write string       URI for sending txs (default "http://localhost:46658/rpc")
Andreis-MacBook:loom andrei$ ./loom karma update-oracle --help
change the oracle or set initial oracle

Usage:
  loom karma update-oracle <new-oracle> [flags]

Flags:
  -h, --help   help for update-oracle

Global Flags:
      --algo string        crypto algo Ed25519 or Secp256k1 (default "ed25519")
      --chain string       chain ID (default "default")
      --contract string    contract address
  -e, --ethereum string    URI for talking to Ethereum (default "http://localhost:8545")
      --hsmconfig string   hsm config file
  -k, --key string         private key file
  -r, --read string        URI for quering app state (default "http://localhost:46658/query")
  -w, --write string       URI for sending txs (default "http://localhost:46658/rpc")
```

As an example, let's say `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` is the current oracle and `./cmd/loom/data/priv_key` is the path to the oracle's private key . Then, we could update the oracle like this:

```bash
./loom karma update-oracle karma update-oracle   default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90  -k ./cmd/loom/data/priv_key
```

On success, it will print:

```text
oracle changed
```

> The old oracle can be omitted if no oracle has been set yet.

## Sources

Karma is generated by sources. Sources could correspond to different user types, privilege levels, promotions or temporary changes in status.

```go
type KarmaSourceReward struct {
    Name   string
    Reward int64
}
```

`Name`is a descriptive name (`string`) used to identify a source. `Reward` is used to multiply karma associated with the source. A high `Reward` value means each point of karma generated by the source has more effect than a source with a lower `Reward`.

Sources can be configured in the `genesis.json` file or later by calling the karma `GetSources` and `ResetSources` methods.

### Sources: Genesis File

Sources can be set up in the karma `init` segment of the DAppChain genesis file. This allows sources to be available the first time the DAppChain is run. Let's take a look at an example:

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

This starts the DAppChain with three sources- "sms", "oauth" and "token". Each source has a different reward level.

### Sources: ResetSources

The karma method `ResetSources` is used to reset the karma parameters, including the sources, for a running DAppChain.

> You might want to download the existing parameters with `GetSources` and amend that before using them to set the karma configuration with `UpdateConfig`.

###### loom karma get-sources

To learn more about the available commands, type:

```bash
./loom karma get-sources --help
```

You should see something like this:

```text
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
```

Here's an example:

```bash
./loom karma get-sources
```

will print

```json
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

The sources can be reset via the `loom karma update-sources` command.

> If you want to add to the list of existing sources, you might want to get the list of existing sources first by running `loom karma get-sources`.

Let’s use the built-in help that to discover the available parameters and flags:

```bash
./loom karma reset-sources --help
```

You should see something similar to this:

```text
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

For example, if `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` has previous been set as the oracle, you could reset sources by running:

```bash
./loom karma reset-sources default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" 3 "token" 5 "test" 7
```

You should see:

```text
sources successfully updated
```

##### go-loom update sources

The following Go code fragment gives an example of how you might do this in Go using `go-loom`.

> Note: error checking is skipped for readability.

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

## Users

If karma has been enabled, each user will be restricted in the transactions they can call by their karma allocation. The following restrictions apply:

###### Deploy transactions

Strictly positive karma is required to do any transactions.

If `KarmaMaxDeployCount` is zero then there is no limit imposed.

Otherwise, users will only be able to deploy a maximum of `KarmaMaxDeployCount` transactions within a period of `SessionDuration` seconds.

###### Call transactions

Strictly positive karma is required to do any transactions.

If `KarmaMaxCallCount` is zero then there is no limit imposed.

Otherwise, users will only be able to make `KarmaMaxCallCount + total karma` call transactions in any period of `SessionDuration` seconds. The `total karma` is calculated from the count of sources held by the user as described below.

#### User Karma

Each user will be associated with zero or more sources. This list may contain:

* active sources (in karma's current list of sources) or
* inactive sources (not currently in the list of current sources)

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

`Name` identifies a source and corresponds to the `Name` field in the `KarmaSourceReward`. `Count` the number of a particular source associated with the address. The amount of karma a source provides to a user is equal to `KarmaSource.Count * KarmaSourceReward.Reward`.

The total amount of karma is the sum of the karma from each active karma source associated with the user.

The sources associated with a user can be configured either in the genesis file or by the karma methods `AppendSourcesForUser` and `DeleteSourcesForUser`.

#### Users: Genesis File

Users can be associated with sources in the genesis file. This allows users to have karma available as soon new DAppChain spins up. For example:

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

This genesis file fragment will create three sources and give the user with local address `QjWhaN9qvpdI9MjS1YuL1GukwLc`:

* 10 rewards from `oauth` and
* 3 rewards from `token`.

This user would then start with `10*3 + 3*4 = 42` karma.

#### Users: AppendSourcesForUser and DeleteSourcesForUser

In a running DAppChain, we can add a source to a user with the karma method `AppendSourcesForUser`. In order to do so, we need a list of the names of the new sources, plus a count of the number of rewards. Note that sources can be removed by calling `DeleteSourcesForUser`.

###### loom karma append-sources-for-user

New sources can be associated with a user by calling the karma method `AppendSourcesForUser`. You can also access it via the CLI:

```bash
/loom karma append-sources-for-user  --help
```

```text
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

For example, if `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` is the oracle and `default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F` the user to which we want to add a new source, you would want to run something similar to this:

```bash
./loom karma append-sources-for-user default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F  default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" 4 "token" 3 -k ./cmd/loom/data/pri
```

The output of the above command looks like:

    sources successfully updated
    

###### loom karma delete-sources-for-user

Existing sources can be disassociated with a user using the karma method `DeleteSourcesForUser`. To do the same, you can use the `loom karma delete-sources-for-user`.

To see the list of available command line parameters and flags, type:

```bash
./loom karma delete-sources-for-user --help
```

This command displays the following output:

```text
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

Say `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` is the oracle and `default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F` the user from which we want to remove sources. We'll delete the sources by running:

```bash
./loom karma delete-sources-for-user default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F  default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90 "oauth" "token" -k ./cmd/loom/data/pri
```

Once the sources are deleted, the above command will print:

```text
sources successfully deleted
```

###### loom karma get-user-state

To get the list of sources that have been associated with a user, you can use the `loom karma get-user-state` command.

First, let's take a look at the syntax:

```bash
./loom karma get-user-state --help
```

Output:

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
    

For example, if `default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90` is the user, you can get the list of the user's sources with the following command:

```bash
./loom karma get-user-state default:0xDeffe041cC978a193fCf0CE18b43b25B4592FC90
```

## Karma methods

The following methods can be called by anyone:

* `GetSources(ctx contract.StaticContext, ko *types.Address) (*ktypes.KarmaSources, error)`. Returns the current karma configuration details. This includes the current sources.

* `GetTotal(ctx contract.StaticContext, params *types.Address) (*karma.KarmaTotal, error)` Returns the total amount of karma in the system. It sums up the karma for each user that has been associated with a source.

* `UpdateOracle(ctx contract.Context, params *ktypes.KarmaNewOracleValidator) error`. This function can only be called by referencing the oracle unless there is no oracle yet.

The following methods can only be called by referencing the oracle:

* `ResetSources(ctx contract.Context, kpo *ktypes.KarmaSourcesValidator) error`. Resets the list of possible sources.

* `AppendSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateUser) error`. Associate a collection of sources with counts for a user. See above for details.

* `DeleteSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateKeyUser) error` Disassociate a collection of sources for a user. See above for details.

Other methods:

* `Meta() (plugin.Meta, error)`

* `Init(ctx contract.Context, req *InitRequest) error`

## Genesis entries

An example genesis file entry is shown below:

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

A few things to note:

* if the `init` block is left empty, it will just install the karma contact on the DAppChain.
* You can define an Oracle in the genesis file. As an alternative, you can create an oracle later by calling the karma method `UpdateOracle`.
* It is possible to initialize the karma contract with a list of karma sources. If you do this, you can also allocate a list of users to have allocated amounts of these sources.