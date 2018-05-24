---
id: etherboy-game
title: Etherboyゲーム
sidebar_label: Etherboyゲーム
---
![Header](/developers/img/etherboy.jpg) EtherboyはUnityで構築されたマルチプラットフォームの2Dゲームで、DAppチェーン上で稼働し、また[Loom Unity SDK](unity-sdk.md)を使用してGo言語で書かれたスマートコントラクトと対話する。

## ゲームコントロール

### WebGLキーバインディング

- ** ↑ **: ドアから入る、ロープをよじ登る
- ** ↓ **: ロープを下る
- **E**: NPCに話しかける、ベッドで寝る、オブジェクトとのやり取り
- **スペース** / **右クリック**: ジャンプ
- **左クリック**: 攻撃 (武器が装備されたとき)

## 対応プラットフォーム

- WebGL
- Android (WIP)
- iOS (WIP)
- Windows / Mac / Linux

## ソースコードを見てみよう

[Etherboy ゲーム](https://github.com/loomnetwork/Etherboy)および[Etherboyスマートコントラクト](https://github.com/loomnetwork/etherboy-core) のコードは、閲覧できるようGithub上で公開中だ。 またこのゲームのためにDAppチェーンをセットアップする[手順の説明](etherboy-backend.md)も提供している。