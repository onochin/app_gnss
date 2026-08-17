# GNSS学習アプリ HANDOFF

最終更新日：2026-08-18

## 1. アプリ概要

- GNSS測量の独立学習アプリ。
- 元プロジェクト：`/home/newono/ai_proj/app_simulation/survey-learning-lab`
- 移行元commit：`0ab1b5b1fff6355ec1ec6c1322c6c3f2a764a907`
- 分離実施日：2026-08-13
- 分離先：`/home/newono/ai_proj/app_simulation/gnss-learning-lab`
- GitHub repository：`https://github.com/onochin/app_gnss`
- GitHub Pages：`https://onochin.github.io/app_gnss/`
- 移行元HEADのGNSS第1章～第7章を教材内容の変更なしで維持する。

## 2. 技術構成

- React 19.2.8
- Vite 8.1.5
- TypeScript 6.0.3
- Vitest 4.1.10
- Playwright 1.61.1
- SVG / CSS
- バックエンドなし
- 外部APIなし
- 実機通信・観測ファイル読込みなし

## 3. 現在のGNSS章

| 章 | タイトル | 安定章ID | 状態 |
| --- | --- | --- | --- |
| 1 | GNSS測量の全体像 | `gnss-overview` | available |
| 2 | GNSSは何を観測しているのか | `gnss-observations` | available |
| 3 | GNSSの座標と高さ | `gnss-coordinate-height` | available |
| 4 | GNSS測位方式を比較する | `gnss-positioning-methods` | available |
| 5 | 自前RTK① 基準局をつくる | `gnss-own-base-station` | available |
| 6 | 自前RTK② 補正情報を届ける | `gnss-correction-delivery` | available |
| 7 | 自前RTK③ 基線解析とFIX | `gnss-baseline-fix` | available |

第8章以降は未実装。第7章末尾の第8章への問いだけを既存どおり維持する。

## 4. 現在の重要仕様

- GNSS第1章～第7章は`SurveyGnss`内で常時マウントする。
- 章往復時はReact画面状態、問題回答、理解済み状態を保持する。
- ブラウザ再読込み後は初期化する。
- GNSS用`localStorage`、学習記録、クラウド同期はない。
- `.gnss-*` CSS名前空間を維持する。
- 既存の固定教材値、章ID、カードID、問題ID、選択肢IDを維持する。
- 第3章が参照する`src/components/basics/data/coordinateAndHeight.ts`だけは、共通固定データとして残す。
- 色だけで状態を区別せず、キーボード操作と可視フォーカスを維持する。
- `NaN`、`Infinity`、`undefined`を画面へ表示しない。

## 5. GNSS独立化 Phase 1（2026-08-13）

### 5.1 分離開始時の安全確認

- 移行元HEAD：`0ab1b5b1fff6355ec1ec6c1322c6c3f2a764a907`
- `main`と`origin/main`は同じcommitを指していた。
- 追跡済み・ステージ済み差分は0件。
- 未追跡は今回のPhase 1依頼書だけで、GNSS実装差分ではなかった。
- HEADに第7章`gnss-baseline-fix`、第7章データ、Lesson、テスト、スモーク、README、HANDOFFが含まれることを確認した。
- 移行元でGNSS関連7テストファイル・98テストが成功した。
- 第8章以降のGNSSコンポーネント、章ID、教材本体は未実装だった。

### 5.2 分離方法

- `git archive HEAD`で必要な確定ファイルだけを選択展開した。
- `.git`、移行元`node_modules`、`.npm-cache`、Playwrightブラウザ、`dist`、`coverage`はコピーしていない。
- GNSSコード、GNSS関連7テスト、`scripts/gnss-smoke.mjs`、必要資料、共通固定座標データだけを残した。
- 今回の未追跡Phase 1依頼書は、実装へ混入させず資料として`prompt/`へ内容を変えず複製した。
- 基礎教材本体、閉合トラバース本体、各専用テスト・スモーク・資料、GitHub Pages workflowは含めていない。

### 5.3 GNSS専用化で変更したもの

- `src/App.tsx`
  - 基礎・GNSS・閉合トラバース切替を外し、`SurveyGnss`だけを起動する構成へ変更。
- `src/components/layout/Header.tsx`
  - 外枠の表示名を`GNSS測量`へ変更。
- `index.html`
  - titleとdescriptionをGNSS専用へ変更。
- `package.json`、`package-lock.json`
  - アプリ名だけを`gnss-learning-lab`へ変更。依存とバージョンは不変。
- `vite.config.ts`
  - 旧`/app_survey/` Pages baseを除去。ローカル通常buildだけを対象とした。
- `scripts/gnss-smoke.mjs`
  - 旧親アプリの教材切替依存だけをGNSS章ナビへ置換。
  - 第1章～第7章の既存操作・問題・状態検証は維持。
  - スクリーンショットはPhase 1専用の新規ファイル名へ変更。
