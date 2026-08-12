### GNSS独立化 Phase 1：GNSS専用アプリのローカル分離

## 0. 今回の目的

現在の

`/home/newono/ai_proj/app_simulation/survey-learning-lab`

には、

* 測量の基礎
* 閉合トラバース測量
* GNSS測量

が1つのReact / Viteアプリとして実装されています。

GNSS教材は第1章～第7章まで発展し、今後も第8章以降を独立した専門教材として開発するため、GNSS教材を別アプリへ分離します。

今回は、

**現在のGNSS教材を壊さず、兄弟ディレクトリにGNSS専用アプリをローカルで成立させるところまで**

を行ってください。

今回はGitHub新規リポジトリの作成・push・GitHub Pages公開までは行いません。

また、第8章以降の教材実装にも着手しないでください。

---

## 1. 作業開始場所

Codexの作業開始ディレクトリは、

`/home/newono/ai_proj/app_simulation/survey-learning-lab`

です。

このディレクトリを**移行元・正本**として確認してください。

新しいGNSSアプリは、親ディレクトリ `app_simulation` の直下へ兄弟ディレクトリとして、

`/home/newono/ai_proj/app_simulation/gnss-learning-lab`

を作成してください。

最終イメージ：

```text
/home/newono/ai_proj/app_simulation/
├── survey-learning-lab/
└── gnss-learning-lab/
```

`gnss-learning-lab` を `survey-learning-lab` の内部へ作成しないでください。

---

## 2. この依頼に限る作業範囲の例外

既存 `AGENTS.md` には「変更をプロジェクト配下に限定する」趣旨のルールがありますが、今回の依頼はアプリ分離そのものが目的です。

したがって今回に限り、

`/home/newono/ai_proj/app_simulation/gnss-learning-lab`

という兄弟ディレクトリの新規作成を明示的に許可します。

ただし、移行元

`survey-learning-lab`

の既存ファイルを削除・変更・移動しないでください。

今回の実装変更は原則として新しい `gnss-learning-lab` 側だけで行ってください。

---

## 3. 最初に必ず確認するもの

作業開始時に、移行元 `survey-learning-lab` で最低限次を確認してください。

```bash
pwd
git status --short
git rev-parse --show-toplevel
git rev-parse HEAD
git remote -v
```

さらに全文または必要箇所を確認してください。

1. `AGENTS.md`
2. 最新の `doc/HANDOFF.md`
3. `README.md`
4. `package.json`
5. `package-lock.json`
6. `vite.config.ts`
7. `.github/workflows/deploy.yml`
8. `src/App.tsx`
9. `src/components/gnss/`
10. `src/tests/gnss*.test.ts`
11. `scripts/gnss-smoke.mjs`
12. 最新のGNSS教材設計メモ
13. 第7章の正式依頼Markdown

現在実装されているGNSS第1章～第7章の章ID、カード、確認問題、状態管理を実装そのものから確認してください。

過去資料と現在実装が異なる場合は、

```text
現在の実装
↓
最新HANDOFF
↓
AGENTS.md
↓
過去の依頼・設計資料
```

を基本に判断してください。

---

## 4. 最重要：移行元のGit状態

`git status --short` に未コミット・未追跡の重要な差分が存在する場合は、

**GNSS分離作業を開始しないでください。**

特に第7章の実装、テスト、HANDOFF、README等が未コミットの場合、コミット済みHEADだけをコピーすると最新版を落とす危険があります。

その場合は何も変更せず停止し、

* 現在のHEAD
* `git status --short`
* 第7章がHEADへ含まれているか
* 分離開始前に何を確定する必要があるか

だけを報告してください。

ユーザーの許可なく既存差分をcommit、破棄、stash、restoreしないでください。

禁止：

```text
git reset
git checkout -- .
git restore .
git clean
```

---

## 5. 分離開始条件

次を確認できた場合だけ分離を開始してください。

* 移行元working treeが安全な状態
* GNSS第1章～第7章が現在HEADに含まれる
* 第7章 `gnss-baseline-fix` が実装済み
* 第7章関連テストが存在する
* 第8章以降は未実装
* 移行元の現在状態をcommit SHAで特定できる

分離元commit SHAを記録してください。

---

## 6. コピー方法

Windows Explorer等によるディレクトリ丸ごとの複製は行わないでください。

特に次をコピーしないでください。

```text
node_modules/
.npm-cache/
dist/
.git/
coverage/
```

現在これらは容量が大きいため、GNSS独立化によって不要な複製を作らないことが重要です。

