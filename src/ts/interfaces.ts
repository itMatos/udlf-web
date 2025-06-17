import { ContextRR } from "./interfaces/contextrr";
import { CPRR } from "./interfaces/cprr";
import { InputSettingsData } from "./interfaces/input";
import { OutputSettingsData } from "./interfaces/output";

export interface StepProps {
  completed?: boolean;
}

export interface LabelProps {
  optional?: React.ReactNode;
}

export interface InputSettingsProps {
  onSettingsChange: (settings: InputSettingsData | null) => void;
  settings: InputSettingsData | null;
}

export interface EvaluationSettingsData {
  useMap: boolean;
  useEfficiency: boolean;
  recall: number[];
  precision: number[];
}

export interface SummaryData {
  method: string;
  methodSettings: CPRR | ContextRR;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}
