export type InputType = "AUTO" | "MATRIX" | "RANKEDLISTS";
export type InputFileField = { id: number; value: string };

export interface InputSettingsData {
  inputFiles: string[];
  inputType: InputType;
  inputFileList: string;
  inputFileClasses: string;
  datasetImagesPath: string;
}

export interface FileObject {
  id: number;
  value: string;
}