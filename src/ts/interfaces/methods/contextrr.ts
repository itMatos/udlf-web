export interface ContextRR {
  L: number;
  K: number;
  T: number;
  NBYK: number;
  OPTIMIZATIONS: boolean;
}

export interface ContextRRSettingsProps {
  settings: ContextRR;
  setSettings: (settings: ContextRR) => void;
}
