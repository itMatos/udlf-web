import { UDLF_METHODS } from '../constants/common';
import { BFSTREE_DEFAULT_PARAMS } from '../constants/methods-default-params/bfstree';
import { CONTEXTRR_DEFAULT_PARAMS } from '../constants/methods-default-params/contextrr';
import { CORGRAPH_DEFAULT_PARAMS } from '../constants/methods-default-params/corgraph';
import { CPRR_DEFAULT_PARAMS } from '../constants/methods-default-params/cprr';
import { LHRR_DEFAULT_PARAMS } from '../constants/methods-default-params/lhrr';
import { RDPAC_DEFAULT_PARAMS } from '../constants/methods-default-params/rdpac';
import { RECKNNGRAPH_DEFAULT_PARAMS } from '../constants/methods-default-params/recknngraph';
import { RFE_DEFAULT_PARAMS } from '../constants/methods-default-params/rfe';
import { RKGRAPH_DEFAULT_PARAMS } from '../constants/methods-default-params/rkgraph';
import { RLRECOM_DEFAULT_PARAMS } from '../constants/methods-default-params/rkrecom';
import { RLSIM_DEFAULT_PARAMS } from '../constants/methods-default-params/rlsim';
import type { BFSTree } from './methods/bfstree';
import type { ContextRR } from './methods/contextrr';
import type { CorGraph } from './methods/corgraph';
import type { CPRR } from './methods/cprr';
import type { LHRR } from './methods/lhrr';
import type { RDPAC } from './methods/rdpac';
import type { ReckNNGraph } from './methods/recknngraph';
import type { RFE } from './methods/rfe';
import type { RKGraph } from './methods/rkgraph';
import type { RLRecom } from './methods/rlrecom';
import type { RLSim } from './methods/rlsim';

export type Method =
  | 'ContextRR'
  | 'CPRR'
  | 'LHRR'
  | 'BFSTree'
  | 'CorGraph'
  | 'RDPAC'
  | 'ReckNNGraph'
  | 'RFE'
  | 'RLSim'
  | 'RKGraph'
  | 'RLRecom';

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

export interface MethodSettingsProps {
  selectedMethod: Method;
  setSelectedMethod: (method: Method) => void;
  settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim;
  setSettings: (settings: ContextRR | CPRR | LHRR | BFSTree | CorGraph | RDPAC | ReckNNGraph | RFE | RLSim) => void;
}
