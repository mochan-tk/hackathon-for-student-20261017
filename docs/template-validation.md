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

### mainのCodespaces実機リハーサル

2026年10月9日、main向けの変更`263e01b`を[Privateの検証用リポジトリ](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009)へ複製し、新しい2-core Codespaceで試しました。配布元のmainへは未マージのため、対象コミットの`git archive`から検証用mainを作成しています。**テンプレートのGUIから新しいチーム用リポジトリを作る配布経路は、この確認に含みません。**

開始時にはアプリ、`package.json`、起動設定、CIがないことを確認しました。締切管理のワークシート記入例から匿名化した要点だけを`docs/source/`へ追加し、以前のアプリや完成済みの企画・作業計画は持ち込んでいません。入力資料は記入例であり、実際の学生調査とは区別しています。

VS Code WebのCopilot **Local／Auto**で、教材の4項目の依頼文を使ってPlan→Agentを実行しました。`prepare-project`が参照され、React＋Viteなどとの比較から、**HTML・CSS・JavaScriptとNode.js標準機能の配信サーバー**を選びました。React・Vite・API・DB・Dockerを追加せず、ブラウザのlocalStorageで保存する構成です。

| 確認した範囲 | 実際の結果 |
| --- | --- |
| 企画・構成・作業の整理 | Planで完成条件と対象外を提案し、合意後にAgentがproduct・development・tasksへ保存 |
| アプリ・確認方法の生成 | Copilotがアプリ、`node:test`の単体テスト、Playwrightのブラウザテスト、PR用CIを生成。未実装時にテストが失敗することも確認 |
| Codespaces内の自動確認 | 単体テスト32件、ブラウザテスト14件が成功。GitHub上のCI成功とは区別 |
| 起動とプレビュー | 記録した起動方法で4173番ポートを開き、Privateの転送URLから表示 |
| Copilotとは別のAIによる実画面の操作 | Codexが空の一覧、登録、期限順の並び替え、選んだ1件だけの提出済み削除、再読込後の保存を確認 |
| 入力・表示・操作 | 空欄・空白だけの入力の拒否とエラー時のフォーカス、キャンセル、前後空白の除去、今日・残り日数・期限超過、キーボード操作を確認 |
| スマートフォン幅 | 390px幅で長い日本語の折り返しと登録・キャンセル・提出済み操作を確認。画面幅と内容幅がともに390pxで、横方向のはみ出しなし |

上記の内容を、検証用の`feat/first-demo`でVS CodeのGUIから **Stage → Commit → Publish Branch** と操作し、`aa697d1`として保存・pushしました。GitHubのGUIで[検証用PR #1](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/pull/1)を作成し、[初回CI](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/actions/runs/37913435390/job/113763788476)でも単体32件・ブラウザ14件が成功しました。Codexによる操作を学生本人の手動確認や使いやすさ・課題解決の評価としては扱いません。

その後の独立したコードレビューでは、CIと開発手順の`npm exec`に引数を区切る`--`がなく、Playwright用の`--with-deps`がnpm側で解釈される問題と、タブを開いたまま日本時間の日付を跨ぐと残り日数の表示が更新されない問題を検出しました。2点をCopilotへ返し、修正しました。日跨ぎ・タブ復帰の回帰4件は修正前の失敗から修正後の成功を確認し、既存の関連5件も成功。入力途中の内容・エラー・フォーカス・保存データを保つことも確かめています。

修正をGUIでcommit・pushした`b59d868`の[修正後CI](https://github.com/mochan-tk/hackathon-rehearsal-main-20261009/actions/runs/37914592137/job/113767587354)では、正しいOS依存の準備、単体32件・ブラウザ18件が成功しました。独立した再レビューで2点の解消を確認し、実画面でも再読み込み後の保存・日数表示・登録画面からのキャンセルを確認しました。これにより、生成後のレビュー→修正→再検証→GUIで共有する流れまで実施できました。

終了時にはサーバーのTerminalをGUIで終了し、今回作成した`opulent-enigma-9764ppgg56hp96q`を **Stop codespace** で停止しました。一覧でActive表示が消え、未保存の変更がないことを確認しています。今回のブラウザ操作では`Ctrl+C`だけでの正常終了は確認できず、Terminalの「強制終了」を使用したため、`Ctrl+C`の成功実績には含めません。アプリとCIの実装・修正はCopilotが行い、停止後の最終記録はCodexが追記しました。

実機確認で見つかった教材の補足は、次の2点を[Codespacesの手順](codespaces.md)へ反映しました。

- 初回は拡張の準備が終わるまでPlanが表示されない場合があり、サインインと準備状況を確認して選択欄を開き直す案内を追加。
- PlaywrightでChromium本体だけを入れると、Linuxの`libnspr4.so`不足で起動できなかった。CopilotがOS依存パッケージを追加して復旧し、テストが成功。Playwrightを採用した場合に限り、初回の`install --with-deps chromium`相当の準備と、その手順をdevelopmentへ残す説明を追加。

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
- 学生がmainコースで同じ流れを実施し、別の学生による手動確認と使いやすさ・課題解決の評価を行う。
- 学生アカウントの利用権利・残量、Copilot Studentでの両開発経路。
- Copilot appのGUIでcommit・pushし、CodespacesのGUIでPullして実行し、結果をAppへ返す一連の操作。
- 新しい公開設定の生成、GHCRの公開範囲の設定、Azure Container Appsへのdigest指定配置、公開URLの操作。
- 初心者向けの実際のOIDC初期設定・自動デプロイ、Windows／LinuxでのApp、必要な実サービス接続と利用者による評価。

これらは未確認です。[運営向けチェック](facilitator.md)に沿って、実施した日付・環境・対象コミット・結果を追記します。配布前にmain向けの変更をmainへ反映し、各コースが説明どおりコピーされることも確かめます。
