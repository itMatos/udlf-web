import { Box, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { OUTPUT_TYPES } from "@/ts/constants/output";
import type { OutputFormatType, OutputSettingsProps } from "@/ts/types/output";

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
  // fixing output enabled to generate output file
  const [enabledOutput] = useState<boolean>(true);
  const [selectedOutputType, setSelectedOutputType] = useState<OutputFormatType>(settings?.outputFileFormat ?? "RANKEDLIST_NUMERIC");

  useEffect(() => {
    if (settings) {
      setSelectedOutputType(settings.outputFileFormat);
    }
  }, [settings]);

  useEffect(() => {
    onSettingsChange({
      enabledOutput: true,
      outputFileFormat: selectedOutputType,
      outputFileName: settings?.outputFileName ?? "",
    });
  }, [selectedOutputType, onSettingsChange, settings?.outputFileName]);

  const handleOutputTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOutputType(event.target.value as OutputFormatType);
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
          <FormControlLabel control={<Switch checked={enabledOutput} disabled />} label="Enable output" labelPlacement="start" />
        </FormGroup>

        <Box sx={{ mb: 2 }}>
          <TextField
            disabled
            fullWidth
            id="inputType"
            label="Output format"
            onChange={handleOutputTypeChange}
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
      </Box>
    </Box>
  );
}
