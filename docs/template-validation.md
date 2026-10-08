# スターターの検証記録

検証日：2026年10月8日。これは教材を作成した環境での検証です。チームが作るアプリの完成記録は [verification.md](verification.md) に残します。

## 実行して確認したこと

環境：macOS arm64、Node.js 24.21.0、SWA CLI 2.0.10、lockfileに記録した依存関係。

| 対象 | 方法 | 結果 |
| --- | --- | --- |
| 依存関係 | `npm ci` | 成功 |
| lint・型・本番ビルド | `npm run check` | 成功 |
| 起動と入力操作 | `npm run test:e2e` | SWA CLIの4281経由で、ChromiumのPC幅・スマホ幅（390px）の計4件成功。入力→表示、実行時エラー、横方向のはみ出し、URL直接アクセス・再読み込み、存在しないアセットの404を確認 |
| 初期画面 | PC・スマホ幅のスクリーンショットを確認 | 表示の欠け・重なりなし |
| SWA開発サーバー | `npm run dev`→4280からブラウザ操作 | 入力操作成功、ブラウザの実行時エラーなし、SWA経由のHMR WebSocket接続を確認 |
| ローカル認証の入口 | `/.auth/me`を取得 | 未ログイン状態で200、clientPrincipalはnull。本物のOAuthは未確認 |
| SWAの公開設定 | ビルド成果物を確認 | staticwebapp.config.jsonがdist直下へコピーされる |
| Codespacesのホスト許可 | 環境変数とHTTP Hostをローカルで再現しSWA経由で取得 | 対象の4280転送ホスト名で200、関係のないホスト名で403。ブラウザに渡すWebSocket設定は転送ホスト・wss・443 |
| GitHub Actions設定 | `actionlint` | エラーなし |
| 文書・設定 | Markdown内のローカルリンク、YAML、devcontainer JSON | リンク切れ・構文エラーなし |
| Skills | frontmatter検証と、締切例から企画・作業案を作る独立した参考評価 | 書式正常。例の3機能・対象外を維持し、架空調査をチームの事実として扱わなかった |

Skillsの参考評価はCodex上で行いました。Copilot Studentでの動作検証を代替するものではありません。

Copilot appのGUI手順は、[v1.1.26のbranch actions追加](https://github.com/github/app/releases/tag/v1.1.26)と[v1.1.27のPull・Pushの表示条件](https://github.com/github/app/releases/tag/v1.1.27)を公式リリースノートで確認しました。macOSの実機ではChanges、Uncommitted／Last commit、コミット番号、ブランチ操作メニュー、Current checkoutの表示を確認しました。GUIでcommit・pushしてCodespacesへ渡す一連の操作は、配布前の確認として残っています。

## GitHub上で確認したこと

2026年10月8日、[配布用リポジトリ](https://github.com/mochan-tk/hackathon-for-student-20261017)の `main` に初版を反映し、Template repositoryを有効にしました。

SWA導入前のコミット `8317f5c` の [Check実行結果](https://github.com/mochan-tk/hackathon-for-student-20261017/actions/runs/37738611704)は成功です。GitHubのLinux runner、Node.js 24で、依存関係のインストール、lint・型・本番ビルド、ChromiumのPC・スマホ幅の操作テストを確認しました。

## 配布前に残っている確認

- 新規Codespaceでdevcontainerを構築し、4280のポート転送から操作・ホットリロードを確認する。
- Copilot appでclone、設定受け入れ、Setup、Run、Browser、Changesを通す。
- Studentアカウントで、企画整理→Plan→実装→完成条件との照合を両経路で通す。
- Copilot appで編集・pushし、Codespacesで同じブランチをpullして4280から操作する。
- Azure Static Web Appsへの公開、API・DB接続、本物の認証を必要な構成で確認する。
- Windows・LinuxでCopilot appの標準手順を通す。

これらは未実施です。ローカルでのホスト名再現や設定の構文検証を、実サービスでの成功として扱いません。[運営向け手順](facilitator.md)に沿って実施し、環境・日付・結果を追記してください。

## 依存関係の確認

SWA CLI 2.0.10の追加後、`npm audit`には開発依存を含め6件（high 5、low 1）の指摘があります。SWA CLI経由のadm-zip、devcert/tmp、selfsigned/node-forge等に由来し、未解消です。自動修正候補には旧SWA CLIへのメジャーダウングレードが含まれるため、`npm audit fix --force`は実行していません。

この教材の起動はループバックアドレス、Codespaces転送はPrivateを使います。指摘が解消したという意味ではありません。配布前に上流の更新とauditを再確認し、採用版を判断してください。

`npm audit --omit=dev`では、本番依存の指摘は0件でした。
