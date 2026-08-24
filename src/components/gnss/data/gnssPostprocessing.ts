import type {
  GnssQuizAnswerEvaluation,
  GnssQuizQuestion,
} from "../types";

export const gnssPostprocessingCards = [
  { id: "what-remains", title: "観測が終わった。何が残っている？" },
  { id: "observation-vs-coordinate", title: "座標データとGNSS観測データは違う" },
  { id: "rinex", title: "RINEXとは何？" },
  { id: "realtime-vs-postprocess", title: "リアルタイム測位と後処理は何が違う？" },
  { id: "baseline-processing", title: "後処理では何をしている？" },
  { id: "coordinate-epoch", title: "その座標は、いつの座標？" },
  { id: "epoch-to-current", title: "なぜ元期 → 今期へ補正する？" },
  { id: "current-to-epoch", title: "なぜ最後に今期 → 元期へ戻す？" },
  { id: "result-workflow", title: "観測データから成果まで一本につなぐ" },
] as const;

export const gnssPostprocessingCoreMessages = [
  {
    id: "observation-coordinate",
    label: "観測値 ≠ 座標",
    summary: "GNSS観測データは解析の材料。座標は解析して得られた結果。",
  },
  {
    id: "realtime-postprocess",
    label: "リアルタイム ≠ 後処理",
    summary: "観測中に解析するか、観測データを保存して後から解析するか。",
  },
  {
    id: "datum-epoch",
    label: "測地系 ≠ 座標の時点",
    summary: "JGD2024などの測地系と、元期・今期は別の確認項目。",
  },
] as const;

export const gnssPostprocessingSavedDataGroups = [
  {
    id: "coordinate-result",
    number: 1,
    label: "計算された結果",
    role: "受信機・解析ソフトが計算した答え",
    examples: ["P1のX・Y・高さ", "緯度・経度", "FIX時の位置", "Waypoint等の座標結果"],
  },
  {
    id: "field-record",
    number: 2,
    label: "現場の観測記録",
    role: "どのように観測し、なぜ採用したかを残す記録",
    examples: ["点名・点番号", "日時・アンテナ高", "使用機器・セッション", "再測理由・採用理由"],
  },
  {
    id: "gnss-observation",
    number: 3,
    label: "GNSS観測データ",
    role: "後からGNSS解析を行うための再計算できる材料",
    examples: ["衛星ごとのコード観測", "搬送波位相", "観測時刻", "解析で利用する観測情報"],
  },
] as const;

export const gnssPostprocessingFieldSaveChecks = [
  "座標結果を保存したか",
  "再解析に使えるGNSS観測データを保存したか",
  "点名・日時・アンテナ高など解析条件を記録したか",
] as const;

export const gnssPostprocessingObservationFlow = [
  { id: "satellite", label: "GNSS衛星", detail: "衛星信号を受信" },
  { id: "observations", label: "GNSS観測データ", detail: "衛星ごと・時刻ごとのコード観測、搬送波位相、観測時刻等" },
  { id: "analysis", label: "必要な情報を組み合わせて解析", detail: "軌道・航法データ、基準側情報、受信機・アンテナ情報、解析条件等" },
  { id: "coordinate", label: "P1の位置・座標", detail: "緯度・経度、楕円体高、平面直角座標X・Y、高さ等" },
] as const;

export const gnssPostprocessingObservationCoordinateComparison = [
  ["何か", "衛星信号から得た観測値", "観測データ等から計算された位置"],
  ["例", "コード観測、搬送波位相、観測時刻", "緯度、経度、楕円体高、X、Y等"],
  ["役割", "解析の材料", "解析結果"],
  ["再解析", "適切な観測データ等があれば可能", "座標だけから元の観測値には戻れない"],
] as const;

export const gnssPostprocessingRinexRoles = [
  { id: "content", label: "GNSS観測データ", role: "中身" },
  { id: "format", label: "RINEX", role: "観測データ等を記録・交換する標準形式" },
  { id: "result", label: "座標", role: "観測データ等を解析して得られた結果" },
] as const;

export const gnssPostprocessingRinexFlow = [
  "Drogger受信機でGNSS観測",
  "RAWデータとして保存",
  "RINEXへ変換",
  "RINEX観測ファイル",
  "後処理解析",
] as const;

export const gnssPostprocessingRinexContents = [
  "観測した衛星",
  "観測時刻",
  "コード観測",
  "搬送波位相",
  "観測信号の種類",
  "受信機・アンテナ等の情報",
] as const;

