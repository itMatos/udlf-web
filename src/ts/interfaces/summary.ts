import { EvaluationSettingsData } from "../interfaces";
import { Method } from "../types/methods";
import { BFSTree } from "./methods/bfstree";
import { ContextRR } from "./methods/contextrr";
import { CPRR } from "./methods/cprr";
import { InputSettingsData } from "./input";
import { LHRR } from "./methods/lhrr";
import { OutputSettingsData } from "./output";
import { CorGraph } from "./methods/corgraph";
import { RDPAC } from "./methods/rdpac";

export interface SummaryData {
  method: string;
  methodSettings: CPRR | ContextRR;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}

export interface SummaryProps {
  selectedMethod: Method;
  methodSettings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC;
  inputSettings: InputSettingsData | null;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData | null;
  setConfigFileToExecute: (file: Blob) => void;
  setConfigFileName: (fileName: string) => void;
}
