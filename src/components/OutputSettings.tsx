import { OUTPUT_TYPES } from "@/ts/types";
import { OutputFormatType } from "@/ts/types";
import { Box, FormControlLabel, FormGroup, MenuItem, Switch, TextField } from "@mui/material";
import { useState } from "react";

interface OutputSettingsProps {
  onSettingsChange: (settings: OutputFormatType) => void;
  settings: OutputFormatType;
}

export default function OutputSettings({ onSettingsChange, settings }: OutputSettingsProps) {
  const [enabledOutput, setEnabledOutput] = useState<boolean>(false);

  const handleChangeEnabledOutput = (value: boolean) => {
    setEnabledOutput(value);
    // if (!value) {
    //   onSettingsChange("")
    // } else {
    //   onSettingsChange(settings);
    // }
  };

  return (
    <Box
      sx={{
        minWidth: 150,
        maxWidth: 400,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ gap: 2, display: "flex", flexDirection: "column" }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enabledOutput}
                onChange={(_, checked) => handleChangeEnabledOutput(checked)}
              />
            }
            label="Enable output settings"
            labelPlacement="start"
          />
        </FormGroup>

        {enabledOutput && (
          <TextField
            id="inputType"
            label="Output format"
            select
            value={settings}
            onChange={(e) => {
              const selectedValue = e.target.value as OutputFormatType;
              onSettingsChange(selectedValue);
            }}
            variant="outlined"
          >
            {OUTPUT_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Box>
    </Box>
  );
}
