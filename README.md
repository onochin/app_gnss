# GNSS測量

GNSS測量を、図、ミニ操作、固定教材値、確認問題から段階的に学ぶWebアプリです。
「測量理解ラボ」内で実装されたGNSS教材を、2026-08-13に独立アプリとして分離しました。

> このアプリは学習用です。実務上の測量成果、公共測量、登記、設計、
> 品質保証を必要とする計算や成果表の作成には使用しないでください。

## 公開先

- GitHub repository：[onochin/app_gnss](https://github.com/onochin/app_gnss)
- GitHub Pages：[GNSS測量](https://onochin.github.io/app_gnss/)

GitHub Pagesは、`main`へのpushを起点にGitHub Actionsで公開します。

```text
main push
↓
GitHub Actions
↓
typecheck / test / GitHub Pages build
↓
deploy
```

Pages用buildではViteの`github-pages` modeを使い、baseを`/app_gnss/`に設定します。
通常のローカル起動・buildは引き続きbase `/`です。

## 現在利用できる章

| 章 | タイトル | 安定章ID | 状態 |
| --- | --- | --- | --- |
| 第1章 | GNSS測量の全体像 | `gnss-overview` | available |
| 第2章 | GNSSは何を観測しているのか | `gnss-observations` | available |
| 第3章 | GNSSの座標と高さ | `gnss-coordinate-height` | available |
| 第4章 | GNSS測位方式を比較する | `gnss-positioning-methods` | available |
| 第5章 | 自前RTK① 基準局をつくる | `gnss-own-base-station` | available |
| 第6章 | 自前RTK② 補正情報を届ける | `gnss-correction-delivery` | available |
| 第7章 | 自前RTK③ 基線解析とFIX | `gnss-baseline-fix` | available |
| 第8章 | 自前RTK④ 現場観測と点検 | `gnss-field-observation` | available |
| 第9章 | 観測データと後処理解析 | `gnss-postprocessing` | available |
| 第10章 | ネットワーク型RTKとCLAS | `gnss-network-rtk-clas` | available |

第11章以降は未実装です。

## 章ナビゲーション

- PCでは、カテゴリ型の左サイドバーから第1章～第10章を選択します。
- モバイルでは、本文幅を優先したコンパクトな章選択UIを使用します。

## 主な内容

- 既知点Aの自前基準局と移動局による新点P1の仮想現場
- コード観測、搬送波位相、整数アンビギュイティ、複数周波数・複数GNSS
- 地心直交座標、緯度・経度・楕円体高、平面直角座標、標高
- 単独測位、DGNSS、自前RTK、ネットワーク型RTK、CLAS、スタティック
- 基準局準備、RTCM、Ntrip、FLOAT、FIX、3次元基線
- FIX後の複数エポック、再初期化・再FIX、既知点確認、採用判断、観測記録
- 観測データと座標、RINEX、後処理の基線解析、元期・今期、セミ・ダイナミック補正
- 第1～10章の確認問題76問

教材値と図は学習用の固定例です。実行時の外部API通信、実機通信、観測ファイル読込みはありません。

## 状態保存方針

- 章を往復しても、同じ画面を開いている間は操作状態と問題回答を保持します。
- ブラウザを再読込みすると初期状態へ戻ります。
- GNSS用の`localStorage`、学習記録、クラウド同期はありません。

## 技術構成

- React 19
- Vite 8
- TypeScript 6
- Vitest 4
- Playwright 1.61
- SVG / CSS
- バックエンドなし、外部APIなし

## ローカル起動

依存バージョンは`package-lock.json`で固定しています。

```bash
npm ci --ignore-scripts
npm run dev
```

本番用ファイルを作成して確認する場合：

```bash
npm run build
npm run preview
```

GitHub Pages用のbaseでbuildする場合：

```bash
npm run build -- --mode github-pages
```

## 検証

```bash
npm run typecheck -- --pretty false
npm test -- --reporter=verbose
npm run build
node --check scripts/gnss-smoke.mjs
```

GNSS Playwrightスモークを行う場合は、別ターミナルでローカルサーバーを起動します。

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

Chromium Headless Shellが利用できる環境で次を実行します。

```bash
env PLAYWRIGHT_BROWSERS_PATH=0 node scripts/gnss-smoke.mjs
```

スモークは第1～10章、主要操作、確認問題、章往復時の状態保持、再読込み時の初期化、
1366px・390px、キーボード操作、可視フォーカス、コンソールエラー、ページ例外、
外部通信を確認します。既存スクリーンショットは上書きしません。

## 主な構成

```text
src/
├── App.tsx
├── main.tsx
├── styles.css
├── components/
│   ├── gnss/                 # 第1～10章、教材データ、純粋関数、確認問題
│   ├── layout/Header.tsx     # GNSS専用アプリの外枠
│   └── basics/data/
│       └── coordinateAndHeight.ts  # 第3章が参照する既存固定座標データ
└── tests/                    # GNSS関連単体テスト
scripts/
└── gnss-smoke.mjs
doc/
└── HANDOFF.md
```

`styles.css`は表示退行を避けるため、Phase 1では移行元のCSSを維持しています。
未使用CSSの整理は独立動作と回帰確認を優先して見送っています。

## 分離元

- 元プロジェクト：`/home/newono/ai_proj/app_simulation/survey-learning-lab`
- 移行元commit：`0ab1b5b1fff6355ec1ec6c1322c6c3f2a764a907`
- 分離時点のGNSS：第1章～第7章

GNSS独立化 Phase 2でGitHubリポジトリを新規作成し、GitHub ActionsによるPages公開を設定しました。
