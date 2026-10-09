# Codespacesで作る

ブラウザの中でVS CodeとGitHub Copilotを使う、`main`コースの手順です。PCへのNode.jsやDockerのインストールは不要です。まず環境を開き、企画に合う構成を選んでからアプリを作ります。**開いた直後はアプリや起動コマンドがありません。**

**企画 → 環境準備 → 構成と計画の相談 → アプリ作成と検証 → チームで確認 → 発表**

## 1. チームのリポジトリを作る

1. [企画の進め方](common/ideation.md)の手順1〜5で、誰の何を解決するかと画面案をチームで決めます。手順6の文書整理は、このガイドの手順4で行います。
2. [コースの選び方](choose-start.md)に沿って、`main`コースのチーム用リポジトリを作ります。すでに作ったものがあれば、そのリポジトリを使います。初心者向けを選んだ場合は、そのブランチのガイドに従ってください。
3. チーム全員が編集する場合は、所有者が **Settings → Collaborators** からメンバーを追加します。

最初の実装は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。Azureへの公開を選ぶ場合は、[公開の初期設定](common/azure-setup.md)も確認します。

## 2. Codespaceを開く

1. チームのリポジトリで **Code → Codespaces → Create codespace on main** を選びます。マシンを選べる場合は、まず2-coreを使います。
2. ブラウザにVS Codeが開き、環境の準備が終わるまで待ちます。
3. Copilot Chatを開き、今回使う学生アカウントでサインインしていることを確認します。**Session Target** が表示される場合は **Local** を選び、開いているCodespaceのファイルとTerminalを使うチャットで進めます。
4. GitHubの[Copilot設定](https://github.com/settings/copilot)で **Copilot Student** の利用権利を確認します。モデルは **Auto** を使います。

初回は環境の構築と接続に時間がかかります。準備の表示やログが進んでいる間は待ちます。長く進まない場合は[Codespaces一覧](https://github.com/codespaces)から開き直します。改善しなければ運営と確認して **… → Stop codespace** で停止し、同じCodespaceを再度開きます。[公式の接続トラブル対処](https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-your-connection-to-github-codespaces)

**Restricted Mode（制限モード）**や信頼の確認が表示された場合は、今回のチームのリポジトリであることと内容を確認して、このワークスペースを信頼します。制限モードではTerminalやAIエージェントが使えないことがあります。[Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust)

ここでの **Local** はVS Codeのチャットの種類です。実行する場所はCodespacesであり、PCへの実行環境の導入は必要ありません。[セッションの違い](https://code.visualstudio.com/docs/agents/run/agent-harnesses)

この時点では環境だけが準備できています。`package.json` やアプリはまだないので、`npm ci` や `npm run dev` は実行しません。Node.js 24を使える環境ですが、アプリの構成は次の計画で選びます。

Copilot appからpushした変更を確認する場合は、`main`の代わりにその作業ブランチからCodespaceを開き、[Appの確認手順](copilot-app.md#codespacesへ変更を渡して確認する)へ戻ります。企画やブランチを作り直す必要はありません。

## 3. 作業用ブランチと資料を準備する

**Terminal → New Terminal** を開き、作業ブランチを作ります。

```sh
git switch -c feat/first-demo
```

同名のブランチをすでに使っている場合は `git switch feat/first-demo` で戻ります。複数人が編集する場合は、作業ごとに別の名前を使います。

[docs/source/](source/)へ、共有してよい企画メモや画面PNGを入れます。Figmaを使った場合も、画面PNGと「押すとどうなるか」のメモがあれば進められます。[締切管理の例](examples/deadline.md)も参考にできます。

## 4. Planで企画と作り方を相談する

Copilot Chatで **Plan** を選び、次を送ります。

```text
目的：
企画と画面案を整理し、短い開発時間で完成できる最小構成と実装・検証の計画を提案してください。

文脈：
prepare-projectスキル、docs/source/の資料、docs/product.md、docs/development.mdを読んでください。
このmainコースにはアプリ本体も起動コマンドもまだありません。
編集・実行・ブラウザ確認はCodespacesで行います。

制約：
曖昧な点は質問し、勝手に機能を増やさないでください。
React + Viteを含め、企画に必要な最小の技術構成を提案し、チームと選んでください。
不要なフレームワーク、API、DB、Docker化を最初から追加しないでください。
このPlanではファイルを編集せず、アプリの実装も始めないでください。

完成条件：
企画・DoD・対象外、採用する構成と理由、小さい実装単位・対応するDoD・確認方法を草案にしてください。
最初の実装単位に、最小アプリ、起動方法、必要なテストとPR用CIの作成を含めてください。
未決定の点を示し、チームが確認できる計画にしてください。
```

スキルが認識されない場合は、`.github/skills/prepare-project/SKILL.md` を読んで進めるよう伝えます。

対象者、最初に通す操作、完成条件、採用する構成をチームで確認します。計画がまとまったら **Agent** に切り替え、合意内容を次のファイルへ保存するよう依頼します。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 企画・DoD・対象外 |
| [development.md](development.md) | 採用構成、必要な実行環境、編集・実行場所。作成前のコマンドは「未作成」 |
| [tasks.md](tasks.md) | 実装順、各作業の確認方法、次への引き継ぎ |

Node.js以外の実行環境を選んだ場合は、`.devcontainer/` の調整も最初の作業に含めます。既に同じ内容を合意・保存できていれば、計画をやり直す必要はありません。

## 5. 最小アプリを作り、完成条件まで検証する

Agentへ次を送ります。

```text
目的：
最初の未完了タスクから実装し、合意した完成条件まで確認と修正を進めてください。

文脈：
docs/product.md、docs/tasks.md、docs/development.mdと、作業に関係するコードを読んでください。

制約：
合意した範囲と採用構成を守り、編集・実行・ブラウザ確認はCodespacesで行ってください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。

完成条件：
初回は最小アプリと起動方法、必要なテスト、同じ確認をPRで行うCIを用意してください。
実際の準備・起動・終了・確認コマンドとポート、環境設定をdocs/development.mdへ記録してください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
記録した確認を実行し、verify-goalスキルでDoDと実装を照合してください。
実際の結果をdocs/verification.mdに残し、未達をdocs/tasks.mdへ戻して修正・再確認してください。
```

変更やコマンドの確認が表示されたら、対象と操作を読んで進めます。差分は **Source Control** で確認できます。起動後は `docs/development.md` に記録したポートを **Ports → Open in Browser** で開きます。最初から4280のアプリが動いているわけではありません。

以降は[共通の実装ループ](common/build-loop.md)で進めます。途中でセッションが終わった場合は、4つの記録と現在の変更を読み、記録済みの実行場所・確認結果・次の作業から続けるよう依頼します。

## 6. 自分たちでも操作する

[確認の進め方](common/verification.md)に沿って、実装した人とは別の学生が転送URLでアプリを操作します。必須DoDの主要な操作経路、関係する空の状態・入力ミス、スマートフォン幅を確かめ、実際の結果を記録します。

ポートは **Private** のまま使い、ログイン済みの同じPCで交代して構いません。このURLはCodespaceとサーバーの起動中に使う確認用です。

ブラウザ版Codespacesでは、VS Code Desktopと同じ内蔵Browser Toolsが使えることを前提にしません。採用した構成に必要な自動テストと、人のブラウザ操作で確認できます。Playwrightを選んだ場合は、必要なブラウザのインストールも `docs/development.md` へ記録します。初期環境への自動インストールはありません。

同じ変更・同じ環境で直前に成功し、記録済みの自動確認は再実行不要です。未実施の確認や関連する変更がある場合は、記録されたコマンドで確認します。テストの成功だけで全DoDの達成とは扱いません。

## 7. 保存して共有し、発表する

**Source Control** で差分を確認し、採用するファイルの `+` でステージします。メッセージを入力して **Commit** を選び、そのままGitHubへ送ります。初回は **Publish Branch**、公開済みのブランチでは **Source Control → … → Push** を使います。[公式のGUI手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace)

GitHubで **Compare & pull request** を開き、チームの基準ブランチ（通常は `main`）へのPRを作ります。チームで差分・検証記録・CIを確認してマージします。**アプリ用CIは最初の実装で作るものです。チェックが表示されないことは成功の証拠ではありません。** 実際に採用した確認が実行され、成功したことを確かめます。

プレビューで発表するだけならAzureは不要です。継続して共有するURLが必要になったら、[Azure Container Appsへの公開](common/publish.md)へ進みます。コンテナ用の設定も、選んだアプリに合わせてその時点で作ります。

作業を終えたらサーバーを終了し、[Codespaces一覧](https://github.com/codespaces)から **Stop codespace** を選びます。ブラウザタブを閉じるだけで停止したとは判断しません。

## つまずいたとき

| 状況 | 次にすること |
| --- | --- |
| 開いた直後にアプリがない | `main`の初期状態です。手順4〜5で構成を選び、最小アプリを作る |
| プレビューが開かない | 記録した起動コマンド、起動完了の表示、実際のポート転送を確認する |
| 停止後にURLが開かない | Codespaceを再開し、記録したコマンドでアプリを起動する |
| Copilotが資料を見つけない | ファイルを保存し、必要なファイルのパスを明記する |
| テストが失敗する | エラー本文と、期待と違った操作・結果をCopilotへ渡す |
| 実行環境が足りない | 採用構成と`.devcontainer/`を照合し、必要な準備・再構築を行う |
| CodespacesやCopilotの利用上限 | アカウントの残量を確認し、運営へ相談。途中のファイルを保存する |

PC版VS Codeを使う場合は、Codespaceの **Open in VS Code** から接続できます。

[READMEへ戻る](../README.md) · [Copilot appで作る](copilot-app.md) · [共通の開発環境](common/local-development.md)