移行元がcleanであることを確認したうえで、**Git管理されている確定状態だけを新ディレクトリへ展開する方法**を優先してください。

例えば `git archive HEAD` 等を利用して構いません。

目的は、

> 移行元の確定済みソースを複製しつつ、`.git`、`node_modules`、`.npm-cache`、`dist` を複製しない

ことです。

新しい `gnss-learning-lab` は既存 `app_survey` の `.git` をそのままコピーした入れ子リポジトリにはしないでください。

---

## 7. 新しいGNSSアプリで残すもの

新アプリの中心は現在の、

```text
src/components/gnss/
├── SurveyGnss.tsx
├── gnssCourse.ts
├── types.ts
├── data/
└── lessons/
```

です。

また、GNSSに必要な次のものを残してください。

* `src/main.tsx`
* GNSS専用に調整した `src/App.tsx`
* GNSS表示に必要なCSS
* GNSSから実際に参照している共通コンポーネント
* GNSSから実際に参照している型・utility
* `src/tests/gnss*.test.ts`
* `scripts/gnss-smoke.mjs`
* Vite / TypeScript / Vitestの最小構成
* `package.json`
* `package-lock.json`
* `.gitignore`
* GNSSに必要な設計資料・依頼Markdown

依存関係を推測で削除せず、import関係を確認して判断してください。

---

## 8. 新しいGNSSアプリから外すもの

依存関係を確認したうえで、GNSS専用アプリに不要なものを新アプリ側から整理してください。

主な候補：

```text
src/components/basics/
src/components/traverse/
src/calculations/ のトラバース専用処理
src/data/traverseSample.ts
基礎教材専用テスト
トラバース専用テスト
scripts/basics-smoke.mjs
scripts/phase3-smoke.mjs
scripts/phase4-smoke.mjs
基礎・トラバース専用doc
基礎・トラバース専用prompt
```

ただし、

**GNSS側から参照されている共通コードを、名前だけを理由に削除しないでください。**

削除前にimport・参照関係を確認してください。

このPhaseでは、大規模なリファクタリングや共通化は不要です。

---

## 9. App.tsxをGNSS専用にする

現在の `App.tsx` は、

```text
測量の基礎
GNSS
閉合トラバース
```

を切り替える親アプリになっています。

新しい `gnss-learning-lab` では、GNSSだけを起動する構成に変更してください。

概念：

```text
App
 ↓
GNSSアプリ用の外枠
 ↓
SurveyGnss
 ↓
第1章～第7章
```

現在のGNSS教材本体、

* 文章
* カード
* 図
* 操作
* 問題
* 固定値
* 安定章ID
* 選択肢ID
* React状態

は変更しないでください。

独立化を理由に教材内容を改稿しないでください。

正式なアプリ名称は今回確定しません。

教材タイトルは既存の「GNSS測量」を基本として維持し、大規模な名称変更を行わないでください。

---

## 10. GNSS状態管理

現在のGNSS教材の状態管理を維持してください。

原則：

```text
章を往復
→ 状態保持

ブラウザ再読込み
→ 初期化
```

GNSS用localStorageは今回追加しないでください。

第8章以降の学習記録等も先行実装しないでください。

---

## 11. CSS

現在の `src/styles.css` にはGNSS以外のCSSも含まれています。

今回の優先順位は、

```text
正常に独立
↓
表示を維持
↓
不要CSS整理
```

です。

GNSS独立化と大規模CSS再設計を同時に行わないでください。

まず現在のGNSS表示を維持してください。

不要な `.basics-*`、トラバース専用CSS等を削除できる場合も、参照を確認したうえで最小限にしてください。

既存 `.gnss-*` 名前空間を維持してください。

新しいグローバルCSSを大量追加しないでください。

---

## 12. npm依存関係

新規npmパッケージを追加しないでください。

現在のReact / Vite / TypeScript / Vitest / Playwright構成を基本的に継承してください。

依存バージョンを勝手に更新しないでください。

`package.json` のアプリ名をGNSS専用に変更する場合は構いませんが、

* 依存パッケージ
* バージョン

は変更しないでください。

`package-lock.json`との整合性を維持してください。

---

## 13. 容量対策

現在の実測値は概ね、

```text
node_modules                         385 MB
Playwright .local-browsers          267 MB
.npm-cache                          243 MB
```

です。

したがって今回、

* 移行元 `node_modules` をコピーしない
* 移行元 `.npm-cache` をコピーしない
* Playwright `.local-browsers` をコピーしない
* `dist` をコピーしない

でください。

