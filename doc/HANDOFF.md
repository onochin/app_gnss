# GNSS学習アプリ HANDOFF

最終更新日：2026-08-24

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
| 8 | 自前RTK④ 現場観測と点検 | `gnss-field-observation` | available |
| 9 | 観測データと後処理解析 | `gnss-postprocessing` | available |

第10章以降は未実装。第9章末尾には第10章への問いだけを実装している。

## 4. 現在の重要仕様

- GNSS第1章～第9章は`SurveyGnss`内で常時マウントする。
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

## 12. GNSS測量教材 第8章（2026-08-24）

### 12.1 実装内容

- 第8章「自前RTK④ 現場観測と点検」を、安定章ID`gnss-field-observation`で利用可能にした。
- 要件書どおり9カードを実装した。
  1. FIXした。その座標を採用してよい？
  2. P1を観測する前に何を確認する？
  3. 観測中は何を見ている？
  4. FIXした瞬間を記録すればよい？
  5. 1回のFIXだけで十分？
  6. 既知点で確認すると何が分かる？
  7. この観測は採用する？再測する？
  8. 現場で何を記録して残す？
  9. 自前RTKの現場観測を一本につなぐ
- 章全体を`安定性 → 再現性 → 整合性 → 採用判断`の4段階で構成した。
- カード5だけに、再現例・非再現例を切り替え、`観測① → 測位状態リセット → 3D / FLOAT → 独立して再FIX → 観測② → 2観測比較`を進める操作を実装した。
- カード7だけに、6ケースを`採用候補 / 再測 / 原因確認`から判断する操作を実装した。
- カード1～4、6、8、9は静的な図、チェック表、タイムライン、比較、記録例、フローとし、不要な操作を追加していない。
- 公共測量の数値は、国土地理院「作業規程の準則」（令和7年3月31日改正）第122条の`RTK法による地形、地物等の測定`における標準例として限定した。
  - FIX後10エポック以上
  - データ取得間隔1秒
  - 初期化を行う観測点での再初期化・2セット目観測
  - セット間較差 ΔN / ΔE 20 mm、ΔU 30 mm
- 上記数値をすべてのRTKに共通する普遍的採否基準とはせず、対象業務の作業規程・品質基準に従う注記をカード4・7へ表示した。
- Drogger固有のGNSS Hot Restart、Status / RTCM3、FixMode / Age、「FIX以外をエラーとする」、Waypoint / セッション等は、一般的なGNSS・RTKの考え方を説明した後の実機例として扱った。
- 要件書指定のDrogger公式マニュアル・公式ブログへのカード別リンクを配置し、カード4・7には国土地理院の公式PDFも配置した。
- カード8は4分類と完成した簡潔な記録例だけとし、入力フォームを設けなかった。実習編「RTK観測記録を作ってみる」は候補として注記し、本編へ混在させていない。
- 確認問題9問を実装し、正答位置を`B / D / A / C / B / D / A / C / B`へ分散した。全27件の誤答選択肢に個別理由を持たせた。

### 12.2 変更ファイル

- `src/components/gnss/data/gnssFieldObservation.ts`（新規）
- `src/components/gnss/lessons/GnssFieldObservationLesson.tsx`（新規）
- `src/tests/gnssFieldObservation.test.ts`（新規）
- `src/components/gnss/types.ts`
- `src/components/gnss/gnssCourse.ts`
- `src/components/gnss/gnssNavigation.ts`
- `src/components/gnss/GnssLessonNavigation.tsx`
- `src/components/gnss/SurveyGnss.tsx`
- `src/styles.css`
- `src/tests/gnssBaselineFix.test.ts`
- `src/tests/gnssCorrectionDelivery.test.ts`
- `src/tests/gnssNavigation.test.ts`
- `src/tests/gnssOwnBaseStation.test.ts`
- `scripts/gnss-smoke.mjs`
- `README.md`
- `doc/HANDOFF.md`

### 12.3 維持事項

- 第1章～第7章の教材本文、図、操作、固定教材値、計算、既存章ID、カードID、問題ID、選択肢ID、章順は変更していない。
- 第1章～第8章を`SurveyGnss`内で常時マウントし、非選択章を`hidden`にする方式を維持した。
- 章往復時のReact操作状態・問題回答の保持、ブラウザ再読込み時の初期化を維持した。
- GNSS用`localStorage`、学習記録、クラウド同期は追加していない。
- 外部API、実機通信、観測ファイル読込み、新規npmパッケージ、依存更新は追加していない。
- `.gnss-*` CSS名前空間、色以外の状態表示、キーボード操作、可視フォーカス、非有限値の安全表示を維持した。
- 第9章のRINEX、後処理解析、元期・今期、セミ・ダイナミック補正の詳細には着手していない。

