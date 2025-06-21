import { BFSTreeCorrelation } from "@/ts/types/methods/bfstree";

export interface BFSTree {
  L: number;
  K: number;
  Correlation: BFSTreeCorrelation;
}
export interface BFSTreeSettingsProps {
  settings: BFSTree;
  setSettings: (settings: BFSTree) => void;
}
