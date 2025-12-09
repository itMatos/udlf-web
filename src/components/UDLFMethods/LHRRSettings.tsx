import { Box, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { LHRR, LHRRSettingsProps } from "@/ts/types/methods/lhrr";
import { LHRRSettingsConfig } from "@/services/templates/LHRRSettingsConfig";

export default function LHRRSettings({ settings, setSettings }: LHRRSettingsProps) {
  const handleSettingChange = (field: keyof LHRR) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings: LHRR = {
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
              <Tooltip title={LHRRSettingsConfig.parameters[0].description}>
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
              <Tooltip title={LHRRSettingsConfig.parameters[1].description}>
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
              <Tooltip title={LHRRSettingsConfig.parameters[2].description}>
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
