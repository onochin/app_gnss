import { describe, expect, it } from "vitest";
import {
  gnssLessons,
  gnssNetworkRtkClasLesson,
  gnssPostprocessingLesson,
} from "../components/gnss/gnssCourse";
import {
  evaluateGnssNetworkRtkClasQuizAnswer,
  getGnssNetworkRtkClasQuizOptionLetter,
  getGnssNetworkRtkClasQuizQuestion,
  gnssClasDeliveryFlow,
  gnssNetworkRtkClasCards,
  gnssNetworkRtkClasExternalLinks,
  gnssNetworkRtkClasMethodComparison,
  gnssNetworkRtkClasQuizQuestions,
  gnssReferenceChangeCases,
  gnssResultComparisonChecks,
  gnssVrsBaselineComparison,
  gnssVrsClasComparison,
  gnssVrsPositionFlow,
} from "../components/gnss/data/gnssNetworkRtkClas";

describe("GNSS測量 第10章 ネットワーク型RTKとCLAS", () => {
  it("第1章～第9章を維持し、第10章だけを利用可能な章へ追加する", () => {
    expect(gnssLessons.slice(0, 9).at(-1)).toBe(gnssPostprocessingLesson);
    expect(gnssNetworkRtkClasLesson).toMatchObject({
      id: "gnss-network-rtk-clas",
      number: 10,
      title: "ネットワーク型RTKとCLAS",
    });
    expect(gnssNetworkRtkClasLesson.learningGoal).toContain("VRS");
    expect(gnssNetworkRtkClasLesson.learningGoal).toContain("高さ基準");
    expect(gnssLessons.map((lesson) => lesson.id)).toEqual([
      "gnss-overview",
      "gnss-observations",
      "gnss-coordinate-height",
      "gnss-positioning-methods",
      "gnss-own-base-station",
      "gnss-correction-delivery",
      "gnss-baseline-fix",
      "gnss-field-observation",
      "gnss-postprocessing",
      "gnss-network-rtk-clas",
    ]);
    expect(gnssLessons).toHaveLength(10);
    expect(gnssLessons.every((lesson) => lesson.number <= 10)).toBe(true);
  });

  it("9カードを指定IDとタイトル順で定義する", () => {
    expect(gnssNetworkRtkClasCards.map((card) => card.id)).toEqual([
      "own-vs-external", "network-reference", "vrs", "vrs-position",
      "vrs-baseline", "reference-change", "clas-delivery", "clas-ppp-rtk", "field-choice",
    ]);
    expect(gnssNetworkRtkClasCards.map((card) => card.title)).toEqual([
      "ネットワーク型RTKとCLASは、自前RTKと何が違う？",
      "ネットワーク型RTKは何を基準にしている？",
      "VRSとは？ ― 仮想基準点をつくる",
      "VRSでは、P1の概略位置をどう伝える？",
      "VRSでも基線を求めている？",
      "P1とP2で基準局は変わる？",
      "CLASはどこから補強情報を受ける？",
      "CLASのPPP-RTKとは？",
      "ネットワーク型RTKとCLAS、現場ではどう使い分ける？",
    ]);
  });

  it("自前RTK・ネットワーク型RTK・CLASの作り方、経路、測位方式を区別する", () => {
    expect(gnssNetworkRtkClasMethodComparison).toContainEqual([
      "主な情報経路", "Ntrip等 / 別通信", "Internet / Ntrip等", "みちびきL6D",
    ]);
    expect(gnssNetworkRtkClasMethodComparison).toContainEqual([
      "測位の中心", "基準局との相対測位", "VRS等のネットワークRTK", "PPP-RTK",
    ]);
  });

  it("VRSの概略位置送信と直接観測方式の基線を限定して定義する", () => {
    expect(gnssVrsPositionFlow.join(" ")).toContain("NMEA GGA等");
    expect(gnssVrsPositionFlow.join(" ")).toContain("概略位置");
    expect(gnssVrsPositionFlow.at(-1)).toContain("P1自身のGNSS観測");
    expect(gnssVrsBaselineComparison).toContainEqual(["相対位置", "A → P1", "VRS → P1"]);
  });

  it("同一基準側と変更の2ケース、実在局と仮想点の区別を保持する", () => {
    expect(gnssReferenceChangeCases.map((item) => item.id)).toEqual(["same-reference", "changed-reference"]);
    expect(gnssReferenceChangeCases[0].steps.join(" ")).toContain("VRS-A");
    expect(gnssReferenceChangeCases[1].steps.join(" ")).toContain("基準局B");
  });

  it("CLASをL6D配信のPPP-RTKとしてVRSと区別する", () => {
    expect(gnssClasDeliveryFlow).toContain("L6D");
    expect(gnssClasDeliveryFlow.join(" ")).toContain("P1自身のGNSS観測");
    expect(gnssVrsClasComparison).toContainEqual(["高精度測位", "RTK", "PPP-RTK"]);
    expect(gnssVrsClasComparison).toContainEqual(["情報経路", "Internet / Ntrip等", "みちびきL6D"]);
  });

  it("成果比較で元期・今期、高さ、基準・補強情報を確認する", () => {
    expect(gnssResultComparisonChecks).toContain("同じ座標の時点（元期 / 今期）か");
    expect(gnssResultComparisonChecks).toContain("高さの種類・基準は同じか");
    expect(gnssResultComparisonChecks).toContain("使用した基準・補強情報は何か");
  });

  it("現行HTTPS公式リンクだけを必要カードへ配置する", () => {
    expect(gnssNetworkRtkClasExternalLinks.every((link) => link.href.startsWith("https://"))).toBe(true);
    expect(new Set(gnssNetworkRtkClasExternalLinks.map((link) => link.source))).toEqual(new Set(["gsi", "drogger", "qzss"]));
    for (const cardNumber of [2, 3, 4, 5, 6, 7, 8, 9]) {
      expect(gnssNetworkRtkClasExternalLinks.some((link) => link.cardIds.includes(cardNumber as never))).toBe(true);
    }
  });

  it("9確認問題を安定IDとB/B/C/B/A/C/B/B/Cの正答位置で定義する", () => {
    expect(gnssNetworkRtkClasQuizQuestions.map((question) => question.id)).toEqual([
      "gnss-network-rtk-clas-q01-own-vs-external",
      "gnss-network-rtk-clas-q02-network-reference",
      "gnss-network-rtk-clas-q03-vrs",
      "gnss-network-rtk-clas-q04-vrs-position",
      "gnss-network-rtk-clas-q05-vrs-baseline",
      "gnss-network-rtk-clas-q06-reference-change",
      "gnss-network-rtk-clas-q07-clas-delivery",
      "gnss-network-rtk-clas-q08-ppp-rtk",
      "gnss-network-rtk-clas-q09-result-comparison",
    ]);
    expect(gnssNetworkRtkClasQuizQuestions.map((question) =>
      getGnssNetworkRtkClasQuizOptionLetter(question.id, question.correctOptionId),
    )).toEqual(["B", "B", "C", "B", "A", "C", "B", "B", "C"]);
  });

  it("全36選択肢を評価し、全誤答へ固有理由を持たせる", () => {
    const optionIds = gnssNetworkRtkClasQuizQuestions.flatMap((question) => question.options.map((option) => option.id));
    expect(new Set(optionIds).size).toBe(36);
    for (const question of gnssNetworkRtkClasQuizQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctReason.trim()).not.toBe("");
      expect(question.fieldCheck.trim()).not.toBe("");
      for (const option of question.options) {
        const evaluation = evaluateGnssNetworkRtkClasQuizAnswer(question.id, option.id);
        expect(evaluation?.correctOptionId).toBe(question.correctOptionId);
        if (option.id === question.correctOptionId) {
          expect(option.incorrectReason).toBeNull();
          expect(evaluation).toMatchObject({ isCorrect: true, selectedAnswerReason: null });
        } else {
          expect(option.incorrectReason?.trim()).not.toBe("");
          expect(evaluation).toMatchObject({ isCorrect: false, selectedAnswerReason: option.incorrectReason });
        }
      }
    }
  });

  it("誤解を正答にせず、未知IDを安全に拒否する", () => {
    const correctLabels = gnssNetworkRtkClasQuizQuestions.map((question) => question.options.find((option) => option.id === question.correctOptionId)?.label).join(" ");
    expect(correctLabels).not.toContain("最も近い電子基準点1局を、必ず");
    expect(correctLabels).not.toContain("最終成果座標を配信会社へ登録");
    expect(correctLabels).not.toContain("L6Dだけを測距");
    expect(correctLabels).not.toContain("通常の単独測位と同じ");
    expect(getGnssNetworkRtkClasQuizQuestion("unknown")).toBeNull();
    expect(getGnssNetworkRtkClasQuizOptionLetter("unknown", "unknown")).toBeNull();
    expect(evaluateGnssNetworkRtkClasQuizAnswer("unknown", "unknown")).toBeNull();
  });
});
