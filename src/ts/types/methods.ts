import { BFSTree } from "../interfaces/methods/bfstree";
import { ContextRR } from "../interfaces/methods/contextrr";
import { CorGraph } from "../interfaces/methods/corgraph";
import { CPRR } from "../interfaces/methods/cprr";
import { LHRR } from "../interfaces/methods/lhrr";
import { RDPAC } from "../interfaces/methods/rdpac";
import { ReckNNGraph } from "../interfaces/methods/recknngraph";
import { RFE } from "../interfaces/methods/rfe";
import { RKGraph } from "../interfaces/methods/rkgraph";
import { RLRecom } from "../interfaces/methods/rlrecom";
import { RLSim } from "../interfaces/methods/rlsim";

export type Method =
  | "ContextRR"
  | "CPRR"
  | "LHRR"
  | "BFSTree"
  | "CorGraph"
  | "RDPAC"
  | "ReckNNGraph"
  | "RFE"
  | "RLSim"
  | "RKGraph"
  | "RLRecom";

export type MethodsSettings =
  | ContextRR
  | CPRR
  | LHRR
  | BFSTree
  | CorGraph
  | RDPAC
  | ReckNNGraph
  | RFE
  | RLSim
  | RKGraph
  | RLRecom;
