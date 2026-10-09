# Codespacesで作る

ブラウザの中でVS CodeとGitHub Copilotを使う手順です。PCへのNode.jsやDockerのインストールは不要です。Codespace内で画面とAPIを動かして確認し、必要になったらAzure Container Appsへ公開します。

**企画 → 環境準備 → 計画 → 実装と検証 → チームで確認 → 公開**

## 1. チームのリポジトリを作る

Azureへの自動公開まで行う場合、Publicリポジトリ、またはGitHub Proの個人アカウント所有のPrivateリポジトリで進められます。Organization所有のPrivateリポジトリではOrganizationのGitHub Team以上が必要です。[公開の初期設定](common/azure-setup.md)を参照してください。

1. [企画の進め方](common/ideation.md)の手順1〜5で、誰の何を解決するかと画面案をチームで決めます。手順6の文書整理は、環境を準備した後、このガイドの手順4で行います。
2. [教材のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)で **Use this template → Create a new repository** を選びます。既にチーム用リポジトリを作っている場合は、そのリポジトリを使います。
3. チームの代表者のアカウント、または利用できるOrganizationを所有者にして作成します。チーム全員が編集する場合は、リポジトリの **Settings → Collaborators** からメンバーを追加します。
4. 以降は、作成したチームのリポジトリを開いて作業します。

最初の実装は一人が操作し、ほかのメンバーが企画・画面・動作を確認すると進めやすくなります。複数人が編集する場合は、それぞれ別のブランチを使います。

## 2. Codespaceを開く

