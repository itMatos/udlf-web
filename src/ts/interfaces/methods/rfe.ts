import { ConfigBoolean } from "@/ts/types/common";

export interface RFE {
  L: number;
  K: number;
  T: number;
  PA: number;
  TH_CC: number;
  PERFORM_CCS: boolean;
  RERANK_BY_EMB: boolean;
  EXPORT_EMBEDDINGS: boolean;
  EMBEDDINGS_PATH: string;
  CCS_PATH: string;
}

export interface RFESettingsProps {
  settings: RFE;
  setSettings: (settings: RFE) => void;
}

export interface RFEConfigParams {
  PARAM_RFE_K: number;
  PARAM_RFE_T: number;
  PARAM_RFE_L: number;
  PARAM_RFE_PA: number;
  PARAM_RFE_TH_CC: number;
  PARAM_RFE_PERFORM_CCS: ConfigBoolean;
  PARAM_RFE_RERANK_BY_EMB: ConfigBoolean;
  PARAM_RFE_EXPORT_EMBEDDINGS: ConfigBoolean;
  PARAM_RFE_EMBEDDINGS_PATH: string;
  PARAM_RFE_CCS_PATH: string;
}
