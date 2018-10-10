---
id: extdev-transfer-gateway
title: トランスファーゲートウェイテストネットのチュートリアル
sidebar_label: トランスファーゲートウェイテストネット
---
## 概要

このドキュメントでは、`extdev`と`Rinkeby`にデプロイしたトークンコントラクト間のトークンの転送に必要となるセットアップの解説をする。 もしまだであれば、まず高レベルの概要 [Transfer Gateway](transfer-gateway.html)を読むべきである。

## 1. トークンコントラクトを `extdev`にデプロイする

トークンを `Rinkeby` にデプロイされたトークンコントラクトから`extdev` にデプロイされたコントラクトに移転したい場合、`extdev` にデプロイしたトークンコントラクトは`mintToGateway`関数を確実に実装していなければならない。 我々はそれらの対話を行うためのサンプルコントラクトと簡単なCLIを作成した。

### MyToken ERC721 コントラクト

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyToken is ERC721Token {
    // Transfer Gateway コントラクトアドレス
    address public gateway;

    constructor(address _gateway) ERC721Token("MyToken", "MTC") public {
        gateway = _gateway;
    }

    // DAppChainゲートウェイによって使われトークンを生成しイーサリアムゲートウェイにデポジットされる
    function mintToGateway(uint256 _uid) public
    {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        _mint(gateway, _uid);
    }
}
```

### MyCoin ERC20 コントラクト

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyCoin is StandardToken {
    // Transfer Gateway コントラクトアドレス
    address public gateway;

    string public name = "MyCoin";
    string public symbol = "MCC";
    uint8 public decimals = 18;

    constructor(address _gateway) public {
        gateway = _gateway;
        totalSupply_ = 0;
    }

    // DAppChainゲートウェイによって使われトークンを生成しイーサリアムゲートウェイにデポジットされる
    function mintToGateway(uint256 _amount) public {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        totalSupply_ = totalSupply_.add(_amount);
        balances[gateway] = balances[gateway].add(_amount);
    }
}
```

全てのコントラクトのソースはここで見つかる [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) 。

1. このチュートリアルではあなた自身のDAppChainを実行することはしないが、`loom` バイナリをダウンロードしよう。 `loom`バイナリにビルドインされたCLIコマンドを使って、`extdev` PlasmaChainとやりとりできる。
    
    ```bash
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
    # LOOM_BIN をダウンロードしたloomバイナリに参照する
    # どこからでも簡単に実行できるようにする
    export LOOM_BIN=`pwd`/loom
    ```

2. `node` (v8以降) と`yarn`がインストールされてるか確認する。

3. [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example) レポジトリをクローンする。
    
    ```bash
    # gateway-tutorialディレクトリにチュートリアルリポジトリをクローン
    git clone https://github.com/loomnetwork/truffle-dappchain-example gateway-tutorial
    cd gateway-tutorial
    # dependenciesのインストール
    yarn
    ```

4. `extdev`プラズマチェーンのコントラクトを呼びデプロイするために秘密鍵を生成する
    
    ```bash
    $LOOM_BIN genkey -k extdev_private_key -a extdev_public_key
    ```
    
    コンソールに何かこれに似た表示を見るはずである:
    
        local address: 0x3B334bEd1e7d3e7d9214495120160D9236aCbC31
        local address base64: OzNL7R59Pn2SFElRIBYNkjasvDE=
        
    
    これはあなたの新しい秘密鍵と対応した公開アドレスである。 `extdev_private_key`ファイルのなかに秘密鍵が見つかり、そして対応した公開鍵は`extdev_public_key`ファイルの中に見つかる。

