import { Box, TextField, Tooltip, IconButton, InputAdornment } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { RLRecom, RLRecomSettingsProps } from "@/ts/types/methods/rlrecom";
import { RLRecomSettingsConfig } from "@/services/templates/RLRecomSettingsConfig";

export default function RLRecomSettings({ settings, setSettings }: RLRecomSettingsProps) {
  const handleSettingChange = (field: keyof RLRecom) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
              <Tooltip title={RLRecomSettingsConfig.parameters[0].description}>
                <IconButton size="small" aria-label="info K">
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
              <Tooltip title={RLRecomSettingsConfig.parameters[1].description}>
                <IconButton size="small" aria-label="info L">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="LAMBDA"
        label="LAMBDA"
        onChange={handleSettingChange("LAMBDA")}
        type="number"
        value={settings.LAMBDA}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLRecomSettingsConfig.parameters[2].description}>
                <IconButton size="small" aria-label="info LAMBDA">
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="EPSILON"
        label="EPSILON"
        onChange={handleSettingChange("EPSILON")}
        type="number"
        value={settings.EPSILON}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={RLRecomSettingsConfig.parameters[3].description}>
                <IconButton size="small" aria-label="info EPSILON">
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
