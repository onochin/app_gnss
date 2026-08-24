import { describe, expect, it } from "vitest";
import {
  gnssBaselineFixLesson,
  gnssFieldObservationLesson,
  gnssLessons,
} from "../components/gnss/gnssCourse";
import {
  evaluateGnssFieldDecision,
  evaluateGnssFieldObservationQuizAnswer,
  getGnssFieldDecisionCase,
  getGnssFieldObservationQuizOptionLetter,
  getGnssFieldObservationQuizQuestion,
  getGnssFieldRepeatCase,
  getGnssFieldReobservationStage,
  getNextGnssFieldReobservationStageId,
  gnssFieldDecisionCases,
  gnssFieldDecisionOptions,
  gnssFieldExternalLinks,
  gnssFieldInterruptedEpochs,
  gnssFieldKnownPointExample,
  gnssFieldMonitoringChecks,
  gnssFieldNormalEpochs,
  gnssFieldObservationCards,
  gnssFieldObservationQuizQuestions,
  gnssFieldPreObservationChecks,
  gnssFieldPublicSurveyExample,
  gnssFieldQualityPillars,
  gnssFieldRecordExample,
  gnssFieldRecordGroups,
  gnssFieldRepeatCases,
  gnssFieldReobservationStages,
  gnssFieldWorkflowSteps,
} from "../components/gnss/data/gnssFieldObservation";

