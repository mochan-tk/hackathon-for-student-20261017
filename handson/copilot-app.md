# GitHub Copilot appの操作

初心者向けコースです。[READMEでチームのForkを準備](../README.md#fork)し、[Git](https://git-scm.com/downloads)と[Copilot app](https://github.com/features/ai/github-app)を用意します。PCで実行する場合だけNode.js 24 LTSも用意します。このページは必要になった操作だけを読み、READMEの工程へ戻ります。

## プロジェクトと作業ブランチを開く

1. 学生アカウントでサインインし、**Projects → ＋ → Add GitHub repository**からチームのForkの所有者・名前を選びます。配布元は選びません。
2. cloneを待ち、`codex/beginner-starter`と初心者向けREADMEを確認します。
3. sessionを **Local repository / Current checkout、Interactive、Auto** で開始します。まず「READMEを読んで構成を確認し、まだ編集せず待って」と伝えます。
4. 作業ブランチが未作成なら、Terminal（チャットの`/terminal`でも開けます）で`git switch -c feat/first-demo`を実行します。作業中なら同じ枝を使い、複数人は別の名前にします。

Gitの名前・メールが未設定ならコミット時の案内に従います。Copilot権利・Auto・上限で止まった場合は、アカウント名と画面を運営に見せます。

## PCで実行する場合

1. Node.jsが24.xか確認します。**Review configuration → Repository configuration**で[App設定](../.github/github-app.yml)を読み、**Accept and apply**。更新時は受け入れ直します。
2. **Setup / Run Setup**のログで`npm ci`の成功を確認します。初回session作成時にも設定されています。成功済みなら重複実行は不要です。
3. **Run**で`npm run dev`を起動します。起動済みの同じアプリは再利用し、重ねて起動しません。
4. **Browser**で`http://127.0.0.1:4280`を開きます。Scriptsが空なら設定の受け入れを確認します。用意された設定を作り直す必要はありません。

Codespacesだけで確認する場合は、PCのSetup・Run・Node.js導入を省きます。編集はPC、実行とブラウザ確認はCodespacesとCopilotへ伝え、PLANへ残します。ファイルは自動同期されません。

## 資料を渡してPlanへ進む

プロジェクトのフォルダをOSのファイル管理画面で開き、`docs`直下へ企画資料を追加します。モードを **Plan** にして[READMEの依頼文](../README.md#plan)を使います。画像やPDFを読み取れなければ、本文や読み取れる形式をチャットへ添付します。

草案に合意したら **Interactive** へ戻り、[README 4.3の保存依頼](../README.md#plan-save)を送ります。**Review plan**が出る版では **Exit plan mode and I will prompt myself** で戻ります。`prepare-project`でルートの`PLAN.md`へ保存し、実ファイルを読み直して確認してもらいます。PC実行かCodespaces実行かも記録します。

[README 4.3のファイル確認](../README.md#plan-confirm)に沿って、自分たちでもプロジェクトのファイル一覧かOSのファイル管理画面からルートの`PLAN.md`を開き、合意内容を確認してから[READMEの実装](../README.md#build)へ進みます。ファイルがない・内容が違う場合は、[README 4.3の保存依頼](../README.md#plan-save)で保存・確認を依頼し直します。Codespaces実行なら先に[下の引き継ぎ](#codespaces-transfer)で起動を確かめます。

PCではサーバーと別のTerminalで`npm run check`と`npm run test:e2e`を実行します。Chromiumがなければ`npx playwright install chromium`、Linuxの依存ライブラリ不足なら`npx playwright install --with-deps chromium`を一度実行します。RunのBrowserで人も操作し、見た目の修正には **Pick & Polish**も使えます。結果はPROGRESSへ残して[READMEの確認](../README.md#verify)へ戻ります。

<a id="save-and-share"></a>

## GUIでcommit・pushする

Codespacesへ渡す途中の変更にも、最後の保存にも同じ操作を使います。確認したい変更ができたら、その場で保存し、PR作成まで待ちません。

1. **Changes**（見当たらなければ右パネルの **＋ → Changes**）を開き、**Uncommitted**で作業ブランチと各ファイルの差分を確認します。
2. **branch actions → Commit changes / Commit**で対象とメッセージを確認します。チャットに依頼が送られCopilotが処理する場合は、完了報告とChangesの状態を確認するまで待ちます。
3. commit完了後、同じメニューの **Push changes / Push**を選びます。初回は作業ブランチをチームのForkへ公開し、送信完了を待ちます。
4. GitHubで同じチームのForkと作業ブランチを開き、最新の変更を確認します。CommitだけではGitHubへ届きません。Pushが見えないだけで送信済みとは判断しません。

Codespacesで確認するチームは下の手順へ進み、PCで実行するチームはPCで確認を続けます。完成確認済みなら[READMEのPR](../README.md#share)へ進みます。Appの **Create PR**は送信前にチーム内の比較先を確認できる場合だけ使い、確認できなければGitHubから作成します。作成後もGitHubでbase/head repositoryがチームのForkか確認します。

<a id="codespaces-transfer"></a>

## Codespacesへ変更を渡して確認する

1. 上のGUI手順で**まずcommit・push**します。初回の企画・PLANも保存します。
2. GitHubのチームのForkで**同じ作業ブランチ**を選び、初回は **Code → Codespaces → Create codespace**。2回目以降は既存Codespaceを開きます。
3. 既存環境だけ、サーバーをCtrl+Cで止め、**Source Control → … → Pull**で変更を取り込みます。新規作成直後は不要です。別の枝から再利用するなら左下で今回の枝へ切り替えてからPullします。
4. CodespacesのTerminalで`npm ci`、`npm run dev`を実行し、**Ports → 4280 → Open in Browser**で開きます。ポートがなければ追加し、公開範囲はPrivateのままで構いません。
5. 別Terminalで`npm run check`と`npm run test:e2e`を確認し、結果・エラー全文・実際の操作結果をPCのAppへ返します。同じ変更・環境で記録済みなら再実行不要です。
6. AppでPROGRESSへの記録と必要な修正を依頼します。修正したら再びcommit・pushから繰り返します。初回のPLAN保存直後は起動と基本テストが通れば[実装](../README.md#build)へ、実装後は[チーム確認](../README.md#verify)へ戻ります。

Codespacesで起動して画面を開く操作は[READMEの起動手順](../README.md#run)を参照します。PCの`.env`はGitで移りません。必要な設定はCodespacesにも用意します。Codespacesでも編集した場合はそちらでcommit・pushし、PCの未保存変更を確認して **Pull changes**で取り込んでから再開します。競合は運営へ相談し、変更を捨てません。

<a id="stop"></a>

## 終了・再開する

AppのRunで起動したサーバーは **Stop Run**、Terminalで手動起動した場合はそのTerminalの **Ctrl+C**で止めます。Browserに画面が残る場合もあるので停止表示・ログを確かめます。Codespacesを使ったら保存・push後に[一覧](https://github.com/codespaces)の **Stop codespace**も選びます。

再開は同じプロジェクト・作業ブランチで[READMEの再開](../README.md#resume)へ進みます。AppのNew working treeやCloud sandboxは今回の標準経路には含めません。

[READMEへ戻る](../README.md)
