import { SummaryData } from "../interfaces/summary";
import { CONTEXTRR_DEFAULT_PARAMS } from "./methods/contextrr";
import { DEFAULT_EVALUATION_SETTINGS } from "./evaluation";
import { DEFAULT_INPUT_SETTINGS } from "./input";
import { DEFAULT_OUTPUT_SETTINGS } from "./output";

export const DEFAULT_SETTING: SummaryData = {
  method: "ContextRR",
  methodSettings: CONTEXTRR_DEFAULT_PARAMS,
  inputSettings: DEFAULT_INPUT_SETTINGS,
  outputSettings: DEFAULT_OUTPUT_SETTINGS,
  evaluationSettings: DEFAULT_EVALUATION_SETTINGS,
};
