import type {
  GnssQuizAnswerEvaluation,
  GnssQuizQuestion,
} from "../types";

export const gnssFieldObservationCards = [
  {
    id: "fix-not-finish",
    title: "FIXした。その座標を採用してよい？",
    focus: "FIXを点検の出発点として捉える",
  },
  {
    id: "pre-observation-check",
    title: "P1を観測する前に何を確認する？",
    focus: "正しい点・アンテナ条件・成果条件・観測環境を確認する",
  },
  {
    id: "during-observation-monitoring",
    title: "観測中は何を見ている？",
    focus: "FIX以外の補正情報・測位状態・観測条件・座標の動きを見る",
  },
  {
    id: "multiple-epochs",
    title: "FIXした瞬間を記録すればよい？",
    focus: "1つのFIX解の中で複数エポックを取得して安定性を見る",
  },
  {
    id: "independent-refix",
    title: "1回のFIXだけで十分？",
    focus: "測位状態をリセットして独立に再FIXし、再現性を見る",
  },
  {
    id: "known-point-consistency",
    title: "既知点で確認すると何が分かる？",
    focus: "既知成果という外部基準との整合性を見る",
  },
  {
    id: "acceptance-decision",
    title: "この観測は採用する？再測する？",
    focus: "安定性・再現性・整合性から採用候補・再測・原因確認を判断する",
  },
  {
    id: "field-record",
    title: "現場で何を記録して残す？",
    focus: "座標だけでなく採用判断の条件と根拠を残す",
  },
  {
    id: "field-workflow-summary",
    title: "自前RTKの現場観測を一本につなぐ",
    focus: "観測前確認から採用判断・記録までを現場作業フローにまとめる",
  },
] as const;

export const gnssFieldQualityPillars = [
  {
    id: "stability",
    label: "安定性",
    check: "1つのFIX解の中で複数エポックを確認",
  },
  {
    id: "repeatability",
    label: "再現性",
    check: "測位状態をリセットし、独立して再FIXして比較",
  },
  {
    id: "consistency",
    label: "整合性",
    check: "必要に応じて既知成果という外部基準と比較",
  },
  {
    id: "decision",
    label: "採用判断",
    check: "採用候補 / 再測 / 原因確認",
  },
] as const;

export const gnssFieldPreObservationChecks = [
  {
    id: "point",
    label: "測点",
    items: ["P1で間違いないか", "点を正しく特定しているか"],
  },
  {
    id: "antenna",
    label: "アンテナ",
    items: ["P1とアンテナの位置関係", "アンテナ高", "設置状態"],
  },
  {
    id: "result-conditions",
    label: "成果条件",
    items: ["測地系", "平面直角座標系の系番号", "座標の時点", "高さ基準"],
  },
  {
    id: "environment",
    label: "観測環境",
    items: ["上空視界・衛星遮蔽", "樹木・建物・壁面", "マルチパスの可能性"],
  },
  {
    id: "rtk-configuration",
    label: "自前RTKの準備",
    items: ["基準局・補正構成が意図したものか"],
  },
] as const;

export const gnssFieldMonitoringChecks = [
  {
    id: "correction",
    label: "補正情報",
    summary: "RTCM受信と更新が続いているか。Ageは鮮度を考える手掛かりとして見る。",
    caution: "Ageに全機器共通の固定閾値を置かない。",
  },
  {
    id: "positioning-state",
    label: "測位状態",
    summary: "SINGLE / 3D → FLOAT → FIXの状態と、FIX後にFLOATへ戻る変化を見る。",
    caution: "一度FIXしても固定状態が永続するとは限らない。",
  },
  {
    id: "gnss-conditions",
    label: "GNSS観測条件",
    summary: "使用衛星、衛星配置・品質指標、遮蔽、マルチパス、受信状態を見る。",
    caution: "未検証の衛星数やPDOPを普遍的な採否基準にしない。",
  },
  {
    id: "coordinate-stability",
    label: "座標の安定",
    summary: "1回の観測中にFIX座標が大きく動いていないかを見る。",
    caution: "ここで見るのは観測内の安定性。独立した再FIX間の再現性とは別。",
  },
] as const;

