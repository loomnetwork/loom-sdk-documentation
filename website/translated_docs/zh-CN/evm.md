---
id: evm
title: Ethereum Virtual Machine
sidebar_label: EVM page
---
## Overview

loom DAppChains contain an ethereum virtual machine (EVM) and allows you to deploy and run smart contracts that compile to EVM bytecode.

#### Ethereum virtual machine

An EVM consist of a database and the interpreter for EVM bytecode.

The interpreter runs EVM bytecode and is specially designed for creating secure deterministic programs suitable for blockchains. The most popular language for coding EVM smart contracts is Solidity, and this is the language that we at loom have been testing with; however any language that  
compiles to EVM bytecode can be run by the EVM interpreter.

The database is keyed by addresses for each of the programs that have been deployed on the EVM. The value contains the program's bytecode and any associated data.

#### DAppChains and EVM

There are currently three ways to interact with the DAppChain's EVM.

1. A smart contact can be deployed on initial startup of the blockchain.
2. The loom command line tool allows deploying a smart contract or calling a method on an already deployed contract.
3. Another smart contract, either an EVM contract or another plugin contract, can call methods on an already deployed EVM contract.
    
    An EVM smart contract is deployed to a DAppChain in the form of compiled bytecode. Which makes the chain unaware of the parent language. Parameters to solidity smart contract method calls are encoded wtih the Application Binary Interface (ABI) [documented on the solidity website](https://solidity.readthedocs.io/en/develop/abi-spec.html). The ABI can get quite complex, however ethereum implementations should, as we see later, give function to support parameter generation.
    
    ### Deploy on Boot up.
    
    Contracts can be deployed on an DAppChain on boot up, by putting the compiled code in the contracts directory and linking the `genesis.json` file.
    
    Here is an example genesis file. ```json { "contracts": [ { "vm": "EVM", "format": "truffle", "name": "SimpleStore", "location": "/path/to/loomchain/contracts/SimpleStore.json" }, { "vm": "plugin", "format": "plugin", "name": "wrapstore", "location": "wrapstore:1.0.0", "init": {
    
             }
         }
        
    
    ] }

    There are two contracts in the top array. The first is an EVM contract, and 
    the second one, we will see later, is a plugin that access the solidity 
    contract.
    * `vm:` The virtual machine used to run the contract. Currently there are two 
    options.
      1. `plugin`   User created contracts.
      2. `EVM`      contract run on DAppChains EVM.
    * `format` The nature of the smart contract's input file in the contracts 
    directory.
      1. `plugin`   User plugin, can be produced by `go-loom`.
      2. `truffle`  Solidity program, compiled using truffles compiler.
      3. `solidity` Solidity program, compiled uisng solc.
      4. `hex`
    * `name` This name can be used to retrieve the address of the contract 
    assigned by loom or the EVM.
    * `location` Versioned name of the file binary file located in the contracts 
    directory. For truffle and solidity it might be necessary to give the full path.
    
    So in this example the loom DAppChain will take the bytecode from the truffle
    compilation of our SimpleStore solidity contract. It will then deploy it on 
    the chain's EVM. Confirmation and the contracts address will be available in 
    loom's logging information.
    
    ### Deploy and run from command line
    
    The loom command line tool has two commands for interacting with the 
    chains's EVM.
    * `deploy` This will deploy a smart contract in EVM bytecode onto the chain's 
    EVM.
    * `call` This will call a method on an already deployed EVM smart contract.
    
    ##### Deploy
    
    ```text
    Deploy a contract
    
    Usage:
      loom deploy [flags]
    
    Flags:
      -a, --address string    address file
      -b, --bytecode string   bytecode file
          --chain string      chain ID (default "default")
      -h, --help              help for deploy
      -k, --key string        private key file
      -r, --read string       URI for quering app state (default "http://localhost:47000")
      -w, --write string      URI for sending txs (default "http://localhost:46657")
    

The -a and -k flags are used to identify the user with public and private key address files. -b gives the file where the raw EVM bytecode for the contract is held. Typically this will be generated using a solidity compiler such as `solc -o outfile.bin myProgram.sol`.

Example: 

    text
     ./loom deploy -a ./data/pub -k ./data/pri -b ./data/bytecode.bin  -w \
      http://localhost:46657 -r http://localhost:9999

  
If everythig works you should see something like: ```text New contract deployed with address: default:0xB448D7db27192d54FeBdA458B81e7383F8641c8A Runtime bytecode: [96 96 96 64 82 96 .... ]

    The output contract address can be used to call a method on the contract in 
    the call command.
    
    ##### Call
    
    ```text
    Call a contract
    
    Usage:
      loom call [flags]
    
    Flags:
      -a, --address string         address file
          --chain string           chain ID (default "default")
      -c, --contract-addr string   contract address
      -h, --help                   help for call
      -i, --input string           file with input data
      -k, --key string             private key file
      -r, --read string            URI for quering app state (default "http://localhost:47000")
      -w, --write string           URI for sending txs (default "http://localhost:46657")
    

The -a and -k flags are used to identify the user with public and private key address files. -c requires the contract address. This could be one output from a previous call to `\loom deploy` or retrieved from the start up log. -i is the input string. For a solidty contract this will be ABI encoded as descripted in the [Solidity ABI documentation](https://solidity.readthedocs.io/en/develop/abi-spec.html).

Example ```text call -a ./data/pub -k ./data/pri -i ./cmd/loom/data/inputGet.bin \ -c default:0xbD770416A3345f91E4b34576Cb804a576Fa48eB1 \ -w http://localhost:46657 -r http://localhost:9999

``` On completeion this will return the resonse from the deployed contract,

### From a user plugin