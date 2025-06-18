import { EvaluationSettingsData } from "../interfaces";
import { ContextRR } from "./contextrr";
import { CPRR } from "./cprr";
import { InputSettingsData } from "./input";
import { OutputSettingsData } from "./output";

export interface SummaryData {
  method: string;
  methodSettings: CPRR | ContextRR;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}
