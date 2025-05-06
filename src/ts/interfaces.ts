import { InputType, OutputFormatType } from "./types";

export interface StepProps {
  completed?: boolean;
}

export interface LabelProps {
  optional?: React.ReactNode;
}

export interface CPRRMethodSettings {
  L: number;
  K: number;
  T: number;
}

export interface ContextRRMethodSettings {
  L: number;
  K: number;
  T: number;
  NBYK: number;
  OPTIMIZATIONS: boolean;
}

export interface InputSettingsData {
  inputType: InputType;
  imageListFile: string;
  inputClassesFile: string;
  datasetImagesPath: string;
}

export const MAP_INPUT_SETTINGS = {
  // inputType: "INPUT_FILE_FORMAT",
  imageListFile: "INPUT_FILE_LIST ",
  inputClassesFile: "INPUT_FILE_CLASSES",
  datasetImagesPath: "INPUT_IMAGES_PATH",
};

export interface EvaluationSettingsData {
  useMap: boolean;
  recall: number[];
  precision: number[];
}

export interface SummaryData {
  method: string;
  methodSettings: CPRRMethodSettings | ContextRRMethodSettings;
  inputSettings: InputSettingsData;
  outputSettings: OutputFormatType;
  evaluationSettings: EvaluationSettingsData;
}
