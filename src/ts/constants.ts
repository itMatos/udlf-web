import {
  CPRRMethodSettings,
  ContextRRMethodSettings,
  EvaluationSettingsData,
  InputSettingsData,
  OutputSettingsData,
  SummaryData,
} from "./interfaces";

export const STEPS = [
  "Select method",
  "Input settings",
  "Output settings",
  "Evaluation settings",
  "Summary",
] as const;

export const METHODS = ["ContextRR"] as const;

export const CPRR_DEFAULT_SETTINGS: CPRRMethodSettings = {
  L: 400,
  K: 20,
  T: 2,
};

export const CONTEXTRR_DEFAULT_SETTINGS: ContextRRMethodSettings = {
  L: 25,
  K: 7,
  T: 5,
  NBYK: 1,
  OPTIMIZATIONS: false,
};

export const DEFAULT_INPUT_SETTINGS: InputSettingsData = {
  inputType: "MATRIX",
  imageListFile: "",
  inputClassesFile: "",
  datasetImagesPath: "",
};

export const DEFAULT_OUTPUT_SETTINGS: OutputSettingsData = {
  outputFormat: "RANKEDLIST_NUMERIC",
};

export const DEFAULT_EVALUATION_SETTINGS: EvaluationSettingsData = {
  useMap: false,
  recall: [],
  precision: [],
};

export const DEFAULT_SETTING: SummaryData = {
  method: "ContextRR",
  methodSettings: CONTEXTRR_DEFAULT_SETTINGS,
  inputSettings: DEFAULT_INPUT_SETTINGS,
  outputSettings: DEFAULT_OUTPUT_SETTINGS,
  evaluationSettings: DEFAULT_EVALUATION_SETTINGS,
};

export const OUTPUT_TYPES = [
  { value: "RANKEDLIST_NUMERIC", label: "Ranked List (numeric)" },
  { value: "RANKEDLIST_STRING", label: "Ranked List (string)" },
  { value: "SIMILARITY_MATRIX", label: "Similarity Matrix" },
  { value: "DISTANCE_MATRIX", label: "Distance Matrix" },
] as const;
