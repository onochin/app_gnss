# GNSS独立化 Phase 2：GitHubリポジトリ作成・Pages設定・公開確認

## 0. 今回の目的

GNSS独立化 Phase 1 により、

```text
/home/newono/ai_proj/app_simulation/gnss-learning-lab
```

へGNSS専用アプリをローカル分離済みです。

現在、

- GNSS第1章～第7章 available
- 第8章以降 未実装
- GNSS専用 `README.md`
- GNSS専用 `AGENTS.md`
- GNSS専用 `doc/HANDOFF.md`
- ローカルGitリポジトリ初期化済み
- commit未作成
- remote未設定
- GitHubリポジトリ未作成
- GitHub Pages未設定

という状態です。

今回のPhase 2では、

> **現在のGNSS独立アプリを新しいGitHubリポジトリとして確定し、GitHub ActionsでGitHub Pagesへ公開し、ローカル版・公開版とも正常に動作することを確認する**

ところまで実施してください。

今回は第8章以降の教材実装には着手しないでください。

---

## 1. 今回使用するGitHub設定

今回のリポジトリ設定は次とします。

```text
GitHub owner:
onochin

repository:
app_gnss

default branch:
main
```

想定GitHubリポジトリ：

```text
https://github.com/onochin/app_gnss
```

想定GitHub Pages：

```text
https://onochin.github.io/app_gnss/
```

GitHub Pages用Vite base：

```text
/app_gnss/
```

**このPhaseでは上記 `app_gnss` を正式なリポジトリ名として扱ってください。**

もしGitHub上に同名リポジトリが既に存在する場合は、上書き・削除・流用せず停止して報告してください。

---

## 2. 作業場所

作業開始ディレクトリ：

```text
/home/newono/ai_proj/app_simulation/gnss-learning-lab
```

今回は原則として、このGNSS独立アプリ内だけを変更してください。

兄弟ディレクトリの、

```text
/home/newono/ai_proj/app_simulation/survey-learning-lab
```

は移行元として参照して構いませんが、変更・commit・pushしないでください。

---

## 3. 正本・優先順位

作業開始前に必ず次を確認してください。

1. `doc/HANDOFF.md`
2. `AGENTS.md`
3. `README.md`
4. 本依頼Markdown
5. 現在の実装
6. 必要な場合のみPhase 1依頼Markdown

特に現在のGNSS専用HANDOFFを正本としてください。

過去の測量理解ラボ全体版HANDOFFは、GNSS独立版の現在仕様の正本として使用しないでください。

内容が異なる場合は、

```text
現在のGNSS実装
↓
gnss-learning-lab/doc/HANDOFF.md
↓
gnss-learning-lab/AGENTS.md
↓
本依頼
↓
過去資料
```

を基本に判断してください。

---

## 4. 作業開始時の安全確認

最初に最低限、次を確認してください。

```bash
pwd
git status --short
git branch --show-current
git log --oneline --decorate -5
git remote -v
```

さらに、

```bash
git rev-parse --show-toplevel
```

でGitルートが、

```text
/home/newono/ai_proj/app_simulation/gnss-learning-lab
```

であることを確認してください。

Phase 1完了時点では、

```text
branch:
main

commit:
なし

remote:
なし

成果物:
未追跡
```

が想定状態です。

現在状態がHANDOFFと大きく異なる場合は、その理由を確認してください。

ユーザーが意図していない既存差分がある場合は、勝手に破棄・stash・restoreせず停止してください。

禁止：

```text
git reset
git checkout -- .
git restore .
git clean
```

---

## 5. Phase 1状態の再確認

GitHub公開へ進む前に、現在のGNSSアプリがPhase 1完了状態であることを確認してください。

最低限：

```text
第1章 gnss-overview
第2章 gnss-observations
第3章 gnss-coordinate-height
第4章 gnss-positioning-methods
第5章 gnss-own-base-station
第6章 gnss-correction-delivery
第7章 gnss-baseline-fix
```

がavailableであること。

さらに、

```text
第8章以降の教材本体
GNSS学習記録
GNSS用localStorage
外部API
実機通信
観測ファイル読込み
```

が未実装であることを確認してください。

今回のGitHub公開を理由に、教材内容を変更しないでください。

---

## 6. Phase 1の初回commit