export const gnssFieldNormalEpochs = Array.from({ length: 10 }, (_, index) => ({
  id: `normal-epoch-${index + 1}`,
  number: index + 1,
  state: "FIX" as const,
}));

export const gnssFieldInterruptedEpochs = [
  { id: "interrupted-epoch-1", number: 1, state: "FIX" },
  { id: "interrupted-epoch-2", number: 2, state: "FIX" },
  { id: "interrupted-epoch-3", number: 3, state: "FIX" },
  { id: "interrupted-epoch-4", number: 4, state: "FIX" },
  { id: "interrupted-epoch-5", number: 5, state: "FLOAT" },
] as const;

export const gnssFieldPublicSurveyExample = {
  source:
    "国土地理院「作業規程の準則」（令和7年3月31日改正）第122条：RTK法による地形、地物等の測定",
  epochs: "FIX解を得てから10エポック以上",
  interval: "データ取得間隔 1秒",
  reinitialization: "初期化を行う観測点では、1セット目の後に再初期化して2セット目を観測",
  tolerance: "セット間較差の標準：ΔN / ΔE 20 mm、ΔU 30 mm",
  caution:
    "この数値は現行準則の該当手法における標準例です。すべてのRTKに共通する普遍的な採否基準ではなく、実際は対象業務の作業規程・品質基準に従います。",
} as const;

export type GnssFieldRepeatCaseId = "repeatable" | "not-repeatable";
export type GnssFieldReobservationStageId =
  | "first-observation"
  | "reset"
  | "refix"
  | "comparison";

export const gnssFieldRepeatCases = [
  {
    id: "repeatable",
    label: "ケースA：再現する例",
    first: { x: 1012.345, y: 1007.821, h: 52.184 },
    second: { x: 1012.352, y: 1007.815, h: 52.196 },
    differenceMillimeters: { x: 7, y: -6, h: 12 },
    summary: "独立した再FIX後も近い位置が得られた",
  },
  {
    id: "not-repeatable",
    label: "ケースB：再現しない例",
    first: { x: 1012.345, y: 1007.821, h: 52.184 },
    second: { x: 1012.397, y: 1007.789, h: 52.241 },
    differenceMillimeters: { x: 52, y: -32, h: 57 },
    summary: "両方FIXでも独立した観測間の差が大きい",
  },
] as const;

export const gnssFieldReobservationStages = [
  {
    id: "first-observation",
    label: "観測①",
    state: "FIX / 10 epoch",
    description: "1回目のFIX観測を保存",
    nextAction: "測位状態をリセットして再観測",
  },
  {
    id: "reset",
    label: "測位状態をリセット",
    state: "3D / FLOAT",
    description: "整数値解を引き継がず、再探索する状態へ戻す",
    nextAction: "再FIXする",
  },
  {
    id: "refix",
    label: "独立して再FIX",
    state: "再FIX / 10 epoch",
    description: "2回目の独立したFIX観測を保存",
    nextAction: "2観測を比較する",
  },
  {
    id: "comparison",
    label: "観測①と観測②を比較",
    state: "再現性を確認",
    description: "差を見て、採否判断はカード7で行う",
    nextAction: "最初から見直す",
  },
] as const;

export function getGnssFieldRepeatCase(
  caseId: string,
): (typeof gnssFieldRepeatCases)[number] | null {
  return gnssFieldRepeatCases.find((item) => item.id === caseId) ?? null;
}

export function getGnssFieldReobservationStage(
  stageId: string,
): (typeof gnssFieldReobservationStages)[number] | null {
  return gnssFieldReobservationStages.find((stage) => stage.id === stageId) ?? null;
}

export function getNextGnssFieldReobservationStageId(
  stageId: string,
): GnssFieldReobservationStageId | null {
  const stageIndex = gnssFieldReobservationStages.findIndex(
    (stage) => stage.id === stageId,
  );
  if (stageIndex < 0) {
    return null;
  }
  return gnssFieldReobservationStages[stageIndex + 1]?.id ?? null;
}

