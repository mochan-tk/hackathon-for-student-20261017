# GitHub Copilot appで作る

GitHub Copilot appでPC上のファイルを編集する、`main`コースの手順です。動作確認は **PC** または **Codespaces** を選べます。**最初はアプリ本体やSetup／Runの設定がありません。** 企画に合う構成を相談し、起動と確認の方法も一緒に作ります。

**企画 → Appの準備 → 構成と計画の相談 → アプリ作成と検証 → チームで確認 → 発表**

## 1. PCとアカウントを準備する

次を準備します。

- [Git](https://git-scm.com/downloads)
- [GitHub Copilot app](https://github.com/features/ai/github-app)
- Copilot Studentを有効にしたGitHubアカウント

GitHubの[Copilot設定](https://github.com/settings/copilot)で利用権利を確認します。GitHub Proへの加入とCopilot Studentの有効化は別です。Gitの名前とメールが未設定の場合は、最初のコミット時に案内に沿って設定します。

**Codespacesでだけ実行する場合、PCへのNode.jsなどの実行環境の導入は不要です。** PCで実行する場合は、手順4で構成を選んでから必要なものを準備します。Node.jsを採用するなら、教材のCodespacesと同じ24 LTSが選択肢です。

AppはPC上で編集し、GitHubへのcommit・pushでCodespacesへ変更を渡します。既存のCodespaceへ直接接続する手順ではありません。

## 2. チームのリポジトリをAppに追加する

1. [企画の進め方](common/ideation.md)の手順1〜5で、誰の何を解決するかと画面案をチームで決めます。手順6の文書整理は、このガイドの手順4で行います。
2. [コースの選び方](choose-start.md)に沿って、`main`コースのチーム用リポジトリを作ります。作成済みなら、そのリポジトリを使います。初心者向けを選んだ場合は、そのブランチのガイドに従ってください。
3. ほかのメンバーも編集する場合は、所有者が **Settings → Collaborators** から招待します。
4. Copilot appで **Sign in to GitHub** を選び、今回使う学生アカウントにログインします。
5. **Projects** 横の追加ボタンから **GitHub repository** を選び、チームのリポジトリをcloneします。
6. 新しいsessionを作り、作業場所を **Local repository**（版によっては **Current checkout**）、モードを **Interactive**、モデルを **Auto** にします。
7. 「README.mdを読み、この教材の構成を確認してください。まだファイルを編集せず待ってください」と送ります。

Autoが表示されない、利用権利や利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。最初は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。

## 3. 作業ブランチと実行場所を決める

Appが作業用ブランチを作成済みの場合は、そのブランチを使います。まだ `main` で作業している場合は、Terminalを開いて作業ブランチを作ります。session開始後にチャットで `/terminal` と入力しても開けます。

```sh
git switch -c feat/first-demo
```

すでに同名のブランチがある場合は `git switch feat/first-demo` で戻ります。複数人が編集する場合は作業ごとに別の名前にします。

チームで実行場所を選びます。

| 選ぶ経路 | 進め方 |
| --- | --- |
| PCで実行 | 採用する言語・ツールをPCへ準備し、AppのTerminalやBrowserで確認する |
| Codespacesで実行 | PCでは編集し、学生がAppからcommit・push。Codespacesで起動・テスト・ブラウザ確認し、結果をAppへ返す |

まだSetupやRunは実行しません。`main`には `.github/github-app.yml` もアプリのコマンドもありません。**Runをpackage.jsonの自動読み込みに任せる前提にはせず、PCでのコマンドが確定した後で必要な設定を作ります。**

## 4. 資料を渡してPlanで計画する

[docs/source/](source/)へ、共有してよい企画メモや画面PNGを入れます。Figmaの画面はPNGと操作・遷移の説明でも渡せます。[締切管理の例](examples/deadline.md)も参考にできます。

モードを **Plan** に切り替え、次を送ります。「実行場所」の一行は、選んだ方だけを残してください。

```text
目的：
企画と画面案を整理し、短い開発時間で完成できる最小構成と実装・検証の計画を提案してください。

文脈：
prepare-projectスキル、docs/source/の資料、docs/product.md、docs/development.mdを読んでください。
このmainコースにはアプリ本体も起動コマンドもまだありません。
編集はこのPCで行います。
実行場所：PC／Codespaces（選んだ方だけを残す）

制約：
曖昧な点は質問し、勝手に機能を増やさないでください。
React + Viteを含め、企画に必要な最小の技術構成を提案し、チームと選んでください。
不要なフレームワーク、API、DB、Docker化を最初から追加しないでください。
このPlanではファイルを編集せず、アプリの実装も始めないでください。

完成条件：
企画・DoD・対象外、採用する構成と理由、小さい実装単位・対応するDoD・確認方法を草案にしてください。
最初の実装単位に、最小アプリ、起動方法、必要なテストとPR用CIの作成を含めてください。
選んだ実行場所に必要な準備と未決定の点を示し、チームが確認できる計画にしてください。
```

スキルが認識されない場合は、`.github/skills/prepare-project/SKILL.md` を読んで進めるよう伝えます。`@`で必要なファイルを追加することもできます。

対象者、最初に通す操作、完成条件、採用構成をチームで確認し、**Interactive** に切り替えて合意内容を保存してもらいます。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 企画・DoD・対象外 |
| [development.md](development.md) | 採用構成、必要な準備、編集・実行場所。作成前のコマンドは「予定」と明記 |
| [tasks.md](tasks.md) | 実装順、各作業の確認方法、次への引き継ぎ |

`docs/tasks.md` の引き継ぎ欄にも、PCで確認するなら「編集・実行・ブラウザ確認はPC」、Codespacesなら「編集はPC、実行・ブラウザ確認はCodespaces」と残します。PCで実行する場合だけ、ここで合意した実行環境をPCへ準備します。

## 5. Interactiveで実装と確認を繰り返す

[共通の実装ループ](common/build-loop.md)に沿って、次を送ります。

```text
目的：
最初の未完了タスクから実装し、合意した完成条件まで確認と修正を進めてください。

文脈：
docs/product.md、docs/tasks.md、docs/development.mdと、作業に関係するコードを読んでください。

制約：
合意した範囲・構成と、記録した編集・実行場所に従ってください。
実行場所がCodespacesなら、確認できる小さな変更ごとに、変更内容とコミットメッセージ案を示してください。
commit・pushはこちらがAppの画面で行うので、自動実行せず待ってください。
Codespacesでの準備・起動・テスト方法も案内し、結果を渡すまで次の修正を待ってください。
この経路ではPCで依存関係をインストールしたり、アプリを実行したりしないでください。
変更の取り込みは教材のGUI手順を使い、通常手順にGit確認コマンドを追加しないでください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行していない確認は未確認とし、成功扱いにしないでください。

完成条件：
初回は最小アプリと起動方法、必要なテスト、同じ確認をPRで行うCIを用意してください。
実際の準備・起動・終了・確認コマンドとポート、環境設定をdocs/development.mdへ記録してください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
PCで実行する場合は記録した確認を実行し、Codespacesならこちらが返す結果と照合してください。
verify-goalスキルでDoDと実装を照合し、実際の結果をdocs/verification.mdへ残してください。
未達はdocs/tasks.mdへ戻して修正・再確認してください。
```

`verify-goal` が認識されない場合は、`.github/skills/verify-goal/SKILL.md` を読むよう伝えます。**Changes** で変更を確認しながら進めます。

Codespacesで実行する場合、**最初のアプリと確認方法ができたら、その場で[次のGUI手順](#codespacesへ変更を渡して確認する)からcommit・pushし、起動を確かめます。** 以降も **実装 → GUIでcommit・push → Codespacesでpull・確認 → 結果をAppへ返す → 修正** を繰り返します。企画文書だけの時点ではアプリは動きません。

PCで実行する場合は、まず `docs/development.md` のコマンドをTerminalで実行します。Setup／Runボタンを使いたい場合は、確認できたコマンドを `.github/github-app.yml` に登録するよう依頼します。設定と起動URLを確認し、Appで受け入れると適用されます。更新時も受け入れ直します。[設定の公式説明](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)

途中で終了した場合は、4つの記録と現在の変更を読み、記録済みの実行場所・確認結果・次の作業から続けるよう依頼します。教材の「完成条件まで進める」は確認と修正の繰り返しであり、session終了後の自動再開を前提にしていません。

## 6. チームの完成条件を確認する

### PCで確認する

作成した起動コマンド、または設定済みの **Run → Browser** で、`docs/development.md` に記録したURLを開きます。[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が操作します。同じPCで交代して構いません。

必須DoDの主要な操作経路、関係する空の状態・入力ミス、スマートフォン幅を確認し、実際の結果を記録します。見た目を直したい場合は、Browserの **Pick & Polish** で要素を選んで伝えることもできます。

自動確認は `docs/development.md` の手順を使います。同じ変更・同じ環境で直前に成功し、記録済みなら再実行不要です。未実施の確認や関連する変更がある場合は実行します。ブラウザテストを採用した場合のインストールも、選んだ環境で行います。

### Codespacesへ変更を渡して確認する

**Codespacesで確かめたい変更ができたら、その場で学生がAppの画面からcommit・pushします。全機能の完成やPR作成まで待つ必要はありません。** PCとCodespacesのファイルは自動同期されないため、**同じチームリポジトリの同じ作業ブランチ**を使います。

1. PC側でファイルを保存し、Appの **Changes** を開きます。見当たらない場合は右パネルの **＋ → Changes** から開きます。表示を **Uncommitted** にし、差分と作業ブランチ名を確認します。
2. **Changesのブランチ操作メニュー（branch actions）→ Commit** を選び、対象の変更とメッセージを確認して実行します。「最小アプリと起動方法を追加」のように内容が分かるメッセージにします。すでにコミット済みなら次へ進みます。
3. **commitしたら、同じメニューから続けてすぐにPushを選びます。** 初回に求められたら、現在の作業ブランチをチームのリポジトリへ公開します。処理完了を待ちます。CommitはPC内への記録、PushはGitHubへの送信です。
4. ブラウザでGitHubの同じチームリポジトリを開き、作業ブランチを選んで最新の変更が反映されたことを確認します。
5. **ここからはCodespacesで動作確認する場合の操作です。** 初回は作業ブランチを選んだまま **Code → Codespaces → Create codespace on（作業ブランチ名）** を選び、準備完了まで待ちます。2回目以降はそのブランチの既存Codespaceを開きます。接続に困った場合は[Codespacesの手順2](codespaces.md#2-codespaceを開く)を参照します。
6. **既存Codespaceを使う場合だけ**、前回のサーバーが動いていれば元のTerminalで終了し、**Source Control → … → Pull** で変更を取り込みます。新規作成直後は不要です。
7. **CodespacesのTerminal** で、`docs/development.md` に記録した依存関係の準備と起動を実行します。依存関係に変更がなければ、その準備を毎回やり直す必要はありません。必要な環境変数もCodespaces側で設定します。
8. **Ports** から、記録した実際のポートの **Open in Browser** を選びます。なければ **Forward a Port** で追加します。初回は最小アプリの起動を、以降は今回の変更に対応する操作と必須DoDを確かめます。公開範囲は **Private** のままで構いません。別の学生もログイン済みの同じPCで交代して確認できます。
9. Codespacesで記録済みの自動確認を実行します。同じ変更・同じ環境で直前に成功し、記録済みなら再実行は不要です。結果・エラー全文・実際の操作結果をPCのAppへ渡し、必要な修正と `docs/verification.md` への記録を依頼します。初回の起動と確認ができたら手順5へ戻り、残る機能を作ります。修正後もGUIでcommit・pushするところから繰り返します。

別のブランチのCodespaceを再利用する場合は、左下のブランチ名から今回の作業ブランチへ切り替えてからPullします。見当たらなければ作業ブランチから新規作成できます。PullのエラーはCopilotか運営へ渡してください。[公式のGUI手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace#pulling-changes-from-the-remote-repository)

AppのGUI手順は[v1.1.26以降のbranch actions](https://github.com/github/app/releases/tag/v1.1.26)を前提にしています。[v1.1.27以降は対象が0件のPull・Pushは表示されません](https://github.com/github/app/releases/tag/v1.1.27)。Pushが見えないだけで送信済みとせず、GitHub上の変更で確認します。メニューが見つからなければ、版と画面を運営に見せてください。

通常はPCで編集し、Codespacesで確認すると変更を追いやすくなります。Codespacesでも編集した場合は、そちらもcommit・pushし、PC側の未コミットの変更を整理してからAppの **Pull changes** で取り込みます。環境変数の秘密の値はGitでは引き継がれません。

## 7. 変更を保存し、PRから発表へ進む

1. **Changes** で採用する差分を確認します。
2. [上のGUI手順](#codespacesへ変更を渡して確認する)の1〜4で残る変更と検証記録をcommit・pushします。PCで確認した場合も同じです。
3. **Create PR** が表示されればそこから作成し、なければGitHubの **Compare & pull request** を使います。
4. チームで差分・確認結果・CIを確認し、基準ブランチ（通常は `main`）へマージします。**アプリ用CIは開発時に作ります。チェックがない、実行されない、skipされたことを成功とは扱いません。**
5. プレビューで発表します。継続して共有するURLが必要なら、[Azure Container Appsへの公開](common/publish.md)へ進み、アプリに合うコンテナ設定を作って公開後も確認します。

サーバーは記録した手順で終了します。Codespacesを使った場合は[一覧](https://github.com/codespaces)から **Stop codespace** も選びます。

## 発展：ほかの作業場所

Appには **New working tree** と **Cloud sandbox** もあります。並行作業に必要になったら運営と検討してください。この教材で確認する標準経路はPC上の編集とPC／Codespacesでの実行です。別の作業場所を選ぶ場合は、実行環境の準備や変更の受け渡しも改めて確認します。

[READMEへ戻る](../README.md) · [Codespacesで作る](codespaces.md) · [共通の開発環境](common/local-development.md)
