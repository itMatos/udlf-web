// SelectMethod.tsx
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { METHODS, CONTEXTRR_DEFAULT_SETTINGS } from "@/app/constants/constants";
import { ContextRRMethodSettings } from "@/interfaces/interfaces";

interface SelectMethodProps {
  onMethodChange: (method: string) => void;
  onSettingsChange: (settings: ContextRRMethodSettings) => void;
}

export default function SelectMethod({
  onMethodChange,
  onSettingsChange,
}: SelectMethodProps) {
  // Default to the first method in the list
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [settings, setSettings] = useState<ContextRRMethodSettings>(
    CONTEXTRR_DEFAULT_SETTINGS
  );

  const handleMethodChange = (event: SelectChangeEvent) => {
    const newMethod = event.target.value;
    setMethod(newMethod);
    onMethodChange(newMethod);
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

  const handleSelectOptimizations = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const newSettings = {
      ...settings,
      OPTIMIZATIONS: value === "true",
    };
    console.log("newSettings", newSettings);
    setSettings(newSettings);
    onSettingsChange(newSettings);
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

      {/* method parametes */}

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
        <TextField
          id="NBYK"
          label="NBYK"
          type="number"
          value={settings.NBYK}
          onChange={handleSettingChange("NBYK")}
          variant="outlined"
        />
        <TextField
          id="OPTIMIZATIONS"
          label="OPTIMIZATIONS"
          select
          value={settings.OPTIMIZATIONS}
          onChange={(event) =>
            handleSelectOptimizations(event as SelectChangeEvent<string>)
          }
          variant="outlined"
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
