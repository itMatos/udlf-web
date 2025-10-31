import type { RLSim, RLSimMetric } from '@/ts/types/methods/rlsim';

export const RLSIM_DEFAULT_PARAMS: RLSim = {
  TOPK: 15,
  CK: 700,
  T: 3,
  METRIC: 'INTERSECTION',
} as const;

export const RLSIM_METRICS = {
  INTERSECTION: 'INTERSECTION' as RLSimMetric,
  RBO: 'RBO' as RLSimMetric,
  KENDALL_TAU: 'KENDALL_TAU' as RLSimMetric,
  SPEARMAN: 'SPEARMAN' as RLSimMetric,
  GOODMAN: 'GOODMAN' as RLSimMetric,
  JACCARD: 'JACCARD' as RLSimMetric,
  JACCARD_K: 'JACCARD_K' as RLSimMetric,
  KENDALL_TAU_W: 'KENDALL_TAU_W' as RLSimMetric,
} as const;