export const gnssPostprocessingMethodComparison = [
  ["GNSS観測", "行う", "行う"],
  ["解析時期", "観測中", "観測後"],
  ["座標を得る時期", "現場", "後から"],
  ["FIX確認", "現場で重要", "スタティック観測そのものの中心ではない"],
  ["観測データ保存", "目的・設定による", "後処理のため重要"],
] as const;

export const gnssPostprocessingRealtimeSteps = [
  "基準局Aと移動局P1でGNSS観測",
  "リアルタイム情報を移動局へ届ける",
  "観測中に解析",
  "FLOAT → FIX",
  "現場で座標",
] as const;

export const gnssPostprocessingStaticSteps = [
  "基準側とP1側でGNSS観測",
  "両側の観測データを保存",
  "観測終了",
  "後から解析",
  "P1の座標",
] as const;

export const gnssPostprocessingBaselineExample = {
  knownPoint: { id: "A", x: 1000, y: 1000, height: 50 },
  baseline: { x: 12.345, y: 8.765, height: -0.168 },
  newPoint: { id: "P1", x: 1012.345, y: 1008.765, height: 49.832 },
} as const;

export const gnssPostprocessingBaselineSteps = [
  "既知点Aと新点P1で同じ時間帯にGNSS観測",
  "AとP1のGNSS観測データを比較",
  "A → P1の3次元的な位置の差＝基線ベクトルを求める",
  "Aの既知座標と基線ベクトルを結合",
  "P1の座標を求める",
] as const;

export const gnssPostprocessingEpochExample = {
  pointId: "T1",
  referenceEpoch: { x: 1000, y: 1000 },
  currentEpoch: { x: 1000.035, y: 999.982 },
  displacement: { x: 0.035, y: -0.018 },
  note: "地殻変動を理解するための教材用仮想値であり、実在地点の変動量ではありません。",
} as const;

export const gnssPostprocessingJgd2024Example = {
  datum: "JGD2024",
  area: "東京都本土等の例",
  horizontalReferenceDate: "2011年5月24日",
  heightReferenceDate: "2024年6月1日",
  note: "水平位置は地域により1997年1月1日を基準日とする場合があります。",
} as const;

export const gnssPostprocessingCoordinateChecks = [
  ["測地系", "JGD2024", "どの測地基準か"],
  ["座標の時点", "元期 / 今期", "いつの位置として表すか"],
  ["観測日時", "2026年○月○日", "いつ観測したか"],
  ["平面座標系", "第IX系", "どの投影・系番号か"],
  ["高さ", "楕円体高 / 標高", "何を基準とした高さか"],
] as const;

export const gnssPostprocessingEpochToCurrentSteps = [
  "GNSS観測",
  "基線解析",
  "観測時点側の基線ベクトル",
  "既知点の公表成果【元期】",
  "セミ・ダイナミック補正：元期 → 今期",
  "既知点【今期】",
  "今期側で測量計算",
  "新点P1【今期】",
] as const;

export const gnssPostprocessingSemiDynamicParameter = {
  mesh: "全国陸域をカバーする約5 kmメッシュ",
  update: "年度ごとに提供",
  currentReference: "2026年度はSemiDyna2026.par（2026年4月1日～2027年3月31日）",
  caution: "年度固有名は暗記せず、観測年度・作業規程等に対応する最新資料を確認します。",
} as const;

export const gnssPostprocessingCurrentToEpochExample = {
  current: { x: 1012.38, y: 1008.747 },
  displacement: { x: 0.035, y: -0.018 },
  reference: { x: 1012.345, y: 1008.765 },
  note: "補正の向きと符号を理解するための教材用仮想値です。",
} as const;

export const gnssPostprocessingResultWorkflow = [
  { id: "observe", phase: "現場観測", label: "P1でGNSS観測" },
  { id: "save", phase: "現場観測", label: "GNSS観測データを保存" },
  { id: "format", phase: "現場観測", label: "RAW / RINEX等として利用" },
  { id: "compare", phase: "後処理の代表例", label: "基準側＋P1のGNSS観測データ" },
  { id: "baseline", phase: "後処理の代表例", label: "基線解析 → 観測時点側の基線ベクトル" },
  { id: "known-current", phase: "座標時点を整合", label: "既知点の公表成果【元期】→ 必要に応じて今期へ補正" },
  { id: "calculate", phase: "座標時点を整合", label: "既知点【今期】と基線で測量計算 → P1【今期】" },
  { id: "result", phase: "成果化", label: "必要に応じて今期 → 元期補正 → P1の成果【元期】" },
] as const;

