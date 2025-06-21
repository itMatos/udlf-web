"use client";
import { CorGraph, CorGraphSettingsProps } from "@/ts/interfaces/methods/corgraph";
import { CorGraphCorrelation } from "@/ts/types/methods/corgraph";
import { Box, MenuItem, TextField } from "@mui/material";
import React from "react";

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
        id="Correlation"
        label="Correlation"
        select
        value={settings.Correlation}
        onChange={handleCorrelationChange}
        variant="outlined"
      >
        {correlationItems.map((correlation) => (
          <MenuItem key={correlation} value={correlation}>
            {correlation}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
