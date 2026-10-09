# Container Appsへ公開するための準備

**任意の公開を選んだチーム向けです。** mainにはDockerfile・公開ワークフロー・Azure接続設定はありません。[公開手順](publish.md)でアプリに合うコンテナとテストを用意してから、チームの代表者が運営・メンターと進めます。

ここでは、テスト済みイメージをGHCRにPublicで保存し、Azure Container Apps（Consumption）へdigestを指定して配置します。コンテナの中のコードや組み込んだ設定は取得できるため、GitHubリポジトリがPrivateでもイメージは公開できる内容にします。APIキー・私的な資料を含めません。非公開を保つ必要があるチームはこのPublic経路を使わず、[非公開ACRからの取得](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity-image-pull)などを運営と準備します。

## 1. テスト済みイメージをレジストリへ保存する

Copilotに、既存のアプリ用CIを読んだ上で、必要な公開用ワークフローを追加してもらいます。配布済みのワークフローを有効化する操作ではありません。次の条件を指定し、内容を確認します。

- 手動実行（`workflow_dispatch`）で、チームリポジトリの**既定ブランチだけ**から公開する。
- `linux/amd64`の本番イメージを一度ビルドし、そのイメージを起動して起動確認・主要なDoDをテストする。
- 成功時だけ、同じイメージを再ビルドせずGHCRへpushする。失敗したら公開しない。
- GitHub Actionsの`GITHUB_TOKEN`と必要な`packages: write`権限で、同じリポジトリに紐づくパッケージへ保存する。PRの確認に公開権限を与えない。
- 実行のSummaryに、対象コミット、テスト結果、タグ、`ghcr.io/所有者/アプリ名@sha256:...`の**完全なdigest参照**を残す。