- `README.md`、`AGENTS.md`、`doc/HANDOFF.md`
  - GNSS専用として新規整理。

### 5.4 変更していないもの

- `src/components/gnss/`配下は移行元とバイト単位で同一。
- `src/tests/gnss*.test.ts`は移行元とバイト単位で同一。
- `src/styles.css`は表示退行を避けるため移行元とバイト単位で同一。
- 第1章～第7章の教材本文、図、操作、固定値、計算、問題、安定ID、React状態を変更していない。

### 5.5 検証結果

- `npm run typecheck -- --pretty false`
  - 成功、型エラー0件。
- `npm test -- --reporter=verbose`
  - 成功、7テストファイル・98テストすべて成功。
- `npm run build`
  - 成功、34 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.41 kB。
  - CSS：357.37 kB、gzip 52.70 kB。
  - JS：557.83 kB、gzip 148.89 kB。
  - 500 kB超の既知警告あり。警告だけを理由とする最適化は未実施。
- `node --check scripts/gnss-smoke.mjs`
  - 成功。
- GNSS Playwrightスモーク
  - 第1章～第7章へ移動可能。
  - 確認問題50問、主要操作、章往復時の状態保持、再読込み時の初期化が成功。
  - キーボード操作、可視フォーカスが成功。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。
  - localStorageキー不変、GNSSキー追加なし。
- 目視画像
  - `/tmp/gnss-independent-phase1-1366-20260813.png`
  - `/tmp/gnss-independent-phase1-390-20260813.png`
  - 第7章カード3・5・6・8・9も両幅で新規画像を保存。
  - 重大な文字重なり、欠け、ページ全体の横はみ出しなし。

### 5.6 差分監査

- 一時indexを使い、実indexを変更せず新規成果物を監査した。
- `git diff --check -- . ':(exclude)prompt/**'`：成功。
- `prompt/`も含む全ファイル監査では、移行元HEADからそのまま残した過去依頼書2件に既存の行末空白4行を検出した。
  - `prompt/依頼03_GNSS測量教材Phase2_第2章の実装.md`：1行。
  - `prompt/依頼03_GNSS測量教材Phase2_第2章の実装_修正.md`：3行。
- 過去資料を無関係に整形せず、既存内容のまま保持した。
- `package.json`、`package-lock.json`はアプリ名だけを変更し、依存名・バージョンは不変。
- `git remote -v`：出力なし。

## 6. GNSS独立化 Phase 2（2026-08-13）

### 6.1 Git管理とGitHub

- local repository：`/home/newono/ai_proj/app_simulation/gnss-learning-lab`
- branch：`main`
- remote：`origin = https://github.com/onochin/app_gnss.git`
- tracking：`main -> origin/main`
- Phase 1初回commit：`731cdaf64a352cd2deca6bb85ec38b0ebe23b54b`
- Phase 2 Pages設定commit：`5a3f34bc2aefce52699c40259a429ebd342dc485`
- GitHub repository：`https://github.com/onochin/app_gnss`
- visibility：`PUBLIC`（既存`onochin/app_survey`と同じ）
- default branch：`main`
- remote側にREADME、`.gitignore`、LICENSE等の自動生成commitは作成していない。

### 6.2 GitHub Pages

- 公開方式：GitHub Actions custom workflow（`build_type = workflow`）
- Pages base：`/app_gnss/`
- 公開URL：`https://onochin.github.io/app_gnss/`
- HTTPS強制：有効
- workflow：`.github/workflows/deploy.yml`
- 起動条件：`main`へのpush、または`workflow_dispatch`
- `npm ci --ignore-scripts --no-audit --no-fund`、typecheck、test、Pages buildの成功後だけdeployする。
- Pages artifactは`dist/`だけを対象とする。
- Actionsは公式安定majorに対応するcommit SHAへ固定した。
  - `actions/checkout` v7
  - `actions/setup-node` v7
  - `actions/configure-pages` v6
  - `actions/upload-pages-artifact` v5
  - `actions/deploy-pages` v5

### 6.3 変更内容と維持事項

- `vite.config.ts`
  - 通常modeはbase `/`、`github-pages` modeだけbase `/app_gnss/`とした。
- `.github/workflows/deploy.yml`
  - 必要最小限の`contents: read`、`pages: write`、`id-token: write`でPages公開を追加した。
- `README.md`
  - repository、公開URL、Actionsによる公開経路を追記した。
- `doc/HANDOFF.md`
  - Git、GitHub、Pages、検証結果を現在状態へ更新した。