export const gnssFieldKnownPointExample = {
  known: { x: 1025.0, y: 995.0, h: 48.5 },
  observed: { x: 1025.012, y: 994.992, h: 48.518 },
  differenceMillimeters: { x: 12, y: -8, h: 18 },
  note: "教材用の仮想値",
} as const;

export const gnssFieldKnownPointChecks = [
  "正しい点を観測しているか",
  "現地で移動・異常がないか",
  "現在使用する成果と改定・再計算履歴",
  "測地系・座標の時点・高さ基準",
] as const;

export type GnssFieldDecisionId = "accept-candidate" | "remeasure" | "investigate";
export type GnssFieldDecisionCaseId =
  | "repeatable"
  | "float-during-epochs"
  | "repeated-float"
  | "fixed-not-repeatable"
  | "known-point-mismatch"
  | "sudden-fix-poor-environment";

export const gnssFieldDecisionOptions = [
  { id: "accept-candidate", label: "採用候補" },
  { id: "remeasure", label: "再測" },
  { id: "investigate", label: "原因確認" },
] as const;

export const gnssFieldDecisionCases = [
  {
    id: "repeatable",
    label: "ケースA",
    title: "必要な観測を取得し、再FIX後も良好に再現",
    details: [
      "観測①・②ともFIXを維持して必要な複数エポックを取得",
      "独立した再FIX後の差が小さい",
      "補正情報・観測環境に大きな異常なし",
    ],
    correctDecisionId: "accept-candidate",
    feedback: "ここでは「必ず採用」ではなく、対象業務の基準で最終確認する採用候補です。",
  },
  {
    id: "float-during-epochs",
    label: "ケースB",
    title: "10エポックの途中でFLOAT",
    details: ["FIX / FIX / FIX / FIX / FLOAT", "Drogger実機例：FIX以外をエラーとする＝ON"],
    correctDecisionId: "remeasure",
    feedback: "観測を完成できていないため再測します。この1回だけでRTK不能とは断定しません。",
  },
  {
    id: "repeated-float",
    label: "ケースC",
    title: "途中FLOATを何度も繰り返す",
    details: ["補正情報・Age、FIX/FLOAT遷移を確認", "衛星配置、遮蔽、樹木・壁面、マルチパスを確認"],
    correctDecisionId: "investigate",
    feedback: "短い観測や設定変更は状態診断の例であり、正式な成果条件の代替ではありません。",
  },
  {
    id: "fixed-not-repeatable",
    label: "ケースD",
    title: "両方FIXだが再現しない",
    details: ["ΔX = +52 mm", "ΔY = -32 mm", "ΔH = +57 mm"],
    correctDecisionId: "investigate",
    feedback: "FIXした2回を平均せず、原因を確認してから再測します。",
  },
  {
    id: "known-point-mismatch",
    label: "ケースE",
    title: "P1は再現するが既知点が合わない",
    details: ["P1の再現性は良好", "既知点K1のRTK観測と公表成果が大きく不一致"],
    correctDecisionId: "investigate",
    feedback: "RTK側と既知点成果側の両方を確認し、どちらか一方を直ちに誤りと断定しません。",
  },
  {
    id: "sudden-fix-poor-environment",
    label: "ケースF",
    title: "樹木・壁際で突然FIX",
    details: ["遮蔽・マルチパスが生じやすい環境", "突然FIXしたが独立した再現性は未確認"],
    correctDecisionId: "remeasure",
    feedback: "測位状態を確認し、必要に応じて再初期化・再FIX・再観測して位置差を比較します。",
  },
] as const;

export function getGnssFieldDecisionCase(
  caseId: string,
): (typeof gnssFieldDecisionCases)[number] | null {
  return gnssFieldDecisionCases.find((item) => item.id === caseId) ?? null;
}

export function evaluateGnssFieldDecision(
  caseId: string,
  decisionId: string,
): { readonly isCorrect: boolean; readonly correctDecisionId: GnssFieldDecisionId; readonly feedback: string } | null {
  const decisionCase = getGnssFieldDecisionCase(caseId);
  const decision = gnssFieldDecisionOptions.find((item) => item.id === decisionId);
  if (!decisionCase || !decision) {
    return null;
  }
  return {
    isCorrect: decisionCase.correctDecisionId === decision.id,
    correctDecisionId: decisionCase.correctDecisionId,
    feedback: decisionCase.feedback,
  };
}

