export interface BFSTree {
  L: number;
  K: number;
  Correlation: string;
}
export interface BFSTreeSettingsProps {
  settings: BFSTree;
  setSettings: (settings: BFSTree) => void;
}
