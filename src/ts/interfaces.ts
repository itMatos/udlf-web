import { ContextRRParams } from "./methods/contextrr";
import { InputType, OutputFormatType } from "./common";

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

export interface CPRRMethodSettings {
  L: number;
  K: number;
  T: number;
}

export interface InputSettingsData {
  inputFile: string;
  inputType: InputType;
  inputFileList: string;
  inputFileClasses: string;
  datasetImagesPath: string;
}

export interface OutputSettingsData {
  enabledOutput: boolean;
  outputFileName: string;
  outputFileFormat: OutputFormatType;
}

export const MAP_INPUT_SETTINGS = {
  // inputType: "INPUT_FILE_FORMAT",
  imageListFile: "INPUT_FILE_LIST ",
  inputClassesFile: "INPUT_FILE_CLASSES",
  datasetImagesPath: "INPUT_IMAGES_PATH",
};

export interface EvaluationSettingsData {
  useMap: boolean;
  useEfficiency: boolean;
  recall: number[];
  precision: number[];
}

export interface SummaryData {
  method: string;
  methodSettings: CPRRMethodSettings | ContextRRParams;
  inputSettings: InputSettingsData;
  outputSettings: OutputSettingsData;
  evaluationSettings: EvaluationSettingsData;
}
