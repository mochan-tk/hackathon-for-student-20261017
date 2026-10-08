# 学生ハッカソン開発スターター

アイデアを、確かめられるアプリへ。

学生チームが目的と完成条件を決め、GitHub Copilotと一緒に実装・テスト・改善するための教材兼テンプレートです。**CodespacesのCopilot ChatとGitHub Copilot appのどちらでも、同じ企画・コード・完成条件で進められます。**

## はじめる

| 使う環境 | 最初に開くガイド | 準備 |
| --- | --- | --- |
| Codespaces + VS Code Copilot Chat | [Codespacesで進める](docs/codespaces.md) | GitHubとCopilotが使えるアカウント、ブラウザ |
| GitHub Copilot app | [Copilot appで進める](docs/copilot-app.md) | 同じアカウント、Git、Node.js 24 LTS、Copilot app |

チームごとに[このテンプレートからリポジトリを作成](https://github.com/mochan-tk/hackathon-for-student-20261017/generate)します。GitHub Copilot StudentとGitHub Proを利用する想定です。権利の有効化と利用残量は事前にアカウント画面で確認してください。

Azureへの自動公開まで行う場合は、[初期設定](docs/common/azure-setup.md)にあるリポジトリの所有者・公開範囲の条件も確認してください。Organization所有のPrivateリポジトリでは、学生個人のGitHub Proだけでは公開に使うEnvironmentを利用できません。

どちらかの環境ガイドを選び、そこから共通手順を参照して進めます。企画やリポジトリの準備を済ませている場合は、その成果を使って続けてください。Copilot appで編集し、Codespacesで実行する経路もAppのガイドに含めています。

## 企画から公開まで

1. [アイデアをつくる](docs/common/ideation.md)：困りごとを調べ、解決したいことを選ぶ。
2. [企画書](docs/product.md)に、目的・最大3つのコア機能・完成条件・対象外を残す。
3. 画面案を[元資料](docs/source/README.md)にまとめ、CopilotのPlanで実装と検証の計画を相談する。
4. [実装と改善の進め方](docs/common/build-loop.md)に沿って、実装・テスト・修正を進める。
5. [完成条件を確認](docs/common/verification.md)し、別の学生にも使ってもらう。
6. 動くプレビューで発表し、継続して共有する場合は[Azure Container Appsへの公開](docs/common/publish.md)へ進む。

## チームで更新する3つのファイル

| ファイル | 残すこと |
| --- | --- |
| [docs/product.md](docs/product.md) | 誰の何を解決するか、できたと判断する条件、対象外 |
| [docs/tasks.md](docs/tasks.md) | 実装計画、今の作業、残っていること |
| [docs/verification.md](docs/verification.md) | 実際に確かめた結果、証拠、未確認のこと |

入力欄はまだ空です。[締切管理の記入例](docs/examples/deadline.md)を参考に、自分たちの企画を記入してください。最初のアプリは起動と入力操作を確認するための小さな画面です。

## 共通のコマンド

Node.js 24 LTSを使います。nvmがある場合は `nvm install`、続いて `nvm use` で `.nvmrc` に合わせられます。

```sh
npm ci
npm run dev
```

**ViteとNode.jsのAPI**をまとめて起動します。PCでは `http://127.0.0.1:4280`、Codespacesではポート **4280** の転送先を開きます。普段の開発にDockerやAzureへのログインは不要です。起動・終了とAPIの追加は[共通の開発環境](docs/common/local-development.md)を参照してください。

Copilot appでPC上のコードを編集し、GitHubへpushして[Codespacesで動かす](docs/copilot-app.md)こともできます。PCとCodespacesのファイルは自動同期されません。

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

`check` はlint・型チェック・本番ビルド、`test:e2e` は本番用のNode.jsサーバーから画面とAPIを配信してブラウザで操作する確認です。Linuxのブラウザ依存ライブラリが足りない場合は `npx playwright install --with-deps chromium` を実行します。Codespacesでは初回準備に含まれています。

公開時は画面とAPIを1つのコンテナにまとめ、Azure Container Appsへ配置します。GitHub Actionsが本番用コンテナをビルド・起動してテストするため、学生のPCへのDocker導入は必須ではありません。[手元やCodespacesでコンテナを確認する手順](docs/common/local-development.md#コンテナで確認する任意)も用意しています。

`tests/starter.spec.ts` は最初の画面の確認用です。企画を実装するときに、自分たちの完成条件を確かめるテストへ更新します。`tests/runtime.spec.ts` のAPI・画面配信の基盤テストは残して、アプリの機能テストと一緒に実行します。

## Copilotとの進め方

共通指示は [.github/copilot-instructions.md](.github/copilot-instructions.md)。教材に固有の2つの作業をSkillsにしています。

- [prepare-project](.github/skills/prepare-project/SKILL.md)：企画メモと画面案を開発用の資料に整理する。
- [verify-goal](.github/skills/verify-goal/SKILL.md)：完成条件と実際の結果を照合し、残る作業を見つける。

「prepare-projectを使って企画を整理して」のように依頼できます。認識されないときはSkillファイルを添付・参照します。モード切り替えやファイルの渡し方は各環境のガイドにあります。

[Copilotと開発する3つの工夫](docs/common/ai-development-tips.md)では、依頼の伝え方（プロンプト）、必要な情報の整理（コンテキスト）、実行・検証・改善の仕組み（ハーネス）が、この教材のどこに入っているかを説明しています。短い依頼例と、失敗したときに何を直すかの例もあります。

## 運営・メンター向け

[事前準備とリハーサル](docs/facilitator.md)に、両環境で確認することをまとめています。[設計の根拠と公式資料](docs/references.md)も参照してください。

[スターターの検証記録](docs/template-validation.md)には、実施した確認と残る確認を記載しています。配布前に、参加者と同じ条件で企画整理から公開まで通してください。
