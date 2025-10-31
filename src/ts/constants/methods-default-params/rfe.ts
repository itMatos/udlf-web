import type { RFE } from '@/ts/types/methods/rfe';

export const RFE_DEFAULT_PARAMS: RFE = {
  L: 1400,
  K: 20,
  T: 10,
  PA: 0.5,
  TH_CC: 0.5,
  PERFORM_CCS: true,
  RERANK_BY_EMB: false,
  EXPORT_EMBEDDINGS: false,
  EMBEDDINGS_PATH: '',
  CCS_PATH: '',
} as const;