現在はローカルGitリポジトリだけが初期化され、commitがない状態です。

Phase 2のPages変更を加える前に、まず**Phase 1完了状態を独立した初回commitとして確定**してください。

ただしcommit前に、

```bash
git status --short
```

で対象を確認してください。

`node_modules`、`dist`、キャッシュ、Playwrightブラウザ等がGit管理対象に入っていないことも確認してください。

最低限、次を確認してください。

```text
node_modules/
dist/
.npm-cache/
coverage/
```

が追跡対象になっていないこと。

Phase 1で確認済みの過去prompt 2ファイルには既存の行末空白があります。

それを今回無関係に整形しないでください。

必要に応じて、

```bash
git diff --cached --check -- . ':(exclude)prompt/**'
```

等で新規実装部分を監査してください。

Phase 1初回commitのメッセージ例：

```text
20260813_GNSS独立化Phase1_ローカル分離完了
```

commit後、

```bash
git status --short
git log --oneline --decorate -3
```

を確認してください。

---

## 7. GitHub CLI・認証確認

GitHubへの変更前に、GitHub CLIが利用可能か確認してください。

例：

```bash
gh --version
gh auth status
```

GitHubアカウントが、

```text
onochin
```

として正しく認証されていることを確認してください。

別アカウントへ認証されている場合は、新規リポジトリを作成しないでください。

認証情報・token等をログやHANDOFFへ書き出さないでください。

GitHub CLIが利用できない、または認証が無効な場合は、推測による別方式へ切り替えず停止し、必要な対応だけを報告してください。

---

## 8. 新規リポジトリの存在確認

新規作成前に、

```text
onochin/app_gnss
```

が存在しないことを確認してください。

例：

```bash
gh repo view onochin/app_gnss
```

存在しないことを確認した場合だけ、新規作成へ進んでください。

すでに存在する場合：

- 削除しない
- force pushしない
- remoteとして勝手に使用しない
- 内容を上書きしない

その時点で停止して報告してください。

---

## 9. repository visibility

既存の、

```text
onochin/app_survey
```

のvisibilityを確認してください。

新しい `app_gnss` は原則として、既存 `app_survey` と同じvisibilityにしてください。

例：

```bash
gh repo view onochin/app_survey --json visibility
```

ただし確認できない場合は、推測でprivate/publicを決めず停止してください。

---

## 10. Vite GitHub Pages設定

Phase 1では、旧 `/app_survey/` baseを削除し、通常ローカルbuildだけが成立する状態にしてあります。

Phase 2では、新しいリポジトリ名が確定したため、

```text
/app_gnss/
```

をGitHub Pages用baseとして設定してください。

ただし、

```text
npm run dev
npm run build
npm run preview
```

等の通常ローカル利用を `/app_gnss/` 前提にしないでください。

推奨方針：

```text
通常モード
base = /

github-pages mode
base = /app_gnss/
```

としてください。

例えば現在のVite構成に合わせ、

```text
mode === "github-pages"
```

のときだけPages用baseを使う方式を基本としてください。

既存 `survey-learning-lab` の `vite.config.ts` を参考にして構いませんが、コピーする前に現在実装との違いを確認してください。

---

## 11. Pages用build確認

GitHub Actions作成前に、ローカルでPages用buildが成立することを確認してください。

例：

```bash
npm run build -- --mode github-pages
```

生成された、

```text
dist/index.html
```

内の主要なJS/CSS参照が、

```text
/app_gnss/
```

配下になっていることを確認してください。

例えば、

```text
/assets/...
```

のままでPages公開時にルート参照となっていないことを確認してください。

一方、通常build：

```bash
npm run build
```

も引き続き成功することを確認してください。

---

## 12. GitHub Pages workflow

新しく、

```text
.github/workflows/deploy.yml
```

を作成してください。

GitHub Pagesは**GitHub Actionsによるカスタムworkflow**を使用してください。

基本フロー：

```text
mainへpush
      ↓
checkout
      ↓
Node環境
      ↓
npm ci
      ↓
typecheck
      ↓
test
      ↓
GitHub Pages modeでbuild
      ↓
configure-pages
      ↓
distをPages artifactへ
      ↓
deploy-pages
      ↓
GitHub Pages公開
```

手動再実行用に、

