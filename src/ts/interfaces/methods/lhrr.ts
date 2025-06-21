export interface LHRR {
  L: number;
  K: number;
  T: number;
}

export interface LHRRSettingsProps {
  settings: LHRR;
  setSettings: (settings: LHRR) => void;
}