export const gnssPostprocessingExternalLinks = [
  { id: "raw", cardIds: [1, 4], label: "スタティック観測 / RAW｜Drogger公式", href: "https://www.bizstation.jp/ja/drogger/man/raw_pre.html", source: "drogger" },
  { id: "import", cardIds: [3, 9], label: "観測データのインポート / RINEX変換｜Drogger公式", href: "https://www.bizstation.jp/ja/drogger/man/drp_import_raw.html", source: "drogger" },
  { id: "rinex", cardIds: [3], label: "RINEX観測データのインポート｜Drogger公式", href: "https://www.bizstation.jp/ja/drogger/man/drp_rinex.html", source: "drogger" },
  { id: "baseline", cardIds: [5, 9], label: "基線解析をする｜Drogger公式", href: "https://www.bizstation.jp/ja/drogger/man/drp_base_line_proc.html", source: "drogger" },
  { id: "drogger-epoch", cardIds: [6, 7, 8], label: "今期・元期と地殻変動補正｜Drogger公式", href: "https://www.bizstation.jp/ja/drogger/man/smd.html", source: "drogger" },
  { id: "geonet", cardIds: [2, 3, 5], label: "電子基準点データ｜国土地理院", href: "https://www.gsi.go.jp/denshi/denshi_data.html", source: "gsi" },
  { id: "semidyna", cardIds: [6, 7, 8, 9], label: "プレート運動による地殻変動の補正（定常）｜国土地理院", href: "https://www.gsi.go.jp/sokuchikijun/semidyna.html", source: "gsi" },
] as const;

