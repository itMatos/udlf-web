export type CorGraphCorrelation = 'Pearson' | 'RBO';

export interface CorGraph {
  L: number;
  K: number;
  Correlation: CorGraphCorrelation;
  ThresholdStart: number;
  ThresholdEnd: number;
  ThresholdInc: number;
}

export interface CorGraphSettingsProps {
  settings: CorGraph;
  setSettings: (settings: CorGraph) => void;
}
