import { useState } from "react";
import {
  evaluateGnssPostprocessingQuizAnswer,
  getGnssPostprocessingQuizOptionLetter,
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
  gnssPostprocessingObservationFlow,
  gnssPostprocessingQuizQuestions,
  gnssPostprocessingRealtimeSteps,
  gnssPostprocessingResultWorkflow,
  gnssPostprocessingRinexContents,
  gnssPostprocessingRinexFlow,
  gnssPostprocessingRinexRoles,
  gnssPostprocessingSavedDataGroups,
  gnssPostprocessingSemiDynamicParameter,
  gnssPostprocessingStaticSteps,
} from "../data/gnssPostprocessing";
import { gnssPostprocessingLesson } from "../gnssCourse";

interface GnssPostprocessingLessonProps {
  readonly completedLessonCount: number;
  readonly totalLessonCount: number;
}

interface GnssQuizAnswerState {
  readonly selectedOptionId: string;
  readonly isAnswered: boolean;
}

type GnssQuizAnswerStateMap = Readonly<
  Record<string, GnssQuizAnswerState | undefined>
>;

function formatCoordinate(value: number): string {
  return Number.isFinite(value) ? value.toFixed(3) : "表示できません";
}

function formatSignedCoordinate(value: number): string {
  if (!Number.isFinite(value)) {
    return "表示できません";
  }
  return `${value >= 0 ? "+" : ""}${value.toFixed(3)}`;
}

function GnssPostprocessingCardHeading({
  description,
  index,
  label,
  titleId,
}: {
  readonly description: string;
  readonly index: number;
  readonly label: string;
  readonly titleId: string;
}) {
  return (
    <header className="gnss-card-heading">
      <div>
        <span>カード {index} / 9 · {label}</span>
        <h2 id={titleId}>
          {gnssPostprocessingCards[index - 1]?.title ?? "教材カード"}
        </h2>
      </div>
      <p>{description}</p>
    </header>
  );
}

