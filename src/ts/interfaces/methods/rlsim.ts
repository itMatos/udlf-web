import { RLSimMetric } from "@/ts/types/methods/rlsim";

export interface RLSim {
  TOPK: number;
  CK: number;
  T: number;
  METRIC: RLSimMetric;
}
export interface RLSimSettingsProps {
  settings: RLSim;
  setSettings: (settings: RLSim) => void;
}

export interface RLSimConfigParams {
  PARAM_RLSIM_TOPK: number;
  PARAM_RLSIM_CK: number;
  PARAM_RLSIM_T: number;
  PARAM_RLSIM_METRIC: RLSimMetric;
}