### npm cache

新GNSSアプリで `npm ci` が必要な場合は、新しい243MB級キャッシュを作らず、今回の初期構築では既存の

`/home/newono/ai_proj/app_simulation/survey-learning-lab/.npm-cache`

を `--cache` で再利用して構いません。

例：

```bash
npm ci --ignore-scripts --no-audit --no-fund \
  --cache /home/newono/ai_proj/app_simulation/survey-learning-lab/.npm-cache
```

これはnpmキャッシュの再利用だけであり、移行元ソースを変更しないこと。

将来的な中立の共通npmキャッシュディレクトリ化は別Phaseで行います。

### Playwright

今回、Playwrightブラウザ保存方式を恒久的に変更しないでください。

新しいPlaywrightブラウザを267MB分コピー・再ダウンロードすることも、ユーザー確認なしには行わないでください。

必要なGNSS Playwright確認について、既存ブラウザを一時的に参照して安全に実行できる場合は、環境変数による一時利用を検討してください。

恒久的なPlaywright共有化は別Phaseとします。

---

## 14. 新しいGit管理

新しい `gnss-learning-lab` は、最終的に独立したGitHubリポジトリにする予定です。

ただし今回は、

* GitHub新規リポジトリ作成
* remote追加
* push
* GitHub Pages公開

を行わないでください。

ローカル側で独立Gitリポジトリを初期化する場合は、

**既存 `app_survey` のremoteを引き継がない**

ことを必ず確認してください。

`app_survey` へ誤pushできる状態を作らないでください。

新GNSSリポジトリの履歴をどう扱うかは、今回のローカル分離後に改めて決定します。

---

## 15. Vite / GitHub Pages

現在の移行元にはGitHub Pages用 `/app_survey/` の設定があります。

これは新GNSSアプリの最終公開URLには使用しません。

ただし、新しいGitHubリポジトリ名は今回まだ確定していないため、

**今回のPhaseで推測して `/app_gnss/` 等へ固定しないでください。**

GitHub Pages設定は次Phaseで、新しいリポジトリ名確定後に変更します。

ローカル開発・通常buildが成立するところまでを今回の対象としてください。

---

## 16. GNSS専用AGENTS.md

新しい `gnss-learning-lab/AGENTS.md` は、現在のルールを参考にGNSS専用として整理してください。

最低限残す内容：

* 既存差分を破棄しない
* 最小差分
* 新規パッケージを勝手に追加しない
* GNSS既存章を退行させない
* 安定章ID・問題ID・選択肢IDを維持
* `.gnss-*` CSS名前空間を維持
* 1366px / 390px確認
* typecheck / test / build / GNSS smoke
* 既存スクリーンショットを上書きしない
* 第8章以降を先行実装しない
* GNSS localStorageを先行追加しない
* 不明仕様を推測で確定しない

測量の基礎・閉合トラバース固有のルールは、新GNSSアプリでは原則として外してください。

---

## 17. 新しいHANDOFF.md

現在の `survey-learning-lab/doc/HANDOFF.md` は長大化しているため、そのまま新GNSSアプリへ正本としてコピーしないでください。

新しい、

`gnss-learning-lab/doc/HANDOFF.md`

をGNSS専用として新規作成してください。

長さを抑え、**現在状態を読むための正本**としてください。

最低限：

### アプリ概要

* GNSS独立学習アプリ
* 元プロジェクト
* 移行元commit SHA
* 分離実施日

### 技術構成

* React
* Vite
* TypeScript
* Vitest
* Playwright
* SVG / CSS
* バックエンドなし
* 外部APIなし

### 現在のGNSS章

第1章～第7章について、

* 章番号
* タイトル
* 安定章ID
* available

を簡潔に記載。

### 現在の重要仕様

* React状態のみ
* 章往復時保持
* リロード時初期化
* GNSS localStorageなし
* `.gnss-*`
* 既存固定教材値
* 既存問題ID等を維持

### 検証

今回実行した、

* typecheck
* GNSS関連単体テスト
* build
* GNSS smoke
* 1366px
* 390px
* console error
* page error

等を記録。

### 容量運用

* node_modulesはアプリごと
* npm cacheは現時点では移行元cacheを一時再利用可能
* Playwright共有化は別Phase
* `.npm-cache`・ブラウザを複製していない

### 次回開始地点

```text
GNSS独立化 Phase 2
GitHubリポジトリ作成・Pages設定・公開確認
```

としてください。

第8章実装開始とはしないでください。

---

## 18. GNSS設計メモ・prompt

