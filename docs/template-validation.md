# 教材の検証記録

確認日：2026年10月9日。参加チームのアプリの完成記録は[verification.md](verification.md)へ残します。

## 今回の2コースへの変更

| コース | 初期状態 | 確認する範囲 |
| --- | --- | --- |
| main | アプリなし。企画資料、Copilotの指示・Skills、開発環境を配布 | 文書・リンク・設定の整合と、構成選択→アプリ生成の手順 |
| codex/beginner-starter | React・TypeScript・Vite・Nodeのアプリ、テスト、Docker・CIを配布 | 文書・ブランチ選択に加え、実際の起動・テスト・コンテナ |

mainは、企画に合う最小構成を選び、最初の実装でアプリ・必要なテスト・CIを作るコースです。配布時点ではアプリの起動やテストを実行できません。教材の確認と、学生が生成したアプリの確認は区別します。

### mainの文書・設定

アプリ本体・パッケージ設定・固定の起動／テスト／公開設定を除き、Dev Containerの自動インストールと固定ポートも外しました。準備→構成選択→生成→確認の順に、両環境の手順、共通指示、Skillsを照合しています。

採用技術・理由・準備／起動／確認方法は[development.md](development.md)へ集約します。コードがない段階のコマンドを実行させず、未作成・未実行のCIを成功扱いにしない説明にしています。プロンプト・コンテキスト・ハーネスの[解説と公式出典](common/ai-development-tips.md)は維持しています。

24文書の相対リンク・見出し175件、Dev ContainerのJSON、2つのSkillsのfrontmatter、削除した設定への参照を検査し、問題がないことを確認しました。独立したレビューで、技術構成の保存先と、運営ガイドのコースごとの参照先も統一しました。これらの静的確認を、CodespacesやCopilotでの実機確認とは扱いません。

### 初心者向けの実行確認

準備済み構成は教材の基準コミット`d1a16f2`から、[codex/beginner-starter](https://github.com/mochan-tk/hackathon-for-student-20261017/tree/codex/beginner-starter)へ保存しました。参加者のコピー・デフォルトブランチ・PR先と、公開ワークフローの実行条件を、この選択に合わせています。

コミット`abcd396`で次を確認しました。

- macOS／Node.js 24.19.0で依存関係の再インストール、lint・型・本番ビルド、PC幅・390px幅のE2E計6件が成功。
- 隠しフォルダー配下の作業環境で、SPAの直接表示が404になる問題を再現。配信ルートを明示する1行の修正後、同じ基盤テストを含む6件が成功。
- `actionlint`、相対リンク・見出し169件、デフォルトブランチを含むワークフロー条件12パターンを確認。
- [GitHub Actions](https://github.com/mochan-tk/hackathon-for-student-20261017/actions/runs/37904996059)でも、Linux/amd64コンテナのビルド・起動・本番コンテナへのテストが成功。OIDC表示・イメージ公開・Azure配置はスキップ。

初心者向けの詳細な過去の記録は[そのブランチの検証記録](https://github.com/mochan-tk/hackathon-for-student-20261017/blob/codex/beginner-starter/docs/template-validation.md)を参照してください。

## 過去のCodespaces実機リハーサル

同日、変更前の準備済み教材`7aa1202`を別のPrivateリポジトリへコピーし、締切管理のワークシート記入例からCopilot Local／AutoでPlan→Agentを実行しました。原本PDFをGitへ入れず、共有可能な要点と追加判断を区別して使用しています。

新しい2-core Codespace、VS Code Web、Node.js 24.21.0で、企画整理、実装、GUIのcommit・push、PR、レビュー後の修正まで進めました。[最終CI](https://github.com/mochan-tk/hackathon-rehearsal-deadline-20261009/actions/runs/37890504488)で、本番コンテナと38件のE2Eが成功しています。別のAIによる実画面の操作も行いました。学生自身の利用評価や、mainの新しい生成経路の検証ではありません。

変更前の監査・不具合修正の詳細は[基準コミットの記録](https://github.com/mochan-tk/hackathon-for-student-20261017/blob/d1a16f28604c89c99e8fab88d270f6744fa7cef0/docs/template-validation.md)に残しています。

## 配布前に残る確認

- [コース選択](choose-start.md)に沿った、新しいチーム用リポジトリの作成。初心者向けの全ブランチコピーとデフォルトブランチ変更を含む。
- mainの新規Codespaceで、構成選択→生成→起動→テスト・CI→人の操作確認を通す。
- 学生アカウントの利用権利・残量、Copilot Studentでの両開発経路。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして実行し、結果をAppへ返す一連の操作。
- 新しい公開設定の生成、GHCRの公開範囲の設定、Azure Container Appsへのdigest指定配置、公開URLの操作。
- 初心者向けの実際のOIDC初期設定・自動デプロイ、Windows／LinuxでのApp、必要な実サービス接続と利用者による評価。

これらは未確認です。[運営向けチェック](facilitator.md)に沿って、実施した日付・環境・対象コミット・結果を追記します。配布前にmain向けの変更をmainへ反映し、各コースが説明どおりコピーされることも確かめます。
