import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const RLSimSettingsConfig: ConfigTemplate = {
  section: 'RLSim SETTINGS',
  parameters: [
    {
      key: 'PARAM_RLSIM_TOPK',
      value: '15',
      description: 'Size of tradicional kNN set',
    },
    {
      key: 'PARAM_RLSIM_CK',
      value: '700',
      description: 'Size of first and second segment',
    },
    {
      key: 'PARAM_RLSIM_T',
      value: '3',
      description: 'Number of iterations',
    },
    {
      key: 'PARAM_RLSIM_METRIC',
      value: 'INTERSECTION',
      description: 'Measure used to compare ranked lists (options: INTERSECTION, RBO, KENDALL_TAU, SPEARMAN, GOODMAN, JACCARD, JACCARD_K, KENDALL_TAU_W)',
    },
  ],
};