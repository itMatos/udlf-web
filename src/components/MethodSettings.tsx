"use client";
import React from "react";
import { UDLF_METHODS } from "@/ts/constants/common";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ContextRRSettings from "./methods/ContextRRSettings";
import CPRRSettings from "./methods/CPRRSettings";
import { Method } from "@/ts/types/methods";
import { CPRR } from "@/ts/interfaces/cprr";
import { ContextRR } from "@/ts/interfaces/contextrr";
import { CONTEXTRR_DEFAULT_PARAMS } from "@/ts/constants/contextrr";
import { CPRR_DEFAULT_PARAMS } from "@/ts/constants/cprr";
import { MethodSettingsProps } from "@/ts/interfaces/methods";
import { LHRR_DEFAULT_PARAMS } from "@/ts/constants/lhrr";
import { LHRR } from "@/ts/interfaces/lhrr";
import LHRRSettings from "./methods/LHRRSettings";
import { BFSTree } from "@/ts/interfaces/bfstree";
import { BFSTREE_DEFAULT_PARAMS } from "@/ts/constants/bfstree";
import BFSTreeSettings from "./methods/BFSTreeSettings";

export default function MethodSettings({
  selectedMethod,
  setSelectedMethod,
  settings,
  setSettings,
}: MethodSettingsProps) {
  const handleMethodChange = (method: Method) => {
    setSelectedMethod(method);
    if (method === UDLF_METHODS.CONTEXTRR) {
      setSettings(CONTEXTRR_DEFAULT_PARAMS as ContextRR);
    } else if (method === UDLF_METHODS.CPRR) {
      setSettings(CPRR_DEFAULT_PARAMS as CPRR);
    } else if (method === UDLF_METHODS.LHRR) {
      setSettings(LHRR_DEFAULT_PARAMS as LHRR);
    } else if (method === UDLF_METHODS.BFSTREE) {
      setSettings(BFSTREE_DEFAULT_PARAMS as BFSTree);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        maxWidth: 200,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Method</InputLabel>
        <Select value={selectedMethod} onChange={(e) => handleMethodChange(e.target.value as Method)} label="Method">
          {Object.values(UDLF_METHODS).map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedMethod === UDLF_METHODS.CONTEXTRR && (
        <ContextRRSettings settings={settings as ContextRR} setSettings={(s) => setSettings(s as ContextRR)} />
      )}
      {selectedMethod === UDLF_METHODS.CPRR && (
        <CPRRSettings settings={settings as CPRR} setSettings={(s) => setSettings(s as CPRR)} />
      )}
      {selectedMethod === UDLF_METHODS.LHRR && (
        <LHRRSettings settings={settings as LHRR} setSettings={(s) => setSettings(s as LHRR)} />
      )}
      {selectedMethod === UDLF_METHODS.BFSTREE && (
        <BFSTreeSettings settings={settings as BFSTree} setSettings={(s) => setSettings(s as BFSTree)} />
      )}
    </Box>
  );
}