### 12.4 実装前の公式情報確認

- 国土地理院「作業規程の準則」公式PDFを確認した。
  - 令和7年3月31日国土交通省告示第240号による一部改正を確認した。
  - 第122条の適用対象と、10エポック以上、1秒、再初期化、セット間較差の標準を確認した。
- Drogger現行公式マニュアル・公式ブログを確認した。
  - 「観測のヒント」で、悪条件時のミスFIX確認、再FIX前のGNSS Hot Restart、測位状態リセット後に3D / Floatへ戻る説明を確認した。
  - 「セッションを設定する」で、「FIX以外をエラーとする」ON時にFloat等で即エラー・記録中止となる説明を確認した。
  - Waypoint、セッション、アンテナ高、観測手簿・記簿等の指定URLが現行で到達可能であることを確認した。

### 12.5 最終ローカル検証

- `npm run typecheck -- --pretty false`：成功、型エラー0件。
- `npm test -- --reporter=verbose`：成功、9テストファイル・118テストすべて成功。
- `npm run build`：成功、38 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.41 kB。
  - CSS：376.88 kB、gzip 55.61 kB。
  - JS：613.45 kB、gzip 163.01 kB。
- `node --check scripts/gnss-smoke.mjs`：成功。
- ローカルGNSS Playwright完全スモーク：成功。
  - 第1章～第8章へ移動可能。
  - 確認問題59問、既存主要操作、第8章カード5・7の操作を確認した。
  - 章往復時の状態保持、再読込み時の初期化、localStorageキー不変を確認した。
  - キーボード操作・可視フォーカスを確認した。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。
- 目視画像は既存画像を上書きせず、次の新規名で`/tmp`へ保存した。
  - `/tmp/gnss-chapter8-full-1366-20260824.png`
  - `/tmp/gnss-chapter8-full-390-20260824.png`
  - カード4・5・7・8・9の1366px版・390px版も同じ`gnss-chapter8-card*-*-20260824.png`形式で保存した。
- 目視でカード4・5・7・8・9を確認し、重大な文字重なり、欠け、ページ全体の横はみ出しはなかった。

### 12.6 警告・残る注意点

- JSが500 kBを超える既知のVite警告は継続する。警告だけを理由とするコード分割・大規模最適化は実施していない。
- `PLAYWRIGHT_BROWSERS_PATH=0`のプロジェクト内配置にはChromiumがなかったため、Phase 2と同じ既存共有ブラウザ配置を環境変数で一時参照した。新規ダウンロード、依存追加、恒久設定変更は行っていない。
- 第9章以降、実習編本体、GNSS学習記録、GNSS用`localStorage`は未実装。

### 12.7 次回開始地点

```text
GNSS測量教材 第8章 完了
第1章～第8章 available
第9章以降は未実装
次のPhaseはユーザー指示待ち
```

## 13. 第8章カード1 導入文の文字色修正（2026-08-24）

### 13.1 変更内容

- カード1「FIXした。その座標を採用してよい？」の導入文「移動局P1で整数アンビギュイティが固定され、3次元基線から座標が表示されました。」が上位要素の白文字を継承していたため、問いの文と同じ`#173f60`を明示した。
- 教材本文、操作、固定値、問題、状態管理は変更していない。
- 第9章以降には着手していない。

### 13.2 変更ファイル

- `src/styles.css`
- `doc/HANDOFF.md`

### 13.3 検証結果

- `npm run typecheck -- --pretty false`：成功、型エラー0件。
- `npm test -- --reporter=verbose`：成功、9テストファイル・118テストすべて成功。
- `npm run build`：成功、38 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.41 kB。
  - CSS：376.89 kB、gzip 55.61 kB。
  - JS：613.45 kB、gzip 163.01 kB。
- `node --check scripts/gnss-smoke.mjs`：成功。
- ローカルGNSS Playwright完全スモーク：成功。
  - 第1章～第8章、確認問題59問、第8章カード5・7の操作を確認した。
  - 章往復時の状態保持、再読込み時の初期化、キーボード操作、可視フォーカス、localStorageキー不変を確認した。
  - 1366px・390pxともページ全体の横はみ出しなし。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。
