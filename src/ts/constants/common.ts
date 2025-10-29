import type { Method } from '../types/methods';

export const STEPS = ['Select method', 'Input settings', 'Output settings', 'Evaluation settings', 'Summary'] as const;

export const UDLF_METHODS = {
  CONTEXTRR: 'ContextRR' as Method,
  CPRR: 'CPRR' as Method,
  LHRR: 'LHRR' as Method,
  BFSTREE: 'BFSTree' as Method,
  CORGRAPH: 'CorGraph' as Method,
  RDPAC: 'RDPAC' as Method,
  RECKNNGRAPH: 'ReckNNGraph' as Method,
  RFE: 'RFE' as Method,
  RLSIM: 'RLSim' as Method,
  RKGRAPH: 'RKGraph' as Method,
  RLRECOM: 'RLRecom' as Method,
} as const;

export const IMAGES_PER_PAGE_DEFAULT = 50 as const;

export enum StepIndex {
  METHOD_SETTINGS = 0,
  INPUT_SETTINGS = 1,
  OUTPUT_SETTINGS = 2,
  EVALUATION_SETTINGS = 3,
  SUMMARY = 4,
  DONE = 5,
};