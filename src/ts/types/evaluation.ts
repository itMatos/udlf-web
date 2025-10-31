export interface EvaluationSettingsData {
  useMap: boolean;
  useEfficiency: boolean;
  recall: number[];
  precision: number[];
}

export interface EvaluationSettingsProps {
  onSettingsChange: (settings: EvaluationSettingsData | null) => void;
  settings: EvaluationSettingsData | null;
}
