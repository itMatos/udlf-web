import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const RLRecomSettingsConfig: ConfigTemplate = {
  section: 'RLRecomSettingsConfig SETTINGS',
  parameters: [
    {
      key: 'PARAM_RLRECOM_L',
      value: '400',
      description: 'Size of ranked lists (must be lesser than size of dataset)',
    },
    {
      key: 'PARAM_RLRECOM_K',
      value: '8',
      description: 'Number of nearest neighbors',
    },
    {
      key: 'PARAM_RLRECOM_LAMBDA',
      value: '2',
      description: 'Value used to update the distances (perform recommendations)',
    },
    {
      key: 'PARAM_RLRECOM_EPSILON',
      value: '0.0125',
      description: 'Value used in the convergence criteria',
    },
  ],
};