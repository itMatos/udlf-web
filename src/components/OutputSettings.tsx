import { Box, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import type { OutputSettingsProps } from "@/ts/interfaces/output";
import type { OutputFormatType } from "@/ts/types/output";

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
  const [enabledOutput, setEnabledOutput] = useState<boolean>(true);
  const [selectedOutputType, setSelectedOutputType] = useState<OutputFormatType>("RANKEDLIST_NUMERIC");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "300px",
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box autoComplete="off" component="form" noValidate sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={enabledOutput} disabled />}
            label="Enable output"
            labelPlacement="start"
          />
        </FormGroup>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            id="inputType"
            label="Output format"
            select
            value={selectedOutputType}
            variant="outlined"
            disabled
          >
            {OUTPUT_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}
