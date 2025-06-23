import { Method } from "../types/methods";
import { BFSTree } from "./methods/bfstree";
import { ContextRR } from "./methods/contextrr";
import { CorGraph } from "./methods/corgraph";
import { CPRR } from "./methods/cprr";
import { LHRR } from "./methods/lhrr";
import { RDPAC } from "./methods/rdpac";
import { ReckNNGraph } from "./methods/recknngraph";
import { RFE } from "./methods/rfe";
import { RLSim } from "./methods/rlsim";

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim;
  setSettings: (settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim) => void;
}