```text
workflow_dispatch
```

も使用できるようにしてください。

---

## 13. GitHub Actionsの基本方針

GitHub Pagesの現在の公式構成を確認し、実行時点の公式安定版majorを使用してください。

少なくともPages部分は、

```text
actions/configure-pages
actions/upload-pages-artifact
actions/deploy-pages
```

を使用してください。

現時点の公式ドキュメントで示されている構成は概ね、

```text
actions/configure-pages@v5
actions/upload-pages-artifact@v4
actions/deploy-pages@v4
```

です。

ただし実装時点で公式ドキュメントに更新がある場合は、公式GitHub Docsを優先してください。

Pages deploymentには最低限、

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

を設定してください。

deploy jobでは、

```text
environment:
  name: github-pages
```

を使用してください。

不要に強いGitHub Actions権限を与えないでください。

---

## 14. npm install方針

GitHub Actions内でも新規依存を追加しないでください。

`package-lock.json`を使い、

```text
npm ci
```

を使用してください。

現在のプロジェクト方針に合わせて、可能であれば、

```bash
npm ci --ignore-scripts --no-audit --no-fund
```

を使用してください。

ただしGitHub Actions上で既存依存の正常展開に必要な処理まで壊さないよう、現在のlockfileとPhase 1での導入実績を確認して判断してください。

packageの追加・バージョン更新は行わないでください。

---

## 15. workflow内の品質確認

Pages workflowで公開前に最低限、

```bash
npm run typecheck -- --pretty false
npm test -- --reporter=verbose
npm run build -- --mode github-pages
```

を成功させてください。

テストやbuildが失敗した状態でdeployへ進まない構成としてください。

500 kB超の既知Vite警告は、警告だけを理由に失敗扱いへ変更したり、大規模最適化したりしないでください。

---

## 16. GitHub Pages artifact

GitHub Pagesへアップロードするのは、

```text
dist/
```

だけとしてください。

ソースリポジトリ全体や `node_modules` をPages artifactへ含めないでください。

---

## 17. Phase 2変更後のローカル検証

GitHubへ外部送信する前に、新しいPages設定を含めてローカル回帰確認してください。

最低限：

```bash
npm run typecheck -- --pretty false
npm test -- --reporter=verbose
npm run build
npm run build -- --mode github-pages
node --check scripts/gnss-smoke.mjs
git diff --check -- . ':(exclude)prompt/**'
```

必要に応じて通常ローカル版でGNSS Playwright smokeも実行してください。

維持確認：

- 第1章～第7章
- 確認問題50問
- 主要操作
- 章往復状態保持
- リロード後初期化
- 1366px
- 390px
- キーボード
- 可視フォーカス
- console error 0
- page error 0
- 外部API通信 0

PlaywrightブラウザはPhase 1と同様、既存の移行元ブラウザを一時参照して構いません。

ブラウザをコピー・再ダウンロードしないでください。

Playwright保存方式の恒久共有化は今回行いません。

---

## 18. Phase 2 commit

ローカル検証成功後、Phase 2変更をcommitしてください。

対象例：

```text
vite.config.ts
.github/workflows/deploy.yml
README.md
doc/HANDOFF.md
その他Phase 2で本当に必要な最小ファイル
```

教材コードを公開対応だけのために変更しないでください。

commitメッセージ例：

```text
20260813_GNSS独立化Phase2_GitHubPages公開設定
```

commit後、

```bash
git status --short
git log --oneline --decorate -5
```

を確認してください。

working treeが意図した状態であることを確認してからGitHubリポジトリ作成へ進んでください。

---

## 19. GitHubリポジトリ作成

ローカルcommit確定後に、

```text
onochin/app_gnss
```

を新規作成してください。

リポジトリ作成時に、

- README自動生成
- `.gitignore`自動生成
- LICENSE自動生成
- template利用

等でremote側だけに別初期commitを作らないでください。

**現在のローカルGitをそのまま新リポジトリの起点にしてください。**

新規リポジトリを作成し、

```text
origin
```

だけをremoteとして設定してください。

`app_survey` のremoteを登録しないでください。

remote設定後：

```bash
git remote -v
```

で、

```text
onochin/app_gnss
```

だけを指していることを確認してください。

---

## 20. GitHub PagesをActions方式へ設定

