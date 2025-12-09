"use client";

import { Box, FormControl, FormControlLabel, FormHelperText, Switch, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import type React from "react";
import type { ContextRR, ContextRRSettingsProps } from "@/ts/types/methods/contextrr";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ContextRRSettingsConfig } from "@/services/templates/ContextRRSettingsConfig";

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
              <Tooltip title={ContextRRSettingsConfig.parameters[0].description}>
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
              <Tooltip title={ContextRRSettingsConfig.parameters[2].description}>
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
              <Tooltip title={ContextRRSettingsConfig.parameters[3].description}>
                <IconButton size="small" aria-label="info T">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="NBYK"
        label="NBYK"
        onChange={handleSettingChange("NBYK")}
        type="number"
        value={settings.NBYK}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={ContextRRSettingsConfig.parameters[4].description}>
                <IconButton size="small" aria-label="info NBYK">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <FormControl>
        <FormControlLabel
          sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end", alignItems: "center" }}
          control={
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 1, width: "100%" }}>
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
        <FormHelperText sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>{settings.OPTIMIZATIONS ? "Enabled" : "Disabled"}</FormHelperText>
      </FormControl>
    </Box>
  );
}
