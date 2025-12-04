"use client";
import { Box, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import type React from "react";
import type { CPRR, CPRRSettingsProps } from "@/ts/types/methods/cprr";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CPRRSettingsConfig } from "@/services/templates/CPRRSettingsConfig";

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
      <TextField
        id="L"
        label="L"
        onChange={handleSettingChange("L")}
        type="number"
        value={settings.L}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={CPRRSettingsConfig.parameters[0].description}>
                <IconButton size="small" aria-label="info L">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="K"
        label="K"
        onChange={handleSettingChange("K")}
        type="number"
        value={settings.K}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={CPRRSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info K">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="T"
        label="T"
        onChange={handleSettingChange("T")}
        type="number"
        value={settings.T}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={CPRRSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info T">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
