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