- `src/components/gnss/`、GNSS関連7テスト、`src/styles.css`はPhase 1初回commitから差分0件。
- `package.json`、`package-lock.json`はPhase 1初回commitから差分0件。
- 第1章～第7章の教材本文、図、操作、固定値、計算、問題、安定ID、React状態を変更していない。
- 第8章以降、GNSS学習記録、GNSS用`localStorage`は未実装。

### 6.4 ローカル検証

- `npm run typecheck -- --pretty false`：成功、型エラー0件。
- `npm test -- --reporter=verbose`：成功、7テストファイル・98テストすべて成功。
- `npm run build`：成功、34 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.41 kB。
  - CSS：357.37 kB、gzip 52.70 kB。
  - JS：557.83 kB、gzip 148.89 kB。
- `npm run build -- --mode github-pages`：成功、34 modules transformed。
  - `dist/index.html`：0.59 kB、gzip 0.42 kB。
  - JS/CSS参照がともに`/app_gnss/assets/`配下であることを確認した。
- `node --check scripts/gnss-smoke.mjs`：成功。
- `git diff --check -- . ':(exclude)prompt/**'`：成功。
- ローカルGNSS Playwrightスモーク：成功。
  - 第1章～第7章、確認問題50問、主要操作、章往復時の状態保持、再読込み時の初期化を確認した。
  - 全章のキーボード操作・可視フォーカスを確認した。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。
  - localStorageキー不変、GNSSキー追加なし。

### 6.5 GitHub Actionsと公開版検証

- 初回workflow run：`https://github.com/onochin/app_gnss/actions/runs/31621791758`
- run結果：成功。deploy jobは41秒で完了した。
- checkout、npm ci、typecheck、7ファイル・98テスト、34 modulesのPages build、Pages設定、artifact upload、deployがすべて成功した。
- artifactは`dist/index.html`、CSS 1件、JS 1件だけで、最終圧縮サイズは202,338 bytes。
- 公開トップ：HTTP 200、`text/html`、タイトル`GNSS測量`。
- 公開JS：HTTP 200、557,839 bytes。
- 公開CSS：HTTP 200、357,370 bytes。
- 公開URLで完全なGNSS Playwrightスモークが成功した。
  - 第1章～第7章、確認問題50問、主要操作、章往復状態保持、再読込み後初期化を確認した。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、asset 404なし、外部API通信0件。
- 公開確認画像：
  - `/tmp/gnss-phase2-pages-1366-20260813.png`
  - `/tmp/gnss-phase2-pages-390-20260813.png`
  - 目視でも重大な文字重なり、欠け、ページ全体の横はみ出しなし。

## 7. 容量運用

- `node_modules`は新アプリ用に`npm ci`で個別作成した。移行元からコピーしていない。
- 依存導入は移行元`.npm-cache`を`--offline --cache`で一時再利用した。
- 新アプリ内に`.npm-cache`は作成していない。
- Playwrightブラウザは移行元の既存配置を環境変数で一時参照した。
- Playwrightブラウザをコピー・再取得していない。
- Playwright保存方式の恒久変更は行っていない。
- `dist`はコピーせず、通常build検証で新アプリ内に生成した。
- npm cacheの恒久共有化、Playwrightブラウザの恒久共有化は行っていない。
- 最終実測容量：全体123 MB、`node_modules` 119 MB、`dist` 912 KB、`.git` 1.2 MB。
- `node_modules`、`dist`、`.git`を除くソース・資料は1.9 MB。

## 8. Phase 2で実施していないもの

- 第8章以降の実装
- GNSS学習記録・GNSS用`localStorage`
- 新規npmパッケージ・依存バージョン更新
- 元アプリからのGNSS削除
- CSSの大規模整理・再設計
- JS 500 kB警告対策だけを目的としたコード分割
- npm cache・Playwrightブラウザの恒久共有化
- Playwrightブラウザのコピー・再取得
- custom domain、repository rename、Release、tag、branch protection

## 9. 残る注意点

- `styles.css`は表示維持を優先して移行元全体を残しており、未使用の基礎・トラバースCSSを含む。
- そのためCSS 357.37 kBとJS 500 kB超警告は残るが、警告だけを理由とする大規模最適化は行わない。
- 最新`actions/deploy-pages`内部から`punycode`非推奨警告が1件出たが、deployは成功した。
- READMEの通常スモーク手順は新アプリ内ブラウザ配置を前提とする。Phase 2検証では移行元ブラウザを環境変数で一時参照した。
- 移行元`survey-learning-lab`は本作業で変更していない。最終確認時に同プロジェクトには本作業外の既存差分があり、破棄・上書き・commitしていない。

## 10. 次回開始地点

```text
GNSS UI再編 Phase 1 完了
第8章以降は未実装
次のPhaseはユーザー指示待ち
```

共有キャッシュ・Playwright共用化、第8章以降の実装には着手しない。

## 11. GNSS UI再編 Phase 1（2026-08-18）

