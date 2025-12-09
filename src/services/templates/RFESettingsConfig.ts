import { ConfigTemplate } from "@/ts/types/generatorTypes";

export const RFESettingsConfig: ConfigTemplate = {
  section: "RFE SETTINGS",
  parameters: [
    {
      key: "PARAM_RFE_K",
      value: "20",
      description: "Neighborhood size",
    },
    {
      key: "PARAM_RFE_T",
      value: "2",
      description: "Number of iterations",
    },
    {
      key: "PARAM_RFE_L",
      value: "400",
      description: "Ranked Lists Size",
    },
    {
      key: "PARAM_RFE_PA",
      value: "0.1",
      description: "Alpha constant for the normalization (first step)",
    },
    {
      key: "PARAM_RFE_TH_CC",
      value: "0",
      description: "Threshold for the connected components",
    },
    {
      key: "PARAM_RFE_RERANK_BY_EMB",
      value: "FALSE",
      description: "Enables the step of reranking by embeddings",
    },
    {
      key: "PARAM_RFE_EXPORT_EMBEDDINGS",
      value: "FALSE",
      description: "Decides if embeddings will be exported",
    },
    {
      key: "PARAM_RFE_PERFORM_CCS",
      value: "TRUE",
      description: "Decides if connected components will be exported",
    },
    {
      key: "PARAM_RFE_EMBEDDINGS_PATH",
      value: "embeddings.txt",
      description: "Path to export the text file with the embeddings",
    },
    {
      key: "PARAM_RFE_CCS_PATH",
      value: "ccs.txt",
      description: "Path to export the connected components",
    },
  ],
};