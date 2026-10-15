# 3つの工夫と公式資料

**根拠を詳しく知りたいときだけ読むページです。** 当日の作業は[README](../README.md)と、選んだ環境のガイドを進めれば十分です。

プロンプト・コンテキスト・ハーネスは、依頼、判断材料、実行と確認を整える観点です。互いに重なり、どれか一つへ置き換えるものではありません。以下は旧教材で参照した公式資料と、今回の手順への対応です。

## 1. プロンプト：目的・文脈・制約・完成条件を伝える

誰の何を解決するか、どの資料を読むか、今回の範囲、何を確かめれば完成かを具体化します。例えば「期限順にする」なら、異なる期限を順不同で登録し、期待する順番になることまで示します。

Planではチームが確認できる草案を作り、合意してから保存・実装へ進みます。小さな修正では今回変えることを短く伝え、毎回長い依頼を貼り直す必要はありません。

- [OpenAI：開発のbest practices](https://learn.chatgpt.com/guides/best-practices#strong-first-use-context-and-prompts)のGoal・Context・Constraints・Done whenを、教材の4項目に対応させています。
- [OpenAI：一般向けPrompting](https://learn.chatgpt.com/docs/prompting#prompting-overview)のOutputも参考に、必要なら報告形式を添えます。必須の5要素という扱いではありません。
- [GitHub：Prompt engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)を参考に、目的・具体的な要件・入力と期待結果を伝えます。
- [Anthropic：Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)と[overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)を参考に、背景と成功条件を明確にします。Anthropicが同名の4項目を定めているという意味ではありません。

## 2. コンテキスト：元資料・合意・実績を分ける

[docs/](../docs/README.md)には、企画で作ったPDF・画像・Markdownなどをそのまま置けます。画面画像やFigmaは必須ではありません。Copilotが実際に読めた範囲を確認し、読めない箇所を推測で埋めず、必要な部分を補います。

合意後に生成するルートの`PLAN.md`へ目的・DoD・対象外・作業順・構成・実行場所・コマンドを、`PROGRESS.md`へ進捗・実際の検証結果・未確認・次の作業を残します。元資料の記述と、チームが追加で決めたことも区別します。

実装には対象のDoDと関連コード、不具合修正には入力・期待結果・実際の結果、再開には現在の計画と進捗を渡します。仕様を変えたら記録も更新し、以前の成功結果が今も使えるかを見直します。

- [Anthropic：Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)を参考に、必要な情報を選び、参照先と記録から引き継ぎます。
- [VS Code：Context engineering guide](https://code.visualstudio.com/docs/agents/guides/context-engineering-guide)を参考に、共通指示を短く保ち、詳細は必要なときに読みます。
- [GitHub：Agent Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)を参考に、企画整理と完成確認の手順を`.github/skills/`へ置いています。認識されない場合は対象の`SKILL.md`を明示して読みます。

## 3. ハーネス：動かし、確かめ、直せるようにする

完成条件に対応する実装・起動・テスト・CIと、人による操作確認をそろえます。mainは最初の実装で必要な仕組みを作り、初心者向けは準備済みの仕組みに企画の確認を追加します。

不具合は再現する入力と期待結果を基に直し、同じ条件で再確認します。期待が明確な処理では未実装時の失敗も確かめます。失敗するテストを消したり、期待結果を緩めたりして合格にしません。

実際に使えるコマンドは`PLAN.md`、実行場所・結果・証拠は`PROGRESS.md`へ記録します。未作成・未実行・skipは成功と区別し、別の学生も主要な操作を確認します。同じ失敗が続けば、依頼・資料・テスト・環境のどこを直すべきか見直します。

- [OpenAI：Harness engineering](https://openai.com/index/harness-engineering/)を参考に、エージェントが読める資料、実行環境、結果からのフィードバックを整えます。
- [Anthropic：長時間動くエージェントの実行環境](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)を参考に、進捗と実動作の確認結果を次のセッションへ残します。
- [Claude Code：best practices](https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work)と[VS Code：AI開発のbest practices](https://code.visualstudio.com/docs/agents/best-practices)を参考に、確認手段を渡し、小さい実装・検証・差分確認を繰り返します。
- [OpenAI：Goals](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)と[Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/)は継続作業を考える参考です。今回採用するのは目標・証拠・引き継ぎの考え方で、Copilotで同じ自動継続機能を実装したという意味ではありません。

## 環境と配布の確認先

- 実際の操作：[READMEのCodespaces手順](../README.md#environment)／[Copilot app](copilot-app.md)。Copilotの[プラン](https://docs.github.com/en/copilot/get-started/plans)・[Auto](https://docs.github.com/en/copilot/concepts/models/auto-model-selection)は学生自身のアカウントでも確認します。
- Fork：[作成](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo)・[公開範囲](https://docs.github.com/en/pull-requests/reference/forks#visibility-of-forks)・[Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflows-in-forked-repositories)。チーム内PRの送り先と実際のCI結果を確認します。
- App：[session](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)・[Setup／Runの設定](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)。Codespaces：[ポート転送](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)。
- 任意の公開：[Azure手順](azure.md)と[Container Appsのコンテナ仕様](https://learn.microsoft.com/en-us/azure/container-apps/containers)。開発中の確認と公開先の確認を分けます。

## 運営向け：確認範囲と配布前チェック

**今回の「docsへ直接配置→Planで合意→PLAN.md・PROGRESS.mdを生成」の新しい一連の流れは、実機で未検証です。** 旧教材の実機記録はGit履歴の実施時点の結果であり、新しい手順の成功実績には流用しません。公式資料の説明と当日のアカウント・PCでの成功も別の確認です。

- PDF・画像・Markdownそれぞれで読めた内容を確かめ、画像のない企画からもPlan・記録の生成・実装へ進めることを試します。
- 両コースのFork・既定ブランチ・メンバー権限・チーム内PR・Actionsを確認します。mainはCI生成前と生成後を分けます。
- Codespaces、AppでPC実行、AppからCodespacesへの変更受け渡しを試し、実際の起動・DoD・保存・再開・停止まで確認します。公開を使う場合はその経路も別に確認します。
- 学生アカウントでCopilot Studentの権利・利用枠と必要な操作を確認し、実施日・対象コミット・環境・成功・失敗・未確認を運営の記録に残します。

[READMEへ戻る](../README.md)
