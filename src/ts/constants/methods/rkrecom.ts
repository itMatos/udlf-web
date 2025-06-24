import { RLRecom } from "@/ts/interfaces/methods/rlrecom";

export const RLRECOM_DEFAULT_PARAMS: RLRecom = {
  K: 8,
  L: 400,
  LAMBDA: 2,
  EPSILON: 0.0125,
} as const;
