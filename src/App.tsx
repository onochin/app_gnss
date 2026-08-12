import { useState } from "react";
import SurveyGnss from "./components/gnss/SurveyGnss";
import { gnssLessons } from "./components/gnss/gnssCourse";
import type { GnssLessonId } from "./components/gnss/types";
import Header from "./components/layout/Header";

function App() {
  const [activeGnssLessonId, setActiveGnssLessonId] =
    useState<GnssLessonId>(gnssLessons[0].id);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        メインコンテンツへ移動
      </a>
      <Header />

      <main className="main-content" id="main-content">
        <SurveyGnss
          activeLessonId={activeGnssLessonId}
          onActiveLessonChange={setActiveGnssLessonId}
        />
      </main>
    </div>
  );
}

export default App;
