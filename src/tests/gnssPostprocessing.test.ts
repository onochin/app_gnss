import { describe, expect, it } from "vitest";
import {
  gnssFieldObservationLesson,
  gnssLessons,
  gnssPostprocessingLesson,
} from "../components/gnss/gnssCourse";
import {
  evaluateGnssPostprocessingQuizAnswer,
  getGnssPostprocessingQuizOptionLetter,
  getGnssPostprocessingQuizQuestion,
  gnssPostprocessingBaselineExample,
  gnssPostprocessingBaselineSteps,
  gnssPostprocessingCards,
  gnssPostprocessingCoordinateChecks,
  gnssPostprocessingCoreMessages,
  gnssPostprocessingCurrentToEpochExample,
  gnssPostprocessingEpochExample,
  gnssPostprocessingEpochToCurrentSteps,
  gnssPostprocessingExternalLinks,
  gnssPostprocessingFieldSaveChecks,
  gnssPostprocessingJgd2024Example,
  gnssPostprocessingMethodComparison,
  gnssPostprocessingObservationCoordinateComparison,
  gnssPostprocessingQuizQuestions,
  gnssPostprocessingResultWorkflow,
  gnssPostprocessingRinexRoles,
  gnssPostprocessingSemiDynamicParameter,
} from "../components/gnss/data/gnssPostprocessing";

