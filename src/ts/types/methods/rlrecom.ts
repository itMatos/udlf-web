export interface RLRecom {
  K: number;
  L: number;
  LAMBDA: number;
  EPSILON: number;
}

export interface RLRecomSettingsProps {
  settings: RLRecom;
  setSettings: (settings: RLRecom) => void;
}

export interface RLRecomConfigParams {
  PARAM_RLRECOM_K: number;
  PARAM_RLRECOM_L: number;
  PARAM_RLRECOM_LAMBDA: number;
  PARAM_RLRECOM_EPSILON: number;
}
