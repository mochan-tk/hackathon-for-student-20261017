# スターターの検証記録

検証日：2026年10月9日。これは教材を作成した環境での検証です。チームが作るアプリの完成記録は [verification.md](verification.md) に残します。

## 実行して確認したこと

環境：macOS arm64、Node.js 24.21.0、Express 5.2.1、lockfileに記録した依存関係。

| 対象 | 方法 | 結果 |
| --- | --- | --- |
| 依存関係 | `npm ci`による再インストール | 成功。lockfileと一致する依存関係で確認 |
| lint・型・本番ビルド | `npm run check` | 成功 |
| 本番サーバー | `npm run test:e2e` | Node.jsの4281経由でChromiumのPC幅・スマホ幅（390px）の計6件成功。入力→表示、実行時エラー、横方向のはみ出し、SPA直リンクへのHTML配信、APIの正常応答と404、存在しないアセット・公開対象外ファイルの404を確認 |
| テストの待受設定 | `PORT=64999 HOST=invalid.test`を親環境に指定してE2E | 6件成功。テスト用サーバーは4281・127.0.0.1を使い、外部のPORT・HOST設定に引きずられない |
| 開発サーバー | `npm run dev`→4280からブラウザ操作 | 同一ポートのWebSocket接続とCSSのホットリロード成功。API保存後の自動再起動・health応答も確認 |
| Codespacesのホスト許可 | 環境変数とHTTP Hostをローカルで再現 | 対象の4280転送ホスト名で画面・APIとも200、関係のないホスト名で403。ブラウザへ渡すWebSocket設定は転送ホスト・wss・443 |
| APIの不正入力 | 開発・本番サーバーへ不正JSON、100KB超のJSONを送信 | 400・413を確認 |
| GitHub Actions設定 | `actionlint` | エラーなし |
| OIDC初期設定の表示処理 | ワークフロー内のJavaScriptを旧Subject・ID付きSubject・HTTPエラーでオフライン実行 | 想定どおり。Issuer・Subject・Audienceだけを表示し、JWTや要求トークン・他のclaimを出力しない |
| 文書・設定 | Markdownの相対リンク・見出し、npmスクリプト参照、devcontainer JSON、Skillsのfrontmatter | 問題なし。外部リンクも公式ページまたはログイン画面への到達を確認 |
| 依存関係の監査 | `npm audit` | 開発依存を含め指摘0件 |

本番用DockerfileはNode.js 24、production依存、非root起動で、8080に画面とAPIを配信します。作成環境には稼働中のDockerデーモンがないため、ローカルでのDockerビルド・実行は未実施です。Linux/amd64の本番コンテナは、次のGitHub Actionsで実行して確認しました。

## GitHub・Copilot appでの確認

