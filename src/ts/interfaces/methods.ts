import { Method } from "../types/methods";
import { ContextRR } from "./contextrr";
import { CPRR } from "./cprr";

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR;
  setSettings: (settings: ContextRR | CPRR) => void;
}
