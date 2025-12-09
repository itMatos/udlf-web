// # LHRR #
// PARAM_LHRR_K = 18         #(TUint): Neighborhood size
// PARAM_LHRR_L = 1000       #(TUint): Ranked Lists Size
// PARAM_LHRR_T = 2          #(TUint): Number of iterations

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