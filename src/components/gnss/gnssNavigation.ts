import {
  gnssBaselineFixLesson,
  gnssCorrectionDeliveryLesson,
  gnssCoordinateHeightLesson,
  gnssObservationsLesson,
  gnssOverviewLesson,
  gnssOwnBaseStationLesson,
  gnssPositioningMethodsLesson,
} from "./gnssCourse";
import type { GnssLessonMetadata } from "./types";

export interface GnssNavigationLessonItem {
  readonly kind: "lesson";
  readonly lesson: GnssLessonMetadata;
  readonly shortTitle: string;
}

export interface GnssNavigationUpcomingItem {
  readonly kind: "upcoming";
  readonly number: 8;
  readonly status: "準備中";
  readonly title: "現場観測と点検";
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
    | GnssNavigationUpcomingItem
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
        kind: "upcoming",
        number: 8,
        title: "現場観測と点検",
        status: "準備中",
      },
    ],
  },
  { id: "network-rtk", title: "ネットワークRTK", items: [], status: "準備中" },
  { id: "clas", title: "CLAS測量", items: [], status: "準備中" },
  { id: "static", title: "スタティック測量", items: [], status: "準備中" },
  { id: "post-processing", title: "後処理", items: [], status: "準備中" },
  { id: "advanced", title: "応用編", items: [], status: "準備中" },
];
