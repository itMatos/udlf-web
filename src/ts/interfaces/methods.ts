import { Method } from "../types/methods";
import { BFSTree } from "./bfstree";
import { ContextRR } from "./contextrr";
import { CPRR } from "./cprr";
import { LHRR } from "./lhrr";

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR | LHRR | BFSTree;
  setSettings: (settings: ContextRR | CPRR | LHRR | BFSTree) => void;
}
