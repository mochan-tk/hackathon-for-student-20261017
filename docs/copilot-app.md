# GitHub Copilot appで作る

GitHub Copilot appをPCに入れ、手元のファイルを編集する手順です。動作確認は、PC上のSWA CLIエミュレーターで行うか、GitHubへpushした変更をCodespacesで取り込んで行うかを選べます。企画資料、完成条件、テスト、公開先は[Codespacesの手順](codespaces.md)と共通です。

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

1. [企画の進め方](common/ideation.md)で、誰の何を解決するかをチームで決めます。
2. [教材のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)で **Use this template → Create a new repository** を選び、チーム用リポジトリを作ります。すでに作ったものがある場合は、そのリポジトリを使います。
3. Copilot appを開き、**Sign in to GitHub** で今回使う学生アカウントにログインします。
4. **Projects** 横の追加ボタンから **GitHub repository** を選び、チームのリポジトリを選択してcloneします。
5. そのプロジェクトで新しいsessionを作り、実行場所を **Local repository**、モードを **Interactive**、モデルを **Auto** にします。特定モデルを選ぶ手順はありません。

Autoが表示されない、利用権利や利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。

最初は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。各自で作業する場合はGitHubからそれぞれcloneし、別のブランチを使います。

## 3. 作業ブランチと実行場所を準備する

リポジトリ設定の確認が表示されたら、[.github/github-app.yml](../.github/github-app.yml)を確認して受け入れます。教材の **Setup** は依存関係のインストール、**Run** はSWA CLIとViteの起動に使います。

Terminalを開き、作業用ブランチを作ります。session開始後にチャットで `/terminal` と入力しても開けます。

```sh
git switch -c feat/first-demo
```

すでに同名のブランチがある場合は `git switch feat/first-demo` で戻ります。Appが別の作業用ブランチを作成済みの場合は、そのブランチを使って構いません。

### PCで動作確認する場合

1. **Setup** が成功したことを確認します。自動で実行されなかった場合は、Terminalで `npm ci` を実行します。
2. **Run** を実行します。コマンドは `npm run dev` です。
3. Browserパネルが開き、アプリが表示されたら準備完了です。自動表示されない場合は、`http://127.0.0.1:4280` を開きます。

サーバーを動かしているTerminalは開いたままにします。確認にはSWA CLIの **4280** を使い、背後のViteの5173を直接開かないようにします。APIの追加などは[共通のローカル開発手順](common/local-development.md)を参照してください。

### Codespacesで動作確認する場合

