import { useState } from "react";
import {
  evaluateGnssNetworkRtkClasQuizAnswer,
  getGnssNetworkRtkClasQuizOptionLetter,
  gnssClasDeliveryComparison,
  gnssClasDeliveryFlow,
  gnssFieldChoiceComparison,
  gnssNetworkReferenceStations,
  gnssNetworkRtkClasCards,
  gnssNetworkRtkClasExternalLinks,
  gnssNetworkRtkClasMethodComparison,
  gnssNetworkRtkClasQuizQuestions,
  gnssPppRtkCorrections,
  gnssReferenceChangeCases,
  gnssResultComparisonChecks,
  gnssVrsBaselineComparison,
  gnssVrsClasComparison,
  gnssVrsPositionFlow,
} from "../data/gnssNetworkRtkClas";
import { gnssNetworkRtkClasLesson } from "../gnssCourse";

interface Props {
  readonly completedLessonCount: number;
  readonly totalLessonCount: number;
}

interface QuizAnswerState {
  readonly selectedOptionId: string;
  readonly isAnswered: boolean;
}

type QuizAnswerStateMap = Readonly<Record<string, QuizAnswerState | undefined>>;

function CardHeading({ description, index, label, titleId }: {
  readonly description: string;
  readonly index: number;
  readonly label: string;
  readonly titleId: string;
}) {
  return (
    <header className="gnss-card-heading">
      <div><span>カード {index} / 9 · {label}</span><h2 id={titleId}>{gnssNetworkRtkClasCards[index - 1]?.title ?? "教材カード"}</h2></div>
      <p>{description}</p>
    </header>
  );
}

function ComparisonTable({ headers, rows }: {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
}) {
  return (
    <div className="gnss-network-table-wrap">
      <table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function StaticFlow({ ariaLabel, items }: { readonly ariaLabel: string; readonly items: readonly string[] }) {
  return (
    <ol aria-label={ariaLabel} className="gnss-network-static-flow">
      {items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < items.length - 1 ? <b aria-hidden="true">↓</b> : null}</li>)}
    </ol>
  );
}

function ExternalLinks({ cardNumber }: { readonly cardNumber: number }) {
  const links = gnssNetworkRtkClasExternalLinks.filter((link) => link.cardIds.some((cardId) => cardId === cardNumber));
  if (links.length === 0) return null;
  return (
    <aside aria-label={`カード${cardNumber}の公式補助リンク`} className="gnss-network-external-links">
      <span>公式資料で確認</span><ul>{links.map((link) => <li data-source={link.source} key={link.id}><a href={link.href} rel="noreferrer" target="_blank">{link.label}<span aria-hidden="true">↗</span></a></li>)}</ul>
    </aside>
  );
}

