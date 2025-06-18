import { InputSettingsData } from "./interfaces/input";

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
