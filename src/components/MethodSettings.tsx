"use client";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UDLF_METHODS } from "@/ts/constants/common";
import { BFSTREE_DEFAULT_PARAMS } from "@/ts/constants/methods/bfstree";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/methods/contextrr";
import { CORGRAPH_DEFAULT_PARAMS } from "@/ts/constants/methods/corgraph";
import { CPRR_DEFAULT_PARAMS } from "@/ts/constants/methods/cprr";
import { LHRR_DEFAULT_PARAMS } from "@/ts/constants/methods/lhrr";
import { RDPAC_DEFAULT_PARAMS } from "@/ts/constants/methods/rdpac";
import { RECKNNGRAPH_DEFAULT_PARAMS } from "@/ts/constants/methods/recknngraph";
import { RFE_DEFAULT_PARAMS } from "@/ts/constants/methods/rfe";
import { RKGRAPH_DEFAULT_PARAMS } from "@/ts/constants/methods/rkgraph";
import { RLRECOM_DEFAULT_PARAMS } from "@/ts/constants/methods/rkrecom";
import { RLSIM_DEFAULT_PARAMS } from "@/ts/constants/methods/rlsim";
import type { MethodSettingsProps } from "@/ts/interfaces/methods";
import type { BFSTree } from "@/ts/interfaces/methods/bfstree";
import type { ContextRR } from "@/ts/interfaces/methods/contextrr";
import type { CorGraph } from "@/ts/interfaces/methods/corgraph";
import type { CPRR } from "@/ts/interfaces/methods/cprr";
import type { LHRR } from "@/ts/interfaces/methods/lhrr";
import type { RDPAC } from "@/ts/interfaces/methods/rdpac";
import type { ReckNNGraph } from "@/ts/interfaces/methods/recknngraph";
import type { RFE } from "@/ts/interfaces/methods/rfe";
import type { RKGraph } from "@/ts/interfaces/methods/rkgraph";
import type { RLRecom } from "@/ts/interfaces/methods/rlrecom";
import type { RLSim } from "@/ts/interfaces/methods/rlsim";
import type { Method } from "@/ts/types/methods";
import BFSTreeSettings from "./methods/BFSTreeSettings";
import ContextRRSettings from "./methods/ContextRRSettings";
import CorGraphSettings from "./methods/CorGraphSettings";
import CPRRSettings from "./methods/CPRRSettings";
import LHRRSettings from "./methods/LHRRSettings";
import RDPACSettings from "./methods/RDPACSettings";
import ReckNNGraphSettings from "./methods/ReckNNGraph";
import RFESettings from "./methods/RFESettings";
import RKGraphSettings from "./methods/RKGraphSettings";
import RLRecomSettings from "./methods/RLRecom";
import RLSimSettings from "./methods/RLSimSettings";

const METHOD_CONFIGS = {
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

export default function MethodSettings({ selectedMethod, setSelectedMethod, settings, setSettings }: MethodSettingsProps) {
  const handleMethodChange = (method: Method) => {
    setSelectedMethod(method);
    const defaultParams = METHOD_CONFIGS[method];
    if (defaultParams) {
      setSettings(defaultParams);
    }
  };

  const methodsSorted = Object.values(UDLF_METHODS).sort((a, b) => a.localeCompare(b));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Method</InputLabel>
        <Select label="Method" onChange={(e) => handleMethodChange(e.target.value as Method)} value={selectedMethod}>
          {methodsSorted.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedMethod === UDLF_METHODS.CONTEXTRR && <ContextRRSettings setSettings={(s) => setSettings(s as ContextRR)} settings={settings as ContextRR} />}
      {selectedMethod === UDLF_METHODS.CPRR && <CPRRSettings setSettings={(s) => setSettings(s as CPRR)} settings={settings as CPRR} />}
      {selectedMethod === UDLF_METHODS.LHRR && <LHRRSettings setSettings={(s) => setSettings(s as LHRR)} settings={settings as LHRR} />}
      {selectedMethod === UDLF_METHODS.BFSTREE && <BFSTreeSettings setSettings={(s) => setSettings(s as BFSTree)} settings={settings as BFSTree} />}
      {selectedMethod === UDLF_METHODS.CORGRAPH && <CorGraphSettings setSettings={(s) => setSettings(s as CorGraph)} settings={settings as CorGraph} />}
      {selectedMethod === UDLF_METHODS.RDPAC && <RDPACSettings setSettings={(s) => setSettings(s as RDPAC)} settings={settings as RDPAC} />}
      {selectedMethod === UDLF_METHODS.RECKNNGRAPH && (
        <ReckNNGraphSettings setSettings={(s) => setSettings(s as ReckNNGraph)} settings={settings as ReckNNGraph} />
      )}
      {selectedMethod === UDLF_METHODS.RFE && <RFESettings setSettings={(s) => setSettings(s as RFE)} settings={settings as RFE} />}
      {selectedMethod === UDLF_METHODS.RLSIM && <RLSimSettings setSettings={(s) => setSettings(s as RLSim)} settings={settings as RLSim} />}
      {selectedMethod === UDLF_METHODS.RKGRAPH && <RKGraphSettings setSettings={(s) => setSettings(s as RKGraph)} settings={settings as RKGraph} />}
      {selectedMethod === UDLF_METHODS.RLRECOM && <RLRecomSettings setSettings={(s) => setSettings(s as RLRecom)} settings={settings as RLRecom} />}
    </Box>
  );
}
