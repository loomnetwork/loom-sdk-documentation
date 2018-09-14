---
id: karma
title: Karma
sidebar_label: Karma
---

Karma
-----

The karma module provides a way to limit Transactions.
Users are limited in the number and timing of transactions by various karma parameters. There
is one user called the Oracle who has unlimited access.  

## Installation

To install, include the karma contract in the genesis.json file when starting the
chain for the first time.
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

Activating the karma functionality is done from the loom.yaml configuration file.
* `KarmaEnabled bool` Flag that sets the karma module on or off. 
* `KarmaSessionDuration int64` A Time period in seconds. Karma restricts users to a configurable
 number of transactions during any interval of `SessionDuration` seconds.
* `KarmaMaxCallCount int64` Base value used to calculate number of call Transaction permitted per `SessionDuration`.
A `KarmaMaxCallCount int64` of `0` indicates there are no limit imposed on call transactions number.
* `KarmaMaxDeployCount int64` Base value used to calculate number of deploy Transaction permitted per `SessionDuration`.
A `KarmaMaxDeployCount int64` of `0` indicates there are no limit imposed on deploy transactions number.
Example loom.yaml fragment.
```yaml
KarmaEnabled: true
KarmaSessionDuration: 60
KarmaMaxCallCount: 10
KarmaMaxDeployCount: 5
```

## Oracle
* The Oracle is compulsory is karma is enabled.
* It is defined in the genesis file, and can be updated by the karma method UpdateOracle.
* It is unaffected by karma restrictions.
* It is the only user that can successfully call the following karma configuration transactions.
    * `UpdateSourcesForUser`
    * `DeleteSourcesForUser`

Some non-karma but related features of the Oracle include being unaffected by 
`DeployEnabled` and `CallEnabled` `loom.yaml` settings. 
`DeployEnabled: false` disable all deploy transactions on the DAppChain, and `
CallEnabled: false` similarly disabled all call transactions.

## Sources
Karma is generated by sources. Sources could correspond to different user types,
privilege levels, promotions or temporary changes in status.
```go
type KarmaSourceReward struct {
    Name   string
    Reward int64
}
```
`Name`is a descriptive string used to identify a source.
`Reward`is used to multiply karma associated with the source. A high `Reward` value means
 each point of karma generated by the source has more effect than a source with a lower `Reward`.
 
 Sources can be configured in two ways.
 
 #### Sources: Genesis File
 Sources can be set up in the karma `init` segment of the DAppChain genesis file. 
 This allows sources to be available the first time the DAppChain is run. For example:
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
This starts the DAppChain with three sources, "sms", "oauth" and "token" with varying reward levels.

#### Soures: UpdateSources
The karma method `UpdateSources` is used to reset the karma parameters including the sources
in a running DAppChain. 
Usually you will want to download the existing parameters with `GetSources` and amend that before
using to set the karma configuration parameters with `UpdateConfig`. The following code fragment
gives an example of how you might do this, error checking skipped for readability.
```go
import `github.com/loomnetwork/go-loom/builtin/types/karma`

func AddSource(name string, reward int 64, signer auth.Signer, oracle loom.Addres, karmaContact client.Contract) {

	// Get the existing configuration parameters
	var resp karma.KarmaConfig
	_, err = karmaContact.StaticCall("GetSources", oracle.MarshalPB(), signer, &resp)
	sources, err := formatJSON(&resp)
	
	// Add the new source
	var configVal karma.KarmaConfigValidator
	configVal.Oracle = oracle.MarshalPB()
	configVal.Parms = sources
	configVal.Parms.Sources = append(sources.Parms.Sources, karma.KarmaSourceReward {
            Name: name,
            Reward: reward,
	})
	
	// Update the source information on the DAppChain
	_, err = karmaContact.Call("UpdateSources", configVal, signer, nil)
}
```
## Users
If karma has been enabled, each user will be restricted in the transactions they can
call by their karma allocation. 
A user will only be able to run `SessionMaxAccessCount plus karma``call` transactions in any 
`SessionDuration`seconds. `Deploy` transactions are only effected by `SessionMaxAccessCount` and
not by karma.

