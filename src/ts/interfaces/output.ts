import { OutputFormatType } from "../types/output";

export interface OutputSettingsData {
  enabledOutput: boolean;
  outputFileName: string;
  outputFileFormat: OutputFormatType;
}

export interface OutputSettingsProps {
  onSettingsChange: (settings: OutputSettingsData) => void;
  settings: OutputSettingsData;
}