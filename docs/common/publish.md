# 動くアプリで発表し、Azureへ公開する

開発中の動作確認は[SWA CLI](local-development.md)に統一します。PC・Codespacesのプレビューで完成条件を確認し、その画面で発表できます。Codespacesの転送URLは起動中の確認用であり、継続して使える公開URLではありません。

継続して共有する場合は、同じアプリを **Azure Static Web Apps** へ公開します。この教材にGitHub Pagesのデプロイ手順はありません。

## 1. 公開する変更をそろえる

1. [完成確認](verification.md)を終え、変更と検証記録をGitHubへpushします。
2. PRとCIの結果をチームで確認し、`main`へマージします。
3. 公開作業をするPCまたはCodespacesで、未コミット変更がないことを確認してから`main`を取得します。

```sh
git status
git switch main
git pull --ff-only origin main
npm ci
npm run check
npm run test:e2e
```

## 2. Azureの公開先を準備する

この段階からAzureアカウントと利用できるサブスクリプションが必要です。学生クレジットがあることだけで、すべてのサービスが利用可能・無料とは判断しません。[Azure for Studentsの条件](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)と[SWAのプラン](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)を確認します。

運営・メンターと、対象サブスクリプション、リソースグループ、アプリ名、プランを決めます。Azure portalの **Static Web Apps** から公開先を作成します。まずFreeプランの条件を確認し、ソースは手動デプロイ向けの **Other** を選びます。既存のチーム用SWAがあれば、それを使います。

以下はフロントエンドだけの公開手順です。APIがあるチームは次節も読み、APIを含む配布物とランタイムを用意してから公開します。

## 3. ビルド済みのアプリを公開する

リポジトリのルートで、次の例の`YOUR_...`を準備した公開先の値へ置き換えます。SWA CLIの対話ログインでAzureアカウントを認証します。GitHubへのログインとは別です。

```sh
npx swa login --subscription-id YOUR_SUBSCRIPTION_ID --resource-group YOUR_RESOURCE_GROUP --app-name YOUR_APP_NAME
npx swa deploy ./dist --subscription-id YOUR_SUBSCRIPTION_ID --resource-group YOUR_RESOURCE_GROUP --app-name YOUR_APP_NAME --env production
```

公開対象は、直前にテストした`dist/`です。途中でソースを変更したらビルドとテストをやり直します。想定外のリソース作成を求められたら、名前・サブスクリプション・権限をメンターと確認します。デプロイトークンをコード・チャット・Gitへ貼り付けないでください。参考：[swa login](https://azure.github.io/static-web-apps-cli/docs/cli/swa-login/)・[swa deploy](https://azure.github.io/static-web-apps-cli/docs/cli/swa-deploy/)。

完了後、Azure portalのSWA概要にある公開URLを開きます。必須DoDに対応する操作、URL直接アクセス・再読み込み、API、実際のログインを使う場合はその動作を確認し、[verification.md](../verification.md)にURL・コミット番号・結果を追記します。ローカルの成功を公開先の成功として転記しません。

## API・共有DB・アプリ内AIを使う場合

- **API**：SWAの管理Functionsを使う場合は、フロントに加えてAPIも配布します。例えばNode.js 22向けのAPIなら、上のdeployコマンドへ`--api-location ./api --api-language node --api-version 22`を追加します。TypeScriptなどのビルドと依存関係を用意し、`public/staticwebapp.config.json`の`platform.apiRuntime`も合わせます。[Managed Functions](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions)
- **環境変数**：ローカルの設定は自動でAzureへ移りません。APIの接続情報・秘密情報は、公開先のSWAアプリケーション設定へ登録します。`local.settings.json`はGitへ入れません。[APIの設定](https://learn.microsoft.com/en-us/azure/static-web-apps/application-settings)
- **共有DB**：API経由でアクセスする構成を選びます。ブラウザのlocalStorageに入れたデータは、公開先へ自動では移りません。[Cosmos DB Free Tierの条件](https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier)
- **アプリ内AI**：モデル・地域・利用枠を確認します。秘密のAPIキーが必要な呼び出しはサーバー側で行います。[Foundryのクォータ](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/quotas-limits)・[学生アカウントとMarketplaceモデルの条件](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-from-partners)

Azureへのリソース作成・デプロイは、この教材の作成環境では未実施です。配布前に、学生と同じ条件で[運営のリハーサル](../facilitator.md)を行い、結果を残してください。
