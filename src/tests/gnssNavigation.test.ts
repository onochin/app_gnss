import { describe, expect, it } from "vitest";
import { gnssLessons } from "../components/gnss/gnssCourse";
import { gnssLessonCategories } from "../components/gnss/gnssNavigation";

function getCategory(categoryId: string) {
  const category = gnssLessonCategories.find(({ id }) => id === categoryId);

  if (!category) {
    throw new Error(`GNSSカテゴリが見つかりません: ${categoryId}`);
  }

  return category;
}

describe("GNSS UI再編 Phase 1 章ナビゲーション", () => {
  const lessonItems = gnssLessonCategories.flatMap((category) =>
    category.items.filter((item) => item.kind === "lesson"),
  );

  it("第1章～第8章の安定章IDと順序を維持する", () => {
    expect(lessonItems.map((item) => item.lesson.id)).toEqual(
      gnssLessons.map((lesson) => lesson.id),
    );
    expect(lessonItems.map((item) => item.lesson.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });

  it("基礎編へ第1章～第4章、基準局RTKへ第5章～第8章を配置する", () => {
    expect(
      getCategory("basics").items
        .filter((item) => item.kind === "lesson")
        .map((item) => item.lesson.number),
    ).toEqual([1, 2, 3, 4]);
    expect(
      getCategory("base-station-rtk").items
        .filter((item) => item.kind === "lesson")
        .map((item) => item.lesson.number),
    ).toEqual([5, 6, 7, 8]);
  });

  it("第8章を基準局RTKの利用可能Lessonとして配置する", () => {
    expect(getCategory("base-station-rtk").items.at(-1)).toMatchObject({
      kind: "lesson",
      lesson: {
        id: "gnss-field-observation",
        number: 8,
        title: "自前RTK④ 現場観測と点検",
      },
      shortTitle: "現場観測と点検",
    });
  });

  it("未実装カテゴリは架空Lessonを生成しない", () => {
    expect(gnssLessonCategories.map((category) => category.title)).toEqual([
      "基礎編",
      "基準局RTK",
      "ネットワークRTK",
      "CLAS測量",
      "スタティック測量",
      "後処理",
      "応用編",
    ]);
    expect(
      gnssLessonCategories.slice(2).every(
        (category) => category.status === "準備中" && category.items.length === 0,
      ),
    ).toBe(true);
  });
});
