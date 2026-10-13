# Codespacesで作る

`main`コースをブラウザのVS CodeとGitHub Copilotで進めます。PCへのNode.js・Dockerの導入は不要です。**初期状態にはアプリや起動コマンドはありません。** 事前に作った企画資料を使い、構成を相談してから実装します。

READMEから開いた段階の操作を行い、案内に沿ってREADMEへ戻ります。初回の環境準備は手順1〜2です。開発の続きは[再開手順](../README.md#resume)、Appで編集した変更の確認は[Appの受け渡し手順](copilot-app.md#codespaces-transfer)を使います。

## 1. チームのCodespaceを開く

1. [Forkの準備](../README.md#fork)で作成したチームのリポジトリを開き、所有者・名前と`main`ブランチを確かめます。
2. READMEの案内に沿って作成済みなら同じCodespaceを使います。まだなら **Code → Codespaces → Create codespace on main** を選び、準備が終わるまで待ちます。マシンを選べる場合は、まず2-coreを使います。
3. Copilot Chatを開き、学生アカウントと[Copilot Studentの利用権利](https://github.com/settings/copilot)を確認します。モデルは **Auto**、**Session Target** が表示される場合は **Local** を選びます。ここでのLocalはチャットの種類で、実行場所はCodespacesです。
4. 信頼の確認が出たら、今回のチームのリポジトリであることを確かめて信頼します。

環境にはNode.js 24を用意していますが、使う技術は企画に合わせて選べます。まだ`package.json`もないため、この時点では`npm ci`や`npm run dev`を実行しません。

## 2. 作業ブランチと企画資料を準備する

**Terminal → New Terminal** を開き、`main`から作業ブランチを作ります。

```sh
git switch -c feat/first-demo
```

同じ未完了の作業を再開する場合は、既存の作業ブランチを使います。前のPRをマージ済みなら[次の作業の準備](../README.md#after-merge)へ進みます。

Explorerの **docs** フォルダーへ、事前に作った企画資料をドラッグ＆ドロップなどで追加します。**PDF・画像・Markdownなど形式も名前も自由で、UI画像がなくても進められます。** [資料の置き方](../docs/README.md)に沿って、公開してよい内容だけを`docs/`直下へ保存します。すでにGitHubへ追加済みなら、同じ資料を入れ直す必要はありません。

<a id="plan"></a>

## 3. Planで相談して保存する

Copilot Chatで **Plan** を選び、[READMEのPlan用プロンプト](../README.md#plan)を送ります。資料のパスを実際の名前に置き換え、**編集・実行・ブラウザ確認はCodespaces** と伝えます。

Planが見えなければ、サインインと拡張機能の準備を確認して選択欄を開き直します。資料を読めない場合は、チャットへ添付するか必要な本文を補います。読めていないPDFや画像を、読めた前提で進めません。

チームで目的・完成条件・対象外・構成・作業順を合意したら、**Agent** へ切り替え、「合意内容をルートの `PLAN.md` へ保存し、アプリの実装はまだ始めないでください」と依頼します。`PLAN.md`はこの段階で作ります。既存なら更新・再利用し、計画を作り直しません。Node.js以外の実行環境が必要なら、`.devcontainer/`の調整も計画に含めます。

## 4. Agentで実装する

**Agent** で[READMEの実装依頼](../README.md#build)を送ります。`PLAN.md`に沿って最小アプリ・起動方法・必要なテスト・PR用CIを用意し、小さな変更ごとに確かめます。commit・pushは自分たちがGUIで行うと伝えます。

実際の準備・起動・終了・確認コマンド、ポート、必要な設定は`PLAN.md`へ、進捗・結果・未確認・次の作業はルートの`PROGRESS.md`へ残してもらいます。`PROGRESS.md`も初回の作業で作成し、以降は同じファイルを更新します。まだ作っていないコマンドは「未作成」と区別します。

<a id="run"></a>

## 5. 起動してチームでも確認する

1. **CodespacesのTerminal** で`PLAN.md`に記録した準備・起動を行います。同じ変更・同じ環境のサーバーが稼働中なら、そのまま使います。
2. **Ports → 実際のポート → Open in Browser** を選びます。表示されなければ **Forward a Port** で記録したポートを追加します。ポートはアプリごとに決めるため、固定の番号はありません。
3. [READMEの完成確認](../README.md#verify)に沿って、別の学生も主要な操作を試し、結果を`PROGRESS.md`へ残します。未達は実装へ戻します。

転送ポートは **Private** のまま、ログイン済みの同じPCで交代できます。URLはCodespaceとサーバーの起動中に使えます。ブラウザ版VS Codeの内蔵Browser Toolsは前提にせず、人の操作と採用した自動テストで確認します。

Playwrightを採用する場合は、ブラウザとLinuxの依存関係も準備します。Chromiumなら`npx playwright install --with-deps chromium`が一例です。初期環境で準備済みとは扱わず、実際に必要だった手順を`PLAN.md`へ残します。`.devcontainer/`を変更した場合は、必要に応じて **Codespaces: Rebuild Container** で反映します。

<a id="save-and-share"></a>

## 6. GUIで保存してPRを作る

1. ファイルを保存し、**Source Control** で差分を確認します。採用するファイルの`+`でステージし、メッセージを入力して **Commit** を選びます。
2. Commitの完了を待ち、初回は **Publish Branch**、公開済みなら **Source Control → … → Push** でGitHubへ送ります。
3. GitHubで同じチームのForkと作業ブランチに変更が届いたことを確かめます。
4. **Compare & pull request** を開き、**作成前に**[READMEのPRの送り先](../README.md#share)を確認します。base repository・head repositoryはどちらもチームのFork、baseは`main`、compareは作業ブランチです。
5. CIとチームの確認、結果の記録・共有は[READMEの保存とPR](../README.md#share)を進めます。CIが始まらなければ[ForkのActions設定](../README.md#enable-actions)を確認します。チェックがないことを成功とは扱いません。

確認用の途中保存でも手順1〜3を使えます。記録の追記だけでCI結果を際限なく書き直す必要はありません。

<a id="finish"></a>

## 7. 発表して終了する

[READMEの発表・終了](../README.md#finish)へ進みます。確認済みのプレビューで発表でき、[Azure公開](azure.md)は任意です。マージ後に記録を追加する場合は、編集前に[次の作業の準備](../README.md#after-merge)を行います。

発表と保存を終えたら、手動起動したサーバーを元のTerminalで通常は **Ctrl+C** で終了し、[Codespaces一覧](https://github.com/codespaces)から **… → Stop codespace** を選びます。タブを閉じただけで停止したとは判断しません。

接続やGitが応答しない場合は、まずファイルを保存し、再読み込み、停止・再開を試します。未保存・未送信の変更を削除せず運営へ相談してください。[接続トラブルの公式手順](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-your-connection-to-github-codespaces)

[全体の流れ](../README.md) · [公式情報](references.md)
