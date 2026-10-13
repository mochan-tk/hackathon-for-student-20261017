# 学生ハッカソン：初心者向けスターター

**前段でまとめた企画を `docs/` に置き、GitHub CopilotのPlanへ渡して開発します。** PDF、画像、Markdownなど、形式とファイル名はチームで決めて構いません。UI画像やFigmaの準備は必須ではありません。

このコースはReact・TypeScript・Vite・Node.js、起動・テスト・CIを用意しています。機能と画面はチームの企画で決めます。構成から選びたいチームは[mainコース](https://github.com/mochan-tk/hackathon-for-student-20261017/tree/main)を使います。

**Fork → 環境を開く → 企画を渡す → Plan → 作る・確かめる → PR・発表**。すでに合意・保存した計画がある場合は[再開](#resume)から続けます。

<a id="fork"></a>

## 1. チームのForkを用意する

[![チーム用にForkする](https://img.shields.io/badge/Fork_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mochan-tk/hackathon-for-student-20261017/fork)

代表者1人がForkを1つ作り、メンバーを招待します。チーム用リポジトリがある場合は作り直しません。

1. 上のリンクでFork作成画面を開き、Ownerとチーム用の名前を決めます。
2. 初心者向けは **Copy the main branch onlyをオフ**にして **Create fork** を押します。mainコースを選ぶ場合はオンです。
3. チームのForkで **Settings → General → Default branch** を開き、`codex/beginner-starter`へ変更します。
4. **Code** で所有者・リポジトリ名・ブランチと、この初心者向けREADMEを確認します。以降はチームのForkで作業します。
5. **Settings → Collaborators** からメンバーを招待し、各メンバーが招待を受け入れます。各自で別のForkを作る必要はありません。

Publicの教材から作るForkもPublicです。共有できる企画・コード・ダミーデータを使い、Privateが必要なら作成前に運営へ相談します。以前のTemplate方式のリポジトリも継続できますが、ForkではないためSync forkは使いません。

<a id="enable-actions"></a>

### Actionsを有効にする

代表者がチームのForkの **Actions** を開き、有効化の案内が出たら内容を確認して有効にします。使えない場合は **Settings → Actions → General** と所有者のポリシーを運営と確認します。

初回に試すなら **Actions → Check → Run workflow** で`codex/beginner-starter`を選び、OIDC表示用のチェックを外します。公開用変数を設定しなければテストだけが動き、Azureの準備は不要です。この手動実行は、後で作るPRの最新CIの代わりにはしません。

## 2. 使う環境を開く

[![ページ上部のCodeへ](https://img.shields.io/badge/Code_%E2%86%92_Codespaces-238636?style=for-the-badge&logo=github&logoColor=white)](#)

**先にチームのForkを作成し、チーム側のREADMEで使ってください。** 上のボタンでページの一番上へ戻り、緑色の **Code → Codespaces → Create codespace** を選びます。READMEをファイル単体で表示している場合は、先にページ上部の **「<> Code」タブ**を押します。チームの所有者・リポジトリ名と `codex/beginner-starter` ブランチを確認してから作成してください。メニューは自分で開きます。マシンを選べる場合は、まず2-coreを使います。準備が終わったら、下のCodespacesガイドでCopilotの設定と作業ブランチの作成を続けます。

作成済みなら[Codespaces一覧から再開](https://github.com/codespaces)できます。Appで編集した変更の確認には、[push済みの作業ブランチを開く手順](handson/copilot-app.md#codespaces-transfer)を使います。

| 編集・動作確認する場所 | 環境の操作手順 |
| --- | --- |
| CodespacesのCopilot Chat | [Codespaces](handson/codespaces.md) |
| Copilot appで編集し、PCまたはCodespacesで確認 | [Copilot app](handson/copilot-app.md) |

学生アカウントでCopilot Studentの有効化と利用残量を確認し、モデルは **Auto** を使います。GitHub ProとCopilotの利用権利は別です。環境ガイドはその時点の操作だけ読み、作業ブランチと実行場所を準備したら、この下へ戻ります。開発の進め方はこのREADMEを本線にします。

<a id="prepare-docs"></a>

## 3. 前段の企画をdocsへ置く

作業ブランチの **`docs/` 直下**へ、チームでまとめた企画ファイルを追加します。例は `docs/企画.pdf`、`docs/メモ.md`、`docs/検討結果.png` です。ファイル名や形式をそろえたり、別の企画書へ転記したりする必要はありません。[置き方の案内](docs/README.md)も参照できます。

Copilotへ渡すファイル名を具体的に選びます。画像やPDFを読み取れるかは環境によるため、読めなかった部分は本文の貼り付けや読み取れる形式で補います。画面の資料がなくても、企画の本文から必要な画面・操作を相談できます。

<a id="plan"></a>

## 4. Planで相談し、合意した計画を保存する

Copilotを **Plan** にして次を送ります。ファイル名を実際のものへ置き換え、編集・実行場所も選んだ環境に合わせます。

```text
目的：
前段でまとめた企画をもとに、ハッカソンで実装する範囲と計画を相談したいです。

文脈：
prepare-projectスキルと、docs/＜実際のファイル名。複数なら列挙＞を読んでください。
この初心者向けスターターの構成を使います。
編集場所：＜Codespaces / PCのCopilot app＞
実行・ブラウザ確認の場所：＜Codespaces / PC＞

制約：
最初に、読めた資料の要点と、読めなかった資料・箇所を示してください。
docs/README.mdは置き方の案内であり企画の入力ではありません。元資料は上書きしないでください。
読めない内容を推測せず、必要なら補足を求めてください。
資料にある合意を尊重し、決まっていることは質問し直さず、不足・矛盾だけ確認してください。
UI画像は必須にせず、必要な画面と操作を提案してください。
このPlanではファイルを編集せず、実装も始めないでください。

完成条件：
目的、対象者、作る範囲と対象外、完成条件（操作と期待結果）、
作業順、構成、編集・実行場所、起動・確認コマンドを草案として示してください。
既存の合意と今回の提案・未決定事項を区別し、チームが確認できる状態にしてください。
```

スキルが認識されなければ `.github/skills/prepare-project/SKILL.md` を明示します。チームで草案を確認し、**CodespacesはAgent、AppはInteractive**に切り替えて、次を依頼します。

> 合意した内容をルートのPLAN.mdへ保存してください。入力資料のパス、目的・完成条件・対象外・作業順・構成・編集と実行の場所・起動と確認のコマンドを残し、アプリの実装はまだ始めないでください。

`PLAN.md`はここで初めて作ります。企画の原本は`docs/`に残し、その後の仕様変更はPLANも更新します。Appで編集してCodespacesで実行する場合は、その分担を明記し、[GUIで変更を渡す手順](handson/copilot-app.md#codespaces-transfer)で最初の起動を確認してから次へ進みます。

<a id="build"></a>

## 5. 作って、確かめて、直す

Agent／Interactiveへ次を送ります。

```text
目的：
PLAN.mdの最初の未完了タスクから、合意した完成条件まで実装・確認・修正してください。
文脈：
PLAN.md、関係する入力資料・コード・テストを読み、PROGRESS.mdがあれば引き継いでください。
制約：
合意した範囲と編集・実行場所を守ってください。commit・pushは自分でGUIから行います。
Appで編集しCodespacesで実行する場合は、確認したい変更ごとに変更内容・コミット案・確認コマンドを示し、結果が返るまで待ってください。
判断・認証・外部サービスの準備が必要なら、理由と次の操作を知らせてください。
完成条件：
対応する完成条件を確かめるテストを用意し、npm run checkとnpm run test:e2eで確認してください。
並び替えなど期待結果が明確な機能は、未実装時のテスト失敗も確認してください。
verify-goalで照合し、作業状態・実行場所・操作と結果・未達や未確認・次の作業をルートのPROGRESS.mdへ残してください。
実行していない確認を成功にせず、範囲内の不具合は修正して再確認してください。
```

`PROGRESS.md`も必要になった時点で作ります。認識されないSkillは `.github/skills/verify-goal/SKILL.md` を明示します。短い修正は差分と期待結果だけ伝えて構いません。同じ条件で確認済みのテストを、変更なしで繰り返す必要はありません。

| 用途 | コマンド・確認先 |
| --- | --- |
| 初回・依存変更時の準備 | `npm ci`（Node.js 24） |
| 普段の起動 | `npm run dev`。画面とAPIは4280。Docker不要 |
| lint・型・本番ビルド | `npm run check` |
| ブラウザテスト | `npm run test:e2e`。本番サーバーの4281で自動確認 |
| 本番表示の手動確認（任意） | `npm run build`の後に`npm run preview`。4281を開く。E2E前にはこのpreviewを止める |

`tests/starter.spec.ts`を自分たちの完成条件のテストへ更新し、`tests/runtime.spec.ts`のAPI・画面配信のテストは残します。初期テストの成功だけで企画の完成とはしません。

APIは`server/api.js`へ追加し、画面から`/api/...`で呼びます。外部サービスが必要なら[.env.example](.env.example)を参考に各実行場所の`.env`へ設定し、変更後に再起動します。`.env`はPC・Codespaces・CI・Azureへ自動同期されません。秘密のキーを画面や`VITE_`変数へ入れず、CIでモックを使った結果と実サービスの確認を区別します。共有・永続データが必要なら外部DBなどを選びます。

<a id="verify"></a>

## 6. チームでも操作する

実装した人とは別の学生が、起動済みのアプリでPLANの完成条件を確かめます。同じPCで交代して構いません。主要な操作を最初から最後まで通し、その機能に関係する空の状態・入力ミス・戻る操作・スマートフォン幅を試します。

PROGRESSへ、対象の変更・実行場所・日時、操作と期待結果、実際の結果を残します。条件ごとに **達成／未達／未確認**を区別し、不具合は再現操作と結果をCopilotへ返します。修正したら影響する条件を再確認します。日付や保存、長文、複数タブなどの境界は、企画で採用した機能に必要なものだけ選びます。

ブラウザをAIが操作できなくても、Playwrightと学生の操作で進められます。失敗したE2Eの画像・traceは`test-results/`、CIでは **Check → Summary → Artifacts → playwright-failure-evidence**に残ります（3日保存。実行前の失敗では生成されない場合があります）。

<a id="share"></a>

## 7. 保存して、チーム内PRで共有する

環境ガイドの[Codespaces](handson/codespaces.md#save-and-share)／[App](handson/copilot-app.md#save-and-share)のGUIで、コード・PLAN・PROGRESS・共有してよい入力資料をcommit・pushします。GitHubのチームForkで **Compare & pull request** を開き、必要なら **compare across forks** で次を選びます。

| 比較の項目 | 選ぶもの |
| --- | --- |
| base repository・head repository | どちらもチームのFork |
| base | `codex/beginner-starter` |
| compare | 今回の作業ブランチ |

配布元や別コースへ学生アプリのPRを送りません。AppのCreate PRでも送信前に比較先を確認し、確認できなければGitHubから作成します。作成後もGitHubで確認します。

CIは本番コンテナでもテストします。**Check** の成功を確認したら、PROGRESSにPR・CIのURL、対象変更と結果を記録し、GUIで追記分をcommit・pushします。その後、チームで最新のCheck・差分・操作結果を確認してマージします。記録だけのコミットごとに同じCI結果を追記し続ける必要はありません。

CIが始まらなければ[Actionsの有効化](#enable-actions)を確認します。有効化前に作ったPRは実行済みとは扱わず、設定確認後に同じ未マージPRを **Close → Reopen** してCheckを開始できます。

<a id="finish"></a>

## 8. 発表して、保存・終了する

確認済みのプレビューを使い、「誰の何を解決するか → 主要操作のデモ → 確認できたこと → 残ること」を説明します。CodespacesのPrivate URLはログイン済みPCから投影できます。利用者の課題を解決できたか未検証なら、仮説として話します。

前のPRをマージ済みなら、まず[次の作業ブランチを準備](#after-merge)します。その後、発表で得た気づきと次の作業をPROGRESSへ残し、GUIで保存・pushして[PRで共有](#share)します。記録だけの変更ならCodespacesやアプリの再起動は不要です。サーバーを止め、Codespacesを使った場合は **Stop codespace** も行います。環境ごとの終了方法は[Codespaces](handson/codespaces.md#stop)／[App](handson/copilot-app.md#stop)を参照します。

継続して使えるURLが必要なチームだけ、運営と[Azure Container Appsへの公開](handson/azure.md)へ進みます。公開した場合は同ガイドの終了・費用確認も行います。

<a id="resume"></a>

## 続きから再開する

同じプロジェクトと作業ブランチを開きます。PLANが未作成なら[Plan](#plan)へ戻り、合意済みの内容から保存します。PLANがある場合は、PLAN・PROGRESS（あれば）と現在の変更を読んで「最後の確認・未完了・次の作業・実行場所」を説明するようCopilotへ依頼します。資料の読み直しや合意済みのPlanを最初から繰り返す必要はありません。

追加編集の前に、前のPRがマージ済みなら[新しい作業ブランチ](#after-merge)を準備し、未マージなら同じ枝を続けます。計画が未決定なら[Plan](#plan)、実装途中なら[実装](#build)、操作確認待ちなら[確認](#verify)、PR・CIが未完了なら[共有](#share)、マージまで済んだら[発表](#finish)へ進みます。起動中の同じ環境のアプリは再利用し、環境を変えた場合はその場所で起動と基本動作を確認します。

<a id="after-merge"></a>

### マージ後に編集するとき

確認済みアプリで発表するだけなら、そのまま使えます。追加編集は、未保存の変更がないことを確認してチームの既定ブランチを最新にし、新しい作業ブランチを作ってから始めます。Copilotへこの準備を依頼できます。未保存や競合があれば保全して運営へ相談し、削除・強制操作で進めません。準備済みの新しい枝は再利用し、PRの状態はGitHubでも確かめます。

App→Codespacesでアプリを再確認する変更なら新しい枝をpushしてCodespacesも切り替えます。記録だけの変更ならPCから保存・PRで共有でき、同じ操作確認は不要です。準備したら、実装・発表後の記録・公開結果の記録など、元の作業へ戻ります。

<a id="sync-fork"></a>

### 教材の更新を取り込むとき

Sync forkは運営の案内があったときだけ使います。作業をcommit・pushし、配布元とチーム側の同じコースを同期します。各PC・Codespacesでも最新を取得し、進行中なら差分を確認して基準ブランチの変更を作業ブランチへ取り込みます。作業ブランチのPullだけでは入りません。前のPRをマージ済みなら更新済み基準から次の枝を作ります。競合は保全して運営へ相談します。

[公式根拠・運営の確認範囲](handson/references.md)は必要なときに参照してください。
