---
id: karma
title: Karma
sidebar_label: Karma
---

Karma
-----

The karma module provides a way to limit Transactions on a user by user case.
One user, called the oracle is given unlimited access, other users are limited 
in the number and timing of transactions by various karma parameters.  

## Installation

To install include the karma contract in the genesis.json file when starting the
chain for the first time.
```json
     {
            "vm": "plugin",
            "format": "plugin",
            "name": "karma",
            "location": "karma:1.0.0",
            "init": {
            }
        },

```
  
## Activation

Activating the karma functionality is done from the loom.yaml configuration file.
* DeployEnabled Toggles the karma module on and off. 
* Oracle: Address for the Oracle. The Oracle is unaffected by karma restrictions. 
An Oracle is compulsory if karma is enabled.
e.g.
```yaml
DeployEnabled: true
Oracle:        "default:0xAfaA41C81A316111fB0A4644B7a276c26bEA2C9F"
```


## Oracle
The Oracle has general override ability for a DAppChain. It is defined in the `loom.yaml` file.

* The Oracle is compulsory is karma is enabled.
* It is unaffected by karma restrictions.
* It is the only user that can successfully call the following karma configuration transactions.
    * `UpdateSourcesForUser`
    * `DeleteSourcesForUser`
    * `UpdateConfigOracleMutability`
    * `UpdateConfigOracle`


Some non-karma but related features of the Oracle include being unaffected by 
`DeployEnabled` and `CallEnabled` `loom.yaml` settings. 
`DeployEnabled: false` disable all deploy transactions on the DAppChain, and `
CallEnabled: false` similarly disabled all call transactions.

## Sources
