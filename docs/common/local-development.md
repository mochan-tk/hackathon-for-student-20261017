# PC・Codespacesで動作確認する

普段の開発は **`npm run dev`でViteとNode.jsのAPIを起動**します。PCでもCodespacesでも同じコマンドです。DockerやAzureへのログインは不要です。Codespaces自体の利用時間は消費します。

公開時は、ビルド済みの画面とAPIを1つのコンテナにまとめてAzure Container Appsへ配置します。GitHub Actionsがコンテナを起動してテストします。手元でコンテナを確認する手順も、このページの後半にあります。

## 起動する

Node.js 24で、リポジトリのルートから実行します。Copilot appでは、初回の **Setup** が終わったら **Run** を押すと `npm run dev` が実行されます。

```sh
npm ci
npm run dev
```

起動したら、次の入口を開きます。

| 実行する場所 | ブラウザで開く場所 |
| --- | --- |
| PC（Copilot appなど） | `http://127.0.0.1:4280`。Appでは **Run → Browser** |
| Codespaces | **Ports → 4280 → Open in Browser** |

画面とAPIの入口は同じ4280番です。画面の編集はホットリロードされ、APIの保存時はサーバーが自動で再起動します。反映しない場合は一度停止して起動し直してください。起動を終えるときは実行したターミナルで **Ctrl+C** を押します。

Codespacesで4280が見えなければ **Forward a Port** で追加します。以前から開いているCodespaceでは **Codespaces: Rebuild Container** で開発環境の変更を反映できます。ポートは **Private** のまま使い、チーム内の手動確認は同じPCで交代して操作できます。転送URLはCodespaceとサーバーの起動中だけ使えます。

Copilot appで編集し、Codespacesで実行する場合は、**確認したい変更ができるたびに学生がAppの画面でcommit・pushします。** 初回はその作業ブランチからCodespaceを作成し、2回目以降はCodespacesの **Source Control → … → Pull** で変更を取り込んでから確認します。詳しくは[Appのガイド](../copilot-app.md#codespacesへ変更を渡して確認する)を参照してください。

## ビルドしたアプリとテスト

公開用の画面とAPIを、Dockerを使わずに確認できます。

```sh
npm run build
npm run preview
```

PCでは `http://127.0.0.1:4281`、Codespacesでは **Ports → 4281 → Open in Browser** を開きます。Node.jsサーバーが `dist/` の画面と `/api` を配信します。画面を変更した後は再ビルドが必要です。コンテナ内では同じサーバーが起動し、8080番で受け付けます。Dockerを使わず本番サーバーを起動するコマンドは `npm start` です。

```sh
npm run check
npm run test:e2e
```

E2Eは自分でビルドし、4281番に本番用のNode.jsサーバーを起動して、PC・スマートフォン幅の操作とAPIの応答を確認します。手動の `npm run preview` が動いていたら **Ctrl+C** で止めてから実行してください。開発用4280番は動かしたままで構いません。

## API・認証・DBを追加するとき

初期スターターには `GET /api/health` という起動確認用APIがあり、`{"status":"ok"}` を返します。業務用のAPI、DB、ログイン機能は、企画に必要なものを実装します。

APIは [server/api.js](../../server/api.js) に追加し、フロントエンドからは `fetch('/api/エンドポイント名')` のように呼びます。PC・Codespaces・公開先で同じ相対URLを使うため、ブラウザからPCの `localhost` を直接指定する必要はありません。APIの入力チェックと期待する結果もテストに含めます。

DBや外部AIサービスが必要なら、開発用の接続先またはモックを用意します。共有データや残したいデータには外部DBを使い、コンテナ内のファイルやメモリーを永続保存先にしないでください。認証を追加した場合は、本物のログインと公開先での権限を別途確認します。何を模擬しているかは[検証記録](../verification.md)へ残します。

ローカルのサーバー用設定は、[.env.example](../../.env.example)を参考にリポジトリのルートの `.env` に置けます。`dev`・`preview`・`start` はこのファイルを読み込みます。設定を変えたらサーバーを起動し直します。`.env` はGitやコンテナイメージに含めず、公開先では環境変数・シークレットとして設定します。秘密のAPIキーはサーバー側で使い、フロントエンドや `VITE_` 変数に入れないでください。

## コンテナで確認する（任意）

普段の開発は `npm run dev` で進め、公開前に本番用コンテナの画面とAPIを操作したい場合に使います。PCへのDocker導入は必須ではありません。

- **Codespaces**：教材の開発環境にはDocker用の機能を含めています。以前から使っているCodespaceでは、変更を取り込んだ後、コマンドパレットの **Codespaces: Rebuild Container** を実行します。
- **PC**：Dockerを導入して起動してある場合に実行できます。未導入ならCodespacesまたはGitHub Actionsで確認できます。

手動のpreviewやE2Eで4281番を使用中なら停止し、リポジトリのルートで次を実行します。

```sh
docker build -t student-hackathon .
docker run --rm -p 127.0.0.1:4281:8080 student-hackathon
```

PCでは `http://127.0.0.1:4281`、Codespacesでは **Ports → 4281 → Open in Browser** を開き、画面と `/api/health` を確認します。Codespacesの公開範囲はPrivateのままで構いません。終了は **Ctrl+C** です。変更後は再度buildして起動します。

外部サービス用の環境変数が必要な場合は、runに `--env-file .env` を追加できます。ファイルに秘密情報があっても、イメージへコピーする必要はありません。

GitHub ActionsではContainer Appsに対応した `linux/amd64` のコンテナをビルドし、そのコンテナに対してブラウザテストを実行します。公開設定が済んでいれば、確認済みのイメージを公開します。PC上のコンテナ確認だけで、AzureのHTTPS・ログイン・外部サービス接続も確認済みとは扱いません。

## うまくいかないとき

| 状況 | 確認すること |
| --- | --- |
| URLが開かない | 起動完了の表示、使っているポートの転送、Codespaceが停止していないか |
| ポートが使用中 | 自分が前に起動したサーバーを元のターミナルでCtrl+C終了。別のプロセスを無条件に終了しない |
| 画面が以前のまま | 編集した環境と作業ブランチ、push／pull、previewやコンテナなら再ビルド |
| 設定・依存を変えて動かない | サーバーを終了し、依存変更時はnpm ciして再起動 |
| Codespacesでホスト拒否・ホットリロード失敗 | 最新のvite.config.ts、CODESPACE_NAME、GITHUB_CODESPACES_PORT_FORWARDING_DOMAINを確認。allowedHostsをtrueにして回避しない |
| Dockerが見つからない・接続できない | Codespacesなら開発環境の再構築、PCならDockerの起動を確認。日々の開発はnpm run devで続けられる |

継続して使うURLを作る場合は[公開手順](publish.md)へ進み、公開先でも完成条件を確認します。

公式資料：[Codespacesのポート転送](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace) · [Docker用Dev Container Feature](https://github.com/devcontainers/features/tree/main/src/docker-in-docker) · [Container Appsのコンテナ仕様](https://learn.microsoft.com/en-us/azure/container-apps/containers)
