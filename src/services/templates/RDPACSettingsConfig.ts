import { ConfigTemplate } from "@/ts/types/generatorTypes";

export const RDPACSettingsConfig: ConfigTemplate = {
  section: "RDPAC SETTINGS",
  parameters: [
    {
      key: "PARAM_RDPAC_L",
      value: "400",
      description: "Ranked Lists Size",
    },
    {
      key: "PARAM_RDPAC_P",
      value: "0.60",
      description: "Geometric decay factor in the rank-based similarity, giving higher weight to top positions",
    },
    {
      key: "PARAM_RDPAC_PL",
      value: "0.99",
      description: "Decay factor used in the L-length normalization step before diffusion",
    },
    {
      key: "PARAM_RDPAC_L_MULT",
      value: "2",
      description: "Ranked Lists Size Multiplier (L*L_MULT must be smaller than dataset size)",
    },
    {
      key: "PARAM_RDPAC_K_START",
      value: "1",
      description: "Initial neighborhood size value",
    },
    {
      key: "PARAM_RDPAC_K_END",
      value: "15",
      description: "Final neighborhood size",
    },
    {
      key: "PARAM_RDPAC_K_INC",
      value: "1",
      description: "Value to increment neighborhood size in each iteration",
    },
  ],
};