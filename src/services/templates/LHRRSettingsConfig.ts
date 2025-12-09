import { ConfigTemplate } from "@/ts/types/generatorTypes";

export const LHRRSettingsConfig: ConfigTemplate = {
  section: "LHRR SETTINGS",
  parameters: [
    {
      key: "PARAM_LHRR_L",
      value: "1000",
      description: "Size of ranked lists (must be lesser than size of dataset)",
    },
    {
      key: "PARAM_LHRR_K",
      value: "18",
      description: "Number of nearest neighbors",
    },
    {
      key: "PARAM_LHRR_T",
      value: "2",
      description: "Number of iterations",
    },
  ],
};