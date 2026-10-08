# 設計の根拠と確認範囲

公式情報の確認基準日：**2026年10月8日**。以下は教材を設計した根拠です。各社の記事をこの教材と同じ環境で再現したという意味ではありません。UI、提供条件、利用枠は変更されるため、開催前にリンク先と実際の学生アカウントで確認します。

## 教材に採用した考え方

| 公式情報 | 教材への反映 |
| --- | --- |
| [GitHub：タスクを任せる際のbest practices](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) | 課題、範囲、受け入れ条件を明確にし、実行・テスト方法をリポジトリに置く |
| [VS Code：AIを使う際のbest practices](https://code.visualstudio.com/docs/agents/best-practices) | 小さいタスク、計画、実装、検証、差分レビューの繰り返し |
| [GitHub Spec Kit：SDDの進め方](https://github.github.com/spec-kit/quickstart.html) | 仕様→計画→タスク→実装→仕様との照合。未達を次のタスクへ戻す |
| [Spec Kit自身のAgentic SDLC](https://github.github.com/spec-kit/guides/agentic-sdlc.html) | AIによる判断と、通常のテスト・CI・人の確認を組み合わせる。小さい変更に過大な手順を課さない |
| [Specの更新方式](https://github.github.com/spec-kit/concepts/spec-persistence.html) | 利用者テストや実装で分かったことをproductへ戻し、資料と実装の食い違いを残さない |
| [VS Code：TDDのガイド](https://code.visualstudio.com/docs/agents/guides/test-driven-development-guide) | 並び替えなど期待値が明確な機能はテストを先に用意する。すべての見た目の変更にTDDを強制しない |
| [OpenAI：Harness engineering](https://openai.com/index/harness-engineering/) | エージェントが読める資料、実行環境、フィードバックを整える。実行可能な確認を用意する |
| [OpenAI：Using Goals in Codex](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) | 目的、検証の証拠、制約、任せる範囲、継続と停止の条件をそろえる。Codex固有の自動継続機構をCopilotへ移植したとは扱わない |
| [OpenAI：Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/) | 作業状況からエージェントが実装と検証を進め、人が成果を確認する。今回はタスクと検証の循環を採用し、常時稼働する管理基盤の導入は求めない |
| [OpenAI：Skillsとプロンプトの見直し（2026年9月11日）](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | 必要な文脈だけ読み、長い固定手順を増やしすぎない。記事はAstra向けなので、Copilot Autoでの有効性は別に検証する |
| [Anthropic：長時間アプリ開発のHarness設計（2026年3月24日）](https://www.anthropic.com/engineering/harness-design-long-running-apps) | 成功条件と実動作を照合する。モデルが自力で扱えるようになった細かい区切りは減らす |
| [Anthropic：長時間動くエージェントの実行環境](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | 進捗と確認結果を保存して引き継ぐ。作業の区切り方は複雑さと実際の失敗を見て調整する |

Spec Kitや各社SDK自体の導入は、この教材の必須条件ではありません。上記の考え方を、少数の資料、共有Skills、npmコマンドで実践します。

## GitHub Copilotの共通機能

- [Agent Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)：VS Code AgentとCopilot appの両方が対象。教材では`.github/skills/`を共有し、認識されない場合は`SKILL.md`を明示して読みます。
- [Copilotのプラン](https://docs.github.com/en/copilot/get-started/plans)：学生向け権利と利用条件の確認先。GitHub ProとCopilotの権利を混同せず、当日のアカウント表示も確認します。
- [Auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)：モデルはAutoを基本にします。特定モデル名を指定する教材にはしません。
- [Copilot appのsession](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)：Planで方針を確認し、Interactiveで実装と修正を進めます。

教材の「ゴールまで繰り返す」は、完成条件をファイルに保存して実装・確認・修正を続ける進め方です。特定製品の`/goal`、永続的な自動再開、Copilot appのAutopilotを同一の機能として扱いません。

## 2つの開発経路

| 経路 | 根拠・制約 |
| --- | --- |
| Codespacesのブラウザ版VS Code | [Codespacesの説明](https://code.visualstudio.com/docs/remote/codespaces)。実行環境はCodespace内。Node等はdev containerでそろえる |
| VS Code DesktopからCodespacesへ接続 | 任意。[Integrated browser](https://code.visualstudio.com/docs/debugtest/integrated-browser)のremote proxyは基準日時点でPreview。標準手順は通常のポート転送を使う |
| Copilot appのローカル実行 | [Quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)。Gitと、作るアプリ用のNode.jsをPCに準備する |
| AppのSetup・Run | [.github/github-app.ymlの仕様](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)。リポジトリ設定は確認・受け入れ後に適用される |
| Appの画面確認 | [Terminal・Browser・Changesの公式解説](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-using-the-diff-terminal-and-browser/)。Runで起動し、Browserで確認する |

VS Codeの[内蔵Browser Tools](https://code.visualstudio.com/docs/agents/run/browser-tools)は[2026年7月1日にGA](https://code.visualstudio.com/updates/v1_127)となりました。ただし、ブラウザ版CodespacesでDesktopと同じ機能が使えることはこの教材の前提にしません。共通の検証方法はPlaywright Chromiumと人によるブラウザ操作です。

Copilot appから既存のCodespaceへの直接接続は未検証です。AppのCloud sandboxは[Public Preview](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions#using-cloud-and-local-sandboxes)で、標準経路から外しています。

## Figma・公開・発展機能

- Figmaは画面PNGと操作・遷移のメモで引き継げます。[Remote MCP](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)の接続は任意です。利用条件は[Figmaのプラン・seat・読み取り上限](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)に依存します。Copilot Studentの権利からFigma Educationの有効化を推定しません。
- 公開は[GitHub PagesのActionsによるデプロイ](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)を使います。教材の公開ワークフローは手動実行です。CodespacesのプレビューURLと公開URLは役割が異なります。
- [Dynamic workflows](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows)と[GitHub Agentic Workflows](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/)は、基準日時点ではPublic Preview。並列エージェント、定期自動化、全自律実行は教材の必須条件にしません。
- Azureの利用は発展課題です。標準の企画・実装・確認・GitHub Pages公開にAzureクレジットは必要ありません。

## 検証の区別

教材コードのローカルbuildやテスト、運営のアカウントでの操作、学生の実アカウントでの操作は、別の確認です。公式Docsに対応と書かれていても、学生の権利・残量・PC・ネットワークを含む当日の成功を保証するものではありません。

学生アカウントでの両経路の起動、Skillsの呼び出し、Copilotの往復、GitHub Pages公開は、運営のリハーサルで確認し、実施日と結果を残してください。実施するまでは未確認です。[運営向けチェック](facilitator.md)を使います。

[READMEへ戻る](../README.md)
