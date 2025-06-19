import { EvaluationSettingsData } from "../interfaces";
import { Method } from "../types/methods";
import { BFSTree } from "./bfstree";
import { ContextRR } from "./contextrr";
import { CPRR } from "./cprr";
import { InputSettingsData } from "./input";
import { LHRR } from "./lhrr";
import { OutputSettingsData } from "./output";

export interface SummaryData {
  method: string;
  methodSettings: CPRR | ContextRR;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}

export interface SummaryProps {
  selectedMethod: Method;
  methodSettings: ContextRR | CPRR | LHRR | BFSTree;
  inputSettings: InputSettingsData | null;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData | null;
  setConfigFileToExecute: (file: Blob) => void;
  setConfigFileName: (fileName: string) => void;
}
