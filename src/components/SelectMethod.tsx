"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  METHODS,
  CONTEXTRR_DEFAULT_SETTINGS,
  CPRR_DEFAULT_SETTINGS,
} from "./../ts/constants";
import {
  ContextRRMethodSettings,
  CPRRMethodSettings,
} from "./../ts/interfaces";

interface SelectMethodProps {
  onMethodChange: (method: string) => void;
  onSettingsChange: (
    settings: ContextRRMethodSettings | CPRRMethodSettings
  ) => void;
  selectedMethod: string;
  methodSettings: CPRRMethodSettings | null;
}

export default function SelectMethod({
  onMethodChange,
  onSettingsChange,
}: SelectMethodProps) {
  // Default to the first method in the list
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [settings, setSettings] = useState<
    ContextRRMethodSettings | CPRRMethodSettings
  >(CONTEXTRR_DEFAULT_SETTINGS);

  const handleMethodChange = (event: SelectChangeEvent) => {
    const newMethod = event.target.value;
    setMethod(newMethod);
    onMethodChange(newMethod);

    if (newMethod === "CPRR") {
      setSettings(CPRR_DEFAULT_SETTINGS);
    }
  };

  const handleSettingChange =
    (field: keyof ContextRRMethodSettings) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSettings = {
        ...settings,
        [field]: Number(event.target.value),
      };
      setSettings(newSettings);
      onSettingsChange(newSettings);
    };

  const handleSelectOptimizations = (value: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      OPTIMIZATIONS: value,
    }));
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
      <FormControl fullWidth>
        <InputLabel>Method</InputLabel>
        <Select value={method} label="Method" onChange={handleMethodChange}>
          {METHODS.map((methodOption) => (
            <MenuItem key={methodOption} value={methodOption}>
              {methodOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ gap: 2, display: "flex", flexDirection: "column" }}
      >
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
        {"NBYK" in settings && (
          <TextField
            id="NBYK"
            label="NBYK"
            type="number"
            value={settings.NBYK}
            onChange={handleSettingChange("NBYK")}
            variant="outlined"
          />
        )}

        {"OPTIMIZATIONS" in settings && (
          <FormControlLabel
            control={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Switch
                  id="OPTIMIZATIONS"
                  checked={
                    "OPTIMIZATIONS" in settings ? settings.OPTIMIZATIONS : false
                  }
                  onChange={(event) =>
                    handleSelectOptimizations(event.target.checked)
                  }
                />
                {"OPTIMIZATIONS" in settings && (
                  <Box>{settings.OPTIMIZATIONS ? "on" : "off"}</Box>
                )}
              </Box>
            }
            label="OPTIMIZATIONS"
            labelPlacement="start"
          />
        )}
      </Box>
    </Box>
  );
}