export const gnssFieldRecordGroups = [
  {
    id: "where-when",
    label: "① どこを・いつ",
    items: ["点名・点番号", "日時", "セッション"],
  },
  {
    id: "conditions",
    label: "② どんな条件で",
    items: ["受信機・アンテナ", "アンテナ高", "基準局", "座標・高さ条件"],
  },
  {
    id: "observation",
    label: "③ どんな観測だった",
    items: ["FIX・エポック数", "再初期化・再FIX", "観測①・②", "較差"],
  },
  {
    id: "reason",
    label: "④ なぜ採用した",
    items: ["既知点確認", "採用候補・再測・保留", "理由", "現場メモ"],
  },
] as const;

export const gnssFieldRecordExample = [
  ["日時", "2026/08/24"],
  ["アンテナ高", "1.800 m"],
  ["基準局", "BASE_A"],
  ["観測①", "FIX / 10 epoch"],
  ["観測②", "再FIX / 10 epoch"],
  ["再初期化", "実施"],
  ["較差", "ΔX +7 mm / ΔY -6 mm / ΔH +12 mm"],
  ["既知点確認", "OK"],
  ["判定", "採用候補"],
  ["理由", "再FIX後も位置が再現"],
] as const;

export const gnssFieldWorkflowSteps = [
  { id: "move", number: 1, label: "P1へ移動" },
  { id: "precheck", number: 2, label: "観測前確認" },
  { id: "start", number: 3, label: "観測開始：RTCM・Age・測位状態・GNSS観測条件" },
  { id: "fix", number: 4, label: "FIX" },
  { id: "epochs", number: 5, label: "複数エポック観測：安定性" },
  { id: "save-first", number: 6, label: "観測①を保存" },
  { id: "reset", number: 7, label: "測位状態をリセット / 再初期化" },
  { id: "refix", number: 8, label: "3D / FLOAT → 再FIX" },
  { id: "save-second", number: 9, label: "観測②を保存" },
  { id: "compare", number: 10, label: "観測①と②を比較：再現性" },
  { id: "known-point", number: 11, label: "必要に応じて既知点確認：整合性" },
  { id: "decision", number: 12, label: "採用候補 / 再測 / 原因確認" },
  { id: "record", number: 13, label: "観測記録を残す" },
  { id: "next", number: 14, label: "次点へ" },
] as const;

export const gnssFieldExternalLinks = [
  { id: "survey-c1", cardIds: [1], label: "観測のヒント｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/survey.html", source: "drogger" },
  { id: "guide-c1", cardIds: [1], label: "Drogger RTKガイド｜Drogger公式ブログ", href: "https://drogger.hatenadiary.jp/entry/RTK_GUIDE", source: "drogger" },
  { id: "antenna-height", cardIds: [2], label: "アンテナ高｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/antenna_height.html", source: "drogger" },
  { id: "survey-c2", cardIds: [2], label: "観測のヒント｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/survey.html", source: "drogger" },
  { id: "rover-confirm-c3", cardIds: [3], label: "RTK移動局の動作確認｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/rtk_confirm.html", source: "drogger" },
  { id: "waypoint-c4", cardIds: [4], label: "Waypointを記録する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/Waypoint.html", source: "drogger" },
  { id: "session-c4", cardIds: [4], label: "セッションを設定する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/session.html", source: "drogger" },
  { id: "gsi-rules", cardIds: [4, 7], label: "作業規程の準則（令和7年3月31日改正）｜国土地理院", href: "https://www.gsi.go.jp/common/000258734.pdf", source: "gsi" },
  { id: "survey-c5", cardIds: [5], label: "観測のヒント｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/survey.html", source: "drogger" },
  { id: "guide-c5", cardIds: [5], label: "Drogger RTKガイド｜Drogger公式ブログ", href: "https://drogger.hatenadiary.jp/entry/RTK_GUIDE", source: "drogger" },
  { id: "compare-c6", cardIds: [6], label: "座標を比較する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/compare_wpt.html", source: "drogger" },
  { id: "smd-c6", cardIds: [6], label: "今期・元期と地殻変動補正｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/smd.html", source: "drogger" },
  { id: "survey-c7", cardIds: [7], label: "観測のヒント｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/survey.html", source: "drogger" },
  { id: "rover-confirm-c7", cardIds: [7], label: "RTK移動局の動作確認｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/rtk_confirm.html", source: "drogger" },
  { id: "smd-c7", cardIds: [7], label: "今期・元期と地殻変動補正｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/smd.html", source: "drogger" },
  { id: "waypoint-c8", cardIds: [8], label: "Waypointを記録する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/Waypoint.html", source: "drogger" },
  { id: "session-c8", cardIds: [8], label: "セッションを設定する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/session.html", source: "drogger" },
  { id: "books-c8", cardIds: [8], label: "観測手簿・記簿｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/view_kibo_syubo.html", source: "drogger" },
  { id: "photo-c8", cardIds: [8], label: "Waypointに写真を追加する｜Drogger公式マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/waypoint_photo.html", source: "drogger" },
  { id: "manual-c9", cardIds: [9], label: "Drogger RTK受信機 操作マニュアル", href: "https://www.bizstation.jp/ja/drogger/man/index.html", source: "drogger" },
] as const;

