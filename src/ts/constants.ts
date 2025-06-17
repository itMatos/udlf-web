import { CONTEXTRR_DEFAULT_PARAMS } from "./constants/contextrr";
import { EvaluationSettingsData, InputSettingsData, SummaryData } from "./interfaces";
import { OutputFormatType } from "./types";

export const STEPS = ["Select method", "Input settings", "Output settings", "Evaluation settings", "Summary"] as const;

export const METHODS = ["CONTEXTRR", "CPRR"] as const;

export const DEFAULT_INPUT_SETTINGS: InputSettingsData = {
  inputType: "AUTO",
  inputFile: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/ranked_lists/AIR.txt",
  inputFileList: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/lists_mpeg7.txt",
  inputFileClasses: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/classes_mpeg7.txt",
  datasetImagesPath: "/Users/italomatos/Documents/IC/UDLF/Datasets/mpeg7/original/",
};

export const DEFAULT_OUTPUT_SETTINGS: OutputFormatType = "RANKEDLIST_NUMERIC";

export const DEFAULT_EVALUATION_SETTINGS: EvaluationSettingsData = {
  useMap: false,
  useEfficiency: false,
  recall: [],
  precision: [],
};

export const DEFAULT_SETTING: SummaryData = {
  method: "ContextRR",
  methodSettings: CONTEXTRR_DEFAULT_PARAMS,
  inputSettings: DEFAULT_INPUT_SETTINGS,
  outputSettings: DEFAULT_OUTPUT_SETTINGS,
  evaluationSettings: DEFAULT_EVALUATION_SETTINGS,
};