### 11.1 実装内容

- PCの章ナビゲーションを、248px幅を基準とするstickyなカテゴリ型左サイドバーへ再編した。
- カテゴリは、基礎編、基準局RTK、ネットワークRTK、CLAS測量、スタティック測量、後処理、応用編の順とした。
- 既存の第1章～第7章を同じ安定章ID・章順で配置した。
- 第8章「現場観測と点検」は、選択できない「準備中」表示だけを追加した。Lesson、教材データ、問題、正式な章IDは未実装。
- 980px以下では左サイドバーを常設せず、現在章を示すコンパクトな章選択UIへ切り替えた。
- 第5章カード1の章全体フローだけを、PCでは横5ステップ、760px以下では縦5ステップにした。他カードの具体的な縦フローは維持した。
- 「GNSS受信機を設置できた ≠ 測量成果の基準として適切な基準局をつくれた」は、PCでコンパクトな横比較、狭い画面で縦配置とした。

### 11.2 変更ファイル

- `src/components/gnss/GnssLessonNavigation.tsx`
- `src/components/gnss/gnssNavigation.ts`
- `src/components/gnss/SurveyGnss.tsx`
- `src/components/gnss/lessons/GnssOwnBaseStationLesson.tsx`
- `src/styles.css`
- `src/tests/gnssNavigation.test.ts`
- `scripts/gnss-smoke.mjs`
- `README.md`
- `doc/HANDOFF.md`
- `prompt/20260817_GNSS_UI再編_Phase1_PCカテゴリ型左サイドバーと第5章カード1のレイアウト改善.md`

### 11.3 維持事項

- 第1章～第7章の教材本文、図、操作、問題、固定値、計算、安定章ID、問題ID、選択肢ID、章順は変更していない。
- `SurveyGnss`内で第1章～第7章の全Lessonを常時マウントし、非選択章を`hidden`にする方式を維持した。
- 章往復時のReact操作状態・問題回答の保持、再読込み時の初期化を維持した。
- GNSS用`localStorage`、外部API・実機通信・観測ファイル読込みは追加していない。
- 新規npmパッケージ、依存更新、GitHub Pages設定変更は行っていない。Pages baseは`/app_gnss/`を維持した。

### 11.4 最終ローカル検証

- `npm run typecheck -- --pretty false`：成功、型エラー0件。
- `npm test -- --reporter=verbose`：成功、8テストファイル・102テストすべて成功。
- `npm run build`：成功、36 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.40 kB。
  - CSS：360.04 kB、gzip 53.28 kB。
  - JS：561.33 kB、gzip 149.93 kB。
- `npm run build -- --mode github-pages`：成功、36 modules transformed。
  - `dist/index.html`：0.59 kB、gzip 0.42 kB。
  - CSS：360.04 kB、gzip 53.28 kB。
  - JS：561.33 kB、gzip 149.93 kB。
  - HTMLのJS/CSS参照が`/app_gnss/assets/`配下であることを確認した。
- `node --check scripts/gnss-smoke.mjs`：成功。
- `git diff --check -- . ':(exclude)prompt/**'`：成功。
- ローカルGNSS Playwrightスモーク：成功。
  - 第1章～第7章、確認問題50問、主要操作、章往復時の状態保持、再読込み時の初期化を確認した。
  - キーボード操作、可視フォーカス、localStorageキー不変を確認した。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。

### 11.5 警告とPages公開確認

- JSが500 kBを超える既知のVite警告は継続する。警告だけを理由とする最適化は実施していない。
- UI再編commit：`496c3895ce41a6cdefef8b2720e9283183d389cb`。
- GitHub Actions run：`https://github.com/onochin/app_gnss/actions/runs/32043170580`。
  - deploy jobは38秒で完了し、typecheck、8ファイル・102テスト、36 modulesのPages build、artifact upload、deployがすべて成功した。
- 公開URL：`https://onochin.github.io/app_gnss/`。
  - 公開トップ、JS、CSSはいずれもHTTP 200。JSは561,335 bytes、CSSは360,046 bytes。
  - 公開版で新しいPCカテゴリ型左サイドバー、モバイル章選択、第1章～第7章の移動、第8章の「準備中」表示を確認した。
  - 1366pxは`clientWidth=1366 / scrollWidth=1366`、390pxは`clientWidth=390 / scrollWidth=390`で横スクロールなし。
  - 公開版の完全なGNSS Playwrightスモークが成功し、コンソールエラー0件、ページ例外0件、asset 404なし、外部API通信0件、localStorageキー不変を確認した。

### 11.6 次回開始地点

```text
GNSS UI再編 Phase 1 完了
第8章以降は未実装
次のPhaseはユーザー指示待ち
```

第8章教材、GNSS学習記録、GNSS用`localStorage`、CSS大規模整理には着手しない。
