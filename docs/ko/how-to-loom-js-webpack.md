---
id: loom-js-webpack
title: How to Use loom-js with Webpack
sidebar_label: How to Use loom-js with Webpack
---

## Purpose

This document shows how to use `loom-js` with a bundler. In this tutorial, we'll be using [Webpack](https://webpack.js.org/), but it should work similarly with any other bundler.

Note that this tutorial is based on the [Getting Started with Webpack](https://webpack.js.org/guides/getting-started/) example. However, we tweaked it a bit and added a couple of things to fit our purpose.

## Prerequisites

* Node.js 10 or higher (recommended v10.15.3) To check out if Node.js is installed on your computer, fire up a terminal and type the following command:

```
node -v
```

If Node.js is already installed, you'll see something like the following:

```
v10.15.3
```

If Node.js is not installed, or you're running an older version, you can download the installer from [this page](https://nodejs.org/en/download/).


## Settings things up

1. In a terminal window, go to the directory where you want to create the new project and enter the following commands:


```bash
mkdir loom-js-webpack-demo && cd loom-js-webpack-demo
```

2. Initialize the project and install `webpack` and `webpack-cli` as development dependencies with:

```bash
npm init -y && npm install webpack webpack-cli --save-dev
```

3. Create a file called `src/index.js` with the following content:

```js
function connectToLoom () {
 // leave the body of the function empty, we'll fill it in later
}
```

4. Then, create another file called `dist/index.html` and paste into it the following content:

```html
<html>
  <head>
    <title>Set up loom-js with Webpack</title>
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
</html>
```

5. Create a webpack configuration file called `webpack.config.js` with the following content:

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

## The package.json file

1. Open the `package.json` file and replace the `"main": "index.js"` line with `"private": true`.

Open the `package.json` file and add the following line to the `scripts` object:

```json
"build": "webpack"
```

At this point you can run `npm run build` to verify if everything works well. You should see something like the following printed out to the console:

```
Hash: f8f86440ea96399f110d
Version: webpack 4.41.2
Time: 110ms
Built at: 10/25/2019 12:16:21 PM
 Asset Size Chunks Chunk Names
main.js 930 bytes 0 [emitted] main
Entrypoint main = main.js
[0] ./src/index.js 54 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

Notice the warning. In the next section, we'll properly set up the development environment.

## Setting up the Development Environment

Edit the `webpack.config.js` file and make the following changes:


1. At the top of the file, add a line that imports the `path` module:

```js
const path = require('path');
```

2. Replace the `module.exports` section with the following:

```js
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

## The Webpack development server

1. First, we must install the Webpack development server with:

```js
npm install --save-dev webpack-dev-server
```

2. Now that the required package is installed, let's enable the Webpack development server by adding the following lines to the `module.exports` section of the `webpack.config.js` file:

```js
devServer: {
  contentBase: './dist',
},

```

3. For convenience, we would want to start the web server using `npm run start`. To do so, add the following line to the `scripts` section of the `package.json` file:

```js
"start": "webpack-dev-server --open"
```

## Tweaking the webpack.config.js file

1. Because we want to run this in the browser, we must add the following snippet to the `module.exports` section of the `webpack.config.js` file:

```js
node: {
 fs: 'empty',
 child_process: 'empty'
}
```

`fs` and `child_process` are node modules, so we need to ignore them while building for the browser. This way, we'll get rid of the compilation errors.

## Babel

[Babel](https://babeljs.io/docs/en/index.html) is a tool that converts ECMAScript 2015+ code into JavaScript code that older browsers can run. With Babel, you can use the latest syntax without having to worry that a particular browser can't run it yet.

1. Enter the following command to install Babel as a development dependency:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-loader
```

2. To use Babel with Webpack, all what's left to do is to add the following snippet to your `webpack.config.js`:


```js
module: {
  rules: [
    {
      test: [/.js$/],
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    },
  ]
},
```

At this point, your `webpack.config.js` file should look something like the following:

```js

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
    ]
  },
}
```

## The Demo

For the scope of this tutorial, we'll write a simple demo that deploys a contract to our testnet, writes a value to the blockchain and then reads it.

1. First, let's install a few dependencies:

```bash
npm install loom-js web3 solcjs-core
```


2. Next, replace the content of the `src/index.js` file with the following snippet:

```js
import {
  CryptoUtils,
  Client,
  LoomProvider,
  LocalAddress,
} from 'loom-js'

import Web3 from 'web3'

const solcjsCore = require('solcjs-core')

function createClient() {
  const writeUrl = 'ws://extdev-plasma-us1.dappchains.com:80/websocket'
  const readUrl = 'ws://extdev-plasma-us1.dappchains.com:80/queryws'
  const networkId = 'extdev-plasma-us1'
  const client = new Client(networkId, writeUrl, readUrl)
  client.on('error', msg => {
    console.error('Error on connect to client', msg)
  })
  return client
}

function createWeb3Instance(client, privateKey) {
  const web3js = new Web3(new LoomProvider(client, privateKey))
  return web3js
}

function getUserAddress(privateKey) {
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  const address = LocalAddress.fromPublicKey(publicKey).toString()
  return address
}

async function deployContract(web3js, userAddress) {
  const compiler = await solcjsCore.solc()
  const sourceCode = `
  pragma solidity >0.4.99 <0.6.0;

  contract SimpleStore {
  uint value;

  event NewValueSet(uint _value);

  function set(uint _value) public {
  value = _value;
  emit NewValueSet(value);
  }

  function get() public view returns (uint) {
  return value;
  }
  }
  `
  const output = await compiler(sourceCode)
  const abi = output[0].abi
  const bytecode = output[0].binary.bytecodes.bytecode
  const contract = new web3js.eth.Contract(abi)
  const contractInstance = await contract.deploy({ data: bytecode }).send({ from: userAddress })
  return contractInstance
}

async function connectToLoom() {
  const client = createClient()
  const privateKey = CryptoUtils.generatePrivateKey()
  const web3js = createWeb3Instance(client, privateKey)
  const userAddress = getUserAddress(privateKey)
  console.log('Your address is: ' + userAddress)
  const contractInstance = await deployContract(web3js, userAddress)

  const value = 11
  await contractInstance.methods.set(value).send({
    from: userAddress
  })
  const retVal = await contractInstance.methods.get().call({
    from: userAddress
  })
  if (retVal != value) {
    console.log('An error has occured!')
  } else {
    console.log('Success!')
  }
}

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');
  btn.innerHTML = 'Click here. The output will be printed in the console.';
  btn.onclick = connectToLoom;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
```

Now, this is a mouthful. Basically, the snippet does the following:

 * instantiates a `Client`
 * creates a web3 instance
 * deploys the `SimpleStore` smart contract
 * calls the `set` method to store `value` on the blockchain
 * calls the `get` method to read the value we just stored
 * compares the retrieved value with the one we saved and prints out a message to the console.

Too keep things simple, we won't go deeper into details here about how this code works.

## Spin up the web server

At this point you are ready to spin up the web server by entering the following command:

```bash
npm run start
```

This concludes our tutorial. Even if the example was pretty basic, the knowledge you acquired should be enough to help you build your own DApp with Loom and Webpack

Please feel free to reach out to us on [Telegram](https://t.me/loomnetworkdev) if you have any questions about this tutorial or just want to leave us feedback.