export const gnssPostprocessingQuizQuestions = [
  {
    id: "gnss-postprocessing-q01-reanalysis-data",
    questionType: "仕組み理解",
    prompt: "P1をGNSSで観測し、X・Y・高さ・FIX結果を保存した。しかしGNSS観測データは保存していなかった。後日、この観測について衛星ごとの観測値から基線解析をやり直したい。最も適切なのはどれか。",
    options: [
      { id: "q01-restore-from-fix", label: "FIX座標が残っていれば、元のGNSS観測データを復元できる。", incorrectReason: "FIX座標の中に衛星ごとのコード観測や搬送波位相が保存されているわけではなく、座標から元の観測データは復元できません。" },
      { id: "q01-create-rinex-from-coordinate", label: "X・Y・高さからRINEX観測ファイルを作成できる。", incorrectReason: "X・Y・高さは解析後の結果であり、観測時の衛星ごとの観測値を持つRINEX観測ファイルには戻せません。" },
      { id: "q01-cannot-reanalyse", label: "座標結果だけから元のGNSS観測データには戻せないため、この観測そのものを再解析することはできない。", incorrectReason: null },
      { id: "q01-antenna-height-only", label: "アンテナ高が分かればGNSS観測データは不要である。", incorrectReason: "アンテナ高は重要な観測条件ですが、それだけでは再解析できず、解析に利用できるGNSS観測データ等が必要です。" },
    ],
    correctOptionId: "q01-cannot-reanalyse",
    correctReason: "座標はGNSS観測データ等から計算された結果です。後から観測そのものを再解析するには、解析可能なGNSS観測データと関連情報を保存しておく必要があります。",
    fieldCheck: "座標結果だけでなく、再解析できる材料と解析条件が残っているか確認する。",
  },
  {
    id: "gnss-postprocessing-q02-observation-vs-coordinate",
    questionType: "用語整理",
    prompt: "GNSS観測データと座標データの関係として、最も適切なのはどれか。",
    options: [
      { id: "q02-material-and-result", label: "GNSS観測データは解析の材料で、座標はそれらを解析して得られた結果である。", incorrectReason: null },
      { id: "q02-satellite-sends-xy", label: "GNSS衛星から平面直角座標X・Yが直接送られてくる。", incorrectReason: "受信機が衛星信号を観測し、その情報等から位置を計算します。X・Yが衛星から直接届くわけではありません。" },
      { id: "q02-phase-is-coordinate", label: "搬送波位相は座標データの一種である。", incorrectReason: "搬送波位相はGNSSが観測する値の一つで、座標そのものではありません。" },
      { id: "q02-coordinate-includes-phase", label: "座標が保存されていれば、衛星ごとの搬送波位相も保存されている。", incorrectReason: "座標結果の保存とGNSS観測データの保存は別です。" },
    ],
    correctOptionId: "q02-material-and-result",
    correctReason: "コード観測や搬送波位相等が観測データで、それらを必要な情報と組み合わせて解析し、座標を求めます。",
    fieldCheck: "観測値と解析結果をファイル名や表示だけで混同しない。",
  },
  {
    id: "gnss-postprocessing-q03-rinex",
    questionType: "用語整理",
    prompt: "RINEXについて最も適切なのはどれか。",
    options: [
      { id: "q03-coordinate-only-format", label: "GNSSで計算したX・Y座標だけを保存する形式。", incorrectReason: "RINEX観測ファイルは計算済み座標だけでなく、衛星ごとの観測値等を記録します。" },
      { id: "q03-drogger-only", label: "Droggerだけで使用できる専用の観測形式。", incorrectReason: "RINEXは異なる受信機や解析ソフト間でもGNSSデータを扱いやすくする標準形式です。" },
      { id: "q03-same-as-observation", label: "GNSS観測データそのものを意味する名称。", incorrectReason: "GNSS観測データは中身、RINEXはその中身等を記録・交換する形式です。" },
      { id: "q03-standard-exchange-format", label: "GNSS観測データ等を受信機や解析ソフトを越えて保存・交換するための標準形式。", incorrectReason: null },
    ],
    correctOptionId: "q03-standard-exchange-format",
    correctReason: "観測データ＝中身、RINEX＝その中身等を記録・交換する形式、座標＝解析結果と区別します。",
    fieldCheck: "RINEX観測ファイルだけで解析条件がすべてそろうとは限らない。",
  },
  {
    id: "gnss-postprocessing-q04-realtime-vs-postprocess",
    questionType: "方式選択",
    prompt: "RTKとスタティック後処理の違いとして、最も適切なのはどれか。",
    options: [
      { id: "q04-rtk-no-observations", label: "RTKはGNSS観測データを使用せず、スタティックだけが使用する。", incorrectReason: "RTKでもGNSS観測データを利用します。" },
      { id: "q04-analysis-timing", label: "RTKは観測中に解析して座標を求め、スタティックは観測データを保存して後から解析する。", incorrectReason: null },
      { id: "q04-static-average-only", label: "スタティックは観測した座標を長時間平均するだけである。", incorrectReason: "スタティックは一定時間取得したGNSS観測データを使って後処理解析します。" },
      { id: "q04-rtk-no-carrier", label: "RTKでは搬送波位相を使用できない。", incorrectReason: "RTKでは搬送波位相が高精度な相対測位に重要な役割を持ちます。" },
    ],
    correctOptionId: "q04-analysis-timing",
    correctReason: "どちらもGNSS観測を行い、大きな違いは観測しながら解析するか、保存して後から解析するかです。",
    fieldCheck: "測位方式に応じて解析時期と必要な保存データを確認する。",
  },
  {
    id: "gnss-postprocessing-q05-baseline",
    questionType: "仕組み理解",
    prompt: "既知点Aと新点P1で同じ時間帯にGNSS観測を行い、観測データを保存した。スタティック後処理で行うこととして最も適切なのはどれか。",
    options: [
      { id: "q05-last-fix", label: "P1で最後に表示されたFIX座標だけを採用する。", incorrectReason: "保存したGNSS観測データから2地点の位置関係を解析します。" },
      { id: "q05-average-coordinates", label: "AとP1の座標値を単純に平均する。", incorrectReason: "座標を平均するのではなく、2地点のGNSS観測から相対位置関係を求めます。" },
      { id: "q05-three-dimensional-baseline", label: "AとP1のGNSS観測データを比較し、AからP1までの3次元的な位置の差＝基線ベクトルを求める。", incorrectReason: null },
      { id: "q05-horizontal-only", label: "AとP1の水平距離だけを求める。", incorrectReason: "基線は水平距離だけでなく、X・Y・高さ方向を含む3次元的な位置関係です。" },
    ],
    correctOptionId: "q05-three-dimensional-baseline",
    correctReason: "基線解析でA→P1の3次元的な位置の差を求め、既知点Aの座標と結び付けてP1の座標を求めます。",
    fieldCheck: "同時観測区間と基準側・新点側の必要データを確認する。",
  },
  {
    id: "gnss-postprocessing-q06-epoch-and-datum",
    questionType: "用語整理",
    prompt: "JGD2024と元期・今期について、最も適切なのはどれか。",
    options: [
      { id: "q06-jgd-maps-to-epoch", label: "JGD2024は今期、JGD2011は元期を意味する。", incorrectReason: "JGD2011とJGD2024は測地系・測地成果の名称に関する話で、元期・今期という時点の分類ではありません。" },
      { id: "q06-all-2024", label: "JGD2024の座標はすべて2024年を元期とする。", incorrectReason: "名称に2024と付いていても、すべての座標の元期が2024年という意味ではありません。" },
      { id: "q06-fix-time", label: "元期・今期はGNSSのFIX時刻を表す。", incorrectReason: "観測開始時刻やFIX時刻ではなく、座標をどの基準時点で表すかという概念です。" },
      { id: "q06-separate-concepts", label: "JGD2024は測地系、元期・今期は座標をどの時点で表すかという別の概念である。", incorrectReason: null },
    ],
    correctOptionId: "q06-separate-concepts",
    correctReason: "成果を確認するときは、測地系と座標の時点を別々に確認します。",
    fieldCheck: "測地系、座標の時点、観測日時、系番号、高さ基準を別項目で確認する。",
  },
  {
    id: "gnss-postprocessing-q07-epoch-to-current",
    questionType: "仕組み理解",
    prompt: "対象となる基準点測量で、既知点の公表成果を元期から今期へ補正する主な理由として最も適切なのはどれか。",
    options: [
      { id: "q07-align-epochs", label: "現在のGNSS観測による位置関係と、既知点座標の時点をそろえて計算するため。", incorrectReason: null },
      { id: "q07-reference-is-wrong", label: "元期座標は誤っているため修正する必要があるから。", incorrectReason: "元期の公表成果は、その基準時点における成果です。問題は今期の観測と時点が異なることです。" },
      { id: "q07-change-datum", label: "JGD2011をJGD2024へ変換するため。", incorrectReason: "元期→今期は測地系変換ではなく、同じ測地系の中で座標の時点を整合させる処理です。" },
      { id: "q07-change-projection", label: "平面直角座標を緯度・経度へ変換するため。", incorrectReason: "投影座標の変換とは別で、地殻変動を考慮した座標時点の整合を扱います。" },
    ],
    correctOptionId: "q07-align-epochs",
    correctReason: "現在側のGNSS観測による位置関係と既知点成果の時点をそろえ、地殻変動による相対位置関係の不整合を抑えます。",
    fieldCheck: "適用対象、観測年度、作業規程、使用する既知点を確認する。",
  },
  {
    id: "gnss-postprocessing-q08-current-to-epoch",
    questionType: "仕組み理解",
    prompt: "今期で新点P1の位置を求めたあと、対象となる測量で今期から元期へ補正する理由として最も適切なのはどれか。",
    options: [
      { id: "q08-move-physical-point", label: "現在のP1を元期当時の物理的位置へ移動させるため。", incorrectReason: "現地のP1を昔の場所へ戻すのではなく、同じ現地点を元期という基準時点の座標値で表し直します。" },
      { id: "q08-align-results", label: "既存の国家座標・基準点成果と同じ基準時点の測量成果として整合させるため。", incorrectReason: null },
      { id: "q08-rtk-to-static", label: "RTKをスタティックへ変換するため。", incorrectReason: "測位方式と座標の時点は別の概念です。" },
      { id: "q08-height-conversion", label: "楕円体高を標高へ変換するため。", incorrectReason: "高さ基準の変換とは別で、地殻変動を考慮して座標の時点をそろえる処理です。" },
    ],
    correctOptionId: "q08-align-results",
    correctReason: "対象となる測量では、既存の国家座標や基準点成果と同じ基準時点へそろえて測量成果として利用します。",
    fieldCheck: "成果用途と必要な基準時点を確認し、補正の要否を判断する。",
  },
] as const satisfies readonly GnssQuizQuestion[];