describe("GNSS測量 第9章 観測データと後処理解析", () => {
  it("第1章～第8章と第9章メタデータを維持する", () => {
    expect(gnssLessons.slice(0, 8).at(-1)).toBe(gnssFieldObservationLesson);
    expect(gnssPostprocessingLesson).toMatchObject({
      id: "gnss-postprocessing",
      number: 9,
      title: "観測データと後処理解析",
    });
    expect(gnssPostprocessingLesson.learningGoal).toContain("観測データと座標");
    expect(gnssPostprocessingLesson.learningGoal).toContain("元期から今期");
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

  it("9カードを指定タイトルと順序で定義する", () => {
    expect(gnssPostprocessingCards.map((card) => card.id)).toEqual([
      "what-remains",
      "observation-vs-coordinate",
      "rinex",
      "realtime-vs-postprocess",
      "baseline-processing",
      "coordinate-epoch",
      "epoch-to-current",
      "current-to-epoch",
      "result-workflow",
    ]);
    expect(gnssPostprocessingCards.map((card) => card.title)).toEqual([
      "観測が終わった。何が残っている？",
      "座標データとGNSS観測データは違う",
      "RINEXとは何？",
      "リアルタイム測位と後処理は何が違う？",
      "後処理では何をしている？",
      "その座標は、いつの座標？",
      "なぜ元期 → 今期へ補正する？",
      "なぜ最後に今期 → 元期へ戻す？",
      "観測データから成果まで一本につなぐ",
    ]);
  });

  it("3大メッセージと現場保存チェック3項目を保持する", () => {
    expect(gnssPostprocessingCoreMessages.map((message) => message.label)).toEqual([
      "観測値 ≠ 座標",
      "リアルタイム ≠ 後処理",
      "測地系 ≠ 座標の時点",
    ]);
    expect(gnssPostprocessingCoreMessages[0].summary).toContain("解析の材料");
    expect(gnssPostprocessingCoreMessages[1].summary).toContain("後から解析");
    expect(gnssPostprocessingCoreMessages[2].summary).toContain("別の確認項目");
    expect(gnssPostprocessingFieldSaveChecks).toEqual([
      "座標結果を保存したか",
      "再解析に使えるGNSS観測データを保存したか",
      "点名・日時・アンテナ高など解析条件を記録したか",
    ]);
  });

  it("観測データを解析材料、座標を解析結果として区別する", () => {
    expect(gnssPostprocessingObservationCoordinateComparison).toContainEqual([
      "役割",
      "解析の材料",
      "解析結果",
    ]);
    expect(gnssPostprocessingObservationCoordinateComparison).toContainEqual([
      "再解析",
      "適切な観測データ等があれば可能",
      "座標だけから元の観測値には戻れない",
    ]);
  });

  it("RINEXを観測データという中身ではなく標準形式として定義する", () => {
    expect(gnssPostprocessingRinexRoles).toEqual([
      { id: "content", label: "GNSS観測データ", role: "中身" },
      { id: "format", label: "RINEX", role: "観測データ等を記録・交換する標準形式" },
      { id: "result", label: "座標", role: "観測データ等を解析して得られた結果" },
    ]);
  });

  it("RTKとスタティック後処理を解析時期で区別する", () => {
    expect(gnssPostprocessingMethodComparison).toContainEqual([
      "解析時期",
      "観測中",
      "観測後",
    ]);
    expect(gnssPostprocessingMethodComparison).toContainEqual([
      "GNSS観測",
      "行う",
      "行う",
    ]);
  });

  it("基線解析の代表フローと固定教材値を保持する", () => {
    expect(gnssPostprocessingBaselineSteps).toContain(
      "A → P1の3次元的な位置の差＝基線ベクトルを求める",
    );
    expect(gnssPostprocessingBaselineExample).toEqual({
      knownPoint: { id: "A", x: 1000, y: 1000, height: 50 },
      baseline: { x: 12.345, y: 8.765, height: -0.168 },
      newPoint: { id: "P1", x: 1012.345, y: 1008.765, height: 49.832 },
    });
  });

  it("元期・今期の仮想値とJGD2024の基準日例を保持する", () => {
    expect(gnssPostprocessingEpochExample).toMatchObject({
      pointId: "T1",
      referenceEpoch: { x: 1000, y: 1000 },
      currentEpoch: { x: 1000.035, y: 999.982 },
      displacement: { x: 0.035, y: -0.018 },
    });
    expect(gnssPostprocessingEpochExample.note).toContain("教材用仮想値");
    expect(gnssPostprocessingJgd2024Example).toMatchObject({
      datum: "JGD2024",
      horizontalReferenceDate: "2011年5月24日",
      heightReferenceDate: "2024年6月1日",
    });
    expect(gnssPostprocessingCoordinateChecks.map(([item]) => item)).toEqual([
      "測地系",
      "座標の時点",
      "観測日時",
      "平面座標系",
      "高さ",
    ]);
  });

  it("元期→今期と今期→元期の代表フロー・固定値・適用範囲注意を保持する", () => {
    expect(gnssPostprocessingEpochToCurrentSteps).toContain(
      "セミ・ダイナミック補正：元期 → 今期",
    );
    expect(gnssPostprocessingEpochToCurrentSteps.at(-1)).toBe("新点P1【今期】");
    expect(gnssPostprocessingCurrentToEpochExample).toEqual({
      current: { x: 1012.38, y: 1008.747 },
      displacement: { x: 0.035, y: -0.018 },
      reference: { x: 1012.345, y: 1008.765 },
      note: "補正の向きと符号を理解するための教材用仮想値です。",
    });
    expect(gnssPostprocessingSemiDynamicParameter.mesh).toContain("約5 kmメッシュ");
    expect(gnssPostprocessingSemiDynamicParameter.currentReference).toContain(
      "2026年4月1日～2027年3月31日",
    );
    expect(gnssPostprocessingSemiDynamicParameter.caution).toContain("暗記せず");
  });

  it("カード9を8工程でまとめ、必要に応じた補正として限定する", () => {
    expect(gnssPostprocessingResultWorkflow).toHaveLength(8);
    expect(gnssPostprocessingResultWorkflow[0]).toMatchObject({
      id: "observe",
      label: "P1でGNSS観測",
    });
    expect(gnssPostprocessingResultWorkflow.at(-1)?.label).toContain(
      "必要に応じて今期 → 元期補正",
    );
  });

  it("Drogger優先・GSI補足の現行HTTPS公式リンクをカードへ配置する", () => {
    expect(gnssPostprocessingExternalLinks.every((link) => link.href.startsWith("https://"))).toBe(true);
    expect(gnssPostprocessingExternalLinks.filter((link) => link.source === "drogger")).toHaveLength(5);
    expect(gnssPostprocessingExternalLinks.filter((link) => link.source === "gsi")).toHaveLength(2);
    for (let cardNumber = 1; cardNumber <= 9; cardNumber += 1) {
      const links = gnssPostprocessingExternalLinks.filter((link) =>
        link.cardIds.includes(cardNumber as never),
      );
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links.length).toBeLessThanOrEqual(3);
    }
  });

  it("8確認問題を安定IDとC/A/D/B/C/D/A/Bの正答位置で定義する", () => {
    expect(gnssPostprocessingQuizQuestions.map((question) => question.id)).toEqual([
      "gnss-postprocessing-q01-reanalysis-data",
      "gnss-postprocessing-q02-observation-vs-coordinate",
      "gnss-postprocessing-q03-rinex",
      "gnss-postprocessing-q04-realtime-vs-postprocess",
      "gnss-postprocessing-q05-baseline",
      "gnss-postprocessing-q06-epoch-and-datum",
      "gnss-postprocessing-q07-epoch-to-current",
      "gnss-postprocessing-q08-current-to-epoch",
    ]);
    const correctLetters = gnssPostprocessingQuizQuestions.map((question) =>
      getGnssPostprocessingQuizOptionLetter(question.id, question.correctOptionId),
    );
    expect(correctLetters).toEqual(["C", "A", "D", "B", "C", "D", "A", "B"]);
    expect(Object.fromEntries(["A", "B", "C", "D"].map((letter) => [
      letter,
      correctLetters.filter((current) => current === letter).length,
    ]))).toEqual({ A: 2, B: 2, C: 2, D: 2 });
  });

  it("全32選択肢を評価し、全誤答へ固有理由を持たせる", () => {
    const allOptionIds = gnssPostprocessingQuizQuestions.flatMap((question) =>
      question.options.map((option) => option.id),
    );
    expect(new Set(allOptionIds).size).toBe(32);
    for (const question of gnssPostprocessingQuizQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctReason.trim()).not.toBe("");
      expect(question.fieldCheck.trim()).not.toBe("");
      for (const option of question.options) {
        const evaluation = evaluateGnssPostprocessingQuizAnswer(question.id, option.id);
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

  it("誤解を正答として採用せず、未知IDを安全に拒否する", () => {
    const correctLabels = gnssPostprocessingQuizQuestions.map((question) =>
      question.options.find((option) => option.id === question.correctOptionId)?.label,
    );
    expect(correctLabels.join(" ")).not.toContain("GNSS観測データそのものを意味");
    expect(correctLabels.join(" ")).not.toContain("長時間平均するだけ");
    expect(correctLabels.join(" ")).not.toContain("JGD2024は今期");
    expect(correctLabels.join(" ")).not.toContain("物理的位置へ移動");
    expect(getGnssPostprocessingQuizQuestion("unknown")).toBeNull();
    expect(getGnssPostprocessingQuizOptionLetter("unknown", "unknown")).toBeNull();
    expect(
      getGnssPostprocessingQuizOptionLetter(
        "gnss-postprocessing-q01-reanalysis-data",
        "unknown",
      ),
    ).toBeNull();
    expect(evaluateGnssPostprocessingQuizAnswer("unknown", "unknown")).toBeNull();
    expect(
      evaluateGnssPostprocessingQuizAnswer(
        "gnss-postprocessing-q01-reanalysis-data",
        "unknown",
      ),
    ).toBeNull();
  });
});
