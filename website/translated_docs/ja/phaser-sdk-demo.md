---
id: phaser-sdk-demo
title: Phaser SDK Demo
sidebar_label: Phaser SDK Demo
---
![Game screenshot](/developers/img/screenshot.png)

A basic example showcasing a simple HTML5 game interacting with a Loom DappChain, using [Phaser](http://phaser.io) and [Loom.js](https://github.com/loomnetwork/loom-js).

## Game instructions

Use the arrow keys to move around, jump by pressing the up arrow. For each passing row of blocks, 1 point is awarded. Collect bonus stars to increase your score further.

## Development

1.) Run your own DappChain

Install Loom

    wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-128/loom
    chmod +x loom
    
    mkdir tmpgopath
    export GOPATH=`pwd`/tmpgopath
    ./loom spin weave-blueprint
    cd blueprint
    export GOPATH=$GOPATH:`pwd`
    make deps
    make
    cd build
    
    ../../loom init
    cp ../genesis.example.json genesis.json
    
    

Run Blockchain

    ../../loom run
    

Please consult the [Loom SDK docs](https://loomx.io/developers/docs/en/prereqs.html) for further instruction on running your own DappChain.

2.) Start the dev server

Run dev server

    # Install
    yarn
    
    # Compile protobuff
    yarn run proto
    
    # Start the dev server
    yarn run dev
    
    

## Loom Network

<https://loomx.io>

## License

MIT