import {
  CPRRMethodSettings,
  ContextRRMethodSettings,
  EvaluationSettingsData,
  InputSettingsData,
  SummaryData,
} from "./interfaces";
import { OutputFormatType } from "./types";

export const STEPS = [
  "Select method",
  "Input settings",
  "Output settings",
  "Evaluation settings",
  "Summary",
] as const;

export const METHODS = ["CONTEXTRR", "CPRR"] as const;

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
  inputType: "AUTO",
  inputFileList: "./../Datasets/mpeg7/lists_mpeg7.txt",
  inputFileClasses: "./../Datasets/mpeg7/classes_mpeg7.txt",
  datasetImagesPath:
    "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/original/",
};

export const DEFAULT_OUTPUT_SETTINGS: OutputFormatType = "RANKEDLIST_NUMERIC";

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
