import { Method } from "../types/methods";
import { BFSTree } from "./methods/bfstree";
import { ContextRR } from "./methods/contextrr";
import { CorGraph } from "./methods/corgraph";
import { CPRR } from "./methods/cprr";
import { LHRR } from "./methods/lhrr";
import { RDPAC } from "./methods/rdpac";

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC;
  setSettings: (settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC) => void;
}
