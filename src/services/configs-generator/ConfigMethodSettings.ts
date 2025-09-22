import { BFSTree } from "@/ts/interfaces/methods/bfstree";
import { ContextRR } from "@/ts/interfaces/methods/contextrr";
import { CorGraph } from "@/ts/interfaces/methods/corgraph";
import { CPRR } from "@/ts/interfaces/methods/cprr";
import { LHRR } from "@/ts/interfaces/methods/lhrr";
import { RDPAC } from "@/ts/interfaces/methods/rdpac";
import { ReckNNGraph } from "@/ts/interfaces/methods/recknngraph";
import { RFE, RFEConfigParams } from "@/ts/interfaces/methods/rfe";
import { RKGraph, RKGraphConfigParams } from "@/ts/interfaces/methods/rkgraph";
import { RLRecom, RLRecomConfigParams } from "@/ts/interfaces/methods/rlrecom";
import { RLSim, RLSimConfigParams } from "@/ts/interfaces/methods/rlsim";

export const generateContextRRSettings = (methodSettings: ContextRR, datasetSize: number = 1400) => {
  const ContextRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_CONTEXTRR_L: methodSettings?.L,
    PARAM_CONTEXTRR_K: methodSettings?.K,
    PARAM_CONTEXTRR_T: methodSettings?.T,
    PARAM_CONTEXTRR_NBYK: methodSettings?.NBYK,
    PARAM_CONTEXTRR_OPTIMIZATIONS: methodSettings?.OPTIMIZATIONS ? "TRUE" : "FALSE",
  };
  return ContextRRValueUpdates;
};

export const generateCPRRSettings = (methodSettings: CPRR, datasetSize: number = 1400) => {
  const CPRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_CPRR_L: methodSettings?.L,
    PARAM_CPRR_K: methodSettings?.K,
    PARAM_CPRR_T: methodSettings?.T,
  };
  return CPRRValueUpdates;
};

export const generateLHRRSettings = (methodSettings: LHRR, datasetSize: number = 1400) => {
  const LHRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_LHRR_L: methodSettings?.L,
    PARAM_LHRR_K: methodSettings?.K,
    PARAM_LHRR_T: methodSettings?.T,
  };
  return LHRRValueUpdates;
};

export const generateBFSTreeSettings = (methodSettings: BFSTree, datasetSize: number = 1400) => {
  const BFSTreeValueUpdates = {
    PARAM_BFSTREE_L: methodSettings?.L || datasetSize.toString(),
    PARAM_BFSTREE_K: methodSettings?.K,
    PARAM_BFSTREE_CORRELATION_METRIC: methodSettings?.Correlation,
  };

  return BFSTreeValueUpdates;
};

export const generateCorGraphSettings = (methodSettings: CorGraph, datasetSize: number = 1400) => {
  const CorGraphValueUpdates = {
    PARAM_CORGRAPH_L: methodSettings?.L || datasetSize.toString(),
    PARAM_CORGRAPH_K: methodSettings?.K,
    PARAM_CORGRAPH_THRESHOLD_START: methodSettings?.ThresholdStart,
    PARAM_CORGRAPH_THRESHOLD_END: methodSettings?.ThresholdEnd,
    PARAM_CORGRAPH_THRESHOLD_INC: methodSettings?.ThresholdInc,
    PARAM_CORGRAPH_CORRELATION: methodSettings?.Correlation,
  };

  return CorGraphValueUpdates;
};

export const generateRDPACSettings = (methodSettings: RDPAC, datasetSize: number = 1400) => {
  const RDPACValueUpdates = {
    PARAM_RDPAC_L: methodSettings?.L || datasetSize,
    PARAM_RDPAC_P: methodSettings?.P,
    PARAM_RDPAC_PL: methodSettings?.PL,
    PARAM_RDPAC_K_START: methodSettings?.K_START,
    PARAM_RDPAC_K_END: methodSettings?.K_END,
    PARAM_RDPAC_K_INC: methodSettings?.K_INC,
    PARAM_RDPAC_L_MULT: methodSettings?.L_MULT,
  };

  return RDPACValueUpdates;
};

export const generateReckNNGraphSettings = (methodSettings: ReckNNGraph, datasetSize: number = 1400) => {
  const ReckNNGraphValueUpdates = {
    PARAM_RECKNNGRAPH_L: methodSettings?.L || datasetSize.toString(),
    PARAM_RECKNNGRAPH_K: methodSettings?.K,
    PARAM_RECKNNGRAPH_EPSILON: methodSettings?.EPSILON,
  };
  return ReckNNGraphValueUpdates;
};

export const generateRFESettings = (methodSettings: RFE, datasetSize: number = 1400): RFEConfigParams => {
  const RFEValueUpdates: RFEConfigParams = {
    PARAM_RFE_K: methodSettings?.K,
    PARAM_RFE_T: methodSettings?.L || datasetSize,
    PARAM_RFE_L: methodSettings?.T,
    PARAM_RFE_PA: methodSettings?.PA,
    PARAM_RFE_TH_CC: methodSettings?.TH_CC,
    PARAM_RFE_PERFORM_CCS: methodSettings?.PERFORM_CCS ? "TRUE" : "FALSE",
    PARAM_RFE_RERANK_BY_EMB: methodSettings?.RERANK_BY_EMB ? "TRUE" : "FALSE",
    PARAM_RFE_EXPORT_EMBEDDINGS: methodSettings?.EXPORT_EMBEDDINGS ? "TRUE" : "FALSE",
    PARAM_RFE_EMBEDDINGS_PATH: methodSettings?.EMBEDDINGS_PATH,
    PARAM_RFE_CCS_PATH: methodSettings?.CCS_PATH,
  };
  return RFEValueUpdates;
};

export const generateRKGraphSettings = (methodSettings: RKGraph, datasetSize: number = 1400): RKGraphConfigParams => {
  const RKGraphValueUpdates: RKGraphConfigParams = {
    PARAM_RKGRAPH_K: methodSettings?.K,
    PARAM_RKGRAPH_T: methodSettings?.T,
    PARAM_RKGRAPH_P: methodSettings?.P,
    PARAM_RKGRAPH_L: methodSettings?.L || datasetSize,
  };
  return RKGraphValueUpdates;
};

export const generateRLSimSettings = (methodSettings: RLSim, datasetSize: number = 1400) => {
  const RLSimValueUpdates: RLSimConfigParams = {
    PARAM_RLSIM_TOPK: methodSettings?.TOPK || datasetSize,
    PARAM_RLSIM_CK: methodSettings?.CK,
    PARAM_RLSIM_T: methodSettings?.T,
    PARAM_RLSIM_METRIC: methodSettings?.METRIC,
  };
  return RLSimValueUpdates;
};

export const generateRLRecomSettings = (methodSettings: RLRecom, datasetSize: number = 1400): RLRecomConfigParams => {
  const RLRecomValueUpdates: RLRecomConfigParams = {
    PARAM_RLRECOM_K: methodSettings?.K,
    PARAM_RLRECOM_L: methodSettings?.L || datasetSize,
    PARAM_RLRECOM_LAMBDA: methodSettings?.LAMBDA,
    PARAM_RLRECOM_EPSILON: methodSettings?.EPSILON,
  };
  return RLRecomValueUpdates;
};
