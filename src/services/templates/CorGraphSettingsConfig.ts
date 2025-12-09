import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const CorGraphSettingsConfig: ConfigTemplate = {
  section: 'CorGraphSettingsConfig SETTINGS',
  parameters: [
    {
      key: 'PARAM_CORGRAPH_L',
      value: '200',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
    {
      key: 'PARAM_CORGRAPH_K',
      value: '25',
      description: 'Number of nearest neighbors',
    },
    {
      key: 'PARAM_CORGRAPH_THRESHOLD_START',
      value: '0.35',
      description: 'Initial threshold value',
    },
    {
      key: 'PARAM_CORGRAPH_THRESHOLD_END',
      value: '1',
      description: 'Final threshold value',
    },
    {
      key: 'PARAM_CORGRAPH_THRESHOLD_INC',
      value: '0.005',
      description: 'Value to increment the threshold',
    },
    {
      key: 'PARAM_CORGRAPH_CORRELATION',
      value: 'PEARSON',
      description: 'Measure to compute the weights of the correlation graph',
    },
  ],
};