- JSが500 kBを超える既知のVite警告は継続する。

## 14. GNSS測量教材 第9章（2026-08-24）

### 14.1 実装内容

- 第9章「観測データと後処理解析」を、安定章ID`gnss-postprocessing`で利用可能にした。
- 要件書どおり9カードを実装した。
  1. 観測が終わった。何が残っている？
  2. 座標データとGNSS観測データは違う
  3. RINEXとは何？
  4. リアルタイム測位と後処理は何が違う？
  5. 後処理では何をしている？
  6. その座標は、いつの座標？
  7. なぜ元期 → 今期へ補正する？
  8. なぜ最後に今期 → 元期へ戻す？
  9. 観測データから成果まで一本につなぐ
- 章全体を次の3メッセージで構成した。
  - 座標と観測データは別物
  - 後処理は基準局と移動局の同時観測から基線ベクトルを求める
  - セミ・ダイナミック補正は元期・今期の時点をそろえて計算し、成果を元期へ戻す
- 保存対象チェックリスト、座標値と観測値の比較、RINEXの役割、リアルタイム測位と後処理の比較、基線解析フロー、元期・今期、JGD2024との区別、セミ・ダイナミック補正の往復フローを静的教材として実装した。確認問題以外の不要な操作は追加していない。
- 要件書指定の固定教材値を実装した。
  - 基準局A：`X=1000.000 / Y=1000.000 / H=50.000 m`
  - 基線ベクトル：`ΔX=+12.345 / ΔY=+8.765 / ΔH=-0.168 m`
  - 移動局P1：`X=1012.345 / Y=1008.765 / H=49.832 m`
  - 元期から今期への変位：`ΔX=+0.035 / ΔY=-0.018 m`
  - 今期成果`1012.380 / 1008.747 m`から元期成果`1012.345 / 1008.765 m`へ戻る例
- 国土地理院の現行情報に合わせ、測地成果2024の基準日、年次更新される地殻変動補正パラメータ、約5 kmメッシュ、公共測量での適用範囲を注記した。数値例は教材用の単純化した平面例であり、実務成果の代替ではないことを明示した。
- 国土地理院とDroggerの公式ページだけを「公式資料」としてカード別に配置した。
- 確認問題8問を実装し、正答位置を`C / A / D / B / C / D / A / B`へ分散した。A～Dを各2回とし、全24件の誤答選択肢に個別理由を持たせた。未知の問題ID・選択肢IDは安全に`null`を返す。
- 章ヘッダーに到達目標、重要用語、注意事項を表示し、進捗バーへARIA値を設定した。

### 14.2 変更ファイル

- `src/components/gnss/data/gnssPostprocessing.ts`（新規）
- `src/components/gnss/lessons/GnssPostprocessingLesson.tsx`（新規）
- `src/tests/gnssPostprocessing.test.ts`（新規）
- `src/components/gnss/types.ts`
- `src/components/gnss/gnssCourse.ts`
- `src/components/gnss/gnssNavigation.ts`
- `src/components/gnss/SurveyGnss.tsx`
- `src/styles.css`
- `src/tests/gnssBaselineFix.test.ts`
- `src/tests/gnssCorrectionDelivery.test.ts`
- `src/tests/gnssFieldObservation.test.ts`
- `src/tests/gnssNavigation.test.ts`
- `src/tests/gnssOwnBaseStation.test.ts`
- `scripts/gnss-smoke.mjs`
- `README.md`
- `doc/HANDOFF.md`

### 14.3 維持事項

- 第1章～第8章の教材本文、図、操作、固定教材値、計算、既存章ID、カードID、問題ID、選択肢ID、章順は変更していない。
- 第1章～第9章を`SurveyGnss`内で常時マウントし、非選択章を`hidden`にする方式を維持した。
- 章往復時のReact操作状態・問題回答の保持、ブラウザ再読込み時の初期化を維持した。
- GNSS用`localStorage`、学習記録、クラウド同期は追加していない。
- 外部API、実機通信、観測ファイル読込み、新規npmパッケージ、依存更新は追加していない。
- `.gnss-*` CSS名前空間、色以外の状態表示、キーボード操作、可視フォーカス、非有限値の安全表示を維持した。
- `package.json`、`package-lock.json`、`vite.config.ts`、`.github/workflows/deploy.yml`は変更していない。
- 第10章以降、実習編本体、公開、remote追加、pushには着手していない。

