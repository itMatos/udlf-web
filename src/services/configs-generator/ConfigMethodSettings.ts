import type { BFSTree } from '@/ts/types/methods/bfstree';
import type { ContextRR } from '@/ts/types/methods/contextrr';
import type { CorGraph } from '@/ts/types/methods/corgraph';
import type { CPRR } from '@/ts/types/methods/cprr';
import type { LHRR } from '@/ts/types/methods/lhrr';
import type { RDPAC } from '@/ts/types/methods/rdpac';
import type { ReckNNGraph } from '@/ts/types/methods/recknngraph';
import type { RFE, RFEConfigParams } from '@/ts/types/methods/rfe';
import type { RKGraph, RKGraphConfigParams } from '@/ts/types/methods/rkgraph';
import type { RLRecom, RLRecomConfigParams } from '@/ts/types/methods/rlrecom';
import type { RLSim, RLSimConfigParams } from '@/ts/types/methods/rlsim';

/**
 * Result of L parameter validation
 */
export interface LValidationResult {
  value: number;
  wasAdjusted: boolean;
  originalValue?: number;
  datasetSize: number;
}

/**
 * Result of method settings generation with validation info
 */
export interface MethodSettingsResult {
  settings: Record<string, any>;
  lAdjustments: LValidationResult[];
}

/**
 * Validates and adjusts the L parameter to ensure it doesn't exceed the dataset size.
 * If L is greater than datasetSize, it will be set to datasetSize.
 * @param lValue - The original L value from method settings
 * @param datasetSize - The actual dataset size
 * @returns The validation result with the adjusted L value and adjustment info
 */
export const validateAndAdjustL = (lValue: number | undefined, datasetSize: number): LValidationResult => {
  if (!lValue) {
    return {
      value: datasetSize,
      wasAdjusted: false,
      datasetSize,
    };
  }

  if (lValue > datasetSize) {
    console.warn(
      `Parameter L (${lValue}) is greater than dataset size (${datasetSize}). Adjusting L to ${datasetSize}.`
    );
    return {
      value: datasetSize,
      wasAdjusted: true,
      originalValue: lValue,
      datasetSize,
    };
  }

  return {
    value: lValue,
    wasAdjusted: false,
    datasetSize,
  };
};

