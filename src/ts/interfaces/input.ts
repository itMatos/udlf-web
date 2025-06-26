import { InputType } from "../types/input";

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
