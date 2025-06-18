import { Method } from "../types/methods";

export const STEPS = ["Select method", "Input settings", "Output settings", "Evaluation settings", "Summary"] as const;

export const UDLF_METHODS = {
  CONTEXTRR: "ContextRR" as Method,
  CPRR: "CPRR" as Method,
  LHRR: "LHRR" as Method,
} as const;
