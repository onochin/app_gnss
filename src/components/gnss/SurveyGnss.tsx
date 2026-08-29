import { useState } from "react";
import GnssLessonNavigation from "./GnssLessonNavigation";
import { gnssLessons } from "./gnssCourse";
import GnssBaselineFixLesson from "./lessons/GnssBaselineFixLesson";
import GnssCorrectionDeliveryLesson from "./lessons/GnssCorrectionDeliveryLesson";
import GnssCoordinateHeightLesson from "./lessons/GnssCoordinateHeightLesson";
import GnssFieldObservationLesson from "./lessons/GnssFieldObservationLesson";
import GnssOwnBaseStationLesson from "./lessons/GnssOwnBaseStationLesson";
import GnssOverviewLesson from "./lessons/GnssOverviewLesson";
import GnssObservationsLesson from "./lessons/GnssObservationsLesson";
import GnssPostprocessingLesson from "./lessons/GnssPostprocessingLesson";
import GnssNetworkRtkClasLesson from "./lessons/GnssNetworkRtkClasLesson";
import GnssPositioningMethodsLesson from "./lessons/GnssPositioningMethodsLesson";
import type { GnssLessonId } from "./types";

interface SurveyGnssProps {
  readonly activeLessonId: GnssLessonId;
  readonly onActiveLessonChange: (lessonId: GnssLessonId) => void;
}

function SurveyGnss({
  activeLessonId,
  onActiveLessonChange,
}: SurveyGnssProps) {
  const [understoodLessonIds, setUnderstoodLessonIds] = useState<
    readonly GnssLessonId[]
  >([]);

  const toggleUnderstood = (lessonId: GnssLessonId): void => {
    setUnderstoodLessonIds((current) =>
      current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId],
    );
  };

  const completedLessonCount = understoodLessonIds.length;
  const totalLessonCount = gnssLessons.length;

  return (
    <div className="gnss-page">
      <GnssLessonNavigation
        activeLessonId={activeLessonId}
        onActiveLessonChange={onActiveLessonChange}
        understoodLessonIds={understoodLessonIds}
      />

      <div className="gnss-lesson-content">
        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-overview"}
        >
          <GnssOverviewLesson
            completedLessonCount={completedLessonCount}
            isUnderstood={understoodLessonIds.includes("gnss-overview")}
            onToggleUnderstood={() => toggleUnderstood("gnss-overview")}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-observations"}
        >
          <GnssObservationsLesson
            completedLessonCount={completedLessonCount}
            isUnderstood={understoodLessonIds.includes("gnss-observations")}
            onToggleUnderstood={() => toggleUnderstood("gnss-observations")}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-coordinate-height"}
        >
          <GnssCoordinateHeightLesson
            completedLessonCount={completedLessonCount}
            isUnderstood={understoodLessonIds.includes(
              "gnss-coordinate-height",
            )}
            onToggleUnderstood={() => toggleUnderstood("gnss-coordinate-height")}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-positioning-methods"}
        >
          <GnssPositioningMethodsLesson
            completedLessonCount={completedLessonCount}
            isUnderstood={understoodLessonIds.includes(
              "gnss-positioning-methods",
            )}
            onToggleUnderstood={() =>
              toggleUnderstood("gnss-positioning-methods")
            }
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-own-base-station"}
        >
          <GnssOwnBaseStationLesson
            completedLessonCount={completedLessonCount}
            isUnderstood={understoodLessonIds.includes("gnss-own-base-station")}
            onToggleUnderstood={() => toggleUnderstood("gnss-own-base-station")}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-correction-delivery"}
        >
          <GnssCorrectionDeliveryLesson
            completedLessonCount={completedLessonCount}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-baseline-fix"}
        >
          <GnssBaselineFixLesson
            completedLessonCount={completedLessonCount}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-field-observation"}
        >
          <GnssFieldObservationLesson
            completedLessonCount={completedLessonCount}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-postprocessing"}
        >
          <GnssPostprocessingLesson
            completedLessonCount={completedLessonCount}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <div
          className="gnss-lesson-panel"
          hidden={activeLessonId !== "gnss-network-rtk-clas"}
        >
          <GnssNetworkRtkClasLesson
            completedLessonCount={completedLessonCount}
            totalLessonCount={totalLessonCount}
          />
        </div>

        <p className="gnss-course-note">
          本教材の数値と図は学習用の仮想例です。GNSS教材の操作状態と問題回答はこの画面を開いている間だけ保持し、localStorageへ保存しません。
        </p>
      </div>
    </div>
  );
}

export default SurveyGnss;