5. あなたの新しいアカウントはコントラクトをデプロイしたり呼んだりする前にいくらかカルマが必要になる。 [Karma Faucet](http://faucet.dappchains.com)に行き(`0x`で始まる16進数エンコードの)たった今生成した公開アドレスを入力し`extdev`ネットワークを選択し`Request`ボタンを押して若干のkarmaを取得する。

6. `MyToken`と`MyCoin`コントラクトを`extdev`プラズマチェーンにデプロイする。
    
    ```bash
    yarn deploy:extdev
    ```

## 2. `Rinkeby`にトークンコントラクトをデプロイする。

イーサリアムネットワークにデプロイされたトークンコントラクトに特別な要件はないが、`Rinkeby` ゲートウェイにトークンを簡単にデポジットするためにERC20のコントラクトに実装することが好ましい、安全なトランスファー拡張機能がある。

### MyRinkebyToken ERC721 コントラクト

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyRinkebyToken is ERC721Token {
    constructor() ERC721Token("MyRinkebyToken", "MRT") public {
    }

    function mint(uint256 _uid) public
    {
        _mint(msg.sender, _uid);
    }

    // Convenience function to get around crappy function overload limitations in Web3
    function depositToGateway(address _gateway, uint256 _uid) public {
        safeTransferFrom(msg.sender, _gateway, _uid);
    }
}
```

### MyRinkebyCoin ERC20 コントラクト

```solidity
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/AddressUtils.sol";
import "./ERC20Receiver.sol";

contract MyRinkebyCoin is StandardToken {
    using AddressUtils for address;

    string public name = "MyRinkebyCoin";
    string public symbol = "MRC";
    uint8 public decimals = 18;

    // one billion in initial supply
    uint256 public constant INITIAL_SUPPLY = 1000000000;

    bytes4 constant ERC20_RECEIVED = 0xbc04f0af;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;
    }

    function safeTransferAndCall(address _to, uint256 _amount) public {
        transfer(_to, _amount);
        require(
            checkAndCallSafeTransfer(msg.sender, _to, _amount),
            "Sent to a contract which is not an ERC20 receiver"
        );
    }

    function checkAndCallSafeTransfer(
        address _from, address _to, uint256 _amount
    ) internal returns (bool) {
        if (!_to.isContract()) {
            return true;
        }

        bytes4 retval = ERC20Receiver(_to).onERC20Received(_from, _amount);
        return (retval == ERC20_RECEIVED);
    }
}
```

全てのコントラクトのソースは [Truffle DAppChain Example](https://github.com/loomnetwork/truffle-dappchain-example)リポジトリにある。

これらのコントラクトを `Rinkeby`にデプロイしよう。

1. イーサリアム秘密鍵を生成する。
    
    ```bash
    # これはrinkeby_account, rinkeby_mnemonic, rinkeby_private_key ファイル群を生成する
    yarn gen:rinkeby-key
    ```

2. 新しい`Rinkeby`アカウントのアドレスを `rinkeby_account`ファイルから取得する。
    
    ```bash
    cat rinkeby_account
    ```

3. `Rinkeby`にコントラクトをデプロイできるよう、`Rinkeby`アカウントにETHを与える。 https://faucet.rinkeby.io を使うか、もしくは他のアカウントからETHを送っても良い。

4. InfuraのAPIキーをセットする (以下で取得https://infura.io)
    
    ```bash
    export INFURA_API_KEY=XXXXXXXXXXXXXXXX
    ```

5. サンプルコントラクトをデプロイする
    
        yarn deploy:rinkeby
        
    
    以下のようなエラーで失敗する場合
    
        Error encountered, bailing. Network state unknown. Review successful transactions manually.
        insufficient funds for gas * price + value
        
    
    さらにもう少しETHを`rinkeby_account`で転送する必要がある

## 3. `extdev` コントラクトを `Rinkeby`コントラクトにマップする

一度コントラクトを両方のチェーンにデプロイしたらトランスファーゲートウェイにコントラクト間でトークンを転送したいと伝える必要がある。 あなたはプログラムで [loom-js](https://github.com/loomnetwork/loom-js)の中の`TransferGateway`クラスを使うか `loom` CLIを使う事ができる このチュートリアルでは我々は `web3`と[loom-js](https://github.com/loomnetwork/loom-js)を使ってより合理的なJS CLIを作ってきたので アドレス、トランザクション、ハッシュといけにえの山羊を探して移動する必要はありません。

`extdev`にデプロイされた`MyToken`コントラクトを`Rinkeby`にデプロイされた`MyRinkebyToken`コントラクトにマップする:

```bash
node ./gateway-cli.js map-contracts token
```

`extdev`にデプロイされた`MyCoin`コントラクトを`Rinkeby`にデプロイされた`MyRinkebyCoin`コントラクトにマップする:

```bash
node ./gateway-cli.js map-contracts coin
```

これらのコマンドを実行するとトランスファーゲートウェイはあなたがコントラクの作成者であるか検証しようとし、これは数分かかる。 その間に次のステップへ進むことができる。

## 4. `extdev`アカウントを`Rinkeby`アカウントにマップする

今2つのトークンコントラクトはトランスファーゲートウェイ経由で接続されており`extdev`から`Rinkeby`へトークンの転送を開始できる しかし、もし`Rinkeby`から`extdev`へトークンを転送したい場合`extdev`アカウントをあなたの`Rinkeby`アカウントに接続する必要がでてくるだろう。

```bash
node ./gateway-cli.js map-accounts
```

グレート、`extdev`と`Rinkeby`の間での完璧なトークンの転送の準備の全てはできているはず！

## 5. トークンの転送

### `Rinkeby`から`extdev`へ

今、全てのマップしてきたコントラクトとアカウントはトークンとETHを`Rinkeby`のゲートウェイコントラクトに転送できる。

それではERC721トークンの`MyRinkebyToken`をいくつか生成する事から始めてみよう、そしてそのうち一つを`PlasmaChain`に転送してみよう。

```bash
# Rinkebyでトークンを生成
node ./gateway-cli.js mint-token 1
node ./gateway-cli.js mint-token 2
node ./gateway-cli.js mint-token 3