1. チームのリポジトリで **Code → Codespaces → Create codespace on main** を選びます。マシンを選べる場合は、まず2-coreを使います。
2. ブラウザにVS Codeが開き、準備が終わるまで待ちます。
3. Copilot Chatを開き、今回使う学生アカウントでサインインしていることを確認します。**Session Target** が表示される場合は **Local** を選び、開いているCodespaceのファイルとTerminalを使うチャットで進めます。
4. GitHubの[Copilot設定](https://github.com/settings/copilot)で **Copilot Student** の利用権利を確認します。Chatのモデルは **Auto** を使います。特定モデルを選ぶ手順はありません。

Copilot appからpushした変更を確認する場合は、上の `main` の代わりに、その作業ブランチをGitHubで選んでからCodespaceを作成します。

以下の **Plan → Agent** は、VS CodeのLocalセッションの操作です。ここでのLocalはチャットの種類を指し、PCへのNode.js導入は必要ありません。[VS Codeのセッションの違い](https://code.visualstudio.com/docs/agents/run/agent-harnesses)

Copilotが使えない、Autoが表示されない、利用上限の表示が出る場合は、アカウント名と表示内容を運営に見せてください。GitHub Proへの加入とCopilot Studentの有効化は別です。

**Terminal → New Terminal** からターミナルを開き、次を一行ずつ実行します。

```sh
node --version
npm --version
npm ci
npm run dev
```

Node.jsは **24.x** を使います。最後のコマンドはサーバーを動かし続けるので、ターミナルは開いたままにします。

画面下部の **Ports** から **4280 → Open in Browser** を選びます。ポートが表示されない場合は **Forward a Port** で `4280` を追加します。アプリが表示されたら準備完了です。

`npm run dev` は画面を動かすViteとNode.jsのAPIをまとめて起動します。画面とAPIの確認には **4280** のURLを使います。仕組みとAPIの追加は[共通のローカル開発手順](common/local-development.md)を参照してください。

転送ポートは **Private** のまま使います。このURLはCodespaceとサーバーの起動中に使う確認用で、停止するとアクセスできません。チームの学生に試してもらうときは、ログイン済みの同じPCで交代して操作できます。継続して使える公開URLが必要になったら、最後のAzureへの公開へ進みます。

## 3. 作業用ブランチと資料を準備する

Copilot appからの確認用に作業ブランチを開いている場合は、そのまま使い、[Appの確認手順](copilot-app.md#codespacesへ変更を渡して確認する)へ戻ります。

サーバーとは別のターミナルを開きます。

```sh
git switch -c feat/first-demo
```

同名のブランチをすでに使っている場合は、作成し直さず `git switch feat/first-demo` で戻ります。複数人で編集する場合は、`feat/input-form` など作業ごとに別の名前にします。

[docs/source/](source/)へ企画メモや画面PNGを入れます。Figmaを使った場合も、画面PNGと「押すとどうなるか」のメモがあれば進められます。[締切管理の例](examples/deadline.md)も参考にできます。

引き継ぐ情報は次の3ファイルに残します。

| ファイル | 残す内容 |
| --- | --- |
| [product.md](product.md) | 対象者、課題、作る範囲、完成条件、制約 |
| [tasks.md](tasks.md) | 実装の順番と進捗 |
| [verification.md](verification.md) | 実施した確認、結果、未確認のこと |

## 4. Planで実装前のすり合わせをする

Copilot Chatで **Plan** を選び、次を送ります。

```text
目的：
企画と画面案を、実装へ進める企画・完成条件・作業案に整理してください。

文脈：
prepare-projectスキル、docs/source/の資料、docs/product.mdを読んでください。

制約：
曖昧な点は質問してください。勝手に新しい機能を加えず、
利用者の一連の操作が最小限で通る範囲に絞ってください。
このPlanではファイルを編集せず、アプリの実装も始めないでください。

完成条件：
docs/product.mdに残す企画・DoD・対象外と、docs/tasks.mdに残す小さい実装単位・対応するDoD・確認方法を、草案として会話に示してください。
未決定の点も分かるようにしてください。この段階の完了は、チームが確認できる草案ができることです。
```

スキルが認識されない場合は、次を追加します。

```text
.github/skills/prepare-project/SKILL.mdの手順を読んで進めてください。
```

対象者、最初に通す操作、完成条件をチームで確認します。案を直したい場合は、そのままChatへ伝えます。計画がまとまったら **Agent** に切り替え、採用した企画と計画を `docs/product.md` と `docs/tasks.md` へ反映するよう依頼します。`docs/tasks.md` の引き継ぎ欄には「編集・実行・ブラウザ確認はCodespaces」と残します。画面上の計画だけで終わらせず、次のセッションでも読めるファイルに残します。

## 5. 小さく実装して、完成条件まで検証する

[共通の実装ループ](common/build-loop.md)に沿って、Agentへ次を送ります。

```text
目的：
最初の未完了タスクから実装し、合意した完成条件を満たすまで確認と修正を進めてください。

文脈：
docs/product.md、docs/tasks.mdと関係するコード・テストを読んでください。

制約：
合意した範囲を守り、編集・実行・ブラウザ確認はCodespacesで行ってください。
人の判断、認証、外部サービスの準備が必要なら、その理由と次の操作を知らせてください。
実行できなかった確認は未確認とし、成功扱いにしないでください。

完成条件：
完成条件に対応する確認方法を決め、必要な機能テストを用意してください。
並び替えなど期待結果が明確な機能は、先にテストを書いて未実装時の失敗も確認してください。
実装後はnpm run checkとnpm run test:e2eを実行してください。
verify-goalスキルで完成条件と実装を照合し、確認結果をdocs/verification.mdへ記録してください。
未達の条件はdocs/tasks.mdへ戻して、範囲内の修正と再確認を続けてください。
```

`verify-goal` が認識されない場合も、`.github/skills/verify-goal/SKILL.md` を読むよう伝えれば同じ手順で進められます。これは教材の完成条件に向けて繰り返す依頼です。チャットが終了した後まで自動で再開する機能ではありません。

変更やコマンドの確認が表示されたら、対象と操作を読んで進めます。修正内容を見たいときは **Source Control** でファイルを選び、差分を確認します。

途中で止まったら、次を送ります。

```text
docs/product.md、docs/tasks.md、docs/verification.mdと現在の変更を確認してください。
最後に成功した確認と残りのタスクを説明し、合意した範囲と記録済みの編集・実行場所に従って続きを進めてください。
対応する完成条件を確かめ、結果と未達・未確認、次の作業を文書へ残してください。
```

## 6. 自分たちでも操作する

[確認の進め方](common/verification.md)を開き、実装した人とは別の学生が4280の転送URLでアプリを操作します。同じPCで交代して確認して構いません。必須DoDに対応する主要な操作経路のボタン・移動・戻る操作、その機能に関係する空の状態や入力ミス、スマートフォン幅を確認し、実際の結果を記録します。

ブラウザ版Codespacesでは、VS Code Desktopの内蔵Browser Toolsと同じ機能が使えることを前提にしません。AIによる画面確認が使えなくても、**Playwrightのテスト＋人のブラウザ操作**で進められます。MCPの追加は必須ではありません。

同じ変更・同じ環境で直前に成功し、記録済みの自動確認は再実行不要です。未実施の確認や、関連するコード・仕様・実行環境を変えた場合の確認は、別ターミナルで次を実行します。

```sh
npm run check
npm run test:e2e
```

PlaywrightのChromiumがないというエラーが出た場合は、次を一度実行してから再試行します。

```sh
npx playwright install --with-deps chromium
```

テストは学生のアプリに合わせて更新します。教材の初期テストだけの成功を、チームの完成条件の達成とは扱いません。

## 7. 保存し、必要になったら公開する

**Source Control** で変更ファイルを選んで差分を確認し、採用するファイルの `+` を押してステージします。コミットメッセージを入力して **Commit** を選び、そのままGitHubへ送ります。初回は **Publish Branch**、公開済みの作業ブランチでは **Source Control → … → Push** を使います。Copilotには変更内容の説明やコミットメッセージ案を相談できます。[CodespacesのGUI操作の公式手順](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace)

GitHubのチームリポジトリで **Compare & pull request** を開き、`main` へのPRを作ります。チームで変更とCIの結果を確認してマージします。CIには本番用コンテナを起動して行うテストも含まれます。Codespacesでの開発・動作確認までなら、Azureへのデプロイは不要です。継続して使えるURLが必要になったら、[Azure Container Appsへの公開手順](common/publish.md)へ進みます。公開後も実際のURLで動作を確認します。

公開前に自分たちでコンテナを操作したい場合は、[Codespacesでのコンテナ確認](common/local-development.md#コンテナで確認する任意)を使えます。日々の編集は引き続き `npm run dev` で進められます。

作業を終えたら、[Codespaces一覧](https://github.com/codespaces)のメニューから **Stop codespace** を選びます。ブラウザタブを閉じるだけでは、直ちに停止するとは限りません。

## うまくいかないとき

| 状況 | 次にすること |
| --- | --- |
| Node.jsが24.xではない | `.devcontainer/`を使って作成したCodespaceか確認。運営に環境の再構築を相談する |
| プレビューが開かない | `npm run dev`が動いているか、Portsの4280を開いているか確認する。PrivateのURLはCodespaceを使っているアカウントで開く |
| Codespaceの停止後にURLが開かない | 開発中の確認用URLのため、Codespaceを再開して`npm run dev`を実行する。継続的な公開はAzureへの公開手順を使う |
| Copilotが資料を見つけない | ファイルを保存し、`docs/product.md`などのパスを明記する |
| テストが失敗する | エラー本文と、どの操作が期待と違ったかをCopilotへ渡す |
| CodespacesやCopilotの利用上限 | アカウントの残量を確認し、運営へ相談。途中のファイルを保存する |

PC版VS Codeを使いたい場合は、Codespaceの **Open in VS Code** から接続できます。これは任意の経路です。内蔵ブラウザを利用する場合も、通常のポート転送で開けるURLを使い、Previewのremote proxy設定は必須にしません。

[READMEへ戻る](../README.md) · [Copilot appで作る](copilot-app.md) · [公式情報と制約](references.md)
