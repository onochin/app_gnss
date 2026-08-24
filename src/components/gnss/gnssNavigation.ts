import {
  gnssBaselineFixLesson,
  gnssCorrectionDeliveryLesson,
  gnssCoordinateHeightLesson,
  gnssFieldObservationLesson,
  gnssObservationsLesson,
  gnssOverviewLesson,
  gnssOwnBaseStationLesson,
  gnssPostprocessingLesson,
  gnssPositioningMethodsLesson,
} from "./gnssCourse";
import type { GnssLessonMetadata } from "./types";

export interface GnssNavigationLessonItem {
  readonly kind: "lesson";
  readonly lesson: GnssLessonMetadata;
  readonly shortTitle: string;
}

export interface GnssLessonCategory {
  readonly id:
    | "basics"
    | "base-station-rtk"
    | "network-rtk"
    | "clas"
    | "static"
    | "post-processing"
    | "advanced";
  readonly items: readonly (
    | GnssNavigationLessonItem
  )[];
  readonly status?: "準備中";
  readonly title: string;
}

export const gnssLessonCategories: readonly GnssLessonCategory[] = [
  {
    id: "basics",
    title: "基礎編",
    items: [
      { kind: "lesson", lesson: gnssOverviewLesson, shortTitle: "全体像" },
      {
        kind: "lesson",
        lesson: gnssObservationsLesson,
        shortTitle: "GNSSは何を観測しているのか",
      },
      {
        kind: "lesson",
        lesson: gnssCoordinateHeightLesson,
        shortTitle: "座標と高さ",
      },
      {
        kind: "lesson",
        lesson: gnssPositioningMethodsLesson,
        shortTitle: "測位方式を比較する",
      },
    ],
  },
  {
    id: "base-station-rtk",
    title: "基準局RTK",
    items: [
      {
        kind: "lesson",
        lesson: gnssOwnBaseStationLesson,
        shortTitle: "基準局をつくる",
      },
      {
        kind: "lesson",
        lesson: gnssCorrectionDeliveryLesson,
        shortTitle: "補正情報を届ける",
      },
      {
        kind: "lesson",
        lesson: gnssBaselineFixLesson,
        shortTitle: "基線解析とFIX",
      },
      {
        kind: "lesson",
        lesson: gnssFieldObservationLesson,
        shortTitle: "現場観測と点検",
      },
    ],
  },
  { id: "network-rtk", title: "ネットワークRTK", items: [], status: "準備中" },
  { id: "clas", title: "CLAS測量", items: [], status: "準備中" },
  { id: "static", title: "スタティック測量", items: [], status: "準備中" },
  {
    id: "post-processing",
    title: "後処理",
    items: [
      {
        kind: "lesson",
        lesson: gnssPostprocessingLesson,
        shortTitle: "観測データと後処理解析",
      },
    ],
  },
  { id: "advanced", title: "応用編", items: [], status: "準備中" },
];
