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

  it("第1章～第7章の安定章IDと順序を維持する", () => {
    expect(lessonItems.map((item) => item.lesson.id)).toEqual(
      gnssLessons.map((lesson) => lesson.id),
    );
    expect(lessonItems.map((item) => item.lesson.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("基礎編へ第1章～第4章、基準局RTKへ第5章～第7章を配置する", () => {
    expect(
      getCategory("basics").items
        .filter((item) => item.kind === "lesson")
        .map((item) => item.lesson.number),
    ).toEqual([1, 2, 3, 4]);
    expect(
      getCategory("base-station-rtk").items
        .filter((item) => item.kind === "lesson")
        .map((item) => item.lesson.number),
    ).toEqual([5, 6, 7]);
  });

  it("第8章表示は準備中でありLesson IDを持たない", () => {
    const upcomingItem = getCategory("base-station-rtk").items.find(
      (item) => item.kind === "upcoming",
    );

    expect(upcomingItem).toEqual({
      kind: "upcoming",
      number: 8,
      title: "現場観測と点検",
      status: "準備中",
    });
    expect(upcomingItem && "id" in upcomingItem).toBe(false);
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
