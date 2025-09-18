"use client";
import { Box, TextField } from "@mui/material";
import type React from "react";
import type { CPRR, CPRRSettingsProps } from "@/ts/interfaces/methods/cprr";

export default function CPRRSettings({ settings, setSettings }: CPRRSettingsProps) {
  const handleSettingChange = (field: keyof CPRR) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings: CPRR = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField id="L" label="L" onChange={handleSettingChange("L")} type="number" value={settings.L} variant="outlined" />
      <TextField id="K" label="K" onChange={handleSettingChange("K")} type="number" value={settings.K} variant="outlined" />
      <TextField id="T" label="T" onChange={handleSettingChange("T")} type="number" value={settings.T} variant="outlined" />
    </Box>
  );
}