# トークンをextdevのPlasmaChainへ転送
node ./gateway-cli.js deposit-token 1

# あなたがRinkebyにトークンをいくつ持っているかをチェックする
node ./gateway-cli.js token-balance -c eth

# あなたがextdevにトークンをいくつ持っているかをチェックする
node ./gateway-cli.js token-balance

# Rinkebyのゲートウェイがトークンをいくつ持っているかをチェックする
node ./gateway-cli.js token-balance -a gateway -c eth
```

ではERC20トークンの`MyRinkebyCoin`のいくつかを転送してみよう、それらのうち10億はすでに生成されあなたのアカウントにあるのですぐに転送する事ができる。

```bash
# 120トークンをextdevのPlasmaChainに転送する
node ./gateway-cli.js deposit-coin 120

# Rinkebyにいくつトークンを持っているかチェックする
node ./gateway-cli.js coin-balance -c eth

# extdevにいくつトークンを持っているかチェックする
node ./gateway-cli.js coin-balance

# Rinkebyのゲートウェイがいくつトークンを持っているかチェックする
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### From `extdev` to `Rinkeby`

The ERC721 tokens can be transferred back to `Rinkeby` using the `withdraw-token` command.

```bash
# transfer a token to Rinkeby
node ./gateway-cli.js withdraw-token 1

# check how many tokens you have on Rinkeby
node ./gateway-cli.js token-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js token-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js token-balance -a gateway -c eth
```

The ERC20 tokens can be transferred back to `Rinkeby` using the `withdraw-coin` command.

```bash
# transfer 60 tokens to Rinkeby
node ./gateway-cli.js withdraw-coin 60

# check how many tokens you have on Rinkeby
node ./gateway-cli.js coin-balance -c eth

# check how many tokens you have on extdev
node ./gateway-cli.js coin-balance

# check how many tokens the Gateway holds on Rinkeby
node ./gateway-cli.js coin-balance -a gateway -c eth
```

### トラブルシューティング

Sometimes the withdrawal process may error out due to network issues, or because gas ran out, if that happens you can try to complete the interrupted withdrawal using the `resume-withdrawal` command.

```bash
node ./gateway-cli.js resume-withdrawal
```

> 注: ユーザーごとに保留中の引き出しは1 つだけ許可される。

## 要約

そこでもしまだチェックしていなければ、[Transfer Gateway Example ](https://github.com/loomnetwork/transfer-gateway-example) のプロジェクト例を見てみよう。これは [loom-js](https://github.com/loomnetwork/loom-js) により提供されるトランスファーゲートウェイを使用して構築されている。