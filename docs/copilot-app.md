# GitHub Copilot appで作る

GitHub Copilot appをPCに入れ、手元のファイルで開発する手順です。企画資料、完成条件、テスト、公開先は[Codespacesの手順](codespaces.md)と共通です。

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

この手順のアプリと開発サーバーはPC上で動きます。Copilot appから既存のCodespaceへ直接接続する手順は、この教材では検証していません。

## 2. チームのリポジトリをAppに追加する

1. [企画の進め方](common/ideation.md)で、誰の何を解決するかをチームで決めます。
2. 教材のGitHubページで **Use this template → Create a new repository** を選び、チーム用リポジトリを作ります。すでに作ったものがある場合は、そのリポジトリを使います。
3. Copilot appを開き、**Sign in to GitHub** で今回使う学生アカウントにログインします。
4. **Projects** 横の追加ボタンから **GitHub repository** を選び、チームのリポジトリを選択してcloneします。
5. そのプロジェクトで新しいsessionを作り、実行場所を **Local repository**、モードを **Interactive**、モデルを **Auto** にします。特定モデルを選ぶ手順はありません。

Autoが表示されない、利用権利や利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。

最初は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。各自で作業する場合はGitHubからそれぞれcloneし、別のブランチを使います。

## 3. SetupとRunで起動を確認する

リポジトリ設定の確認が表示されたら、[.github/github-app.yml](../.github/github-app.yml)を確認して受け入れます。教材の **Setup** は依存関係のインストール、**Run** は開発サーバーの起動に使います。

1. **Setup** が成功したことを確認します。自動で実行されなかった場合は、Terminalを開いて `npm ci` を実行します。
2. **Run** を実行します。コマンドは `npm run dev` です。
3. Browserパネルが開き、アプリが表示されたら準備完了です。自動表示されない場合は、Terminalに表示された `http://localhost:5173` を開きます。

Terminalは、session開始後にチャットで `/terminal` と入力しても開けます。サーバーを動かしているTerminalは開いたままにします。

別のTerminalで作業用ブランチを作ります。

```sh
git switch -c feat/first-demo
```

すでに同名のブランチがある場合は `git switch feat/first-demo` で戻ります。Appが別の作業用ブランチを作成済みの場合は、そのブランチを使って構いません。

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
実装後はnpm run checkとnpm run test:e2eを実行してください。
verify-goalスキルで完成条件と実装を照合し、確認結果をdocs/verification.mdへ記録してください。
未達の条件はdocs/tasks.mdへ戻して、範囲内の修正と再確認を続けてください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。
```

`verify-goal` が認識されない場合は、`.github/skills/verify-goal/SKILL.md` を読むよう伝えます。必要な確認に答え、**Changes** で変更内容を確認しながら進めます。

途中で終了した場合は、同じsessionで次を送ります。新しいsessionを作った場合も、保存済みの3ファイルが引き継ぎに使えます。

```text
docs/product.md、docs/tasks.md、docs/verification.mdと現在の変更を確認し、
最後に成功した確認と残りのタスクを説明してから続きを進めてください。
```

教材の「ゴールまで進める」は、この確認と修正の繰り返しを指します。`/goal` の対応や、session終了後の自動再開を前提にしていません。

## 6. Browserでチームの完成条件を確認する

[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が **Run → Browser** で実際に操作します。全画面のボタン・移動・戻る操作に加え、空の状態、入力ミス、スマートフォン幅を確認し、実際の結果を記録します。見た目を直したい場合は、Browserの **Pick & Polish** で要素を選んで伝えることもできます。

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

## 7. 変更を保存し、PRから公開へ進む

1. **Changes** で、採用したい変更になっているか確認します。
2. Copilotへ「意図した変更だけをコミットして現在の作業ブランチをpushし、mainへのPRを作る手順を案内して」と頼みます。コマンドの確認が表示されたら、対象ブランチとファイルを確認します。
3. **Create PR** が表示されている場合は、そこからPRを作れます。表示されない場合は、push後にGitHubのチームリポジトリで **Compare & pull request** を使います。
4. チームで差分、確認結果、CIを確認して `main` へマージします。
5. [共通の公開手順](common/publish.md)で **Deploy to GitHub Pages** を手動実行し、公開URLで改めて操作します。

サーバーを終了するときは、動かしているTerminalで `Ctrl+C` を押します。

## 発展：ほかの実行場所

Appには **New working tree** と **Cloud sandbox** もあります。並行作業を始めるときに運営と検討してください。Cloud sandboxは2026年10月8日時点でPublic Previewであり、この教材の標準経路の動作確認対象には含めていません。Codespacesの代わりとして自動的に同じ準備が行われるとは扱いません。

[READMEへ戻る](../README.md) · [Codespacesで作る](codespaces.md) · [公式情報と制約](references.md)
