import {
  CPRRMethodSettings,
  ContextRRMethodSettings,
} from "@/interfaces/interfaces";

export const STEPS = [
  "Select method",
  "Input settings",
  "Output settings",
  "Evaluation settings",
  "Summary",
] as const;

export const METHODS = ["ContextRR"] as const;

export const CPRR_DEFAULT_SETTINGS: CPRRMethodSettings = {
  L: 400,
  K: 20,
  T: 2,
};

export const CONTEXTRR_DEFAULT_SETTINGS: ContextRRMethodSettings = {
  L: 25,
  K: 7,
  T: 5,
  NBYK: 1,
  OPTIMIZATIONS: false,
};
