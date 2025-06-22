export interface ReckNNGraph {
  L: number;
  K: number;
  EPSILON: number;
}

export interface ReckNNGraphParams {
  settings: ReckNNGraph;
  setSettings: (settings: ReckNNGraph) => void;
}
