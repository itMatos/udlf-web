"use client";
import { Box, MenuItem, TextField } from "@mui/material";
import type React from "react";
import type { CorGraph, CorGraphSettingsProps } from "@/ts/interfaces/methods/corgraph";
import type { CorGraphCorrelation } from "@/ts/types/methods/corgraph";

export default function CorGraphSettings({ settings, setSettings }: CorGraphSettingsProps) {
  const handleSettingChange = (field: keyof CorGraph) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  const handleCorrelationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      Correlation: event.target.value as CorGraphCorrelation,
    };
    setSettings(newSettings);
  };

  const correlationItems: CorGraphCorrelation[] = ["Pearson", "RBO"];

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="Correlation" label="Correlation" onChange={handleCorrelationChange} select value={settings.Correlation} variant="outlined">
        {correlationItems.map((correlation) => (
          <MenuItem key={correlation} value={correlation}>
            {correlation}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
