# 設計の根拠と確認範囲

公式情報の確認基準日：**2026年10月8日**。Container Apps・コンテナ開発、GitHubのOIDC接続、開発環境の操作手順は**10月9日**に再確認しました。mainをアプリなしのコースへ変更する際には、空のフォルダからの開発、GHCRでの公開・digest、Container Appsの配置方法も同日に確認しました。以下は教材を設計した根拠です。各社の記事をこの教材と同じ環境で再現したという意味ではありません。UI、提供条件、利用枠は変更されるため、開催前にリンク先と実際の学生アカウントで確認します。

## 教材に採用した考え方

各工夫と教材のファイルの対応は[Copilotと開発する3つの工夫](common/ai-development-tips.md)にまとめています。プロンプト・コンテキスト・ハーネスを、重なり合う設計の観点として説明しています。以下のプロンプト・コンテキストの資料、OpenAIとClaude Codeのbest practicesは10月9日に確認しました。

| 公式情報 | 教材への反映 |
| --- | --- |
| [GitHub：Prompt engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) | 目的・範囲・入力例・期待結果を具体的に伝える。長い固定文を毎回繰り返す代わりに、今回の作業を指定する |
| [OpenAI：Prompting](https://learn.chatgpt.com/docs/prompting#prompting-overview) | 一般向けのGoal・Context・Output・Boundariesを参照し、必要な項目だけ使う。教材では開発向けの4項目に、必要なら報告形式を添える |
| [Anthropic：Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | 明確な依頼、必要な背景・理由、具体例、出力形式・制約を依頼例へ反映。教材上でOpenAIの4項目に対応づけ、モデル固有の調整は必須にしない |
| [Anthropic：Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | プロンプト改善の前に成功条件と検証方法を定める。企画のDoDを具体化してから実装・確認し、結果を見て依頼を調整する |
| [Anthropic：Claude Code best practices](https://code.claude.com/docs/en/best-practices) | 具体的な参照先・制約と、テスト・ビルド・画面比較などの検証手段を渡す。Copilotでは既存のコマンド・Playwright・人の操作確認で実践する |
| [Anthropic：Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 必要な情報を選び、参照先と構造化した記録から必要時に読み取る。企画・開発方法・作業・検証の正本と引き継ぎに反映 |
| [VS Code：Context engineering guide](https://code.visualstudio.com/docs/agents/guides/context-engineering-guide) | 共通指示を短く保ち、詳しい文書を参照する。繰り返した失敗を見て必要な指示だけを足す |
| [OpenAI：Best practices](https://learn.chatgpt.com/guides/best-practices) | 開発の依頼をGoal・Context・Constraints・Done whenの4項目で考える。文脈・再利用する指示・実行と検証を組み合わせ、同じ失敗を適切な場所の改善へ戻す。教材ではCopilot用の指示・Skills・コマンドで実践する |
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

Spec Kitや各社SDK自体の導入は、この教材の必須条件ではありません。上記の考え方を、少数の資料、共有Skills、選んだ技術に合う実行・確認方法で実践します。mainはアプリの生成前に構成を合意するコース、codex/beginner-starterは構成を準備した初心者向けコースです。ハーネスの考え方は、全チームに同じフレームワークを強制するものではありません。

[VS CodeのQuickstart](https://code.visualstudio.com/docs/agents/quickstart)は空のフォルダからCopilotでアプリを作る流れを示しています。mainではこの考え方に沿い、企画に合う最小構成と必要な確認方法を最初に生成します。

## GitHub Copilotの共通機能

- [Agent Skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)：VS Code AgentとCopilot appの両方が対象。教材では`.github/skills/`を共有し、認識されない場合は`SKILL.md`を明示して読みます。
- [Copilotのプラン](https://docs.github.com/en/copilot/get-started/plans)：学生向け権利と利用条件の確認先。GitHub ProとCopilotの権利を混同せず、当日のアカウント表示も確認します。
- [Auto model selection](https://docs.github.com/en/copilot/concepts/models/auto-model-selection)：モデルはAutoを基本にします。特定モデル名を指定する教材にはしません。
- [Copilot appのsession](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)：Planで方針を確認し、Interactiveで実装と修正を進めます。

教材の「ゴールまで繰り返す」は、完成条件をファイルに保存して実装・確認・修正を続ける進め方です。特定製品の`/goal`、永続的な自動再開、Copilot appのAutopilotを同一の機能として扱いません。

## 2つの開発経路

| 経路 | 根拠・制約 |
| --- | --- |
| Codespacesのブラウザ版VS Code | [Codespacesの説明](https://code.visualstudio.com/docs/remote/codespaces)。実行環境はCodespace内。Node等はdev containerでそろえる |
| VS Code DesktopからCodespacesへ接続 | 任意。[Integrated browser](https://code.visualstudio.com/docs/debugtest/integrated-browser)のremote proxyは基準日時点でPreview。標準手順は通常のポート転送を使う |
| Copilot appのローカル実行 | [Quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)。Gitと、選んだアプリ構成に必要な実行環境をPCに準備する |
| AppのSetup・Run | [.github/github-app.ymlの仕様](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)。リポジトリ設定は確認・受け入れ後に適用される。mainには配布時点で置かず、構成決定後に必要なSetup・Runを登録する |
| Appの画面確認 | [Terminal・Browser・Changesの公式解説](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-using-the-diff-terminal-and-browser/)。Runで起動し、Browserで確認する |

VS Codeの[内蔵Browser Tools](https://code.visualstudio.com/docs/agents/run/browser-tools)は[2026年7月1日にGA](https://code.visualstudio.com/updates/v1_127)となりました。ただし、ブラウザ版CodespacesでDesktopと同じ機能が使えることはこの教材の前提にしません。共通の方針は、構成に合う自動テストと人によるブラウザ操作です。Playwright Chromiumはブラウザテストの選択肢で、初心者向けブランチでは設定済みです。

Copilot appから既存のCodespaceへの直接接続は未検証です。AppのCloud sandboxは[Public Preview](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions#using-cloud-and-local-sandboxes)で、標準経路から外しています。

## Figma・動作確認・公開

- Figmaは画面PNGと操作・遷移のメモで引き継げます。[Remote MCP](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)の接続は任意です。利用条件は[Figmaのプラン・seat・読み取り上限](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)に依存します。Copilot Studentの権利からFigma Educationの有効化を推定しません。
- 普段の開発は、選んだ構成の起動方法をdevelopment.mdへ記録し、PCのローカルURLまたはCodespacesの対応ポートから開きます。mainでViteや4280を必須にはしません。Codespacesは[ポート転送](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)を使います。プレビューURLと継続して共有する公開URLを区別します。
- 公開先は[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/containers)です。画面と、必要ならAPIを本番用のHTTPサーバーで提供し、必要な環境変数で外部サービスへ接続します。Dockerfileとアプリを他のコンテナ実行環境へ移しやすくしますが、DB・認証・Azureの公開設定の移行作業は残ります。Container Apps向けのイメージは `linux/amd64` で作成します。
- 公開を選んだら[Dockerfile](https://docs.docker.com/build/concepts/dockerfile/)とCIのコンテナ確認を追加し、本番用イメージを起動・テストしてから公開します。PCへのDocker導入は任意です。Codespacesには[Docker用Dev Container Feature](https://github.com/devcontainers/features/tree/main/src/docker-in-docker)を含め、手動のコンテナ確認にも使えます。
- mainの任意の公開手順では、追加したCIで[GHCR](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)へテスト済みイメージを保存し、Azure Cloud Shellからdigestを指定して配置します。Azure更新も自動化する場合は[OIDC](https://docs.github.com/en/actions/concepts/security/openid-connect)を使えます。2026年7月15日以降の新規リポジトリでは既定subjectに所有者・リポジトリのIDも含まれるため、実際の値を確認します。[Azure側の移行資料](https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-github-immutable-subjects)。配布時点のmainに公開CI・OIDC設定はありません。
- [Dynamic workflows](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows)と[GitHub Agentic Workflows](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/)は、基準日時点ではPublic Preview。並列エージェント、定期自動化、全自律実行は教材の必須条件にしません。
- PC・Codespacesでのアプリ単体の確認にAzureリソースやクレジットは不要です。Azureへの公開や外部サービスの利用には、対象サブスクリプションの権利・利用枠を確認します。共有データやAIが企画の必須機能なら、当初から実装・検証対象に含めます。

## 検証の区別

mainの文書・設定の確認、生成したアプリのbuildやテスト、初心者向けスターターの過去の確認、運営のアカウントでの操作、学生の実アカウントでの操作は、別の確認です。mainには配布時点でアプリもCIもないため、過去のスターターの成功をmainのアプリ検証の成功とは扱いません。公式Docsに対応と書かれていても、学生の権利・残量・PC・ネットワークを含む当日の成功を保証するものではありません。

学生アカウントでの両経路の起動、Skillsの呼び出し、Copilotの往復、Appで編集してCodespacesで実行する経路、Azureへの公開は、運営のリハーサルで確認し、実施日と結果を残してください。実施するまでは未確認です。[運営向けチェック](facilitator.md)を使います。

[READMEへ戻る](../README.md)
