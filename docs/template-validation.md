# スターターの検証記録

検証日：2026年10月9日。これは教材を作成した環境での検証です。チームが作るアプリの完成記録は [verification.md](verification.md) に残します。

## 実行して確認したこと

環境：macOS arm64、Node.js 24.21.0、Express 5.2.1、lockfileに記録した依存関係。

| 対象 | 方法 | 結果 |
| --- | --- | --- |
| 依存関係 | npmによるlockfile更新・インストール | 成功。SWA CLIの依存を削除 |
| lint・型・本番ビルド | `npm run check` | 成功 |
| 本番サーバー | `npm run test:e2e` | Node.jsの4281経由でChromiumのPC幅・スマホ幅（390px）の計6件成功。入力→表示、実行時エラー、横方向のはみ出し、SPA直リンク・再読み込み、APIの正常応答と404、存在しないアセット・公開対象外ファイルの404を確認 |
| 開発サーバー | `npm run dev`→4280からブラウザ操作 | 同一ポートのWebSocket接続とCSSのホットリロード成功。API保存後の自動再起動・health応答も確認 |
| Codespacesのホスト許可 | 環境変数とHTTP Hostをローカルで再現 | 対象の4280転送ホスト名で画面・APIとも200、関係のないホスト名で403。ブラウザへ渡すWebSocket設定は転送ホスト・wss・443 |
| GitHub Actions設定 | `actionlint` | エラーなし |
| 文書・設定 | Markdownの相対リンクとdevcontainer JSON | リンク先ファイルとJSON構文に問題なし |
| 依存関係の監査 | `npm audit` | 開発依存を含め指摘0件 |

本番用DockerfileはNode.js 24、production依存、非root起動で、8080に画面とAPIを配信します。作成環境には稼働中のDockerデーモンがないため、ローカルでのDockerビルド・実行は未実施です。GitHub ActionsにはLinux/amd64の本番コンテナを起動して同じE2Eを実行する処理を追加しています。

## GitHub・Copilot appでの確認

配布用リポジトリはTemplate repositoryとして用意済みです。Container Apps版のCI実行結果は、PRで確認します。GHCRへのイメージ公開・Azureへのデプロイは初期設定を有効にした`main`だけで動き、PRでは実行しません。

Copilot appのGUI手順は、[v1.1.26のbranch actions追加](https://github.com/github/app/releases/tag/v1.1.26)と[v1.1.27のPull・Pushの表示条件](https://github.com/github/app/releases/tag/v1.1.27)を公式リリースノートで確認しました。10月8日のmacOS実機ではChanges、コミット表示、ブランチ操作メニュー、Current checkoutを確認しました。GUIでcommit・pushしてCodespacesへ渡す一連の操作は未実施です。

10月8日にSkillsのfrontmatterと、締切例から企画・作業案を作る独立した参考評価も確認しました。Codex上での評価であり、Copilot Studentでの動作検証を代替するものではありません。

## 配布前に残っている確認

- 新規Codespaceでdevcontainerを構築し、4280の転送から操作・ホットリロード、任意のDockerプレビューを確認する。
- Copilot appでclone、設定受け入れ、Setup、Run、Browser、Changesを通す。
- Studentアカウントで、企画整理→Plan→実装→完成条件との照合を両経路で通す。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして4280から操作する。
- GHCRへの公開、Public設定、Azure初期設定、OIDC接続、テスト済みイメージのデプロイを通す。
- 公開URLでの画面、必要なAPI・DB接続、本物の認証を確認する。
- Windows・LinuxのPCでCopilot appの標準手順を通す。

これらは未実施です。ローカルでのホスト名再現や設定の構文検証を、実サービスでの成功として扱いません。[運営向け手順](facilitator.md)に沿って実施し、環境・日付・結果を追記してください。
