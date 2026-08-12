# GNSS学習アプリ HANDOFF

最終更新日：2026-08-13

## 1. アプリ概要

- GNSS測量の独立学習アプリ。
- 元プロジェクト：`/home/newono/ai_proj/app_simulation/survey-learning-lab`
- 移行元commit：`0ab1b5b1fff6355ec1ec6c1322c6c3f2a764a907`
- 分離実施日：2026-08-13
- 分離先：`/home/newono/ai_proj/app_simulation/gnss-learning-lab`
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

## 6. 容量運用

- `node_modules`は新アプリ用に`npm ci`で個別作成した。移行元からコピーしていない。
- 依存導入は移行元`.npm-cache`を`--offline --cache`で一時再利用した。
- 新アプリ内に`.npm-cache`は作成していない。
- Playwrightブラウザは移行元の既存配置を環境変数で一時参照した。
- Playwrightブラウザをコピー・再取得していない。
- Playwright保存方式の恒久変更は行っていない。
- `dist`はコピーせず、通常build検証で新アプリ内に生成した。
- 新しいローカルGitリポジトリを`main`で初期化した。commitとremoteは未設定。
- 最終実測容量：全体122 MB、`node_modules` 119 MB、`dist` 912 KB、`.git` 124 KB。
- `node_modules`、`dist`、`.git`を除くソース・資料は1.9 MB。

## 7. 今回実施していないもの

- 第8章以降の実装
- GNSS学習記録・GNSS用`localStorage`
- 新規npmパッケージ・依存バージョン更新
- 元アプリからのGNSS削除
- CSSの大規模整理・再設計
- GitHub新規リポジトリ作成
- remote追加、push
- GitHub Pages設定・公開
- `/app_gnss/`等の推測によるbase固定

## 8. 残る注意点

- `styles.css`は表示維持を優先して移行元全体を残しており、未使用の基礎・トラバースCSSを含む。
- そのためCSS 357.37 kBとJS 500 kB超警告は残るが、Phase 1では大規模最適化を行わない。
- READMEの通常スモーク手順は新アプリ内ブラウザ配置を前提とする。Phase 1検証では移行元ブラウザを一時参照した。
- GitHub Pagesの公開baseはリポジトリ名確定後に設定する。
- 初回commitは履歴方針確定前のため作成していない。`git status --short`では全成果物が未追跡として表示される。

## 9. 次回開始地点

```text
GNSS独立化 Phase 2
GitHubリポジトリ作成・Pages設定・公開確認
```

第8章実装開始とはしない。
