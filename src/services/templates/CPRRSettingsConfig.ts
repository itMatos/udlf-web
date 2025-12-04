import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const CPRRSettingsConfig: ConfigTemplate = {
  section: 'CPRR SETTINGS',
  parameters: [
    {
      key: 'PARAM_NONE_L',
      value: '1400',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
    {
      key: 'PARAM_CPRR_L',
      value: '400',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
    {
      key: 'PARAM_CPRR_K',
      value: '20',
      description: 'Number of nearest neighbors',
    },
    {
      key: 'PARAM_CPRR_T',
      value: '2',
      description: 'Number of iterations',
    },
  ],
};
