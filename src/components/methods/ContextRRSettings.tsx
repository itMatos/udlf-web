"use client";

import React from "react";
import { ContextRR, ContextRRSettingsProps } from "@/ts/interfaces/contextrr";
import { Box, FormControl, FormControlLabel, FormHelperText, Switch, TextField } from "@mui/material";

export default function ContextRRSettings({ settings, setSettings }: ContextRRSettingsProps) {
  const handleSettingChange = (field: keyof ContextRR) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  const handleSelectOptimizations = (value: boolean) => {
    const newSettings = { ...settings, OPTIMIZATIONS: value } as ContextRR;
    setSettings(newSettings);
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="L"
        label="L"
        type="number"
        value={settings.L}
        onChange={handleSettingChange("L")}
        variant="outlined"
      />
      <TextField
        id="K"
        label="K"
        type="number"
        value={settings.K}
        onChange={handleSettingChange("K")}
        variant="outlined"
      />
      <TextField
        id="T"
        label="T"
        type="number"
        value={settings.T}
        onChange={handleSettingChange("T")}
        variant="outlined"
      />
      <TextField
        id="NBYK"
        label="NBYK"
        type="number"
        value={settings.NBYK}
        onChange={handleSettingChange("NBYK")}
        variant="outlined"
      />
      <FormControl>
        <FormControlLabel
          control={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
              <Switch
                id="OPTIMIZATIONS"
                checked={"OPTIMIZATIONS" in settings ? settings.OPTIMIZATIONS : false}
                onChange={(event) => handleSelectOptimizations(event.target.checked)}
              />
            </Box>
          }
          label="OPTIMIZATIONS"
          labelPlacement="start"
        />
        <FormHelperText sx={{ display: "flex", justifyContent: "flex-end" }}>
          {settings.OPTIMIZATIONS ? "Enabled" : "Disabled"}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
