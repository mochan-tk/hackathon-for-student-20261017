# 動くアプリで発表し、Container Appsへ公開する

この初心者向けコースでは、[選択手順](../choose-start.md)で設定した **`codex/beginner-starter`** がチームのデフォルトブランチです。以下のPRの統合先、手動実行のブランチ、Environmentの許可ブランチには、その名前を使います。

普段は[共通の開発手順](local-development.md)でPC・Codespacesのアプリを起動します。Copilot appでは **Run → Browser**、Codespacesでは **4280の転送先**で確認・発表できます。継続して使えるURLが必要になったら、**Azure Container Apps**へ公開します。

公開するのは、Reactの画面とNode.jsのAPIをまとめた1つのコンテナです。GitHub Actionsが本番コンテナを起動してブラウザテストを行い、成功した**同じイメージ**をGitHub Container Registry（GHCR）へ保存してAzureへ渡します。PCへのDockerのインストールは必須ではありません。

## 1. 初回だけ公開先を準備する

チームの代表者が運営と[Azure・GitHubの初期設定](azure-setup.md)を行います。学生のAzureアカウント、Container App、GitHub Actionsからの接続を設定する手順です。標準構成では公開可能なコンテナをGHCRの **Public** パッケージに置きます。

初期設定前も **Check** の自動テストは実行できます。公開を有効にする変数が未設定なら、イメージの公開とAzureへのデプロイはスキップされます。Azureリソースはワークフローが自動作成する設計にはしていません。

## 2. GitHubへ変更を渡す

今回の変更と検証記録をすでに保存・pushし、確認してチームのデフォルトブランチへマージ済みなら、次の「3. 自動テストとデプロイを待つ」へ進みます。

1. [完成確認](verification.md)を終えます。
2. 確認後に残っている変更や検証記録をcommit・pushします。Copilot appの場合は[AppのGUI手順](../copilot-app.md#codespacesへ変更を渡して確認する)の1〜4、Codespacesの場合は[保存の手順](../codespaces.md#7-保存し必要になったら公開する)を使います。保存・push済みなら、この操作は不要です。
3. GitHubでPRを作り、**Check** の成功、画面の操作結果、チームの完成条件を確認してチームのデフォルトブランチへマージします。作成済みのPRがあれば、そのPRを使います。

## 3. 自動テストとデプロイを待つ

リポジトリの **Actions → Check** で、チームのデフォルトブランチへのマージ後の実行を開きます。

| ジョブ | 行うこと |
| --- | --- |
| `check` | lint・型・ビルドを確認し、Linux用の本番コンテナを起動してAPI・PC幅・スマホ幅をテスト |
| `publish` | テストに使ったコンテナを再ビルドせずGHCRへ保存 |
| `deploy` | 保存済みイメージを、既存のContainer Appへデプロイして起動確認 |

`publish`には`ENABLE_CONTAINER_PUBLISH=true`、`deploy`にはさらに`ENABLE_AZURE_DEPLOY=true`とAzure接続設定が必要です。デプロイはチームのデフォルトブランチだけで動きます。

初期設定の直後など、コードを変更せずに実行したい場合は **Actions → Check → Run workflow** でブランチを **チームのデフォルトブランチ** にし、**OIDC接続情報だけ表示するチェックを外して**実行します。チェックを入れた場合は初期設定用の`oidc-setup`だけが動き、テスト・公開・デプロイは行いません。PRのテスト成功だけではAzureへの公開は完了していません。

## 4. 公開URLで確認する

成功した実行の **Summary** にある **Azure Container Apps → URL** を開きます。Azure portalのContainer App概要にある **Application URL** からも開けます。

必須DoDに対応する操作、URLを直接開いた場合・再読み込み、API、使っている場合は実際のログインや共有DBを確認します。[verification.md](../verification.md)にURL・結果・未確認事項を記録します。CIの`/api/health`成功はサーバーの起動確認であり、チームの完成条件すべての達成を意味しません。

更新は同じ **編集 → 確認 → commit・push → PR → マージ** で行います。

## API・DB・アプリ内AIを使う場合

- **API**：`server/api.js`を入口に実装します。画面は`/api/...`へアクセスし、同じNodeサーバーで処理します。
- **環境変数・秘密情報**：開発中は`.env`、AzureではContainer AppのSecretsとコンテナの環境変数を使います。ローカルの`.env`は自動では公開先へ移りません。APIキーはサーバー側に置き、`VITE_`変数や画面のコードへ入れません。[環境変数](https://learn.microsoft.com/en-us/azure/container-apps/environment-variables)・[Secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets)
- **共有DB・ファイル**：必要なチームは外部のDBやストレージを接続します。コンテナ内のファイルやメモリだけに保存したデータを永続化済みとして扱いません。[Container Appsのストレージ](https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts)
- **認証**：企画に必要ならアプリの認証方式を選んで実装・設定し、公開URLで確認します。スターターにログイン機能はありません。
- **AI**：サーバーから必要なAPIを呼び出します。利用できるモデル・リージョン・課金枠を確認し、テスト用の応答と実サービスの結果を区別します。

## うまくいかないとき

| 状況 | 確認する場所 |
| --- | --- |
| `check`が失敗 | 最初に失敗したステップとログをCopilotへ渡す。テストを省略して公開しない |
| `publish`／`deploy`がSkipped | 初期設定の有効化変数と、実行ブランチがチームのデフォルトブランチかを確認 |
| `oidc-setup`だけが成功し、アプリが更新されない | 手動実行のOIDC表示用チェックを外して、チームのデフォルトブランチで実行し直す |
| GHCRへのpushが権限エラー | OrganizationのPackagesポリシー。同名パッケージを以前に別の方法で作った場合は、Package settingsのManage Actions accessでチームのリポジトリへWrite権限を与える |
| イメージを取得できない | GHCRパッケージのPublic設定、イメージ名、Azure側のレジストリ設定 |
| Azureへのログインに失敗 | 初期設定のID、Federated credentialsのSubjectとOIDC表示用実行のSubjectが完全に一致しているか、GitHub Environment設定。設定直後は反映を待って再実行 |
| `production` Environmentを作れない | リポジトリ所有者のプランと管理権限。Private OrganizationはGitHub Team以上が必要で、学生個人のProでは代用できない |
| リビジョンが起動しない | Azureのコンテナログ、環境変数、待受ポート8080、外部DB・APIへの接続 |
| 公開後に機能が動かない | 公開URLで再現する操作・エラーと、Actionsの実行URLをCopilotへ渡す |

利用が終わった後の停止・削除と費用の確認は、[初期設定の終了時の手順](azure-setup.md#5-利用を終えるとき)に従います。

この公開経路の実サービスでの検証状況は[スターターの検証記録](../template-validation.md)に記載しています。
