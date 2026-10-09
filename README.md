# 学生ハッカソン：GitHub Copilotと作る

アイデアを、確かめられるアプリへ。

学生チームが目的と完成条件を決め、GitHub Copilotと一緒に実装・テスト・改善するための教材です。**CodespacesのCopilot ChatとGitHub Copilot appのどちらでも進められます。**

## 自分たちに合う始め方を選ぶ

| コース | ブランチ | 向いているチーム |
| --- | --- | --- |
| 構成から相談して作る | `main`（このページ） | 企画に合わせて、使う技術やアプリの構成をCopilotと決めたい |
| 初心者向けスターター | `codex/beginner-starter` | 起動・テストの準備が済んだReact + TypeScript + Vite + Node.jsから、すぐ機能を作りたい |

まず[コースの選び方とチーム用リポジトリの作成](docs/choose-start.md)へ進みます。チームで一つのコースを選び、そのコースのREADMEから始めてください。

**`main`にはアプリ本体、package.json、起動コマンド、アプリ用CIはまだありません。** 企画の記録欄、Copilotへの指示・Skills、Codespacesの開発環境を用意しています。最初の計画で技術を選び、最初の実装タスクとして必要なファイルと確認方法をCopilotに作ってもらいます。React + Viteは候補の一つで、HTML中心の小さな構成や、APIを含む構成も選べます。

## 環境を選ぶ

| 使う環境 | 最初に開くガイド | 準備 |
| --- | --- | --- |
| Codespaces + VS Code Copilot Chat | [Codespacesで進める](docs/codespaces.md) | GitHubとCopilotが使えるアカウント、ブラウザ |
| GitHub Copilot app | [Copilot appで進める](docs/copilot-app.md) | 同じアカウント、Git、Copilot app。PCで実行する場合は選んだ技術の実行環境 |

GitHub Copilot StudentとGitHub Proを利用する想定です。権利の有効化と利用残量は事前にアカウント画面で確認してください。Copilot appでPC上のファイルを編集し、Codespacesで動かす経路も用意しています。

CodespacesにはNode.js 24とDockerを使える環境を用意していますが、アプリの技術選定はまだ行っていません。別の実行環境が必要なら計画で決め、開発環境も合わせます。環境の準備完了だけでは、アプリは起動しません。

## 企画から発表まで

1. [アイデアをつくる](docs/common/ideation.md)：困りごとを調べ、解決したいことを選ぶ。
2. [企画書](docs/product.md)に、目的・最大3つのコア機能・完成条件・対象外を残す。
3. [元資料](docs/source/README.md)と画面案を渡し、CopilotのPlanで最小構成・実装順・確かめ方を相談する。
4. 合意した構成を[開発と確認の方法](docs/development.md)へ保存し、アプリと必要なテスト・CIを作る。
5. [実装と改善](docs/common/build-loop.md)を進め、[完成条件の確認](docs/common/verification.md)では別の学生にも使ってもらう。
6. 動くプレビューで発表する。継続して共有するURLが必要なら[Azure Container Appsへの公開](docs/common/publish.md)へ進む。

## チームで更新する記録

| ファイル | 残すこと |
| --- | --- |
| [docs/product.md](docs/product.md) | 誰の何を解決するか、できたと判断する条件、対象外 |
| [docs/development.md](docs/development.md) | 選んだ技術、編集・実行場所、起動・確認の手順、CI |
| [docs/tasks.md](docs/tasks.md) | 実装計画、今の作業、次に引き継ぐこと |
| [docs/verification.md](docs/verification.md) | 実際に確かめた結果、証拠、未確認のこと |

入力欄は空です。[締切管理の記入例](docs/examples/deadline.md)を参考に、自分たちの企画で埋めます。実行コマンドは技術を選んでから `docs/development.md` に記録します。このブランチを開いた直後に `npm ci` や `npm run dev` を実行する手順はありません。

## Copilotとの進め方

共通指示は [.github/copilot-instructions.md](.github/copilot-instructions.md)。教材に固有の2つの作業をSkillsにしています。

- [prepare-project](.github/skills/prepare-project/SKILL.md)：企画メモと画面案を開発用の資料に整理する。
- [verify-goal](.github/skills/verify-goal/SKILL.md)：完成条件と実際の結果を照合し、残る作業を見つける。

「prepare-projectを使って企画を整理して」のように依頼できます。認識されないときはSkillファイルを添付・参照します。[Copilotと開発する3つの工夫](docs/common/ai-development-tips.md)に、依頼の伝え方、情報の整理、実行・検証・改善の仕組みをまとめています。

## 運営・メンター向け

[事前準備とリハーサル](docs/facilitator.md)、[設計の根拠と公式資料](docs/references.md)、[教材の検証記録](docs/template-validation.md)を参照してください。コースごとに初期状態が異なるため、配布するブランチと参加者のアカウント条件で確認します。

Azureへ公開する場合は、[初期設定](docs/common/azure-setup.md)も参照してください。採用した構成に合わせて、公開方法と必要な設定を準備します。
