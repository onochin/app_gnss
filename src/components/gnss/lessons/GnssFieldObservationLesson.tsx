import { useState } from "react";
import {
  evaluateGnssFieldDecision,
  evaluateGnssFieldObservationQuizAnswer,
  getGnssFieldDecisionCase,
  getGnssFieldObservationQuizOptionLetter,
  getGnssFieldRepeatCase,
  getGnssFieldReobservationStage,
  getNextGnssFieldReobservationStageId,
  gnssFieldDecisionCases,
  gnssFieldDecisionOptions,
  gnssFieldExternalLinks,
  gnssFieldObservationQuizQuestions,
  gnssFieldInterruptedEpochs,
  gnssFieldKnownPointChecks,
  gnssFieldKnownPointExample,
  gnssFieldMonitoringChecks,
  gnssFieldNormalEpochs,
  gnssFieldObservationCards,
  gnssFieldPreObservationChecks,
  gnssFieldPublicSurveyExample,
  gnssFieldQualityPillars,
  gnssFieldRecordExample,
  gnssFieldRecordGroups,
  gnssFieldRepeatCases,
  gnssFieldReobservationStages,
  gnssFieldWorkflowSteps,
  type GnssFieldDecisionCaseId,
  type GnssFieldDecisionId,
  type GnssFieldReobservationStageId,
  type GnssFieldRepeatCaseId,
} from "../data/gnssFieldObservation";
import { gnssFieldObservationLesson } from "../gnssCourse";

