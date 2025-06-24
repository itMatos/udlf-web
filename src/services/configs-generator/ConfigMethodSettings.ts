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

export const generateContextRRSettings = (methodSettings: ContextRR) => {
  const ContextRRValueUpdates = {
    PARAM_NONE_L: "1400",
    PARAM_CONTEXTRR_L: methodSettings?.L,
    PARAM_CONTEXTRR_K: methodSettings?.K,
    PARAM_CONTEXTRR_T: methodSettings?.T,
    PARAM_CONTEXTRR_NBYK: methodSettings?.NBYK,
    PARAM_CONTEXTRR_OPTIMIZATIONS: methodSettings?.OPTIMIZATIONS ? "TRUE" : "FALSE",
  };
  return ContextRRValueUpdates;
};

export const generateCPRRSettings = (methodSettings: CPRR) => {
  const CPRRValueUpdates = {
    PARAM_NONE_L: "1400",
    PARAM_CPRR_L: methodSettings?.L,
    PARAM_CPRR_K: methodSettings?.K,
    PARAM_CPRR_T: methodSettings?.T,
  };
  return CPRRValueUpdates;
};

export const generateLHRRSettings = (methodSettings: LHRR) => {
  const LHRRValueUpdates = {
    PARAM_NONE_L: "1400",
    PARAM_LHRR_L: methodSettings?.L,
    PARAM_LHRR_K: methodSettings?.K,
    PARAM_LHRR_T: methodSettings?.T,
  };
  return LHRRValueUpdates;
};

export const generateBFSTreeSettings = (methodSettings: BFSTree) => {
  const BFSTreeValueUpdates = {
    PARAM_BFSTREE_L: methodSettings?.L,
    PARAM_BFSTREE_K: methodSettings?.K,
    PARAM_BFSTREE_CORRELATION_METRIC: methodSettings?.Correlation,
  };

  return BFSTreeValueUpdates;
};

export const generateCorGraphSettings = (methodSettings: CorGraph) => {
  const CorGraphValueUpdates = {
    PARAM_CORGRAPH_L: methodSettings?.L,
    PARAM_CORGRAPH_K: methodSettings?.K,
    PARAM_CORGRAPH_THRESHOLD_START: methodSettings?.ThresholdStart,
    PARAM_CORGRAPH_THRESHOLD_END: methodSettings?.ThresholdEnd,
    PARAM_CORGRAPH_THRESHOLD_INC: methodSettings?.ThresholdInc,
    PARAM_CORGRAPH_CORRELATION: methodSettings?.Correlation,
  };

  return CorGraphValueUpdates;
};

export const generateRDPACSettings = (methodSettings: RDPAC) => {
  const RDPACValueUpdates = {
    PARAM_RDPAC_L: methodSettings?.L,
    PARAM_RDPAC_P: methodSettings?.P,
    PARAM_RDPAC_PL: methodSettings?.PL,
    PARAM_RDPAC_K_START: methodSettings?.K_START,
    PARAM_RDPAC_K_END: methodSettings?.K_END,
    PARAM_RDPAC_K_INC: methodSettings?.K_INC,
    PARAM_RDPAC_L_MULT: methodSettings?.L_MULT,
  };

  return RDPACValueUpdates;
};

export const generateReckNNGraphSettings = (methodSettings: ReckNNGraph) => {
  const ReckNNGraphValueUpdates = {
    PARAM_RECKNNGRAPH_L: methodSettings?.L,
    PARAM_RECKNNGRAPH_K: methodSettings?.K,
    PARAM_RECKNNGRAPH_EPSILON: methodSettings?.EPSILON,
  };
  return ReckNNGraphValueUpdates;
};

export const generateRFESettings = (methodSettings: RFE): RFEConfigParams => {
  const RFEValueUpdates: RFEConfigParams = {
    PARAM_RFE_K: methodSettings?.K,
    PARAM_RFE_T: methodSettings?.L,
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

export const generateRKGraphSettings = (methodSettings: RKGraph): RKGraphConfigParams => {
  const RKGraphValueUpdates: RKGraphConfigParams = {
    PARAM_RKGRAPH_K: methodSettings?.K,
    PARAM_RKGRAPH_T: methodSettings?.T,
    PARAM_RKGRAPH_P: methodSettings?.P,
    PARAM_RKGRAPH_L: methodSettings?.L,
  };
  return RKGraphValueUpdates;
};

export const generateRLSimSettings = (methodSettings: RLSim) => {
  const RLSimValueUpdates: RLSimConfigParams = {
    PARAM_RLSIM_TOPK: methodSettings?.TOPK,
    PARAM_RLSIM_CK: methodSettings?.CK,
    PARAM_RLSIM_T: methodSettings?.T,
    PARAM_RLSIM_METRIC: methodSettings?.METRIC,
  };
  return RLSimValueUpdates;
};

export const generateRLRecomSettings = (methodSettings: RLRecom): RLRecomConfigParams => {
  const RLRecomValueUpdates: RLRecomConfigParams = {
    PARAM_RLRECOM_K: methodSettings?.K,
    PARAM_RLRECOM_L: methodSettings?.L,
    PARAM_RLRECOM_LAMBDA: methodSettings?.LAMBDA,
    PARAM_RLRECOM_EPSILON: methodSettings?.EPSILON,
  };
  return RLRecomValueUpdates;
};
