import type { ConfigTemplate } from '@/ts/types/generatorTypes';

export const ContextRRSettingsConfig: ConfigTemplate = {
  section: 'ContextRRSettingsConfig SETTINGS',
  parameters: [
    {
      key: 'PARAM_NONE_L',
      value: '1400',
      description: '#(TUint): Size of ranked lists (must be lesser than SIZE_DATASET)',
    },
    {
      key: 'PARAM_CONTEXTRR_L',
      value: '25',
      description: '#(TUint): Size of context images',
    },
    {
      key: 'PARAM_CONTEXTRR_K',
      value: '7',
      description: '#(TUint): Number of nearest neighbors',
    },
    {
      key: 'PARAM_CONTEXTRR_T',
      value: '5',
      description: '#(TUint): Number of iterations',
    },
    {
      key: 'PARAM_CONTEXTRR_NBYK',
      value: '1',
      description: '#(TUint)',
    },
    {
      key: 'PARAM_CONTEXTRR_OPTIMIZATIONS',
      value: 'TRUE',
      description: '#(TBool): Performance optimization',
    },
  ],
};
