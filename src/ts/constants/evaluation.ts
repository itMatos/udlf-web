import type { EvaluationSettingsData } from '../types/evaluation';

export const DEFAULT_EVALUATION_SETTINGS: EvaluationSettingsData = {
  useMap: false,
  useEfficiency: false,
  recall: [],
  precision: [],
} as const;
