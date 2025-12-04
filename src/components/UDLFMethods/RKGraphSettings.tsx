import { Box, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { RKGraph, RkGraphSettingsProps } from "@/ts/types/methods/rkgraph";
import { RKGraphSettingsConfig } from "@/services/templates/RKGraphSettingsConfig";

export default function RKGraphSettings({ settings, setSettings }: RkGraphSettingsProps) {
  const handleSettingChange = (field: keyof RKGraph) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = {
      ...settings,
      [field]: Number(event.target.value),
    };
    setSettings(newSettings);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: 2 }}>
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
              <Tooltip title={RKGraphSettingsConfig.parameters[0].description}>
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
              <Tooltip title={RKGraphSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info T">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="P"
        label="P"
        onChange={handleSettingChange("P")}
        type="number"
        value={settings.P}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RKGraphSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info P">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
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
              <Tooltip title={RKGraphSettingsConfig.parameters[3].description}>
                <IconButton size="small" aria-label="info L">
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
