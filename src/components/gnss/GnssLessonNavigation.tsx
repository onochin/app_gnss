import { useEffect, useState } from "react";
import { gnssLessonCategories } from "./gnssNavigation";
import type { GnssLessonId } from "./types";

interface GnssLessonNavigationProps {
  readonly activeLessonId: GnssLessonId;
  readonly onActiveLessonChange: (lessonId: GnssLessonId) => void;
  readonly understoodLessonIds: readonly GnssLessonId[];
}

function getCategoryIdForLesson(lessonId: GnssLessonId): string {
  return (
    gnssLessonCategories.find((category) =>
      category.items.some(
        (item) => item.kind === "lesson" && item.lesson.id === lessonId,
      ),
    )?.id ?? "basics"
  );
}

function GnssLessonNavigation({
  activeLessonId,
  onActiveLessonChange,
  understoodLessonIds,
}: GnssLessonNavigationProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(() =>
    window.matchMedia("(min-width: 981px)").matches,
  );
  const activeCategoryId = getCategoryIdForLesson(activeLessonId);
  const activeLesson = gnssLessonCategories
    .flatMap((category) => category.items)
    .find(
      (item) => item.kind === "lesson" && item.lesson.id === activeLessonId,
    );
  const [openCategoryIds, setOpenCategoryIds] = useState<readonly string[]>([
    activeCategoryId,
  ]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 981px)");
    const syncNavigationDisclosure = (): void => {
      setIsNavigationOpen(desktopMediaQuery.matches);
    };

    desktopMediaQuery.addEventListener("change", syncNavigationDisclosure);

    return () => {
      desktopMediaQuery.removeEventListener("change", syncNavigationDisclosure);
    };
  }, []);

  const selectLesson = (lessonId: GnssLessonId): void => {
    const destinationCategoryId = getCategoryIdForLesson(lessonId);

    setOpenCategoryIds((current) =>
      current.includes(destinationCategoryId)
        ? current
        : [...current, destinationCategoryId],
    );
    onActiveLessonChange(lessonId);
  };

  const toggleCategory = (categoryId: string): void => {
    if (categoryId === activeCategoryId) {
      return;
    }

    setOpenCategoryIds((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  };

  return (
    <nav aria-label="GNSS教材の章" className="gnss-lesson-navigation">
      <details
        className="gnss-navigation-disclosure"
        onToggle={(event) => setIsNavigationOpen(event.currentTarget.open)}
        open={isNavigationOpen}
      >
        <summary>
          <span>現在：</span>
          <strong>
            {activeLesson?.kind === "lesson"
              ? `第${activeLesson.lesson.number}章 ${activeLesson.shortTitle}`
              : "章を選択"}
          </strong>
          <small>章を選ぶ</small>
        </summary>

        <div className="gnss-navigation-groups">
          {gnssLessonCategories.map((category) => {
            const isOpen = openCategoryIds.includes(category.id);
            const regionId = `gnss-navigation-category-${category.id}`;

            return (
              <section
                className="gnss-navigation-category"
                data-gnss-category-id={category.id}
                key={category.id}
              >
                <button
                  aria-controls={regionId}
                  aria-expanded={isOpen}
                  className="gnss-navigation-category-toggle"
                  onClick={() => toggleCategory(category.id)}
                  type="button"
                >
                  <span aria-hidden="true">{isOpen ? "▼" : "▶"}</span>
                  <strong>{category.title}</strong>
                  {category.status ? <small>{category.status}</small> : null}
                </button>

                <div
                  className="gnss-navigation-category-items"
                  hidden={!isOpen}
                  id={regionId}
                >
                  {category.items.map((item) => {
                    if (item.kind === "upcoming") {
                      return (
                        <div
                          className="gnss-navigation-upcoming-item"
                          data-gnss-upcoming-lesson="8"
                          key={item.number}
                        >
                          <span>{String(item.number).padStart(2, "0")}</span>
                          <strong>{item.title}</strong>
                          <small>{item.status}</small>
                        </div>
                      );
                    }

                    const isSelected = item.lesson.id === activeLessonId;

                    return (
                      <button
                        aria-current={isSelected ? "page" : undefined}
                        aria-label={`第${item.lesson.number}章 ${item.lesson.title} ${understoodLessonIds.includes(item.lesson.id) ? "理解済み" : "学習する"}`}
                        className={`gnss-navigation-lesson ${isSelected ? "is-selected" : ""}`}
                        data-lesson-navigation-id={item.lesson.id}
                        key={item.lesson.id}
                        onClick={() => selectLesson(item.lesson.id)}
                        type="button"
                      >
                        <span>{String(item.lesson.number).padStart(2, "0")}</span>
                        <strong>{item.shortTitle}</strong>
                        <small>
                          {understoodLessonIds.includes(item.lesson.id)
                            ? "理解済み"
                            : "学習する"}
                        </small>
                      </button>
                    );
                  })}

                  {category.items.length === 0 ? (
                    <p className="gnss-navigation-category-status">準備中</p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </details>
    </nav>
  );
}

export default GnssLessonNavigation;