### 14.4 実装前の公式情報確認

- 国土地理院「[セミ・ダイナミック補正](https://www.gsi.go.jp/sokuchikijun/semidyna.html)」を確認した。
  - 最終更新日が2026年4月1日であり、`SemiDyna2026`の適用期間が2026年4月1日～2027年3月31日であることを確認した。
  - 測地成果2024の水平位置の基準日が地域により2011年5月24日または1997年1月1日、標高の基準日が2024年6月1日であることを確認した。
  - 公共測量での適用範囲、約5 kmメッシュ、`元期 → 今期 → 観測・計算 → 元期`の標準的な流れを確認した。
- 国土地理院「[電子基準点データ提供サービス](https://www.gsi.go.jp/denshi/denshi_data.html)」で、30秒間隔のGNSS観測データがRINEX形式で提供されることを確認した。
- Drogger現行公式マニュアルを確認した。
  - RAW / RINEXのインポート、RINEX作成、2点間ベクトルを求める基線解析、相対測位結果の元期・今期変換に関する指定URLが現行で到達可能であることを確認した。

### 14.5 最終ローカル検証

- `npm run typecheck -- --pretty false`：成功、型エラー0件。
- `npm test -- --reporter=verbose`：成功、10テストファイル・133テストすべて成功。
- `npm run build`：成功、40 modules transformed。
  - `dist/index.html`：0.58 kB、gzip 0.40 kB。
  - CSS：387.76 kB、gzip 57.27 kB。
  - JS：658.72 kB、gzip 173.76 kB。
- `npm run build -- --mode github-pages`：成功、40 modules transformed。
  - `dist/index.html`：0.59 kB、gzip 0.41 kB。
  - CSS：387.76 kB、gzip 57.27 kB。
  - JS：658.72 kB、gzip 173.76 kB。
  - HTMLのJS/CSS参照が`/app_gnss/assets/`配下であることを確認した。
- `node --check scripts/gnss-smoke.mjs`：成功。
- `git diff --check`：成功。
- ローカルGNSS Playwright完全スモーク：成功。
  - 第1章～第9章へ移動可能。
  - 確認問題67問、第9章9カード・8問、既存主要操作を確認した。
  - 第9章の正答・誤答理由・フォーカス移動、章往復時の状態保持、再読込み時の初期化、localStorageキー不変を確認した。
  - 第1章～第9章のキーボード操作・可視フォーカスを確認した。
  - 1366px：`clientWidth=1366 / scrollWidth=1366`。
  - 390px：`clientWidth=390 / scrollWidth=390`。
  - コンソールエラー0件、ページ例外0件、外部API通信0件。
- 目視画像は既存画像を上書きせず、次の新規名で`/tmp`へ保存した。
  - `/tmp/gnss-chapter9-full-1366-20260824.png`
  - `/tmp/gnss-chapter9-full-390-20260824.png`
  - カード3・5・6・7・8・9の1366px版・390px版も同じ`gnss-chapter9-card*-*-20260824.png`形式で保存した。
  - 第8章回帰画像も`gnss-chapter9-regression-chapter8-*-20260824.png`形式で保存した。
- 目視で章全体と主要カードを確認し、重大な文字重なり、欠け、ページ全体の横はみ出しはなかった。

### 14.6 警告・残る注意点

- JSが500 kBを超える既知のVite警告は継続する。警告だけを理由とするコード分割・大規模最適化は実施していない。
- `PLAYWRIGHT_BROWSERS_PATH=0`のプロジェクト内配置にはChromiumがなかったため、既存共有ブラウザ配置を環境変数で一時参照した。新規ダウンロード、依存追加、恒久設定変更は行っていない。
- 本GNSS専用プロジェクトには基礎教材・閉合トラバース本体および各専用スモークが存在しないため、GNSSと無関係な回帰スモークは対象外とした。
- 依頼書が参照する詳細ソースHTMLは本プロジェクト内に存在しなかったため、依頼書・設計メモ・現行の公式一次情報を正本として実装した。
- 第10章以降、実習編本体、GNSS学習記録、GNSS用`localStorage`は未実装。

### 14.7 次回開始地点

```text
GNSS測量教材 第9章 実装・ローカル検証完了
第1章～第9章 available
次はGNSS第9章のユーザー実機確認
第10章以降には着手しない
```
