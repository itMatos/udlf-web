import { OutputSettingsData } from "@/ts/interfaces";
import { OutputFormatType } from "@/ts/common";
import { Box, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { OUTPUT_TYPES } from "@/ts/constants";

interface OutputSettingsProps {
  onSettingsChange: (settings: OutputSettingsData) => void;
  settings: OutputSettingsData;
}

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
  const [enabledOutput, setEnabledOutput] = useState<boolean>(false);
  const [selectedOutputType, setSelectedOutputType] = useState<OutputFormatType>(
    settings.outputFileFormat || "RANKEDLIST_NUMERIC"
  );

  const handleChangeEnabledOutput = (value: boolean) => {
    setEnabledOutput(value);
    onSettingsChange({
      ...settings,
      enabledOutput: value,
    });
  };

  const handleOutputFileNameChange = (value: string) => {
    onSettingsChange({ ...settings, outputFileName: value });
  };

  const handleOutputFileFormatChange = (value: OutputFormatType) => {
    console.log("Output file format changed:", value);
    setSelectedOutputType(value);
    onSettingsChange({ ...settings, outputFileFormat: value });
  };

  return (
    <Box
      sx={{
        minWidth: 150,
        maxWidth: 500,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="form" noValidate autoComplete="off" sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
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
              id="outputFilePath"
              label="Output file name"
              value={settings.outputFileName}
              onChange={(e) => handleOutputFileNameChange(e.target.value)}
              variant="outlined"
              style={{ marginBottom: "16px" }}
              required
              helperText="Specify the name of the output file (without extension)"
            />
            <TextField
              fullWidth
              id="inputType"
              label="Output format"
              select
              value={selectedOutputType} // Default to the first output type
              onChange={(e) => {
                handleOutputFileFormatChange(e.target.value as OutputFormatType);
              }}
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