export const gnssFieldObservationQuizQuestions = [
  {
    id: "fix-and-acceptance",
    questionType: "品質管理",
    prompt: "P1でRTK測量を行い、画面に「FIXED」と表示された。最も適切な考え方はどれか。",
    options: [
      { id: "q01-fix-always-correct", label: "FIXEDなら成果座標は必ず正しい", incorrectReason: "ミスFIX等もあり得るため、FIXだけでは成果採用を決められません。" },
      { id: "q01-check-quality", label: "FIXは重要な条件だが、観測状態や再現性なども確認して採用を判断する", incorrectReason: null },
      { id: "q01-no-antenna-check", label: "FIX後はアンテナ高を確認する必要はない", incorrectReason: "アンテナ高は成果へ影響します。" },
      { id: "q01-base-auto-corrected", label: "FIXすれば基準局座標の誤りも自動的に補正される", incorrectReason: "基準局座標が誤っていてもFIXする可能性があります。" },
    ],
    correctOptionId: "q01-check-quality",
    correctReason: "FIXは重要な条件ですが、安定性・再現性・整合性等も確認して成果候補とします。",
    fieldCheck: "FIX表示と成果採用判断を別の工程として確認する。",
  },
  {
    id: "pre-observation-check",
    questionType: "品質管理",
    prompt: "P1へ到着した。観測開始前の確認として最も適切でないものはどれか。",
    options: [
      { id: "q02-identify-point", label: "P1という測点を正しく特定しているか", incorrectReason: "必要な確認です。" },
      { id: "q02-antenna", label: "アンテナ高やアンテナの設置状態", incorrectReason: "必要な確認です。" },
      { id: "q02-result-conditions", label: "成果の測地系・系番号・高さ条件", incorrectReason: "必要な確認です。" },
      { id: "q02-ignore-environment", label: "FIXするまで待てばよいので、周囲の樹木や建物は確認しなくてよい", incorrectReason: null },
    ],
    correctOptionId: "q02-ignore-environment",
    correctReason: "遮蔽やマルチパスを生む観測環境も、観測前の重要な確認対象です。",
    fieldCheck: "測点・アンテナ・成果条件・観測環境を観測前に確認する。",
  },
  {
    id: "during-observation-check",
    questionType: "品質管理",
    prompt: "移動局で観測中に確認する内容として最も適切なのはどれか。",
    options: [
      { id: "q03-combined-check", label: "FIX/FLOATだけでなく、補正情報、Age、GNSS受信状態、座標の安定などを合わせて見る", incorrectReason: null },
      { id: "q03-satellite-count-only", label: "衛星数だけを見ればよい", incorrectReason: "衛星数だけでは観測状態を判断できません。" },
      { id: "q03-connection-only", label: "Ntripが接続中ならRTCMの更新状態を見る必要はない", incorrectReason: "接続中でも新しい補正情報が届き続けているとは限りません。" },
      { id: "q03-never-float", label: "一度FIXしたら、その後FLOATへ戻ることはない", incorrectReason: "観測条件等の変化でFLOATへ戻ることがあります。" },
    ],
    correctOptionId: "q03-combined-check",
    correctReason: "補正情報、測位状態、GNSS観測条件、座標の安定を合わせて確認します。",
    fieldCheck: "FIXの文字だけでなく状態の組合せと変化を見る。",
  },
  {
    id: "multiple-epochs-meaning",
    questionType: "仕組み理解",
    prompt: "「FIX後10エポック観測する」の理解として最も適切なのはどれか。",
    options: [
      { id: "q04-wait-ten-seconds", label: "FIX後10秒間、画面を見ずに待てばよい", incorrectReason: "待つこと自体ではなく、観測データを取得し状態を確認することが目的です。" },
      { id: "q04-discard-float", label: "10回の中にFLOATがあっても、必ず残りだけで成果が作られる", incorrectReason: "Droggerでエラー設定がONならFloat等で記録が中止されます。OFF時の内部処理も推測できません。" },
      { id: "q04-obtain-and-check", label: "FIX後、複数エポックの観測データを取得し、その観測状態を確認する", incorrectReason: null },
      { id: "q04-no-reobservation", label: "10エポック取得すれば再観測は一切不要になる", incorrectReason: "複数エポックと独立した再FIXの確認は別です。" },
    ],
    correctOptionId: "q04-obtain-and-check",
    correctReason: "複数エポックを取得し、その間の測位状態や観測結果の安定性を確認します。10エポックは該当する公共測量手法の標準例です。",
    fieldCheck: "対象業務の規程と、観測中のFIX維持を確認する。",
  },
  {
    id: "independent-refix",
    questionType: "仕組み理解",
    prompt: "同じFIX状態で複数回ほぼ同じ座標を得た。FIX解そのものの再現性をより確かめる方法はどれか。",
    options: [
      { id: "q05-more-same-fix", label: "同じFIXのまま、さらに10回観測する", incorrectReason: "同じ整数値解を引き継ぐ可能性があり、独立したFIX解の確認になりません。" },
      { id: "q05-reset-refix", label: "GNSS Hot Restart等で測位状態をリセットし、再FIX後にもう一度観測して比較する", incorrectReason: null },
      { id: "q05-average", label: "複数回の値を平均すれば確認は完了する", incorrectReason: "平均しても独立したFIX解の再現性確認にはなりません。" },
      { id: "q05-no-check", label: "一度FIXしたので確認する必要はない", incorrectReason: "FIXだけで採用を決めません。" },
    ],
    correctOptionId: "q05-reset-refix",
    correctReason: "測位状態をリセットして独立に再FIXし、別のFIX解でも同じ位置が得られるか比較します。",
    fieldCheck: "同じFIX中の安定性と、独立した再FIX後の再現性を区別する。",
  },
  {
    id: "known-point-purpose",
    questionType: "品質管理",
    prompt: "P1の2回がほぼ一致した。別の既知点K1を観測する主な目的はどれか。",
    options: [
      { id: "q06-average-p1", label: "P1の2回の平均値を計算するため", incorrectReason: "既知点確認の目的とは異なります。" },
      { id: "q06-faster-fix", label: "FIXまでの時間を短くするため", incorrectReason: "既知点確認の目的ではありません。" },
      { id: "q06-more-satellites", label: "衛星数を増やすため", incorrectReason: "既知点観測で衛星数を増やすわけではありません。" },
      { id: "q06-external-consistency", label: "RTK観測が既知成果という外部基準と整合しているか確認するため", incorrectReason: null },
    ],
    correctOptionId: "q06-external-consistency",
    correctReason: "P1同士の比較は再現性、既知点との比較は外部成果との整合性を確認します。",
    fieldCheck: "既知点自体と現在使用する成果の来歴・条件も確認する。",
  },
  {
    id: "known-point-mismatch-decision",
    questionType: "総合問題",
    prompt: "P1は再FIX後もよく再現したが、既知点K1のRTK観測は公表成果と大きく合わなかった。最初の判断はどれか。",
    options: [
      { id: "q07-check-both-sides", label: "P1をすぐ採用せず、RTK側と既知点成果側の両方の条件を確認する", incorrectReason: null },
      { id: "q07-k1-always-wrong", label: "P1が再現しているのでK1の成果は必ず間違いである", incorrectReason: "既知点側だけを原因と断定できません。" },
      { id: "q07-receiver-broken", label: "K1と合わないのでRTK受信機の故障と断定する", incorrectReason: "差だけから受信機故障とは断定できません。" },
      { id: "q07-average", label: "両者を平均して採用する", incorrectReason: "平均して解決する問題ではありません。" },
    ],
    correctOptionId: "q07-check-both-sides",
    correctReason: "基準局座標、測地系、系番号、座標時点、高さ、アンテナ高と、既知点成果の来歴・現地状態を両側から確認します。",
    fieldCheck: "再現性と外部整合性を分離して判断する。",
  },
  {
    id: "field-record-content",
    questionType: "品質管理",
    prompt: "P1の観測記録として最も望ましいものはどれか。",
    options: [
      { id: "q08-xy-only", label: "最終的に採用したX・Yだけ", incorrectReason: "採用根拠を追えません。" },
      { id: "q08-fix-only", label: "「FIXした」とだけ記録", incorrectReason: "FIXしたことだけでは判断根拠が不足します。" },
      { id: "q08-complete-record", label: "座標に加え、観測日時、アンテナ高、観測状態、再初期化・再FIX、較差、既知点確認、採用理由などを残す", incorrectReason: null },
      { id: "q08-photo-only", label: "現場写真だけ", incorrectReason: "写真は補助記録ですが、観測記録の代わりにはなりません。" },
    ],
    correctOptionId: "q08-complete-record",
    correctReason: "座標だけでなく、どの条件で観測し、どんな確認をして採用候補としたかを残します。",
    fieldCheck: "再初期化した独立観測であることと判断理由を記録する。",
  },
  {
    id: "field-workflow-order",
    questionType: "総合問題",
    prompt: "P1の現場観測の基本的な流れとして最も適切なのはどれか。",
    options: [
      { id: "q09-fix-save-end", label: "FIX → 座標保存 → 終了", incorrectReason: "FIXだけで終了せず、点検と採用判断を行います。" },
      { id: "q09-full-workflow", label: "観測条件確認 → FIX → 複数エポック → 再初期化・再FIX → 再現性確認 → 必要に応じて既知点確認 → 採用判断 → 記録", incorrectReason: null },
      { id: "q09-wrong-order", label: "既知点確認 → FIX → 基準局設置 → 観測", incorrectReason: "作業順序が不適切です。" },
      { id: "q09-no-comparison", label: "FIX → Hot Restart → 結果を見ずに採用", incorrectReason: "再FIX後の結果を比較することが重要です。" },
    ],
    correctOptionId: "q09-full-workflow",
    correctReason: "安定性、再現性、必要な整合性を順に確認し、採用判断と記録まで行います。",
    fieldCheck: "異常時は原因に応じて戻る工程を判断する。",
  },
] as const satisfies readonly GnssQuizQuestion[];

export function getGnssFieldObservationQuizQuestion(
  questionId: string,
): GnssQuizQuestion | null {
  return gnssFieldObservationQuizQuestions.find((question) => question.id === questionId) ?? null;
}

export function getGnssFieldObservationQuizOptionLetter(
  questionId: string,
  optionId: string,
): string | null {
  const question = getGnssFieldObservationQuizQuestion(questionId);
  const optionIndex = question?.options.findIndex((option) => option.id === optionId);
  if (optionIndex === undefined || optionIndex < 0) {
    return null;
  }
  return String.fromCharCode(65 + optionIndex);
}

export function evaluateGnssFieldObservationQuizAnswer(
  questionId: string,
  optionId: string,
): GnssQuizAnswerEvaluation | null {
  const question = getGnssFieldObservationQuizQuestion(questionId);
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
