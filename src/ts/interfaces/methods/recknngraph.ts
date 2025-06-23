export interface ReckNNGraph {
  L: number;
  K: number;
  EPSILON: number;
}

export interface ReckNNGraphSettingsProps {
  settings: ReckNNGraph;
  setSettings: (settings: ReckNNGraph) => void;
}
