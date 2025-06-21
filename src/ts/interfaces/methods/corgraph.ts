import { CorGraphCorrelation } from "../../types/methods/corgraph";

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
