# GitHub Copilot appで作る

`main`コースをPC上で編集します。実行は **PC** または **Codespaces** を選べます。**初期状態にはアプリ、起動コマンド、Setup／Runの設定はありません。** 事前企画を使って必要な構成から相談します。開発の続きは[再開手順](../README.md#resume)へ進みます。

## 1. チームのリポジトリをAppへ追加する

1. [Git](https://git-scm.com/downloads)と[GitHub Copilot app](https://github.com/features/ai/github-app)を用意し、[Copilot Studentの利用権利](https://github.com/settings/copilot)を確認します。GitHub Proへの加入とは別です。
2. [Forkの準備](../README.md#fork)を済ませ、Appの **Sign in to GitHub** から今回使う学生アカウントへログインします。
3. **Projects → 追加ボタン → Add GitHub repository** でチームのForkの所有者・名前を選び、cloneの完了を待ちます。配布元は選びません。
4. sessionを作り、作業場所を **Local repository / Current checkout**、モードを **Interactive**、モデルを **Auto** にします。

PCで実行する場合の言語・ツールは、Planで構成を決めてから準備します。Codespacesだけで実行するならPCへのNode.js・Docker導入は不要です。Gitの名前・メールが未設定なら、最初のCommit時の案内に沿って設定します。利用権利・Auto・上限の表示で困ったら、表示内容を運営へ見せます。

## 2. 作業ブランチと企画資料を準備する

Appが作業ブランチを作成済みならその枝を使います。まだ`main`の場合はTerminal（チャットの`/terminal`でも開けます）で作業ブランチを作ります。

```sh
git switch -c feat/first-demo
```

続きの作業は既存の枝を使い、前のPRをマージ済みなら[次の作業の準備](../README.md#after-merge)へ進みます。

プロジェクトのフォルダーをOSのファイル管理画面で開き、事前に作った資料を`docs/`直下へ追加します。**PDF・画像・Markdownなど形式も名前も自由で、UI画像がなくても進められます。** [資料の置き方](../docs/README.md)に沿って公開してよいものだけを保存します。GitHubへ追加済みの資料は入れ直しません。

<a id="plan"></a>

## 3. Planで相談して保存する

**Plan** で[READMEのPlan用プロンプト](../README.md#plan)を送ります。実際の資料パスを指定し、**編集はPC、実行はPCまたはCodespacesのどちらか**を明記します。読めない資料はチャットへ添付するか必要な本文を補い、読めたことにして進めません。

チームで合意したら **Interactive** に戻します。**Review plan** が出る版では **Exit plan mode and I will prompt myself** を選び、[README 4.3の保存依頼](../README.md#plan-save)を送ります。`prepare-project`でルートの`PLAN.md`へ保存し、実ファイルを読み直して確認してもらいます。既存なら更新・再利用します。

[README 4.3のファイル確認](../README.md#plan-confirm)に沿って、自分たちでもプロジェクトのファイル一覧かOSのファイル管理画面からルートの`PLAN.md`を開き、目的・完成条件・対象外・作業順・構成・編集と実行の場所などが合意どおり記録されたことを確認します。ファイルがない・内容が違う場合は、[README 4.3の保存依頼](../README.md#plan-save)で保存・確認を依頼し直してから実装へ進みます。PCで実行する場合だけ、採用した言語・ツールをPCへ準備します。Codespacesで追加の実行環境が必要なら、`.devcontainer/`の調整を最初の作業へ含めます。

## 4. Interactiveで実装する

**Interactive** で[READMEの実装依頼](../README.md#build)を送ります。実際の準備・起動・終了・テスト・設定は`PLAN.md`へ、進捗・結果・未確認・次の作業はルートの`PROGRESS.md`へ残してもらいます。未作成のコマンドは実行手順と区別します。

**commit・pushは自分たちがAppのGUIで行う**と伝えます。Codespacesで実行する場合は、さらに次を伝えます。

> PCでは編集だけを行い、依存関係のインストールやアプリの実行はしないでください。確認できる小さな変更ごとに、変更内容・コミットメッセージ案・Codespacesでの確認方法を示し、こちらが結果を返すまで待ってください。変更の受け渡しは教材のGUI手順を使います。

最初のアプリと起動方法ができたら、PCなら次の手順、Codespacesなら[受け渡し手順](#codespaces-transfer)へ進みます。企画ファイルだけの時点ではアプリは起動しません。

<a id="run"></a>

## 5. PCで起動する場合

まず`PLAN.md`に記録した準備・起動を実行します。ボタンで起動したい場合は、確認済みのコマンドから **`.github/github-app.yml`に手動実行のSetup／Runと、起動ログに合うBrowser表示設定を作成する**ようCopilotへ依頼します。`package.json`があるだけでRunが設定済みとは扱いません。

1. **Review configuration → Repository configuration** で内容を確認し、**Accept and apply** で設定を受け入れます。設定変更後も受け入れが必要です。
2. 手動起動したサーバーがあれば、そのTerminalで終了します。同じサーバーを重ねて起動しません。
3. 実行メニューの **Setup / Run Setup** を選び、正常終了を待ちます。同じ依存関係の準備が成功済みなら省略できます。失敗はログをCopilotへ渡して直します。
4. **Run** を選び、起動完了のログと **Browser** を確認します。自動表示されなければ、`PLAN.md`と起動ログにある実際のURLを開きます。

Scriptsが空なら設定の作成・受け入れを確認します。起動済みの同じ変更・環境はそのまま使い、[READMEの完成確認](../README.md#verify)へ進みます。別の学生も同じPCで交代して操作し、未達は実装へ戻します。見た目の修正はBrowserの **Pick & Polish** でも伝えられます。

<a id="codespaces-transfer"></a>

## 6. Codespacesへ変更を渡して確認する場合

**確認できる変更ができるたびに、すぐGUIでcommit・pushします。** 全機能の完成やPR作成を待ちません。PCとCodespacesは自動同期されません。

1. 下の[保存手順](#save-and-share)の1〜3で、同じチームのForkの作業ブランチへ変更を送ります。
2. 初回はGitHubでその作業ブランチを選び、**Code → Codespaces → Create codespace on（作業ブランチ名）** から作成します。企画やブランチを作り直しません。
3. 既存Codespaceなら同じ作業ブランチを開き、前回のサーバーを元のTerminalで終了して **Source Control → … → Pull** します。新規作成直後のPullは不要です。別の枝を使っていた場合は左下のブランチ名から切り替えます。
4. **CodespacesのTerminal** で`PLAN.md`の準備・起動・テストを実行します。依存関係が同じなら準備は繰り返しません。環境変数は別途設定し、`.devcontainer/`変更時は必要な再構築を行います。
5. **Ports → 実際のポート → Open in Browser** で開き、今回の変更を操作します。ポートがなければ **Forward a Port** で追加し、公開範囲は **Private** のまま使います。
6. コマンド・結果・エラー全文・実際の操作結果をPCのAppへ返し、`PROGRESS.md`への記録と必要な修正を依頼します。修正後も手順1から繰り返します。最後は[READMEの完成確認](../README.md#verify)で別の学生も操作します。

Codespacesで起動して画面を開く操作は[READMEの起動手順](../README.md#run)を参照します。Codespacesでも編集した場合は、その変更をcommit・pushし、PC側の変更を保全してからAppの **Pull changes** で取り込みます。

<a id="save-and-share"></a>

## 7. GUIで保存してPRを作る

1. ファイルを保存し、**Changes → Uncommitted** で差分と作業ブランチ名を確認します。Changesは右パネルの **＋** からも開けます。
2. **branch actions → Commit changes / Commit** で対象とメッセージを確認します。チャットへ依頼が送られる版ではCopilotの処理完了を待ちます。クリックだけで完了とはせず、完了報告とChangesを確認します。
3. **Commit完了後にPush changes / Push** を選び、処理完了を待ちます。初回は現在の作業ブランチを公開し、GitHubの同じチームのForkに変更が届いたことを確かめます。CommitはPC内の記録、PushはGitHubへの送信です。
4. **Create PR** は、作成前に[チーム内の送り先](../README.md#share)を確認できる場合だけ使います。確認できなければGitHubの **Compare & pull request** で作成します。base repository・head repositoryはどちらもチームのFork、baseは`main`、compareは作業ブランチです。
5. [READMEの保存とPR](../README.md#share)でCIとチームの確認、結果の記録・共有を進めます。CIが始まらなければ[Actionsの設定](../README.md#enable-actions)を確認します。

Pushが表示されないだけで送信済みとは判断せず、GitHub上で確認します。メニューが見つからなければ、版と画面を運営へ見せます。

<a id="finish"></a>

## 8. 発表して終了する

[READMEの発表・終了](../README.md#finish)へ進みます。プレビューで発表でき、[Azure公開](azure.md)は任意です。マージ後に記録を追加する場合は、編集前に[次の作業の準備](../README.md#after-merge)を行います。

AppのRunで起動したなら **Stop Run**、Terminalで起動したなら記録した終了方法（通常は **Ctrl+C**）で止めます。Browserに画面が残っていても停止表示やログを確認します。Codespacesを使った場合は[一覧](https://github.com/codespaces)から **Stop codespace** も選びます。

[全体の流れ](../README.md) · [公式情報](references.md)
