import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const ReckNNGraphSettingsConfig: ConfigTemplate = {
  section: 'ReckNNGraph SETTINGS',
  parameters: [
    {
      key: 'PARAM_RECKNNGRAPH_L',
      value: '200',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
    {
      key: 'PARAM_RECKNNGRAPH_K',
      value: '15',
      description: 'Number of nearest neighbors',
    },
    {
      key: 'PARAM_RECKNNGRAPH_EPSILON',
      value: '0.0125',
      description: 'Value used in the convergence criteria',
    },
  ],
};