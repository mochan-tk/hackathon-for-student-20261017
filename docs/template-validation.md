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

配布用リポジトリはTemplate repositoryとして用意済みです。再監査時に、コミット`774cafc`の[Check実行結果](https://github.com/mochan-tk/hackathon-for-student-20261017/actions/runs/37880463818)の成功を確認しました。GitHubのLinux runnerで依存関係のインストール、lint・型・本番ビルド、Dockerイメージのビルド・起動、APIの起動確認、本番コンテナに対するPC幅・スマホ幅のE2Eを確認しています。

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

## 追加変更後の再監査

10月9日に、3つの開発の工夫を反映した後の教材を、準備・企画・両方の開発経路・検証・任意の公開・終了まで再度照合しました。文書の相互参照だけでなく、共通指示・Skills、起動設定、Dockerfile、テスト、CIとの対応も確認しています。

| 見つかった問題 | 修正 |
| --- | --- |
| 環境準備前の企画ガイドで、未作成のリポジトリへの保存を求める | 最初は企画手順1〜5までとし、文書整理は環境準備後の手順4で計画と一緒に行う |
| 直前に成功したテストや、保存・push・PRの準備を次の節で重複実行し得る | 同じ変更・同じ環境で記録済みの成功は使い、未実施・影響する変更・環境変更があれば再実行。公開時の保存は未保存の変更・記録だけとし、マージ済みならデプロイ結果の確認へ進む |
| AppからCodespacesで初回起動を確かめる時点でも、企画の完成確認へ誘導される | 初回はスターターと基本テストを確認して実装へ戻る分岐を明記 |
| 環境別ガイドと運営手順の手動確認範囲が、共通手順より広い | 必須DoDに対応する主要な操作経路と関連する状態の確認へ統一 |
| 外部サービスの設定がCIにも必要になることが読み取れない | `.env`やAzure SecretsがActionsへ自動継承されないこと、テスト用接続先・Secretsの管理、実接続との確認結果の区別を補足 |

再監査では `npm ci`、`npm run check`、`npm run test:e2e` を実行し、ブラウザテスト6件が成功しました。依存関係の監査は指摘0件です。`actionlint`、Markdownの相対リンク・見出し、npmスクリプト参照、devcontainer JSON、Skillsのfrontmatterも再確認しました。今回の変更は文書のみで、学生用の企画・作業・検証テンプレートは未入力のままです。

## 課題シートを使ったCodespaces実機リハーサル

10月9日に、教材コミット`7aa1202`を別のPrivateリポジトリへコピーし、提供された締切管理のワークシート記入例から実装しました。未マージの教材変更を検証するためのコピーであり、配布用`main`からテンプレートを作る確認とは区別します。原本PDFはGitへ入れず、記入例の数値と今回の補足判断を分けた要約を入力に使いました。

環境は新規の2-core Codespace、ChromeのVS Code Web、Node.js 24.21.0、npm 11.19.0です。運営アカウントのCopilot **Local / Auto** を使い、実際に **Plan → Agent** を操作しました。学生アカウントの利用権利・残量の検証ではありません。

| 対象 | 実際に確認したこと |
| --- | --- |
| 環境準備 | 新規作成、ワークスペース信頼の確認、停止・再開、`npm ci`、`npm run dev`、Privateな4280転送URLでの表示・操作 |
| 企画の引き継ぎ | Copilotが`prepare-project`と入力資料を読み、3機能・2画面、D01〜D09、T01〜T06を計画。Agentでproduct・tasksへ保存 |
| 失敗からの実装 | 先に受け入れテスト1件を書き、未実装の空状態で失敗することを確認。実装後の入力欄名の不一致も検出し、修正して同じ主要フローが成功 |
| 自動確認 | `npm run check`とPC幅・390px幅のE2E計22件が成功。並び順、提出済み、保存と再読込、日本時間の日付境界、空入力・不正日付・戻る、保存失敗時の保持、API・配信を確認 |
| 独立した操作確認 | 実装を担当したCopilotとは別にCodexが転送URLを操作。順不同3件の昇順表示、対象1件だけの提出済み、再読込、空白入力、取消し、390pxでの登録・長い文字列・当日表示を確認。学生による利用評価とは区別 |
| GitHubへの保存 | VS Codeのソース管理GUIでステージ・commit・ブランチ発行（push）を実施し、GitHubの画面から[リハーサル用PR](https://github.com/mochan-tk/hackathon-rehearsal-deadline-20261009/pull/1)を作成 |
| 本番コンテナ | 実装コミット`06b72d1`の[PRのCI](https://github.com/mochan-tk/hackathon-rehearsal-deadline-20261009/actions/runs/37889136308)が成功。本番コンテナのビルド・起動とE2Eを確認。コンテナの公開とAzureへのデプロイは実施していない |

独立したコード・文書レビューでも、D01〜D09の修正必須の不整合は見つかりませんでした。今回のアプリは単一タブで利用するMVPです。`localStorage`を複数タブから同時編集した場合の競合には対応しておらず、この制約をアプリのREADMEと検証記録へ残しました。学生による利用評価を含むT06は検証待ちです。

初回の構築・接続で待ち時間が発生し、同じCodespaceの停止・再開後にTerminalとCopilotが使用可能になりました。`npm ci`自体は今回約13秒でしたが、環境準備全体の所要時間ではありません。この結果から、Codespacesガイドへ準備中の待機・開き直し・停止再開と、信頼確認が表示された場合の説明を補足しました。

依存追加中の開発プレビューに一時的なReactエラーがありましたが、通常の再読込後は再現せず、新しいerror/warnは0件でした。一方、Codespace内部の認証なしブラウザから127.0.0.1の開発サーバーへ接続するとWebSocketエラーを観測しました。Private転送先の認証条件との差が原因の可能性がありますが、原因確定とは扱いません。通常の転送URLでの操作結果と本番サーバーのE2Eは別に確認しています。

## 配布前に残っている確認

- Codespacesで保存後のホットリロードと、任意のDockerプレビューを確認する。
- Copilot appでclone、設定受け入れ、Setup、Run、Browser、Changesを通す。
- Studentアカウントで、企画整理→Plan→実装→完成条件との照合を両経路で通す。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして4280から操作する。
- GHCRへの公開、Public設定、実際の`production` EnvironmentでのOIDC情報表示、Azure初期設定・接続、テスト済みイメージのデプロイを通す。
- 公開URLでの画面、必要なAPI・DB接続、本物の認証を確認する。
- Windows・LinuxのPCでCopilot appの標準手順を通す。

これらは未実施です。ローカルでのホスト名再現や設定の構文検証を、実サービスでの成功として扱いません。[運営向け手順](facilitator.md)に沿って実施し、環境・日付・結果を追記してください。配布前には教材の変更を配布元の`main`へマージし、テンプレートから作った新しいリポジトリに入っていることも確認します。
