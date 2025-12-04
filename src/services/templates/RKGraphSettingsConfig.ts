
import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const RKGraphSettingsConfig: ConfigTemplate = {
  section: 'RKGraph SETTINGS',
  parameters: [
    {
      key: 'PARAM_RKGRAPH_K',
      value: '20',
      description: 'Number of nearest neighbors',
    },
    {
      key: 'PARAM_RKGRAPH_T',
      value: '1',
      description: 'Number of iterations',
    },
    {
      key: 'PARAM_RKGRAPH_P',
      value: '0.95',
      description: 'Value used to compute correlations (RBO)',
    },
    {
      key: 'PARAM_RKGRAPH_L',
      value: '700',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
  ],
};