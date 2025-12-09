"use client";
import { Box, MenuItem, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import type React from "react";
import type { CorGraph, CorGraphCorrelation, CorGraphSettingsProps } from "@/ts/types/methods/corgraph";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CorGraphSettingsConfig } from "@/services/templates/CorGraphSettingsConfig";

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
              <Tooltip title={CorGraphSettingsConfig.parameters[0].description}>
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
              <Tooltip title={CorGraphSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info K">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="Correlation"
        label="Correlation"
        onChange={handleCorrelationChange}
        select
        value={settings.Correlation}
        variant="outlined"
        SelectProps={{ IconComponent: () => null }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={CorGraphSettingsConfig.parameters[5].description}>
                <IconButton size="small" aria-label="info Correlation">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
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