describe("GNSS測量 Phase 8 第8章", () => {
  it("第1章～第7章を維持し、第8章だけを利用可能な章へ追加する", () => {
    expect(gnssLessons.slice(0, 7).at(-1)).toBe(gnssBaselineFixLesson);
    expect(gnssFieldObservationLesson).toMatchObject({
      id: "gnss-field-observation",
      number: 8,
      title: "自前RTK④ 現場観測と点検",
    });
    expect(gnssFieldObservationLesson.learningGoal).toContain("採用候補・再測・原因確認");
    expect(gnssLessons.map((lesson) => lesson.id)).toEqual([
      "gnss-overview",
      "gnss-observations",
      "gnss-coordinate-height",
      "gnss-positioning-methods",
      "gnss-own-base-station",
      "gnss-correction-delivery",
      "gnss-baseline-fix",
      "gnss-field-observation",
    ]);
    expect(gnssLessons).toHaveLength(8);
    expect(gnssLessons.every((lesson) => lesson.number <= 8)).toBe(true);
  });

  it("9カードを安定ID・指定タイトル・指定順で定義する", () => {
    expect(gnssFieldObservationCards.map((card) => card.id)).toEqual([
      "fix-not-finish",
      "pre-observation-check",
      "during-observation-monitoring",
      "multiple-epochs",
      "independent-refix",
      "known-point-consistency",
      "acceptance-decision",
      "field-record",
      "field-workflow-summary",
    ]);
    expect(gnssFieldObservationCards.map((card) => card.title)).toEqual([
      "FIXした。その座標を採用してよい？",
      "P1を観測する前に何を確認する？",
      "観測中は何を見ている？",
      "FIXした瞬間を記録すればよい？",
      "1回のFIXだけで十分？",
      "既知点で確認すると何が分かる？",
      "この観測は採用する？再測する？",
      "現場で何を記録して残す？",
      "自前RTKの現場観測を一本につなぐ",
    ]);
    expect(gnssFieldObservationCards).toHaveLength(9);
  });

  it("安定性・再現性・整合性・採用判断を章の骨格にする", () => {
    expect(gnssFieldQualityPillars.map((pillar) => pillar.label)).toEqual([
      "安定性",
      "再現性",
      "整合性",
      "採用判断",
    ]);
    expect(gnssFieldQualityPillars[0].check).toContain("1つのFIX解");
    expect(gnssFieldQualityPillars[1].check).toContain("独立して再FIX");
    expect(gnssFieldQualityPillars[2].check).toContain("既知成果");
  });

  it("観測前5分類と観測中4分類を固定閾値なしで定義する", () => {
    expect(gnssFieldPreObservationChecks.map((check) => check.id)).toEqual([
      "point",
      "antenna",
      "result-conditions",
      "environment",
      "rtk-configuration",
    ]);
    expect(gnssFieldMonitoringChecks.map((check) => check.id)).toEqual([
      "correction",
      "positioning-state",
      "gnss-conditions",
      "coordinate-stability",
    ]);
    expect(gnssFieldMonitoringChecks[0].caution).toContain("固定閾値を置かない");
    expect(gnssFieldMonitoringChecks[2].caution).toContain("普遍的な採否基準にしない");
    expect(gnssFieldMonitoringChecks[3].caution).toContain("再現性とは別");
  });

  it("正常10エポックと5エポック目FLOATの静的例を定義する", () => {
    expect(gnssFieldNormalEpochs).toHaveLength(10);
    expect(gnssFieldNormalEpochs.every((epoch) => epoch.state === "FIX")).toBe(true);
    expect(gnssFieldInterruptedEpochs.map((epoch) => epoch.state)).toEqual([
      "FIX",
      "FIX",
      "FIX",
      "FIX",
      "FLOAT",
    ]);
  });

  it("公共測量値を令和7年準則第122条の適用例として限定する", () => {
    expect(gnssFieldPublicSurveyExample.source).toContain("令和7年3月31日改正");
    expect(gnssFieldPublicSurveyExample.source).toContain("第122条");
    expect(gnssFieldPublicSurveyExample.source).toContain("地形、地物等の測定");
    expect(gnssFieldPublicSurveyExample.epochs).toContain("10エポック以上");
    expect(gnssFieldPublicSurveyExample.interval).toContain("1秒");
    expect(gnssFieldPublicSurveyExample.reinitialization).toContain("再初期化");
    expect(gnssFieldPublicSurveyExample.tolerance).toContain("ΔN / ΔE 20 mm");
    expect(gnssFieldPublicSurveyExample.tolerance).toContain("ΔU 30 mm");
    expect(gnssFieldPublicSurveyExample.caution).toContain("すべてのRTKに共通する普遍的な採否基準ではなく");
    expect(gnssFieldPublicSurveyExample.caution).toContain("対象業務の作業規程・品質基準");
  });

  it("カード5を測位状態リセット・再FIX・2観測比較の4段階にする", () => {
    expect(gnssFieldReobservationStages.map((stage) => stage.id)).toEqual([
      "first-observation",
      "reset",
      "refix",
      "comparison",
    ]);
    expect(gnssFieldReobservationStages.map((stage) => stage.state)).toEqual([
      "FIX / 10 epoch",
      "3D / FLOAT",
      "再FIX / 10 epoch",
      "再現性を確認",
    ]);
    expect(getNextGnssFieldReobservationStageId("first-observation")).toBe("reset");
    expect(getNextGnssFieldReobservationStageId("reset")).toBe("refix");
    expect(getNextGnssFieldReobservationStageId("refix")).toBe("comparison");
    expect(getNextGnssFieldReobservationStageId("comparison")).toBeNull();
    expect(getNextGnssFieldReobservationStageId("unknown")).toBeNull();
    expect(getGnssFieldReobservationStage("unknown")).toBeNull();
  });

  it("カード5の再現・非再現ケースに要件書の固定値を保持する", () => {
    expect(gnssFieldRepeatCases).toMatchObject([
      {
        id: "repeatable",
        first: { x: 1012.345, y: 1007.821, h: 52.184 },
        second: { x: 1012.352, y: 1007.815, h: 52.196 },
        differenceMillimeters: { x: 7, y: -6, h: 12 },
      },
      {
        id: "not-repeatable",
        first: { x: 1012.345, y: 1007.821, h: 52.184 },
        second: { x: 1012.397, y: 1007.789, h: 52.241 },
        differenceMillimeters: { x: 52, y: -32, h: 57 },
      },
    ]);
    expect(getGnssFieldRepeatCase("repeatable")?.id).toBe("repeatable");
    expect(getGnssFieldRepeatCase("unknown")).toBeNull();
  });

  it("既知点K1の仮想値と、再現性・外部整合性の分離を保持する", () => {
    expect(gnssFieldKnownPointExample).toMatchObject({
      known: { x: 1025, y: 995, h: 48.5 },
      observed: { x: 1025.012, y: 994.992, h: 48.518 },
      differenceMillimeters: { x: 12, y: -8, h: 18 },
      note: "教材用の仮想値",
    });
  });

  it("カード7の6ケースを3判断へ割り当て、未知IDを安全に拒否する", () => {
    expect(gnssFieldDecisionOptions.map((option) => option.label)).toEqual([
      "採用候補",
      "再測",
      "原因確認",
    ]);
    expect(gnssFieldDecisionCases.map((item) => item.id)).toEqual([
      "repeatable",
      "float-during-epochs",
      "repeated-float",
      "fixed-not-repeatable",
      "known-point-mismatch",
      "sudden-fix-poor-environment",
    ]);
    expect(gnssFieldDecisionCases.map((item) => item.correctDecisionId)).toEqual([
      "accept-candidate",
      "remeasure",
      "investigate",
      "investigate",
      "investigate",
      "remeasure",
    ]);
    for (const decisionCase of gnssFieldDecisionCases) {
      for (const option of gnssFieldDecisionOptions) {
        expect(evaluateGnssFieldDecision(decisionCase.id, option.id)?.isCorrect).toBe(
          decisionCase.correctDecisionId === option.id,
        );
      }
    }
    expect(getGnssFieldDecisionCase("unknown")).toBeNull();
    expect(evaluateGnssFieldDecision("unknown", "unknown")).toBeNull();
    expect(evaluateGnssFieldDecision("repeatable", "unknown")).toBeNull();
  });

  it("カード8を4分類と静的完成例に限定し、独立した再FIXの記録を持つ", () => {
    expect(gnssFieldRecordGroups.map((group) => group.id)).toEqual([
      "where-when",
      "conditions",
      "observation",
      "reason",
    ]);
    expect(Object.fromEntries(gnssFieldRecordExample)).toMatchObject({
      "観測①": "FIX / 10 epoch",
      "観測②": "再FIX / 10 epoch",
      再初期化: "実施",
      判定: "採用候補",
      理由: "再FIX後も位置が再現",
    });
  });

  it("カード9を14工程でまとめ、第9章の処理詳細をデータへ混入させない", () => {
    expect(gnssFieldWorkflowSteps).toHaveLength(14);
    expect(gnssFieldWorkflowSteps[0]).toMatchObject({ id: "move", label: "P1へ移動" });
    expect(gnssFieldWorkflowSteps.at(-1)).toMatchObject({ id: "next", label: "次点へ" });
    const serialized = JSON.stringify({
      cards: gnssFieldObservationCards,
      workflow: gnssFieldWorkflowSteps,
    });
    expect(serialized).not.toContain("RINEX");
    expect(serialized).not.toContain("後処理解析");
    expect(serialized).not.toContain("セミ・ダイナミック補正");
  });

  it("全カードに要件書どおりのDrogger公式リンクを配置し、GSIリンクをカード4・7へ置く", () => {
    expect(gnssFieldExternalLinks.every((link) => link.href.startsWith("https://"))).toBe(true);
    const droggerLinkedCards = new Set(
      gnssFieldExternalLinks
        .filter((link) => link.source === "drogger")
        .flatMap((link) => [...link.cardIds]),
    );
    expect([...droggerLinkedCards].sort((left, right) => left - right)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(
      gnssFieldExternalLinks.find((link) => link.id === "gsi-rules")?.cardIds,
    ).toEqual([4, 7]);
    expect(
      gnssFieldExternalLinks.filter((link) =>
        link.cardIds.some((cardId) => cardId === 8),
      ),
    ).toHaveLength(4);
  });

  it("確認問題9問を安定IDとB/D/A/C/B/D/A/C/Bの正答位置で定義する", () => {
    expect(gnssFieldObservationQuizQuestions.map((question) => question.id)).toEqual([
      "fix-and-acceptance",
      "pre-observation-check",
      "during-observation-check",
      "multiple-epochs-meaning",
      "independent-refix",
      "known-point-purpose",
      "known-point-mismatch-decision",
      "field-record-content",
      "field-workflow-order",
    ]);
    const correctLetters = gnssFieldObservationQuizQuestions.map((question) =>
      getGnssFieldObservationQuizOptionLetter(question.id, question.correctOptionId),
    );
    expect(correctLetters).toEqual(["B", "D", "A", "C", "B", "D", "A", "C", "B"]);
    expect(
      Object.fromEntries(
        ["A", "B", "C", "D"].map((letter) => [
          letter,
          correctLetters.filter((current) => current === letter).length,
        ]),
      ),
    ).toEqual({ A: 2, B: 3, C: 2, D: 2 });
  });

  it("全36選択肢を評価し、全誤答へ固有理由を持たせる", () => {
    const allOptionIds = gnssFieldObservationQuizQuestions.flatMap((question) =>
      question.options.map((option) => option.id),
    );
    expect(new Set(allOptionIds).size).toBe(36);
    for (const question of gnssFieldObservationQuizQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctReason.trim()).not.toBe("");
      expect(question.fieldCheck.trim()).not.toBe("");
      for (const option of question.options) {
        const evaluation = evaluateGnssFieldObservationQuizAnswer(
          question.id,
          option.id,
        );
        expect(evaluation?.correctOptionId).toBe(question.correctOptionId);
        if (option.id === question.correctOptionId) {
          expect(option.incorrectReason).toBeNull();
          expect(evaluation).toMatchObject({ isCorrect: true, selectedAnswerReason: null });
        } else {
          expect(option.incorrectReason?.trim()).not.toBe("");
          expect(evaluation).toMatchObject({
            isCorrect: false,
            selectedAnswerReason: option.incorrectReason,
          });
        }
      }
    }
  });

  it("未知問題ID・未知選択肢IDを異常表示へ送らず拒否する", () => {
    expect(getGnssFieldObservationQuizQuestion("unknown")).toBeNull();
    expect(getGnssFieldObservationQuizOptionLetter("unknown", "unknown")).toBeNull();
    expect(
      getGnssFieldObservationQuizOptionLetter("fix-and-acceptance", "unknown"),
    ).toBeNull();
    expect(evaluateGnssFieldObservationQuizAnswer("unknown", "unknown")).toBeNull();
    expect(
      evaluateGnssFieldObservationQuizAnswer("fix-and-acceptance", "unknown"),
    ).toBeNull();
  });
});