これを[development.md](../development.md)の公開方法へ追記します。具体的な生成後のワークフロー名と操作はそこで確認します。[GHCRの認証・公開・digest](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

チームでPRを確認し既定ブランチへマージしたら、GitHubの **Actions → 追加したワークフロー → Run workflow** で既定ブランチを指定して実行します。Run workflowは、手動実行に対応するファイルが既定ブランチに入ってから表示されます。[手動実行の仕様](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)

成功した実行のSummaryを確認し、対象コミット・結果・digestを[verification.md](../verification.md)へ記録します。次に、所有者の **Packages → 対象パッケージ → Package settings → Change visibility → Public** を選びます。初回公開時のパッケージは通常Privateです。**Public化はチームで公開内容を確認してから行います。一度PublicにしたパッケージはPrivateへ戻せません。** Organizationのポリシーで変更できない場合は運営と公開方法を決めます。[パッケージの公開範囲](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility)

## 2. Azureの利用先を決める

学生のサブスクリプションでContainer Appsを作成できるか、利用可能なリージョン・残額・権限を確認します。Azureクレジットがあることだけで、すべてのサービスやモデルを使えるとは判断しません。[Azure for Students](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)

Azure portalで、チーム専用の **Resource group** と **Container Apps Environment** を用意します。ワークロードプロファイルはConsumptionを選び、他の用途のリソースと分けます。初回はサブスクリプションの **Resource providers** で`Microsoft.App`を登録します。追加のプロバイダーが必要と表示された場合も、権限のある運営と登録します。[Container Apps作成の前提](https://learn.microsoft.com/en-us/azure/container-apps/quickstart-portal)・[プロバイダー登録](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-providers-and-types#azure-portal)

普段のPC・Codespacesでの確認にはAzureは不要です。公開時のリソース、ログ、通信、DB、外部AI等には費用が発生し得るため、選んだサービスと使用額を確認します。[Container Appsの課金](https://learn.microsoft.com/en-us/azure/container-apps/billing)

## 3. digestを指定して配置する

Azure portalの **Cloud Shell → Bash** を開きます。今回の操作だけなら、初回はストレージをマウントしない一時セッションを選べます。Cloud ShellのAzure CLIを使えば、学生全員のPCへAzure CLIを追加する必要はありません。必要なら運営が一緒に操作します。[Cloud Shellの一時セッション](https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/ephemeral)

次は記入例です。`<...>`は実際の値に置き換えます。対象のサブスクリプション、リソースグループ、Environmentを先に確認します。ポートは[development.md](../development.md)の**コンテナ内の待受ポート**です。

```bash
az account set --subscription '<使用するSubscription ID>'
az extension add --name containerapp --upgrade
az containerapp create \
  --name '<チームのアプリ名>' \
  --resource-group '<チームのResource group>' \
  --environment '<作成したContainer Apps Environment名>' \
  --image 'ghcr.io/<所有者>/<アプリ名>@sha256:<記録したdigest>' \
  --ingress external \
  --target-port <コンテナ内の待受ポート> \
  --min-replicas 0 \
  --max-replicas 1 \
  --cpu 0.5 \
  --memory 1Gi \
  --revisions-mode single
```

CPU・メモリは最初の目安です。必要量を確認して調整します。公開イメージなので取得用パスワードは不要です。この操作はAzureリソースを作成します。[Container Apps CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp?view=azure-cli-latest#az-containerapp-create)

環境変数やAPIキーが必要なアプリは、Azure portalの対象Container Appで **Secrets** と **Containers** の環境変数参照を設定します。平文のキーをコマンド・Git・会話へ貼り付けません。アプリがそれらを必須とする場合は、設定と再配置が終わるまで起動完了とは扱いません。コンテナの起動・readinessに合わせたprobeと、Target portも確認します。[Secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets)・[Health probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes)

## 4. 公開URLを確かめ、更新する

Azure portalで **Revision management** の新しいリビジョンが準備できたことを確認し、概要の **Application URL** を開きます。[公開URLの確認](publish.md#4-公開urlで確認する)を実施して結果を記録します。起動しない場合はログ、待受ポート、環境変数、イメージの取得状態を確認します。

更新時は、確認済みの変更をPRでマージし、手順1で新しいイメージのテストと公開を実行します。成功したdigestを使って、Cloud Shellで既存アプリを更新します。

```bash
az containerapp update \
  --name '<チームのアプリ名>' \
  --resource-group '<チームのResource group>' \
  --image 'ghcr.io/<所有者>/<アプリ名>@sha256:<今回成功したdigest>'
```

リビジョンと公開URLを再確認します。これで使用するイメージが特定され、別のビルドや変化する`latest`タグに置き換わりません。

毎回のAzure更新も自動化したいチームは、これが動いてからGitHub ActionsとOIDCを追加できます。教材のmainにはその接続は未設定です。[GitHub Actionsからのデプロイ](https://learn.microsoft.com/en-us/azure/container-apps/github-actions)を参照し、リポジトリで実際に発行されるOIDC Subjectに合わせて設定します。準備済みの構成は[初心者向けブランチの手順](https://github.com/mochan-tk/hackathon-for-student-20261017/blob/codex/beginner-starter/docs/common/azure-setup.md)を参考にできますが、自分たちの構成へそのままコピーせず、コマンド・ポート・検証内容を合わせます。

## 5. 利用を終えるとき

公開を続けるかをチームで決めます。不要になったアプリ・環境・関連サービスはAzure portalで削除します。チーム専用Resource groupごと削除する場合も、残したいDBやデータが入っていないか先に確認します。アプリを更新しなくても、既存のAzureリソースが消えるわけではありません。

継続する場合は **Cost Management** で使用額・クレジット残量を確認し、担当を決めます。コンテナが0レプリカになっていても、関連サービスの費用は別に確認します。

このmain向け公開経路は、文書作成時点で実サービスへの一気通貫の確認が未実施です。[運営向けチェック](../facilitator.md)でリハーサルしてから当日に案内します。
