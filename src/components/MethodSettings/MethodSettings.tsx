"use client";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UDLF_METHODS } from "@/ts/constants/common";
import type { MethodSettingsProps } from "@/ts/types/methods";
import { METHOD_CONFIGS, type Method } from "@/ts/types/methods";
import type { BFSTree } from "@/ts/types/methods/bfstree";
import type { ContextRR } from "@/ts/types/methods/contextrr";
import type { CorGraph } from "@/ts/types/methods/corgraph";
import type { CPRR } from "@/ts/types/methods/cprr";
import type { LHRR } from "@/ts/types/methods/lhrr";
import type { RDPAC } from "@/ts/types/methods/rdpac";
import type { ReckNNGraph } from "@/ts/types/methods/recknngraph";
import type { RFE } from "@/ts/types/methods/rfe";
import type { RKGraph } from "@/ts/types/methods/rkgraph";
import type { RLRecom } from "@/ts/types/methods/rlrecom";
import type { RLSim } from "@/ts/types/methods/rlsim";
import BFSTreeSettings from "../UDLFMethods/BFSTreeSettings";
import ContextRRSettings from "../UDLFMethods/ContextRRSettings";
import CorGraphSettings from "../UDLFMethods/CorGraphSettings";
import CPRRSettings from "../UDLFMethods/CPRRSettings";
import LHRRSettings from "../UDLFMethods/LHRRSettings";
import RDPACSettings from "../UDLFMethods/RDPACSettings";
import ReckNNGraphSettings from "../UDLFMethods/ReckNNGraph";
import RFESettings from "../UDLFMethods/RFESettings";
import RKGraphSettings from "../UDLFMethods/RKGraphSettings";
import RLRecomSettings from "../UDLFMethods/RLRecom";
import RLSimSettings from "../UDLFMethods/RLSimSettings";

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
      {selectedMethod === UDLF_METHODS.BFSTREE && <BFSTreeSettings setSettings={(s: BFSTree) => setSettings(s)} settings={settings as BFSTree} />}
      {selectedMethod === UDLF_METHODS.CORGRAPH && <CorGraphSettings setSettings={(s: CorGraph) => setSettings(s)} settings={settings as CorGraph} />}
      {selectedMethod === UDLF_METHODS.RDPAC && <RDPACSettings setSettings={(s: RDPAC) => setSettings(s)} settings={settings as RDPAC} />}
      {selectedMethod === UDLF_METHODS.RECKNNGRAPH && (
        <ReckNNGraphSettings setSettings={(s: ReckNNGraph) => setSettings(s)} settings={settings as ReckNNGraph} />
      )}
      {selectedMethod === UDLF_METHODS.RFE && <RFESettings setSettings={(s: RFE) => setSettings(s)} settings={settings as RFE} />}
      {selectedMethod === UDLF_METHODS.RLSIM && <RLSimSettings setSettings={(s: RLSim) => setSettings(s)} settings={settings as RLSim} />}
      {selectedMethod === UDLF_METHODS.RKGRAPH && <RKGraphSettings setSettings={(s: RKGraph) => setSettings(s)} settings={settings as RKGraph} />}
      {selectedMethod === UDLF_METHODS.RLRECOM && <RLRecomSettings setSettings={(s: RLRecom) => setSettings(s)} settings={settings as RLRecom} />}
    </Box>
  );
}
