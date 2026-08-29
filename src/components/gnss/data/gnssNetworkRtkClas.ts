import type {
  GnssQuizAnswerEvaluation,
  GnssQuizQuestion,
} from "../types";

export const gnssNetworkRtkClasCards = [
  { id: "own-vs-external", title: "ネットワーク型RTKとCLASは、自前RTKと何が違う？" },
  { id: "network-reference", title: "ネットワーク型RTKは何を基準にしている？" },
  { id: "vrs", title: "VRSとは？ ― 仮想基準点をつくる" },
  { id: "vrs-position", title: "VRSでは、P1の概略位置をどう伝える？" },
  { id: "vrs-baseline", title: "VRSでも基線を求めている？" },
  { id: "reference-change", title: "P1とP2で基準局は変わる？" },
  { id: "clas-delivery", title: "CLASはどこから補強情報を受ける？" },
  { id: "clas-ppp-rtk", title: "CLASのPPP-RTKとは？" },
  { id: "field-choice", title: "ネットワーク型RTKとCLAS、現場ではどう使い分ける？" },
] as const;

export const gnssNetworkRtkClasMethodComparison = [
  ["現場の自前基準局", "利用者が設置", "原則不要", "不要"],
  ["外部情報", "自前基準局のRTCM等", "配信サービスのRTK用情報", "CLAS補強情報"],
  ["主な情報経路", "Ntrip等 / 別通信", "Internet / Ntrip等", "みちびきL6D"],
  ["測位の中心", "基準局との相対測位", "VRS等のネットワークRTK", "PPP-RTK"],
] as const;

export const gnssNetworkReferenceStations = ["電子基準点等A", "電子基準点等B", "電子基準点等C"] as const;

export const gnssVrsPositionFlow = [
  "P1自身がGNSSで概略位置を得る",
  "P1 → 配信側：NMEA GGA等で「私はこのあたりにいます」",
  "配信側でP1付近のVRS情報を生成",
  "配信側 → P1：RTK用情報",
  "P1自身のGNSS観測と組み合わせる",
] as const;

export const gnssVrsBaselineComparison = [
  ["基準側の点", "実在する基準局", "仮想基準点"],
  ["基準側受信機", "現場に実在", "仮想点には存在しない"],
  ["基準側情報", "実観測", "基準局網から生成"],
  ["移動局", "GNSS観測", "GNSS観測"],
  ["相対位置", "A → P1", "VRS → P1"],
] as const;

export const gnssReferenceChangeCases = [
  {
    id: "same-reference",
    label: "ケースA：同じ基準側",
    steps: ["P1：VRS-A → P1", "接続・基準側を維持", "P2：VRS-A → P2"],
  },
  {
    id: "changed-reference",
    label: "ケースB：基準側が変わる",
    steps: ["P1：VRS-A / 基準局A", "Ntrip切断・再接続等", "P2：VRS-B / 基準局B"],
  },
] as const;

export const gnssClasDeliveryFlow = [
  "電子基準点データ等",
  "CLAS補強情報を生成",
  "みちびき",
  "L6D",
  "CLAS対応受信機P1 ＋ P1自身のGNSS観測",
  "高精度測位",
] as const;

export const gnssClasDeliveryComparison = [
  ["外部情報", "RTK用情報", "センチメータ級測位補強情報"],
  ["主な経路", "Internet / Ntrip", "みちびきL6D"],
  ["Ntrip", "代表的に利用", "高精度測位自体には不要"],
  ["携帯通信", "通常必要", "高精度測位自体には不要"],
  ["受信機", "RTK対応", "L6D / CLAS対応が必要"],
] as const;

export const gnssPppRtkCorrections = [
  "衛星軌道",
  "衛星時計",
  "信号バイアス",
  "電離層",
  "対流圏",
] as const;

export const gnssVrsClasComparison = [
  ["基準の中心", "VRS仮想基準点", "特定1基準点を中心にしない"],
  ["相対基線", "VRS直接観測ではVRS → P1", "基線を中心に考えない"],
  ["外部情報", "VRS側RTK用情報", "衛星・大気等の補強情報"],
  ["情報経路", "Internet / Ntrip等", "みちびきL6D"],
  ["高精度測位", "RTK", "PPP-RTK"],
] as const;

export const gnssFieldChoiceComparison = [
  ["情報経路", "Internet / Ntrip", "みちびきL6D"],
  ["基準側", "実在基準局 / VRS等", "特定基準局との基線を中心にしない"],
  ["特に見るもの", "通信、接続先、基準局・VRS", "上空視界、L6D受信、収束・FIX"],
] as const;

