import type { ConfigTemplate } from '@/ts/generatorTypes';

export const baseConfigTemplate: ConfigTemplate = {
  section: 'GENERAL CONFIGURATION',
  parameters: [
    {
      key: 'UDL_TASK',
      value: 'UDL',
      description: '(UDL|FUSION): Selection of task to be executed',
      options: ['UDL', 'FUSION'],
    },
    {
      key: 'UDL_METHOD',
      value: '',
      description: '(NONE|CPRR|RLRECOM|...): Selection of method to be executed',
      options: [
        'NONE',
        'CPRR',
        'RLRECOM',
        'RLSIM',
        'CONTEXTRR',
        'RECKNNGRAPH',
        'RKGRAPH',
        'CORGRAPH',
        'LHRR',
        'BFSTREE',
        'RDPAC',
        'RFE',
      ],
    },
  ],
};
