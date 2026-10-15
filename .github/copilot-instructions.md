# このリポジトリでの開発

学生の企画を実装するReact・TypeScript・ViteとNode.js APIの初心者向けスターターです。日本語で結果と次の操作を簡潔に伝えます。

## 必要な情報

- 前段の企画は`docs/`直下。ユーザーが指定したPDF・画像・Markdownなどの実ファイルを使う。`docs/README.md`は置き方の案内であり企画の入力ではない。元資料は上書きせず、形式や名前の統一、UI画像を必須にしない。読めた資料の要点と読めない資料を示し、読めない部分は本文や読み取れる形式で補足を求める。内容を推測しない。
- 合意した目的・DoD・範囲・作業順・構成・編集と実行の場所・コマンドはルート`PLAN.md`。Planではファイルを編集せず草案を相談し、合意後に編集可能なモードで依頼されたら`prepare-project`で保存する。保存後に実ファイルを読み直し、合意内容を確認できてから保存先と結果を伝える。草案だけで引き継ぎ完了としない。既に読めた合意を質問し直さず、不足・矛盾だけ確認する。
- 実装前にルート`PLAN.md`の実ファイルを読む。未保存・読めない場合は`prepare-project`の保存・確認へ戻り、確認できるまで実装を始めない。合意済みの内容は再利用し、合意を確認できない点だけ相談する。保存のみの依頼ではアプリを実装しない。
- 実装中の状態・自動と人の確認・証拠・未達や未確認・次の作業はルート`PROGRESS.md`。必要になった時点で作る。資料の重複や会話全文の転記は不要。再開時はこの2ファイルと関係する変更を読む。
- 手順の本線とCodespacesの操作はREADME。Appの操作は`handson/copilot-app.md`、公開を依頼された場合だけ`handson/azure.md`を使う。

## 実行と確認

- Node.js 24、npm、lockfile。初回`npm ci`、起動`npm run dev`（画面とAPIは4280、Docker不要）。
- `npm run check`でlint・型・build、`npm run test:e2e`で本番サーバーの4281を検証。Chromiumの準備は`npx playwright install chromium`、Linuxで必要なら`--with-deps`。手動previewはbuild後に`npm run preview`、E2Eと同じ4281を使うため先に止める。
- 企画のDoDを確かめるよう`tests/starter.spec.ts`を更新する。`tests/runtime.spec.ts`と`/api/health`は維持する。CIは本番コンテナで確認する。
- Appで編集しCodespacesで実行する場合は、変更内容・コミット案・確認コマンドを示し、学生がGUIでcommit・pushして結果を返すまで次の修正を待つ。PCで成功したことにしない。明示依頼がなければcommit・pushを自動実行せず、Git確認コマンドや番号照合を通常手順に追加しない。
- APIは`server/api.js`へ追加し画面から`/api/...`で呼ぶ。秘密の値はサーバー側環境変数に置き、フロントや`VITE_`変数へ入れない。`.env`はGit・コンテナへ入れず、PC・Codespaces・CI・Azureそれぞれで設定する。共有・永続データは外部DB等へ保存する。

## 作業の約束

- 代表者のPublicのチーム用Fork1つを使う。作業枝は`codex/beginner-starter`から作り、PRのbase/head repositoryはともにチームFork、baseは`codex/beginner-starter`。学生アプリを配布元へPRしない。Fork・Actions・同期はREADMEを案内する。
- Planは草案の相談。合意の保存を頼まれた時点ではアプリの実装を始めず、実装依頼後に合意範囲で進める。仕様変更はPLANへ反映し、期待値を都合よく弱めない。
- DoDと実際の証拠を照合し、未実行は未確認と記録する。人の操作と仮説の評価をAIの成功報告で代用しない。同じ成功確認を際限なく繰り返さない。
- 同じ失敗が続く場合、証拠から依頼・資料・テスト・環境の適切な場所を最小限直す。判断・権限・外部サービスが必要なら次の操作を説明し、企画外の支出や契約へ広げない。