interface GnssFieldObservationLessonProps {
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

interface GnssFieldCardHeadingProps {
  readonly description: string;
  readonly index: number;
  readonly label: string;
  readonly title: string;
  readonly titleId: string;
}

function GnssFieldCardHeading({
  description,
  index,
  label,
  title,
  titleId,
}: GnssFieldCardHeadingProps) {
  return (
    <header className="gnss-card-heading">
      <div>
        <span>
          カード {index} / 9 · {label}
        </span>
        <h2 id={titleId}>{title}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}

function GnssFieldExternalLinks({ cardNumber }: { readonly cardNumber: number }) {
  const links = gnssFieldExternalLinks.filter((link) =>
    link.cardIds.some((currentCardNumber) => currentCardNumber === cardNumber),
  );

  return (
    <aside
      aria-label={`カード${cardNumber}の公式補助リンク`}
      className="gnss-field-external-links"
      data-external-link-card={cardNumber}
    >
      <span>公式資料で確認</span>
      <ul>
        {links.map((link) => (
          <li data-source={link.source} key={link.id}>
            <a href={link.href} rel="noreferrer" target="_blank">
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function formatCoordinate(value: number): string {
  return Number.isFinite(value) ? value.toFixed(3) : "表示できません";
}

function formatMillimeters(value: number): string {
  if (!Number.isFinite(value)) {
    return "表示できません";
  }
  return `${value >= 0 ? "+" : ""}${value} mm`;
}

function GnssFieldObservationLesson({
  completedLessonCount,
  totalLessonCount,
}: GnssFieldObservationLessonProps) {
  const [repeatCaseId, setRepeatCaseId] =
    useState<GnssFieldRepeatCaseId>("repeatable");
  const [reobservationStageId, setReobservationStageId] =
    useState<GnssFieldReobservationStageId>("first-observation");
  const [decisionCaseId, setDecisionCaseId] =
    useState<GnssFieldDecisionCaseId>("repeatable");
  const [selectedDecisions, setSelectedDecisions] = useState<
    Readonly<Record<string, GnssFieldDecisionId | undefined>>
  >({});
  const [evaluatedDecisionCaseIds, setEvaluatedDecisionCaseIds] = useState<
    readonly GnssFieldDecisionCaseId[]
  >([]);
  const [quizAnswerStates, setQuizAnswerStates] =
    useState<GnssQuizAnswerStateMap>({});

  const progressPercent =
    totalLessonCount > 0
      ? Math.round((completedLessonCount / totalLessonCount) * 100)
      : 0;
  const repeatCase =
    getGnssFieldRepeatCase(repeatCaseId) ?? gnssFieldRepeatCases[0];
  const reobservationStage =
    getGnssFieldReobservationStage(reobservationStageId) ??
    gnssFieldReobservationStages[0];
  const nextReobservationStageId = getNextGnssFieldReobservationStageId(
    reobservationStage.id,
  );
  const decisionCase =
    getGnssFieldDecisionCase(decisionCaseId) ?? gnssFieldDecisionCases[0];
  const selectedDecisionId = selectedDecisions[decisionCaseId];
  const decisionEvaluation =
    selectedDecisionId && evaluatedDecisionCaseIds.includes(decisionCaseId)
      ? evaluateGnssFieldDecision(decisionCaseId, selectedDecisionId)
      : null;

  const advanceReobservation = (): void => {
    setReobservationStageId(nextReobservationStageId ?? "first-observation");
  };

  const changeRepeatCase = (caseId: GnssFieldRepeatCaseId): void => {
    setRepeatCaseId(caseId);
    setReobservationStageId("first-observation");
  };

  const selectDecision = (decisionId: GnssFieldDecisionId): void => {
    setSelectedDecisions((current) => ({
      ...current,
      [decisionCaseId]: decisionId,
    }));
    setEvaluatedDecisionCaseIds((current) =>
      current.filter((caseId) => caseId !== decisionCaseId),
    );
  };

  const submitDecision = (): void => {
    if (!selectedDecisionId) {
      return;
    }
    setEvaluatedDecisionCaseIds((current) =>
      current.includes(decisionCaseId)
        ? current
        : [...current, decisionCaseId],
    );
  };

  const selectQuizOption = (questionId: string, optionId: string): void => {
    setQuizAnswerStates((current) => ({
      ...current,
      [questionId]: { selectedOptionId: optionId, isAnswered: false },
    }));
  };

  const submitQuizAnswer = (questionId: string): void => {
    const answerState = quizAnswerStates[questionId];
    if (
      !answerState ||
      evaluateGnssFieldObservationQuizAnswer(
        questionId,
        answerState.selectedOptionId,
      ) === null
    ) {
      return;
    }
    setQuizAnswerStates((current) => ({
      ...current,
      [questionId]: { ...answerState, isAnswered: true },
    }));
  };

  return (
    <div data-lesson-id={gnssFieldObservationLesson.id}>
      <section
        aria-labelledby="gnss-field-observation-course-title"
        className="gnss-card gnss-chapter-card"
        data-gnss-field-card="1"
        data-testid="gnss-field-intro-card"
        id="gnss-field-observation"
        tabIndex={-1}
      >
        <div className="gnss-card-index">カード 1 / 9</div>
        <div className="gnss-chapter-layout">
          <div className="gnss-chapter-copy">
            <span className="gnss-course-eyebrow">GNSS COURSE · PHASE 8</span>
            <h1 id="gnss-field-observation-course-title">GNSS測量</h1>
            <p className="gnss-chapter-number">第8章</p>
            <h2>{gnssFieldObservationCards[0].title}</h2>
            <p>{gnssFieldObservationLesson.description}</p>
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
            <p className="gnss-field-session-note">
              第8章の操作・回答は、この画面を開いている間だけ保持します。
            </p>
          </div>
        </div>

        <div className="gnss-chapter-metadata">
          <div className="gnss-goal-panel">
            <span>到達目標</span>
            <strong>{gnssFieldObservationLesson.learningGoal}</strong>
          </div>
          <div>
            <h3>主な用語</h3>
            <div className="gnss-term-list">
              {gnssFieldObservationLesson.terms.map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </div>
          <div className="gnss-caution-panel">
            <h3>この章で確認すること</h3>
            <ul>
              {gnssFieldObservationLesson.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gnss-field-opening-question">
          <span>第7章からの接続</span>
          <p>移動局P1で整数アンビギュイティが固定され、3次元基線から座標が表示されました。</p>
          <strong>FIXした。その座標をそのまま成果として採用してよい？</strong>
        </div>
        <blockquote className="gnss-important-message">
          FIXは成果採用の重要な条件ですが、FIXだけで成果採用を決めません。
        </blockquote>
        <ol
          aria-label="安定性、再現性、整合性から採用判断へ進む第8章の骨格"
          className="gnss-field-quality-flow"
        >
          {gnssFieldQualityPillars.map((pillar, index) => (
            <li data-quality-pillar-id={pillar.id} key={pillar.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{pillar.label}</strong>
              <p>{pillar.check}</p>
              {index < gnssFieldQualityPillars.length - 1 ? (
                <b aria-hidden="true">→</b>
              ) : null}
            </li>
          ))}
        </ol>
        <GnssFieldExternalLinks cardNumber={1} />
      </section>

      <section
        aria-labelledby="gnss-field-precheck-title"
        className="gnss-card"
        data-gnss-field-card="2"
        data-testid="gnss-field-precheck-card"
      >
        <GnssFieldCardHeading
          description="すぐにFIXを待つ前に、正しい点を正しい条件で観測しようとしているかを確認します。"
          index={2}
          label="静的チェック表"
          title={gnssFieldObservationCards[1].title}
          titleId="gnss-field-precheck-title"
        />
        <div className="gnss-field-check-grid">
          {gnssFieldPreObservationChecks.map((check) => (
            <article data-precheck-id={check.id} key={check.id}>
              <h3>{check.label}</h3>
              <ul>
                {check.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <blockquote className="gnss-important-message">
          観測を始める前に、正しい点・正しいアンテナ条件・正しい成果条件・観測できる環境を確認します。
        </blockquote>
        <p className="gnss-field-note">RTCMの更新状態やAgeは、観測を開始した後のカード3で確認します。</p>
        <GnssFieldExternalLinks cardNumber={2} />
      </section>

      <section
        aria-labelledby="gnss-field-monitoring-title"
        className="gnss-card"
        data-gnss-field-card="3"
        data-testid="gnss-field-monitoring-card"
      >
        <GnssFieldCardHeading
          description="FIXの文字だけでなく、補正情報・測位状態・観測条件・座標の動きを合わせて見ます。"
          index={3}
          label="静的状態表示"
          title={gnssFieldObservationCards[2].title}
          titleId="gnss-field-monitoring-title"
        />
        <div
          aria-label="RTK観測中の一般的な状態表示とDrogger実機表示例"
          className="gnss-field-status-panel"
          role="img"
        >
          <section>
            <span>一般的な確認</span>
            <strong>RTCM更新</strong>
            <strong>SINGLE / 3D → FLOAT → FIX</strong>
            <strong>観測条件と座標の動き</strong>
          </section>
          <section>
            <span>Drogger実機表示例</span>
            <strong>Status / RTCM3</strong>
            <strong>FixMode / Age</strong>
            <p>製品固有の表示名であり、一般原理そのものではありません。</p>
          </section>
        </div>
        <div className="gnss-field-monitor-grid">
          {gnssFieldMonitoringChecks.map((check) => (
            <article data-monitor-check-id={check.id} key={check.id}>
              <h3>{check.label}</h3>
              <p>{check.summary}</p>
              <small>{check.caution}</small>
            </article>
          ))}
        </div>
        <blockquote className="gnss-important-message">
          観測中はFIXだけを見ず、補正情報、測位状態、GNSS観測条件、座標の安定を合わせて確認します。
        </blockquote>
        <GnssFieldExternalLinks cardNumber={3} />
      </section>

      <section
        aria-labelledby="gnss-field-epochs-title"
        className="gnss-card"
        data-gnss-field-card="4"
        data-testid="gnss-field-epochs-card"
      >
        <GnssFieldCardHeading
          description="1つのFIX解の中で複数エポックを取得する正常例と、途中でFLOATへ戻る例を比べます。"
          index={4}
          label="静的タイムライン"
          title={gnssFieldObservationCards[3].title}
          titleId="gnss-field-epochs-title"
        />
        <div className="gnss-field-epoch-comparison">
          <article data-epoch-example="normal">
            <header>
              <span>正常例</span>
              <strong>FIXを維持して複数エポックを取得</strong>
            </header>
            <ol aria-label="10エポックすべてFIXの例">
              {gnssFieldNormalEpochs.map((epoch) => (
                <li data-state={epoch.state} key={epoch.id}>
                  <span>Epoch {epoch.number}</span>
                  <strong>{epoch.state}</strong>
                </li>
              ))}
            </ol>
            <p>複数エポックを使った観測結果と、観測中のばらつき等を確認して記録</p>
          </article>
          <article data-epoch-example="interrupted">
            <header>
              <span>途中で状態低下</span>
              <strong>Epoch 5でFLOAT</strong>
            </header>
            <ol aria-label="5エポック目にFLOATへ戻る例">
              {gnssFieldInterruptedEpochs.map((epoch) => (
                <li data-state={epoch.state} key={epoch.id}>
                  <span>Epoch {epoch.number}</span>
                  <strong>{epoch.state}</strong>
                </li>
              ))}
            </ol>
            <p>Drogger実機例：「FIX以外をエラーとする」ONなら観測エラー / 記録中止</p>
          </article>
        </div>
        <blockquote className="gnss-important-message">
          10エポックとは単に10秒待つことではなく、その間FIXを維持して有効な観測データを取得することです。
        </blockquote>
        <div className="gnss-field-regulation-note" data-testid="gnss-field-public-survey-note">
          <span>公共測量の適用例</span>
          <h3>{gnssFieldPublicSurveyExample.source}</h3>
          <ul>
            <li>{gnssFieldPublicSurveyExample.epochs}</li>
            <li>{gnssFieldPublicSurveyExample.interval}</li>
          </ul>
          <strong>{gnssFieldPublicSurveyExample.caution}</strong>
        </div>
        <p className="gnss-field-note">
          Waypoint結果の内部処理を単純な算術平均とは断定しません。また設定OFF時の各エポックの内部的な採用・除外も推測しません。
        </p>
        <GnssFieldExternalLinks cardNumber={4} />
      </section>

      <section
        aria-labelledby="gnss-field-refix-title"
        className="gnss-card"
        data-gnss-field-card="5"
        data-testid="gnss-field-refix-card"
      >
        <GnssFieldCardHeading
          description="測位状態をリセットし、独立して再FIXした2回目の観測と比較して再現性を確認します。"
          index={5}
          label="操作あり"
          title={gnssFieldObservationCards[4].title}
          titleId="gnss-field-refix-title"
        />
        <div className="gnss-field-stability-vs-repeatability">
          <article>
            <span>同じFIX解を継続</span>
            <strong>観測① → FIX継続 → 観測②</strong>
            <p>1つのFIX解の中の安定性。同じ整数値解を引き継ぐ可能性がある。</p>
          </article>
          <article>
            <span>独立して再FIX</span>
            <strong>観測① → リセット → 再FIX → 観測②</strong>
            <p>独立したFIX解の再現性を確認。</p>
          </article>
        </div>
        <div className="gnss-field-case-selector" aria-label="再観測の教材ケース">
          {gnssFieldRepeatCases.map((item) => (
            <button
              aria-pressed={repeatCase.id === item.id}
              data-testid={`gnss-field-repeat-case-${item.id}`}
              key={item.id}
              onClick={() => changeRepeatCase(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className="gnss-field-refix-lab"
          data-reobservation-stage-id={reobservationStage.id}
          data-repeat-case-id={repeatCase.id}
          data-testid="gnss-field-refix-result"
        >
          <header>
            <div>
              <span>{reobservationStage.label}</span>
              <strong>{reobservationStage.description}</strong>
            </div>
            <b>{reobservationStage.state}</b>
          </header>
          <div className="gnss-field-coordinate-results">
            <article>
              <span>観測①</span>
              <dl>
                <div><dt>X</dt><dd>{formatCoordinate(repeatCase.first.x)}</dd></div>
                <div><dt>Y</dt><dd>{formatCoordinate(repeatCase.first.y)}</dd></div>
                <div><dt>H</dt><dd>{formatCoordinate(repeatCase.first.h)}</dd></div>
              </dl>
            </article>
            {reobservationStage.id === "comparison" ? (
              <>
                <article>
                  <span>観測②（独立して再FIX）</span>
                  <dl>
                    <div><dt>X</dt><dd>{formatCoordinate(repeatCase.second.x)}</dd></div>
                    <div><dt>Y</dt><dd>{formatCoordinate(repeatCase.second.y)}</dd></div>
                    <div><dt>H</dt><dd>{formatCoordinate(repeatCase.second.h)}</dd></div>
                  </dl>
                </article>
                <article className="is-difference">
                  <span>2観測の差</span>
                  <dl>
                    <div><dt>ΔX</dt><dd>{formatMillimeters(repeatCase.differenceMillimeters.x)}</dd></div>
                    <div><dt>ΔY</dt><dd>{formatMillimeters(repeatCase.differenceMillimeters.y)}</dd></div>
                    <div><dt>ΔH</dt><dd>{formatMillimeters(repeatCase.differenceMillimeters.h)}</dd></div>
                  </dl>
                  <strong>{repeatCase.summary}</strong>
                </article>
              </>
            ) : null}
          </div>
        </div>
        <button
          className="gnss-field-primary-action"
          data-testid="gnss-field-advance-reobservation"
          onClick={advanceReobservation}
          type="button"
        >
          {reobservationStage.nextAction}
        </button>
        <p className="gnss-field-note">
          一般原理は「測位状態をリセットして独立して再FIX」です。GNSS Hot RestartはDroggerでの実機操作例であり、RTK一般の操作名ではありません。次点への移動だけを理由に必ず実施する操作でもありません。
        </p>
        <p className="gnss-field-note">このカードでは絶対的な採否基準を決めません。判断はカード7で行います。</p>
        <GnssFieldExternalLinks cardNumber={5} />
      </section>

      <section
        aria-labelledby="gnss-field-known-point-title"
        className="gnss-card"
        data-gnss-field-card="6"
        data-testid="gnss-field-known-point-card"
      >
        <GnssFieldCardHeading
          description="自分の観測同士の再現性と、既知成果という外部基準との整合性を分けます。"
          index={6}
          label="静的比較図"
          title={gnssFieldObservationCards[5].title}
          titleId="gnss-field-known-point-title"
        />
        <div className="gnss-field-repeatability-vs-consistency">
          <article><span>再観測</span><strong>同じ結果が再現するか</strong><b>再現性</b></article>
          <article><span>既知点確認</span><strong>正しい基準に合っているか</strong><b>整合性</b></article>
        </div>
        <div className="gnss-field-known-point-example">
          <header>
            <span>仮想既知点 K1</span>
            <strong>{gnssFieldKnownPointExample.note}</strong>
          </header>
          <div>
            <article>
              <span>既知成果</span>
              <p>X = {formatCoordinate(gnssFieldKnownPointExample.known.x)}</p>
              <p>Y = {formatCoordinate(gnssFieldKnownPointExample.known.y)}</p>
              <p>H = {formatCoordinate(gnssFieldKnownPointExample.known.h)}</p>
            </article>
            <article>
              <span>RTK観測</span>
              <p>X = {formatCoordinate(gnssFieldKnownPointExample.observed.x)}</p>
              <p>Y = {formatCoordinate(gnssFieldKnownPointExample.observed.y)}</p>
              <p>H = {formatCoordinate(gnssFieldKnownPointExample.observed.h)}</p>
            </article>
            <article>
              <span>差</span>
              <p>ΔX = {formatMillimeters(gnssFieldKnownPointExample.differenceMillimeters.x)}</p>
              <p>ΔY = {formatMillimeters(gnssFieldKnownPointExample.differenceMillimeters.y)}</p>
              <p>ΔH = {formatMillimeters(gnssFieldKnownPointExample.differenceMillimeters.h)}</p>
            </article>
          </div>
        </div>
        <div className="gnss-field-known-point-checks">
          <h3>既知点そのものも確認</h3>
          <ul>
            {gnssFieldKnownPointChecks.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <strong>「点が古いか」ではなく、現在使う成果がどの成果体系・時点に対応するかを見ます。</strong>
        </div>
        <div className="gnss-field-known-point-patterns">
          <article><strong>K1だけ合わない / K2・K3は合う</strong><p>K1自体やK1成果の条件も疑う</p></article>
          <article><strong>K1・K2・K3が似た方向・量でずれる</strong><p>基準局座標、座標時点、成果条件等の共通要因も疑う</p></article>
        </div>
        <p className="gnss-field-note">差だけから原因を一意に断定しません。元期・今期、地殻変動補正の詳細は第9章で扱います。</p>
        <GnssFieldExternalLinks cardNumber={6} />
      </section>

      <section
        aria-labelledby="gnss-field-decision-title"
        className="gnss-card"
        data-gnss-field-card="7"
        data-testid="gnss-field-decision-card"
      >
        <GnssFieldCardHeading
          description="6つのケースを安定性・再現性・整合性で読み、採用候補・再測・原因確認から判断します。"
          index={7}
          label="操作あり"
          title={gnssFieldObservationCards[6].title}
          titleId="gnss-field-decision-title"
        />
        <div className="gnss-field-decision-axis">
          {gnssFieldQualityPillars.slice(0, 3).map((pillar, index) => (
            <article key={pillar.id}><span>{index + 1}</span><strong>{pillar.label}</strong><p>{pillar.check}</p></article>
          ))}
        </div>
        <div className="gnss-field-case-selector is-six-cases" aria-label="採用判断ケース">
          {gnssFieldDecisionCases.map((item) => (
            <button
              aria-pressed={decisionCase.id === item.id}
              data-testid={`gnss-field-decision-case-${item.id}`}
              key={item.id}
              onClick={() => setDecisionCaseId(item.id)}
              type="button"
            >
              <span>{item.label}</span>{item.title}
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className="gnss-field-decision-lab"
          data-decision-case-id={decisionCase.id}
          data-testid="gnss-field-decision-result"
        >
          <header><span>{decisionCase.label}</span><h3>{decisionCase.title}</h3></header>
          <ul>{decisionCase.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <fieldset>
            <legend>この観測をどう判断しますか？</legend>
            {gnssFieldDecisionOptions.map((option) => (
              <label key={option.id}>
                <input
                  checked={selectedDecisionId === option.id}
                  name={`gnss-field-decision-${decisionCase.id}`}
                  onChange={() => selectDecision(option.id)}
                  type="radio"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <button disabled={!selectedDecisionId} onClick={submitDecision} type="button">判断を確認する</button>
          {decisionEvaluation ? (
            <div className={`gnss-field-decision-feedback ${decisionEvaluation.isCorrect ? "is-correct" : "is-incorrect"}`} role="status">
              <strong>{decisionEvaluation.isCorrect ? "適切な判断" : "もう一度確認"}</strong>
              <p>基本判断：{gnssFieldDecisionOptions.find((option) => option.id === decisionEvaluation.correctDecisionId)?.label}</p>
              <p>{decisionEvaluation.feedback}</p>
            </div>
          ) : null}
        </div>
        <div className="gnss-field-regulation-note">
          <span>現行準則の該当手法における例</span>
          <p>{gnssFieldPublicSurveyExample.reinitialization}</p>
          <p>{gnssFieldPublicSurveyExample.tolerance}</p>
          <strong>{gnssFieldPublicSurveyExample.caution}</strong>
        </div>
        <ol className="gnss-field-decision-flow" aria-label="観測の基本判断フロー">
          <li>必要な複数エポックを正常取得？ <b>NO → 再測 / 原因確認</b></li>
          <li>再初期化後も再現？ <b>NO → 再測 / 原因確認</b></li>
          <li>必要な既知点確認・成果条件はOK？ <b>NO → 原因確認</b></li>
          <li>すべて確認 <b>採用候補</b></li>
        </ol>
        <GnssFieldExternalLinks cardNumber={7} />
      </section>

      <section
        aria-labelledby="gnss-field-record-title"
        className="gnss-card"
        data-gnss-field-card="8"
        data-testid="gnss-field-record-card"
      >
        <GnssFieldCardHeading
          description="入力作業ではなく、1か月後にも採用根拠を説明できる記録の内容を確認します。"
          index={8}
          label="静的記録例"
          title={gnssFieldObservationCards[7].title}
          titleId="gnss-field-record-title"
        />
        <p className="gnss-field-card-question">P1を採用しました。1か月後に「なぜこの座標を採用したの？」と聞かれたら説明できますか？</p>
        <div className="gnss-field-record-grid">
          {gnssFieldRecordGroups.map((group) => (
            <article data-record-group-id={group.id} key={group.id}>
              <h3>{group.label}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="gnss-field-record-example">
          <header><span>完成した簡潔な記録例</span><strong>P1 RTK観測記録</strong></header>
          <dl>
            {gnssFieldRecordExample.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="gnss-field-machine-human-record">
          <article><span>機械が残しやすい</span><p>座標、時刻、Waypoint、セッション、設定値</p></article>
          <article><span>人が意味を残す</span><p>なぜ再測・採用したか、現場環境、既知点状態、異常時の判断理由</p></article>
        </div>
        <blockquote className="gnss-important-message">
          「2回観測」だけでなく、再初期化を実施して独立に再FIXした2回であることを残します。
        </blockquote>
        <p className="gnss-field-note">詳細な記録作成と不足項目の判断は実習編候補「RTK観測記録を作ってみる」へ分離し、本編には入力フォームを設けていません。</p>
        <GnssFieldExternalLinks cardNumber={8} />
      </section>

      <section
        aria-labelledby="gnss-field-summary-title"
        className="gnss-card"
        data-gnss-field-card="9"
        data-testid="gnss-field-summary-card"
      >
        <GnssFieldCardHeading
          description="カード1〜8を、P1へ移動してから次点へ進むまでの1本の現場作業にまとめます。"
          index={9}
          label="静的総まとめ"
          title={gnssFieldObservationCards[8].title}
          titleId="gnss-field-summary-title"
        />
        <div className="gnss-field-chapter-chain">
          <span>第5章<br /><strong>正しい基準局</strong></span><b>→</b>
          <span>第6章<br /><strong>正しい補正情報</strong></span><b>→</b>
          <span>第7章<br /><strong>正しいFIX</strong></span><b>→</b>
          <span>第8章<br /><strong>正しい点検</strong></span>
        </div>
        <ol className="gnss-field-workflow" aria-label="P1の現場観測から次点までの14工程">
          {gnssFieldWorkflowSteps.map((step) => (
            <li data-field-workflow-step-id={step.id} key={step.id}>
              <span>{String(step.number).padStart(2, "0")}</span><strong>{step.label}</strong>
            </li>
          ))}
        </ol>
        <div className="gnss-field-before-after">
          <article><span>学ぶ前</span><strong>P1 → FIX → 座標を記録 → 終了</strong></article>
          <article><span>学んだ後</span><strong>条件確認 → 安定性 → 再現性 → 整合性 → 採用判断 → 記録</strong></article>
        </div>
        <div className="gnss-field-return-points">
          <h3>異常時は原因に応じた工程へ戻る</h3>
          <ul>
            <li>途中でFLOAT → その観測を再測</li>
            <li>再FIX後に再現しない → 観測環境、補正情報、ミスFIX等を確認</li>
            <li>複数既知点が似た方向にずれる → 基準局座標、成果条件、座標時点等を確認</li>
          </ul>
        </div>
        <blockquote className="gnss-important-message">
          FIXはゴールではありません。安定性・再現性・整合性を確認し、根拠を持って成果候補とします。
        </blockquote>
        <div className="gnss-field-next-chapter">
          <span>第9章への問い</span>
          <strong>現場で残した観測データを、その後どう解析し、成果へつなげるのか？</strong>
          <p>RINEX、後処理解析、元期・今期、セミ・ダイナミック補正の詳細は第9章で扱います。</p>
        </div>
        <GnssFieldExternalLinks cardNumber={9} />
      </section>

      <div
        aria-labelledby="gnss-field-observation-quiz-title"
        className="gnss-quiz-section"
        data-testid="gnss-field-observation-quiz-panel"
      >
        <div className="gnss-quiz-heading">
          <span>第8章 確認問題</span>
          <h3 id="gnss-field-observation-quiz-title">現場観測と点検を9問で確認する</h3>
          <p>回答状態はReact状態だけに保持し、ページ再読込み後は初期化します。</p>
        </div>
        <div className="gnss-quiz-list">
          {gnssFieldObservationQuizQuestions.map((question, questionIndex) => {
            const answerState = quizAnswerStates[question.id];
            const evaluation = answerState?.isAnswered
              ? evaluateGnssFieldObservationQuizAnswer(
                  question.id,
                  answerState.selectedOptionId,
                )
              : null;
            const correctOptionLetter = getGnssFieldObservationQuizOptionLetter(
              question.id,
              question.correctOptionId,
            );
            const selectedOptionLetter = evaluation
              ? getGnssFieldObservationQuizOptionLetter(
                  question.id,
                  evaluation.selectedOptionId,
                )
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
                    <strong>{evaluation.isCorrect ? "正解" : "不正解"}</strong>
                    {correctOptionLetter ? <p className="gnss-quiz-correct-answer">正解：{correctOptionLetter}</p> : null}
                    {!evaluation.isCorrect && evaluation.selectedAnswerReason && selectedOptionLetter ? (
                      <section className="gnss-quiz-explanation gnss-quiz-selected-explanation">
                        <h5>{selectedOptionLetter}を選んだ場合の解説</h5>
                        <p>{evaluation.selectedAnswerReason}</p>
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
        <div className="gnss-field-quiz-summary">
          <strong>安定性</strong><span>1つのFIX解の中</span>
          <strong>再現性</strong><span>FIX解を作り直す</span>
          <strong>整合性</strong><span>既知成果という外部基準</span>
          <p>FIXはゴールではない。安定性・再現性・整合性を確認し、根拠を持って成果候補とする。</p>
        </div>
      </div>
    </div>
  );
}

export default GnssFieldObservationLesson;
