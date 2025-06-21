export interface CPRR {
  L: number;
  K: number;
  T: number;
}

export interface CPRRSettingsProps {
  settings: CPRR;
  setSettings: (settings: CPRR) => void;
}
