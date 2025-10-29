export type OutputFileEnabled = 'TRUE' | 'FALSE';

export type OutputFormatType = 'RANKEDLIST_NUMERIC' | 'RANKEDLIST_STRING' | 'SIMILARITY_MATRIX' | 'DISTANCE_MATRIX';

export interface OutputSettingsData {
  enabledOutput: boolean;
  outputFileName: string;
  outputFileFormat: OutputFormatType;
}

export interface OutputSettingsProps {
  onSettingsChange: (settings: OutputSettingsData) => void;
  settings: OutputSettingsData;
}
