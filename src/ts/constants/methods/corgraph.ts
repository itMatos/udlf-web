import { CorGraph } from "../../interfaces/methods/corgraph";

export const CORGRAPH_DEFAULT_PARAMS: CorGraph = {
  L: 200,
  K: 5,
  Correlation: "Pearson",
  ThresholdStart: 0.35,
  ThresholdEnd: 1,
  ThresholdInc: 0.005,
} as const;