PCでのRunを省き、下の[Codespacesへ変更を渡して確認する手順](#codespacesへ変更を渡して確認する)を使います。**最初は、作成した作業ブランチをすぐにpushして、Codespacesでスターターの起動を確かめます。その後は、確認したい変更ができるたびにcommit・pushしてからCodespacesへ移ります。**

Copilotには「編集はこのPC、実行とブラウザ確認はCodespacesで行う。確認したい変更ができたら、その都度作業ブランチへのcommit・pushとCodespacesでの確認コマンドを案内して。実行できない確認は未確認として残して」と伝えます。

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

## 5. Interactiveで実装と確認を繰り返す

[共通の実装ループ](common/build-loop.md)に沿って、次を送ります。

```text
docs/product.mdとdocs/tasks.mdを読み、最初の未完了タスクから実装してください。
完成条件に対応する確認方法を決め、必要な機能テストを用意してください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
実行場所がPCの場合は、実装後にnpm run checkとnpm run test:e2eを実行してください。
実行場所がCodespacesの場合は、確認できる小さな変更ごとに、意図した変更を作業ブランチへcommit・pushしてください。
その後、Codespacesでこちらが実行するpullと確認コマンドを案内し、結果を渡すまで次の修正を待ってください。
verify-goalスキルで完成条件と実装を照合し、確認結果をdocs/verification.mdへ記録してください。
未達の条件はdocs/tasks.mdへ戻して、範囲内の修正と再確認を続けてください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。
```

`verify-goal` が認識されない場合は、`.github/skills/verify-goal/SKILL.md` を読むよう伝えます。必要な確認に答え、**Changes** で変更内容を確認しながら進めます。

Codespacesで実行する場合は、最初に「実行場所はCodespacesです」と伝えます。**実装 → commit・push → Codespacesでpull・確認 → 結果をAppへ渡す → 修正**を、小さい変更ごとに繰り返します。結果を受け取る前に、テスト成功や完成条件の達成として記録しないようにします。

途中で終了した場合は、同じsessionで次を送ります。新しいsessionを作った場合も、保存済みの3ファイルが引き継ぎに使えます。

```text
docs/product.md、docs/tasks.md、docs/verification.mdと現在の変更を確認し、
最後に成功した確認と残りのタスクを説明してから続きを進めてください。
```

教材の「ゴールまで進める」は、この確認と修正の繰り返しを指します。`/goal` の対応や、session終了後の自動再開を前提にしていません。

## 6. チームの完成条件を確認する

### PCで確認する

[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が **Run → Browser** の `http://127.0.0.1:4280` で実際に操作します。同じPCで交代して構いません。全画面のボタン・移動・戻る操作に加え、空の状態、入力ミス、スマートフォン幅を確認し、実際の結果を記録します。見た目を直したい場合は、Browserの **Pick & Polish** で要素を選んで伝えることもできます。

Terminalで次の確認も行います。

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

この手順は、実装中に何度も使います。**Codespacesで確かめたい変更ができたら、その場でPC側の変更をcommit・pushします。アプリ全体の完成や、最後のPR作成まで待つ必要はありません。** このcommit・pushは、動作確認するコードをCodespacesへ渡すためのものです。確認結果は実行後に記録し、`main`への統合は手順7で行います。

PCとCodespacesのファイルは自動同期されません。**同じチームリポジトリの同じ作業ブランチ**を使います。以下の `feat/first-demo` は、実際に使っているブランチ名に置き換えてください。

1. PCのAppでファイルを保存し、**Changes** で意図した変更を確認してcommitします。Copilotに「今回確認したい変更だけを確認し、この作業ブランチにcommit・pushしてください」と依頼しても構いません。初回でファイルをまだ変更していない場合は、新しいcommitは不要なので次のpushへ進みます。
2. **commitしたら、続けてすぐにpushします。** PCのTerminalでブランチ名を確認し、GitHubへ送ります。Copilotがpush済みの場合も、ブランチ名とコミット番号を確認します。未コミットの変更や、まだpushしていないコミットはCodespacesへ届きません。

   ```sh
   git branch --show-current
   git push -u origin feat/first-demo
   git rev-parse --short HEAD
   ```

3. GitHubで**同じチームリポジトリ**を開き、**Code → Codespaces** からCodespaceを作成するか、既存のものを開きます。環境準備は[Codespacesの手順](codespaces.md#2-codespaceを開く)を参照してください。
4. Codespacesで前回のサーバーが動いていれば、そのTerminalで `Ctrl+C` を押して止めます。次に `git status` を実行します。未コミットの変更がある場合は、内容を確認して保存・コミットするか運営へ相談し、先に作業ツリーを整理します。変更を消すための `reset --hard` や強制的な切り替えは行いません。変更がなければ、次を実行します。

   ```sh
   git fetch origin
   git switch feat/first-demo
   git pull --ff-only
   git branch --show-current
   git rev-parse --short HEAD
   ```

5. PCとCodespacesで**ブランチ名とコミット番号が一致**することを確認します。`pull --ff-only` が失敗した場合は、双方に別の変更がある可能性があるため、その出力をCopilotか運営へ渡して解決します。一致したらCodespacesで起動します。

   ```sh
   npm ci
   npm run dev
   ```

6. **Ports → 4280 → Open in Browser** を開いて操作します。ポートの公開範囲は **Private** のままで構いません。別の学生もログイン済みの同じPCで交代して確認できます。Codespaceやサーバーを停止すると、この確認用URLは使えなくなります。
7. Codespacesの別Terminalで `npm run check` と `npm run test:e2e` を実行します。結果・エラー全文・実際の操作結果・確認したコミット番号をPCのCopilot appへ渡し、修正と `docs/verification.md` への記録を依頼します。スクリーンショットも添えられます。修正後は、再びコミット・pushから繰り返します。

この経路では、通常はPC側で編集し、Codespaces側で実行・確認すると変更を追いやすくなります。Codespacesでもファイルを編集した場合は、そちらの変更もコミット・pushし、PCの作業ツリーに未コミットの変更がないことを確認して `git pull --ff-only` で取り込んでから編集を再開します。

## 7. 変更を保存し、PRから公開へ進む

1. **Changes** で、採用したい変更になっているか確認します。
2. Copilotへ「意図した変更だけをコミットして現在の作業ブランチをpushし、mainへのPRを作る手順を案内して」と頼みます。コマンドの確認が表示されたら、対象ブランチとファイルを確認します。
3. **Create PR** が表示されている場合は、そこからPRを作れます。表示されない場合は、push後にGitHubのチームリポジトリで **Compare & pull request** を使います。
4. チームで差分、確認結果、CIを確認して `main` へマージします。
5. 継続して使えるURLが必要になったら、[Azure Static Web Appsへの公開手順](common/publish.md)へ進み、公開URLで改めて操作します。PCやCodespacesでの動作確認までなら、Azureへのデプロイは不要です。

サーバーを終了するときは、動かしているTerminalで `Ctrl+C` を押します。Codespacesを使った場合は、[Codespaces一覧](https://github.com/codespaces)から **Stop codespace** も選びます。

## 発展：ほかの実行場所

Appには **New working tree** と **Cloud sandbox** もあります。並行作業を始めるときに運営と検討してください。Cloud sandboxは2026年10月8日時点でPublic Previewであり、この教材の標準経路の動作確認対象には含めていません。Codespacesの代わりとして自動的に同じ準備が行われるとは扱いません。

[READMEへ戻る](../README.md) · [Codespacesで作る](codespaces.md) · [公式情報と制約](references.md)
