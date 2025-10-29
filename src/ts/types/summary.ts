import type { EvaluationSettingsData } from '../interfaces';
import type { InputSettingsData } from './input';
import type { Method, MethodsSettings } from './methods';
import type { OutputSettingsData } from './output';

export interface SummaryData {
  method: string;
  methodSettings: MethodsSettings;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}

export interface SummaryProps {
  selectedMethod: Method;
  methodSettings: MethodsSettings;
  inputSettings: InputSettingsData | null;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData | null;
  setConfigFileToExecute: (file: Blob) => void;
  setConfigFileName: (fileName: string) => void;
}
