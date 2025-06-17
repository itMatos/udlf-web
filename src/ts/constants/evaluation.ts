import { EvaluationSettingsData } from "../interfaces";

export const DEFAULT_EVALUATION_SETTINGS: EvaluationSettingsData = {
  useMap: false,
  useEfficiency: false,
  recall: [],
  precision: [],
} as const;