配布用リポジトリはTemplate repositoryとして用意済みです。全体監査の修正を含むコミット`300b5e0`の[Check実行結果](https://github.com/mochan-tk/hackathon-for-student-20261017/actions/runs/37846901550)は成功しました。GitHubのLinux runnerで依存関係のインストール、lint・型・本番ビルド、Dockerイメージのビルド・起動、APIの起動確認、本番コンテナに対するPC幅・スマホ幅のE2Eを確認しています。

GHCRへのイメージ公開・Azureへのデプロイは初期設定を有効にした`main`だけで動き、PRでは実行しません。上の実行でも`oidc-setup`、`publish`、`deploy`はスキップされています。

Copilot appのGUI手順は、[v1.1.26のbranch actions追加](https://github.com/github/app/releases/tag/v1.1.26)と[v1.1.27のPull・Pushの表示条件](https://github.com/github/app/releases/tag/v1.1.27)を公式リリースノートで確認しました。10月8日のmacOS実機ではChanges、コミット表示、ブランチ操作メニュー、Current checkoutを確認しました。GUIでcommit・pushしてCodespacesへ渡す一連の操作は未実施です。

10月8日にSkillsのfrontmatterと、締切例から企画・作業案を作る独立した参考評価も確認しました。Codex上での評価であり、Copilot Studentでの動作検証を代替するものではありません。

## 全体手順の監査で修正したこと

10月9日に、READMEから企画、Plan、実装、PC・Codespacesでの確認、PR、Azure公開、終了までを読み直し、設定・コードと照合しました。学生の導線、実行環境、公開設定を分担して確認し、修正後は別の担当でも導線を読み直しています。

| 見つかった問題 | 修正 |
| --- | --- |
| 新規リポジトリのOIDC SubjectにIDが含まれ、名前だけのAzure設定では一致しない | Checkに接続情報だけを表示する手動モードを追加し、実際の値をAzureのOther issuerへコピーする手順へ変更 |
| 共通の依頼文から進むとApp編集・Codespaces実行の分担が曖昧になる | 実行場所と専用の依頼文を明示し、学生のGUI commit・pushと確認結果を待つ流れを維持 |
| AppからCodespacesのガイドへ移ると企画・ブランチを二重に準備し得る | 戻り先と準備済みの作業を明記。Codespacesの保存も現在のブランチをGUIで送る手順へ統一 |
| PORT・HOST設定によってE2Eの接続先がずれる | Playwrightの起動環境で4281・127.0.0.1を指定 |
| 企画のテストへ置き換える際にAPI・配信の確認まで消し得る | `tests/runtime.spec.ts`へ基盤テストを分離し、画面用の`starter.spec.ts`を更新する説明に統一 |
| `.env`の引き継ぎ、ブラウザ導入、4281転送、本番起動前のbuildが不明瞭 | 実行場所ごとの準備と操作を補足。Dockerでの確認と普段のRunも区別 |
| Azure初回設定に所有者のプラン・プロバイダー登録・入力欄の説明が不足 | Private OrganizationのTeam以上の要件、Microsoft.App登録、RegistryとImageの入力を明記 |

実行できた確認は上の表に記録しています。OIDC表示処理のオフライン確認は、GitHubからの実トークン発行やAzureへのログインの成功を意味しません。

## 3つの開発の工夫と失敗時の証拠

10月9日に[プロンプト・コンテキスト・ハーネスの解説](common/ai-development-tips.md)を追加しました。README・実装ループ・運営の振り返りから参照できます。既存の仕組みとの対応、短い依頼例、失敗の原因に応じた改善先、指示で決める運用と自動実行される処理の違いを記載しています。

CIのブラウザテストが失敗した場合、`test-results/`を`playwright-failure-evidence`として3日保存する設定を追加しました。独立した一時テストで失敗を起こし、既存のPlaywright設定からスクリーンショットと`trace.zip`が生成されることを確認しました。ワークフローの構文検証も成功しています。実際のGitHub Actionsで失敗時Artifactを取得する一連の操作は未実施です。

## 配布前に残っている確認

- 新規Codespaceでdevcontainerを構築し、4280の転送から操作・ホットリロード、任意のDockerプレビューを確認する。
- Copilot appでclone、設定受け入れ、Setup、Run、Browser、Changesを通す。
- Studentアカウントで、企画整理→Plan→実装→完成条件との照合を両経路で通す。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして4280から操作する。
- GHCRへの公開、Public設定、実際の`production` EnvironmentでのOIDC情報表示、Azure初期設定・接続、テスト済みイメージのデプロイを通す。
- 公開URLでの画面、必要なAPI・DB接続、本物の認証を確認する。
- Windows・LinuxのPCでCopilot appの標準手順を通す。

これらは未実施です。ローカルでのホスト名再現や設定の構文検証を、実サービスでの成功として扱いません。[運営向け手順](facilitator.md)に沿って実施し、環境・日付・結果を追記してください。配布前には教材の変更を配布元の`main`へマージし、テンプレートから作った新しいリポジトリに入っていることも確認します。
