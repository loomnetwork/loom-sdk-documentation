---
id: prereqs
title: 前提条件
sidebar_label: インストール
---
Wget

    brew install wget

Golang

    wget https://dl.google.com/go/go1.10.2.darwin-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.10.2.darwin-amd64.tar.gz
    sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
    mkdir ~/gopath
    export GOPATH=~/gopath
    *Add GOPATH to your bashrc  or zshrc
    

Protobufs https://github.com/google/protobuf/releases/tag/v3.5.1

    wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip
    unzip protoc-3.5.1-osx-x86_64.zip
    sudo unzip protoc-3.5.1-osx-x86_64.zip -d /usr/local
    sudo chmod +X /usr/local/bin/protoc
    export GOPATH=~/gopath 
    go get -u github.com/golang/protobuf/protoc-gen-go
    

## インストール

    wget https://storage.googleapis.com/private.delegatecall.com/loom/osx/build-94/loom
    chmod +x loom 
    
    mkdir tmpgopath
    export GOPATH=`pwd`/tmpgopath
    ./loom spin weave-blueprint
    cd blueprint
    export GOPATH=$GOPATH:`pwd`
    make deps
    make
    make cli
    cd build
    cp ../genesis.example.json genesis.json
    
    ../../loom init
    

## ブロックチェーンの起動

    ../../loom run
    

## トランザクションの送信

2 番目のコンソール画面を開こう。   
  
このようにして秘密鍵を生成し、アカウントを作成する。そしてバリューを設定し、そのバリューをブロックチェーンから読み取る。

Blueprint contract のソースは[こちら](https://github.com/loomnetwork/weave-blueprint)を参照

    cd blueprint
    build/blueprint genkey
    build/blueprint create-acct
    build/blueprint set -v 1
    build/blueprint get