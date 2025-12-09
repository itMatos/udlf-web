import { ConfigTemplate } from "@/ts/types/generatorTypes";

export const BFSTreeSettingsConfig: ConfigTemplate = {
  section: 'BFSTreeSettingsConfig SETTINGS',
  parameters: [
    {
      key: 'PARAM_BFSTREE_L',
      value: '1000',
      description: 'Ranked Lists Size',
    },
    {
      key: 'PARAM_BFSTREE_K',
      value: '20',
      description: 'Neighborhood size',
    },
    {
      key: 'PARAM_BFSTREE_CORRELATION_METRIC',
      value: 'RBO',
      description: 'Measure used to compare ranked lists',
    },
  ],
};