export const generateContextRRSettings = (methodSettings: ContextRR, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const ContextRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_CONTEXTRR_L: validatedL.value,
    PARAM_CONTEXTRR_K: methodSettings?.K,
    PARAM_CONTEXTRR_T: methodSettings?.T,
    PARAM_CONTEXTRR_NBYK: methodSettings?.NBYK,
    PARAM_CONTEXTRR_OPTIMIZATIONS: methodSettings?.OPTIMIZATIONS ? 'TRUE' : 'FALSE',
  };
  return {
    settings: ContextRRValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateCPRRSettings = (methodSettings: CPRR, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const CPRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_CPRR_L: validatedL.value,
    PARAM_CPRR_K: methodSettings?.K,
    PARAM_CPRR_T: methodSettings?.T,
  };
  return {
    settings: CPRRValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateLHRRSettings = (methodSettings: LHRR, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const LHRRValueUpdates = {
    PARAM_NONE_L: datasetSize.toString(),
    PARAM_LHRR_L: validatedL.value,
    PARAM_LHRR_K: methodSettings?.K,
    PARAM_LHRR_T: methodSettings?.T,
  };
  return {
    settings: LHRRValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateBFSTreeSettings = (methodSettings: BFSTree, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const BFSTreeValueUpdates = {
    PARAM_BFSTREE_L: validatedL.value,
    PARAM_BFSTREE_K: methodSettings?.K,
    PARAM_BFSTREE_CORRELATION_METRIC: methodSettings?.Correlation,
  };

  return {
    settings: BFSTreeValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateCorGraphSettings = (methodSettings: CorGraph, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const CorGraphValueUpdates = {
    PARAM_CORGRAPH_L: validatedL.value,
    PARAM_CORGRAPH_K: methodSettings?.K,
    PARAM_CORGRAPH_THRESHOLD_START: methodSettings?.ThresholdStart,
    PARAM_CORGRAPH_THRESHOLD_END: methodSettings?.ThresholdEnd,
    PARAM_CORGRAPH_THRESHOLD_INC: methodSettings?.ThresholdInc,
    PARAM_CORGRAPH_CORRELATION: methodSettings?.Correlation,
  };

  return {
    settings: CorGraphValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateRDPACSettings = (methodSettings: RDPAC, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const RDPACValueUpdates = {
    PARAM_RDPAC_L: validatedL.value,
    PARAM_RDPAC_P: methodSettings?.P,
    PARAM_RDPAC_PL: methodSettings?.PL,
    PARAM_RDPAC_K_START: methodSettings?.K_START,
    PARAM_RDPAC_K_END: methodSettings?.K_END,
    PARAM_RDPAC_K_INC: methodSettings?.K_INC,
    PARAM_RDPAC_L_MULT: methodSettings?.L_MULT,
  };

  return {
    settings: RDPACValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateReckNNGraphSettings = (methodSettings: ReckNNGraph, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const ReckNNGraphValueUpdates = {
    PARAM_RECKNNGRAPH_L: validatedL.value,
    PARAM_RECKNNGRAPH_K: methodSettings?.K,
    PARAM_RECKNNGRAPH_EPSILON: methodSettings?.EPSILON,
  };
  return {
    settings: ReckNNGraphValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateRFESettings = (methodSettings: RFE, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const RFEValueUpdates: RFEConfigParams = {
    PARAM_RFE_K: methodSettings?.K,
    PARAM_RFE_T: validatedL.value,
    PARAM_RFE_L: methodSettings?.T,
    PARAM_RFE_PA: methodSettings?.PA,
    PARAM_RFE_TH_CC: methodSettings?.TH_CC,
    PARAM_RFE_PERFORM_CCS: methodSettings?.PERFORM_CCS ? 'TRUE' : 'FALSE',
    PARAM_RFE_RERANK_BY_EMB: methodSettings?.RERANK_BY_EMB ? 'TRUE' : 'FALSE',
    PARAM_RFE_EXPORT_EMBEDDINGS: methodSettings?.EXPORT_EMBEDDINGS ? 'TRUE' : 'FALSE',
    PARAM_RFE_EMBEDDINGS_PATH: methodSettings?.EMBEDDINGS_PATH,
    PARAM_RFE_CCS_PATH: methodSettings?.CCS_PATH,
  };
  return {
    settings: RFEValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateRKGraphSettings = (methodSettings: RKGraph, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const RKGraphValueUpdates: RKGraphConfigParams = {
    PARAM_RKGRAPH_K: methodSettings?.K,
    PARAM_RKGRAPH_T: methodSettings?.T,
    PARAM_RKGRAPH_P: methodSettings?.P,
    PARAM_RKGRAPH_L: validatedL.value,
  };
  return {
    settings: RKGraphValueUpdates,
    lAdjustments: [validatedL],
  };
};

export const generateRLSimSettings = (methodSettings: RLSim, datasetSize = 1400): MethodSettingsResult => {
  const validatedTOPK = validateAndAdjustL(methodSettings?.TOPK, datasetSize);
  const RLSimValueUpdates: RLSimConfigParams = {
    PARAM_RLSIM_TOPK: validatedTOPK.value,
    PARAM_RLSIM_CK: methodSettings?.CK,
    PARAM_RLSIM_T: methodSettings?.T,
    PARAM_RLSIM_METRIC: methodSettings?.METRIC,
  };
  return {
    settings: RLSimValueUpdates,
    lAdjustments: [validatedTOPK],
  };
};

export const generateRLRecomSettings = (methodSettings: RLRecom, datasetSize = 1400): MethodSettingsResult => {
  const validatedL = validateAndAdjustL(methodSettings?.L, datasetSize);
  const RLRecomValueUpdates: RLRecomConfigParams = {
    PARAM_RLRECOM_K: methodSettings?.K,
    PARAM_RLRECOM_L: validatedL.value,
    PARAM_RLRECOM_LAMBDA: methodSettings?.LAMBDA,
    PARAM_RLRECOM_EPSILON: methodSettings?.EPSILON,
  };
  return {
    settings: RLRecomValueUpdates,
    lAdjustments: [validatedL],
  };
};
