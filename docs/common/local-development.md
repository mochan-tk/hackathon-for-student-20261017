# SWA CLIで動作確認する

開発中は **Azure Static Web Apps CLI（SWA CLI）のエミュレーター**を使います。PCでもCodespacesでも同じコマンドで起動します。エミュレーターだけの利用にAzureリソースの作成やログインは不要です。Codespaces自体の利用時間は消費します。

## 起動する

Node.js 24で、リポジトリのルートから実行します。SWA CLIは開発依存に含まれているので、グローバルインストールは不要です。

```sh
npm ci
npm run dev
```

`Azure Static Web Apps emulator started at http://127.0.0.1:4280` と表示されたら、次の入口を開きます。

| 実行する場所 | ブラウザで開く場所 |
| --- | --- |
| PC（Copilot appなど） | `http://127.0.0.1:4280` |
| Codespaces | **Ports → 4280 → Open in Browser** |

4280番のSWA CLIが、裏側の5173番のViteへ接続します。画面の修正はホットリロードされます。確認の入口は4280番にそろえます。起動を終えるときは実行したターミナルで **Ctrl+C** を押します。

Codespacesで4280が見えなければ **Forward a Port** で追加します。以前から開いているCodespaceでは **Codespaces: Rebuild Container** でdevcontainerの変更を反映できます。ポートは **Private** のまま使い、チーム内の手動確認は同じPCで交代して操作できます。転送URLはCodespaceとサーバーの起動中だけ使えます。

Copilot appで編集し、Codespacesで実行する場合は、**確認したい変更ができるたびに学生がAppの画面でcommit・pushします。** 初回はその作業ブランチからCodespaceを作成し、2回目以降はCodespacesの **Source Control → … → Pull** で変更を取り込んでから確認します。詳しくは[Appのガイド](../copilot-app.md#codespacesへ変更を渡して確認する)を参照してください。

## ビルドしたアプリとテスト

公開するファイルを確認する場合は、開発サーバーとは別に次を実行できます。

```sh
npm run build
npm run preview
```

この場合は **4281番** を開きます。`dist/`をSWA CLIから配信するため、変更後は再ビルドが必要です。[public/staticwebapp.config.json](../../public/staticwebapp.config.json)も`dist/`直下にコピーされます。画面のURLを直接開くためのfallbackと、API・アセットをその対象から外す設定を含みます。

```sh
npm run check
npm run test:e2e
```

E2Eは自分でビルドし、4281番にSWA CLIを起動してPC・スマホ幅の操作を確認します。手動の`npm run preview`が動いていたら **Ctrl+C** で止めてから実行してください。開発用4280番は動かしたままで構いません。

## API・認証・DBを追加するとき

初期スターターにはAPI・DB・ログイン機能はありません。企画に必要なら最初から実装対象に含め、画面だけで完成と判断しません。

Azure Functionsプロジェクトを`api/`へ実装した後は、開発サーバーを止め、次の形で一緒に起動できます。Functions Core Toolsと、APIが使用する言語ランタイムが必要です。

```sh
npm run dev -- --api-location ./api
```

フロントエンドからは `fetch('/api/エンドポイント名')` のように呼びます。通常の起動にも含めるときは`package.json`の`dev`・`preview`とテスト設定を更新し、APIへの操作もテストしてください。TypeScriptのAPIならAPI自身のビルドも必要です。`npm run build`は初期状態ではフロントエンドだけをビルドします。

フロントのNode.js 24と、Azureで動かすAPIのランタイムは別に選びます。基準日時点のSWA管理APIではNode.js 22が公式一覧にあるため、Node APIを使う場合はローカルのAPI実行環境と公開設定も対応する版にそろえます。[対応ランタイム](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#select-the-api-language-runtime-version)を確認してください。

SWAの `/.auth/login/github` では仮のユーザーとロールを使った認証確認ができます。本物のGitHubログインはAzure公開後に確認します。DBや外部AI APIはエミュレーターに含まれないので、開発用の接続先やモックを別に用意し、何を模擬しているか[検証記録](../verification.md)へ残します。秘密のAPIキーはフロントエンドや`VITE_`変数に入れず、サーバー側で使います。

## うまくいかないとき

| 状況 | 確認すること |
| --- | --- |
| URLが開かない | 起動完了の表示、4280の転送、Codespaceが停止していないか |
| ポートが使用中 | 自分が前に起動したサーバーを元のターミナルでCtrl+C終了。別のプロセスを無条件に終了しない |
| 画面が以前のまま | 編集した環境・ブランチ・コミット番号、push／pull、previewなら再ビルド |
| 設定・依存を変えて動かない | サーバーを終了し、依存変更時はnpm ciして再起動 |
| Codespacesでホスト拒否・ホットリロード失敗 | 最新のvite.config.ts、CODESPACE_NAME、GITHUB_CODESPACES_PORT_FORWARDING_DOMAINを確認。allowedHostsをtrueにして回避しない |

SWA CLIのローカル起動はAzure公開を完全には再現しません。継続して使うURLを作る場合は[公開手順](publish.md)へ進み、公開先でも完成条件を確認します。

公式資料：[SWA CLIの起動](https://azure.github.io/static-web-apps-cli/docs/cli/swa-start/) · [ローカル認証](https://azure.github.io/static-web-apps-cli/docs/cli/local-auth/) · [Codespacesのポート転送](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)
