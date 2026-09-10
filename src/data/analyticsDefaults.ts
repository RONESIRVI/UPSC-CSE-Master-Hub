import {
  CutoffBenchmark,
  MockTestLog,
  WeakAreaItem,
  TimeVsWeightageGap,
  RevisionItem,
  GapAnalysisMetric,
} from "../types";

export const HISTORICAL_CUTOFFS: CutoffBenchmark[] = [
  {
    year: 2024,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 75.41,
    obcCutoff: 74.75,
    ewsCutoff: 68.02,
    scCutoff: 59.25,
    stCutoff: 47.82,
    prelimsGeneral: 75.41,
    mainsGeneral: 745,
    finalGeneral: 960,
    rank1Marks: 1099,
  },
  {
    year: 2023,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 75.41,
    obcCutoff: 74.75,
    ewsCutoff: 68.02,
    scCutoff: 59.25,
    stCutoff: 47.82,
    prelimsGeneral: 75.41,
    mainsGeneral: 741,
    finalGeneral: 953,
    rank1Marks: 1083,
  },
  {
    year: 2022,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 88.22,
    obcCutoff: 87.54,
    ewsCutoff: 82.83,
    scCutoff: 74.08,
    stCutoff: 69.35,
    prelimsGeneral: 88.22,
    mainsGeneral: 748,
    finalGeneral: 960,
    rank1Marks: 1094,
  },
  {
    year: 2021,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 87.54,
    obcCutoff: 84.85,
    ewsCutoff: 80.14,
    scCutoff: 75.41,
    stCutoff: 70.71,
    prelimsGeneral: 87.54,
    mainsGeneral: 745,
    finalGeneral: 953,
    rank1Marks: 1079,
  },
  {
    year: 2020,
    examStage: "Prelims (GS1 /200)",
    generalCutoff: 92.51,
    obcCutoff: 89.12,
    ewsCutoff: 77.55,
    scCutoff: 74.84,
    stCutoff: 68.71,
    prelimsGeneral: 92.51,
    mainsGeneral: 736,
    finalGeneral: 944,
    rank1Marks: 1054,
  },
];

export const DEFAULT_MOCKS: MockTestLog[] = [];
export const DEFAULT_MOCK_LOGS = DEFAULT_MOCKS;

export const DEFAULT_WEAK_AREAS: WeakAreaItem[] = [];

export const DEFAULT_GAP_ANALYSIS: TimeVsWeightageGap[] = [];
export const GAP_ANALYSIS_METRICS = DEFAULT_GAP_ANALYSIS;

export const DEFAULT_REVISION_QUEUE: RevisionItem[] = [];