GitHub Pagesの公開方式は、

```text
GitHub Actions / workflow
```

としてください。

可能であればGitHub CLI / GitHub APIで現在設定を確認し、

```text
build_type = workflow
```

へ設定してください。

Pagesサイトがまだ存在しない新規リポジトリの場合は、GitHubの現行REST APIに従ってPages siteを作成してください。

例として概念上は、

```text
POST /repos/onochin/app_gnss/pages
build_type: workflow
```

です。

すでにPages設定が存在する場合は、状態を確認してから必要最小限の更新を行ってください。

API権限不足等で設定できない場合は、

- tokenを作り直さない
- tokenを表示しない
- 不要に権限を広げない
- 推測で別方式へ変更しない

でください。

その場合は、どの設定だけユーザー操作が必要かを明確に報告して停止してください。

---

## 21. main push

Pages設定を確認した後、

```text
main
```

を新しい `origin` へpushしてください。

force pushは使用しないでください。

初回push後、

```bash
git status --short
git branch -vv
git remote -v
```

を確認してください。

ローカル `main` が、

```text
origin/main
```

を追跡していることを確認してください。

---

## 22. GitHub Actions実行確認

push後、GitHub ActionsのPages workflowが起動していることを確認してください。

GitHub CLIが利用可能であれば、

```text
gh run list
gh run view
gh run watch
```

等を使って構いません。

確認するもの：

```text
checkout
npm ci
typecheck
test
build
Pages artifact upload
deploy
```

が成功していること。

失敗した場合はログを確認し、今回のPages設定に直接関係する原因のみ最小修正してください。

教材コードや依存バージョンを安易に変更して解決しないでください。

---

## 23. 公開URL確認

workflow成功後、GitHub Pagesの実URLをGitHub側から取得してください。

想定：

```text
https://onochin.github.io/app_gnss/
```

ただし、最終報告では推測値ではなくGitHub側で確認した実URLを使用してください。

最低限、

- HTTPで正常応答
- GitHub 404ではない
- HTMLが読み込まれる
- JS/CSS assetが404にならない
- タイトルがGNSS専用
- 第1章が表示できる

ことを確認してください。

---

## 24. 公開版のブラウザ確認

可能であれば、既存Playwrightを使用して公開URLを確認してください。

新しいPlaywrightブラウザは取得しないでください。

Phase 1と同様、移行元ブラウザを一時参照して構いません。

公開版で最低限：

```text
1366px
390px
```

を確認してください。

確認事項：

- ページ全体の横はみ出しなし
- 第1章表示
- 第7章へ移動可能
- JS/CSS読込み失敗なし
- console error 0
- page error 0
- 404 assetなし
- ページ再読込み後もGitHub Pages 404にならない

GNSS教材はクライアント側の独自URLルーティングを持たない現在構成なので、存在しないルート対応等を先回りして追加しないでください。

公開確認用スクリーンショットは、

```text
/tmp/
```

へ新しい名前で保存してください。

例：

```text
/tmp/gnss-phase2-pages-1366-20260813.png
/tmp/gnss-phase2-pages-390-20260813.png
```

既存画像を上書きしないでください。

---

## 25. README更新

公開成功後、`README.md`へ最低限次を追加してください。

```text
GitHub repository
https://github.com/onochin/app_gnss

GitHub Pages
https://onochin.github.io/app_gnss/
```

また、

```text
GitHub Pages公開方法
main push
↓
GitHub Actions
↓
typecheck / test / build
↓
deploy
```

を簡潔に記載してください。

ローカル起動方法は維持してください。

---

## 26. HANDOFF更新

`doc/HANDOFF.md`をGNSS独立アプリの現在状態として更新してください。

Phase 2について最低限：

### Git管理

```text
local repository
main

remote
origin = onochin/app_gnss

初回Phase 1 commit SHA
Phase 2 commit SHA
```

### GitHub

```text
repository URL
visibility
default branch
```

### GitHub Pages

```text
Pages方式：GitHub Actions
Pages base：/app_gnss/
公開URL
workflow
```

### 検証

```text
typecheck
test
通常build
Pages build
Playwright local
公開URL確認
1366px
390px
console error
page error
asset 404
```

### 現在の教材

```text
第1章～第7章 available
第8章以降 未実装
```