新アプリにはGNSS教材に必要な資料だけを残してください。

最低限、

* 最新GNSS教材設計メモ
* 第1章～第7章の正式依頼Markdown
* 今後の章設計に必要なGNSS参考資料

を対象としてください。

「測量の基礎」「閉合トラバース」だけの依頼文は新GNSSアプリへ残す必要はありません。

古いGNSS資料についても、正本と重複するものを無理に大量コピーせず、必要なら `prompt/archive/` へ整理してください。

---

## 19. README

新しいREADMEはGNSS専用として整理してください。

最低限：

```text
# GNSS測量

目的
現在の章構成
第1章～第7章 available
技術構成
ローカル起動方法
typecheck
test
build
GNSS smoke
状態保存方針
注意事項
元プロジェクトから独立した経緯
```

第8章以降は「今後追加予定」としてください。

---

## 20. 検証

新しい `gnss-learning-lab` で最低限次を実行してください。

```bash
npm run typecheck -- --pretty false
npm test -- --reporter=verbose
npm run build
node --check scripts/gnss-smoke.mjs
git diff --check
```

ただし、GNSS専用化後に基礎・トラバーステストを削除した場合、

**総テスト数が元プロジェクトより減ること自体は問題ありません。**

代わりにGNSS第1章～第7章の既存テストがすべて成功することを確認してください。

GNSS Playwrightを実行できる場合は、

* 第1章～第7章へ移動可能
* 既存操作
* 確認問題
* 章間状態保持
* リロード後初期化
* 1366px
* 390px
* キーボード
* 可視フォーカス
* コンソールエラー0
* ページ例外0

を確認してください。

Playwrightブラウザの新規コピー・再取得が必要になる場合は勝手に実施せず、その時点で報告してください。

---

## 21. 移行元の保護

今回もっとも重要です。

`survey-learning-lab` 側の、

* `node_modules`
* `.npm-cache`
* Playwrightブラウザ
* `src`
* `doc`
* `prompt`
* `.git`
* remote
* GitHub Pages設定

を変更・削除しないでください。

今回の完了後も現在の「測量理解ラボ」が従来どおり開発可能な状態を維持してください。

GNSS本体を移行元から削除するのは**今回行いません**。

当面は、

```text
survey-learning-lab
→ GNSSを含む従来版

gnss-learning-lab
→ 新しいGNSS独立版
```

を並存させます。

新GNSSアプリが公開・検証済みになるまで、移行元からGNSSを外さないでください。

---

## 22. 今回やらないこと

* 第8章実装
* 第9章以降実装
* GNSS教材本文の改稿
* GNSS学習記録
* GNSS localStorage
* 新規npmパッケージ
* 依存バージョン更新
* Playwright保存方式の恒久変更
* 共通Playwrightブラウザ置き場への移行
* 元アプリからGNSS削除
* GitHub新規リポジトリ作成
* remote設定
* push
* GitHub Pages公開
* `/app_gnss/` 等の推測によるPages base固定
* 大規模リファクタリング
* CSS全面再設計

---

## 23. 完了条件

次をすべて満たしたらPhase 1完了です。

* 移行元の安全なHEADを特定した
* 第1章～第7章が移行元HEADに含まれる
* `gnss-learning-lab` を `app_simulation` 直下に作成した
* `.git`をコピーしていない
* `node_modules`をコピーしていない
* `.npm-cache`をコピーしていない
* Playwrightブラウザをコピーしていない
* `dist`をコピーしていない
* GNSS第1章～第7章を新アプリで利用できる
* GNSS既存教材内容を変更していない
* GNSS既存テストが成功
* typecheck成功
* build成功
* 可能な範囲でGNSS smoke成功
* 1366px / 390pxで重大な退行なし
* 新しいGNSS専用README作成
* 新しいGNSS専用AGENTS.md作成
* 新しい簡潔なGNSS専用HANDOFF.md作成
* 元 `survey-learning-lab` を変更していない
* GitHub remote / Pagesには未着手
* 第8章には未着手

---

## 24. 完了報告

日本語で次の順に簡潔に報告してください。

1. 結論
2. 移行元commit SHA
3. 作成した新ディレクトリ
4. コピーしなかった大容量ディレクトリ
5. GNSS専用化で変更・削除したもの
6. 維持したGNSS第1章～第7章
7. 検証結果
8. `survey-learning-lab` に変更がないこと
9. 新GNSS側のおおよそのディスク使用量
10. 残る注意点
11. 次回開始地点

今回のPhase 1が完了したら停止してください。
