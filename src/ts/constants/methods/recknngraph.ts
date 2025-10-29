import type { ReckNNGraph } from '@/ts/types/methods/recknngraph';

export const RECKNNGRAPH_DEFAULT_PARAMS: ReckNNGraph = {
  L: 200,
  K: 15,
  EPSILON: 0.0125,
} as const;
