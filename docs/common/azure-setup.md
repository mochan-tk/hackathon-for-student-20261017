# Container Appsへ公開するための初期設定

チームの代表者が運営・メンターと一度行う準備です。準備後は、学生はGitHubのPRをマージする操作で更新できます。対象は通常の **Azure Container Apps（Consumption）**です。

必要なのは、チームリポジトリの設定変更権限、Azureでリソースを作成する権限とロールを割り当てる権限です。使うサブスクリプションとチーム用リソースグループを決めます。学生クレジットは利用できるサービス・リージョン・残量を確認して使います。[Azure for Students](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)

## 1. テスト済みコンテナをGitHubへ保存する

1. この教材の変更を含むPRを`main`へマージします。
2. GitHubの **Settings → Secrets and variables → Actions → Variables → New repository variable** で、`ENABLE_CONTAINER_PUBLISH`を値`true`で追加します。`ENABLE_AZURE_DEPLOY`はまだ設定しません。
3. **Actions → Check → Run workflow** で **main** を選んで実行します。
4. `check`と`publish`が成功したら、実行の **Summary → Tested container image** を開きます。`Tag`に表示される`ghcr.io/所有者/リポジトリ:タグ`を次節で使います。このイメージは本番コンテナでのブラウザテストを通っています。
5. リポジトリの **Packages**、または所有者のプロフィール／Organizationの **Packages** から、このコンテナパッケージを開きます。**Package settings → Change visibility → Public** にします。新規パッケージは通常Privateなので、初回に切り替えます。

この標準手順では、コンテナを誰でも取得できるようにします。公開できるアプリコード・画面素材だけを含めてください。`.env`や秘密のキーはイメージへ入れません。非公開コードを配布するチームは、運営と非公開レジストリ・Azure側の取得認証を用意する別構成を選び、このPublic設定を使いません。[GHCRの公開範囲](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility)

## 2. Azure portalでContainer Appを作る

Azure portalで **Container Apps → Create** を開き、次を設定します。表示名やタブの並びが異なる場合は[公式の作成手順](https://learn.microsoft.com/en-us/azure/container-apps/quickstart-portal)も参照します。

| 項目 | 設定 |
| --- | --- |
| Subscription / Resource group | 学生が利用するサブスクリプションと、チーム用リソースグループ |
| Container app name | チームのアプリ名 |
| Region / Environment | 利用可能なリージョンとContainer Apps環境。ワークロードプロファイルはConsumption |
| Image source | 自分のコンテナイメージ。外部レジストリを選択 |
| Registry / Image | `ghcr.io`と、手順1のTagに表示されたイメージ・タグ。公開イメージなので取得用パスワードは不要 |
| CPU / Memory | 最初は0.5 vCPU / 1 GiBを目安に、アプリに合わせて選ぶ |
| Ingress | 有効、外部からのHTTPアクセスを許可、Target portは **8080** |
| Scale | Minimum replicas **0**、Maximum replicas **1**から開始 |
| Revision mode | **Single** |

画面の **Review + create** で内容を確認して作成します。作成後、必要なら **Containers**／**Scale**／**Revisions** の設定で上の値をそろえます。GHCRの公開イメージを使うレジストリ設定も`ghcr.io`に合わせます。[GHCRからのデプロイ](https://learn.microsoft.com/en-us/azure/container-apps/github-actions#deploy-images-from-non-acr-registries)

**Application URL** でアプリが開くことを確かめます。独自ドメインは必須ではありません。HTTPの入口にはAzureのHTTPS URLを使い、コンテナ自身は8080で待ち受けます。

Consumptionには月ごとの無料枠があり、0レプリカではコンテナのリソース消費課金は発生しません。ログ・通信・DB・外部AIなどの費用は別途確認します。[課金仕様](https://learn.microsoft.com/en-us/azure/container-apps/billing)

## 3. GitHub ActionsからAzureへ接続する

長期間使うクライアントシークレットを作らず、**OpenID Connect（OIDC）**で接続します。ここで作るIDは、GitHub Actionsがアプリを更新するためのものです。

1. GitHubの **Settings → Environments → New environment** で`production`を作ります。**Deployment branches and tags**では、デプロイできるブランチを`main`に限定します。
2. Azure portalの **Managed Identities** で、チームのリソースグループに **User assigned managed identity** を作ります。Overviewにある **Client ID**、**Subscription ID**、**Tenant ID** を控えます。
3. そのIDの **Federated credentials → Add credential** を開き、GitHub ActionsからAzureへデプロイするシナリオを選びます。Organization/OwnerとRepositoryは**学生チームのリポジトリ**、Entity typeは **Environment**、Environment nameは **production** にします。Audienceは`api://AzureADTokenExchange`を使います。
4. チーム用リソースグループの **Access control (IAM) → Add role assignment** で、このIDへ **Contributor** を割り当てます。割り当て先の範囲はそのチームのリソースグループです。権限不足の場合は、割り当て可能な運営・管理者に依頼します。

参考：[Azure LoginのOIDC接続](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect)・[User assigned managed identityのFederated credentials](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation-create-trust-user-assigned-managed-identity)。Environment名・リポジトリ名は一致させます。この教材のジョブは`production`を使うため、Entity typeをBranchとして登録しません。

## 4. 公開を有効にする

GitHubの **Settings → Secrets and variables → Actions → Variables** に、次のRepository variablesを追加します。この表のIDは接続先の識別子であり、アプリのAPIキーやパスワードを入れる欄ではありません。

| 名前 | 値 |
| --- | --- |
| `AZURE_CLIENT_ID` | 手順3のUser assigned managed identityのClient ID |
| `AZURE_TENANT_ID` | AzureのTenant ID |
| `AZURE_SUBSCRIPTION_ID` | 使用するSubscription ID |
| `AZURE_RESOURCE_GROUP` | 手順2のリソースグループ名 |
| `AZURE_CONTAINER_APP_NAME` | 手順2のContainer App名 |
| `ENABLE_CONTAINER_PUBLISH` | `true`（手順1で設定済み） |
| `ENABLE_AZURE_DEPLOY` | `true` |

**Actions → Check → Run workflow → main** で実行します。`check` → `publish` → `deploy`が成功し、Summaryに公開URLが表示されれば初期設定は完了です。以降は`main`へのマージで同じ流れが動きます。

`deploy`は既存アプリへテスト済みイメージのdigestを指定して更新します。Single revision modeで新しいリビジョンが準備できるのを待ち、公開URLの`/api/health`を確認します。アプリの動作確認は[公開手順](publish.md#4-公開urlで確認する)へ戻って行います。

## 5. 利用を終えるとき

公開の自動更新を止めるときは`ENABLE_AZURE_DEPLOY`を`false`にします。イメージの公開も止める場合は`ENABLE_CONTAINER_PUBLISH`も`false`にします。**この設定だけでは、Azure上のアプリやDBは停止・削除されません。**

発表後の継続利用をチームで決め、不要になったリソースはAzure portalから停止・削除します。チーム専用リソースグループごと削除する場合は、残したいDBやデータが含まれていないか確認してから行います。残す場合は **Cost Management** で使用額・クレジット残量を確認します。