Each user will be associated with zero or more sources. This list may contain both active sources, 
in karma's current list of sources, or inactive sources.  
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
`Name` identifies a source and corresponds to the `Name` field in `KarmaSourceReward` above.
`Count` the number of a particular source associated with the address.
The karma a source provides to a user is `

`KarmaSource.Count*KarmaSourceReward.Reward`

The total amount of karma is the sum of the karma from each active karma source associated with the user.
The sources associated with a user can configured either in the genesis file or by the karma 
methods `UpdateSourcesForUser` and `DeleteSourcesForUser`.

#### Users: Genesis File
Users can be associated with sources in the genesis file. This allows users to have
karma available as soon a new DAppChain starts.  For example:
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
This genesis file fragment will create three sources and give the user with local address
`QjWhaN9qvpdI9MjS1YuL1GukwLc` 20 rewards from `oauth` and3 rewards from `token`.
This user would than start with `20*10 + 3*4 = 42` karma.

#### Users: UpdateSourcesForUser and DeleteSourcesForUser
In a running DAppChain we can add a source to a user with `UpdateSourcesForUser`. We need a list of 
name sof the new sources, plus a count of the number of rewards. The following code fragment
gives an example of how you might do this, error checking skipped for readability.
```go
import `github.com/loomnetwork/go-loom/builtin/types/karma`

func AddSourceForUser(name string, count int64, user, oracle loom.Addres, signer auth.Signer, karmaContact client.Contract) error {	
	// Update the source information on the DAppChain
	_, err := karmaContact.Call("UpdateSourcesForUser", &karma.KarmaStateUser{
        User: user.MarshalPB(),
        Oracle: oracle.MarshalPB(),
        SourceStates: []*karma.KarmaSource{{name, count}},
    }, signer, nil)
	return err
}
```
Similarly we can remove a source from those associated with a user on an existing DAppChain using the 
DeleteSourcesForUser karma method.
```go
import `github.com/loomnetwork/go-loom/builtin/types/karma`

func RemoveSourceForUser(name string, user, oracle loom.Addres, signer auth.Signer, karmaContact client.Contract) error {	
	// Update the source information on the DAppChain
	_, err := karmaContact.Call("UpdateSourcesForUser", &karma.KarmaStateKeyUser{
        User: user.MarshalPB(),
        Oracle: oracle.MarshalPB(),
        StateKeys: []string{name},
    }, signer, nil)
	return err
}
```

#### SessionDuration and SessionMaxAccessCount
If karma is enabled, all users other than the Oracle are restricted depending on the 
karma parameters, `SessionDuration` and `SessionMaxAccessCount`, in the loom.yaml.
Each user is restricted, during any period of `SessionDuration` seconds to a number of transactions
dependant on `SessionMaxAccessCount` and the user's karma.

* A user can only make transactions if they have strictly positive karma.
* A zero `SessionMaxAccessCount` means that only karma based restriction
on transaction usage is that the user must have non-zero karma.
* For strictly positive `SessionMaxAccessCount`
    * `Deploy` transaction are limited to `SessionMaxAccessCount` per time period.
    * `Call` transaction are limited to `SessionMaxAccessCount + karma` per time period. 
    
## Karma methods
The following methods can be called by anyone.
* `GetSources(ctx contract.StaticContext, ko *types.Address) (*Config, error)` Returns the 
current karma configuration details. This includes the current sources.
* `GetTotal(ctx contract.StaticContext, params *types.Address) (*karma.KarmaTotal, error)` Returns 
the total amount of karma in the system. The sum of the karma for each user that has been associated with a source.

The following methods can only be called by the oracle
* `UpdateSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateUser) error` 
Associate a collection of sources with counts with a user. See above for details. 
* `DeleteSourcesForUser(ctx contract.Context, ksu *karma.KarmaStateKeyUser) error` Disassociate a 
collection of sources with a user. See above for details. 
* `UpdateSources(ctx contract.Context, kpo *karma.KarmaConfigValidator) error` Reset the karma 
contracts parameters. In particular this allows the list of sources to be updated

Other methods
* `Meta() (plugin.Meta, error)`
* `Init(ctx contract.Context, req *InitRequest) error`
  
## Genesis entries
An example genesis file entry is shown below. The Init block can be empty, which just installs
the karma contact on the DAppChain. 
It is possible to initialise the karma contract with a list of karma sources. It you do this, you
can also allocate a list of users to have allocated amounts of these sources.
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
                    ]
                 }
            }
        }
```