function GnssPostprocessingExternalLinks({
  cardNumber,
}: {
  readonly cardNumber: number;
}) {
  const links = gnssPostprocessingExternalLinks.filter((link) =>
    link.cardIds.some((currentCardNumber) => currentCardNumber === cardNumber),
  );

  return (
    <aside
      aria-label={`カード${cardNumber}の公式補助リンク`}
      className="gnss-post-external-links"
      data-external-link-card={cardNumber}
    >
      <span>公式資料で確認</span>
      <ul>
        {links.map((link) => (
          <li data-source={link.source} key={link.id}>
            <a href={link.href} rel="noreferrer" target="_blank">
              {link.label}<span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function StaticFlow({
  ariaLabel,
  items,
}: {
  readonly ariaLabel: string;
  readonly items: readonly string[];
}) {
  return (
    <ol aria-label={ariaLabel} className="gnss-post-static-flow">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < items.length - 1 ? <b aria-hidden="true">↓</b> : null}
        </li>
      ))}
    </ol>
  );
}

function GnssPostprocessingLesson({
  completedLessonCount,
  totalLessonCount,
}: GnssPostprocessingLessonProps) {
  const [quizAnswerStates, setQuizAnswerStates] =
    useState<GnssQuizAnswerStateMap>({});
  const progressPercent =
    totalLessonCount > 0
      ? Math.round((completedLessonCount / totalLessonCount) * 100)
      : 0;

  const selectQuizOption = (questionId: string, optionId: string): void => {
    setQuizAnswerStates((current) => ({
      ...current,
      [questionId]: { selectedOptionId: optionId, isAnswered: false },
    }));
  };

  const submitQuizAnswer = (questionId: string): void => {
    setQuizAnswerStates((current) => {
      const answerState = current[questionId];
      if (!answerState?.selectedOptionId) {
        return current;
      }
      return {
        ...current,
        [questionId]: { ...answerState, isAnswered: true },
      };
    });
  };

  return (
    <div
      className="gnss-lesson gnss-postprocessing-lesson"
      data-lesson-id="gnss-postprocessing"
    >
      <section
        aria-labelledby="gnss-postprocessing-course-title"
        className="gnss-card gnss-chapter-card"
        data-gnss-postprocessing-card="1"
        data-testid="gnss-postprocessing-remains-card"
        id="gnss-postprocessing"
        tabIndex={-1}
      >
        <div className="gnss-card-index">カード 1 / 9 · 静的分類</div>
        <div className="gnss-chapter-layout">
          <div className="gnss-chapter-copy">
            <span className="gnss-course-eyebrow">GNSS COURSE · PHASE 9</span>
            <h1 id="gnss-postprocessing-course-title">GNSS測量</h1>
            <p className="gnss-chapter-number">第9章</p>
            <h2>{gnssPostprocessingCards[0].title}</h2>
            <p>{gnssPostprocessingLesson.description}</p>
          </div>
          <div className="gnss-chapter-progress">
            <div>
              <span>利用可能な章の進捗</span>
              <strong>
                {completedLessonCount} / {totalLessonCount} 章
              </strong>
            </div>
            <div
              aria-label={`GNSS教材の進捗 ${progressPercent}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={progressPercent}
              className="gnss-progress-track"
              role="progressbar"
            >
              <span style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="gnss-chapter-metadata">
          <div className="gnss-goal-panel">
            <span>到達目標</span>
            <strong>{gnssPostprocessingLesson.learningGoal}</strong>
          </div>
          <div>
            <h3>主な用語</h3>
            <div className="gnss-term-list">
              {gnssPostprocessingLesson.terms.map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </div>
          <div className="gnss-caution-panel">
            <h3>この章で確認すること</h3>
            <ul>
              {gnssPostprocessingLesson.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gnss-post-opening-question">
          <span>第8章からの接続</span>
          <p>第8章で記録したP1について、数日後に観測そのものを再解析できる材料が残っているかを考えます。</p>
          <strong>P1の座標だけで、衛星ごとの観測値からもう一度解析できる？</strong>
          <p>答えは「できるとは限らない」です。</p>
        </div>
        <div className="gnss-post-saved-grid">
          {gnssPostprocessingSavedDataGroups.map((group) => (
            <article data-saved-data-id={group.id} key={group.id}>
              <span>0{group.number}</span>
              <h3>{group.label}</h3>
              <p>{group.role}</p>
              <ul>{group.examples.map((example) => <li key={example}>{example}</li>)}</ul>
            </article>
          ))}
        </div>
        <blockquote className="gnss-important-message">
          「座標が保存されている」ことと「GNSS観測データが保存されている」ことは同じではありません。
        </blockquote>
        <aside className="gnss-post-save-check" data-testid="gnss-postprocessing-save-check">
          <h3>現場を離れる前に確認</h3>
          <ol>{gnssPostprocessingFieldSaveChecks.map((check) => <li key={check}>{check}</li>)}</ol>
          <strong>「座標を保存したか？」だけでなく、「再解析できる材料まで残したか？」を確認する。</strong>
        </aside>
        <p className="gnss-post-caution">必要なデータは、測位方式、業務目的、作業規程、成果用途等で異なります。すべてのGNSS利用でRAW保存が必須という意味ではありません。</p>
        <GnssPostprocessingExternalLinks cardNumber={1} />
      </section>

      <section
        aria-labelledby="gnss-post-card2-title"
        className="gnss-card"
        data-gnss-postprocessing-card="2"
        data-testid="gnss-postprocessing-observation-coordinate-card"
      >
        <GnssPostprocessingCardHeading
          description="衛星から完成したX・Yが届くのではなく、観測値を解析して座標を得る流れを確認します。"
          index={2}
          label="静的フローと比較"
          titleId="gnss-post-card2-title"
        />
        <ol aria-label="GNSS衛星から観測データを経てP1の座標を得る流れ" className="gnss-post-observation-flow">
          {gnssPostprocessingObservationFlow.map((step, index) => (
            <li key={step.id}>
              <span>{step.label}</span><p>{step.detail}</p>
              {index < gnssPostprocessingObservationFlow.length - 1 ? <b aria-hidden="true">↓</b> : null}
            </li>
          ))}
        </ol>
        <div className="gnss-post-table-wrap">
          <table>
            <thead><tr><th>項目</th><th>GNSS観測データ</th><th>座標データ</th></tr></thead>
            <tbody>{gnssPostprocessingObservationCoordinateComparison.map(([item, observation, coordinate]) => (
              <tr key={item}><th>{item}</th><td>{observation}</td><td>{coordinate}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <blockquote className="gnss-important-message">
          GNSS観測データ ＝ 解析の材料。座標 ＝ 解析して得られた結果。座標だけから元の衛星観測データには戻せません。
        </blockquote>
        <p className="gnss-post-caution">観測データが1ファイルあれば何でも再解析できるわけではありません。解析方法に応じて、航法データ、基準側情報、受信機・アンテナ情報、解析条件等も必要です。</p>
        <GnssPostprocessingExternalLinks cardNumber={2} />
      </section>

      <section
        aria-labelledby="gnss-post-card3-title"
        className="gnss-card"
        data-gnss-postprocessing-card="3"
        data-testid="gnss-postprocessing-rinex-card"
      >
        <GnssPostprocessingCardHeading
          description="観測データという中身、RINEXという形式、解析結果である座標を分けて整理します。"
          index={3}
          label="静的概念整理"
          titleId="gnss-post-card3-title"
        />
        <div className="gnss-post-three-roles">
          {gnssPostprocessingRinexRoles.map((item) => (
            <article data-rinex-role={item.id} key={item.id}><strong>{item.label}</strong><span>{item.role}</span></article>
          ))}
        </div>
        <blockquote className="gnss-important-message">
          RINEX ＝ 観測データそのもの、ではありません。GNSS観測データ等を記録・交換する標準形式です。
        </blockquote>
        <p><b>Receiver Independent Exchange Format</b> は、特定メーカー固有形式だけに依存せず、異なる受信機・解析ソフト間でデータを扱いやすくするための名称です。暗記する必要はありません。</p>
        <StaticFlow ariaLabel="DroggerのRAWからRINEX観測ファイルを経て後処理する代表例" items={gnssPostprocessingRinexFlow} />
        <div className="gnss-post-rinex-contents">
          <h3>この章で扱うRINEX観測ファイルの主な中身</h3>
          <ul>{gnssPostprocessingRinexContents.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <p className="gnss-post-caution">RAW→RINEXはDroggerの代表例です。機器によってはRINEXを直接出力できます。また、RINEXには観測データ以外のファイル種別もあり、RINEX観測ファイル1個でどんな解析でも必ずできるわけではありません。</p>
        <GnssPostprocessingExternalLinks cardNumber={3} />
      </section>

      <section
        aria-labelledby="gnss-post-card4-title"
        className="gnss-card"
        data-gnss-postprocessing-card="4"
        data-testid="gnss-postprocessing-method-card"
      >
        <GnssPostprocessingCardHeading
          description="どちらもGNSS観測を行い、解析する時期と座標を得る時期が異なることを比べます。"
          index={4}
          label="静的左右比較"
          titleId="gnss-post-card4-title"
        />
        <div className="gnss-post-method-flow">
          <article><h3>リアルタイム測位（RTK）</h3><StaticFlow ariaLabel="RTKの流れ" items={gnssPostprocessingRealtimeSteps} /></article>
          <article><h3>後処理（スタティック）</h3><StaticFlow ariaLabel="スタティック後処理の流れ" items={gnssPostprocessingStaticSteps} /></article>
        </div>
        <div className="gnss-post-table-wrap">
          <table>
            <thead><tr><th>項目</th><th>RTK</th><th>スタティック後処理</th></tr></thead>
            <tbody>{gnssPostprocessingMethodComparison.map(([item, rtk, staticMethod]) => (
              <tr key={item}><th>{item}</th><td>{rtk}</td><td>{staticMethod}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <blockquote className="gnss-important-message">
          RTKは観測しながら解析。スタティックは観測データを保存して後から解析。
        </blockquote>
        <p className="gnss-post-caution">RTKもGNSS観測データを使います。スタティックは表示座標を長時間平均するだけではありません。RTKでも再解析が必要なら、機器・設定・解析方法に応じた観測データ保存を検討します。</p>
        <GnssPostprocessingExternalLinks cardNumber={4} />
      </section>

      <section
        aria-labelledby="gnss-post-card5-title"
        className="gnss-card"
        data-gnss-postprocessing-card="5"
        data-testid="gnss-postprocessing-baseline-card"
      >
        <GnssPostprocessingCardHeading
          description="後処理の代表例として、既知点Aと新点P1の観測を比べるスタティック法の基線解析を学びます。"
          index={5}
          label="静的基線フロー"
          titleId="gnss-post-card5-title"
        />
        <StaticFlow ariaLabel="スタティック法の基線解析を代表例とする流れ" items={gnssPostprocessingBaselineSteps} />
        <div className="gnss-post-baseline-example">
          <article>
            <span>既知点A</span>
            <strong>X = {formatCoordinate(gnssPostprocessingBaselineExample.knownPoint.x)} m</strong>
            <strong>Y = {formatCoordinate(gnssPostprocessingBaselineExample.knownPoint.y)} m</strong>
            <strong>H = {formatCoordinate(gnssPostprocessingBaselineExample.knownPoint.height)} m</strong>
          </article>
          <article>
            <span>A → P1 基線ベクトル</span>
            <strong>ΔX = {formatSignedCoordinate(gnssPostprocessingBaselineExample.baseline.x)} m</strong>
            <strong>ΔY = {formatSignedCoordinate(gnssPostprocessingBaselineExample.baseline.y)} m</strong>
            <strong>ΔH = {formatSignedCoordinate(gnssPostprocessingBaselineExample.baseline.height)} m</strong>
          </article>
          <article>
            <span>新点P1</span>
            <strong>X = {formatCoordinate(gnssPostprocessingBaselineExample.newPoint.x)} m</strong>
            <strong>Y = {formatCoordinate(gnssPostprocessingBaselineExample.newPoint.y)} m</strong>
            <strong>H = {formatCoordinate(gnssPostprocessingBaselineExample.newPoint.height)} m</strong>
          </article>
        </div>
        <p>同じ時間帯に共通して観測した衛星のコード観測・搬送波位相等を組み合わせ、2地点の相対的な位置関係を求めます。共通する誤差の影響を小さくする方法の一つが、第1章で予告した「二重差」です。</p>
        <blockquote className="gnss-important-message">後処理 ＝ 保存した座標を平均すること、ではありません。基線は水平距離だけでなく3次元の位置関係です。</blockquote>
        <p className="gnss-post-caution">GNSSの後処理にはさまざまな解析方法があります。このカードは測量で重要なスタティック法の基線解析を代表例として扱い、「後処理はすべて基線解析」とはしません。</p>
        <GnssPostprocessingExternalLinks cardNumber={5} />
      </section>

      <section
        aria-labelledby="gnss-post-card6-title"
        className="gnss-card"
        data-gnss-postprocessing-card="6"
        data-testid="gnss-postprocessing-epoch-card"
      >
        <GnssPostprocessingCardHeading
          description="測地系、座標の時点、観測日時を別々に確認し、同じ点でも時点により座標値が異なる場合を理解します。"
          index={6}
          label="静的時点比較"
          titleId="gnss-post-card6-title"
        />
        <div className="gnss-post-epoch-definitions">
          <article><strong>元期</strong><span>測量成果の基準となる時点</span></article>
          <article><strong>今期</strong><span>元期に対して、観測を行う現在側の時点</span><small>セミ・ダイナミック補正では年度単位</small></article>
        </div>
        <div className="gnss-post-epoch-example">
          <h3>仮想点 {gnssPostprocessingEpochExample.pointId}</h3>
          <article><span>元期</span><strong>X = {formatCoordinate(gnssPostprocessingEpochExample.referenceEpoch.x)} m</strong><strong>Y = {formatCoordinate(gnssPostprocessingEpochExample.referenceEpoch.y)} m</strong></article>
          <b>地殻変動<br />ΔX = {formatSignedCoordinate(gnssPostprocessingEpochExample.displacement.x)} m<br />ΔY = {formatSignedCoordinate(gnssPostprocessingEpochExample.displacement.y)} m</b>
          <article><span>今期</span><strong>X = {formatCoordinate(gnssPostprocessingEpochExample.currentEpoch.x)} m</strong><strong>Y = {formatCoordinate(gnssPostprocessingEpochExample.currentEpoch.y)} m</strong></article>
          <small>{gnssPostprocessingEpochExample.note}</small>
        </div>
        <div className="gnss-post-not-equal"><strong>測地系：JGD2024</strong><b>≠</b><strong>座標の時点：元期 / 今期</strong></div>
        <aside className="gnss-post-reference-dates">
          <span>{gnssPostprocessingJgd2024Example.area}</span>
          <strong>測地系：{gnssPostprocessingJgd2024Example.datum}</strong>
          <p>水平位置の元期：{gnssPostprocessingJgd2024Example.horizontalReferenceDate}</p>
          <p>標高成果の元期：{gnssPostprocessingJgd2024Example.heightReferenceDate}</p>
          <small>{gnssPostprocessingJgd2024Example.note}</small>
        </aside>
        <blockquote className="gnss-important-message">観測した日だけを見て、その座標の時点を判断しません。相対測位では、基準局・既知点に与えた座標の期や補正処理が関係します。</blockquote>
        <div className="gnss-post-table-wrap">
          <table><thead><tr><th>確認するもの</th><th>例</th><th>意味</th></tr></thead><tbody>
            {gnssPostprocessingCoordinateChecks.map(([item, example, meaning]) => <tr key={item}><th>{item}</th><td>{example}</td><td>{meaning}</td></tr>)}
          </tbody></table>
        </div>
        <GnssPostprocessingExternalLinks cardNumber={6} />
      </section>

      <section
        aria-labelledby="gnss-post-card7-title"
        className="gnss-card"
        data-gnss-postprocessing-card="7"
        data-testid="gnss-postprocessing-epoch-to-current-card"
      >
        <GnssPostprocessingCardHeading
          description="対象となる基準点測量等で、既知点成果と現在側の観測による位置関係の時点をそろえる理由を学びます。"
          index={7}
          label="静的補正フロー"
          titleId="gnss-post-card7-title"
        />
        <blockquote className="gnss-important-message">現在のGNSS観測による位置関係と、既知点座標の時点をそろえて測量計算するため。</blockquote>
        <div className="gnss-post-strain-note"><strong>Aの変動量 ≠ Bの変動量</strong><p>地点ごとの変動量の差による「ひずみ」が、基準点間の相対位置関係へ影響します。</p></div>
        <StaticFlow ariaLabel="元期の既知点成果を今期へ補正して新点P1の今期座標を求める代表的な流れ" items={gnssPostprocessingEpochToCurrentSteps} />
        <div className="gnss-post-parameter-note">
          <h3>地殻変動補正パラメータ</h3>
          <p>{gnssPostprocessingSemiDynamicParameter.update} / {gnssPostprocessingSemiDynamicParameter.mesh}</p>
          <small>{gnssPostprocessingSemiDynamicParameter.currentReference}</small>
          <strong>{gnssPostprocessingSemiDynamicParameter.caution}</strong>
        </div>
        <p className="gnss-post-caution">現地の既知点を物理的に動かす処理ではありません。元期成果が間違っているから直すのでもありません。GNSSだから必ず行うのではなく、公共測量では電子基準点（付属標を除く）のみを既知点とする基準点測量等が対象です。実務では作業規程・成果用途等を確認します。</p>
        <GnssPostprocessingExternalLinks cardNumber={7} />
      </section>

      <section
        aria-labelledby="gnss-post-card8-title"
        className="gnss-card"
        data-gnss-postprocessing-card="8"
        data-testid="gnss-postprocessing-current-to-epoch-card"
      >
        <GnssPostprocessingCardHeading
          description="今期で計算した新点を、既存の国家座標・基準点成果と同じ基準時点の成果へそろえる理由を学びます。"
          index={8}
          label="静的数値例"
          titleId="gnss-post-card8-title"
        />
        <blockquote className="gnss-important-message">観測・計算では現在側の時点へ整合させ、成果では安定した基準時点へそろえます。</blockquote>
        <div className="gnss-post-current-reference-example">
          <article><span>P1【今期】</span><strong>X = {formatCoordinate(gnssPostprocessingCurrentToEpochExample.current.x)} m</strong><strong>Y = {formatCoordinate(gnssPostprocessingCurrentToEpochExample.current.y)} m</strong></article>
          <div><span>今期 → 元期</span><strong>X：− {formatCoordinate(gnssPostprocessingCurrentToEpochExample.displacement.x)} m</strong><strong>Y：− ({formatSignedCoordinate(gnssPostprocessingCurrentToEpochExample.displacement.y)}) m</strong></div>
          <article><span>P1【元期・成果】</span><strong>X = {formatCoordinate(gnssPostprocessingCurrentToEpochExample.reference.x)} m</strong><strong>Y = {formatCoordinate(gnssPostprocessingCurrentToEpochExample.reference.y)} m</strong></article>
          <small>{gnssPostprocessingCurrentToEpochExample.note}</small>
        </div>
        <div className="gnss-post-same-datum"><span>P1【今期】JGD2024</span><b>セミ・ダイナミック補正</b><span>P1【元期】JGD2024</span></div>
        <aside className="gnss-post-major-warning">
          <strong>現地点を昔の物理的位置へ戻す処理ではありません。</strong>
          <p>変えているのは、同じ現地点をどの時点の座標値として表すかです。今期→元期はJGD2024からJGD2011等への測地系変換でもありません。</p>
        </aside>
        <p className="gnss-post-caution">すべてのGNSS利用で今期→元期補正を行うわけではありません。現在位置を今期として利用する用途もあり、対象となる測量・作業規程・成果用途を確認します。</p>
        <GnssPostprocessingExternalLinks cardNumber={8} />
      </section>

      <section
        aria-labelledby="gnss-post-card9-title"
        className="gnss-card"
        data-gnss-postprocessing-card="9"
        data-testid="gnss-postprocessing-summary-card"
      >
        <GnssPostprocessingCardHeading
          description="カード1〜8を、現場で残した観測データから最終成果までの代表的な流れとしてまとめます。"
          index={9}
          label="静的総まとめ"
          titleId="gnss-post-card9-title"
        />
        <ol aria-label="観測データから成果までの代表的な8工程" className="gnss-post-result-workflow">
          {gnssPostprocessingResultWorkflow.map((step, index) => (
            <li data-workflow-step-id={step.id} key={step.id}>
              <span>{step.phase}</span><strong>{step.label}</strong>
              {index < gnssPostprocessingResultWorkflow.length - 1 ? <b aria-hidden="true">↓</b> : null}
            </li>
          ))}
        </ol>
        <p className="gnss-post-caution">これは、スタティック法やセミ・ダイナミック補正の対象となる基準点測量等を理解するための代表的な流れです。RTK・CLAS・単独測位等がすべて同じ一本道を通るわけではありません。</p>
        <aside className="gnss-post-save-check">
          <h3>現場保存チェック</h3><ol>{gnssPostprocessingFieldSaveChecks.map((check) => <li key={check}>{check}</li>)}</ol>
        </aside>
        <div className="gnss-post-core-message-grid">
          {gnssPostprocessingCoreMessages.map((message) => <article data-core-message-id={message.id} key={message.id}><strong>{message.label}</strong><p>{message.summary}</p></article>)}
        </div>
        <div className="gnss-post-next-chapter">
          <span>第10章への問い</span>
          <strong>ネットワーク型RTKやCLASは、自前RTKやスタティックと何が違うのでしょうか？</strong>
          <p>第10章では、外部情報がどこで作られ、どう届き、受信機がどう利用するかを比べます。</p>
        </div>
        <GnssPostprocessingExternalLinks cardNumber={9} />
      </section>

      <div
        aria-labelledby="gnss-postprocessing-quiz-title"
        className="gnss-quiz-section"
        data-testid="gnss-postprocessing-quiz-panel"
      >
        <div className="gnss-quiz-heading">
          <span>第9章 確認問題</span>
          <h3 id="gnss-postprocessing-quiz-title">観測データと後処理解析を8問で確認する</h3>
          <p>回答状態はReact状態だけに保持し、ページ再読込み後は初期化します。</p>
        </div>
        <div className="gnss-quiz-list">
          {gnssPostprocessingQuizQuestions.map((question, questionIndex) => {
            const answerState = quizAnswerStates[question.id];
            const evaluation = answerState?.isAnswered
              ? evaluateGnssPostprocessingQuizAnswer(question.id, answerState.selectedOptionId)
              : null;
            const correctOptionLetter = getGnssPostprocessingQuizOptionLetter(question.id, question.correctOptionId);
            const selectedOptionLetter = evaluation
              ? getGnssPostprocessingQuizOptionLetter(question.id, evaluation.selectedOptionId)
              : null;

            return (
              <article
                className="gnss-quiz-question"
                data-testid={`gnss-quiz-question-${question.id}`}
                id={`gnss-quiz-card-${question.id}`}
                key={question.id}
              >
                <header><span>{question.questionType}</span><strong>問{questionIndex + 1}</strong></header>
                <h4>{question.prompt}</h4>
                <fieldset>
                  <legend>回答を1つ選んでください</legend>
                  {question.options.map((option, optionIndex) => {
                    const optionDomId = `gnss-quiz-option-${question.id}-${option.id}`;
                    return (
                      <label htmlFor={optionDomId} key={option.id}>
                        <input
                          checked={answerState?.selectedOptionId === option.id}
                          id={optionDomId}
                          name={`gnss-quiz-answer-${question.id}`}
                          onChange={() => selectQuizOption(question.id, option.id)}
                          type="radio"
                        />
                        <span className="gnss-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </fieldset>
                <button disabled={!answerState?.selectedOptionId} onClick={() => submitQuizAnswer(question.id)} type="button">回答を確認する</button>
                {evaluation ? (
                  <div className={`gnss-quiz-feedback ${evaluation.isCorrect ? "is-correct" : "is-incorrect"}`} role="status">
                    <strong>{evaluation.isCorrect ? "正解です" : "不正解です"}</strong>
                    {correctOptionLetter ? <p className="gnss-quiz-correct-answer">正解：{correctOptionLetter}</p> : null}
                    {!evaluation.isCorrect && evaluation.selectedAnswerReason && selectedOptionLetter ? (
                      <section className="gnss-quiz-explanation gnss-quiz-selected-explanation">
                        <h5>{selectedOptionLetter}を選んだ場合の解説</h5><p>{evaluation.selectedAnswerReason}</p>
                      </section>
                    ) : null}
                    <section className="gnss-quiz-explanation"><h5>解説</h5><p>{evaluation.correctReason}</p></section>
                    <p className="gnss-quiz-field-check"><b>現場で確認：</b>{evaluation.fieldCheck}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        <div className="gnss-post-core-message-grid gnss-post-quiz-summary">
          {gnssPostprocessingCoreMessages.map((message) => <article key={message.id}><strong>{message.label}</strong><p>{message.summary}</p></article>)}
        </div>
      </div>
    </div>
  );
}

export default GnssPostprocessingLesson;