function GnssNetworkRtkClasLesson({ completedLessonCount, totalLessonCount }: Props) {
  const [quizAnswerStates, setQuizAnswerStates] = useState<QuizAnswerStateMap>({});
  const progressPercent = totalLessonCount > 0 ? Math.round((completedLessonCount / totalLessonCount) * 100) : 0;
  const selectQuizOption = (questionId: string, selectedOptionId: string) => setQuizAnswerStates((current) => ({ ...current, [questionId]: { selectedOptionId, isAnswered: false } }));
  const submitQuizAnswer = (questionId: string) => setQuizAnswerStates((current) => {
    const answer = current[questionId];
    return answer ? { ...current, [questionId]: { ...answer, isAnswered: true } } : current;
  });

  return (
    <div className="gnss-lesson gnss-network-rtk-clas-lesson" data-lesson-id={gnssNetworkRtkClasLesson.id}>
      <section aria-labelledby="gnss-network-course-title" className="gnss-card gnss-chapter-card" data-gnss-network-card="1" data-testid="gnss-network-comparison-card" id="gnss-network-rtk-clas" tabIndex={-1}>
        <div className="gnss-card-index">カード 1 / 9 · 静的比較</div>
        <div className="gnss-chapter-layout">
          <div className="gnss-chapter-copy"><span className="gnss-course-eyebrow">GNSS COURSE · PHASE 10</span><h1 id="gnss-network-course-title">GNSS測量</h1><p className="gnss-chapter-number">第10章</p><h2>{gnssNetworkRtkClasCards[0].title}</h2><p>{gnssNetworkRtkClasLesson.description}</p></div>
          <div className="gnss-chapter-progress"><div><span>利用可能な章の進捗</span><strong>{completedLessonCount} / {totalLessonCount} 章</strong></div><div aria-label={`GNSS教材の進捗 ${progressPercent}%`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progressPercent} className="gnss-progress-track" role="progressbar"><span style={{ width: `${progressPercent}%` }} /></div></div>
        </div>
        <div className="gnss-chapter-metadata"><div className="gnss-goal-panel"><span>到達目標</span><strong>{gnssNetworkRtkClasLesson.learningGoal}</strong></div><div><h3>主な用語</h3><div className="gnss-term-list">{gnssNetworkRtkClasLesson.terms.map((term) => <span key={term}>{term}</span>)}</div></div><div className="gnss-caution-panel"><h3>この章で確認すること</h3><ul>{gnssNetworkRtkClasLesson.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul></div></div>
        <div className="gnss-network-opening-question"><span>第5章～第9章からの接続</span><strong>現場に自前基準局を置かない方式は、何を使って高精度測位している？</strong></div>
        <ComparisonTable headers={["項目", "自前RTK", "ネットワーク型RTK", "CLAS"]} rows={gnssNetworkRtkClasMethodComparison} />
        <blockquote className="gnss-important-message">ネットワーク型RTKとCLASは、現場基準局が不要という共通点はあっても、基準情報の作り方・届け方・測位の仕組みは同じではありません。</blockquote>
        <div className="gnss-network-not-equal"><strong>CLAS</strong><b>≠</b><strong>ネットワーク型RTKのインターネットなし版</strong></div>
      </section>

      <section aria-labelledby="gnss-network-reference-title" className="gnss-card" data-gnss-network-card="2" data-testid="gnss-network-reference-card">
        <CardHeading description="電子基準点などの基準局網と配信サービス、移動局P1の観測がどうつながるかを確認します。" index={2} label="静的模式図" titleId="gnss-network-reference-title" />
        <div aria-label="基準局網から配信サービスを経て移動局P1へRTK用情報が届く模式図" className="gnss-network-reference-diagram"><div>{gnssNetworkReferenceStations.map((station) => <span key={station}>● {station}</span>)}</div><b>↓ 基準局網を利用</b><strong>配信サービス側</strong><b>↓ RTK用情報</b><strong>移動局P1自身のGNSS観測</strong></div>
        <blockquote className="gnss-important-message">ネットワーク型RTKでは、電子基準点などの基準局網と配信サービスを利用し、移動局P1自身のGNSS観測と組み合わせます。</blockquote>
        <div className="gnss-network-not-equal"><strong>ネットワーク型RTK</strong><b>≠</b><strong>遠くの電子基準点1局を、そのまま借りるだけ</strong></div><ExternalLinks cardNumber={2} />
      </section>

      <section aria-labelledby="gnss-network-vrs-title" className="gnss-card" data-gnss-network-card="3" data-testid="gnss-network-vrs-card">
        <CardHeading description="周辺の実在基準局の観測から、移動局付近の仮想基準点に対応する情報を生成します。" index={3} label="静的模式図" titleId="gnss-network-vrs-title" />
        <StaticFlow ariaLabel="基準局網からP1付近のVRS情報を生成する流れ" items={["電子基準点等の基準局網", "配信側で処理", "P1付近の仮想基準点データ", "仮想基準点V → 基線 → P1"]} />
        <blockquote className="gnss-important-message">VRSでは、物理的な基準局を新設せず、周辺の基準局観測から仮想基準点に対応するRTK用情報を生成します。</blockquote>
        <ul className="gnss-network-misconceptions"><li>VRSは最寄りの電子基準点の別名ではありません。</li><li>仮想点に物理的なGNSS受信機はありません。</li><li>仮想でも、適当な架空データではありません。</li></ul><ExternalLinks cardNumber={3} />
      </section>

      <section aria-labelledby="gnss-network-position-title" className="gnss-card" data-gnss-network-card="4" data-testid="gnss-network-position-card">
        <CardHeading description="VRS等では、移動局側から配信側へ概略位置を送る場合があります。" index={4} label="静的位置送信フロー" titleId="gnss-network-position-title" />
        <StaticFlow ariaLabel="P1から配信側へ概略位置を送りVRS情報を受ける流れ" items={gnssVrsPositionFlow} />
        <div className="gnss-network-not-equal"><strong>配信側へ送る概略位置</strong><b>≠</b><strong>RTKで最終的に得たいcm級の成果座標</strong></div>
        <p className="gnss-network-caution">Ntripで常にGGAが必須という意味ではありません。VRS等、位置情報を必要とするサービスで使われます。指定位置・緯度経度・楕円体高・Waypointを送る実機操作は実習編の対象です。</p><ExternalLinks cardNumber={4} />
      </section>

      <section aria-labelledby="gnss-network-baseline-title" className="gnss-card" data-gnss-network-card="5" data-testid="gnss-network-baseline-card">
        <CardHeading description="国土地理院資料のVRS直接観測方式を代表例に、自前RTKとの相対位置の考え方を比べます。" index={5} label="静的基線比較" titleId="gnss-network-baseline-title" />
        <div className="gnss-network-baseline-pair"><article><span>自前RTK</span><strong>実在基準局A → P1</strong></article><article><span>VRS直接観測</span><strong>仮想基準点V → P1</strong></article></div>
        <ComparisonTable headers={["項目", "自前RTK", "VRS直接観測"]} rows={gnssVrsBaselineComparison} />
        <blockquote className="gnss-important-message">VRS直接観測では、仮想基準点の座標・観測情報と移動局自身のGNSS観測を用いて、VRSからP1への相対位置を求めます。</blockquote>
        <p className="gnss-network-caution">これはVRS直接観測方式の代表例です。サーバ側で解析する構成等もあり、すべてのVRSが必ず移動局側で同じ基線解析をするとは一般化しません。</p><ExternalLinks cardNumber={5} />
      </section>

      <section aria-labelledby="gnss-network-change-title" className="gnss-card" data-gnss-network-card="6" data-testid="gnss-network-change-card">
        <CardHeading description="測点移動や再接続後も基準側が同じ場合と、変わる場合を並べて確認します。" index={6} label="静的2ケース" titleId="gnss-network-change-title" />
        <div className="gnss-network-case-grid">{gnssReferenceChangeCases.map((item) => <article data-case-id={item.id} key={item.id}><h3>{item.label}</h3><StaticFlow ariaLabel={item.label} items={item.steps} /></article>)}</div>
        <blockquote className="gnss-important-message">P1とP2の基準側は必ず同じとも、測点ごとに必ず変わるとも限りません。サービス方式、再接続、送信位置等を確認します。</blockquote>
        <div className="gnss-network-switch-grid"><article><span>自動基準局選択サービス</span><strong>実在基準局A → 実在基準局B</strong></article><article><span>VRS</span><strong>仮想点VRS-A → 仮想点VRS-B</strong></article></div>
        <p className="gnss-network-caution">Droggerには、指定位置の送信で基準局選択を固定する考え方や「セッション全点で同一基準局座標が必要」のチェックがあります。具体操作と出力解析は実習編へ残します。</p><ExternalLinks cardNumber={6} />
      </section>

      <section aria-labelledby="gnss-network-clas-title" className="gnss-card" data-gnss-network-card="7" data-testid="gnss-network-clas-card">
        <CardHeading description="CLAS補強情報が生成され、みちびきL6Dから対応受信機へ届く経路を確認します。" index={7} label="静的補強フロー" titleId="gnss-network-clas-title" />
        <StaticFlow ariaLabel="CLAS補強情報がみちびきL6DからP1へ届く流れ" items={gnssClasDeliveryFlow} />
        <ComparisonTable headers={["項目", "ネットワーク型RTK", "CLAS"]} rows={gnssClasDeliveryComparison} />
        <div className="gnss-network-not-equal-grid"><div><strong>CLAS</strong><b>≠</b><strong>みちびき1機だけで位置を測る</strong></div><div><strong>L6D</strong><b>≠</b><strong>P1までの距離を測るための測距信号</strong></div></div>
        <p className="gnss-network-caution">携帯圏外ではCLASが有力な選択肢になりますが、上空視界、L6D受信、衛星配置、マルチパス、搬送波位相の連続性等も必要です。</p><ExternalLinks cardNumber={7} />
      </section>

      <section aria-labelledby="gnss-network-ppp-title" className="gnss-card" data-gnss-network-card="8" data-testid="gnss-network-ppp-card">
        <CardHeading description="特定1基準局との基線を中心にするVRSと、精密な補強情報を使うCLASのPPP-RTKを比べます。" index={8} label="静的方式比較" titleId="gnss-network-ppp-title" />
        <blockquote className="gnss-important-message">CLASのPPP-RTKでは、衛星軌道・時計・バイアス・大気等の補強情報と、P1自身のGNSS観測を利用して高精度位置を求めます。</blockquote>
        <div className="gnss-network-correction-grid">{gnssPppRtkCorrections.map((item) => <span key={item}>{item}</span>)}</div>
        <ComparisonTable headers={["項目", "VRS", "CLAS"]} rows={gnssVrsClasComparison} />
        <div className="gnss-network-not-equal-grid"><div><strong>PPP</strong><b>≠</b><strong>スマートフォン等の通常の単独測位</strong></div><div><strong>同じFIX表示</strong><b>≠</b><strong>同じ測位方式</strong></div></div><ExternalLinks cardNumber={8} />
      </section>

      <section aria-labelledby="gnss-network-choice-title" className="gnss-card" data-gnss-network-card="9" data-testid="gnss-network-choice-card">
        <CardHeading description="通信・受信環境に応じた方式選択と、成果比較前にそろえる条件を一本につなぎます。" index={9} label="静的総まとめ" titleId="gnss-network-choice-title" />
        <ComparisonTable headers={["確認項目", "ネットワーク型RTK", "CLAS"]} rows={gnssFieldChoiceComparison} />
        <div className="gnss-network-field-cases"><article><span>携帯通信が安定</span><strong>ネットワーク型RTKを利用しやすい</strong><p>接続先・基準局・VRS等を確認します。</p></article><article><span>携帯圏外・上空視界良好</span><strong>CLASが有力な選択肢</strong><p>L6Dを含むGNSS受信条件を確認します。</p></article></div>
        <aside className="gnss-network-result-check"><h3>成果比較前チェック</h3><ul>{gnssResultComparisonChecks.map((check) => <li key={check}>□ {check}</li>)}</ul></aside>
        <blockquote className="gnss-important-message">ネットワーク型RTKの座標時点は基準側座標・サービス仕様を確認し、CLASとの比較では元期 / 今期、高さ基準、基準 / 補強情報までそろえます。</blockquote>
        <p className="gnss-network-caution">すべてのネットワーク型RTKが必ず元期とは一般化しません。高さ比較時には、使用している成果体系・補正情報・高さ基準を確認します。</p><ExternalLinks cardNumber={9} />
      </section>

      <div aria-labelledby="gnss-network-quiz-title" className="gnss-quiz-section" data-testid="gnss-network-quiz-panel">
        <div className="gnss-quiz-heading"><span>第10章 確認問題</span><h3 id="gnss-network-quiz-title">ネットワーク型RTKとCLASを9問で確認する</h3><p>回答状態はReact状態だけに保持し、ページ再読込み後は初期化します。</p></div>
        <div className="gnss-quiz-list">{gnssNetworkRtkClasQuizQuestions.map((question, questionIndex) => {
          const answerState = quizAnswerStates[question.id];
          const evaluation = answerState?.isAnswered ? evaluateGnssNetworkRtkClasQuizAnswer(question.id, answerState.selectedOptionId) : null;
          const correctLetter = getGnssNetworkRtkClasQuizOptionLetter(question.id, question.correctOptionId);
          const selectedLetter = evaluation ? getGnssNetworkRtkClasQuizOptionLetter(question.id, evaluation.selectedOptionId) : null;
          return (
            <article className="gnss-quiz-question" data-testid={`gnss-quiz-question-${question.id}`} id={`gnss-quiz-card-${question.id}`} key={question.id}>
              <header><span>{question.questionType}</span><strong>問{questionIndex + 1}</strong></header><h4>{question.prompt}</h4>
              <fieldset><legend>回答を1つ選んでください</legend>{question.options.map((option, optionIndex) => {
                const optionDomId = `gnss-quiz-option-${question.id}-${option.id}`;
                return <label htmlFor={optionDomId} key={option.id}><input checked={answerState?.selectedOptionId === option.id} id={optionDomId} name={`gnss-quiz-answer-${question.id}`} onChange={() => selectQuizOption(question.id, option.id)} type="radio" /><span className="gnss-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option.label}</span></label>;
              })}</fieldset>
              <button disabled={!answerState?.selectedOptionId} onClick={() => submitQuizAnswer(question.id)} type="button">回答を確認する</button>
              {evaluation ? <div className={`gnss-quiz-feedback ${evaluation.isCorrect ? "is-correct" : "is-incorrect"}`} role="status"><strong>{evaluation.isCorrect ? "正解です" : "不正解です"}</strong>{correctLetter ? <p className="gnss-quiz-correct-answer">正解：{correctLetter}</p> : null}{!evaluation.isCorrect && evaluation.selectedAnswerReason && selectedLetter ? <section className="gnss-quiz-explanation gnss-quiz-selected-explanation"><h5>{selectedLetter}を選んだ場合の解説</h5><p>{evaluation.selectedAnswerReason}</p></section> : null}<section className="gnss-quiz-explanation"><h5>解説</h5><p>{evaluation.correctReason}</p></section><p className="gnss-quiz-field-check"><b>現場で確認：</b>{evaluation.fieldCheck}</p></div> : null}
            </article>
          );
        })}</div>
      </div>
    </div>
  );
}

export default GnssNetworkRtkClasLesson;
