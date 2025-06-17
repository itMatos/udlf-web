import { ConfigTemplate } from "@/ts/generatorTypes";

export const CPRRSettingsConfig: ConfigTemplate = {
  section: "CPRR SETTINGS",
  parameters: [
    {
      key: "PARAM_NONE_L",
      value: "1400",
      description: "#(TUint): Size of ranked lists (must be lesser than SIZE_DATASET)",
    },
    {
      key: "PARAM_CPRR_L",
      value: "400",
      description: "#(TUint): Size of ranked lists (must be lesser than SIZE_DATASET)",
    },
    {
      key: "PARAM_CPRR_K",
      value: "20",
      description: "#(TUint): Number of nearest neighbors",
    },
    {
      key: "PARAM_CPRR_T",
      value: "2",
      description: "#(TUint): Number of iterations",
    },
  ],
};
