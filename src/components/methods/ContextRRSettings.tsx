"use client";

import { Box, FormControl, FormControlLabel, FormHelperText, Switch, TextField } from "@mui/material";
import type React from "react";
import type { ContextRR, ContextRRSettingsProps } from "@/ts/interfaces/methods/contextrr";

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
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
      <TextField id="NBYK" label="NBYK" onChange={handleSettingChange("NBYK")} type="number" value={settings.NBYK} variant="outlined" />
      <FormControl>
        <FormControlLabel
          control={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
              <Switch
                checked={"OPTIMIZATIONS" in settings ? settings.OPTIMIZATIONS : false}
                id="OPTIMIZATIONS"
                onChange={(event) => handleSelectOptimizations(event.target.checked)}
              />
            </Box>
          }
          label="OPTIMIZATIONS"
          labelPlacement="start"
        />
        <FormHelperText sx={{ display: "flex", justifyContent: "flex-end" }}>{settings.OPTIMIZATIONS ? "Enabled" : "Disabled"}</FormHelperText>
      </FormControl>
    </Box>
  );
}