### 容量運用

Phase 1の方針を維持したことを明記してください。

```text
npm cacheの恒久共有化
Playwrightブラウザの恒久共有化
```

は今回未実施です。

HANDOFFを従来アプリ全体版のような長大な履歴ログへ戻さず、GNSS独立アプリの現在状態を読み取れる長さに保ってください。

---

## 27. AGENTS.md

現在のGNSS専用 `AGENTS.md` を原則維持してください。

Phase 2完了後に、GitHub repository / Pagesが正式確定したことで明らかに更新が必要な箇所だけ最小修正してください。

教材仕様や作業ルールをPhase 2都合で変更しないでください。

---

## 28. 移行元 survey-learning-lab の保護

今回も、

```text
/home/newono/ai_proj/app_simulation/survey-learning-lab
```

は変更しないでください。

特に、

```text
src/
doc/
prompt/
.git/
remote
GitHub Pages設定
node_modules/
.npm-cache/
Playwrightブラウザ
```

を変更しないでください。

既存 `app_survey` へのcommit・pushも行わないでください。

Phase 2完了後も、当面は、

```text
survey-learning-lab
→ 従来版

gnss-learning-lab
→ GNSS独立版
```

を並存させます。

元アプリからGNSS本体を削除する作業は今回行いません。

---

## 29. 今回やらないこと

今回、次は実施しないでください。

- 第8章実装
- 第9章以降実装
- GNSS教材本文の改稿
- GNSS学習記録
- GNSS用localStorage
- 外部API
- 実機通信
- RINEX等の観測ファイル読込み
- 新規npmパッケージ
- 依存バージョン更新
- CSS全面整理
- JS 500 kB警告対策だけを目的としたコード分割
- 元アプリからGNSS削除
- npm cacheの恒久共有化
- Playwrightブラウザの恒久共有化
- Playwrightブラウザの新規コピー
- Playwrightブラウザの再ダウンロード
- custom domain
- repository rename
- GitHub Release作成
- tag作成
- branch protection等の追加運用設計
- 第8章の要件整理・実装開始

---

## 30. 完了条件

次をすべて満たしたらPhase 2完了です。

- Phase 1状態を確認した
- Phase 1状態を初回commitした
- `app_gnss` 用Pages baseを設定した
- 通常build成功
- GitHub Pages mode build成功
- Pages artifactが `dist/` のみ
- GitHub Pages workflow作成
- typecheck成功
- GNSS 7テストファイル・既存98テストが成功
- GNSS第1～7章を維持
- 第8章未実装
- GitHub `onochin/app_gnss` を新規作成
- remote `origin` が新GNSSリポジトリだけを指す
- `main` をpush
- GitHub PagesをActions方式へ設定
- Pages workflow成功
- 公開URL取得
- 公開URLで正常表示
- JS/CSS asset 404なし
- 1366px表示確認
- 390px表示確認
- console error 0
- page error 0
- README更新
- HANDOFF更新
- `survey-learning-lab` を変更していない
- npm cache / Playwrightブラウザを重複作成していない
- CSS大規模整理を行っていない
- 第8章へ着手していない

---

## 31. Phase 2完了時のGit状態

最終的に最低限、

```text
branch:
main

remote:
origin → onochin/app_gnss

tracking:
main → origin/main

working tree:
clean
```

を目標としてください。

意図的に未追跡資料等を残す場合は、その理由を完了報告へ記載してください。

---

## 32. 完了報告

日本語で次の順に簡潔に報告してください。

1. 結論
2. GitHubリポジトリURL
3. GitHub Pages公開URL
4. Phase 1初回commit SHA
5. Phase 2 commit SHA
6. remote / branch状態
7. Pages workflow概要
8. Pages base
9. typecheck結果
10. test結果
11. 通常build結果
12. Pages build結果
13. GitHub Actions結果
14. 公開版1366px / 390px確認結果
15. console / page error / asset 404
16. 第1章～第7章を維持したこと
17. 第8章未実装であること
18. `survey-learning-lab` に変更がないこと
19. 容量運用に変更がないこと
20. 残る注意点

Phase 2完了後は停止してください。

**次の作業（共有キャッシュ・Playwright共用化、または第8章）にはユーザーの指示があるまで進まないでください。**
