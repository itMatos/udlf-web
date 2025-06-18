import { useState } from "react";
import { UDLF_METHODS } from "@/ts/constants/common";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ContextRRSettings from "./methods/ContextRRSettings";
import CPRRSettings from "./methods/CPRRSettings";
import { Method } from "@/ts/types/methods";

export default function MethodSettings() {
  const [selectedMethod, setSelectedMethod] = useState<Method>(UDLF_METHODS.CONTEXTRR);

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
        <Select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value as Method)} label="Method">
          {Object.values(UDLF_METHODS).map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedMethod === UDLF_METHODS.CONTEXTRR && <ContextRRSettings />}
      {selectedMethod === UDLF_METHODS.CPRR && <CPRRSettings />}
    </Box>
  );
}
