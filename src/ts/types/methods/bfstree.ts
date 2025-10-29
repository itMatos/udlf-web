export type BFSTreeCorrelation = 'RBO';

export interface BFSTree {
  L: number;
  K: number;
  Correlation: BFSTreeCorrelation;
}
export interface BFSTreeSettingsProps {
  settings: BFSTree;
  setSettings: (settings: BFSTree) => void;
}
