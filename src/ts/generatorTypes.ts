export interface BaseConfig {
  task: string;
  // TODO adicionar os metodos suportados
  method: string;
}

export interface InputConfig {
  sizeDataset: number;
  inputFileFormat: string;
  inputRkFormat: string;
  matrixToRkSortind: string;
  inputFile: string;
  inputFileList: string;
  inputFileClasses: string;
  inputImagesPath: string;
}

export interface OutputConfig {
  outputFile: boolean;
  outputFileFormat: string;
  outputMatrixType: string;
  outputRkFormat: string;
  outputFilePath: string;
  outputHtmlRkPerFile: number;
  outputHtmlRkSize: number;
  outputHtmlRkColors: boolean;
  outputHtmlRkBeforeAfter: boolean;
  outputLogFilePath: string;
}

export interface EvaluationConfig {
  useMap: boolean;
  recall: number[];
  precision: number[];
}

export interface ConfigTemplate {
  section: string;
  description?: string;
  parameters: ConfigParameter[];
}

export interface ConfigParameter {
  key: string;
  value: string | number | boolean;
  description?: string;
  options?: string[];
  type?: string;
}