export function getGnssPostprocessingQuizQuestion(
  questionId: string,
): GnssQuizQuestion | null {
  return gnssPostprocessingQuizQuestions.find((question) => question.id === questionId) ?? null;
}

export function getGnssPostprocessingQuizOptionLetter(
  questionId: string,
  optionId: string,
): string | null {
  const question = getGnssPostprocessingQuizQuestion(questionId);
  const optionIndex = question?.options.findIndex((option) => option.id === optionId);
  if (optionIndex === undefined || optionIndex < 0) {
    return null;
  }
  return String.fromCharCode(65 + optionIndex);
}

export function evaluateGnssPostprocessingQuizAnswer(
  questionId: string,
  optionId: string,
): GnssQuizAnswerEvaluation | null {
  const question = getGnssPostprocessingQuizQuestion(questionId);
  const selectedOption = question?.options.find((option) => option.id === optionId);
  const correctOption = question?.options.find(
    (option) => option.id === question.correctOptionId,
  );
  if (!question || !selectedOption || !correctOption) {
    return null;
  }
  return {
    questionId,
    selectedOptionId: selectedOption.id,
    selectedOptionLabel: selectedOption.label,
    correctOptionId: correctOption.id,
    correctOptionLabel: correctOption.label,
    isCorrect: selectedOption.id === correctOption.id,
    selectedAnswerReason: selectedOption.incorrectReason,
    correctReason: question.correctReason,
    fieldCheck: question.fieldCheck,
  };
}
