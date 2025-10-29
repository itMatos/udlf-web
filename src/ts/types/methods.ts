import { UDLF_METHODS } from "../constants/common";
import { BFSTREE_DEFAULT_PARAMS } from "../constants/methods/bfstree";
import { CONTEXTRR_DEFAULT_PARAMS } from "../constants/methods/contextrr";
import { CORGRAPH_DEFAULT_PARAMS } from "../constants/methods/corgraph";
import { CPRR_DEFAULT_PARAMS } from "../constants/methods/cprr";
import { LHRR_DEFAULT_PARAMS } from "../constants/methods/lhrr";
import { RDPAC_DEFAULT_PARAMS } from "../constants/methods/rdpac";
import { RECKNNGRAPH_DEFAULT_PARAMS } from "../constants/methods/recknngraph";
import { RFE_DEFAULT_PARAMS } from "../constants/methods/rfe";
import { RKGRAPH_DEFAULT_PARAMS } from "../constants/methods/rkgraph";
import { RLRECOM_DEFAULT_PARAMS } from "../constants/methods/rkrecom";
import { RLSIM_DEFAULT_PARAMS } from "../constants/methods/rlsim";
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

export const METHOD_CONFIGS = {
  [UDLF_METHODS.CONTEXTRR]: CONTEXTRR_DEFAULT_PARAMS,
  [UDLF_METHODS.CPRR]: CPRR_DEFAULT_PARAMS,
  [UDLF_METHODS.LHRR]: LHRR_DEFAULT_PARAMS,
  [UDLF_METHODS.BFSTREE]: BFSTREE_DEFAULT_PARAMS,
  [UDLF_METHODS.CORGRAPH]: CORGRAPH_DEFAULT_PARAMS,
  [UDLF_METHODS.RDPAC]: RDPAC_DEFAULT_PARAMS,
  [UDLF_METHODS.RECKNNGRAPH]: RECKNNGRAPH_DEFAULT_PARAMS,
  [UDLF_METHODS.RFE]: RFE_DEFAULT_PARAMS,
  [UDLF_METHODS.RLSIM]: RLSIM_DEFAULT_PARAMS,
  [UDLF_METHODS.RKGRAPH]: RKGRAPH_DEFAULT_PARAMS,
  [UDLF_METHODS.RLRECOM]: RLRECOM_DEFAULT_PARAMS,
} as const;