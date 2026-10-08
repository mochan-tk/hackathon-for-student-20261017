# スターターの検証記録

検証日：2026年10月8日。これは教材を作成した環境での検証です。チームが作るアプリの完成記録は [verification.md](verification.md) に残します。

## 実行して確認したこと

環境：macOS arm64、Node.js 24.21.0、lockfileに記録した依存関係。

| 対象 | 方法 | 結果 |
| --- | --- | --- |
| 依存関係 | `npm ci` | 成功 |
| lint・型・本番ビルド | `npm run check` | 成功 |
| 起動と入力操作 | `npm run test:e2e` | ChromiumのPC幅・スマホ幅（390px）の2件成功。入力→表示、実行時エラー、横方向のはみ出しを確認 |
| 初期画面 | PC・スマホ幅のスクリーンショットを確認 | 表示の欠け・重なりなし |
| Pages用パス | `VITE_BASE_PATH=/student-hackathon/ npm run build` の成果物を確認 | assetの参照先に指定したパスが付く |
| Codespacesのホスト許可 | 環境変数とHTTP Hostをローカルで再現 | 対象の転送ホスト名で200、関係のないホスト名で403 |
| GitHub Actions設定 | `actionlint` | エラーなし |
| 文書・設定 | Markdown内のローカルリンク、YAML、devcontainer JSON | リンク切れ・構文エラーなし |
| Skills | frontmatter検証と、締切例から企画・作業案を作る独立した参考評価 | 書式正常。例の3機能・対象外を維持し、架空調査をチームの事実として扱わなかった |

Skillsの参考評価はCodex上で行いました。Copilot Studentでの動作検証を代替するものではありません。

## 配布前に残っている確認

- 新規Codespaceでdevcontainerを構築し、ポート転送から操作する。
- Copilot appでclone、設定受け入れ、Setup、Run、Browser、Changesを通す。
- Studentアカウントで、企画整理→Plan→実装→完成条件との照合を両経路で通す。
- GitHub上でCheckを実行し、テンプレートから作成したリポジトリでPagesを公開する。
- Windows・LinuxでCopilot appの標準手順を通す。

これらは未実施です。ローカルでのホスト名再現や設定の構文検証を、実サービスでの成功として扱いません。[運営向け手順](facilitator.md)に沿って実施し、環境・日付・結果を追記してください。
