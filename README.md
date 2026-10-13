# 学生ハッカソン：GitHub Copilotと作る

**企画資料を `docs/` に置く → CopilotのPlanで相談する → 作って確かめる → 発表する。**

前段のワークで考えた課題・アイデアを使って開発します。資料はPDF・画像・Markdown・テキストなど、チームが用意した形式で構いません。**UIのイメージ画像やFigmaの作成は必須ではありません。** このREADMEを本線にして、環境の操作だけ下のガイドで確認します。

<a id="fork"></a>

## 1. チーム用のForkを作る

[![チーム用にForkする](https://img.shields.io/badge/Fork_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mochan-tk/hackathon-for-student-20261017/fork)

代表者が1つ作り、メンバーを招待します。Publicの教材から作るForkもPublicです。公開してよい資料を使い、非公開での開発が必要なら作成前に運営へ相談してください。作成済みのチームは、そのリポジトリを使って続けます。

| コース | Fork作成画面の「Copy the main branch only」 | チームの既定ブランチ |
| --- | --- | --- |
| 構成から相談して作る（このページ） | オン | `main` |
| 初心者向けスターター | オフ | 作成後に `codex/beginner-starter` へ変更 |

1. ボタンからFork作成画面を開き、Ownerとチーム用のRepository nameを選びます。
2. 表のチェック設定にして **Create fork** を押します。表示中のブランチだけが自動的にコピーされるわけではありません。
3. 初心者向けはチーム側の **Settings → General → Default branch** を変更します。React・TypeScript・Vite・Node.jsの準備済み構成を使えます。
4. **Settings → Collaborators** でメンバーを招待し、全員が同じチームのForkを使います。以後は、チーム側の選んだブランチのREADMEで進めます。

<a id="enable-actions"></a>

**Actionsもチーム側で確認します。** 有効化の案内が出たら内容を確認して有効にします。mainには最初はアプリもCIもありません。一覧がなくても進め、最初のCIを作った後にPRで実行を確認します。初心者向けは既存の **Check** を使います。動かない場合は、PRの送り先・ワークフローの条件・**Settings → Actions → General** を運営と確認します。有効化前のPRは実行済みとは扱わず、標準の`pull_request`設定なら **Close → Reopen** で再実行できます。mainでは生成した条件を確認してから操作します。

## 2. 開発環境を開く

[![ページ上部のCodeへ](https://img.shields.io/badge/Code_%E2%86%92_Codespaces-238636?style=for-the-badge&logo=github&logoColor=white)](#start-of-content)

**先にチームのForkを作成し、チーム側のREADMEで使ってください。** 上のボタンでページ上部へ戻り、緑色の **Code → Codespaces → Create codespace** を選びます。READMEをファイル単体で表示している場合は、先にページ上部の **「<> Code」タブ**を押します。チームの所有者・リポジトリ名と `main` ブランチを確認してから作成してください。メニューは自分で開きます。マシンを選べる場合は、まず2-coreを使います。準備が終わったら、下のCodespacesガイドでCopilotの設定と作業ブランチの作成を続けます。

作成済みなら[Codespaces一覧から再開](https://github.com/codespaces)できます。Appで編集した変更の確認には、[push済みの作業ブランチを開く手順](handson/copilot-app.md#codespaces-transfer)を使います。

| 使う環境 | 準備・操作のガイド |
| --- | --- |
| CodespacesのVS Codeで編集・実行する | [Codespaces](handson/codespaces.md) |
| PCのGitHub Copilot appで編集する | [Copilot app](handson/copilot-app.md)。実行先はPCまたはCodespacesを選べます |

GitHub Copilot StudentとGitHub Proを使う想定です。利用権利と残量を確認し、モデルは **Auto** を使います。ガイドに沿って、チームの基準ブランチから作業ブランチを作ったら次へ進みます。

<a id="prepare-docs"></a>

## 3. 企画資料をdocs直下へアップロードする

前段で作った課題シートやアイデアのメモなど、**今回Planに渡したいファイルを `docs/` の直下に置きます。** 名前や形式を揃える必要はありません。画像は資料として使いたい場合だけ追加します。

- **Codespaces**：Explorerの`docs`を右クリックして **Upload**、またはファイルをドラッグして追加します。
- **Copilot app**：cloneしたプロジェクトをFinder／Explorerで開き、`docs`にコピーします。
- GitHubから先に追加する場合は、チームの**作業ブランチ**で`docs`を開き、**Add file → Upload files**で保存します。既存のPC・Codespaceには、その同じブランチをGUIのPullで取り込みます。

置き方の例は[docsの案内](docs/README.md)にあります。`docs/README.md`は案内なので、企画の入力資料には含めません。アップロードしただけでCopilotに内容が伝わったとは判断せず、次のPlanで実際のファイルを指定します。

<a id="plan"></a>

## 4. CopilotのPlanに渡して相談する

Copilot Chat／Appを **Plan** にし、使うファイルをチャットへ参照・添付して、次を送ります。ファイル名と編集・実行場所は、チームのものに置き換えてください。

```text
目的：
prepare-projectを使い、企画資料からハッカソンで作る最小のアプリと開発計画を提案してください。

文脈：
今回使う資料は docs/＜実際のファイル名＞ です。複数ある場合はここに列挙します。
編集する場所は＜Codespaces／PCのCopilot app＞、実行する場所は＜Codespaces／PC＞です。
資料と現在のリポジトリを確認し、読めたファイル・読み取った要点・読めなかったファイルを最初に示してください。

制約：
資料にある事実・チームの決定・あなたの提案を分けてください。
UI画像はなくても進め、必要な画面や操作を提案してください。
不明点はまとめて質問し、読めない資料の内容を推測しないでください。
このPlanではファイルを編集せず、実装を始めないでください。

完成条件：
誰の何を解決するか、最小の機能、実際に操作して確かめられる完成条件、今回は作らないもの、
採用する構成・実行場所・作業順・確認方法が、チームで判断できる草案になっていること。
```

PDFや画像を読めるかは利用環境によって異なります。読めないときは、必要な本文をチャットへ貼るか、要点をMarkdown／テキストにして`docs/`へ追加し、指定し直します。画面案を作り直す必要はありません。Skillが認識されない場合は、[prepare-project](.github/skills/prepare-project/SKILL.md)を明示して読み込ませます。

チームで草案を確認したら、Codespacesは **Agent**、Appは **Interactive** に切り替え、次を送ります。

> 合意した内容をリポジトリ直下のPLAN.mdへ保存してください。参照した資料、目的・完成条件・対象外、作業順、技術構成と編集・実行場所、起動・確認方法を簡潔にまとめてください。まだ作っていないコマンドは予定と明記し、実装はまだ始めないでください。

`PLAN.md`はこの段階で作ります。事前の記入用テンプレートはありません。既に合意した計画があれば再利用し、変わった点だけ相談・更新します。

<a id="build"></a>

## 5. 作って、動かして、直す

引き続きAgent／Interactiveで依頼します。

```text
目的：PLAN.mdの最初の未完了の作業から実装し、完成条件まで確認・修正を進めてください。
文脈：PLAN.md、存在すればPROGRESS.md、必要な元資料と現在のコードを使ってください。
制約：合意した範囲と実行場所を守ってください。commit・pushは学生がGUIで行います。
Appで編集してCodespacesで実行する場合は、変更を渡す手順を示し、学生の確認結果を待ってください。
完成条件：必要な起動方法・テスト・PR用CIがあり、実際に動くコマンドがPLAN.mdに記録されていること。
実行した確認と結果、未達・未確認、次の作業をリポジトリ直下のPROGRESS.mdへ簡潔に残してください。
```

mainには初期アプリがないため、採用する技術に合う最小構成から作ります。依存関係・テスト・CIも必要なものを用意します。まだ存在しない`npm`コマンドやAppのRun設定を、そのまま実行しないでください。日常の開発にDockerやAzureは必須ではありません。

起動操作は[Codespaces](handson/codespaces.md#run)／[Copilot app](handson/copilot-app.md#run)を使います。Appで編集してCodespacesで実行する場合は、[GUIで変更を渡す手順](handson/copilot-app.md#codespaces-transfer)を使います。

<a id="verify"></a>

## 6. チームで操作して確かめる

実装した人とは別の学生が、完成条件に対応する主な操作を試します。同じPCで交代して構いません。機能に応じて、空の状態・入力ミス・保存後の再表示・戻る操作・スマートフォン幅も確認します。

`PROGRESS.md`には、確認した条件・操作やコマンド・実行場所・実際の結果と、**達成／未達／未確認**を残します。AIの完了報告や画面表示だけでは完成とせず、未達は再現する操作と結果をCopilotへ返して直します。自動テストは完成条件から期待値を決め、合格させるために条件を弱めません。

必要なら「[verify-goal](.github/skills/verify-goal/SKILL.md)でPLAN.mdの完成条件と操作・テスト結果を照合し、未達を修正してください」と依頼します。同じ変更・同じ環境で確認済みのテストは繰り返さず、変更の影響や残る未確認に応じて再確認します。利用者の困りごとを解決できたかは、動作確認と分けて振り返ります。

<a id="share"></a>

## 7. 保存してチーム内のPRを作る

[CodespacesのGUI](handson/codespaces.md#save-and-share)／[AppのGUI](handson/copilot-app.md#save-and-share)で差分を確認し、commit・pushします。PR作成前に、**base repositoryとhead repositoryは同じチームのFork、baseはチームの既定ブランチ、compareは作業ブランチ**であることを確認します。必要ならGitHubの **compare across forks** で選びます。Appで送り先を事前に確認できない場合は、GitHubの比較画面から作成します。

PRでCIが実際に動き、成功したことを確認します。チェックがない・未実行・Skippedは成功ではありません。[Actionsの確認](#enable-actions)も使ってください。CIのURL・対象変更・結果を`PROGRESS.md`へ追記して保存し、最新のチェックと差分をチームで確認してマージします。記録だけの追加で同じ結果を際限なく追記する必要はありません。

<a id="finish"></a>

## 8. 発表して終了する

誰の何を解決するアプリかを説明し、主な操作を実演します。完成条件の達成・未達・未確認、Copilotとの作業で工夫したこと、次に改善したいことを伝えます。CodespacesやPCのプレビューで発表できます。

継続して使えるURLが必要なチームだけ、[Azure Container Appsへの公開](handson/azure.md)へ進みます。発表後に記録を追加する場合、PRをマージ済みなら先に[次の作業ブランチ](#after-merge)を用意します。学びと残る作業を`PROGRESS.md`へ残し、[保存・PR](#share)で共有します。

サーバーを停止し、Codespacesなら[一覧](https://github.com/codespaces)から **Stop codespace** も行います。AppのRunは **Stop Run**、Terminalで起動したものは元のTerminalで`Ctrl+C`を使います。Azureを使った場合だけ、公開ガイドの利用終了も確認します。

<a id="resume"></a>

## 続きから再開する

チームの作業ブランチを開き、`PLAN.md`がまだなければ[Planの段階](#plan)から続けます。作成済みなら「PLAN.md、存在すればPROGRESS.mdと現在の変更を読み、決まっていること・未完了・次の作業・実行場所を確認してください」とCopilotへ渡します。企画資料のアップロードや合意済みのPlanを毎回やり直す必要はありません。未マージのPRは同じブランチで続けます。

<a id="after-merge"></a>

**PRをマージ済みで追加編集する場合**は、未保存の作業を確認してからCopilotへ「チームの既定ブランチの最新を取得し、新しい作業ブランチを作ってください。未保存の変更や競合を削除・強制操作で解決せず知らせてください。実装やcommit・pushはまだしないでください」と依頼します。App→Codespacesでアプリを再確認する変更なら、その新しいブランチをpushしてから同じブランチで開きます。記録だけの変更は、PCから保存・PRを進められます。

<a id="sync-fork"></a>

教材の更新は運営から案内があったときだけ **Sync fork** で同じコースへ取り込みます。先に作業を保存・pushし、同期後は基準ブランチの最新を各環境で取得します。進行中ならその変更を作業ブランチにも取り込み、競合は運営へ相談します。mainと初心者向けを混ぜません。

## 工夫の根拠・運営向け確認

[プロンプト・コンテキスト・ハーネスの工夫と公式資料](handson/references.md)に、採用した考え方と配布前の確認をまとめています。参加者は必要なときに参照してください。
