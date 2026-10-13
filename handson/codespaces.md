# Codespacesの操作

初心者向けコースの環境操作です。[READMEでチームのForkを準備](../README.md#fork)してから使います。PCへNode.jsやDockerを入れる必要はありません。このページは必要になった操作だけを読み、READMEの工程へ戻ります。

## 開いて作業ブランチを作る

1. この案内をチーム側のGitHubで開き、ページ上部の **「<> Code」タブ**でリポジトリへ戻ります。所有者・名前を確認して **`codex/beginner-starter` ブランチを選び**、ファイル一覧の上にある緑色の **Code → Codespaces → Create codespace** へ進みます。作成済みなら同じCodespaceを開きます。マシンを選べる場合は、まず2-coreを使います。
2. 準備が終わり、ブラウザにVS Codeが開くまで待ちます。信頼の確認が出たらチームのリポジトリか確かめて進めます。
3. Copilot Chatで学生アカウントを確認し、Session Targetがある場合は **Local**、モデルは **Auto** にします。
4. 左下のブランチ名から **Create new branch** で`feat/first-demo`などを作ります。作業中の枝がある場合はその枝を使います。複数人は別の作業ブランチにします。

接続が進まなければ[Codespaces一覧](https://github.com/codespaces)から開き直し、運営と表示を確認します。必要なら **Stop codespace** の後、同じ環境を再開します。Planが出ないときはサインインと拡張機能の準備を待ち、選択欄を開き直します。

## 起動する

**Terminal → New Terminal**で次を一行ずつ実行します。初回環境準備で`npm ci`が成功済みなら重複実行は不要です。

```sh
node --version
npm ci
npm run dev
```

Node.jsは24.xです。最後のコマンドは起動したままにし、**Ports → 4280 → Open in Browser** を開きます。なければ **Forward a Port** で4280を追加します。画面とAPIは同じ入口です。

ポートは **Private** のまま使えます。同じログイン済みPCで交代して確認でき、Codespaceやサーバーを停止するとURLは使えません。既に同じアプリが起動中ならそのまま使います。

## 企画を渡し、モードを切り替える

Explorerの`docs`へ企画資料を追加したら、[READMEのPlan](../README.md#plan)へ戻ります。PDF・画像など形式は自由で、画面画像は必須ではありません。読み取れない場合はチャットへ本文や読み取れるファイルを追加します。

Planでは草案を相談し、合意後に **Agent** へ切り替えて`PLAN.md`を保存します。編集・実行・ブラウザ確認の場所は「Codespaces」と記録します。その後は[READMEの実装](../README.md#build)を進めます。ブラウザ版でAIの画面操作が使えなくても、Playwrightと学生の操作で確認できます。

## テストを確認する

サーバーとは別のTerminalで実行します。

```sh
npm run check
npm run test:e2e
```

同じ変更・同じ環境で直前に成功し記録済みなら、その結果を使えます。PlaywrightのブラウザやOSライブラリが不足した場合は、次を一度実行して再試行します。

```sh
npx playwright install --with-deps chromium
```

結果と実際の操作を`PROGRESS.md`へ残し、[READMEのチーム確認](../README.md#verify)へ進みます。手動の本番previewは`npm run build`後に`npm run preview`で起動し、4281を転送します。E2Eも4281を使うため、previewを停止してから実行します。

<a id="save-and-share"></a>

## GUIでcommit・pushする

1. **Source Control**で差分を開き、採用するファイルの`+`でステージします。
2. メッセージを入力し **Commit**。処理の完了を確認します。
3. 初回は **Publish Branch**、公開済みの枝では **Source Control → … → Push**。チームのForkへ送信します。
4. GitHubの同じ作業ブランチに変更があることを確認し、[READMEのPR](../README.md#share)へ戻ります。

PCからpushされた変更を確認する場合は、[Appから渡す手順](copilot-app.md#codespaces-transfer)を使います。新しく企画やブランチを作り直しません。既存Codespaceの **Source Control → … → Pull** は、その環境内の変更を保存してから使います。

<a id="stop"></a>

## 終了・再開する

発表や確認が終わったら、手動起動したサーバーのTerminalで **Ctrl+C**。保存・pushを確認し、[Codespaces一覧](https://github.com/codespaces)の **… → Stop codespace** で停止します。ブラウザを閉じただけでは停止したと判断しません。

再開は同じCodespaceと作業ブランチを開き、[READMEの再開](../README.md#resume)へ進みます。サーバーを停止していれば`npm run dev`で起動します。依存が変わったら先に`npm ci`、環境設定が変わったら運営と **Codespaces: Rebuild Container** を確認します。

[READMEへ戻る](../README.md)
