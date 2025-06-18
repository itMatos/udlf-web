"use client";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { CPRR } from "@/ts/interfaces/cprr";
import { CPRR_DEFAULT_PARAMS } from "@/ts/constants/cprr";
export default function CPRRSettings() {
  const [settings, setSettings] = useState<CPRR>(CPRR_DEFAULT_PARAMS);

  const handleSettingChange = (field: keyof CPRR) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
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
    </Box>
  );
}