export const gnssResultComparisonChecks = [
  "測位状態は適切か",
  "同じ測地系か",
  "同じ座標の時点（元期 / 今期）か",
  "高さの種類・基準は同じか",
  "使用した基準・補強情報は何か",
  "観測環境に問題はないか",
] as const;

export const gnssNetworkRtkClasExternalLinks = [
  { id: "gsi-network-rtk", source: "gsi", label: "国土地理院 ネットワーク型RTK-GPS測量", href: "https://www.gsi.go.jp/common/000258817.pdf", cardIds: [2, 3, 5] },
  { id: "drogger-vrs", source: "drogger", label: "Drogger VRS仮想点を指定する", href: "https://www.bizstation.jp/ja/drogger/man/vrs.html", cardIds: [4, 6] },
  { id: "drogger-session", source: "drogger", label: "Drogger セッションを設定する", href: "https://www.bizstation.jp/ja/drogger/man/session.html", cardIds: [6] },
  { id: "qzss-clas", source: "qzss", label: "みちびき センチメータ級測位補強サービス", href: "https://qzss.go.jp/overview/services/sv06_clas.html", cardIds: [7, 8] },
  { id: "qzss-l6", source: "qzss", label: "みちびき CLAS仕様・性能", href: "https://qzss.go.jp/technical/system/l6.html", cardIds: [7, 8] },
  { id: "drogger-smd", source: "drogger", label: "Drogger 今期・元期と地殻変動補正", href: "https://www.bizstation.jp/ja/drogger/man/smd.html", cardIds: [9] },
  { id: "gsi-height", source: "gsi", label: "国土地理院 全国の標高成果の改定", href: "https://www.gsi.go.jp/sokuchikijun/hyoko2024rev.html", cardIds: [9] },
] as const;

