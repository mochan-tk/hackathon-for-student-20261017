# はじめ方を選ぶ

チームで出発点を一つ選びます。企画・完成条件・小さな実装・テスト・人の確認という流れは共通です。使う環境（Codespaces / Copilot app）は、コースを選んだ後に決められます。

| コース | 配布元のブランチ | 入っているもの | 向いているチーム |
| --- | --- | --- | --- |
| 自分たちで構成を決める | `main` | 企画・検証の記録用ファイル、Copilotの指示・Skills、Codespacesの基礎環境。アプリのコードやフレームワークの設定は置かない | 作りたいものに合わせて、Copilotと技術や実行方法から決めたい |
| 初心者向けスターター | `codex/beginner-starter` | React + TypeScript + Vite、Node.js API、起動設定、テスト、Docker・CI・任意のAzure公開手順 | 環境や構成を選ぶ時間を減らし、企画の実装に集中したい |

**初心者向けでも、作る機能や画面は自由です。** 技術構成と起動・検証の方法が用意されています。短い開発時間で迷ったら、このコースから始められます。

## チームのリポジトリを作る

GitHubの **Use this template** を使って、教材をチーム用リポジトリへコピーします。これはファイルの配布方法です。`main`を選ぶ場合も、アプリのひな形を使う必要はありません。

1. [配布元のGitHubページ](https://github.com/mochan-tk/hackathon-for-student-20261017)で **Use this template → Create a new repository** を選びます。
2. 所有者・チーム用の名前・公開範囲を決めます。
3. **自分たちで構成を決める場合は、Include all branchesを外したまま**作成します。配布元のデフォルトブランチ`main`だけがコピーされます。
4. **初心者向けの場合は、Include all branchesにチェックを入れて**作成します。作成が終わったら、チーム側の **Settings → General → Default branch** の変更ボタンから`codex/beginner-starter`を選び、**Update** を押して確認画面を確定します。管理権限が必要なので、チームの代表者が行います。
5. チームリポジトリの **Code** に戻り、ブランチ名とREADMEを確かめます。自分たちで構成を決める場合は`main`、初心者向けの場合は`codex/beginner-starter`がデフォルトです。初心者向けなら`package.json`・`src/`・`Dockerfile`も表示されます。
6. 必要なメンバーを **Settings → Collaborators** から招待し、**チーム側で選んだブランチのREADME**からCodespacesまたはCopilot appのガイドへ進みます。すでにチームリポジトリがある場合は作り直さず、選択したコースとデフォルトブランチが一致しているか確認します。

配布元でブランチを表示しているだけでは、その枝だけがコピーされるわけではありません。GitHubの選択肢は「デフォルトブランチだけ」または「全ブランチ」です。全ブランチには教材の作業用ブランチが含まれる場合もありますが、参加者が選ぶコースは上の2つです。[テンプレートからの作成](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)・[デフォルトブランチの変更](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)

## 実装を始めるとき

- **選んだコースのブランチから**、`feat/first-demo`などの作業ブランチを作ります。複数人で編集する場合はそれぞれ別の作業ブランチを使います。
- PRの **base** はチームのデフォルトブランチです。初心者向けでは`codex/beginner-starter`、自分たちで構成を決める場合は`main`へ戻します。
- **コピーされたコース同士をPR・マージで統合しません。** 全ブランチをコピーすると、それぞれの履歴が独立するためです。途中でコースを変えたい場合は、未保存の作業を記録してから運営に相談します。

以後、各ガイドの「チームのデフォルトブランチ」は、この手順で選んだ統合先を指します。初心者向けの公開用ワークフローも、チームのデフォルトブランチだけを公開対象にします。ブランチ名は上の名前のまま使います。

[READMEへ戻る](../README.md)
