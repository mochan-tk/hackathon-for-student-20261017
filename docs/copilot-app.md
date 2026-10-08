# GitHub Copilot appで作る

GitHub Copilot appをPCに入れ、手元のファイルを編集する手順です。動作確認は、PCで開発サーバーを起動して行うか、GitHubへpushした変更をCodespacesで取り込んで行うかを選べます。普段の開発にDockerは不要です。企画資料、完成条件、テスト、Azure Container Appsへの公開手順は[Codespacesの手順](codespaces.md)と共通です。

**企画 → PCの準備 → 計画 → 実装と検証 → チームで確認 → 公開**

## 1. PCとアカウントを準備する

macOS、Windows、Linuxで利用できます。次を準備します。

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)の **24 LTS**（npmも含まれます）
- [GitHub Copilot app](https://github.com/features/ai/github-app)
- Copilot Studentを有効にしたGitHubアカウント

インストール後に新しいターミナルを開き、確認します。

```sh
git --version
node --version
npm --version
```

Node.jsが **24.x** と表示されれば、この教材の指定バージョンです。Gitの名前とメールが未設定の場合は、最初のコミット時にGitHubの案内に沿って設定します。

GitHubの[Copilot設定](https://github.com/settings/copilot)で利用権利を確認します。GitHub Proへの加入とCopilot Studentの有効化は別です。

Copilot appによる編集はPC上で行います。Codespacesで動作確認する場合は、PCとCodespacesの間をGitHubのコミットで引き継ぎます。Copilot appから既存のCodespaceへ直接接続する手順ではありません。

## 2. チームのリポジトリをAppに追加する

Azureへの自動公開まで行う場合、Publicリポジトリ、またはGitHub Proの個人アカウント所有のPrivateリポジトリで進められます。Organization所有のPrivateリポジトリではOrganizationのGitHub Team以上が必要です。[公開の初期設定](common/azure-setup.md)を参照してください。

1. [企画の進め方](common/ideation.md)で、誰の何を解決するかをチームで決めます。
2. [教材のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)で **Use this template → Create a new repository** を選び、チーム用リポジトリを作ります。すでに作ったものがある場合は、そのリポジトリを使います。
3. チームのほかのメンバーも編集する場合は、リポジトリ所有者が **Settings → Collaborators** から招待し、各メンバーが招待を受け入れます。
4. Copilot appを開き、**Sign in to GitHub** で今回使う学生アカウントにログインします。
5. **Projects** 横の追加ボタンから **GitHub repository** を選び、チームのリポジトリを選択してcloneします。
6. そのプロジェクトで新しいsessionを作り、実行場所を **Local repository**（版によっては **Current checkout**）、モードを **Interactive**、モデルを **Auto** にします。特定モデルを選ぶ手順はありません。
7. 最初に「README.mdを読み、この教材の構成を確認してください。まだファイルを編集せず待ってください」と送ってsessionを開始します。

Autoが表示されない、利用権利や利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。

最初は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。各自で作業する場合はGitHubからそれぞれcloneし、別のブランチを使います。

## 3. 作業ブランチと実行場所を準備する

リポジトリ設定の確認が表示されたら、[.github/github-app.yml](../.github/github-app.yml)を確認して受け入れます。教材の **Setup** は依存関係のインストール、**Run** は `npm run dev` を通じたViteとNode.jsのAPIの起動に使います。Runのコマンドはこの設定ファイルに登録済みです。設定の受け入れ前は適用されず、設定ファイルが更新された場合も受け入れ直します。[設定の公式説明](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)

Appが作業用ブランチを作成済みの場合は、そのブランチを使います。まだ `main` で作業している場合は、Terminalを開いて次で作業用ブランチを作ります。session開始後にチャットで `/terminal` と入力しても開けます。

```sh
git switch -c feat/first-demo
```

すでに同名のブランチがある場合は `git switch feat/first-demo` で戻ります。複数人が別々に実装する場合は、`feat/input-form` など作業ごとに別の名前にします。

### PCで動作確認する場合

1. **Setup** が成功したことを確認します。自動で実行されなかった場合は、Terminalで `npm ci` を実行します。
2. **Run** を実行します。コマンドは `npm run dev` です。
3. Browserパネルが開き、アプリが表示されたら準備完了です。自動表示されない場合は、`http://127.0.0.1:4280` を開きます。

サーバーを動かしているTerminalは開いたままにします。画面とAPIの確認には **4280** を使います。APIの追加や公開前のコンテナ確認は[共通のローカル開発手順](common/local-development.md)を参照してください。

### Codespacesで動作確認する場合

PCでのRunを省き、下の[Codespacesへ変更を渡して確認する手順](#codespacesへ変更を渡して確認する)を使います。**手順4で企画をファイルに保存したら、Appの画面で最初のcommit・pushを行い、Codespacesでスターターの起動を確かめます。その後も、確認したい変更ができるたびにAppの画面でcommit・pushしてからCodespacesへ移ります。**

Copilotには「編集はこのPC、実行とブラウザ確認はCodespacesで行う。確認したい変更ができたら、変更内容とコミットメッセージ案、Codespacesでの確認コマンドを示して待って。commit・pushは自分でAppの画面から行う。実行できない確認は未確認として残して」と伝えます。

## 4. 資料を渡してPlanで計画する

[docs/source/](source/)へ企画メモや画面PNGを入れます。Figmaで考えた画面はPNGと操作・遷移の説明でも渡せます。元ファイルを探しにくい場合は、プロジェクトのフォルダをOSのファイル管理画面で開いて追加します。[締切管理の例](examples/deadline.md)も参考にできます。

モードを **Plan** に切り替え、次を送ります。

```text
prepare-projectスキルとdocs/source/の資料を読み、
docs/product.mdに整理する企画・完成条件の案を作ってください。
曖昧な点は質問してください。勝手に新しい機能を加えず、
利用者の一連の操作が最小限で通る範囲に絞ってください。
その後、docs/tasks.mdに残す小さい実装単位と確認方法を提案してください。
この段階ではアプリの実装を始めないでください。
```

スキルが認識されない場合は、`.github/skills/prepare-project/SKILL.md` を読んで進めるよう伝えます。`@`でファイルを追加することもできます。

チームで対象者、最初に通す操作、完成条件を確認し、必要な修正を伝えます。計画を採用したら **Interactive** に切り替え、次のファイルへ反映してもらいます。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 対象者、課題、作る範囲、完成条件、制約 |
| [tasks.md](tasks.md) | 実装の順番と進捗 |
| [verification.md](verification.md) | 実施した確認、結果、未確認のこと |

Codespacesで動作確認する場合は、ここで[変更を渡して確認する手順](#codespacesへ変更を渡して確認する)へ進み、企画ファイルをcommit・pushしてスターターが起動することを確かめてから実装を始めます。

## 5. Interactiveで実装と確認を繰り返す

[共通の実装ループ](common/build-loop.md)に沿って、次を送ります。

```text
docs/product.mdとdocs/tasks.mdを読み、最初の未完了タスクから実装してください。
完成条件に対応する確認方法を決め、必要な機能テストを用意してください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
実行場所がPCの場合は、実装後にnpm run checkとnpm run test:e2eを実行してください。
実行場所がCodespacesの場合は、確認できる小さな変更ごとに、変更内容とコミットメッセージ案を示してください。
commit・pushはこちらがCopilot appの画面で行うので、自動実行せず待ってください。
Codespacesでの起動・テストのコマンドも案内し、結果を渡すまで次の修正を待ってください。
変更の取り込みは教材のGUI手順で行います。Gitの確認コマンドやコミット番号の照合は通常の手順に追加しないでください。
verify-goalスキルで完成条件と実装を照合し、確認結果をdocs/verification.mdへ記録してください。
未達の条件はdocs/tasks.mdへ戻して、範囲内の修正と再確認を続けてください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。
```

`verify-goal` が認識されない場合は、`.github/skills/verify-goal/SKILL.md` を読むよう伝えます。必要な確認に答え、**Changes** で変更内容を確認しながら進めます。

Codespacesで実行する場合は、最初に「実行場所はCodespacesです」と伝えます。**実装 → 学生がAppの画面でcommit・push → Codespacesでpull・確認 → 結果をAppへ渡す → 修正**を、小さい変更ごとに繰り返します。結果を受け取る前に、テスト成功や完成条件の達成として記録しないようにします。

途中で終了した場合は、同じsessionで次を送ります。新しいsessionを作った場合も、保存済みの3ファイルが引き継ぎに使えます。

```text
docs/product.md、docs/tasks.md、docs/verification.mdと現在の変更を確認し、
最後に成功した確認と残りのタスクを説明してから続きを進めてください。
```

教材の「ゴールまで進める」は、この確認と修正の繰り返しを指します。`/goal` の対応や、session終了後の自動再開を前提にしていません。

## 6. チームの完成条件を確認する

動作確認に選んだ経路へ進みます。どちらも[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が必須DoDを確かめます。

### PCで確認する

[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が **Run → Browser** の `http://127.0.0.1:4280` で実際に操作します。同じPCで交代して構いません。全画面のボタン・移動・戻る操作に加え、空の状態、入力ミス、スマートフォン幅を確認し、実際の結果を記録します。見た目を直したい場合は、Browserの **Pick & Polish** で要素を選んで伝えることもできます。

サーバーとは別のTerminalで次の確認も行います。

```sh
npm run check
npm run test:e2e
```

PlaywrightのChromiumがないというエラーが出た場合は、次を一度実行してから再試行します。

```sh
npx playwright install chromium
```

LinuxでOSのライブラリ不足が出た場合は、運営とエラーを確認して `npx playwright install --with-deps chromium` を実行します。

MCPの追加は必須ではありません。AIがBrowserを操作できない場合でも、Playwrightのテストと人の操作確認で進められます。教材の初期テストが成功しても、チームで決めた完成条件は別途確認します。

### Codespacesへ変更を渡して確認する

この手順は、実装中に何度も使います。**Codespacesで確かめたい変更ができたら、その場で学生がCopilot appの画面からcommit・pushします。アプリ全体の完成や、最後のPR作成まで待つ必要はありません。** このcommit・pushは、動作確認するコードをCodespacesへ渡すためのものです。確認結果は実行後に記録し、`main`への統合は手順7で行います。

PCとCodespacesのファイルは自動同期されません。**同じチームリポジトリの同じ作業ブランチ**を使います。

1. PC側の編集が終わったらファイルを保存し、Appの **Changes** を開きます。入力欄の上に見当たらない場合は、右パネルの **＋ → Changes** から開けます。表示する変更を **Uncommitted** に切り替え、ファイルごとの差分と、表示中の作業ブランチ名を確認します。
2. **Changesのブランチ操作メニュー（branch actions）**を開き、**Commit** の操作を選びます。確認画面が出たら、対象の変更とコミットメッセージを確認して実行します。メッセージは「企画と完成条件を記録」「入力フォームを追加」のように変更内容が分かるものにします。Copilotにはメッセージ案を相談できます。すでにコミット済みの場合は、新しいcommitは不要なので次へ進みます。
3. **commitしたら、同じメニューから続けてすぐにPushの操作を選びます。** 初回にブランチの公開を求められたら、チームのリポジトリへ現在の作業ブランチを公開します。Appの処理完了を待ちます。**CommitはPC内への記録、PushはGitHubへの送信**です。commitだけではCodespacesへ届きません。
4. ブラウザでGitHubの**同じチームリポジトリ**を開き、ブランチ選択欄で作業ブランチを選びます。最新の変更が反映されていれば、Codespacesへ進めます。
5. **ここからはCodespacesで動作確認する場合の操作です。** 初回は、作業ブランチを選んだまま **Code → Codespaces → Create codespace on（作業ブランチ名）** から作成し、準備が終わるまで待ちます。2回目以降は、その作業ブランチの既存Codespaceを開きます。初回準備がうまくいかない場合は[Codespacesの手順2](codespaces.md#2-codespaceを開く)を参照してから、この手順へ戻ります。Appですでに企画・ブランチを準備しているため、Codespaces側で作り直す必要はありません。
6. **既存Codespaceを使う場合だけ**、前回のサーバーが動いていればTerminalで `Ctrl+C` を押して止め、**Source Control → … → Pull** で今回pushした変更を取り込みます。新規作成直後はこの操作は不要です。
7. **CodespacesのTerminal**で起動します。

   ```sh
   npm ci
   npm run dev
   ```

8. **Ports → 4280 → Open in Browser** を開き、[確認の進め方](common/verification.md)に沿って操作します。4280が表示されなければ **Forward a Port** で追加します。ポートの公開範囲は **Private** のままで構いません。別の学生もログイン済みの同じPCで交代して確認できます。Codespaceやサーバーを停止すると、この確認用URLは使えなくなります。
9. Codespacesの別Terminalで `npm run check` と `npm run test:e2e` を実行します。結果・エラー全文・実際の操作結果をPCのCopilot appへ渡し、修正と `docs/verification.md` への記録を依頼します。スクリーンショットも添えられます。修正後は、再びAppの画面でcommit・pushするところから繰り返します。

別のブランチで使っていたCodespaceを再利用する場合は、左下のブランチ名から今回の作業ブランチへ切り替えてからPullします。一覧に見当たらなければ、手順5の方法で作業ブランチから新規作成できます。Pullでエラーが出た場合は、その表示をCopilotか運営へ渡してください。[CodespacesのGUI操作の公式手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace#pulling-changes-from-the-remote-repository)も参照できます。

このGUI手順は[Copilot app v1.1.26以降のbranch actions](https://github.com/github/app/releases/tag/v1.1.26)を前提にしています。Commit・Pushの項目は、版やブランチの状態で表記が変わります。[v1.1.27以降は対象が0件のPull・Pushは表示されません](https://github.com/github/app/releases/tag/v1.1.27)。Pushが見えないだけで送信済みとは判断せず、GitHub上のブランチと最新コミットで確認してください。メニューが見つからない場合はAppのバージョンと画面を運営に見せてください。

この経路では、通常はPC側で編集し、Codespaces側で実行・確認すると変更を追いやすくなります。Codespacesでもファイルを編集した場合は、そちらの変更もコミット・pushします。その後、PCのAppで未コミットの変更がないことを確認し、ブランチ操作メニューの **Pull changes** で取り込んでから編集を再開します。取り込みに失敗した場合は、表示された内容をCopilotか運営へ渡して解決します。

## 7. 変更を保存し、PRから公開へ進む

1. **Changes** で、採用したい変更になっているか確認します。
2. 上の[GUIで変更を渡す手順](#codespacesへ変更を渡して確認する)の1〜4と同じ操作で、残っている変更や検証記録をcommit・pushし、GitHubへの反映を確認します。PCで動作確認した場合もこの操作を使います。すべて送信済みなら次へ進みます。
3. **Create PR** が表示されている場合は、そこからPRを作れます。表示されない場合は、push後にGitHubのチームリポジトリで **Compare & pull request** を使います。
4. チームで差分、確認結果、CIを確認して `main` へマージします。
5. 継続して使えるURLが必要になったら、[Azure Container Appsへの公開手順](common/publish.md)へ進み、公開URLで改めて操作します。GitHub Actionsで本番用コンテナをテストしてから公開するため、PCへのDocker導入は必須ではありません。PCやCodespacesでの動作確認までなら、Azureへのデプロイは不要です。

サーバーを終了するときは、動かしているTerminalで `Ctrl+C` を押します。Codespacesを使った場合は、[Codespaces一覧](https://github.com/codespaces)から **Stop codespace** も選びます。

## 発展：ほかの実行場所

Appには **New working tree** と **Cloud sandbox** もあります。並行作業を始めるときに運営と検討してください。Cloud sandboxは2026年10月8日時点でPublic Previewであり、この教材の標準経路の動作確認対象には含めていません。Codespacesの代わりとして自動的に同じ準備が行われるとは扱いません。

[READMEへ戻る](../README.md) · [Codespacesで作る](codespaces.md) · [公式情報と制約](references.md)