export const gnssNetworkRtkClasQuizQuestions = [
  {
    id: "gnss-network-rtk-clas-q01-own-vs-external",
    questionType: "方式選択",
    prompt: "ネットワーク型RTKとCLASに共通する特徴として、最も適切なものはどれ？",
    options: [
      { id: "own-base-required", label: "利用者が現場に自前基準局を必ず設置する", incorrectReason: "どちらも利用者が現場に自前基準局を設置せず利用できます。" },
      { id: "no-own-base-required", label: "利用者が現場に自前基準局を設置しなくても高精度測位を行える", incorrectReason: null },
      { id: "both-ntrip-rtcm", label: "どちらもインターネットからRTCMを受信する", incorrectReason: "CLASはみちびきL6Dから補強情報を受信します。" },
      { id: "both-ppp-rtk", label: "どちらも同じPPP-RTK方式で測位する", incorrectReason: "ネットワーク型RTKのVRS等はRTK、CLASはPPP-RTKで、同じ方式ではありません。" },
    ],
    correctOptionId: "no-own-base-required",
    correctReason: "現場自前基準局が不要という共通点はありますが、情報の作り方・届け方・測位方式まで同じではありません。",
    fieldCheck: "利用する外部情報、情報経路、対応受信機を方式ごとに確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q02-network-reference",
    questionType: "仕組み理解",
    prompt: "ネットワーク型RTKについて、最も適切な説明はどれ？",
    options: [
      { id: "nearest-station-direct", label: "最も近い電子基準点1局を、必ずそのまま自前基準局の代わりにする", incorrectReason: "ネットワーク型RTKは基準局網と配信サービスを利用します。" },
      { id: "network-service-processing", label: "電子基準点などの観測網を利用し、配信側で処理したRTK用情報を移動局が利用する", incorrectReason: null },
      { id: "coordinate-only", label: "移動局はGNSS観測をせず、配信された座標を表示するだけである", incorrectReason: "移動局自身もGNSS観測を行い、配信情報と組み合わせます。" },
      { id: "qzss-l6d-vrs", label: "みちびきL6Dから仮想基準点データを受信する", incorrectReason: "L6DはCLAS補強情報の経路であり、VRSの代表的な配信経路ではありません。" },
    ],
    correctOptionId: "network-service-processing",
    correctReason: "基準局網と配信サービスを利用し、移動局自身もGNSS観測を行います。",
    fieldCheck: "配信サービス、接続先、基準側情報、移動局の観測状態を確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q03-vrs",
    questionType: "用語整理",
    prompt: "VRSの「仮想基準点」について、最も適切な説明はどれ？",
    options: [
      { id: "new-physical-station", label: "現場近くに新しく設置された電子基準点", incorrectReason: "仮想点の場所に物理的な受信機を新設するわけではありません。" },
      { id: "nearest-station-alias", label: "最寄りの電子基準点を別名で呼んだもの", incorrectReason: "VRSは最寄り局の別名ではなく、基準局網の観測から生成されます。" },
      { id: "virtual-reference-generated", label: "周辺の基準局観測情報から、移動局付近に設定・生成される仮想的な基準点", incorrectReason: null },
      { id: "rover-as-base", label: "移動局P1そのものを基準局として扱ったもの", incorrectReason: "P1付近に設定されますが、P1そのものを基準局にする意味ではありません。" },
    ],
    correctOptionId: "virtual-reference-generated",
    correctReason: "仮想点の場所に物理的な受信機はなく、基準局網の観測情報からその地点に対応する情報を生成します。",
    fieldCheck: "VRS仮想点座標と実在基準局を区別する。",
  },
  {
    id: "gnss-network-rtk-clas-q04-vrs-position",
    questionType: "仕組み理解",
    prompt: "VRSサービスで移動局からNMEA GGAなどを送る主な目的は？",
    options: [
      { id: "register-final-coordinate", label: "移動局の最終成果座標を配信会社へ登録するため", incorrectReason: "送るのはVRS生成等に使う概略位置で、最終成果座標ではありません。" },
      { id: "send-approximate-position", label: "移動局のおおよその位置を配信側へ知らせ、VRS情報の生成等に利用するため", incorrectReason: null },
      { id: "send-rtcm-to-reference", label: "RTCMを移動局から電子基準点へ送り返すため", incorrectReason: "GGA等の位置情報送信とRTCM配信の向きを混同しています。" },
      { id: "report-fix-to-gsi", label: "FIXしたことを国土地理院へ報告するため", incorrectReason: "FIX状態を国土地理院へ報告する仕組みではありません。" },
    ],
    correctOptionId: "send-approximate-position",
    correctReason: "概略位置はP1付近のVRS情報生成等に使われ、最終成果座標とは異なります。",
    fieldCheck: "サービスが必要とする位置送信と、成果記録を区別する。",
  },
  {
    id: "gnss-network-rtk-clas-q05-vrs-baseline",
    questionType: "仕組み理解",
    prompt: "VRS直接観測法の考え方として、最も適切なものはどれ？",
    options: [
      { id: "vrs-to-rover-baseline", label: "仮想基準点と移動局との間の基線を求める", incorrectReason: null },
      { id: "reference-to-qzss-baseline", label: "電子基準点とみちびきとの基線を求める", incorrectReason: "求める相対位置は仮想基準点から移動局P1です。" },
      { id: "no-carrier-phase", label: "VRSでは搬送波位相を使用しない", incorrectReason: "VRSのRTKでも搬送波位相観測を利用します。" },
      { id: "finished-coordinate-delivered", label: "仮想基準点から完成したP1座標がそのまま送信される", incorrectReason: "直接観測では仮想点情報と移動局観測から相対位置を求めます。" },
    ],
    correctOptionId: "vrs-to-rover-baseline",
    correctReason: "VRS直接観測法では仮想基準点と移動局との間の基線を求めます。解析場所の異なる構成もあるため全方式へ一般化しません。",
    fieldCheck: "利用サービスが直接観測方式か、解析場所を含めて確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q06-reference-change",
    questionType: "品質管理",
    prompt: "ネットワーク型RTKでP1観測後に接続し直してP2を観測したところ、基準局座標がP1とP2で異なっていた。最も適切な判断は？",
    options: [
      { id: "ignore-if-fixed", label: "FIXしていれば基準局座標の違いは確認しなくてよい", incorrectReason: "FIXだけでは基準側情報や成果条件の一致を保証しません。" },
      { id: "always-changes-per-point", label: "ネットワーク型RTKでは必ず測点ごとに基準局が変わる", incorrectReason: "測点移動だけで必ず変わるとは限りません。" },
      { id: "service-or-reconnect-may-change", label: "サービス方式や再接続時の位置などにより基準局・VRS仮想点が変わった可能性があるので確認する", incorrectReason: null },
      { id: "receiver-failure", label: "P2のGNSS受信機が故障したことを意味する", incorrectReason: "基準側の変更だけで受信機故障とは判断できません。" },
    ],
    correctOptionId: "service-or-reconnect-may-change",
    correctReason: "必ず同じでも必ず変わるでもありません。サービス方式、再接続、送信位置等を確認します。",
    fieldCheck: "基準局座標、VRS仮想点、接続情報をセッション内で確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q07-clas-delivery",
    questionType: "仕組み理解",
    prompt: "CLASについて、最も適切な説明はどれ？",
    options: [
      { id: "ntrip-clas", label: "Ntrip Casterからインターネット経由でCLAS補強情報を受信する", incorrectReason: "CLAS補強情報はみちびきL6Dから受信します。" },
      { id: "qzss-l6d", label: "みちびきのL6D信号からCLAS補強情報を受信する", incorrectReason: null },
      { id: "bluetooth-reference", label: "最寄りの電子基準点からBluetoothで補強情報を受信する", incorrectReason: "電子基準点からBluetoothで直接受信する仕組みではありません。" },
      { id: "l6d-ranging-only", label: "L6Dだけを測距して位置を求める", incorrectReason: "L6Dは補強情報の経路であり、通常のGNSS観測と組み合わせます。" },
    ],
    correctOptionId: "qzss-l6d",
    correctReason: "CLASは通常のGNSS観測と、L6Dから受け取る補強情報を組み合わせます。",
    fieldCheck: "L6D受信、対応受信機、上空視界と通常のGNSS観測状態を確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q08-ppp-rtk",
    questionType: "仕組み理解",
    prompt: "CLASのPPP-RTKについて、最も適切な説明はどれ？",
    options: [
      { id: "nearest-base-baseline-only", label: "最寄り電子基準点1局から移動局までの基線だけを利用する方式", incorrectReason: "特定1基準局との基線だけを中心にする方式ではありません。" },
      { id: "corrections-plus-carrier-ppprtk", label: "衛星軌道・時計・大気などの補強情報と移動局自身の搬送波観測などを利用して高精度測位する", incorrectReason: null },
      { id: "no-carrier-no-fix", label: "搬送波位相を使用しないためFLOAT・FIXという考え方はない", incorrectReason: "CLASのPPP-RTKでも搬送波観測とFIX状態を扱います。" },
      { id: "same-as-smartphone-single", label: "スマートフォンの通常の単独測位と同じ方式", incorrectReason: "精密な衛星・大気等の補強情報を用いるため、通常の単独測位と同じではありません。" },
    ],
    correctOptionId: "corrections-plus-carrier-ppprtk",
    correctReason: "CLASはPPP-RTKであり、精密な補強情報と移動局観測を利用します。",
    fieldCheck: "対応する補強サービス、測位状態、収束状況を確認する。",
  },
  {
    id: "gnss-network-rtk-clas-q09-result-comparison",
    questionType: "総合問題",
    prompt: "同じP1をネットワーク型RTKとCLASで観測した。両方FIXだが座標値が少し異なっている。最初に確認すべき考え方として最も適切なのは？",
    options: [
      { id: "fixed-must-match", label: "両方FIXなら本来完全一致するため、どちらかの受信機が故障している", incorrectReason: "FIXは座標時点や高さ基準まで同じであることを保証しません。" },
      { id: "clas-always-right", label: "CLASの値だけを必ず正しい成果として採用する", incorrectReason: "方式名だけで成果の正しさを決めず、両方の成果条件を確認します。" },
      { id: "compare-epoch-height-reference", label: "測位状態だけでなく、元期／今期、高さ基準、使用した基準・補強情報などの条件も確認する", incorrectReason: null },
      { id: "cannot-compare", label: "ネットワーク型RTKとCLASでは座標を比較してはいけない", incorrectReason: "条件をそろえて確認すれば比較できます。比較条件の確認が重要です。" },
    ],
    correctOptionId: "compare-epoch-height-reference",
    correctReason: "FIXは成果条件全体の一致を保証しません。座標時点、高さ基準、基準・補強情報、観測環境等を確認します。",
    fieldCheck: "測地系、元期・今期、高さ基準、基準・補強情報を記録して比較する。",
  },
] as const satisfies readonly GnssQuizQuestion[];

export function getGnssNetworkRtkClasQuizQuestion(questionId: string): GnssQuizQuestion | null {
  return gnssNetworkRtkClasQuizQuestions.find((question) => question.id === questionId) ?? null;
}

export function getGnssNetworkRtkClasQuizOptionLetter(questionId: string, optionId: string): string | null {
  const question = getGnssNetworkRtkClasQuizQuestion(questionId);
  const optionIndex = question?.options.findIndex((option) => option.id === optionId);
  return optionIndex === undefined || optionIndex < 0 ? null : String.fromCharCode(65 + optionIndex);
}

export function evaluateGnssNetworkRtkClasQuizAnswer(questionId: string, optionId: string): GnssQuizAnswerEvaluation | null {
  const question = getGnssNetworkRtkClasQuizQuestion(questionId);
  const selectedOption = question?.options.find((option) => option.id === optionId);
  const correctOption = question?.options.find((option) => option.id === question.correctOptionId);
  if (!question || !selectedOption || !correctOption) return null;
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
