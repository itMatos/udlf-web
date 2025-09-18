import { Box, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import type { OutputSettingsProps } from "@/ts/interfaces/output";
import type { OutputFormatType } from "@/ts/types/output";

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
  const [enabledOutput, setEnabledOutput] = useState<boolean>(false);
  const [selectedOutputType, setSelectedOutputType] = useState<OutputFormatType>(settings.outputFileFormat || "RANKEDLIST_NUMERIC");

  const handleChangeEnabledOutput = (value: boolean) => {
    setEnabledOutput(value);
    onSettingsChange({
      ...settings,
      enabledOutput: value,
    });
  };

  const handleOutputFileFormatChange = (value: OutputFormatType) => {
    console.log("Output file format changed:", value);
    setSelectedOutputType(value);
    onSettingsChange({ ...settings, outputFileFormat: value });
  };

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
            control={<Switch checked={enabledOutput} onChange={(_, checked) => handleChangeEnabledOutput(checked)} />}
            label="Enable output"
            labelPlacement="start"
          />
        </FormGroup>

        {enabledOutput && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="inputType"
              label="Output format"
              onChange={(e) => {
                handleOutputFileFormatChange(e.target.value as OutputFormatType);
              }}
              select
              value={selectedOutputType}
              variant="outlined"
            >
              {OUTPUT_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </Box>
    </Box>
  );
}
