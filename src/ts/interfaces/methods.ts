import { Method } from "../types/methods";
import { BFSTree } from "./methods/bfstree";
import { ContextRR } from "./methods/contextrr";
import { CorGraph } from "./methods/corgraph";
import { CPRR } from "./methods/cprr";
import { LHRR } from "./methods/lhrr";

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph;
  setSettings: (settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph) => void;
}
