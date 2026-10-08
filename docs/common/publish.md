# URLで共有できるように公開する

基本の公開先はGitHub Pagesです。ブラウザ内にデータを保存するアプリを、公開URLで操作できるようにします。利用者ごとのブラウザ内データは、他の利用者と共有されません。

## GitHub Pagesへ公開する

1. [完成確認](verification.md)を終え、変更をGitHubへpushします。
2. リポジトリの **Settings → Pages → Build and deployment** で、Sourceを **GitHub Actions** にします。
3. **Actions → Deploy to GitHub Pages → Run workflow** で `main` を選び、手動実行します。公開用設定は[pages.yml](../../.github/workflows/pages.yml)です。pushやPRのチェックでは公開されません。
4. workflowの完了後、Pagesに表示されたURLを開きます。
5. 公開URLで必須DoDに対応する主要な操作経路と必須DoDを手動確認し、[verification.md](../verification.md)にURLと結果を追記します。開発環境での成功を、公開環境の成功として転記しません。

ActionsやPagesの設定が見えない場合は、リポジトリの権限と公開設定を確認します。GitHub Proでは非公開リポジトリからもPagesを利用できますが、通常のPagesのサイトは公開されます。公開してよいコード・画像・文書だけを含めてください。[Pages公式ガイド](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

## 共有データやアプリ内AIが必要な場合

複数の利用者で同じデータを使う、秘密のAPIキーを使う、サーバー側で処理する、といった要件があるチームはAzureを発展課題として検討します。

- 静的画面とHTTP API： [Azure Static Web Appsのプラン](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)、[Managed Functionsの条件](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions)
- 共有DB：APIを経由してアクセスする構成を選びます。[Cosmos DB Free Tierの条件](https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier)
- アプリ内AI：モデル・地域・利用枠を確認します。[Foundryのクォータ](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/quotas-limits)、[学生・Marketplaceモデルの制約](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-from-partners)

この教材ではAzureへの展開は実動作未検証です。学生クレジットがあることだけで利用可能・無料と判断せず、対象サービスと利用条件を確認してください。[Azure for Studentsの条件](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/)

**AIやDBの秘密のAPIキーを、ブラウザへ配信するコードに入れないでください。** APIキーが必要な処理はサーバー側で行います。追加支出や有料契約が必要なら、対象と理由を確認してから進めます。
